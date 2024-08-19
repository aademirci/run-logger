/* eslint-disable no-unused-vars */
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'
import { ErrorMessage, Field, Form, Formik } from "formik"

const Login = () => {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['runlogger'])
    
    return (
        <div className="login">
            <div className="login-form">
                <Formik
                    initialValues={{ userName: '', password: '' }}
                    validate={values => {
                        const errors = {}
                        if (!values.userName) errors.userName = '* Required'
                        if (!values.password) errors.password = '* Required'
                        return errors
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            setSubmitting(false)
                            const { data } = await axios.post('http://localhost:8080/user/login', values)
                            const { token, msg } = data
                
                            if (token) {
                                alert(msg)
                                setCookie('runlogger', token, { path: '/' })
                                navigate(`/user/${values.userName}`)
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
                            <span>
                                <label htmlFor="userName">Username:</label>
                                <Field type="text" name="userName" />
                                <ErrorMessage name="userName" component="div" className="error" />
                            </span>
                            <span>
                                <label htmlFor="password">Password:</label>
                                <Field type="password" name="password" />
                                <ErrorMessage name="password" component="div" className="error" />
                            </span>
                            <button type="submit" disabled={isSubmitting}>Log in</button>
                        </Form>
                    )}
                </Formik>
                
            </div>
            <p>Not a member yet? <Link to="/register">Sign up</Link></p>
        </div>
        
    )
}

export default Login