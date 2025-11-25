# 拡張実装例

このドキュメントでは、実際に実装できる拡張機能のコード例を提供します。

## 1. Strategy パターンによるゲームハンドラー実装

### インターフェース定義

```java
package com.minigame.platform.game;

public interface GameHandler {
    /**
     * ゲームを初期化
     */
    GameState initialize(Long gameId);
    
    /**
     * ゲームのアクションを処理
     */
    GameResult processAction(GameState state, GameAction action);
    
    /**
     * スコアを計算
     */
    Integer calculateScore(GameState state);
    
    /**
     * ゲーム設定を取得
     */
    GameConfig getConfig();
    
    /**
     * ゲームタイプを取得
     */
    String getGameType();
}
```

### ゲーム状態とアクション

```java
package com.minigame.platform.game;

import java.util.Map;

public class GameState {
    private Long gameId;
    private String playerId;
    private Map<String, Object> data;
    private Long startTime;
    private Integer score;
    
    // Getters and Setters
}

public class GameAction {
    private String type; // "guess", "type", "answer"
    private Map<String, Object> data;
    
    // Getters and Setters
}

public class GameResult {
    private GameState newState;
    private String message;
    private Boolean isComplete;
    private Boolean isCorrect;
    
    // Getters and Setters
}

public class GameConfig {
    private Map<String, Object> parameters;
    private String description;
    
    // Getters and Setters
}
```

### 数当てゲームの実装例

```java
package com.minigame.platform.game.impl;

import com.minigame.platform.game.*;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class NumberGuessGameHandler implements GameHandler {
    
    @Override
    public GameState initialize(Long gameId) {
        GameState state = new GameState();
        state.setGameId(gameId);
        state.setStartTime(System.currentTimeMillis());
        
        Map<String, Object> data = new HashMap<>();
        data.put("targetNumber", (int)(Math.random() * 100) + 1);
        data.put("attempts", 0);
        data.put("maxAttempts", 7);
        data.put("guesses", new java.util.ArrayList<>());
        
        state.setData(data);
        state.setScore(0);
        
        return state;
    }
    
    @Override
    public GameResult processAction(GameState state, GameAction action) {
        GameResult result = new GameResult();
        Map<String, Object> data = state.getData();
        
        int targetNumber = (int) data.get("targetNumber");
        int attempts = (int) data.get("attempts");
        int maxAttempts = (int) data.get("maxAttempts");
        
        if (!"guess".equals(action.getType())) {
            result.setMessage("無効なアクションです");
            result.setNewState(state);
            return result;
        }
        
        int guess = (int) action.getData().get("number");
        attempts++;
        data.put("attempts", attempts);
        
        @SuppressWarnings("unchecked")
        java.util.List<Integer> guesses = (java.util.List<Integer>) data.get("guesses");
        guesses.add(guess);
        
        if (guess == targetNumber) {
            result.setCorrect(true);
            result.setComplete(true);
            result.setMessage("正解です！");
            state.setScore(calculateScore(state));
        } else if (attempts >= maxAttempts) {
            result.setCorrect(false);
            result.setComplete(true);
            result.setMessage("ゲームオーバー！正解は " + targetNumber + " でした");
            state.setScore(0);
        } else {
            result.setCorrect(false);
            result.setComplete(false);
            if (guess < targetNumber) {
                result.setMessage("もっと大きい数字です");
            } else {
                result.setMessage("もっと小さい数字です");
            }
        }
        
        result.setNewState(state);
        return result;
    }
    
    @Override
    public Integer calculateScore(GameState state) {
        Map<String, Object> data = state.getData();
        int attempts = (int) data.get("attempts");
        return Math.max(0, 1000 - (attempts - 1) * 100);
    }
    
    @Override
    public GameConfig getConfig() {
        GameConfig config = new GameConfig();
        Map<String, Object> params = new HashMap<>();
        params.put("minNumber", 1);
        params.put("maxNumber", 100);
        params.put("maxAttempts", 7);
        config.setParameters(params);
        config.setDescription("1から100までの数字を当てるゲーム");
        return config;
    }
    
    @Override
    public String getGameType() {
        return "number-guess";
    }
}
```

### ゲームハンドラーファクトリー

```java
package com.minigame.platform.game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class GameHandlerFactory {
    
    private final Map<String, GameHandler> handlers;
    
    @Autowired
    public GameHandlerFactory(List<GameHandler> handlerList) {
        this.handlers = handlerList.stream()
            .collect(Collectors.toMap(
                GameHandler::getGameType,
                Function.identity()
            ));
    }
    
    public GameHandler getHandler(String gameType) {
        GameHandler handler = handlers.get(gameType);
        if (handler == null) {
            throw new IllegalArgumentException("Unknown game type: " + gameType);
        }
        return handler;
    }
    
    public boolean supports(String gameType) {
        return handlers.containsKey(gameType);
    }
}
```

### ゲームサービスの拡張

```java
package com.minigame.platform.service;

import com.minigame.platform.game.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GamePlayService {
    
    private final GameHandlerFactory handlerFactory;
    private final GameSessionService sessionService;
    
    @Autowired
    public GamePlayService(GameHandlerFactory handlerFactory, 
                           GameSessionService sessionService) {
        this.handlerFactory = handlerFactory;
        this.sessionService = sessionService;
    }
    
    public GameState startGame(Long gameId, String playerId, String gameType) {
        GameHandler handler = handlerFactory.getHandler(gameType);
        GameState state = handler.initialize(gameId);
        state.setPlayerId(playerId);
        
        sessionService.saveSession(state);
        return state;
    }
    
    public GameResult playGame(String sessionId, GameAction action) {
        GameState currentState = sessionService.getSession(sessionId);
        GameHandler handler = handlerFactory.getHandler(currentState.getGameId().toString());
        
        GameResult result = handler.processAction(currentState, action);
        
        if (result.isComplete()) {
            // スコアを保存
            saveScore(result.getNewState(), handler);
        } else {
            sessionService.updateSession(sessionId, result.getNewState());
        }
        
        return result;
    }
    
    private void saveScore(GameState state, GameHandler handler) {
        // スコア保存ロジック
    }
}
```

---

## 2. 認証・認可システムの実装

### Spring Security 設定

```java
package com.minigame.platform.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/", "/game/**", "/css/**", "/js/**")
                    .permitAll()
                .requestMatchers("/api/admin/**")
                    .hasRole("ADMIN")
                .anyRequest()
                    .authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter(), 
                UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }
}
```

### JWT トークン管理

```java
package com.minigame.platform.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {
    
    @Value("${jwt.secret}")
    private String secret;
    
    @Value("${jwt.expiration}")
    private Long expiration;
    
    public String generateToken(String username) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);
        
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(now)
            .setExpiration(expiryDate)
            .signWith(SignatureAlgorithm.HS512, secret)
            .compact();
    }
    
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
            .setSigningKey(secret)
            .parseClaimsJws(token)
            .getBody();
        
        return claims.getSubject();
    }
    
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
```

---

## 3. キャッシングの実装

### キャッシュ設定

```java
package com.minigame.platform.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class CacheConfig {
    
    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("games", "topScores", "leaderboard");
    }
}
```

### サービスのキャッシュ適用

```java
@Service
public class GameService {
    
    @Cacheable(value = "games", key = "#id")
    public Optional<Game> getGameById(Long id) {
        return gameRepository.findById(id);
    }
    
    @Cacheable(value = "games", key = "'active'")
    public List<Game> getAllActiveGames() {
        return gameRepository.findByActiveTrue();
    }
    
    @CacheEvict(value = "games", allEntries = true)
    public Game saveGame(Game game) {
        return gameRepository.save(game);
    }
}

@Service
public class ScoreService {
    
    @Cacheable(value = "topScores", key = "#gameId")
    public List<Score> getTopScoresByGameId(Long gameId) {
        return scoreRepository.findTopScoresByGameId(gameId);
    }
    
    @CacheEvict(value = "topScores", key = "#score.game.id")
    public Score saveScore(Score score) {
        return scoreRepository.save(score);
    }
}
```

---

## 4. エラーハンドリングの改善

### カスタム例外

```java
package com.minigame.platform.exception;

public class GameNotFoundException extends RuntimeException {
    public GameNotFoundException(Long id) {
        super("Game not found with id: " + id);
    }
}

public class InvalidGameActionException extends RuntimeException {
    public InvalidGameActionException(String message) {
        super(message);
    }
}
```

### グローバル例外ハンドラー

```java
package com.minigame.platform.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(GameNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleGameNotFound(GameNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            "GAME_NOT_FOUND",
            ex.getMessage(),
            HttpStatus.NOT_FOUND.value()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(InvalidGameActionException.class)
    public ResponseEntity<ErrorResponse> handleInvalidAction(InvalidGameActionException ex) {
        ErrorResponse error = new ErrorResponse(
            "INVALID_ACTION",
            ex.getMessage(),
            HttpStatus.BAD_REQUEST.value()
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        ErrorResponse error = new ErrorResponse(
            "INTERNAL_ERROR",
            "An unexpected error occurred",
            HttpStatus.INTERNAL_SERVER_ERROR.value()
        );
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

class ErrorResponse {
    private String code;
    private String message;
    private Integer status;
    
    // Constructor, Getters, Setters
}
```

---

## 5. ページネーションの実装

### リポジトリの拡張

```java
@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    Page<Score> findByGameIdOrderByScoreDesc(Long gameId, Pageable pageable);
    
    @Query("SELECT s FROM Score s WHERE s.game.id = :gameId ORDER BY s.score DESC")
    Page<Score> findTopScoresByGameId(@Param("gameId") Long gameId, Pageable pageable);
}
```

### サービスの拡張

```java
@Service
public class ScoreService {
    
    public Page<Score> getTopScoresByGameId(Long gameId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("score").descending());
        return scoreRepository.findTopScoresByGameId(gameId, pageable);
    }
}
```

### コントローラーの拡張

```java
@RestController
@RequestMapping("/api/scores")
public class ScoreApiController {
    
    @GetMapping("/game/{gameId}")
    public ResponseEntity<Page<Score>> getScoresByGame(
            @PathVariable Long gameId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Page<Score> scores = scoreService.getTopScoresByGameId(gameId, page, size);
        return ResponseEntity.ok(scores);
    }
}
```

---

これらの実装例を参考に、段階的に機能を拡張していくことができます。

