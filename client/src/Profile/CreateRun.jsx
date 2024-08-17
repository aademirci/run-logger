import axios from "axios"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

const CreateRun = () => {
    const navigate = useNavigate()
    const [cookies] = useCookies(['runlogger'])
    const [inputValue, setInputValue] = useState({
        eventName: '',
        location: '',
        date: '',
        routeLength: '',
        duration: '',
        remarks: ''
    })

    const { eventName, location, date, routeLength, duration, remarks } = inputValue

    const handleChange = e => {
        const { name, value } = e.target
        setInputValue({ ...inputValue, [name]: value })
    }

    async function handleClick() {
        try {
            if (eventName.trim() === '' ) {
                alert('Enter an event name')
                return
            }
            const { data } = await axios.post('http://localhost:8080/run/create', { ...inputValue }, { headers: { Authorization: `Bearer ${cookies.runlogger}` } })
            const { createdRun, msg } = data

            if (createdRun) {
                alert(msg)
                navigate(`/user/${createdRun.runner}`)
            } else {
                alert(msg)
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <div>
            <h3>Log new run</h3>
            <div>
                <span>
                    <label htmlFor="eventName">Event name:</label>
                    <input type="text" name="eventName" id="eventName" onChange={handleChange} value={eventName} />
                </span>
                <span>
                    <label htmlFor="location">Location:</label>
                    <input type="text" name="location" id="location" onChange={handleChange} value={location} />
                </span>
                <span>
                    <label htmlFor="date">Date:</label>
                    <input type="date" name="date" id="date" onChange={handleChange} value={date} />
                </span>
            </div>
            <div>
                <span>
                    <label htmlFor="routeLength">Route length:</label>
                    <input type="number" step="0.01" min="0" name="routeLength" id="routeLength" onChange={handleChange} value={routeLength} />
                </span>
                <span>
                    <label htmlFor="duration">Duration:</label>
                    <input type="time" step="1" name="duration" id="duration" onChange={handleChange} value={duration} />
                </span>
            </div>
            <label htmlFor="remarks">Remarks:</label>
            <textarea name="remarks" id="remarks" defaultValue={remarks}></textarea>

            <button onClick={handleClick}>Sign up</button>
        </div>
    )
}

export default CreateRun