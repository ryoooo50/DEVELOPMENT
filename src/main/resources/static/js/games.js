// Game state
let currentGame = null;
let gameState = {};
let currentScore = 0;

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.getElementById('game-area');
    if (gameArea) {
        const gameId = gameArea.getAttribute('data-game-id');
        const gameType = gameArea.getAttribute('data-game-type');
        
        if (gameId && gameType) {
            loadGame(gameType, gameId);
        }
    }
});

function loadGame(gameType, gameId) {
    currentGame = { type: gameType, id: gameId };
    gameState = {};
    currentScore = 0;
    
    // Play game start sound and BGM
    if (typeof audioManager !== 'undefined') {
        audioManager.playGameStart();
        audioManager.playBGM(gameType);
    }
    
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';
    
    switch(gameType) {
        case 'number-guess':
            initNumberGuessGame(gameArea);
            break;
        case 'typing':
            initTypingGame(gameArea);
            break;
        case 'quiz':
            initQuizGame(gameArea);
            break;
        case 'memory':
            initMemoryGame(gameArea);
            break;
        case 'reaction':
            initReactionGame(gameArea);
            break;
        case 'snake':
            initSnakeGame(gameArea);
            break;
        case 'math':
            initMathGame(gameArea);
            break;
        case 'breakout':
            initBreakoutGame(gameArea);
            break;
        default:
            gameArea.innerHTML = '<p>不明なゲームタイプです</p>';
    }
}

// Number Guess Game
function initNumberGuessGame(container) {
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    const maxAttempts = 7;
    
    gameState = { targetNumber, attempts, maxAttempts };
    
    container.innerHTML = `
        <div class="game-info">
            <h3>🔢 数当てゲーム</h3>
            <p>1から100までの数字を当ててください！</p>
            <p>最大${maxAttempts}回まで挑戦できます</p>
        </div>
        <div class="game-controls">
            <input type="number" id="guess-input" class="game-input" min="1" max="100" placeholder="数字を入力">
            <button onclick="makeGuess()" class="btn btn-primary">予想する</button>
        </div>
        <div id="game-feedback"></div>
        <div id="attempts-info">残り試行回数: ${maxAttempts}</div>
    `;
}

function makeGuess() {
    const input = document.getElementById('guess-input');
    const guess = parseInt(input.value);
    const feedback = document.getElementById('game-feedback');
    const attemptsInfo = document.getElementById('attempts-info');
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        feedback.innerHTML = '<p style="color: red;">1から100までの数字を入力してください</p>';
        return;
    }
    
    gameState.attempts++;
    const remaining = gameState.maxAttempts - gameState.attempts;
    
    // Play click sound
    if (typeof audioManager !== 'undefined') {
        audioManager.playClick();
    }
    
    if (guess === gameState.targetNumber) {
        currentScore = Math.max(0, 1000 - (gameState.attempts - 1) * 100);
        feedback.innerHTML = `<p style="color: green; font-size: 1.2em; font-weight: bold;">🎉 正解です！スコア: ${currentScore}点</p>`;
        attemptsInfo.innerHTML = '';
        input.disabled = true;
        document.querySelector('button').disabled = true;
        if (typeof audioManager !== 'undefined') {
            audioManager.playVictory();
        }
        showScoreForm();
        showReplayControls();
    } else if (guess < gameState.targetNumber) {
        feedback.innerHTML = `<p style="color: blue;">もっと大きい数字です</p>`;
        attemptsInfo.innerHTML = `残り試行回数: ${remaining}`;
    } else {
        feedback.innerHTML = `<p style="color: blue;">もっと小さい数字です</p>`;
        attemptsInfo.innerHTML = `残り試行回数: ${remaining}`;
    }
    
    if (remaining <= 0 && guess !== gameState.targetNumber) {
        feedback.innerHTML = `<p style="color: red;">ゲームオーバー！正解は ${gameState.targetNumber} でした</p>`;
        attemptsInfo.innerHTML = '';
        input.disabled = true;
        document.querySelector('button').disabled = true;
        currentScore = 0;
        if (typeof audioManager !== 'undefined') {
            audioManager.playGameOver();
        }
        showScoreForm();
        showReplayControls();
    }
    
    input.value = '';
    input.focus();
}

// Typing Game
function initTypingGame(container) {
    const words = [
        'プログラミング', 'コンピュータ', 'アルゴリズム', 'データベース',
        'フレームワーク', 'アプリケーション', 'インターフェース', 'デバッグ',
        'ソフトウェア', 'ハードウェア', 'ネットワーク', 'セキュリティ'
    ];
    
    let currentWordIndex = 0;
    let startTime = null;
    let correctCount = 0;
    const gameDuration = 60; // 60 seconds
    let timeLeft = gameDuration;
    
    gameState = { words, currentWordIndex, startTime, correctCount, timeLeft };
    
    container.innerHTML = `
        <div class="game-info">
            <h3>⌨️ タイピングゲーム</h3>
            <p>表示された単語を正確にタイピングしてください！</p>
        </div>
        <div class="timer" id="timer">${timeLeft}秒</div>
        <div class="question" id="current-word">${words[0]}</div>
        <div class="game-controls">
            <input type="text" id="typing-input" class="game-input" placeholder="ここに入力">
        </div>
        <div id="typing-feedback"></div>
        <div id="typing-stats">正解数: 0</div>
    `;
    
    const typingInput = document.getElementById('typing-input');
    typingInput.focus();
    
    typingInput.addEventListener('input', function() {
        if (!gameState.startTime) {
            gameState.startTime = Date.now();
            startTimer();
        }
        
        const input = this.value;
        const currentWord = gameState.words[gameState.currentWordIndex];
        
        if (input === currentWord) {
            gameState.correctCount++;
            gameState.currentWordIndex = (gameState.currentWordIndex + 1) % gameState.words.length;
            this.value = '';
            document.getElementById('current-word').textContent = gameState.words[gameState.currentWordIndex];
            document.getElementById('typing-stats').textContent = `正解数: ${gameState.correctCount}`;
            document.getElementById('typing-feedback').innerHTML = '<p style="color: green;">✓ 正解！</p>';
            if (typeof audioManager !== 'undefined') {
                audioManager.playSuccess();
            }
            setTimeout(() => {
                document.getElementById('typing-feedback').innerHTML = '';
            }, 500);
        } else if (input.length > 0 && typeof audioManager !== 'undefined') {
            // Play typing sound while typing
            if (input.length % 3 === 0) {
                audioManager.playTyping();
            }
        }
    });
}

function startTimer() {
    const timerInterval = setInterval(() => {
        gameState.timeLeft--;
        document.getElementById('timer').textContent = `${gameState.timeLeft}秒`;
        
        if (gameState.timeLeft <= 0) {
            clearInterval(timerInterval);
            currentScore = gameState.correctCount * 10;
            document.getElementById('typing-input').disabled = true;
            document.getElementById('typing-feedback').innerHTML = 
                `<p style="color: blue; font-size: 1.2em; font-weight: bold;">時間切れ！スコア: ${currentScore}点 (正解数: ${gameState.correctCount})</p>`;
            if (typeof audioManager !== 'undefined') {
                audioManager.playGameOver();
            }
            showScoreForm();
            showReplayControls();
        }
    }, 1000);
}

// Quiz Game
function initQuizGame(container) {
    // Show question count selection
    container.innerHTML = `
        <div class="game-info">
            <h3>❓ クイズゲーム</h3>
            <p>出題数を選択してください</p>
        </div>
        <div class="game-controls" style="margin: 30px 0;">
            <button onclick="startQuiz(5)" class="btn btn-primary" style="font-size: 1.2em; padding: 15px 30px; margin: 10px;">
                5問
            </button>
            <button onclick="startQuiz(10)" class="btn btn-primary" style="font-size: 1.2em; padding: 15px 30px; margin: 10px;">
                10問
            </button>
        </div>
    `;
}

function startQuiz(questionCount) {
    // Select random questions from the bank
    const shuffled = [...QUIZ_QUESTION_BANK].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, questionCount);
    
    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    
    gameState = { 
        questions: selectedQuestions, 
        currentQuestionIndex, 
        correctAnswers,
        totalQuestions: questionCount
    };
    
    showQuestion(document.getElementById('game-area'));
}

function showQuestion(container) {
    const question = gameState.questions[gameState.currentQuestionIndex];
    
    // Shuffle options and update correct index
    const optionsWithIndex = question.options.map((option, index) => ({
        option: option,
        originalIndex: index
    }));
    
    // Shuffle the options
    for (let i = optionsWithIndex.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsWithIndex[i], optionsWithIndex[j]] = [optionsWithIndex[j], optionsWithIndex[i]];
    }
    
    // Find the new index of the correct answer
    const correctOriginalIndex = question.correct;
    const newCorrectIndex = optionsWithIndex.findIndex(item => item.originalIndex === correctOriginalIndex);
    
    // Store shuffled options and new correct index in gameState
    gameState.currentQuestion = {
        question: question.question,
        category: question.category,
        options: optionsWithIndex.map(item => item.option),
        correct: newCorrectIndex
    };
    
    container.innerHTML = `
        <div class="game-info">
            <h3>❓ クイズゲーム</h3>
            <p>問題 ${gameState.currentQuestionIndex + 1} / ${gameState.totalQuestions}</p>
            ${question.category ? `<p style="font-size: 0.9em; color: #666;">カテゴリ: ${question.category}</p>` : ''}
        </div>
        <div class="question">${question.question}</div>
        <div class="answer-options">
            ${gameState.currentQuestion.options.map((option, index) => 
                `<button class="answer-btn" onclick="selectAnswer(${index})">${option}</button>`
            ).join('')}
        </div>
        <div id="quiz-feedback"></div>
        <div id="quiz-stats">正解数: ${gameState.correctAnswers} / ${gameState.currentQuestionIndex}</div>
    `;
}

function selectAnswer(selectedIndex) {
    const question = gameState.currentQuestion; // Use shuffled question
    const buttons = document.querySelectorAll('.answer-btn');
    const feedback = document.getElementById('quiz-feedback');
    
    // Play click sound
    if (typeof audioManager !== 'undefined') {
        audioManager.playClick();
    }
    
    if (selectedIndex === question.correct) {
        gameState.correctAnswers++;
        feedback.innerHTML = '<p style="color: green; font-size: 1.1em;">✓ 正解！</p>';
        if (typeof audioManager !== 'undefined') {
            audioManager.playSuccess();
        }
    } else {
        feedback.innerHTML = '<p style="color: red; font-size: 1.1em;">✗ 不正解</p>';
        if (typeof audioManager !== 'undefined') {
            audioManager.playError();
        }
    }
    
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && index !== question.correct) {
            btn.classList.add('incorrect');
        }
    });
    
    gameState.currentQuestionIndex++;
    
    setTimeout(() => {
        if (gameState.currentQuestionIndex < gameState.questions.length) {
            showQuestion(document.getElementById('game-area'));
        } else {
            currentScore = gameState.correctAnswers * 100;
            document.getElementById('game-area').innerHTML = `
                <div class="game-info">
                    <h3>🎉 クイズ終了！</h3>
                    <p style="font-size: 1.3em; font-weight: bold;">スコア: ${currentScore}点</p>
                    <p>正解数: ${gameState.correctAnswers} / ${gameState.totalQuestions}</p>
                </div>
            `;
            if (typeof audioManager !== 'undefined') {
                if (gameState.correctAnswers === gameState.totalQuestions) {
                    audioManager.playVictory();
                } else {
                    audioManager.playGameOver();
                }
            }
            showScoreForm();
            showReplayControls();
        }
    }, 2000);
}

function showScoreForm() {
    document.getElementById('score-form').style.display = 'block';
    document.getElementById('player-name').focus();
}

// Memory Game
function initMemoryGame(container) {
    const symbols = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍑', '🥝', '🍉'];
    const cards = [...symbols, ...symbols];
    
    // Shuffle cards
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let startTime = Date.now();
    
    gameState = { cards, flippedCards, matchedPairs, moves, startTime };
    
    container.innerHTML = `
        <div class="game-info">
            <h3>🧠 記憶力ゲーム</h3>
            <p>カードをめくってペアを見つけてください！</p>
        </div>
        <div id="memory-stats">手数: 0 | ペア: 0/8</div>
        <div id="memory-grid" class="memory-grid"></div>
    `;
    
    const grid = document.getElementById('memory-grid');
    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.symbol = symbol;
        card.innerHTML = '<div class="card-back">?</div><div class="card-front">' + symbol + '</div>';
        card.addEventListener('click', () => flipCard(index));
        grid.appendChild(card);
    });
}

function flipCard(index) {
    const card = document.querySelector(`[data-index="${index}"]`);
    if (card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    if (gameState.flippedCards.length >= 2) {
        return;
    }
    
    // Play card flip sound
    if (typeof audioManager !== 'undefined') {
        audioManager.playCardFlip();
    }
    
    card.classList.add('flipped');
    gameState.flippedCards.push(index);
    
    if (gameState.flippedCards.length === 2) {
        gameState.moves++;
        document.getElementById('memory-stats').textContent = 
            `手数: ${gameState.moves} | ペア: ${gameState.matchedPairs}/8`;
        
        const [first, second] = gameState.flippedCards;
        const firstCard = document.querySelector(`[data-index="${first}"]`);
        const secondCard = document.querySelector(`[data-index="${second}"]`);
        
        if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
            setTimeout(() => {
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                gameState.matchedPairs++;
                gameState.flippedCards = [];
                document.getElementById('memory-stats').textContent = 
                    `手数: ${gameState.moves} | ペア: ${gameState.matchedPairs}/8`;
                
                // Play match sound
                if (typeof audioManager !== 'undefined') {
                    audioManager.playMatch();
                }
                
                if (gameState.matchedPairs === 8) {
                    const timeTaken = Math.floor((Date.now() - gameState.startTime) / 1000);
                    currentScore = Math.max(0, 10000 - (gameState.moves * 50) - (timeTaken * 10));
                    document.getElementById('game-area').innerHTML = `
                        <div class="game-info">
                            <h3>🎉 クリア！</h3>
                            <p style="font-size: 1.3em; font-weight: bold;">スコア: ${currentScore}点</p>
                            <p>手数: ${gameState.moves} | 時間: ${timeTaken}秒</p>
                        </div>
                    `;
                    if (typeof audioManager !== 'undefined') {
                        audioManager.playVictory();
                    }
                    showScoreForm();
                    showReplayControls();
                }
            }, 500);
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                gameState.flippedCards = [];
            }, 1000);
        }
    }
}

// Reaction Game
function initReactionGame(container) {
    let waiting = false;
    let startTime = null;
    let reactionTimes = [];
    let round = 0;
    const maxRounds = 5;
    
    gameState = { waiting, startTime, reactionTimes, round, maxRounds };
    
    container.innerHTML = `
        <div class="game-info">
            <h3>⚡ 反射神経ゲーム</h3>
            <p>画面が緑色に変わったらすぐにクリックしてください！</p>
        </div>
        <div id="reaction-stats">ラウンド: 0/${maxRounds} | 平均反応時間: -</div>
        <div id="reaction-box" class="reaction-box waiting">待機中...</div>
        <div class="game-controls">
            <button id="reaction-start" class="btn btn-primary" onclick="startReactionRound()">開始</button>
        </div>
    `;
}

function startReactionRound() {
        if (gameState.round >= gameState.maxRounds) {
            const avgTime = gameState.reactionTimes.reduce((a, b) => a + b, 0) / gameState.reactionTimes.length;
            currentScore = Math.max(0, Math.floor(10000 - avgTime));
            document.getElementById('game-area').innerHTML = `
                <div class="game-info">
                    <h3>🎉 終了！</h3>
                    <p style="font-size: 1.3em; font-weight: bold;">スコア: ${currentScore}点</p>
                    <p>平均反応時間: ${avgTime.toFixed(2)}ms</p>
                </div>
            `;
            if (typeof audioManager !== 'undefined') {
                audioManager.playVictory();
            }
            showScoreForm();
            showReplayControls();
            return;
        }
    
    const box = document.getElementById('reaction-box');
    const startBtn = document.getElementById('reaction-start');
    startBtn.style.display = 'none';
    box.className = 'reaction-box waiting';
    box.textContent = '待機中...';
    box.onclick = null;
    
    const waitTime = Math.random() * 3000 + 1000; // 1-4秒
    
    setTimeout(() => {
        box.className = 'reaction-box go';
        box.textContent = 'クリック！';
        gameState.startTime = Date.now();
        box.onclick = () => {
            const reactionTime = Date.now() - gameState.startTime;
            gameState.reactionTimes.push(reactionTime);
            gameState.round++;
            
            // Play reaction sound
            if (typeof audioManager !== 'undefined') {
                audioManager.playReaction();
            }
            
            box.className = 'reaction-box clicked';
            box.textContent = `反応時間: ${reactionTime}ms`;
            
            const avgTime = gameState.reactionTimes.reduce((a, b) => a + b, 0) / gameState.reactionTimes.length;
            document.getElementById('reaction-stats').textContent = 
                `ラウンド: ${gameState.round}/${gameState.maxRounds} | 平均反応時間: ${avgTime.toFixed(2)}ms`;
            
            setTimeout(() => {
                startBtn.style.display = 'inline-block';
                startBtn.textContent = gameState.round < gameState.maxRounds ? '次のラウンド' : '結果を見る';
            }, 1500);
        };
    }, waitTime);
}

// Snake Game
function initSnakeGame(container) {
    const gridSize = 20;
    const cellSize = 20;
    let snake = [{x: 10, y: 10}];
    let direction = {x: 1, y: 0};
    let food = {x: 15, y: 15};
    let score = 0;
    let gameLoop = null;
    let gameOver = false;
    
    gameState = { gridSize, cellSize, snake, direction, food, score, gameLoop, gameOver };
    
    container.innerHTML = `
        <div class="game-info">
            <h3>🐍 スネークゲーム</h3>
            <p>矢印キーで操作してください。エサを食べて成長しましょう！</p>
        </div>
        <div id="snake-stats">スコア: 0</div>
        <canvas id="snake-canvas" width="400" height="400" style="border: 2px solid #667eea; display: block; margin: 20px auto;"></canvas>
        <div id="snake-controls">
            <button class="btn btn-primary" onclick="restartSnake()">リスタート</button>
        </div>
    `;
    
    const canvas = document.getElementById('snake-canvas');
    const ctx = canvas.getContext('2d');
    
    document.addEventListener('keydown', (e) => {
        if (gameState.gameOver) return;
        
        switch(e.key) {
            case 'ArrowUp':
                if (gameState.direction.y === 0) gameState.direction = {x: 0, y: -1};
                break;
            case 'ArrowDown':
                if (gameState.direction.y === 0) gameState.direction = {x: 0, y: 1};
                break;
            case 'ArrowLeft':
                if (gameState.direction.x === 0) gameState.direction = {x: -1, y: 0};
                break;
            case 'ArrowRight':
                if (gameState.direction.x === 0) gameState.direction = {x: 1, y: 0};
                break;
        }
    });
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw food
        ctx.fillStyle = '#ff6b6b';
        ctx.fillRect(gameState.food.x * gameState.cellSize, gameState.food.y * gameState.cellSize, gameState.cellSize, gameState.cellSize);
        
        // Draw snake
        ctx.fillStyle = '#4ecdc4';
        gameState.snake.forEach((segment, index) => {
            if (index === 0) ctx.fillStyle = '#2ecc71';
            else ctx.fillStyle = '#4ecdc4';
            ctx.fillRect(segment.x * gameState.cellSize, segment.y * gameState.cellSize, gameState.cellSize, gameState.cellSize);
        });
    }
    
    function update() {
        if (gameState.gameOver) return;
        
        const head = {
            x: gameState.snake[0].x + gameState.direction.x,
            y: gameState.snake[0].y + gameState.direction.y
        };
        
        // Check wall collision
        if (head.x < 0 || head.x >= gameState.gridSize || head.y < 0 || head.y >= gameState.gridSize) {
            endSnakeGame();
            return;
        }
        
        // Check self collision
        if (gameState.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            endSnakeGame();
            return;
        }
        
        gameState.snake.unshift(head);
        
        // Check food collision
        if (head.x === gameState.food.x && head.y === gameState.food.y) {
            gameState.score += 10;
            document.getElementById('snake-stats').textContent = `スコア: ${gameState.score}`;
            
            // Play eat sound
            if (typeof audioManager !== 'undefined') {
                audioManager.playEat();
            }
            
            // Generate new food
            do {
                gameState.food = {
                    x: Math.floor(Math.random() * gameState.gridSize),
                    y: Math.floor(Math.random() * gameState.gridSize)
                };
            } while (gameState.snake.some(segment => segment.x === gameState.food.x && segment.y === gameState.food.y));
        } else {
            gameState.snake.pop();
        }
        
        draw();
    }
    
    function endSnakeGame() {
        gameState.gameOver = true;
        currentScore = gameState.score;
        clearInterval(gameState.gameLoop);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('ゲームオーバー！', canvas.width / 2, canvas.height / 2);
        ctx.fillText(`スコア: ${gameState.score}`, canvas.width / 2, canvas.height / 2 + 40);
        if (typeof audioManager !== 'undefined') {
            audioManager.playGameOver();
        }
        showScoreForm();
        showReplayControls();
    }
    
    window.restartSnake = function() {
        gameState.snake = [{x: 10, y: 10}];
        gameState.direction = {x: 1, y: 0};
        gameState.food = {x: 15, y: 15};
        gameState.score = 0;
        gameState.gameOver = false;
        document.getElementById('snake-stats').textContent = 'スコア: 0';
        draw();
        if (gameState.gameLoop) clearInterval(gameState.gameLoop);
        gameState.gameLoop = setInterval(update, 150);
    };
    
    draw();
    gameState.gameLoop = setInterval(update, 150);
}

// Math Challenge Game
function initMathGame(container) {
    let level = 1;
    let correctAnswers = 0;
    let timeLeft = 60;
    let currentQuestion = null;
    
    gameState = { level, correctAnswers, timeLeft, currentQuestion };
    
    container.innerHTML = `
        <div class="game-info">
            <h3>🔢 計算チャレンジ</h3>
            <p>できるだけ速く計算問題に答えてください！</p>
        </div>
        <div class="timer" id="math-timer">${timeLeft}秒</div>
        <div id="math-question" class="question"></div>
        <div class="game-controls">
            <input type="number" id="math-answer" class="game-input" placeholder="答えを入力">
            <button onclick="checkMathAnswer()" class="btn btn-primary">回答</button>
        </div>
        <div id="math-stats">正解数: 0 | レベル: 1</div>
    `;
    
    generateMathQuestion();
    startMathTimer();
    
    document.getElementById('math-answer').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkMathAnswer();
    });
}

function generateMathQuestion() {
    const operations = ['+', '-', '*'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    let a, b, answer;
    
    const maxNum = 10 + (gameState.level * 5);
    
    switch(op) {
        case '+':
            a = Math.floor(Math.random() * maxNum) + 1;
            b = Math.floor(Math.random() * maxNum) + 1;
            answer = a + b;
            break;
        case '-':
            a = Math.floor(Math.random() * maxNum) + 1;
            b = Math.floor(Math.random() * (a - 1)) + 1;
            answer = a - b;
            break;
        case '*':
            a = Math.floor(Math.random() * 10) + 1;
            b = Math.floor(Math.random() * 10) + 1;
            answer = a * b;
            break;
    }
    
    gameState.currentQuestion = { a, b, op, answer };
    document.getElementById('math-question').textContent = `${a} ${op} ${b} = ?`;
    document.getElementById('math-answer').value = '';
    document.getElementById('math-answer').focus();
}

function checkMathAnswer() {
    const input = document.getElementById('math-answer');
    const userAnswer = parseInt(input.value);
    
    if (isNaN(userAnswer)) {
        return;
    }
    
    // Play click sound
    if (typeof audioManager !== 'undefined') {
        audioManager.playClick();
    }
    
    if (userAnswer === gameState.currentQuestion.answer) {
        gameState.correctAnswers++;
        if (gameState.correctAnswers % 5 === 0) {
            gameState.level++;
        }
        document.getElementById('math-stats').textContent = 
            `正解数: ${gameState.correctAnswers} | レベル: ${gameState.level}`;
        if (typeof audioManager !== 'undefined') {
            audioManager.playSuccess();
        }
        generateMathQuestion();
    } else {
        if (typeof audioManager !== 'undefined') {
            audioManager.playError();
        }
        input.style.borderColor = 'red';
        setTimeout(() => {
            input.style.borderColor = '';
            generateMathQuestion();
        }, 500);
    }
}

function startMathTimer() {
    const timerInterval = setInterval(() => {
        gameState.timeLeft--;
        document.getElementById('math-timer').textContent = `${gameState.timeLeft}秒`;
        
        if (gameState.timeLeft <= 0) {
            clearInterval(timerInterval);
            currentScore = gameState.correctAnswers * 10 * gameState.level;
            document.getElementById('math-answer').disabled = true;
            document.querySelector('button').disabled = true;
            document.getElementById('game-area').innerHTML = `
                <div class="game-info">
                    <h3>🎉 終了！</h3>
                    <p style="font-size: 1.3em; font-weight: bold;">スコア: ${currentScore}点</p>
                    <p>正解数: ${gameState.correctAnswers} | 到達レベル: ${gameState.level}</p>
                </div>
            `;
            if (typeof audioManager !== 'undefined') {
                audioManager.playGameOver();
            }
            showScoreForm();
            showReplayControls();
        }
    }, 1000);
}

// Breakout Game
function initBreakoutGame(container) {
    const canvas = document.createElement('canvas');
    canvas.id = 'breakout-canvas';
    canvas.width = 600;
    canvas.height = 400;
    canvas.style.border = '2px solid #667eea';
    canvas.style.display = 'block';
    canvas.style.margin = '20px auto';
    
    container.innerHTML = `
        <div class="game-info">
            <h3>🎯 ブロック崩し</h3>
            <p>マウスでパドルを動かしてブロックを壊しましょう！</p>
        </div>
        <div id="breakout-stats">スコア: 0 | ブロック: 30</div>
    `;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let paddle = { x: canvas.width / 2 - 50, y: canvas.height - 20, width: 100, height: 10 };
    let ball = { x: canvas.width / 2, y: canvas.height - 40, radius: 8, dx: 4, dy: -4 };
    let blocks = [];
    let score = 0;
    let blocksRemaining = 30;
    
    // Create blocks
    const rows = 5;
    const cols = 6;
    const blockWidth = 90;
    const blockHeight = 20;
    const blockPadding = 10;
    const offsetTop = 30;
    const offsetLeft = 35;
    
    for (let r = 0; r < rows; r++) {
        blocks[r] = [];
        for (let c = 0; c < cols; c++) {
            blocks[r][c] = { x: 0, y: 0, status: 1 };
        }
    }
    
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        paddle.x = e.clientX - rect.left - paddle.width / 2;
        if (paddle.x < 0) paddle.x = 0;
        if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
    });
    
    function drawBlocks() {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (blocks[r][c].status === 1) {
                    const x = c * (blockWidth + blockPadding) + offsetLeft;
                    const y = r * (blockHeight + blockPadding) + offsetTop;
                    blocks[r][c].x = x;
                    blocks[r][c].y = y;
                    
                    ctx.beginPath();
                    ctx.rect(x, y, blockWidth, blockHeight);
                    ctx.fillStyle = `hsl(${r * 60}, 70%, 50%)`;
                    ctx.fill();
                    ctx.strokeStyle = '#fff';
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw paddle
        ctx.beginPath();
        ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
        ctx.fillStyle = '#667eea';
        ctx.fill();
        ctx.closePath();
        
        // Draw ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#764ba2';
        ctx.fill();
        ctx.closePath();
        
        drawBlocks();
    }
    
    function collisionDetection() {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const b = blocks[r][c];
                if (b.status === 1) {
                    if (ball.x > b.x && ball.x < b.x + blockWidth &&
                        ball.y > b.y && ball.y < b.y + blockHeight) {
                        b.status = 0;
                        ball.dy = -ball.dy;
                        score += 10;
                        blocksRemaining--;
                        document.getElementById('breakout-stats').textContent = 
                            `スコア: ${score} | ブロック: ${blocksRemaining}`;
                        
                        // Play block break sound
                        if (typeof audioManager !== 'undefined') {
                            audioManager.playBlockBreak();
                        }
                        
                        if (blocksRemaining === 0) {
                            currentScore = score;
                            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                            ctx.fillStyle = 'white';
                            ctx.font = '30px Arial';
                            ctx.textAlign = 'center';
                            ctx.fillText('🎉 クリア！', canvas.width / 2, canvas.height / 2);
                            ctx.fillText(`スコア: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
                            if (typeof audioManager !== 'undefined') {
                                audioManager.playVictory();
                            }
                            showScoreForm();
                            showReplayControls();
                            return;
                        }
                    }
                }
            }
        }
    }
    
    function update() {
        ball.x += ball.dx;
        ball.y += ball.dy;
        
        // Wall collision
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.dx = -ball.dx;
        }
        if (ball.y - ball.radius < 0) {
            ball.dy = -ball.dy;
        }
        
        // Paddle collision
        if (ball.y + ball.radius > paddle.y &&
            ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy;
            // Play paddle hit sound
            if (typeof audioManager !== 'undefined') {
                audioManager.playPaddleHit();
            }
        }
        
        // Game over
        if (ball.y + ball.radius > canvas.height) {
            currentScore = score;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('ゲームオーバー！', canvas.width / 2, canvas.height / 2);
            ctx.fillText(`スコア: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
            if (typeof audioManager !== 'undefined') {
                audioManager.playGameOver();
            }
            showScoreForm();
            showReplayControls();
            return;
        }
        
        collisionDetection();
        draw();
        requestAnimationFrame(update);
    }
    
    gameState = { paddle, ball, blocks, score, blocksRemaining, update };
    draw();
    update();
}

function submitScore() {
    const playerName = document.getElementById('player-name').value.trim();
    
    if (!playerName) {
        alert('プレイヤー名を入力してください');
        return;
    }
    
    const scoreData = {
        gameId: parseInt(currentGame.id),
        playerName: playerName,
        score: currentScore,
        metadata: JSON.stringify(gameState)
    };
    
    fetch('/api/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(scoreData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('スコアの送信に失敗しました');
    })
    .then(data => {
        document.getElementById('result-message').innerHTML = 
            '<div class="success">スコアが記録されました！</div>';
        document.getElementById('score-form').style.display = 'none';
        showReplayControls();
    })
    .catch(error => {
        document.getElementById('result-message').innerHTML = 
            `<div class="error">エラー: ${error.message}</div>`;
    });
}

function skipScoreAndReplay() {
    document.getElementById('score-form').style.display = 'none';
    document.getElementById('result-message').innerHTML = '';
    replayGame();
}

function showReplayControls() {
    document.getElementById('replay-controls').style.display = 'block';
}

function replayGame() {
    // Stop current BGM
    if (typeof audioManager !== 'undefined') {
        audioManager.stopBGM();
    }
    
    // Reset game state
    currentScore = 0;
    gameState = {};
    document.getElementById('result-message').innerHTML = '';
    document.getElementById('score-form').style.display = 'none';
    document.getElementById('replay-controls').style.display = 'none';
    
    // Reload the game
    if (currentGame && currentGame.type && currentGame.id) {
        loadGame(currentGame.type, currentGame.id);
    }
}

