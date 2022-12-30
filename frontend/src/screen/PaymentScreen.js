import React, { useState } from 'react'
import { Button, Form, FormLabel } from 'react-bootstrap'
import CheckoutSteps from '../component/CheckoutSteps'
import FormContainer from '../component/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {savePaymentMethod} from '../actions/cartAction'

function PaymentScreen() {

    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart
    const dispatch = useDispatch()
    const history = useNavigate() 
    const [paymentMethod,setPaymentMethod] = useState('Pay')

    if(!shippingAddress.address)
    {
        history('/shipping')
    }
    
    const submitHandler= (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history('/placeorder')
    }
  return (
    <div>
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h2 className='product-title'>Payment</h2>
            <Form onSubmit={submitHandler}>
                    <Form.Group controlId='address'>
                        <FormLabel>Chose Payment Method</FormLabel>
                        <Form.Check
                        type='radio'
                        label='Credit Card'
                        id='cd'
                        name='paymentMethod'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        <Form.Check
                        type='radio'
                        label='Pay At The Door'
                        id='patd'
                        name='paymentMethod'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Form.Group>
                    

                    <Button type='submit' variant='primary'>Skip</Button>

                </Form>
        </FormContainer>
        
    </div>
  )
}

export default PaymentScreen