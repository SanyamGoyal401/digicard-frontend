import React, {useContext} from 'react';
import styles from './Navbar.module.css';
import AuthContext from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

  return (
    <div className={styles.navbar}>
      <h1 onClick={()=>navigate('/admin')}>Dashboard</h1>
      <button onClick={()=>{navigate('/admin/form')}}>Add Form </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Navbar;
