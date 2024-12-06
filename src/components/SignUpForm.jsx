import { useState } from "react"

export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    

    async function handleSubmit(event) {
        event.preventDefault();

        if (username.length < 8 || password.length < 8) {
            setError("The username and password must be at least 8 characters long.");
            return;
          }
      
        // Clear previous error if validation passes
        setError(null);

        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                });
            const json = await response.json();
            setToken(json.token);

        } catch (error) {
            setError(json.message);
        }
    }

    return (
        <>
            <div id="signUpForm">
                <h2>Sign Up</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input 
                            type="text" 
                            id="usernameInput"
                            name="username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        Password: 
                        <input 
                            type="text"
                            id="passwordInput"
                            name="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}