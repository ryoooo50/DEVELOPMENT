package com.minigame.platform.service;

import com.minigame.platform.model.Player;
import com.minigame.platform.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PlayerService {

    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public Player getOrCreatePlayer(String name) {
        Optional<Player> existingPlayer = playerRepository.findByName(name);
        if (existingPlayer.isPresent()) {
            return existingPlayer.get();
        }
        
        Player newPlayer = new Player();
        newPlayer.setName(name);
        return playerRepository.save(newPlayer);
    }

    public Player updatePlayerStats(Player player, Integer score) {
        player.setTotalGamesPlayed(player.getTotalGamesPlayed() + 1);
        player.setTotalScore(player.getTotalScore() + score);
        if (score > player.getBestScore()) {
            player.setBestScore(score);
        }
        return playerRepository.save(player);
    }

    public List<Player> getTopPlayersByBestScore() {
        return playerRepository.findAllOrderByBestScoreDesc();
    }

    public List<Player> getTopPlayersByTotalScore() {
        return playerRepository.findAllOrderByTotalScoreDesc();
    }

    public List<Player> getTopPlayersByGamesPlayed() {
        return playerRepository.findAllOrderByTotalGamesPlayedDesc();
    }

    public Optional<Player> getPlayerByName(String name) {
        return playerRepository.findByName(name);
    }
}

