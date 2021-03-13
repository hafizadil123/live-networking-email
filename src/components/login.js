import React, { useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { GoogleLogin } from 'react-google-login';
import { toast } from "react-toastify";
import FacebookLogin from 'react-facebook-login';
import StripeCheckout from "react-stripe-checkout";
import { clubNames, roles } from '../constant';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  city: yup.string().required(),
  occupation: yup.string().required(),
  university: yup.string().required(),
  role: yup.string().required(),
  clubName: yup.string().required(),

});
toast.configure();
function Register(){

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(schema),
  }); 

  const [country, setCountry] = useState('');
  const [formData, setFormData] = useState('');
  const [product] = React.useState({
    name: "Live Email Networking",
    price: 3.3,
    description: "Connect People with better way"
  });

  const responseGoogle = (response) => {
    const { profileObj: { email, name}, googleId } = response || {};
    const requestObj = {
      source: 'google',
      email,
      fullName: name,
      googleId
    };
    axios.post('http://localhost:5000/api/v1/users/register', requestObj).then(res => {
      localStorage.setItem('accessToken', res.data.token);
      localStorage.setItem('user_detail', JSON.stringify(res.data.newUser));
      console.log('adil', res.data);
      if (res.data.success === 1) {
        toast("Success! You have sucessfully Registered", { type: "success" });
      } else {
        toast(`${res.data.message}`, { type: "error" });
      }
      if(res.data && formData) {
          // add a call for 3.3 $ weekly payment here
      }
    })
  }

  const responseFacebook = (response) => {
    const requestObj = {
      source: 'facebook',
      fullName: response.name,
      facebookId: response.userID,
      email: response.email,

    };
    axios.post('http://localhost:5000/api/v1/users/register', requestObj).then(res => {
      localStorage.setItem('accessToken', res.data.token);
      localStorage.setItem('user_detail', JSON.stringify(res.data.newUser));
      if (res.data.success === 1) {
        toast("Success! You have sucessfully Registered", { type: "success" });
      } else {
        toast(`${res.data.message}`, { type: "error" });
      }
      if(res.data && formData) {
          // add a call for 3.3 $ weekly payment here
      }
    })
    console.log('facebook response', response);
  }

  async function handleToken(token, addresses) {
    const response = await axios.post(
      "http://localhost:5000/api/v1/users/checkout",
      { token, product }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! ($3.3) - Payment has been done for a week", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  const onSubmitt = (data) => {
   console.log(formData);
   console.log(country);
   console.log("data",data);
    axios.post('http://localhost:5000/api/v1/users/register', data).then(res => {
      localStorage.setItem('accessToken', res.data.token);
      localStorage.setItem('user_detail', JSON.stringify(res.data.newUser));
      if (res.data.success === 1) {
        toast("Success! You have sucessfully Registered", { type: "success" });
        setFormData({...data});
      } else {
        toast(`${res.data.message}`, { type: "error" });
      }
      if(res.data && formData) {
          // add a call for 3.3 $ weekly payment here
      }
    })
    reset();

  } 



return(
  
<div className="container mb-5 pb-5 border bg-secondary" style={{marginTop: '40px'}}>     
  <form onSubmit={handleSubmit(onSubmitt)}>
    <div className="row">
    <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
    <label htmlFor="fullName">Full Name</label>
    <input type="text" name="fullName" className="form-control" id="fullName"  placeholder="Enter Full Name" ref={register} />
   <div style={{color:'red'}}> {errors && errors.fullName && "* Name is required"}</div>
  </div>
  <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
    <label htmlFor="email">Email address</label>
    <input type="email" name="email" className="form-control" id="eamil" aria-describedby="emailHelp" placeholder="Enter email" ref={register} />
   <div style={{color:'red'}}> {errors && errors.email && "* Enter valid email "}</div>

    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  </div>
 
 <div className="row">
 <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
    <label htmlFor="password">Password</label>
    <input type="password" name="password" className="form-control" id="password" placeholder="Password" ref={register}/>
   <div style={{color:'red'}}> {errors && errors.password && "* Password is required"}</div>

  </div>
  <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
    <label htmlFor="city">Enter City Name</label>
    <input type="text" name="city" className="form-control" id="city" placeholder="Enter City" ref={register}/>
   <div style={{color:'red'}}> {errors && errors.city && "* City is required"}</div>
  </div> 
 </div>
 <div className="row">
  <div class="form-group col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
    <label for="clubName">Select Club</label>
    <select class="form-control" id="clubName" name="clubName" ref={register}>
      <option></option>
      {clubNames.map(item => <option value={item.value}>{item.name}</option>)}
    </select>
    <div style={{color:'red'}}> {errors && errors.clubName && "* Club is required field"}</div>
  </div>
  <div class="form-group col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
    <label for="clubName">Select Role</label>
    <select class="form-control" id="clubName" name="role" ref={register} >
      <option ></option>
        {roles.map(item =><option value={item.value}>{item.name}</option>)}
    </select>
    <div style={{color:'red'}}> {errors && errors.role && "* Role is required field"}</div>
  </div>
 </div>
  <div className="row">
  <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
    <label htmlFor="occupation">Enter Your Occupation</label>
    <input type="text" name="occupation" className="form-control" id="occupation" placeholder="Enter Occupation" ref={register}/>
   <div style={{color:'red'}}> {errors && errors.occupation && "* Occupation is required"}</div>

  </div>
  <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
    <label htmlFor="city">Enter Your University</label>
    <input type="university" name="university" className="form-control" id="university" placeholder="Enter University Name" ref={register}/>
   <div style={{color:'red'}}> {errors && errors.university && "* University is required"}</div>

  </div>
  </div>
  <div className="row">
  <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
  <CountryDropdown
    value={country}
    classes="country"
    onChange={(val) => setCountry(val)}
     />
   
  </div>
  </div>
  <div className="row">
<div className="form-group col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
<GoogleLogin buttonStyle={{padding:"7px"}}
    clientId="160899161619-0srut8hvug4b3v773plc25g46tbeompp.apps.googleusercontent.com"
    textButton="Singup with Google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
    className="bg-danger text-white font-weight-bold"
  />,

</div>
<div className="form-group col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
<FacebookLogin buttonStyle={{padding:"7px"}}
    appId="274436150476312"
    fields="name,email,picture"
    onClick={() => {}}
    textButton="Signup With Facebook"
    callback={responseFacebook} 
    icon="fa-facebook" />,
      
  </div>
  </div>
  <div className="row mb-5">
  <div className="center">
    {formData ? <StripeCheckout
        stripeKey="pk_test_Lp6L3Vsfdml5cUGlmP5yzysT"
        token={handleToken}
        amount={product.price * 100}
        name="Live Email Networking"
        billingAddress
        shippingAddress
      />: <button type="submit" className="btn btn-primary">
      Register
  </button>}
  </div>
  
  </div>
</form>
</div>

);
}

export default Register;