import React, { useContext, useState } from 'react';
import styles from './AdminForm.module.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/authContext';
import BaseUrl from '../constants';

const AdminForm = () => {
  const [formData, setFormData] = useState({
    route: '',
    businessName: '',
    ownerName: '',
    businessPhoto: '',
    ownerPhoto: '',
    phone: '',
    email: '',
    address: '',
    aboutUs: '',
    instagram: '',
    facebook: '',
    twitter: '',
    youtube: '',
    justdial: '',
    expireTime: '',
  });

  const [uploadProgress, setUploadProgress] = useState({ businessPhoto: 0, ownerPhoto: 0 });
  const [uploading, setUploading] = useState({ businessPhoto: false, ownerPhoto: false });
  const navigate = useNavigate();
  const {axios} = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, type) => {
    handleFileUpload(e.target.files[0], type);
  }

  const handleFileUpload = async (file, type) => {
    if (!file) return;

    setUploading({ ...uploading, [type]: true });
    const data = new FormData();
    data.append('photo', file);

    try {
      const response = await axios.post(`${BaseUrl}/business/form/photo`, data, {
        onUploadProgress: (progressEvent) => {
          setUploadProgress({ ...uploadProgress, [type]: (progressEvent.loaded / progressEvent.total) * 100 });
        },
      });
      setFormData({ ...formData, [type]: response.data.url });
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading({ ...uploading, [type]: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post(`${BaseUrl}/business/form`, formData);
      navigate('/');
    }
    catch(error){
      alert(error);
    }
  };

  return (
    <div className={styles.adminFormContainer}>
      <Navbar />
      <form className={styles.adminForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Route:</label>
          <input className={styles.input} type="text" name="route" onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Business Name:</label>
          <input className={styles.input} type="text" name="businessName" onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Owner Name:</label>
          <input className={styles.input} type="text" name="ownerName" onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Business Photo:</label>
          <input className={styles.input} type="file" name="businessPhoto" onChange={(e) => handleFileChange(e, 'businessPhoto')} />
          {uploading.businessPhoto && <div className={styles.progressBar}><div className={styles.progress} style={{ width: `${uploadProgress.businessPhoto}%` }} /></div>}
          {formData.businessPhoto && <img src={formData.businessPhoto} alt="Business" className={styles.imagePreview} />}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Owner Photo:</label>
          <input className={styles.input} type="file" name="ownerPhoto" onChange={(e) => handleFileChange(e, 'ownerPhoto')} />
          {uploading.ownerPhoto && <div className={styles.progressBar}><div className={styles.progress} style={{ width: `${uploadProgress.ownerPhoto}%` }} /></div>}
          {formData.ownerPhoto && <img src={formData.ownerPhoto} alt="Owner" className={styles.imagePreview} />}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Phone:</label>
          <input className={styles.input} type="text" name="phone" onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input className={styles.input} type="email" name="email" onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Address:</label>
          <input className={styles.input} type="text" name="address" onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>About Us:</label>
          <textarea className={styles.textarea} name="aboutUs" onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Instagram:</label>
          <input className={styles.input} type="url" name="instagram" onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Facebook:</label>
          <input className={styles.input} type="url" name="facebook" onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Twitter:</label>
          <input className={styles.input} type="url" name="twitter" onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>YouTube:</label>
          <input className={styles.input} type="url" name="youtube" onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Justdial:</label>
          <input className={styles.input} type="url" name="justdial" onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Expire Date:</label>
          <input className={styles.input} type="date" name="expireTime" onChange={handleChange} />
        </div>

        <button className={styles.button} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminForm;
