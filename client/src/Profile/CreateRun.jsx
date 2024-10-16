import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router-dom'
import UploadPhotos from '../Common/UploadPhotos'

const CreateRun = ({ editing }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [editedRun, setEditedRun] = useState({})
    const [shoes, setShoes] = useState([])
    const [cookies] = useCookies(['runlogger'])
    const URL = 'http://localhost:8080/run/'
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const headers = { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${cookies.runlogger}` }

    useEffect(() => {
        if (editing) {
            axios.get(`${URL}${id}`).then(result => setEditedRun(result.data))
        }
    }, [editing, id])

    useEffect(() => {
        axios.get('http://localhost:8080/shoes/', { headers }).then(result => setShoes(result.data))
    }, [headers])
    
    if (!editing || (editing && editedRun._id)) return (
        <div className="create-run">
            <h3>{editing ? 'Edit run' : 'Log new run'}</h3>
            <Formik
                initialValues={{
                    eventName: editedRun.eventName ? editedRun.eventName : '',
                    location: editedRun.location ? editedRun.location : '',
                    date: editedRun.date ? editedRun.date.split('T')[0] : '',
                    routeLength: editedRun.routeLength ? editedRun.routeLength : '',
                    duration: editedRun.duration ? editedRun.duration : '',
                    remarks: editedRun.remarks ? editedRun.remarks : '',
                    shoes: editedRun.shoes ? editedRun.shoes : ''
                }}
                validate={values => {
                    const errors = {}
                    if (!values.eventName) errors.eventName = '* Required'
                    if (!values.location) errors.location = '* Required'
                    if (!values.date) errors.date = '* Required'
                    if (!values.routeLength) errors.routeLength = '* Required'
                    if (!values.shoes) errors.shoes = '* Required'
                    return errors
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        setSubmitting(true)
                        console.log(values)
                        const { data } = editing ? await axios.put(`${URL}edit/${id}`, { ...values }, { headers }) : await axios.post(`${URL}create`, { ...values }, { headers })
                        const { run, msg } = data

                        if (run) {
                            alert(msg)
                            navigate(`/user/${run.runner}`)
                        } else {
                            alert(msg)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <Form>
                        <div className="panel">
                            <span>
                                <label htmlFor="eventName">Event name:</label>
                                <Field type="text" name="eventName" />
                                <ErrorMessage name="eventName" component="div" className="error" />
                            </span>
                            <span>
                                <label htmlFor="location">Location:</label>
                                <Field type="text" name="location" />
                                <ErrorMessage name="location" component="div" className="error" />
                            </span>
                            <span>
                                <label htmlFor="date">Date:</label>
                                <Field type="date" name="date" />
                                <ErrorMessage name="date" component="div" className="error" />
                            </span>
                        </div>
                        <div className="panel">
                            <span>
                                <label htmlFor="routeLength">Route length:</label>
                                <Field type="number" step="0.01" min="0" name="routeLength" />
                                <ErrorMessage name="routeLength" component="div" className="error" />
                            </span>
                            <span>
                                <label htmlFor="duration">Duration:</label>
                                <Field type="time" step="1" name="duration" />
                            </span>
                            <span>
                                <label htmlFor="shoes">Shoes:</label>
                                <Field as="select" name="shoes">
                                    <option disabled value="">(Select shoes)</option>
                                    {shoes && shoes.map(shoe => <option key={shoe._id} value={shoe._id}>{shoe.brand} ({shoe.model})</option>)}
                                </Field>
                                <ErrorMessage name="shoes" component="div" className="error" />
                            </span>
                        </div>
                        <UploadPhotos setFieldValue={setFieldValue} />
                        <div className="panel">
                            <label htmlFor="remarks">Remarks:</label>
                            <Field as="textarea" name="remarks" />
                            <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Loading' : editing ? 'Edit run' : 'Create run'}</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateRun