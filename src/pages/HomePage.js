import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

function HomePage() {
    const navigate = useNavigate();

    return (
      <div className={styles.navbar}>
        <h1 onClick={()=>navigate('/admin')}>Dashboard</h1>
      </div>
    );
}

export default HomePage;