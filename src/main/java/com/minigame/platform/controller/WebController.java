package com.minigame.platform.controller;

import com.minigame.platform.model.Game;
import com.minigame.platform.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@Controller
public class WebController {

    private final GameService gameService;

    @Autowired
    public WebController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("games", gameService.getAllActiveGames());
        return "index";
    }

    @GetMapping("/game/{id}")
    public String gamePage(@PathVariable Long id, Model model) {
        Optional<Game> game = gameService.getGameById(id);
        if (game.isPresent()) {
            model.addAttribute("game", game.get());
            return "game";
        }
        return "redirect:/";
    }

    @GetMapping("/leaderboard/{gameId}")
    public String leaderboard(@PathVariable Long gameId, Model model) {
        Optional<Game> game = gameService.getGameById(gameId);
        if (game.isPresent()) {
            model.addAttribute("game", game.get());
            return "leaderboard";
        }
        return "redirect:/";
    }

    @GetMapping("/ranking")
    public String globalRanking(Model model) {
        return "ranking";
    }
}

