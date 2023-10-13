import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { TextField, Stack, Autocomplete } from '@mui/material';
import './TakeOrderModal.css'
import API from '../../../../axios';
import { useAuth } from '../../../../contexts/AuthContext';
import OpenItemsModal from './OpenItemsModal';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const TakeOrderModal = ({ phone, closeTakeOrderModal }) => {
    const [cuisines, setCuisines] = useState([])
    const [items, setItems] = useState([]);
    const [updated, setUpdated] = useState(false);
    const { currentUser } = useAuth();
    const [menu, setMenu] = useState([]);
    const [itemsModal, setItemsModal] = useState(null);
    const [order, setOrder] = useState([]);
    const [input,setInput]=useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => {
        fetchData();
    }, [updated, itemsModal])
    const fetchData = async () => {
        const resp = await API.post("restaurant/getRestaurantMenu", { rid: currentUser._id });
        setMenu(resp.data.menu);
        let arr = [];
        resp.data.menu.map((ele) => {
            ele.items.map((item) => {
                arr.push({ name: item.Name, price: item.Price });
            })
        })
        setItems(arr);
        setCuisines(resp.data.menu.map((ele) => ele.name));
    }
    const openItemsModel = (elem, index) => {
        setItemsModal(elem)
        setItems([])
        menu.map((ele) => {
            if (ele.name == elem) {
                setItems(ele.items)
            }
        })
    }

    const updateItemModal = (newState) => {
        setItemsModal(newState);
    }

    const handleOrder = (orderedItems) => {
        let arr = [...order];
        orderedItems.map((ele) => arr.push(ele))
        setOrder(arr);
    }
    const removeItem = (ind) => {
        let data = [...order];
        data[ind].quantity -= 1;
        if (data[ind].quantity <= 0) {
            data.splice(ind, 1);
        }
        setOrder(data);
    }
    const addItem = (index) => {
        let data = [...order];
        data[index].quantity += 1;
        setOrder(data);
    }
    const handleAutocompleteChange = (event,value) => {
        setSelectedItem(value);
       
    };
    
    const handleInputChange = (event, newValue) => {
        setInput(newValue);
    };

    const addNewItem = () => {
        if (selectedItem) {
            console.log(selectedItem);
             let data = [...order];
            const item = selectedItem.split(' ') ; 
            data.push({ name: item[2],quantity:1, price: items[parseInt(item[0][0])-1].price });
            setOrder(data);
            setSelectedItem(null);
          setInput('');
        }
    }
    const placeOrder=async()=>{
        const resp=await API.post("/restaurant/placeOrder",{rid:currentUser._id, phone:phone, order:order});
        setOrder([]) ;
    }
    return (
        <div className="orderModal">
            <div className="orderModalContent" key={phone}>
                <CloseIcon className='closeModalBtn' onClick={() => closeTakeOrderModal(null)} />
                {
                    itemsModal != null &&
                    <OpenItemsModal
                        name={itemsModal}
                        items={items}
                        updateItemModal={updateItemModal}
                        handleOrder={handleOrder}
                    />
                }
                <div className='search_order'>
                    <Stack spacing={2} sx={{ width: 300 }}>
                        <Autocomplete
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            value={input}
                            onChange={handleAutocompleteChange}
                            onInputChange={handleInputChange}
                            options={items.map((option, ind) => `${ind+1})  ${option.name}`)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search Item"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                            size='small'
                            />
                            </Stack>
                         <button onClick={addNewItem} className='btn btn-primary'>Add Item</button>
                </div>
                <div className='CuisineHolder'>
                    {
                        cuisines.map((elem, ind) => {
                            return (
                                <div className='cuisines' onClick={() => { openItemsModel(elem, ind) }}>
                                    <h6>{elem}</h6>
                                </div>
                            )
                        })
                    }
                </div>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                    {
                        order.map((ele, ind) => {
                            return (
                                <>
                                    <tr>
                                        <td>{ele.name}</td>
                                        <td>
                                            <RemoveIcon onClick={() => removeItem(ind)} />
                                            {ele.quantity}
                                            <AddIcon onClick={() => addItem(ind)} />
                                        </td>
                                        <td>
                                            {parseInt(ele.quantity) * parseInt(ele.price)}
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </table>
                <button 
                    className="btn btn-primary" 
                    onClick={placeOrder}
                    disabled={!order.length}
                >
                    Place Order
                </button>
            </div>
        </div>
    );
}

export default TakeOrderModal;