import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const initialFormInputs = {
  username:'',
  password:''
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
const history = useHistory();
const [ inputs, setInputs ] = useState(initialFormInputs)

const changeInputs = (e) => {
  setInputs({
    ...inputs,
    [e.target.name]: e.target.value,
  })
};

const submitLogin = (e) => {
  e.preventDefault();
  axios
     .post("http://localhost:5000/api/login", inputs)
     .then( res => {
       console.log(res.data)
       localStorage.setItem('token', res.data.payload)
       history.push("/protected")
     })
     .catch( err => console.log('error getting token on login',err))
}


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Please login to continue</p>
      <form onSubmit={submitLogin}>
        <label htmlFor="username">Username</label>
        <input
          placeholder="Lambda School"
          name="username"
          type="text"
          value={inputs.username}
          onChange={changeInputs}
          />

          <label htmlFor="password">Password</label>
          <input 
            placeholder="i<3Lambd4"
            name="password"
            type="text"
            value={inputs.password}
            onChange={changeInputs}
          />

          <button>Login</button>

      </form>
    </>
  );
};

export default Login;
