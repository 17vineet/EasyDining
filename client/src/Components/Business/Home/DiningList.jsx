import { useState, useEffect } from 'react';
import './WaitingList.css';
import 'bootstrap/dist/css/bootstrap.css'
import API from '../../../axios';
import Delete from '@mui/icons-material/Delete';
import Loading from '../../Loading/Loading';
import { useAuth } from '../../../contexts/AuthContext';

function DiningList({updated}) {
  const [name, setName] = useState('')
  const [dine, setDine] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const { currentUser } = useAuth();

  async function handleClick() {
    if (name.trim().length != 0) {
      setIsLoading(true);
      await API.post('/restaurant/insertDiningList', { rid: currentUser._id, name: name,pax:10,phone:123456789,email:"" })
      setDine((prev) => [...prev, {name:name,pax:10}]);
      setName("");
      setIsLoading(false);
    }
    else {
      alert("Enter proper name")
    }

  }
  function handleChange(event) {
    setName(event.target.value)
  }
  async function handleDelete(index) {
    setIsLoading(true);
    const resp = await API.post('/restaurant/removeDiningCustomer', { rid: currentUser._id, index });
    setIsLoading(false);
    const updatedList = dine.filter((_, ind) => index != ind)
    setDine(updatedList)
    setIsLoading(false);
  }
  
  useEffect(() => {
    const fetchDiningList = async () => {
      const resp = await API.post('/restaurant/getDiningList', { rid: currentUser._id });
      const arr = resp.data.customers.map((elem) => {
        return (
          {
            name:elem.cname,
            pax:elem.pax
          }
        )
      });
      console.log(arr)
      setDine(arr);
    }
    fetchDiningList();
  }, [updated]);

  return (
    < >
      {isLoading && <Loading />}
      <div   >
        <input type='text' placeholder='Enter your name to reserve table' onChange={handleChange} value={name}></input>
        <button onClick={handleClick} className='btn btn-primary add_btn'>Add Element</button>
      </div><br></br>
      {
        dine.map((ele, index) => {
          return (
            <>
              <div className='element' key={index}>
                <div className="Customer_name">{ele.name}</div>
                <div className="Customer_name">{ele.pax}</div>
                <button className='btn btn-primary delete_btn' onClick={() => {
                  handleDelete(index)
                }} > <Delete /> </button>
              </div>
            </>)
        })}</>)
}
export default DiningList;