import React, { useState, useEffect } from 'react'

const CuisineModel = (prop) => {
    let name = prop.name
    let menu_items = prop.items
    const [items, setItems] = useState(menu_items)
    console.log(items);
    const [showAddForm, setShowAddForm] = useState(false);
    const [disable, setDisable] = useState(false);
    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState({ Name: '', Price: '', Description: '' });
    const handleCuisineModel = () => {
        prop.updateCuisineModel(null);
    };

    useEffect(() => {
        fetchData();
    }, [])
    async function fetchData() {
        const data = menu_items.map((element, index) => {
            return {
                id: index,
                Name: element.Name,
                Price: element.Price,
                Description: element.Description,
                editable: false
            }
        })
        setItems(data)
    }
    const handleEdit = (id) => {

        console.log(id)
        const updatedList = items.map((element) => {
            if (id == element.id) {
                const item_data = {
                    Name: element.Name,
                    Price: element.Price,
                    Description: element.Description
                }
                setFormData(item_data)
                return { ...element, editable: true }
            }
            return { ...element, editable: false }
        })
        setItems(updatedList)
    };

    const handleSave = (id) => {
        console.log(id)

        const updatedList = items.map((element) => {
            if (id == element.id) {
                console.log("formdata", formData)
                return { Name: formData.Name, Price: formData.Price, Description: formData.Description, editable: false, id: element.id }
            }
            return { ...element, editable: false, id: element.id }
        })
        setItems(updatedList)

        console.log("items")
    };

    const handleDiscard = () => {

        const updatedList = items.map((element) => {

            return { ...element, editable: false }
        })
        setItems(updatedList)

    }

    const handleChange = (id, newName) => {

    };

    const handlAddNewManagementType = (event) => {
        if (event.keyCode === 13) {

        }
    }

    const handleAddManagementType = () => {

        setDisable(true);
        setShowAddForm(true);

    }

    const handleAddSave = async () => {

        setDisable(false);

        setShowAddForm(false);

    };
    const handleAddDiscard = () => {

        setDisable(false);
        setShowAddForm(false);
    };

    const handleKeyPress = (event, id) => {


    }


    return (
        <div className="modal">
            <div className="modal-content" key={"modal"}>
                <div className="row1">
                    <div>Management Type</div>
                    <div onClick={handleAddManagementType} className='add'>+Add
                        <span className="close" onClick={handleCuisineModel}>
                            <img src="/images/close.svg" className="close" />

                        </span></div>
                </div>

                {showAddForm && (
                    <div className='managementType_row' key={"1"} >
                        <div className="managementType" >
                            <input
                                autoFocus
                                type="text"
                                value={newManagementType}
                                className='input'
                                onChange={(e) => setNewManagementType(e.target.value)}
                                onKeyDown={(e) => { handlAddNewManagementType(e) }}
                            />
                        </div>
                        <>

                            <img src=".././images/save.svg" onClick={() => handleAddSave()} />
                            <img src=".././images/discard.svg" onClick={() => handleAddDiscard()} />
                        </>
                    </div>
                )}

                {
                    items.map((elem, index) => {
                        return (
                            <div className='menu_item'>
                                {
                                    elem.editable ? <div>
                                        <div>
                                            <div>
                                                Name:<input placeholder='Name' value={formData.Name} onChange={(event) => {
                                                    setFormData((ele) => {
                                                        return { ...ele, Name: event.target.value }
                                                    })
                                                }
                                                } />
                                            </div>
                                            <div>
                                                Price: <input placeholder='Price' value={formData.Price} onChange={(event) => {
                                                    setFormData((ele) => {
                                                        return { ...ele, Price: event.target.value }
                                                    })
                                                }
                                                } />
                                            </div>
                                            <div>
                                                Description: <input placeholder='Description' value={formData.Description} onChange={(event) => {
                                                    setFormData((ele) => {
                                                        return { ...ele, Description: event.target.value }
                                                    })
                                                }
                                                } />
                                            </div>
                                        </div>
                                        <div>
                                            <button className='btn btn-primary' onClick={handleDiscard}>Discard</button>
                                            <button className='btn btn-primary' onClick={() => handleSave(index)}>Save</button>
                                        </div>
                                    </div> :
                                        <div>
                                            <div>
                                                {elem.Name}
                                                {elem.Price}<br />
                                                {elem.Description}
                                            </div>
                                            <div>
                                                <button className='btn btn-primary' onClick={() => {
                                                    handleEdit(index)
                                                }}>Edit</button><br />
                                            </div>
                                        </div>
                                }
                            </div>
                        )
                    })
                }


            </div>
        </div>


    )
}

export default CuisineModel