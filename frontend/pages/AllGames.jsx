import React from "react";
import "../styles/styles.css";
import { useUser } from "../context/UserContext";

export default function AllGames() {
    const { user, setUser } = useUser();
    
    function loggedGamesPage () {
    if (user === undefined) {    
        return (
            <>
            <div>
                <h1>Active Games</h1>
            </div>
            <div>
                <h1>Completed Games</h1>
            </div>
            </>
        );
    } else {
        return (
        <>
        <div>
        <h1> Open Games</h1>
        </div>

        <div>
        <h1> My Open Games</h1>
        </div>

        <div>
        <h1> My Active Games</h1>
        </div>

        <div>
        <h1> My Completed Games</h1>
        </div>

        <div>
        <h1> Other Games</h1>
        </div>
        </>
      );
    }
    }
    return (
        <div>
        {loggedGamesPage()}
        </div>
    )
}