import React from 'react'
import './Menu.css'


const Menu = ({ menu, updateMenuModel }) => {

    return (
        <div className="modal">
            <div className="modal-content" key={"modal"}>
                <button onClick={() => { updateMenuModel(false) }}>Close</button>
                {menu.menu.map((ele, ind) => {
                    return (
                        <div className='cuisine_container'>
                            <h2>{ele.name}</h2>
                            <div className='item_container_title'>
                                <div><b>Item Name</b></div>
                                <div><b>Price</b></div>
                                <div><b>Description</b></div>
                            </div>
                            {ele.items.map((elem, index) => {
                                return (
                                    <div className='item_container'>
                                        <div>{elem.Name} </div>
                                        <div>{elem.Price}</div>
                                        <div>{elem.Description}</div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Menu