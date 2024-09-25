import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const CreateShoes = () => {
    const navigate = useNavigate()
    const [cookies] = useCookies(['runlogger'])
    const URL = 'http://localhost:8080/shoes/'
    const headers = { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${cookies.runlogger}` }

    return (
        <div className="create-shoes">
            <h3>Add shoes</h3>
            <Formik
                initialValues={{
                    brand: '',
                    model: '',
                    totalRun: 0,
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
                        const { data } = await axios.post(`${URL}create`, { ...values }, { headers })
                        console.log(data)
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
                                <label htmlFor="totalRun">Total run:</label>
                                <Field type="number" step="0.01" min="0" name="totalRun" />
                                <ErrorMessage name="totalRun" component="div" className="error" />
                            </span>
                            <span>
                                <label htmlFor="image">Duration:</label>
                                <input type="file" name="image" id="image" accept="image/*" onChange={e => setFieldValue('image', e.currentTarget.files[0])} />
                            </span>
                        </div>
                        <div className="panel">
                            <button type="submit" disabled={isSubmitting}>Add shoes</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateShoes