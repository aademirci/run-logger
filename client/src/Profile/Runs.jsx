/* eslint-disable react/prop-types */
import { format } from 'date-fns'

const Runs = ({ list }) => {
    return (
        <ul className='runs'>
            {list.map(run => {
            if (run.eventName) return (
            <li key={run._id}>
                <h2>{run.eventName}</h2>
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
        )}</ul>
    )
}

export default Runs