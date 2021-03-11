import React, {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import {ClubCategories } from '../constant';


function Role(){
  const [userData, setUserDate] = useState('');
  let location = useLocation();
  const clubKey = location.search.split('&')[0].split('=')[1] || 'live_retail_club';
  const categoryName = location.search.split('&')[1].split('=')[1];
  console.log('dd', categoryName)
  const obj = ClubCategories[clubKey];
  const q1 = ClubCategories[clubKey].heading_one.value;
  const q2 = ClubCategories[clubKey].heading_two.value;
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/users/allusers?q1=${q1}&q2=${q2}`).then(res => {

      if(res){
        setUserDate(res.data);
      }
      console.log('daa', res.data)
    })
  }, [])
    return(
  <div className="container ">
  <div className="row col-12 mx-auto mt-5">
    <div className="form-group has-search">
      <span className="fa fa-search form-control-feedback" />
      <input type="text" className="form-control font-weight-bold " placeholder="Live Retail Club" /> 
    </div>
  </div>
  <div className="row col-12 mx-auto mt-5">
    <div className="col-6 mx-auto text-center ">
      <div className="creator font-weight-bold w-75">
    <a className="bg-dark text-light " style={{ textDecoration: 'none' }} href="#" >{obj.heading_one.name}</a>
        <br />   
        <br /> 
        {userData && userData.creators.length === 0 && <span>No Record Exist</span>}
        {userData && userData.creators.length > 0 && userData.creators.map(item => <Link to={`/email?club=${clubKey}&category=${categoryName}&q=${item.email}`} style={{ textDecoration: 'none' }}>{item.fullName}</Link>)}    
       
      </div>
    </div>
    <div className="col-6 mx-auto text-center">
      <div className="creator font-weight-bold w-75">
    <a className="bg-secondary text-light" style={{ textDecoration: 'none' }} href="#">{obj.heading_two.name}</a>
        <br />
        <br /> 
        {userData && userData.storeOwnerUser.length === 0 && <span>No Record Exist</span>}
        {userData && userData.storeOwnerUser.length > 0 && userData.storeOwnerUser.map(item => <Link to={`/email?club=${clubKey}&category=${categoryName}&q=${item.email}`} style={{ textDecoration: 'none' }}>{item.fullName}</Link>)}     
        <br />
        
      </div>
    </div>
  </div>
</div>

    );
}
export default Role;