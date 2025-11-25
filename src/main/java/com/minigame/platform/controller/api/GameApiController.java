package com.minigame.platform.controller.api;

import com.minigame.platform.model.Game;
import com.minigame.platform.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "*")
public class GameApiController {

    private final GameService gameService;

    @Autowired
    public GameApiController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    public ResponseEntity<List<Game>> getAllGames(@RequestParam(required = false) Boolean active) {
        if (active != null && active) {
            return ResponseEntity.ok(gameService.getAllActiveGames());
        }
        return ResponseEntity.ok(gameService.getAllGames());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable Long id) {
        Optional<Game> game = gameService.getGameById(id);
        return game.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Game>> getGamesByType(@PathVariable String type) {
        return ResponseEntity.ok(gameService.getGamesByType(type));
    }
}

