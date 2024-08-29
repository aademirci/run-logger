import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Link, useLocation, useParams } from "react-router-dom"

const Sidebar = () => {
    const { username } = useParams()
    const [cookies] = useCookies(['runlogger'])
    const [user, setUser] = useState()
    const location = useLocation();

    useEffect(() => {
        axios.get(`http://localhost:8080/user/${username}`, {headers: { Authorization: `Bearer ${cookies.runlogger}` }}).then(result => setUser(result.data))
    }, [username, cookies, location])

    if (user) {
        return (
            <aside className="sidebar">
                <div className="profile-pic">Profile pic</div>
                <ul>
                    {user.fullName && <li>{user.fullName}</li>}
                    <li>@{user.userName} {username === JSON.parse(window.atob(cookies.runlogger.split('.')[1])).userName && <Link to={`/user/${username}/edit`}>(edit profile)</Link>}</li>
                    {user.height && <li>{user.height}cm</li>}
                    {user.weight && <li>{user.weight}kg</li>}
                    {user.shoesBrand && <li>{user.shoesBrand} {user.shoesModel && `(${user.shoesModel})`}</li>}
                    <li>Total run: {user.totalRun}km</li>
                </ul>
                
            </aside>
        )
    } else {
        return (
            <div>Please login first.</div>
        )
    }
    
}

export default Sidebar