import React, { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import PhoneEmailModel from './PhoneEmailModel'
import { useAuth } from '../../../contexts/AuthContext';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './RestaurantProfile.css'
import { useNavigate } from "react-router-dom";
import { FormControlLabel, Switch, FormGroup } from '@mui/material';
import NameModel from './NameModel';
import TableModal from './TableModal';
import API from '../../../axios';
import Loading from '../../Loading/Loading';
import VisitedCustomer from './VisitedCustomer';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import jwtDecode from 'jwt-decode';
import LineChart from './LineChart';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RestaurantProfile = () => {



  const navigate = useNavigate();
  const { currentUser, setCurrentUser, setAuth } = useAuth();
  const [models, setModel] = useState({ name: false, email: false, phone: false, table: false });
  const [img_urls, setImg_urls] = useState([])
  const [thumbnail, setThumbnail] = useState(currentUser.thumbnail_url)
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadingImages, setUploadingImages] = useState({ spinner: false, tick: false });
  const [accepting, setAccepting] = useState(currentUser?.accepting);
  const [openingTime, setOpeningTime] = useState(currentUser?.opening_time || '');
  const [closingTime, setClosingTime] = useState(currentUser?.closing_time || '');
  const [editOpenTime, setEditOpenTime] = useState(false);
  const [editCloseTime, setEditCloseTime] = useState(false);
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  useEffect(() => {
    setImg_urls(currentUser.images_urls)
    setAccepting(currentUser.accepting)
  }, []);

  const handleImgChange = (ind) => {
    setimgIndex(ind)
  }

  const handleFileChangeforMultipleUpload = (event) => {
    const file = event.target.files;
    console.log(file)
    setSelectedFile(file);
  };

  const uploadImages = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (selectedFile) {
      setUploadingImages({ spinner: true, tick: false });
      const formData = new FormData();
      for (let i = 0; i < selectedFile.length; i++) {
        formData.append('images', selectedFile[i]);
      }
      const result = await API.post("/cloudinary/images", formData)
      const new_urls = result.data.img_urls;
      console.log(new_urls)
      setImg_urls([...img_urls, ...new_urls]);
      setUploadingImages({ spinner: false, tick: true });
      setCurrentUser(prev => ({ ...prev, images_urls: [...img_urls, ...new_urls] }));
      await API.post("/restaurant/uploadimages", { rid: currentUser._id, images_urls: result.data.img_urls })
      setLoading(false)
    }
    else {
      alert('Please select some images !!!')
      setLoading(false)
    }

  };


  const deleteRestaurantImage = async (url, index) => {
    const ans = confirm("Are you sure you want to delete the Image");
    if (ans) {
      const resp = await API.post("/cloudinary/deleteImage", { img_url: url });
      console.log(resp.data);

      if (resp.data.result.result == 'ok') {
        alert("Image Deleted successfully")
        const resp2 = await API.post("/restaurant/deleteRestaurantImage", { rid: currentUser._id, img_url: url })

        if (resp2.data.matchedCount == 1) {
          const arr = [...img_urls];
          arr.splice(index, 1);
          setImg_urls(arr);
          setCurrentUser(prev => ({ ...prev, images_urls: arr }));
        }
      }
      else {
        alert("Image deletion failed")
      }
    }
  }

  const handelDeleteAccount = async () => {
    const res = confirm('Are you sure you want to delete your account \n*Note that this action is not reversible and you cannot retrieve your account back')
    if (res) {
      const password = prompt('Please confirm your password to delete your account')
      const resp = await API.post('/restaurant/deleteAccount', { 'rid': currentUser._id, 'password': password })

      if (resp.data.message === 'Success') {
        alert('Account Deleted Successfully')
        setCurrentUser(null);
        setAuth(null);
        navigate('/')
      }
      else {
        alert('Account could not be deleted due to incorrect password')
      }
    }
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('images', file);

    const result = await API.post("/cloudinary/thumbnail", formData)
    console.log(result.data.img_urls[0]);
    const res = await API.post("/restaurant/updateThumbnail", { rid: currentUser._id, "thumbnail_url": result.data.img_urls[0] })
    setThumbnail(result.data.img_urls[0])
    setCurrentUser({ ...currentUser, thumbnail_url: result.data.img_urls[0] })
  };

  const handleAccept = async (e) => {
    // console.log(e);
    // let password = prompt("Enter your password");
    const resp = await API.post('/restaurant/handleAccept', { rid: currentUser._id, accepting: e.target.checked });
    if (resp.data.message) {
      alert("Incorrect password")
    }
    else {

      const decodedToken = jwtDecode(resp.data.accessToken);
      setCurrentUser(decodedToken);
      setAuth(resp.data.accessToken);
      setAccepting(!accepting);
    }
  }

  const handleSave = async (e) => {
    const name = e.target.name;
    let decodedToken = '', resp = '';
    if (name === 'open') {
      resp = await API.post('/restaurant/setopenclose', { rid: currentUser._id, type: name, time: openingTime })
      decodedToken = jwtDecode(resp.data.accessToken)
      setOpen(true);
      setEditOpenTime(false);
    }
    else {
      resp = await API.post('/restaurant/setopenclose', { rid: currentUser._id, type: name, time: closingTime })
      decodedToken = jwtDecode(resp.data.accessToken)
      setOpen(true);
      setEditCloseTime(false);
    }
    setCurrentUser(decodedToken);
    setAuth(resp.data.accessToken);
  }

  return (
    <>
      {loading && <Loading />}
      {models.name && <NameModel closeNameModel={(newstate) => setModel({ ...models, name: newstate })} />}
      {models.phone && <PhoneEmailModel editField="phone" closePEmodel={(newstate) => setModel({ ...models, phone: newstate })} />}
      {models.email && <PhoneEmailModel editField="email" closePEmodel={(newstate) => setModel({ ...models, email: newstate })} />}
      {models.table && <TableModal closeTableModel={(newstate) => setModel({ ...models, table: newstate })} />}

      <div className="backdrop">
        <div className="RestaurantDetailsHolder">
          {/* <div className="profilePicHolder"> */}
          <div className="thumbnail_pic">
            <input className="inputThumbnail"
              type="file"
              name="images"
              onChange={handleFileChange}
            />
            <img src={thumbnail} className="thumbnail_img" style={{ 'zIndex': 2 }} />
            {/* <div className="thumbnail_img">Black</div> */}
          </div>
          {/* <img className='thumbnail' src={`${currentUser.thumbnail_url}`} alt="" /> */}
          {/* </div> */}
          <div className="RestaurantDetails">
            <ul >
              <li>{currentUser.name} &nbsp;&nbsp;
                <EditIcon onClick={() => setModel({ ...models, name: true })} style={{ fontSize: '15px' }} htmlColor='red' />
                &nbsp;&nbsp;&nbsp;&nbsp;

              </li>
              <li>
                <LocalPhoneIcon /> &nbsp;&nbsp;{currentUser.phone} &nbsp;&nbsp;
                <EditIcon onClick={() => setModel({ ...models, phone: true })} style={{ fontSize: '15px' }} htmlColor='red' />
              </li>
              <li>
                <EmailIcon /> &nbsp;&nbsp;{currentUser.email} &nbsp;&nbsp;
                <EditIcon onClick={() => setModel({ ...models, email: true })} style={{ fontSize: '15px' }} htmlColor='red' />
              </li>
            </ul>
            <button className='btn btn-danger m-2' onClick={handelDeleteAccount}>Delete Account</button>
            <button className='btn btn-primary m-2' onClick={() => {
              setModel({ ...models, table: true })
            }}>Update Table</button>
            <button className='btn btn-primary m-2' onClick={() => {
              navigate("/business/menu")
            }}>Update Menu</button>
          </div>
          <div>
            <div className="openclose">
              <FormGroup>
                <h5 >Accepting Online Reservations : <FormControlLabel control={<Switch checked={accepting} onChange={handleAccept} />} /></h5>
              </FormGroup>
            </div>
            <div className='openclose'>
              <label htmlFor="OpenTime">Open Time</label>
              <input type='time' id="OpenTime" disabled={!editOpenTime} value={openingTime} className='time' onChange={(e) => {
                setOpeningTime(e.target.value)
              }} />
              {
                !editOpenTime ? <button className='btn btn-danger' onClick={() => {
                  setEditOpenTime(true);
                }}>Edit</button> : <button className='btn btn-primary' name='open' onClick={(e) => handleSave(e)}>Save</button>
              }
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Time Updated Successfully
                </Alert>
              </Snackbar>

            </div>
            <div className='openclose'>
              <label htmlFor="CloseTime">Close Time</label>
              <input type='time' id="CloseTime" className='time' value={closingTime} disabled={!editCloseTime} onChange={(e) => {
                setClosingTime(e.target.value)
              }} />
              {
                !editCloseTime ? <button className='btn btn-danger' onClick={() => {
                  setEditCloseTime(true);
                }}>Edit</button> : <button className='btn btn-primary' name='close' onClick={(e) => handleSave(e)}>Save</button>
              }
            </div>
          </div>
        </div>

        <div className="content2">
          <div className='RestaurantImgHolder'>
            {/* <div className='ImageHolderLeft'>
                <img src={img_urls[0]} height={420} width={400} />
              </div> */}
            <div className='ImageHolderRight'>
              <div className='pictureViewer'>
                {
                  img_urls.map((ele, index) => {

                    return (
                      <div className='image_view' key={index}>
                        <img className="picture" src={ele} />
                        <div className='deletediv' onClick={() => {
                          handleImgChange(index)
                        }}>
                          <img width="25" height="25" src="https://img.icons8.com/fluency/48/delete-sign.png" alt="delete-sign" onClick={() => {
                            deleteRestaurantImage(ele, index)
                          }} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>

              <div>
                <Button component="label" className='m-2' variant="contained" startIcon={<CloudUploadIcon />}>
                  Upload file
                  <VisuallyHiddenInput type="file" name='images' onChange={handleFileChangeforMultipleUpload}
                    multiple />
                </Button>
                <button className='btn btn-primary m-2' onClick={uploadImages}>Upload</button>
              </div>

            </div>

          </div>
        </div>
        <div className='insights'>
          <div className="dailySales">
           <LineChart type="Daily"/>
          </div>
          <div className="monthlySales">
          <LineChart type="Monthly"/>

          </div>
        </div>
        <VisitedCustomer />
      </div>
    </>
  )
}

export default RestaurantProfile