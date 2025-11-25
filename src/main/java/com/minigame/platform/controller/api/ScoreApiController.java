package com.minigame.platform.controller.api;

import com.minigame.platform.dto.ScoreRequest;
import com.minigame.platform.model.Game;
import com.minigame.platform.model.Score;
import com.minigame.platform.service.GameService;
import com.minigame.platform.service.ScoreService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
@CrossOrigin(origins = "*")
public class ScoreApiController {

    private final ScoreService scoreService;
    private final GameService gameService;

    @Autowired
    public ScoreApiController(ScoreService scoreService, GameService gameService) {
        this.scoreService = scoreService;
        this.gameService = gameService;
    }

    @PostMapping
    public ResponseEntity<Score> submitScore(@Valid @RequestBody ScoreRequest request) {
        Game game = gameService.getGameById(request.getGameId())
                .orElseThrow(() -> new IllegalArgumentException("Game not found with id: " + request.getGameId()));

        if (request.getScore() < 0) {
            throw new IllegalArgumentException("Score cannot be negative");
        }

        if (request.getPlayerName().length() > 50) {
            throw new IllegalArgumentException("Player name must be 50 characters or less");
        }

        Score score = new Score();
        score.setGame(game);
        score.setPlayerName(request.getPlayerName());
        score.setScore(request.getScore());
        score.setMetadata(request.getMetadata());

        Score savedScore = scoreService.saveScore(score);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedScore);
    }

    @GetMapping("/game/{gameId}")
    public ResponseEntity<List<Score>> getScoresByGame(@PathVariable Long gameId) {
        List<Score> scores = scoreService.getTopScoresByGameId(gameId);
        return ResponseEntity.ok(scores);
    }

    @GetMapping("/player/{playerName}")
    public ResponseEntity<List<Score>> getScoresByPlayer(@PathVariable String playerName) {
        List<Score> scores = scoreService.getScoresByPlayerName(playerName);
        return ResponseEntity.ok(scores);
    }
}

