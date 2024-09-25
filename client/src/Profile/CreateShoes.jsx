import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router-dom'

const CreateShoes = ({ editing }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [editedShoe, setEditedShoe] = useState({})
    const [cookies] = useCookies(['runlogger'])
    const URL = 'http://localhost:8080/shoes/'
    const headers = { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${cookies.runlogger}` }

    useEffect(() => {
        if (editing) {
            axios.get(`${URL}${id}`).then(result => setEditedShoe(result.data))
        }
    }, [editing, id])

    if (!editing || (editing && editedShoe._id)) return (
        <div className="create-shoes">
            <h3>{editing ? 'Edit shoes' : 'Add new shoes'}</h3>
            <Formik
                initialValues={{
                    brand: editedShoe.brand ? editedShoe.brand : '',
                    model: editedShoe.model ? editedShoe.model : '',
                    image: null
                }}
                validate={values => {
                    const errors = {}
                    if (!values.brand) errors.brand = '* Required'
                    if (!values.model) errors.model = '* Required'
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        setSubmitting(true)
                        const { data } = editing ? await axios.put(`${URL}edit/${id}`, { ...values }, { headers }) : await axios.post(`${URL}create`, { ...values }, { headers })
                        const { shoes, msg } = data
                        if (shoes) {
                            alert(msg)
                            navigate(`/user/${shoes.owner}/shoes`)
                        } else {
                            alert(msg)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <Form encType="multipart/form-data">
                        <div className="panel">
                            <span>
                                <label htmlFor="brand">Shoe brand:</label>
                                <Field type="text" name="brand" />
                                <ErrorMessage name="brand" component="div" className="error" />
                            </span>
                            <span>
                                <label htmlFor="model">Shoe model:</label>
                                <Field type="text" name="model" />
                                <ErrorMessage name="model" component="div" className="error" />
                            </span>
                        </div>
                        <div className="panel">
                            <span>
                                <label htmlFor="image">Photo:</label>
                                <input type="file" name="image" id="image" accept="image/*" onChange={e => setFieldValue('image', e.currentTarget.files[0])} />
                            </span>
                        </div>
                        <div className="panel">
                            <button type="submit" disabled={isSubmitting}>{editing ? 'Edit shoes' : 'Create shoes'}</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateShoes