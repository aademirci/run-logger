import axios from 'axios'
import { Link } from 'react-router-dom'

const ManageItem = ({ username, id, cookies, item }) => {
    const handleDelete = async () => {
        const { data } = await axios.delete(`http://localhost:8080/${item}/delete/${id}`, { headers: { Authorization: `Bearer ${cookies.runlogger}` } })
        alert(data.msg)
        window.location.reload()
    }

    return (
        <span className="edit-delete">
            (<Link to={`/user/${username}/${item}/edit/${id}`}>edit</Link> · <Link onClick={handleDelete}>delete</Link>)
        </span>
    )
}

export default ManageItem