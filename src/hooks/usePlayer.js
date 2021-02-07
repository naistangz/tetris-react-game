import { useState, useCallback } from "react";

import { TETROMINOS, randomTetromino } from "../tetrominos";
import { checkCollision, STAGE_WIDTH } from "../gameHelpers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    position: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  function rotate(matrix, direction) {
    // Make the rows to become cols (transpose)
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    );
    // Reverse each row to get rotated matrix
    if (direction > 0) return rotatedTetro.map((row) => row.reverse());
    return rotatedTetro.reverse();
  }

  function playerRotate(stage, direction) {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, direction);

    const position = clonedPlayer.position.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.position.x += offset; // Keeping track of steps
      offset = -(offset + (offset > 0 ? 1 : -1)); // Creating back and forth movement
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -direction);
        clonedPlayer.position.x = position;
        return;
      }
    }
    setPlayer(clonedPlayer);
  }

  const updatePlayerPosition = ({ x, y, collided }) => {
    setPlayer((previous) => ({
      ...previous,
      position: {
        x: (previous.position.x += x),
        y: (previous.position.y += y),
      },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      position: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPosition, resetPlayer, playerRotate];
};
