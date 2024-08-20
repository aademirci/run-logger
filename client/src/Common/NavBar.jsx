import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Link } from "react-router-dom"

const NavBar = () => {
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
        <nav className="nav-bar">
            <h1><Link to={`/`}>RunLogger</Link></h1>
            <ul className="nav-menu">
                <li>Leaderboard</li>
                <li>Search</li>
                <li><Link to={`/user/${userName}/run/create`} className="button" reloadDocument>Log run</Link></li>
                <li><Link to={`/user/${userName}`}>Profile</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar