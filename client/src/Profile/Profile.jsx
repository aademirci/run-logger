import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useParams } from "react-router-dom"
import Sidebar from "./Sidebar"
import Runs from "./Runs"
import NavBar from "../Common/NavBar"

const Profile = () => {
    const { username } = useParams()
    const [cookies] = useCookies(['runlogger'])
    const [user, setUser] = useState()

    useEffect(() => {
        axios.get(`http://localhost:8080/user/${username}`, {headers: { Authorization: `Bearer ${cookies.runlogger}` }}).then(result => setUser(result.data))
    }, [username, cookies])

    if (user) {
        return (
            <div className="container">
                <NavBar />
                <div className="profile-container">
                    <Sidebar user={user} />
                    <Runs list={user.runs} />
                </div>
            </div>
        )
    } else {
        return (
            <div>Please login first.</div>
        )
    }
    
}

export default Profile