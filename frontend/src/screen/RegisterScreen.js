import React, { useEffect, useState } from 'react'
import { Button,Col, Form,Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate} from 'react-router-dom'
import {register } from '../actions/userAction';
import Loader from '../component/Loader';
import FormContainer from '../component/FormContainer';
import Message from '../component/Message';

function RegisterScreen() {
    
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')

    const dispatch = useDispatch()
    const history = useNavigate()
    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1]:'/'

    const userRegister = useSelector(state=>state.userRegister)
    const{error,loading,userInfo} = userRegister

    useEffect(()=>{
        if(userInfo){
            history(redirect)
        }
    },[history,userInfo,redirect])

    const submithandler=(e)=>{
        e.preventDefault()
        if(password !== confirmPassword)
        {
            setMessage('Password do not match!')
        }
        else
        {
            dispatch(register(name,email,password))
        }
        
    }
  return (
    <div>
        <FormContainer>
            <h1>Sign In</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>} 
            {loading && <Loader></Loader>}

            <Form onSubmit={submithandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            
            <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control 
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='passwordConfirm'>
                <Form.Label>Password Again</Form.Label>
                <Form.Control 
                type='password'
                placeholder='Password'
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Sign In
            </Button>

            <Row className='py-3'>
                <Col>
                Are you already a member? <Link to={redirect?`/login?redirect={redirect}`: '/login'}>Log In</Link>
                </Col>
            </Row>
            
            </Form>
        </FormContainer>
    </div>
  )
}

export default RegisterScreen