import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')

        try {
            const res = await axios.post('http://localhost:3001/api/auth/login', {
                username,
                password,
            })
            localStorage.setItem('token', res.data.token)
            navigate('/todo')
        } catch (err) {
            setError(err.response?.data?.error || 'Error occurred')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500">
            <form
                onSubmit={handleLogin}
                className="bg-white bg-opacity-30 backdrop-blur-md p-8 rounded-2xl shadow-xl w-80 border border-white/30"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
                {error && (
                    <div className="mb-4 text-red-600 text-center">{error}</div>
                )}
                <input
                    type="text"
                    placeholder="Username"
                    className="mb-4 w-full p-2 border border-gray-300 rounded bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="mb-4 w-full p-2 border border-gray-300 rounded bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-600"
                >
                    Login
                </button>
                <p className="mt-4 text-center text-gray-600">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-blue-600 hover:underline">
                        Sign Up
                    </a>
                </p>
            </form>
        </div>

    )
}
