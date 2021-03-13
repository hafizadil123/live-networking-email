import React, {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().required(),
  body: yup.string().required(),
});

function Email(){

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(schema),
  }); 

  let location = useLocation();
  const [fromEmail, setFromEmail] = useState('');
  const [text, setText] = useState('');
  const toEmail = location.search.split('&')[2].split('=')[1] || 'ahafiz167@gmail.com';
  toast.configure();

const onSubmit = (data) =>{
  setFromEmail(...data.email);
  setText(...data.body);
  sendMail();
  reset();
}

  const sendMail = () => {
    const obj ={
      fromEmail,
      toEmail,
      text
    }
    axios.post('http://localhost:5000/api/v1/users/send-email', obj).then(res => {
      if (res.data.success === 1) {
        toast("Success! Your Email has been sent, you will recieve an email shortly", { type: "success" });
      } else {
        toast(`${res.data.message}`, { type: "error" });
      }
    })
  }
return(
<div className="container bootdey">
  <div className="email-app" style={{marginTop: '50px'}}>
    <main>
      <p className="text-center">Live Email Networking - New Message Creation</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row mb-3">
          <label htmlFor="to" className="col-2 col-sm-1 col-form-label">Reciever Email:</label>
          <div className="col-10 col-sm-11">
            <input type="email" className="form-control" id="to" placeholder="To" value={toEmail} readOnly />
          </div>
        </div>
        <div className="form-row mb-3">
          <label htmlFor="cc" className="col-2 col-sm-1 col-form-label">Your Email:</label>
          <div className="col-10 col-sm-11">
            <input type="email" name="email" className="form-control" id="fromEmail" placeholder="Your Email" onChange={(e)=> setFromEmail(e.target.value)} ref={register} />
            <div style={{color:'red'}}> {errors && errors.email && " Enter valid Email *"}</div>

          </div>
        </div>
        {/* <div className="form-row mb-3">
          <label htmlFor="bcc" className="col-2 col-sm-1 col-form-label">BCC:</label>
          <div className="col-10 col-sm-11">
            <input type="email" className="form-control" id="bcc" placeholder="BCC" />
          </div>
        </div> */}
         <div className="form-group mt-4 ml-5">
            <textarea className="form-control" id="message" name="body" rows={12} placeholder="Click here to reply" onChange={(e)=>setText(e.target.value)} ref={register}/>
            <div style={{color:'red'}}> {errors && errors.body && "Field is required * "}</div>

          </div>
          <div className="form-group ml-5 ">
            <button type="submit" className="btn btn-success mr-2" >Send Email</button>
            <Link className="btn btn-danger" to="/">Exit</Link>
          </div>
        
      </form>
       
    </main>
  </div>
</div>

    

    );
}
export default Email;