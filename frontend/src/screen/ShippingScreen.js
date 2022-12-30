import React, { useState } from 'react'
import { Button, Form, FormLabel } from 'react-bootstrap'
import CheckoutSteps from '../component/CheckoutSteps'
import FormContainer from '../component/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {saveShippingAddress} from '../actions/cartAction'

function ShippingScreen() {
    
    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart
    const dispatch = useDispatch()
    const history = useNavigate() 

    const [address,setAddress] = useState(shippingAddress.address)
    const [city,setCity] = useState(shippingAddress.city)
    const [postalcode,setPostalcode] = useState(shippingAddress.postalcode)
    const [country,setCountry] = useState(shippingAddress.country)

    const submitHandler= (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalcode,country}))
        history('/payment')
    }


  return (
    <div>
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h2 className='product-title'>Address Info</h2>
            <Form onSubmit={submitHandler}>
                    <Form.Group controlId='address'>
                        <FormLabel>Name</FormLabel>
                        <Form.Control
                        required
                        type='name'
                        placeholder='Address'
                        value={address ? address : ''}
                        onChange={(e)=>setAddress(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='city'>
                        <FormLabel>City</FormLabel>
                        <Form.Control
                        required
                        type='text'
                        placeholder='City'
                        value={city ? city : ''}
                        onChange={(e)=>setCity(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='postalcode'>
                        <FormLabel>Postal Code</FormLabel>
                        <Form.Control
                        required
                        type='text'
                        placeholder='Postal Code'
                        value={postalcode ? postalcode : ''}
                        onChange={(e)=>setPostalcode(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='country'>
                        <FormLabel>Country</FormLabel>
                        <Form.Control
                        required
                        type='text'
                        placeholder='Country'
                        value={country ? country : ''}
                        onChange={(e)=>setCountry(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>Skip</Button>

                </Form>
        </FormContainer>
    </div>
  )
}

export default ShippingScreen