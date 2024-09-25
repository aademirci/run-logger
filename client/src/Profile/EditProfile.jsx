import axios from "axios"
import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"

const EditProfile = () => {
    const { username } = useParams()
    const navigate = useNavigate()
    const [ user, setUser ] = useState({})
    const [cookies] = useCookies(['runlogger'])
    const URL = 'http://localhost:8080/user/'
    const headers = { Authorization: `Bearer ${cookies.runlogger}` }

    useEffect(() => {
            axios.get(`${URL}${username}`, { headers }).then(result => setUser(result.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username])

    if (user._id) return (
        <div className="edit-profile">
            <h3>Edit Profile</h3>
            <Formik
                initialValues={{
                    fullName: user.fullName ? user.fullName : '',
                    height: user.height ? user.height : '',
                    weight: user.weight ? user.weight : '',
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        setSubmitting(false)
                        const { data } = await axios.put(`${URL}${username}/edit/`, { ...values }, { headers })
                        const { user, msg } = data

                        if (user) {
                            alert(msg)
                            navigate(`/user/${username}`)
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
                        <span className="full-name">
                            <label htmlFor="fullName">Full name:</label>
                            <Field type="text" name="fullName" />
                        </span>
                        <div className="panel">
                            <span>
                                <label htmlFor="height">Height (cm):</label>
                                <Field type="number" min="0" name="height" />
                            </span>
                        </div>
                        <div className="panel">
                            <span>
                                <label htmlFor="weight">Weight (kg):</label>
                                <Field type="number" step="0.1" min="0" name="weight" />
                            </span>
                        </div>
                        <div className="panel">
                            <button type="submit" disabled={isSubmitting}>Edit profile</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default EditProfile