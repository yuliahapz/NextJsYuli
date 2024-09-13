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
            "https://api-bootcamp.do.dibimbing.id/api/v1/login",
            { email: email, password: password },
            {
                headers : {
                    "Content-Type": "application/json",
                    apiKey: apiKey,
                }
            }
        );
        console.log(res.data);
        const token = res.data?.token;

        setCookie("token", token,{
            maxAge: 60 * 60 * 24,
            path: '/',});

        router.push("/");
    }   catch(error) {
        console.error('Login failed:', error.response?.data);

        if (error.response?.status === 404) {
            alert ("Invalid email or password, Please try again");
        }else{
            alert(error.res?.data?.message || error.message);
        }
    };
}
return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-800">
            <img 
                src="https://wallpapercave.com/wp/wp8947204.jpg" 
                alt="Food Collage" 
                className="absolute inset-0 w-full h-full object-cover brightness-50" 
            />
        <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
                >
                    Login
                </button>
                <pre className="text-gray-300 text-xs">user dummy: miftahfarhan@gmail.com</pre>
                <pre className="text-gray-300 text-xs">password: qwerty123</pre>
            </form>
        </div>
    </div>
);
}
export default Login;