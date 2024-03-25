document.addEventListener('DOMContentLoaded', () => {
    const homeScreen = document.getElementById('homeScreen');
    const homebuttons = document.getElementById('buttons');
    const about = document.getElementById('about');
    const board = document.getElementById('board');
    const gameStatus = document.getElementById('game-status');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');
    const headline = document.getElementById('headline');

    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;

    const showHome = () => {
        homeScreen.style.display = 'block';
        homebuttons.style.display = 'flex';
        about.style.display = 'none';
        board.style.display = 'none';
        gameStatus.style.display = 'none';
    };

    // Function to show the about section
    const showAbout = () => {
        headline.style.display = 'none';
        homeScreen.style.display = 'none';
        homebuttons.style.display = 'none';
        about.style.display = 'block';
        board.style.display = 'none';
        gameStatus.style.display = 'none';
    };

    // Function to show the game board
    const showBoard = () => {
        headline.style.display = 'block';
        homeScreen.style.display = 'none';
        homebuttons.style.display = 'none';
        about.style.display = 'none';
        board.style.display = 'grid';
        gameStatus.style.display = 'block';
    };

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
            drawabout();
        });
    
    }
    drawHome();

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
        about.appendChild(backButton);
    
        backButton.addEventListener('click', () => {
            handleButtonClick('home');
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
        let gameoverDisplay = document.createElement('h1');
        gameoverDisplay.innerHTML = 'Game Over';
        gameoverBoard.appendChild(gameoverDisplay);
        let message = document.createElement('h2');
        message.innerHTML = result;
        gameoverBoard.appendChild(message);
        let gameoverButton =  document.createElement('button');
        gameoverButton.classList.add('gameover-button');
        gameoverButton.innerHTML = 'Back to Home';
        gameoverBoard.appendChild(gameoverButton);
        gameoverButton.addEventListener('click', () => {
            location.reload();
        })
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
                board.style.display = 'none';
                status.style.display = 'none';
                resetButton.style.display = 'none';
                headline.style.display = 'none';
                drawGameover(result);
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