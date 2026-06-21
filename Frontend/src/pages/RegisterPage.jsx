import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const RegisterPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        if (username === "" || password === "" || email === "") {
            alert("incorrect credentials")
            return;
        }
        try {
            setIsLoading(true);
            const response = await axios.post(`${API_URL}/users`, { username: username, password: password, email: email });
            alert(`User ${response.data.username} created!`);
            setIsLoading(false);
            navigate("/");
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center h-100">
            <form onSubmit={saveUser} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend font-bold text-lg">Create an account</legend>

                <label className="label font-bold">Username</label>
                <input type="text" className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />

                <label className="label font-bold">Email</label>
                <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

                <label className="label font-bold">Password</label>
                <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                {!isLoading && (<button className="btn font-bold text-white bg-cyan-600 hover:bg-cyan-700 mt-4">Create Account</button>)}
            </form>
        </div>
    )
}
export default RegisterPage