import axios from 'axios'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useParams } from 'react-router-dom'

const Runs = () => {
    const { username } = useParams()
    const [cookies] = useCookies(['runlogger'])
    const [runs, setRuns] = useState()

    useEffect(() => {
        axios.get(`http://localhost:8080/user/${username}`, { headers: { Authorization: `Bearer ${cookies.runlogger}` } }).then(result => setRuns(result.data.runs))
    }, [username, cookies])

    if (runs) {
        return (
            <ul className='runs'>
                {runs.map(run => {
                    if (run.eventName) return (
                    <li key={run._id}>
                        <h2>{run.eventName} {username === JSON.parse(window.atob(cookies.runlogger.split('.')[1])).userName && <span>(<Link to={`/user/${username}/run/edit/${run._id}`}>edit</Link>)</span>}</h2>
                        <p>
                            {run.location ? `${run.location} · ` : ''}
                            {run.date ? `${format(run.date, 'd MMMM yyyy')} · ` : ''} 
                            {run.routeLength ? `${run.routeLength}km · ` : ''} 
                            {run.duration ? `${run.duration} time` : ''}
                        </p>
                        <h3>Remarks:</h3>
                        <p>{run.remarks ? run.remarks : 'No remarks'}</p>
                    </li>
                    )}
                )}
            </ul>
        )
    } else {
        return (
            <div>Please login first.</div>
        )
    }
    
}

export default Runs