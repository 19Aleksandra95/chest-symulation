//implementation of simulation logic

export function validateInput(data) {
  if (data.length !== 6) return false;
  const [teamA, speedA, teamB, speedB, sizeX, sizeY] = data;

  const isValidTeamName = (name) => /^[A-Za-z0-9]{1,10}$/.test(name);
  const isValidSpeed = (speed) => /^[1-3]$/.test(speed);
  const isValidSize = (size) =>
    /^\d+$/.test(size) && Number(size) >= 1 && Number(size) <= 1000;

  if (!isValidTeamName(teamA) || !isValidTeamName(teamB) || teamA === teamB)
    return false;
  if (!isValidSpeed(teamA) || !isValidSpeed(teamB)) return false;
  if (isValidSize(sizeX) || !isValidSize(sizeY)) return false;

  return true;
}

function calcSpeed(x, teamSpeed, isTop) {
  const baseSpeed = x % 2 === 0 ? 1 * teamSpeed : Math.pow(2, teamSpeed);
  return isTop ? -baseSpeed : baseSpeed;
}

export function runSimultion(data) {
  let [teamA, speedA, teamB, speedB, sizeX, sizeY] = data;
  speedA = parseInt(speedA);
  speedB = parseInt(speedB);
  sizeX = parseInt(sizeX);
  sizeY = parseInt(sizeY);
}

let teamAPieces = new Array(sizeX)
  .fill(0)
  .map((_, i) => ({ x: i, y: 0, speed: calcSpeed(i, speedA, true) }));
let teamBPieces = new Array(sizeX)
  .fill(0)
  .map((_, i) => ({ x: i, y: sizeY - 1, speed: calcSpeed(i, speedB, false) }));
while (teamAPieces.length > 0 && teamBPieces.length > 0) {
  const map = new Map();

  teamAPieces.forEach((piece) => (piece.y += piece.speed));
  teamBPieces.forEach((piece) => (piece.y += piece.speed));

  teamAPieces = teamAPieces.filter((piece) => piece.y >= 0 && piece.y < sizeY);
  teamBPieces = teamBPieces.filter((piece) => piece.y >= 0 && piece.y < sizeY);
}
