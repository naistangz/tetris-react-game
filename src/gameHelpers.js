export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

/*
Creating nested array
1. Creating a multidimensional array to represent rows and columns
2. Creating a multidimensional array to build a grid using Array
3. Array.from() creates shallow-copied Array instance e.g.
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]
4. Creating another array by supplying an inline function 
5. For each row we create a new array from STAGE_WIDTH and fill it with another array - setting to 0 and Clear
6. 0 is nothing but will contain the tetromino in that particular cell, represents a clean cell
7. 'Clear' property will be set to merge when tetromino is merged 
*/

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // 1. Check that we are in a tetromino cell
      if (player.tetromino[y][x] !== 0) {
        if (
          // 2. Check that our move is inside the frame height (y)
          // 3. Check that our move touches the bottom of the frame
          !stage[y + player.position.y + moveY] ||
          // 4. Check that move is within the frame width (x)
          !stage[y + player.position.y + moveY][
            x + player.position.x + moveX
          ] ||
          // 5. Check that cell we are moving to isn't set to clear
          stage[y + player.position.y + moveY][
            x + player.position.x + moveX
          ][1] !== "clear"
        ) {
          return true;
        }
      }
    }
  }
};
