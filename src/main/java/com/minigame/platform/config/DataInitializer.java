package com.minigame.platform.config;

import com.minigame.platform.model.Game;
import com.minigame.platform.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final GameRepository gameRepository;

    @Autowired
    public DataInitializer(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @Override
    public void run(String... args) {
        // Initialize games if they don't exist
        if (gameRepository.count() == 0) {
            // Number Guess Game
            Game numberGuess = new Game();
            numberGuess.setName("数当てゲーム");
            numberGuess.setDescription("1から100までの数字を当てるゲームです。最大7回まで挑戦できます。");
            numberGuess.setType("number-guess");
            numberGuess.setActive(true);
            gameRepository.save(numberGuess);

            // Typing Game
            Game typing = new Game();
            typing.setName("タイピングゲーム");
            typing.setDescription("表示された単語を正確にタイピングするゲームです。60秒間でどれだけ正解できるか挑戦しましょう！");
            typing.setType("typing");
            typing.setActive(true);
            gameRepository.save(typing);

            // Quiz Game
            Game quiz = new Game();
            quiz.setName("クイズゲーム");
            quiz.setDescription("プログラミングに関するクイズに答えるゲームです。全5問に挑戦しましょう！");
            quiz.setType("quiz");
            quiz.setActive(true);
            gameRepository.save(quiz);

            // Memory Game
            Game memory = new Game();
            memory.setName("記憶力ゲーム");
            memory.setDescription("カードをめくってペアを見つける記憶力ゲームです。できるだけ少ない手数でクリアしましょう！");
            memory.setType("memory");
            memory.setActive(true);
            gameRepository.save(memory);

            // Reaction Game
            Game reaction = new Game();
            reaction.setName("反射神経ゲーム");
            reaction.setDescription("画面が緑色に変わったらすぐにクリック！あなたの反射神経を試しましょう。");
            reaction.setType("reaction");
            reaction.setActive(true);
            gameRepository.save(reaction);

            // Snake Game
            Game snake = new Game();
            snake.setName("スネークゲーム");
            snake.setDescription("クラシックなスネークゲーム！エサを食べて成長し、できるだけ長く生き残りましょう。");
            snake.setType("snake");
            snake.setActive(true);
            gameRepository.save(snake);

            // Math Challenge Game
            Game math = new Game();
            math.setName("計算チャレンジ");
            math.setDescription("60秒間でできるだけ多くの計算問題に答えてください！レベルが上がると難しくなります。");
            math.setType("math");
            math.setActive(true);
            gameRepository.save(math);

            // Breakout Game
            Game breakout = new Game();
            breakout.setName("ブロック崩し");
            breakout.setDescription("マウスでパドルを動かしてブロックを壊しましょう！すべてのブロックを壊すとクリアです。");
            breakout.setType("breakout");
            breakout.setActive(true);
            gameRepository.save(breakout);
        }
    }
}

