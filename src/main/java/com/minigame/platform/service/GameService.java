package com.minigame.platform.service;

import com.minigame.platform.model.Game;
import com.minigame.platform.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class GameService {

    private final GameRepository gameRepository;

    @Autowired
    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public List<Game> getAllActiveGames() {
        return gameRepository.findByActiveTrue();
    }

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Optional<Game> getGameById(Long id) {
        return gameRepository.findById(id);
    }

    public Optional<Game> getGameByName(String name) {
        return gameRepository.findByName(name);
    }

    public Game saveGame(Game game) {
        return gameRepository.save(game);
    }

    public List<Game> getGamesByType(String type) {
        return gameRepository.findByType(type);
    }
}

