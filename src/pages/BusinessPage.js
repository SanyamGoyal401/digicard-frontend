import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaStar, FaDownload } from 'react-icons/fa';
import styles from './BusinessPage.module.css';
import QRCode from 'qrcode.react';
import BaseUrl from '../constants';

const BusinessPage = () => {
  const [business, setBusiness] = useState(null);
  const { route } = useParams();
  const [qrCodeSize, setQrCodeSize] = useState(window.innerWidth * 0.4);

  useEffect(() => {
    const fetchBusiness = async () => {
      const { data } = await axios.get(`${BaseUrl}/business/${route}`);
      setBusiness(data);
    };

    fetchBusiness();

    const handleResize = () => {
      setQrCodeSize(window.innerWidth * 0.4);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [route]);

  if (!business) {
    return <div>Loading...</div>;
  }

  // download QR code
  const downloadQRCode = () => {
    const qrCodeURL = document.getElementById('qrCodeEl')
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    console.log(qrCodeURL)
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = `${business.businessName}_QR.png`;
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  }

  return (
    <div className={styles.businessPageContainer}>
      <div className={styles.businessPhoto}>
        <img src={business.businessPhoto} alt="Business" />
      </div>
      <div className={styles.ownerPhotoContainer}>
        <img src={business.ownerPhoto} alt="Owner" />
      </div>
      <div className={styles.ownerDetailsCard}>
        <div>
          <h2>{business.businessName}</h2>
          <h2>{business.ownerName}</h2>
          <p>{business.aboutUs}</p>
        </div>
      </div>
      <div className={styles.contactInfo}>
        {
          business.phone &&
          <div className={styles.contactItem}>
            <div className={styles.iconContainer}>
              <FaPhone className={styles.icon} />
            </div>
            <div className={styles.contactLink}>
              <a href={`tel:${business.phone}`}>{business.phone}</a>
            </div>
          </div>
        }
        {
          business.email &&
          <div className={styles.contactItem}>
            <div className={styles.iconContainer}>
              <FaEnvelope className={styles.icon} />
            </div>
            <div className={styles.contactLink}>
              <a href={`mailto:${business.email}`}>{business.email}</a></div>
          </div>
        }
        {
          business.address &&
          <div className={styles.contactItem}>
            <div className={styles.iconContainer}>
              <FaMapMarkerAlt className={styles.icon} />
            </div>
            <div className={styles.contactLink}>
              <a href={`http://maps.google.com/?q=${business.address}`}>{business.address}</a>
            </div>
          </div>
        }
        {
          business.website &&
          <div className={styles.contactItem}>
            <div className={styles.iconContainer}>
              <FaGlobe className={styles.icon} />
            </div>
            <div className={styles.contactLink}>
              <a href={business.website} target="_blank" rel="noopener noreferrer">{business.website}</a>
            </div>
          </div>
        }
      </div>

      <div className={styles.socialLinks}>
        {
          business.instagram &&
          <div className={styles.socialLinkContainer}>
            <a href={business.instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram id={styles.instagram} className={styles.icon} />
            </a>
          </div>
        }
        {
          business.facebook &&
          <div className={styles.socialLinkContainer}>
            <a href={business.facebook} target="_blank" rel="noopener noreferrer">
              <FaFacebook id={styles.facebook} className={styles.icon} />
            </a>
          </div>
        }
        {
          business.twitter &&
          <div className={styles.socialLinkContainer}>
            <a href={business.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter id={styles.twitter} className={styles.icon} />
            </a>
          </div>
        }
        {
          business.youtube &&
          <div className={styles.socialLinkContainer}>
            <a href={business.youtube} target="_blank" rel="noopener noreferrer">
              <FaYoutube id={styles.youtube} className={styles.icon} />
            </a>
          </div>
        }
        {
          business.justdial &&
          <div className={styles.socialLinkContainer}>
            <a href={business.justdial} target="_blank" rel="noopener noreferrer">
              <FaStar id={styles.justdial} className={styles.icon} />
            </a>
          </div>
        }
      </div>
      <div className={styles.qrCodeSection}>
        <div className={styles.qrCodeHeader}>
          <div className={styles.textHeader}>QR Code</div>
          <div 
            className={styles.downloadbtn}
            onClick={downloadQRCode}
            >
              <FaDownload />
          </div>
        </div>
        <div className={styles.qrCodeContainer}>
          <QRCode
            id='qrCodeEl'
            className={styles.qrcode}
            size={Math.min(qrCodeSize, 300)}
            value={window.location.href}
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;