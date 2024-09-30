import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router-dom'
import useAutoComplete from '../Hooks/use-autocomplete'

const CreateShoes = ({ editing }) => {
    const navigate = useNavigate()
    const brandRef = useRef()
    const modelRef = useRef()
    const { id } = useParams()
    const [field, setField] = useState('')
    const [editedShoe, setEditedShoe] = useState({})
    const [cookies] = useCookies(['runlogger'])
    const URL = 'http://localhost:8080/shoes/'
    const headers = { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${cookies.runlogger}` }

    useEffect(() => {
        if (editing) {
            axios.get(`${URL}${id}`).then(result => setEditedShoe(result.data))
        }
    }, [editing, id])

    const { bindInput,  bindOption, isBusy, suggestions, refResult, textValue } = useAutoComplete({
        onChange: value => console.log(value),
        delay: 1000,
        source: async (search, type) => {
             try {
                const { data } = await axios.get(`http://localhost:8080/shoelist/${type}/${search}`)
                return data.map(d => ({ value: d._id, label: d[type] })).reduce((unique, o) => {
                    if(!unique.some(obj => obj.label === o.label)) unique.push(o)
                    return unique
                }, [])
             } catch (e) {
                    console.log(e)
                    return []
             }
        },
        inputRef: field === 'brand' ? brandRef : modelRef
   })

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
                    if (!editing && values.image === null) errors.image = '* Required'
                    return errors
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
                {({ setFieldValue, isSubmitting, values, setValues }) => (
                    <Form encType="multipart/form-data">
                        <div className="panel">
                            <span>
                                <label htmlFor="brand">Shoe brand:</label>
                                <Field type="text" name="brand" {...bindInput} onFocus={e => setField(e.target.name)} value={textValue['brand'] || editedShoe.brand} />
                                <ul className="brand suggestions" ref={brandRef} >
                                    {refResult?.classList[0] === 'brand' && suggestions.map((_, index) => (
                                        <li key={index} {...bindOption}>
                                            {suggestions[index].label}
                                        </li>
                                    ))}
                                </ul>
                                {field === 'brand' && isBusy && <div className="loading">Loading</div>}
                                <ErrorMessage name="brand" component="div" className="error" />
                            </span>
                            <span>
                                <label htmlFor="model">Shoe model:</label>
                                <Field type="text" name="model" {...bindInput} onFocus={e => setField(e.target.name)} value={textValue['model'] || values.model} />
                                <ul className="model suggestions" ref={modelRef}>
                                    {refResult?.classList[0] === 'model' && suggestions.map((_, index) => (
                                        <li key={index} {...bindOption}>
                                            {suggestions[index].label}
                                        </li>
                                    ))}
                                </ul>
                                {field === 'model' && isBusy && <div className="loading">Loading</div>}
                                <ErrorMessage name="model" component="div" className="error" />
                            </span>
                        </div>
                        <div className="panel">
                            <span>
                                <label htmlFor="image">Photo:</label>
                                <input type="file" name="image" id="image" accept="image/*" onChange={e => setFieldValue('image', e.currentTarget.files[0])} />
                                <ErrorMessage name="image" component="div" className="error" />
                            </span>
                        </div>
                        <div className="panel">
                            <button type="submit" disabled={isSubmitting} onClick={() => setValues({...values, brand: textValue['brand'] || editedShoe.brand, model: textValue['model'] || editedShoe.model})}>{editing ? 'Edit shoes' : 'Add shoes'}</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateShoes