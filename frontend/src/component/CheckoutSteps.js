import React from 'react'
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

function CheckoutSteps({step1,step2,step3,step4}) {
  return (
    <div>
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1?(
                <LinkContainer to='/login'>
                    <Nav.Link>Log In</Nav.Link>
                </LinkContainer>
                ):
                (
                    <Nav.Link disabled>Log In</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2?(
                <LinkContainer to='/shipping'>
                    <Nav.Link>Address Info</Nav.Link>
                </LinkContainer>
                ):
                (
                    <Nav.Link disabled>Address Info</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3?(
                <LinkContainer to='/payment'>
                    <Nav.Link>Payment Info</Nav.Link>
                </LinkContainer>
                ):
                (
                    <Nav.Link disabled>Payment Info</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step4?(
                <LinkContainer to='/placeorder'>
                    <Nav.Link>Payment Completed</Nav.Link>
                </LinkContainer>
                ):
                (
                    <Nav.Link disabled>Payment Completed</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    </div>
  )
}

export default CheckoutSteps