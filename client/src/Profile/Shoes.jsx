import axios from 'axios'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ManageItem from './ManageItem'

const Shoes = () => {
    const navigate = useNavigate()
    const { username } = useParams()
    const [cookies] = useCookies(['runlogger'])
    const [shoes, setShoes] = useState()
    const inputFile = useRef(null)

    useEffect(() => {
        axios.get(`http://localhost:8080/user/${username}`, { headers: { Authorization: `Bearer ${cookies.runlogger}` } }).then(result => setShoes(result.data.shoes))
    }, [username, cookies])

    const handleClick = () => {
        inputFile.current.click()
    }

    const handleChange = async (id) => {
        try {
            const avatar = inputFile.current.files[0]
            const formData = new FormData()
            formData.append('image', avatar)
            console.log(id)
            const { data } = await axios.put(`http://localhost:8080/shoes/photo/${id}`, formData, { headers: { Authorization: `Bearer ${cookies.runlogger}` } })
            const { user, msg } = data
            if (user) {
                alert(msg)
                navigate(`/user/${user.userName}/shoes`)
            } else {
                alert(msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (shoes) {
        return (
            <ul className="shoes">
                {shoes.map(shoe => (
                    <li key={shoe._id}>
                        <p>{shoe.brand} - {shoe.model} ({shoe.totalRun} km)</p>
                        <img src={shoe.photoURL} alt={`${shoe.brand} - ${shoe.model}`} />
                        {username === JSON.parse(window.atob(cookies.runlogger.split('.')[1])).userName &&
                        <div className="manage-shoes">
                            {shoe.isDefault ? 
                                <Fragment>
                                    <input type="file" name="avatar" id="avatar" ref={inputFile} style={{display: 'none'}} onChange={() => handleChange(shoe._id)} />
                                    <Link className="edit-delete" onClick={handleClick}>change photo</Link>
                                </Fragment>
                                : 
                                <ManageItem username={username} id={shoe._id} cookies={cookies} item="shoes" />}
                        </div>}
                    </li>
                ))}
                {username === JSON.parse(window.atob(cookies.runlogger.split('.')[1])).userName && <li className="add-shoes"><Link to={`/user/${username}/shoes/add`}>Add shoes</Link></li>}
            </ul>
        )
    } else {
        return (
            <div className="shoes">Please login first.</div>
        )
    }
}

export default Shoes