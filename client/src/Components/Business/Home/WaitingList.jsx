import { useState, useEffect } from 'react';
import './WaitingList.css';
import 'bootstrap/dist/css/bootstrap.css'
import API from '../../../axios';
import Delete from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Loading from '../../Loading/Loading';
import { useAuth } from '../../../contexts/AuthContext';
import { InputLabel, MenuItem, FormControl } from '@mui/material';
import Select from '@mui/material/Select';

function WaitingList({ handleUpdate, updated }) {
  const [formData, setFormData] = useState({ name: '', pax: '', phone: '' })
  const [loe, setLoe] = useState([]);
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const [pax, setPax] = useState('');

  async function handleClick() {
    if (formData.name.trim().length != 0 && formData.pax!='' && formData.phone.trim().length != 0) {
      setIsLoading(true);
      await API.post('/restaurant/insertWaitingList', { rid: currentUser._id, name: formData.name, pax: formData.pax, phone: formData.phone, email: '' });
      setLoe((prev) => [...prev, formData]);
      setFormData({ name: '', pax: formData.pax, phone: '' })
      setIsLoading(false);
    }
    else {
      alert("Enter proper information")
    }

  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value
    }));

  }
  const handlePaxChange = (event) => {
    setPax(event.target.value);
    setFormData((prevValue) => ({
      ...prevValue,
      pax: parseInt(event.target.value)
    }))
  };

  async function handleDelete(index) {
    setIsLoading(true);
    const resp = await API.post('/restaurant/removeWaitingCustomer', { rid: currentUser._id, phone: loe[index].phone });
    const updatedList = loe.filter((_, ind) => index != ind)
    setLoe(updatedList)
    setIsLoading(false);
  }
  async function handleDine(index) {
    setIsLoading(true);
  
    const resp2 = await API.post('/restaurant/addOccupied', { rid: currentUser._id, pax: parseInt(loe[index].pax) })
    if (resp2.data.message === "Available") {
      const resp = await API.post('/restaurant/addToDineIn', { rid: currentUser._id, cname: loe[index].name, pax: loe[index].pax, phone: loe[index].phone, email: loe[index].email, size: resp2.data.Size });
      handleDelete(index);
      handleUpdate();
    }
    else {
      alert("No table is available right now\nKindly wait for some time")
    }

    setIsLoading(false);

  }

  useEffect(() => {
    const fetchWaitingList = async () => {
      const resp = await API.post('/restaurant/getWaitingList', { rid: currentUser._id });
      const arr = resp.data.customers.map((ele) => {
        return ({ name: ele.cname, pax: ele.pax, phone: ele.phone })
      });
      setLoe(arr);
    }
    fetchWaitingList();
  }, [updated]);
  const passengers = ['1 guest', '2 guests', '3 guests', '4 guests', '5 guests', '6 guests', '7 guests', '8 guests', '9 guests', '10 guests']

  return (
    <>
      {isLoading && <Loading />}
      <h2>Waiting List</h2>
      <div className='form_input'  >
        <input type='text' name="name" placeholder='Enter name to reserve table' onChange={handleChange} value={formData.name}></input>
        {/* <input type='number' name="pax" placeholder='Enter number of persons' onChange={handleChange} value={formData.pax}></input> */}
        <div>
          <FormControl >
            <InputLabel id="demo-simple-select-label">Pax</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pax}
              label="Pax"
              onChange={handlePaxChange}
              style={{ width: '150px' }}
              autoWidth={true}
              required
            >
              {passengers.map((ele, ind) => {
                return (<MenuItem value={ind + 1} key={ind} >{ele}</MenuItem>)
              })}

            </Select>
          </FormControl>
        </div>
        <input type='phone' name="phone" placeholder='Enter Phone' onChange={handleChange} value={formData.phone}></input>
        <button onClick={handleClick} className='btn btn-primary add_btn'><AddIcon /></button>
      </div><br /><br /><br /><br />
      {
        loe.map((ele, index) => {
          return (
            <>
              <div className='element' key={index}>
                <div className="Customer_name">{ele.name}</div>
                <div className="Customer_name">{ele.pax}</div>
                <div className="Customer_name">{ele.phone}</div>
                <button className='btn btn-primary delete_btn' onClick={() => {
                  handleDelete(index)
                }} > <Delete /> </button>
                <button className='btn btn-primary dine_btn' onClick={() => {
                  handleDine(index)
                }} > Send to Dine</button>
              </div>
            </>)
        })}
    </>)
}
export default WaitingList;