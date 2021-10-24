import React from "react";
import { CellProps } from "./types";
import cn from 'classnames';

import style from './cell.module.scss'


const Cell = React.memo((props: CellProps) => {
  const { row, col, isAlive } = props;
  const className = cn(style.cell, { [style.cell__alive]: props.isAlive })
  
  const handleClick: React.MouseEventHandler<HTMLSpanElement> = () => {
    props.onClick?.({ row, col, isAlive })
  }
  return (
      <span onClick={handleClick} className={className} />
  );
})

export default Cell;
