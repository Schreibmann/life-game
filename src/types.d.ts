export type CellProps = {
    row: number;
    col: number;
    isAlive: boolean;
    onClick?: ({ row, col, isAlive }: CellProps) => void
}

export type LifeMatrixType = Array<Array<boolean>>