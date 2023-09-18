import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import './List.css'
import WaitingList from './WaitingList';
import DiningList from './DiningList';
import { useAuth } from '../../../contexts/AuthContext'
import API from '../../../axios';

const Home = () => {

  const [updated, setUpdated] = useState(0);
  const { userType, currentUser } = useAuth();
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState(currentUser.thumbnail_url)
  const [img_urls, setImg_urls] = useState([])
  const [imgIndex,setimgIndex] = useState(0)

  useEffect(() => {
    setImg_urls(currentUser.images_urls)
  }, [imgIndex]);

  const handleUpdate = () => {
    setUpdated(prev => prev + 1);
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('images', file);

    const result = await API.post("/cloudinary/thumbnail", formData)
    console.log(result.data.img_urls[0]);
    const res = await API.post("/restaurant/updateThumbnail", { rid: currentUser._id, "thumbnail_url": result.data.img_urls[0] })
    setThumbnail(result.data.img_urls[0])
    console.log(res.data)
  };

  const handleImgChange = (ind)=>{
    setimgIndex(ind)
  }
  const deleteRestaurantImage=async(url,index)=>{
    const ans=confirm("Are you sure you want to delete the Image");
    if(ans){
      const resp=await API.post("/cloudinary/deleteImage",{img_url:url});
      console.log(resp.data);
      if(resp.data.result.result=='ok'){
        alert("Image Deleted successfully")
        const resp2=await API.post("/restaurant/deleteRestaurantImage",{rid:currentUser._id,img_url:url})

       if(resp2.data.matchedCount==1){
        const arr=[...img_urls];
        // const arr = arr.slice(0,index).concat(arr.slice(index));
        arr.splice(index,1);
        setImg_urls(arr);

       }
      }
      else{
        alert("Image deletion failed")
      }
    }
  }
  return (
    <>
      <div className="main">
        <div className="background">
          <div className="content1">
            <div className="content1_left">
              <div className="thumbnail_pic">
                <input className="inputThumbnail"
                  type="file"
                  name="images"
                  onChange={handleFileChange}
                />
                <img src={thumbnail} className="thumbnail_img" style={{ 'zIndex': 2 }} />
                <div className="thumbnail_img">Black</div>
              </div>
            </div>
            <div className="content1_right">
              <h2>{currentUser.name}</h2>
              <h6>{currentUser.sitting_capacity}</h6>
              <h6>{currentUser.location_url}</h6>
              <h6>Extra details</h6>
              <h6>Extra details</h6>
              <h6>Extra details</h6>
              {/* Menu, Clock, Orders, Photos,  */}
            </div>
          </div>
          <div className="content2">
            <div className='RestaurantImgHolder'>
              <div className='ImageHolderLeft'>
                <img src={img_urls[imgIndex]} height={420} width={400} />
              </div>
              <div className='ImageHolderRight'>
                {
                  img_urls.map((ele, index) => {

                    return (
                      <div className='image_view'>
                        <img className="picture" src={ele} onClick={() => {
                          handleImgChange(index)
                        }} />
                        <div className='deletediv'>
                          <img width="25" height="25" src="https://img.icons8.com/fluency/48/delete-sign.png" alt="delete-sign" onClick={()=>{
                            deleteRestaurantImage(ele,index)
                          }} />
                        </div>
                      </div>
                    )
                  })
                }
                <button className='btn btn-primary'>Add Images</button>
              </div>
            </div>



            <h5>Waiting Time(in minutes)</h5>
            <input type="number" defaultValue={0} />
            <button>Update Waiting time</button>
            <br />
            <br />
            <div>
              <button onClick={() => {
                navigate("/business/menu")
              }}>Update Menu</button>
            </div>
            <br />
            <br />
            <div className='content3'>
              <div className='contentLeft'>
                <h3>Waiting List</h3>
                <WaitingList key={"1"} handleUpdate={handleUpdate} />
              </div>
              <div className='contentLeft'>
                <h3>Dining List</h3>
                <DiningList key={"1"} updated={updated} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Home