import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ClubCategories, clubNames } from '../constant';


function Store(){
  let location = useLocation();
  const [searchText, setSearchText] = useState('');
  const clubKey = location.search.split('=')[1] || 'live_retail_club';
  const getObj = ClubCategories[clubKey];
  const [categories, setCategories] = useState(getObj.categories || []);
  const placeholderObj = clubNames.filter(el => el.value === clubKey)[0];
  const search = (value) => {
    setSearchText(value);
    const updatedCat = categories && categories.length > 0 && categories.filter(el => el.name.toLowerCase().indexOf(value)!== -1) 
    setCategories(updatedCat);
    if(!value) {
      setCategories(getObj.categories)
    } 
   
  }
    return(
      <div className="container" style={{marginTop: '5%'}}>
  {/* Another variation with a button */}
  <div className="form-group search">
    <div className="input-group rounded">
  <input type="search" className="form-control rounded" placeholder={`${placeholderObj.name} - Filter Category..`} aria-label="Search"  value={searchText} aria-describedby="search-addon" onChange={e => search(e.target.value)}/>
</div>
  </div>
  <div className="store" style={{marginTop: '4%'}}>
    <h5>2- Select Store Type:</h5>
  </div>
  <div className="store-box mx-auto">
    {categories && categories.map(item => <><Link to={`/role?club=${clubKey}&category=${item.value}`} style={{ textDecoration: 'none' }}>{item.name}</Link><br /></>)}
  </div>
</div>


    );
}
export default Store;