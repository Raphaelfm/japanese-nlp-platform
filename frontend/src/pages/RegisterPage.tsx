import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Função para validar a senha
    const validatePassword = (password: string) => {
        const minLength = /.{7,}/; // Pelo menos 7 caracteres
        const uppercase = /[A-Z]/; // Pelo menos uma letra maiúscula
        const lowercase = /[a-z]/; // Pelo menos uma letra minúscula
        const specialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/; // Pelo menos um caractere especial

        if (!minLength.test(password)) return "Password must be at least 7 characters.";
        if (!uppercase.test(password)) return "Password must contain at least one uppercase letter.";
        if (!lowercase.test(password)) return "Password must contain at least one lowercase letter.";
        if (!specialChar.test(password)) return "Password must contain at least one special character.";

        return null; // Senha válida
    };

    const handleRegister = async () => {
        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await axios.post('http://localhost:3001/auth/register', { username, password });
            toast.success('Registration successful! Redirecting to Login...', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                onClose: () => navigate('/'),
            });
        } catch (err: unknown) {
            const errorMessage = axios.isAxiosError(err) && err.response?.data?.message 
                ? err.response.data.message 
                : 'Registration failed. Please try again.';
            setError(errorMessage);
            console.error(err);
            toast.error(errorMessage, {
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
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Register</h2>

                {error && <p className="text-red-500 text-center mb-2">{error}</p>}

                <input
                    type="email"
                    className="w-full p-2 border rounded mb-2 bg-gray-100 text-gray-900 placeholder-gray-600 focus:ring focus:ring-blue-400"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full p-2 border rounded mb-2 bg-gray-100 text-gray-900 placeholder-gray-600 focus:ring focus:ring-blue-400"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full p-2 border rounded mb-2 bg-gray-100 text-gray-900 placeholder-gray-600 focus:ring focus:ring-blue-400"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                    className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600 transition-all"
                    onClick={handleRegister}
                >
                    Register
                </button>

                <p className="text-center mt-2 text-gray-700">
                    Already have an account?{' '}
                    <a href="/" className="text-blue-500 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
}
