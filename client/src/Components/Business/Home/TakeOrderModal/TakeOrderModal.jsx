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

    useEffect(() => {
        fetchData();
    }, [updated])
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
        console.log(arr);
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
        setOrder([...order, orderedItems])
    }
    const removeItem = (ind, index) => {
        let data = [...order];
        data[ind][index].quantity -= 1;
        if (data[ind][index].quantity <= 0) {
            data[ind].splice(index, 1);
        }
        setOrder(data);
    }
    const addItem = (index) => {
        let data = [...order];
        data[ind][index].quantity += 1;
        setOrder(data);
    }
    const handleAutocompleteChange = (event, value,price) => {
        if (value) {
          // Add the selected value to the selectedItems array
         let data=[...order];
         data.push({name:value,price:price});
         setOrder(data);
        }
      };
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
                <div>
                    <Stack spacing={2} sx={{ width: 300 }}>
                        <Autocomplete
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            onChange={()=>{
                                handleAutocompleteChange(event)
                            }}
                            options={items.map((option, ind) => option.name)}
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
                                ele.map((element, index) => {
                                    return (

                                        <tr>
                                            <td>{element.name}</td>
                                            <td>
                                                <RemoveIcon onClick={() => removeItem(ind, index)} />
                                                {element.quantity}
                                                <AddIcon onClick={() => addItem(index)} />
                                            </td>
                                            <td>
                                                {parseInt(element.quantity) * parseInt(element.price)}
                                            </td>
                                        </tr>
                                    )
                                })
                            )
                        })
                    }
                </table>
            </div>
        </div>
    );
}

export default TakeOrderModal;