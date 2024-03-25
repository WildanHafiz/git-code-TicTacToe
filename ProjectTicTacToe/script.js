document.addEventListener('DOMContentLoaded', () => {
    const homeScreen = document.getElementById('homeScreen');
    const homebuttons = document.getElementById('buttons');
    const about = document.getElementById('about');
    const aboutButtons = document.getElementById('about-buttons');
    const board = document.getElementById('board');
    const gameStatus = document.getElementById('game-status');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');
    const headline = document.getElementById('headline');
    const profilegame = document.getElementById('profile-game');
    const devProfile = document.getElementById('devProfile');
    const flowchart = document.getElementById('flowchart');

    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;
    let aboutDrawn = false;


    const showHome = () => {
        homeScreen.style.display = 'block';
        homebuttons.style.display = 'flex';
        about.style.display = 'none';
        board.style.display = 'none';
        gameStatus.style.display = 'none';
        aboutButtons.style.display = 'none';
    };

    // Function to show the about section
    const showAbout = () => {
        headline.style.display = 'none';
        homeScreen.style.display = 'none';
        homebuttons.style.display = 'none';
        about.style.display = 'block';
        board.style.display = 'none';
        gameStatus.style.display = 'none';
        aboutButtons.style.display = 'flex';

        if (!aboutDrawn) {
            drawabout();
            aboutDrawn = true; // Set the flag to true after drawing about section
        }
    };

    // Function to show the game board
    const showBoard = () => {
        headline.style.display = 'block';
        homeScreen.style.display = 'none';
        homebuttons.style.display = 'none';
        about.style.display = 'none';
        board.style.display = 'grid';
        gameStatus.style.display = 'block';
        aboutButtons.style.display = 'none';
    };

    const showProfile = () => {
        flowchart.style.display = 'none';
        profilegame.style.display = 'flex';
        devProfile.style.display = 'flex';
    }

    const showFlowchart = () => {
        devProfile.style.display = 'none';
        profilegame.style.display = 'flex';
        flowchart.style.display = 'flex';
    }

    // Function to handle button clicks
    const handleButtonClick = (section) => {
        if (section === 'home') {
            showHome();
        } else if (section === 'about') {
            showAbout();
        } else if (section === 'board') {
            showBoard();
        }
    };
    
    const handleButtonClick2 = (section) => {
        if (section === 'devProfile') {
            showProfile();
        } else if (section === 'flowchart') {
            showFlowchart();
        }
    };

    // Membuat kotak papan permainan
    const drawBoard = () => {
        for (let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.index = i;
            square.addEventListener('click', () => handleSquareClick(square));
            board.appendChild(square);
        }    
    }

    // membuat HomeScreen

    const drawHome = () => {
        homeScreen.classList.add('homeScreen');
        let start = document.createElement('h1');
        start.classList.add('start');
        start.innerHTML = 'Mulai Permainan';
        homeScreen.appendChild(start);
        let homedesc = document.createElement('p');
        homedesc.innerHTML = 'Tic Tac Toe adalah permainan di mana dua pemain bergantian menempatkan tanda (biasanya X dan O) pada grid 3x3. Tujuannya adalah menjadi yang pertama menempatkan tiga tanda mereka secara berurutan, baik horizontal, vertikal, atau diagonal.'
        homeScreen.appendChild(homedesc);
        let aboutButton = document.createElement('button');
        aboutButton.classList.add('aboutButton');
        aboutButton.innerHTML = 'About Game';
        homebuttons.appendChild(aboutButton);
        let startButton = document.createElement('button');
        startButton.classList.add('startButton');
        startButton.innerHTML = 'Start Game';
        homebuttons.appendChild(startButton);
        

        startButton.addEventListener('click', () => {
            handleButtonClick('board');
            drawBoard();
        });

        aboutButton.addEventListener('click', () => {
            handleButtonClick('about');
        });
    
    }
    drawHome();

    //menggambar about
    const drawabout = () => {
        about.classList.add('about');
        let aboutHeadline = document.createElement('h1');
        aboutHeadline.innerHTML = 'About Game';
        let aboutDesc = document.createElement('p');
        aboutDesc.innerHTML = 'Game sangat penting untuk perkembangan otak manusia. Seorang akan mulai berpikir jika sudah dihadapkan dengan sebuah masalah. Kami mencoba untuk membuat game Tic Tac Toe yang merupakan permainan sederhana yang dimainkan oleh dua pemain secara bergantian di atas papan permainan berukuran 3x3. Setiap pemain memiliki simbol unik, biasanya "X" atau "O", dan tujuannya adalah untuk menempatkan tiga simbol yang sama secara berurutan secara horizontal, vertikal, atau diagonal di papan permainan. Game ini bertujuan untuk memberikan pengalaman bermain yang intuitif dan menarik bagi pemain, serta memberikan kesempatan bagi pengguna untuk meningkatkan strategi dan keterampilan pemikiran taktis mereka.';
        about.appendChild(aboutHeadline);
        about.appendChild(aboutDesc);
    
        let backButton = document.createElement('button');
        backButton.classList.add('backButton');
        backButton.innerHTML = 'Back Home';
        aboutButtons.appendChild(backButton);

        let flowchartButton = document.createElement('button');
        flowchartButton.classList.add('flowchartButton');
        flowchartButton.innerHTML = 'Flowchart Game'
        aboutButtons.appendChild(flowchartButton);

        let profileButton = document.createElement('button');
        profileButton.classList.add('profileButton');
        profileButton.innerHTML = 'Devs - Profile';
        aboutButtons.appendChild(profileButton);
        
    
        backButton.addEventListener('click', () => {
            handleButtonClick('home');
        });

        profileButton.addEventListener('click', () => {
            handleButtonClick2('devProfile');
        });

        flowchartButton.addEventListener('click', () => {
            handleButtonClick2('flowchart');
        });

        
    }

    // Fungsi untuk menangani klik pada kotak
    function handleSquareClick(square) {
        const index = square.dataset.index;
        if (boardState[index] === '' && !gameOver) {
            boardState[index] = currentPlayer;
            square.textContent = currentPlayer;
            square.classList.add('player');
            checkWin();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateStatus();
        }
    }

    // membuat halaman game over
    const drawGameover = (result) => {
        const gameoverBoard = document.getElementById('gameover-board');
        gameoverBoard.classList.add('gameover-board');
        
        let gameoverTitle = document.createElement('h1');
        if (result.includes('wins')) {
            gameoverTitle.textContent = 'Congratulations!';
            gameoverTitle.classList.add('congratulations-animation');

        } else {
            gameoverTitle.textContent = 'Game Over';
        }
        gameoverBoard.appendChild(gameoverTitle);
    
        let message = document.createElement('h2');
        message.textContent = result;
        gameoverBoard.appendChild(message);
    
        let gameoverButton =  document.createElement('button');
        gameoverButton.classList.add('gameover-button');
        gameoverButton.textContent = 'Back to Home';
        gameoverBoard.appendChild(gameoverButton);
    
        gameoverButton.addEventListener('click', () => {
            location.reload();
        });
    }

    // Fungsi untuk memeriksa kemenangan
    function checkWin() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // baris
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // kolom
            [0, 4, 8], [2, 4, 6] // diagonal
        ];

        

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                result = `Player ${currentPlayer} wins!`;
                gameOver = true;
                drawGameover(result);

                triggerConfetti();

                 board.style.display = 'none';
                status.style.display = 'none';
                resetButton.style.display = 'none';
                headline.style.display = 'none';

                // canvas.confetti = canvas.confetti || confetti.create(canvas, { resize: true });

                // canvas.confetti({
                //     spread: 70,
                //     origin: { y: 1.2 }
                // });

                return;
            }
        }

        if (!boardState.includes('')) {
            result = "It's a draw!";
            headline.style.display = 'none';
            board.style.display = 'none';
            status.style.display = 'none';
            resetButton.style.display = 'none';
            drawGameover(result);
            gameOver = true;
            return;
        }

        function triggerConfetti() {
            const confettiCount = 100; // Number of confetti particles
            const duration = 5000; // Duration of animation in milliseconds
        
            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.animationDuration = (Math.random() * duration + duration / 2) / 1000 + 's';
                document.body.appendChild(confetti);
            }
        
            setTimeout(() => {
                document.querySelectorAll('.confetti').forEach((el) => {
                    el.remove();
                });
            }, duration);
        }
    }

    // Fungsi untuk memperbarui status permainan
    function updateStatus() {
        status.textContent = `Player ${currentPlayer}'s turn`;
    }

    // Fungsi untuk mereset permainan
    resetButton.addEventListener('click', () => {
        boardState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameOver = false;
        updateStatus();
        document.querySelectorAll('.square').forEach(square => square.textContent = '');
    });

    // Menampilkan status awal permainan
    updateStatus();

    showHome();

});
