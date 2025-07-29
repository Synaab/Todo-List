import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            const res = await axios.post('http://localhost:3001/api/auth/signup', {
                username,
                password,
            })
            alert(res.data.message)
            navigate('/')  // بعد از ثبت‌نام می‌ریم لاگین
        } catch (err) {
            setError(err.response?.data?.error || 'Error occurred')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500">
            <form
                onSubmit={handleSubmit}
                className="bg-white bg-opacity-30 backdrop-blur-md p-8 rounded-2xl shadow-xl w-80 border border-white/30"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign Up</h2>
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
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Register
                </button>
                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="/" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </form>
        </div>
    )
}
