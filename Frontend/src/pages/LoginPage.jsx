import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL;

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            alert('incorrect credencials');
            return;
        }
        try {
            setIsLoading(true);
            const response = await axios.post(`${API_URL}/users/login`, { username: username, password: password });
            alert('login succesfull');
            localStorage.setItem("user", JSON.stringify(response.data));
            setIsLoading(false);
            navigate("/")
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <div className='bg-white'>
            <div className="flex justify-center items-center h-100 ">
                <form onSubmit={loginUser} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <h1 className="text-lg justify-center font-bold">Login</h1>
                    <label className="label font-bold">Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" />
                    <label className="label font-bold">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" />
                    <Link to="/register" className='text-blue-500'>or create an account?</Link>
                    {!isLoading && (<button className="btn bg-cyan-600 text-white hover:bg-cyan-700 mt-4 font-bold">Login</button>)}
                </form>
            </div>
        </div>
    )
}
export default LoginPage;