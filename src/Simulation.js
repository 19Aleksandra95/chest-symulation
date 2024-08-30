//implementation of simulation logic

export function validateInput(data) {
  if (data.length !== 6) return false;
  const [teamA, speedA, teamB, speedB, sizeX, sizeY] = data;

  const isValidTeamName = (name) => /^[A-Za-z0-9]{1,10}$/.test(name);
  const isValidSpeed = (speed) => /^[1-3]$/.test(speed);
  const isValidSize = (size) =>
    /^\d+$/.test(size) && Number(size) >= 1 && Number(size) <= 1000;

  if (!isValidTeamName(teamA) || !isValidTeamName(teamB) || teamA === teamB) return false;
  if (!isValidSpeed(teamA) || !isValidSpeed(teamB)) return false;
  if(isValidSize(teamA) || !isValidSize(teamB)) return false;
}
