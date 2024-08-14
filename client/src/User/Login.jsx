/* eslint-disable no-unused-vars */
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'

const Login = () => {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['runlogger'])
    const [inputValue, setInputValue] = useState({
        userName: '',
        password: ''
    })

    const { userName, password } = inputValue

    const handleChange = e => {
        const { name, value } = e.target
        setInputValue({ ...inputValue, [name]: value })
    }

    async function handleClick() {
        try {
            const { data } = await axios.post('http://localhost:8080/user/login', inputValue)
            const { token, msg } = data

            if (token) {
                alert(msg)
                setCookie('runlogger', token, { path: '/' })
                navigate(`/user/${userName}`)
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
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" onChange={handleChange} value={password} />
            <button onClick={handleClick}>Log in</button>
        </div>
    )
}

export default Login