import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState({
        userName: '',
        email: '',
        password: ''
    })

    const { userName, email, password } = inputValue
    
    const handleChange = e => {
        const { name, value } = e.target
        setInputValue({ ...inputValue, [name]: value })
    }


    async function handleClick() {
        try {
            const { data } = await axios.post('http://localhost:8080/user/register', { ...inputValue })

            const { newUser, msg } = data

            if (newUser) {
                alert(msg)
                navigate('/login')
            } else {
                alert(msg)
            }
        } catch (error) {
            console.log(error)
        }

        
    }

    return (
        <div>
            <label htmlFor="userName">Username:</label>
            <input type="text" name="userName" id="userName" onChange={handleChange} value={userName} />
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" onChange={handleChange} value={email} />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" onChange={handleChange} value={password} />
            <button onClick={handleClick}>Sign up</button>
        </div>
    )
}

export default Register