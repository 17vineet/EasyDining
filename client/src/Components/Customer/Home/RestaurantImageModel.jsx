import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './RestaurantImageModel.css';

const RestaurantImageModel = (props) => {
  // Create a copy of the prop img_urls using spread syntax
  const imgUrls = [...props.img_urls];

  const [imgsrc, setImgSrc] = useState(imgUrls);

  const closeModel = () => {
    props.updateImageModel(false);
  };

  useEffect(() => {
    func();
  }, []);

  const func = () => {
    const arr1 = imgUrls.slice(props.imgmodel.index);
    const arr2 = imgUrls.slice(0, props.imgmodel.index);
    const arr3 = arr1.concat(arr2);
    setImgSrc(arr3);
  };

  return (
    <div className="modal">
      <div className="modal-content" key={"modal"}>
      
        <div  className='close_btn_div'>  <CloseIcon onClick={closeModel}/> </div>
       

        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {imgsrc.map((src, index) => (
              <div key={index} className={`carousel-item${index === 0 ? ' active' : ''}`}>
                <img
                  src={src}
                  className="d-block w-100"
                  alt={`Slide ${index + 1}`}
                  width={400}
                  height={450}
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantImageModel;
