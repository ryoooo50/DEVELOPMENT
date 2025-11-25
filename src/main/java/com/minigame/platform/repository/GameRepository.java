package com.minigame.platform.repository;

import com.minigame.platform.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByActiveTrue();
    Optional<Game> findByName(String name);
    List<Game> findByType(String type);
}

