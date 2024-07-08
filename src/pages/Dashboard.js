import React, { useState, useEffect, useContext } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Modal, TextField, Box, IconButton
} from '@mui/material';
import Navbar from '../components/Navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import styles from './Dashboard.module.css';
import AuthContext from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [businesses, setBusinesses] = useState([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({ businessPhoto: 0, ownerPhoto: 0 });
  const [uploading, setUploading] = useState({ businessPhoto: false, ownerPhoto: false });
  const {axios} = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/business/form'); // Adjust the URL as needed
      setBusinesses(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const handleUpdate = (business) => {
    setSelectedBusiness(business);
    setOpenUpdateModal(true);
  };

  const handleDelete = (business) => {
    setSelectedBusiness(business);
    setOpenDeleteModal(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:8000/business/form/${selectedBusiness._id}`, selectedBusiness);
      fetchBusinesses();
      setOpenUpdateModal(false);
    } catch (error) {
      console.error('Error updating business:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:8000/business/form/${selectedBusiness._id}`);
      fetchBusinesses();
      setOpenDeleteModal(false);
    } catch (error) {
      console.error('Error deleting business:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedBusiness((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading({ ...uploading, [type]: true });
    const data = new FormData();
    data.append('photo', file);

    try {
      const response = await axios.post('http://localhost:8000/business/form/photo', data, {
        onUploadProgress: (progressEvent) => {
          setUploadProgress({ ...uploadProgress, [type]: (progressEvent.loaded / progressEvent.total) * 100 });
        },
      });
      setSelectedBusiness({ ...selectedBusiness, [type]: response.data.url });
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading({ ...uploading, [type]: false });
    }
  };

  const handleImageDelete = async (type) => {
    const url = selectedBusiness[type];
    try {
      await axios.delete('http://localhost:8000/business/form/photo', { data: { url: url } });
      setSelectedBusiness({ ...selectedBusiness, [type]: '' });
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <Navbar />
      <div className={styles.tableContainer}>
        <TableContainer component={Paper}>
          <Table className={styles.table}>
            <TableHead className={styles.tableHeading}>
              <TableRow>
                <TableCell className={styles.tableCell}>Route</TableCell>
                <TableCell className={styles.tableCell}>Business Name</TableCell>
                <TableCell className={styles.tableCell}>Update</TableCell>
                <TableCell className={styles.tableCell}>Delete</TableCell>
                <TableCell className={styles.tableCell}>View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {businesses.map((business) => (
                <TableRow key={business._id}>
                  <TableCell>{business.route}</TableCell>
                  <TableCell>{business.businessName}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="success" onClick={() => handleUpdate(business)}>
                      <UploadIcon />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => handleDelete(business)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => {navigate(`/card/${business.route}`)}}>
                      <VisibilityIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={openUpdateModal} onClose={() => setOpenUpdateModal(false)}>
          <Box className={styles.modalContent}>
            <h2>Update Business</h2>
            {selectedBusiness && (
              <div>
                <TextField
                  label="Route"
                  name="route"
                  value={selectedBusiness.route}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Business Name"
                  name="businessName"
                  value={selectedBusiness.businessName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Owner Name"
                  name="ownerName"
                  value={selectedBusiness.ownerName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <div className={styles.formGroup}>
                  <label className={styles.label}>Business Photo:</label>
                  <input
                    className={styles.input}
                    type="file"
                    name="businessPhoto"
                    onChange={(e) => handleFileUpload(e, 'businessPhoto')}
                  />
                  {uploading.businessPhoto && (
                    <div className={styles.progressBar}>
                      <div className={styles.progress} style={{ width: `${uploadProgress.businessPhoto}%` }} />
                    </div>
                  )}
                  {selectedBusiness.businessPhoto && (
                    <div className={styles.imageContainer}>
                      <img src={selectedBusiness.businessPhoto} alt="Business" className={styles.imagePreview} />
                      <IconButton onClick={() => handleImageDelete('businessPhoto')}><CancelIcon /></IconButton>
                    </div>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Owner Photo:</label>
                  <input
                    className={styles.input}
                    type="file"
                    name="ownerPhoto"
                    onChange={(e) => handleFileUpload(e, 'ownerPhoto')}
                  />
                  {uploading.ownerPhoto && (
                    <div className={styles.progressBar}>
                      <div className={styles.progress} style={{ width: `${uploadProgress.ownerPhoto}%` }} />
                    </div>
                  )}
                  {selectedBusiness.ownerPhoto && (
                    <div className={styles.imageContainer}>
                      <img src={selectedBusiness.ownerPhoto} alt="Owner" className={styles.imagePreview} />
                      <IconButton onClick={() => handleImageDelete('ownerPhoto')}><CancelIcon /></IconButton>
                    </div>
                  )}
                </div>
                <TextField
                  label="Phone"
                  name="phone"
                  value={selectedBusiness.phone}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  name="email"
                  value={selectedBusiness.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Address"
                  name="address"
                  value={selectedBusiness.address}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="About Us"
                  name="about"
                  value={selectedBusiness.aboutUs}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Instagram"
                  name="instagram"
                  value={selectedBusiness.instagram}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Facebook"
                  name="facebook"
                  value={selectedBusiness.facebook}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Twitter"
                  name="twitter"
                  value={selectedBusiness.twitter}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Youtube"
                  name="youtube"
                  value={selectedBusiness.youtube}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Justdial"
                  name="justdial"
                  value={selectedBusiness.justdial}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <div className={styles.formGroup}>
                  <label className={styles.label}>Expire Date:</label>
                  <input className={styles.input} type="date" name="expireTime" value={selectedBusiness.expireTime} onChange={handleChange} />
                </div>
                <div className={styles.modalButtons}>
                  <Button variant="contained" color="success" onClick={handleUpdateSubmit}>
                    Update
                  </Button>
                  <Button variant="contained" color="error" onClick={() => setOpenUpdateModal(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </Box>
        </Modal>

        <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
          <Box className={styles.modalContent}>
            <div>
            <h2>Delete Confirmation</h2>
              <p>Are you sure you want to delete this business?</p>
              <div className={styles.modalButtons}>
                <Button variant="contained" color="success" onClick={handleDeleteConfirm}>
                  Delete
                </Button>
                <Button variant="contained" color="error" onClick={() => setOpenDeleteModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
