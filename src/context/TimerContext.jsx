import React, { createContext, useState, useContext } from 'react';

const TimerContext = createContext();

export function TimeProvider( { children }) {

    const [gameStart, setGameStart] = useState(false); // game hasn't started

    const startGame = () => {
        setGameStart(true);
    };

    const resetTime = () => {
        setGameStart(false);
    };

    const value = {
        gameStart,
        startGame,
        resetTime
    };

    return (
        <TimerContext.Provider value={value}>
            {children}
        </TimerContext.Provider>
    );
}

export function useTimer() {
    return useContext(TimerContext)
}