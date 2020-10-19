import React, { useState } from 'react'
import { Form, Button, FormLabel, FormControl, FormGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [state, setState] = useState(shippingAddress.state)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
       e.preventDefault()
       dispatch(saveShippingAddress({ address, city, postalCode, state }))
       history.push('/payment')
    }
    
    return (
        <FormContainer>
            <CheckoutSteps  step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup controlId='address'>
                    <FormLabel>Address</FormLabel>
                    <FormControl required type='text' placeholder='Enter Address'value={address} onChange={(e) => setAddress(e.target.value)}></FormControl>
                </FormGroup>
                <FormGroup controlId='city'>
                    <FormLabel>City</FormLabel>
                    <FormControl required type='text' placeholder='Enter City'value={city} onChange={(e) => setCity(e.target.value)}></FormControl>
                </FormGroup>
                <FormGroup controlId='postalCode'>
                    <FormLabel>Area Code</FormLabel>
                    <FormControl required type='text' placeholder='Enter Area Code'value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></FormControl>
                </FormGroup>
                <FormGroup controlId='state'>
                    <FormLabel>State</FormLabel>
                    <FormControl required type='text' placeholder='Enter State' value={state} onChange={(e) => setState(e.target.value)}></FormControl>
                </FormGroup>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
