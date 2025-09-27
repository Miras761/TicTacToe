
import React from 'react';
import Square from './Square';

type Player = 'X' | 'O';
type SquareValue = Player | null;

interface BoardProps {
    squares: Array<SquareValue>;
    onClick: (i: number) => void;
    winningLine: number[];
}

const Board: React.FC<BoardProps> = ({ squares, onClick, winningLine }) => {
    const renderSquare = (i: number) => {
        return (
            <Square
                key={i}
                value={squares[i]}
                onClick={() => onClick(i)}
                isWinning={winningLine.includes(i)}
            />
        );
    };

    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-3 bg-slate-300 dark:bg-slate-700 p-3 rounded-lg shadow-inner">
            {[...Array(9)].map((_, i) => renderSquare(i))}
        </div>
    );
};

export default Board;
