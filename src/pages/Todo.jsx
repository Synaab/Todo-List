import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Todo() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [showInput, setShowInput] = useState(false) 
  const [username, setUsername] = useState('') 
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/')
      return
    }
    axios
      .get('http://localhost:3001/api/auth/me', {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((res) => setUsername(res.data.username))
      .catch(() => {
        localStorage.removeItem('token')
        navigate('/')
      })
  }, [navigate])

  const fetchTasks = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/')
      return
    }
    try {
      const res = await axios.get('http://localhost:3001/api/tasks', {
        headers: { Authorization: 'Bearer ' + token },
      })
      setTasks(res.data)
    } catch {
      navigate('/')
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const addTask = async () => {
    if (!newTask.trim()) return
    const token = localStorage.getItem('token')
    try {
      await axios.post(
        'http://localhost:3001/api/tasks',
        { title: newTask },
        { headers: { Authorization: 'Bearer ' + token } }
      )
      setNewTask('')
      setShowInput(false)
      fetchTasks()
    } catch (error) {
      console.error(error)
    }
  }

  const toggleDone = async (id, done) => {
    const token = localStorage.getItem('token')
    try {
      await axios.put(
        `http://localhost:3001/api/tasks/${id}`,
        { done: !done },
        { headers: { Authorization: 'Bearer ' + token } }
      )
      fetchTasks()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteTask = async (id) => {
    const token = localStorage.getItem('token')
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${id}`, {
        headers: { Authorization: 'Bearer ' + token },
      })
      fetchTasks()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-800 p-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
          Your Todo List
        </h1>
        <div className="flex items-center space-x-6">
          <span className="text-lg font-semibold">{username}</span>
          <button
            onClick={() => {
              localStorage.removeItem('token')
              navigate('/')
            }}
            className="text-red-400 hover:text-red-600 font-semibold transition"
            title="Logout"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mb-6 flex items-center space-x-4">
        <button
          onClick={() => setShowInput(!showInput)}
          className="bg-green-500 hover:bg-green-600 transition rounded px-5 py-2 font-semibold shadow-lg"
        >
          {showInput ? 'Cancel' : 'Add Task'}
        </button>

        {showInput && (
          <>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Type new task..."
              className="flex-grow p-3 rounded-lg text-gray-900 font-medium shadow-inner focus:outline-none focus:ring-4 focus:ring-green-400"
            />
            <button
              onClick={addTask}
              className="bg-blue-500 hover:bg-blue-600 transition rounded px-5 py-2 font-semibold shadow-lg"
            >
              Save
            </button>
          </>
        )}
      </div>

      <ul className="space-y-4 max-w-xl mx-auto">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between p-4 rounded-xl shadow-lg transition
              ${
                task.done === 1
                  ? 'bg-green-600 bg-opacity-80 text-green-100'
                  : 'bg-gray-800 bg-opacity-80 text-white'
              }`}
          >
            <label className="flex items-center space-x-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={task.done === 1}
                onChange={() => toggleDone(task.id, task.done === 1)}
                className="w-5 h-5 rounded text-green-400 focus:ring-green-500"
              />
              <span className="text-lg font-semibold">{task.title}</span>
            </label>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-400 hover:text-red-600 transition text-2xl font-bold select-none"
              title="Delete task"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
