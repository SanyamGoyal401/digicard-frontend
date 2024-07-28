import React, { useEffect, useState } from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaStar } from 'react-icons/fa';
import { FiDownload } from "react-icons/fi";
import { FaPhoneVolume, FaLocationDot } from 'react-icons/fa6';
import { BsEnvelope } from "react-icons/bs";
import { SlGlobe } from "react-icons/sl";
import styles from './Temp1.module.css';
import QRCode from 'qrcode.react';

const Temp1 = ({business}) => {
    const [qrCodeSize, setQrCodeSize] = useState(window.innerWidth * 0.4);

    useEffect(() => {
        const handleResize = () => {
            setQrCodeSize(window.innerWidth * 0.4);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

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
        <div 
            style={{backgroundColor: ''}}
            className={styles.businessPageContainer}>
            <div 
                style={{backgroundColor: business.businessPhotoBackground}}
                className={styles.businessPhotoContainer}>
                <img src={business.businessPhoto} alt="Business" className={styles.businessPhoto} />
            </div>
            <div
                style={{borderColor: business.detailCardBorder}}  
                className={styles.infoContainer}>
                <div 
                    style={{borderColor: business.detailCardBorder}} 
                    className={styles.ownerPhotoContainer}>
                    <img
                        src={business.ownerPhoto} alt="Owner" />
                </div>
                <div 
                    className={styles.ownerDetailsCard}>
                    <div 
                        style={{color: business.ownerNameColor}}
                        className={styles.ownerName}>{business.ownerName}</div>
                    <div
                        style={{color: business.businessNameColor}} 
                        className={styles.businessName}>{business.businessName}</div>
                </div>
            </div>

            <div 
                className={styles.contactInfo}>
                {
                    business.phone &&
                    <>
                        <div className={styles.contactItem}>
                            <div
                                style={{color: business.contactCardColor}} 
                                className={styles.iconContainer}>
                                <FaPhoneVolume className={styles.icon} />
                            </div>
                            <div className={styles.contactLink}>
                                <a 
                                    style={{color: business.contactCardColor}}
                                    href={`tel:${business.phone}`}>{`+91 ${business.phone}`}</a>
                            </div>
                        </div>
                        <div 
                            style={{backgroundColor: business.contactCardColor}}
                            className={styles.line}></div>
                    </>
                }
                {
                    business.email &&
                    <>
                        <div className={styles.contactItem}>
                            <div
                                style={{color: business.contactCardColor}}  
                                className={styles.iconContainer}>
                                <BsEnvelope className={styles.icon} />
                            </div>
                            <div className={styles.contactLink}>
                                <a 
                                    style={{color: business.contactCardColor}} 
                                    href={`mailto:${business.email}`}>{business.email}</a></div>
                        </div>
                        <div
                            style={{backgroundColor: business.contactCardColor}} 
                            className={styles.line}></div>
                    </>
                }
                {
                    business.address &&
                    <>
                        <div className={styles.contactItem}>
                            <div
                                style={{color: business.contactCardColor}}  
                                className={styles.iconContainer}>
                                <FaLocationDot className={styles.icon} />
                            </div>
                            <div className={styles.contactLink}>
                                <a 
                                    style={{color: business.contactCardColor}} 
                                    href={`http://maps.google.com/?q=${business.address}`}>{business.address}</a>
                            </div>
                        </div>
                        <div
                            style={{backgroundColor: business.contactCardColor}}  
                            className={styles.line}></div>
                    </>
                }
                {
                    business.website &&
                    <>
                        <div className={styles.contactItem}>
                            <div
                                style={{color: business.contactCardColor}}  
                                className={styles.iconContainer}>
                                <SlGlobe className={styles.icon} />
                            </div>
                            <div className={styles.contactLink}>
                                <a 
                                    style={{color: business.contactCardColor}} 
                                    href={business.website} target="_blank" rel="noopener noreferrer">{business.website}</a>
                            </div>
                        </div>
                        <div
                            style={{backgroundColor: business.contactCardColor}}  
                            className={styles.line}></div>
                    </>
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
            <div className={styles.aboutContainer}>
                <div
                    style={{color: business.aboutUsHeadingColor}}  
                    className={styles.aboutText}>
                    About Us:
                </div>
                <div
                    style={{
                        borderColor: business.aboutUsHeadingColor,
                        color: business.aboutUsColor
                    }} 
                    className={styles.aboutSection}>
                    <div className={styles.space}></div>
                    {business.aboutUs}
                </div>
            </div>
            <div className={styles.qrCodeSection}>
                <div className={styles.qrCodeHeader}>
                    <div
                        style={{color: business.aboutUsHeadingColor}} 
                        className={styles.textHeader}>QR CODE:</div>
                </div>
                <div className={styles.qrCodeContainer}>
                    <QRCode
                        id='qrCodeEl'
                        className={styles.qrcode}
                        size={Math.min(qrCodeSize, 300)}
                        includeMargin={true}
                        value={window.location.href}
                    />
                </div>
                <div
                    className={styles.downloadbtn}
                    onClick={downloadQRCode}
                    style={{color: business.aboutUsHeadingColor}}
                >
                    DOWNLOAD <FiDownload className={styles.downloadLogo}/>
                </div>
            </div>
        </div>
    );
};

export default Temp1;