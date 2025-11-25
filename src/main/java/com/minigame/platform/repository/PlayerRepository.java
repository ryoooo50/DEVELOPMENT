package com.minigame.platform.repository;

import com.minigame.platform.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    Optional<Player> findByName(String name);
    
    @Query("SELECT p FROM Player p WHERE p.bestScore > 0 ORDER BY p.bestScore DESC")
    List<Player> findAllOrderByBestScoreDesc();
    
    @Query("SELECT p FROM Player p WHERE p.totalScore > 0 ORDER BY p.totalScore DESC")
    List<Player> findAllOrderByTotalScoreDesc();
    
    @Query("SELECT p FROM Player p WHERE p.totalGamesPlayed > 0 ORDER BY p.totalGamesPlayed DESC")
    List<Player> findAllOrderByTotalGamesPlayedDesc();
}

