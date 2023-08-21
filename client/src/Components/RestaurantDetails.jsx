import React, {useState} from 'react'

import './RestaurantDetails.css' ;

const RestaurantDetails = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        googleMapUrl: '',
        capacity: '',
        range: '',
        menu: '',
        numTables: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // You can perform further actions with the form data here
        console.log(formData);
      };
    return (
    <div className="form-container">
    <form onSubmit={handleSubmit} method='post'>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Google Map URL:</label>
        <input
          type="text"
          name="googleMapUrl"
          value={formData.googleMapUrl}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Capacity:</label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Range:</label>
        <input
          type="text"
          name="range"
          value={formData.range}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Menu:</label>
        <textarea
          name="menu"
          value={formData.menu}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Number of Tables:</label>
        <input
          type="number"
          name="numTables"
          value={formData.numTables}
          onChange={handleChange}
          required
        />
      </div>
    </form>
  </div>
);
}

export default RestaurantDetails