import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../components/Message.js';
import { Loader } from '../components/Loader.js';
import { login } from '../actions/userActions.js';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <Meta title='Welcome To Our Shop | Login' />
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <FormGroup controlId='email'>
          <FormLabel>Email Address</FormLabel>
          <FormControl
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId='password'>
          <FormLabel>Password</FormLabel>
          <FormControl
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link style={{color: '#0000EE'}} to={redirect ? `/register?redirect${redirect}` : '/register'}>
            Register Here!
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
