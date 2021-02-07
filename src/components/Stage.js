import React from "react";
import { StyledStage } from "./styles/StyledStage";
import Cell from "./Cell";

/* 
1. Mapping through the stage prop so we have a row 
2. Mapping through row and getting cell and x value
3. Each row becomes an array that holds the cells
4. For each cell, render the Cell component
*/
const Stage = ({ stage }) => (
  <StyledStage width={stage[0].length} height={stage.length}>
    {stage.map((row) => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </StyledStage>
);

export default Stage;
