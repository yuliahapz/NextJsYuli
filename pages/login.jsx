import styles from "../styles/Login.module.css"
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import { setCookie } from "cookies-next";

const Login =()=> {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const apiKey = 'w05KkI9AWhKxzvPFtXotUva-'

    const handleSubmit= async (e) => {
        e.preventDefault();

        try {
        const res = await axios.post (
            "https://api-boothcamp.do.dibimbing.id/api/v1/login",
            
            { email: email, password: password },
            {
                headers : {
                    "Content-Type": "application/json",
                    apiKey: apiKey,
                }
            }
        );

        const token = res.data.data.token;

        setCookie("token", token,{
            maxAge: 60 * 60 * 24,
            path: '/',});

        router.push("/makanan");
    }   catch(error) {
        console.error('Login failed:', error.response?.data);
        alert(error.res?.data?.message || error.message);
    }
}
return (
    <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Login</h2>
        <p>Email</p>
        <input
            type="text"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            placeholder="Enter your email"
            required/>
        <p>Password</p>
        <input
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="Enter your password"
            required/>
            <button type="submit">Login</button>
            </form>
            </div>
);
}
export default Login;