import axios from "axios"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

const CreateRun = () => {
    const navigate = useNavigate()
    const [cookies] = useCookies(['runlogger'])

    return (
        <div className="create-run">
            <h3>Log new run</h3>
            <Formik
                initialValues={{ 
                    eventName: '',
                    location: '',
                    date: '',
                    routeLength: '',
                    duration: '',
                    remarks: '' 
                }}
                validate={values => {
                    const errors = {}
                    if (!values.eventName) errors.eventName = '* Required'
                    if (!values.location) errors.location = '* Required'
                    if (!values.date) errors.date = '* Required'
                    if (!values.routeLength) errors.routeLength = '* Required'
                    return errors
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        setSubmitting(false)
                        const { data } = await axios.post('http://localhost:8080/run/create', { ...values }, { headers: { Authorization: `Bearer ${cookies.runlogger}` } })
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
                }}
            >
                {({ isSubmitting }) => (
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
                        </div>
                        <div className="panel">
                            <label htmlFor="remarks">Remarks:</label>
                            <Field as="textarea" name="remarks" />
                            <button type="submit" disabled={isSubmitting}>Create run</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateRun