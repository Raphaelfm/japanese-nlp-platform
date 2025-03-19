import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            toast.warn('Please enter both username and password.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        try {
            const response = await axios.post('https://japanese-nlp-platform-production.up.railway.app/auth/login', {
                username,
                password,
            });

            if (response.data.access_token) {
                localStorage.setItem('token', response.data.access_token);
                toast.success('Login successful! Redirecting...', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    onClose: () => navigate('/translate'),
                });
            } else {
                toast.error('Invalid credentials. Please try again.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.error('Login failed', error);
            toast.error('Error logging in. Please check your credentials.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="">
            <ToastContainer />
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Welcome/ようこそ</h2>

                <input
                    className="w-full p-3 border rounded mb-3 bg-gray-100 text-gray-900 h-10"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className="w-full p-3 border rounded mb-3 bg-gray-100 text-gray-900 h-10"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="bg-blue-500 text-white w-full p-3 rounded hover:bg-blue-600 transition"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
