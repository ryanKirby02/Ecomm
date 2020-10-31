import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../components/Message.js';
import { Loader } from '../components/Loader.js';
import { getUserDetails, adminUpdateUser } from '../actions/userActions.js';
import FormContainer from '../components/FormContainer';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const adminUpdate = useSelector((state) => state.adminUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = adminUpdate;

  useEffect(() => {
    if (successUpdate) {
        dispatch({
            type: 'ADMIN_UPDATE_RESET'
        })
        history.push('/admin/userlist')
    } else {
         if (!user.name || user._id !== userId) {
           dispatch(getUserDetails(userId));
         } else {
           setName(user.name);
           setEmail(user.email);
           setIsAdmin(user.isAdmin);
         }
    }
   
  }, [dispatch, user, userId, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminUpdateUser({ _id: userId, name, email, isAdmin}));
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId='name'>
              <FormLabel>Name</FormLabel>
              <FormControl
                type='text'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId='email'>
              <FormLabel>Email Address</FormLabel>
              <FormControl
                type='email'
                placeholder='enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='Is An Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </FormGroup>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
