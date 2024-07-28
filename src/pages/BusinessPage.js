import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Temp1 from '../templates/temp1/Temp1';
import Temp2 from '../templates/temp2/Temp2';
import BaseUrl from '../constants';


const BusinessPage = () => {
  const [business, setBusiness] = useState(null);
  const { route } = useParams();

  useEffect(() => {
    const fetchBusiness = async () => {
      const { data } = await axios.get(`${BaseUrl}/business/${route}`);
      setBusiness(data);
      console.log(data);
    };
    fetchBusiness();
  }, [route]);

  
  if (!business) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      {business.template === 1 && <Temp1 business={business} />}
      {business.template === 2 && <Temp2 business={business} />}
    </>
  )
};

export default BusinessPage;