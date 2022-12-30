import React, { useEffect, useState } from 'react'
import { Button,Col, Form,Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate} from 'react-router-dom'
import { login } from '../actions/userAction';
import Message from '../component/Message';
import Loader from '../component/Loader';
import FormContainer from '../component/FormContainer';

function LoginScreen() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useNavigate()

    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1]:'/'
    
    const userLogin = useSelector(state=>state.userLogin)
    const{error,loading,userInfo} = userLogin

    useEffect(()=>{
        if(userInfo){
            history(redirect)
        }
    },[history,userInfo,redirect])

    const submithandler=(e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    }

  return (
    <div>
        <FormContainer>
            <h1>Log In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>}

            <Form onSubmit={submithandler}>
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

            <Button type='submit' variant='primary'>
                Log In
            </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                Are you a new user? <Link to={redirect?`/register?redirect={redirect}`: '/register'}>Sign In</Link>
                </Col>
            </Row>
        
        </FormContainer>
    </div>
  )
}

export default LoginScreen