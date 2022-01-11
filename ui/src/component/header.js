import React, { useEffect, useState } from 'react';
import { ENDPOINT, TAGS } from '../constant/endpoint';
import axios from 'axios';
const Headers = () =>{
  const [status,setStatus] = useState('Loading...');

  useEffect(() => {
    setStatus('Done.');
    axios.get(ENDPOINT + TAGS)
          .then(res => console.log(res.data))
          .catch(err => console.log(err));
    console.log('Done.');
  },[])

  return (
    <div>Fetching data status: {status}</div>
  )
}
export default Headers;