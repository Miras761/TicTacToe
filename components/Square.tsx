
import React from 'react';

type Player = 'X' | 'O';
type SquareValue = Player | null;

interface SquareProps {
    value: SquareValue;
    onClick: () => void;
    isWinning: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinning }) => {
    const playerXClass = 'text-cyan-500';
    const playerOClass = 'text-emerald-500';
    const winningClass = 'bg-yellow-300 dark:bg-yellow-500 animate-pulse';
    
    const valueClass = value === 'X' ? playerXClass : playerOClass;

    return (
        <button
            className={`
                w-20 h-20 md:w-24 md:h-24 
                flex items-center justify-center 
                text-5xl md:text-6xl font-bold 
                bg-slate-100 dark:bg-slate-800 
                rounded-md shadow-sm
                transition-all duration-300 ease-in-out
                transform hover:scale-105 hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-indigo-400
                ${value ? 'cursor-not-allowed' : 'cursor-pointer'}
                ${isWinning ? winningClass : ''}
            `}
            onClick={onClick}
            aria-label={`Square ${value || 'empty'}`}
        >
            <span className={valueClass}>{value}</span>
        </button>
    );
};

export default Square;
