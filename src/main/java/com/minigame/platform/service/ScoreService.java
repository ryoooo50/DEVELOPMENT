package com.minigame.platform.service;

import com.minigame.platform.model.Player;
import com.minigame.platform.model.Score;
import com.minigame.platform.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ScoreService {

    private final ScoreRepository scoreRepository;
    private final PlayerService playerService;

    @Autowired
    public ScoreService(ScoreRepository scoreRepository, PlayerService playerService) {
        this.scoreRepository = scoreRepository;
        this.playerService = playerService;
    }

    public Score saveScore(Score score) {
        // Get or create player
        Player player = playerService.getOrCreatePlayer(score.getPlayerName());
        score.setPlayer(player);
        
        // Save score
        Score savedScore = scoreRepository.save(score);
        
        // Update player statistics
        playerService.updatePlayerStats(player, score.getScore());
        
        return savedScore;
    }

    public List<Score> getTopScoresByGameId(Long gameId) {
        return scoreRepository.findTopScoresByGameId(gameId);
    }

    public List<Score> getScoresByGameId(Long gameId) {
        return scoreRepository.findByGameIdOrderByScoreDesc(gameId);
    }

    public List<Score> getScoresByPlayerName(String playerName) {
        return scoreRepository.findByPlayerNameOrderByPlayedAtDesc(playerName);
    }
}

