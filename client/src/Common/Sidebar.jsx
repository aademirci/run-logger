import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useParams } from "react-router-dom"

const Sidebar = () => {
    const { username } = useParams()
    const [cookies] = useCookies(['runlogger'])
    const [user, setUser] = useState()

    useEffect(() => {
        axios.get(`http://localhost:8080/user/${username}`, {headers: { Authorization: `Bearer ${cookies.runlogger}` }}).then(result => setUser(result.data))
    }, [username, cookies])

    if (user) {
        return (
            <aside className="sidebar">
                <div className="profile-pic">Profile pic</div>
                <ul>
                    {user.fullName && <li>{user.fullName}</li>}
                    <li>@{user.userName}</li>
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