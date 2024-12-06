import { useState } from "react"

export default function Authenticate({ token }) {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    async function handleClick() {
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", 
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
            const json = await response.json();
            console.log(json);
            if (json.data && json.data.username) {
                setUsername(json.data.username);
                setSuccessMessage(json.message);
            } else {
                setError(json.message);
            }

        } catch (error) {
            setError(error.message);
        } 
    }

    return (
        <>
            <div id="authenticate">
                <h2>Authenticate</h2>
                {username.length < 8 && error && <p id="authenticationError">{error}</p>}
                {successMessage && username.length >= 8 && <p>{successMessage} Welcome, {username}!</p>}
                <button
                    onClick={handleClick}
                    id="authenticateBtn"
                >
                    Authenticate Token
                </button>
            </div>
        </>
    )
}