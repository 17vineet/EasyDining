import React, { useState, useEffect } from 'react';
import './CuisineModel.css'
import ItemsDropDown from './ItemsDropDown';
import { useAuth } from '../../../contexts/AuthContext';
import API from '../../../axios';
import { TextField } from '@mui/material';
import { Textarea } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import { Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const CuisineModel = (prop) => {
    const cuisine_name = prop.name;
    const [items, setItems] = useState(prop.items)
    const [showAddForm, setShowAddForm] = useState(false);
    const [disable, setDisable] = useState(false);
    const [editable, setEditable] = useState(true);
    const [isSaveAllClicked, setIsSaveAllClicked] = useState(false);
    const [formData, setFormData] = useState({ Name: '', Price: '', Description: '' });
    const { currentUser } = useAuth();

    useEffect(() => {
        setItems((prev) => prev.map((ele, ind) => ({ ...ele, id: ind, editable: false })));
    }, [])

    const handleEdit = (id) => {
        if (editable) {
            setEditable(false);
            setFormData(items[id]);
            setItems((prev) => prev.map((ele, ind) => (id == ind ? { ...ele, editable: true } : ele)));
        }
    };

    const handleSave = (id) => {
        setItems((prev) => prev.map((ele, ind) => id == ind ? { ...formData, editable: false, id: id } : ele))
        setFormData({ Name: '', Price: '', Description: '' })
        setEditable(true)

    };

    const handleDiscard = () => {
        setItems((prev) => prev.map((ele) => ({ ...ele, editable: false })));
        setFormData({ Name: '', Price: '', Description: '' })
        setEditable(true)

    }

    const handleAddNewCuisineItem = () => {
        if (editable) {

            setShowAddForm(true);
            setEditable(false)
        }
    }

    const handleNewCuisineSave = () => {
        if (formData.Name.length != 0 && formData.Price.length != 0) {
            let _items = items
            _items.push(formData)
            setItems(_items);
            setShowAddForm(false);
            setFormData({ Name: '', Price: '', Description: '' })
            setEditable(true)
        }
        else {
            alert('Enter proper Name and Price for your item');
        }

    }

    const handleAddSave = async () => {
        const resp = await API.post('restaurant/updateRestaurantMenu', { rid: currentUser._id, items, cuisine_name });
        console.log(resp.data);
        setIsSaveAllClicked(true);
        setDisable(false);
        setShowAddForm(false);
        prop.handleUpdate();
        setFormData({ Name: '', Price: '', Description: '' })
        setEditable(true)
    };

    const handleDelete = async (ind) => {
        console.log(ind)
        const reply = confirm("Are you sure you want to delete " + items[ind].Name + " ?")
        if (reply) {
            let menuItems = [...items];
            menuItems = [...menuItems.slice(0, ind), ...menuItems.slice(ind + 1)]
            setItems(menuItems)
            console.log(items)
            const resp = await API.post('restaurant/updateRestaurantMenu', { rid: currentUser._id, items: menuItems, cuisine_name });
            prop.handleUpdate();
            console.log(resp.data)
        }

        // console.log(menuItems)
    }

    const discardAllChanges = () => {
        setItems(prop.items)
        setEditable(true)
    }

    const setItemName = ({ name }) => {
        setFormData((ele) => { return { ...ele, Name: name } });
    }

    return (
        <div className="modal">
            <div className="modal-content" key={"modal"}>
                <div className="row1">
                    <div><h2>Cuisine : <i>{cuisine_name}</i></h2></div>
                    <div onClick={handleAddNewCuisineItem} className='add'><button className='btn btn-primary m-2'>Add Item</button>
                        <span className="close" onClick={() => { prop.updateCuisineModel(null) }}>
                            <img width="35" height="35" src="https://img.icons8.com/fluency/48/delete-sign.png" alt="delete-sign" />
                        </span></div>
                </div>

                {showAddForm && (
                    <>
                        <div className='addItem'>
                            <div>
                                <ItemsDropDown cuisine_name={cuisine_name} setItemName={setItemName} />
                                <TextField
                                    type="number"
                                    placeholder='Enter Item Price'
                                    id="Item_price"
                                    value={formData.Price}
                                    onChange={(event) => {
                                        setFormData((ele) => { return { ...ele, Price: event.target.value } })
                                    }}
                                    variant='outlined'
                                    label='Item_price'
                                />
                            </div>

                            <div>
                                <div>
                                    <FormControl>
                                        {/* <FormLabel>Description</FormLabel> */}
                                        <TextField
                                            placeholder="Description"
                                            minRows={2}
                                            value={formData.Description}
                                            onChange={(event) => {
                                                setFormData((ele) => { return { ...ele, Description: event.target.value } })
                                            }}
                                            variant='outlined'
                                            label='Description'
                                            style={{ width: '530px' }}
                                        />

                                    </FormControl>
                                </div>
                            </div>
                            <div>
                            <button className='btn btn-danger ' onClick={() => {
                                    setShowAddForm(false)
                                    setEditable(true)
                                }}>Discard</button>
                                <button className='btn btn-primary' onClick={handleNewCuisineSave}>Save</button>
                                
                            </div>
                        </div>

                    </>
                )}

                {
                    items.map((elem, index) => {
                        return (
                            <div className='menu_item'>
                                {
                                    elem.editable ?
                                        <div className='editMenu'>
                                            <div className='editItems'>
                                                <div>
                                                    <TextField
                                                        type="text"
                                                        placeholder='Name'
                                                        // id="Item_price"
                                                        value={formData.Name}
                                                        onChange={(event) => {
                                                            setFormData((ele) => {
                                                                return { ...ele, Name: event.target.value }
                                                            })
                                                        }}
                                                        variant='outlined'
                                                        label='Name'
                                                    />
                                                    <TextField
                                                        type="number"
                                                        placeholder='Enter Item Price'
                                                        id="Item_price"
                                                        value={formData.Price}
                                                        onChange={(event) => {
                                                            setFormData((ele) => {
                                                                return { ...ele, Price: event.target.value }
                                                            })
                                                        }}
                                                        variant='outlined'
                                                        label='Item_price'
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        placeholder="Description"
                                                        minRows={2}
                                                        value={formData.Description}
                                                        onChange={(event) => {
                                                            setFormData((ele) => { return { ...ele, Description: event.target.value } })
                                                        }}
                                                        variant='outlined'
                                                        label='Description'
                                                        style={{ width: '530px' }}
                                                    />
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                <button className='btn btn-danger m-2' onClick={handleDiscard}>Discard</button>
                                                <button className='btn btn-success' onClick={() => handleSave(index)}>Save</button>
                                            </div>
                                        </div> :
                                        <div className='showItems'>
                                            <div>{elem.Name}</div>
                                            <div>{elem.Price}</div>
                                            <div>{elem.Description}</div>
                                            <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                                <button className='btn btn-secondary my-2'>
                                                    <EditIcon onClick={() => {
                                                        handleEdit(index)
                                                    }} />
                                                </button>
                                                <button className='btn btn-danger my-2'>
                                                    <DeleteIcon onClick={() => {
                                                        handleDelete(index)
                                                    }} />
                                                </button>
                                            </div>
                                        </div>
                                }
                            </div>
                        )
                    })
                }

                <div>
                    <button className='btn btn-success m-2' onClick={handleAddSave}>Save All Changes</button>&nbsp;
                    <button className='btn btn-danger m-2' onClick={discardAllChanges}>Discard All Changes</button>
                </div>
                {
                    isSaveAllClicked &&
                    <Alert severity="success">Saved all changes</Alert>
                }
            </div>
        </div>


    )
}

export default CuisineModel