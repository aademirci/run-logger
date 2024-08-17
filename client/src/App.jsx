import { useCookies } from "react-cookie"
import Login from "./user/Login"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Register from "./user/Register"

function App({ register }) {
    const [cookies] = useCookies(['runlogger'])
    const [userName, setUserName] = useState('')

    useEffect(() => {
        if (cookies.runlogger) {
            const tokenArray = cookies.runlogger.split('.')
            const tokenPayload = JSON.parse(window.atob(tokenArray[1]))
            setUserName(tokenPayload.userName)
        }
    }, [cookies])

    return (
        <div className="home container">
            <div className="headline">
                <h1>RunLogger</h1>
                <p>Know how much you have run in your lifetime.</p>
            </div>
            {!cookies.runlogger ? !register ? <Login /> : <Register /> : <Link to={`/user/${userName}`}>Go to your profile</Link>}
        </div>
    )
}

export default App
