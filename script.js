        let c = 0;
        let firstTurn = 0;
        let gameOver = false;
        let Xwin = 0;
        let Owin = 0;
        let totalGamePlay = 0;

        function makeMove(boxId) {
            if (!gameOver) {
                const box = document.getElementById(`box${boxId}`);
                if (box.innerHTML === "") {
                    const player = (c % 2 === 0) ? 'X' : 'O';
                    const nextPlayer = (c % 2 === 0) ? 'O' : 'X';
                    box.innerHTML = player;
                    c++;

                    document.getElementById("Complement").innerHTML = nextPlayer + "'s Turn.";
                    checkWin();
                }
            }
        }


        const lines = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
            [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
            [1, 5, 9], [3, 5, 7] // diagonals
        ];


        function checkWin() {
            if (!gameOver) {
                for (const line of lines) {
                    const [a, b, c] = line;
                    if (document.getElementById(`box${a}`).innerHTML !== "" &&
                        document.getElementById(`box${a}`).innerHTML === document.getElementById(`box${b}`).innerHTML &&
                        document.getElementById(`box${a}`).innerHTML === document.getElementById(`box${c}`).innerHTML) {
                        for (const l of line) {
                            document.getElementById(`box${l}`).style.color = "yellow";
                        }
                        gameOver = true;
                        const winner = document.getElementById(`box${a}`).innerHTML;
                        document.getElementById("Complement").innerHTML = winner + " is win!";
                        if (winner === 'X') Xwin++;
                        else if (winner === 'O') Owin++;
                        showScore();
                        gameOver = true;
                        return;
                    }
                }


                if (firstTurn === 0) {
                    if (c === 9) {
                        document.getElementById("Complement").innerHTML = "Match Draw!";
                        gameOver = true;
                        return;
                    }
                }
                else if (firstTurn === 1) {
                    if (c === 10) {
                        document.getElementById("Complement").innerHTML = "Match Draw!";
                        gameOver = true;
                        return;
                    }
                }
            }
        }

        function showScore() {
            document.getElementById("X_score").innerHTML = Xwin;
            document.getElementById("O_score").innerHTML = Owin;
        }

        function rePlay() {
            const boxIds = ['box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'box7', 'box8', 'box9'];

            for (const boxId of boxIds) {
                document.getElementById(boxId).innerHTML = "";
            }

            // document.getElementById("Complement").innerHTML = "Playing...";
            gameOver = false;

            totalGamePlay++;
            if (totalGamePlay % 2 === 0) {
                c = 0;
                firstTurn = 0;
            }
            if (!(totalGamePlay % 2 === 0)) {
                c = 1;
                firstTurn = 1;
            }

            for (const line of lines) {
                const [a, b, c] = line;
                for (const l of line) {
                    document.getElementById(`box${l}`).style.color = "white";
                }
            }
        }