package com.minigame.platform.controller.api;

import com.minigame.platform.model.Player;
import com.minigame.platform.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "*")
public class PlayerApiController {

    private final PlayerService playerService;

    @Autowired
    public PlayerApiController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/ranking/best-score")
    public ResponseEntity<List<Player>> getTopPlayersByBestScore() {
        return ResponseEntity.ok(playerService.getTopPlayersByBestScore());
    }

    @GetMapping("/ranking/total-score")
    public ResponseEntity<List<Player>> getTopPlayersByTotalScore() {
        return ResponseEntity.ok(playerService.getTopPlayersByTotalScore());
    }

    @GetMapping("/ranking/games-played")
    public ResponseEntity<List<Player>> getTopPlayersByGamesPlayed() {
        return ResponseEntity.ok(playerService.getTopPlayersByGamesPlayed());
    }

    @GetMapping("/{name}")
    public ResponseEntity<Player> getPlayerByName(@PathVariable String name) {
        Optional<Player> player = playerService.getPlayerByName(name);
        return player.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
}

