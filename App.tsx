
import React, { useState, useCallback } from 'react';
import Board from './components/Board';

type Player = 'X' | 'O';
type SquareValue = Player | null;

const App: React.FC = () => {
    const [board, setBoard] = useState<Array<SquareValue>>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState<boolean>(true);

    const calculateWinner = useCallback((squares: Array<SquareValue>): { winner: Player; line: number[] } | null => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { winner: squares[a] as Player, line: lines[i] };
            }
        }
        return null;
    }, []);

    const winnerInfo = calculateWinner(board);
    const winner = winnerInfo?.winner;
    const isDraw = board.every(square => square !== null) && !winner;

    const handleClick = (i: number): void => {
        if (winner || board[i]) {
            return;
        }
        const newBoard = board.slice();
        newBoard[i] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const handleRestart = (): void => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };
    
    const getStatusMessage = (): React.ReactNode => {
        if (winner) {
            return (
                <>
                    Winner is: <span className={winner === 'X' ? 'text-cyan-500' : 'text-emerald-500'}>{winner}</span>
                </>
            );
        }
        if (isDraw) {
            return "It's a Draw!";
        }
        return (
            <>
                Next player: <span className={isXNext ? 'text-cyan-500' : 'text-emerald-500'}>{isXNext ? 'X' : 'O'}</span>
            </>
        );
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500">
            <main className="flex flex-col items-center bg-slate-200 dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
                <header className="mb-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-700 dark:text-slate-100">Zen Tic-Tac-Toe</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">A moment of calm competition</p>
                </header>

                <div className="mb-4 text-2xl font-semibold text-slate-600 dark:text-slate-300 h-8">
                    {getStatusMessage()}
                </div>

                <Board squares={board} onClick={handleClick} winningLine={winnerInfo?.line || []} />

                <button
                    onClick={handleRestart}
                    className="mt-8 flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.885-.666A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566z" clipRule="evenodd" />
                    </svg>
                    Restart Game
                </button>
            </main>
        </div>
    );
};

export default App;
