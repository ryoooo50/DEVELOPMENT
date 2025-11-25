package com.minigame.platform.repository;

import com.minigame.platform.model.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Score> findByGameIdOrderByScoreDesc(Long gameId);
    
    @Query("SELECT s FROM Score s WHERE s.game.id = :gameId ORDER BY s.score DESC")
    List<Score> findTopScoresByGameId(@Param("gameId") Long gameId);
    
    @Query("SELECT s FROM Score s WHERE s.game.id = :gameId ORDER BY s.score DESC")
    List<Score> findTopScoresByGameIdLimit(@Param("gameId") Long gameId);
    
    List<Score> findByPlayerNameOrderByPlayedAtDesc(String playerName);
    
    @Query("SELECT s FROM Score s WHERE s.player.id = :playerId ORDER BY s.score DESC")
    List<Score> findByPlayerIdOrderByScoreDesc(@Param("playerId") Long playerId);
}

