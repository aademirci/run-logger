import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useCookies } from "react-cookie"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"

const Sidebar = () => {
    const navigate = useNavigate()
    const { username } = useParams()
    const [cookies] = useCookies(['runlogger'])
    const [user, setUser] = useState()
    const location = useLocation()
    const inputFile = useRef(null)
    const URL = 'http://localhost:8080/user/'

    useEffect(() => {
        axios.get(`${URL}${username}`, { headers: { Authorization: `Bearer ${cookies.runlogger}` } }).then(result => setUser(result.data))
    }, [username, cookies, location])

    const handleClick = () => {
        inputFile.current.click()
    }

    const handleChange = async () => {
        try {
            const avatar = inputFile.current.files[0]
            const formData = new FormData()
            formData.append('image', avatar)
            const { data } = await axios.put(`${URL}${username}/avatar`, formData, { headers: { Authorization: `Bearer ${cookies.runlogger}` } })
            const { user, msg } = data
            if (user) {
                alert(msg)
                navigate(`/user/${user.userName}`)
            } else {
                alert(msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (user) {
        return (
            <aside className="sidebar">
                <div className="profile-pic">
                    <img src={user.avatarURL} alt="User avatar" />
                    <input type="file" name="avatar" id="avatar" ref={inputFile} style={{display: 'none'}} onChange={handleChange} />
                    <div className="add-avatar" onClick={handleClick}>Upload avatar</div>
                </div>
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