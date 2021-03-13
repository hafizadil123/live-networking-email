import React from 'react';
import logo from '../logo.jpeg'
import { Link } from 'react-router-dom';
import { ClubCategories, clubNames } from '../constant';
//import Data from '../data.json'


function Home(){
 
    return(
      
   <div>
  <div className="container-fluid text-center" style={{marginTop: '100px'}}>
    <h1 className="font-weight-bold display-4">Aggnett.com</h1>
    <img src="https://i.ibb.co/jTFKRSN/logo.jpg" className="rounded-circle" alt="logo" width={100} height={100} />
    <p className="font-weight-bold text-secondary">Select club</p>
    <div className="club font-weight-bold display-5 w-25 mx-auto">
      {clubNames && clubNames.length > 0 && clubNames.map(item => <><Link to={`/store?club=${item.value}`} style={{ textDecoration: 'none' }}>{item.name}</Link><br /></>)}
      <br />
    </div>
  </div>
</div>

    
    )
}
export default Home;