export const createWinnerElement = (
  score: number,
  color: string,
  name: string,
  winsCount: number,
  time: number
) =>
  `<tr">
    <td>${score}</td>
    <td>${color}</td>
    <td>${name}</td>
    <td>${winsCount}</td>
    <td>${time}</td>
  </tr>
`;
