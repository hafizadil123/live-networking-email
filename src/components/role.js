import React, {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import {ClubCategories, clubNames } from '../constant';


function Role(){
  const [userData, setUserDate] = useState('');
  const [searchCretorText, setSearchText] = useState('');
  const [searchOwnerText, setStoreOwnerText] = useState('');
  const [creators, setCreator] = useState([]);
  const [storeOwnerUsers, setStoreOwnerUser] = useState([]);
  let location = useLocation();
  const clubKey = location.search.split('&')[0].split('=')[1] || 'live_retail_club';
  const categoryName = location.search.split('&')[1].split('=')[1];
  const placeholderObj = clubNames.filter(el => el.value === clubKey)[0];
  const obj = ClubCategories[clubKey];
  const q1 = ClubCategories[clubKey].heading_one.value;
  const q2 = ClubCategories[clubKey].heading_two.value;
  useEffect(() => {
    axios.get(`http://18.220.178.164/api/v1/users/allusers?q1=${q1}&q2=${q2}`).then(res => {

      if(res){
        setUserDate(res.data);
        setCreator(res.data.creators);
        setStoreOwnerUser(res.data.storeOwnerUser)
      }
      console.log('daa', res.data)
    })
  }, []);
  const searchCretor = (value) => {
    setSearchText(value);
    const updatedCat = creators && creators.length > 0 && creators.filter(el => el.fullName.toLowerCase().indexOf(value)!== -1) 
    setCreator(updatedCat);
    if(!value) {
      setCreator(userData.creators)
    } 
   
  }
  const searchOwner = (value) => {
    setStoreOwnerText(value);
    const updatedCat = storeOwnerUsers && storeOwnerUsers.length > 0 && storeOwnerUsers.filter(el => el.fullName.toLowerCase().indexOf(value)!== -1) 
    setStoreOwnerUser(updatedCat);
    if(!value) {
      setStoreOwnerUser(userData.storeOwnerUser)
    } 
   
  }
    return(
  <div className="container ">
  <div className="row col-12 mx-auto mt-5">
    <div className="row">

    <div className="form-group col-md-6 serachCat">
    <div className="input-group rounded">
  <input type="search" className="form-control rounded" placeholder={`${placeholderObj.name} - Filter ${obj.heading_one.name}..`} aria-label="Search"  value={searchCretorText} aria-describedby="search-addon" onChange={e => searchCretor(e.target.value)}/>
</div>

  </div>

  <div className="form-group col-md-6 serachCatR">
    <div className="input-group rounded">
  <input type="search" className="form-control rounded" placeholder={`${placeholderObj.name} - Filter ${obj.heading_two.name}..`} aria-label="Search"  value={searchOwnerText} aria-describedby="search-addon" onChange={e => searchOwner(e.target.value)}/>
</div>

  </div>
    </div>
 
  
  </div>
  <div className="row col-12 mx-auto mt-5">
    <div className="col-6 mx-auto text-center ">
      <div className="creator font-weight-bold w-75">
    <a className="bg-dark text-light " style={{ textDecoration: 'none' }} href="#" >{obj.heading_one.name}</a>
        <br />   
        <br /> 
        {userData && userData.creators.length === 0 && <span>No Record Exist</span>}
        {creators && creators.length > 0 && creators.map(item => <Link to={`/email?club=${clubKey}&category=${categoryName}&q=${item.email}`} style={{ textDecoration: 'none', marginBottom: '16px' }}>{item.fullName}</Link>)}    
       
      </div>
    </div>
    <div className="col-6 mx-auto text-center">
      <div className="creator font-weight-bold w-75">
    <a className="bg-secondary text-light" style={{ textDecoration: 'none' }} href="#">{obj.heading_two.name}</a>
        <br />
        <br /> 
        {userData && userData.storeOwnerUser.length === 0 && <span>No Record Exist</span>}
        {storeOwnerUsers && storeOwnerUsers.length > 0 && storeOwnerUsers.map(item => <Link to={`/email?club=${clubKey}&category=${categoryName}&q=${item.email}`} style={{ textDecoration: 'none', marginBottom: '16px' }}><>{item.fullName}</></Link>)}     
        <br />
        
      </div>
    </div>
  </div>
</div>

    );
}
export default Role;