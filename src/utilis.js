// Validate team name based on given criteria
export function isValidTeamName(name) {
    const teamNamePattern = /^[A-Za-z0-9]{1,10}$/;
    return teamNamePattern.test(name);
}

// Validate if board size is within the allowed range
export function isValidBoardSize(x, y) {
    return (
        Number.isInteger(x) && Number.isInteger(y) &&
        x >= 1 && x <= 1000 &&
        y >= 1 && y <= 1000
    );
}

// Calculate the speed for a figure based on its x position and team speed factor
export function calcSpeed(x, speedFactor, isTopTeam) {
    let baseSpeed = (x % 2 === 0) ? 1 * speedFactor : Math.pow(2, speedFactor);
    return isTopTeam ? baseSpeed * -1 : baseSpeed;
}

// Function to initialize the game board with figures for each team
export function initializeBoard(width, height, teamASpeed, teamBSpeed) {
    let board = [];

    // Initialize team A (top side)
    for (let x = 0; x < width; x++) {
        board.push({
            team: 'A',
            x: x,
            y: 0,
            speed: calcSpeed(x, teamASpeed, true)
        });
    }

    // Initialize team B (bottom side)
    for (let x = 0; x < width; x++) {
        board.push({
            team: 'B',
            x: x,
            y: height - 1,
            speed: calcSpeed(x, teamBSpeed, false)
        });
    }

    return board;
}

// Function to move figures on the board
export function moveFigures(board, height) {
    let newBoard = [];

    // Move each figure according to its speed
    for (let figure of board) {
        let newY = figure.y + figure.speed;

        // Check if figure moves out of bounds
        if (newY >= 0 && newY < height) {
            newBoard.push({
                ...figure,
                y: newY
            });
        }
    }

    // Handle collisions
    return resolveCollisions(newBoard);
}

// Function to resolve collisions on the board
export function resolveCollisions(board) {
    let collisionMap = {};

    // Group figures by their positions
    for (let figure of board) {
        const key = `${figure.x},${figure.y}`;
        if (!collisionMap[key]) {
            collisionMap[key] = [];
        }
        collisionMap[key].push(figure);
    }

    let resolvedBoard = [];

    // Resolve collisions based on the problem statement rules
    for (let key in collisionMap) {
        const figures = collisionMap[key];

        if (figures.length === 1) {
            resolvedBoard.push(figures[0]); // No collision
        } else {
            // Collision: Remove figures with lower speed, or all in case of tie
            let minSpeed = Math.min(...figures.map(f => Math.abs(f.speed)));
            let survivingFigures = figures.filter(f => Math.abs(f.speed) !== minSpeed);

            if (survivingFigures.length === 1) {
                resolvedBoard.push(survivingFigures[0]);
            }
        }
    }

    return resolvedBoard;
}

// Function to check for a winner or a draw
export function checkWinner(board) {
    const teamACount = board.filter(figure => figure.team === 'A').length;
    const teamBCount = board.filter(figure => figure.team === 'B').length;

    if (teamACount > 0 && teamBCount === 0) {
        return 'Team A Wins';
    } else if (teamBCount > 0 && teamACount === 0) {
        return 'Team B Wins';
    } else if (teamACount === 0 && teamBCount === 0) {
        return 'Draw';
    } else {
        return null; // The game is still going
    }
}