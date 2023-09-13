import React from 'react'
import './Menu.css'


const Menu = ({ menu, updateMenuModel }) => {

    return (
        <div className="modal">
            <div className="modal-content" key={"modal"}>
                <button onClick={() => { updateMenuModel(false) }}>Close</button>
                {menu.menu.map((ele, ind) => {
                    return (
                        <div>
                            <h2>{ele.name}</h2>
                            {ele.items.map((elem, index) => {
                                return (
                                    <div>
                                        <pre>{elem.Name}        {elem.Price}          {elem.Description}
                                        </pre>
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