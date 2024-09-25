import axios from 'axios'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'
import ManageItem from './ManageItem'

const Shoes = () => {
    const { username } = useParams()
    const [cookies] = useCookies(['runlogger'])
    const [shoes, setShoes] = useState()

    useEffect(() => {
        axios.get(`http://localhost:8080/user/${username}`, { headers: { Authorization: `Bearer ${cookies.runlogger}` } }).then(result => setShoes(result.data.shoes))
    }, [username, cookies])

    if (shoes) {
        return (
            <ul className='shoes'>
                {shoes.map(shoe => (
                    <li key={shoe._id}>
                        <p>{shoe.brand} - {shoe.model} ({shoe.totalRun})</p>
                        <img src={shoe.photoURL} alt={`${shoe.brand} - ${shoe.model}`} />
                        <div className="manage-shoes">
                            {username === JSON.parse(window.atob(cookies.runlogger.split('.')[1])).userName && shoe.isDefault ? 
                                <span className="edit-delete">Change photo</span> : 
                                <ManageItem username={username} id={shoe._id} cookies={cookies} item="shoes" />}
                        </div>
                    </li>
                ))}
            </ul>
        )
    } else {
        return (
            <div>Please login first.</div>
        )
    }
}

export default Shoes