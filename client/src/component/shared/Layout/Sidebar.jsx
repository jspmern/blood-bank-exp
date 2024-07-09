import React from 'react'
import { userMenu } from './Menus/userMenu'
import { NavLink } from 'react-router-dom'

function Sidebar() {
    return (
        <>
            {
                userMenu.map((item) => {
                    return (
                        <div>
                            <i className={item.icon}></i>
                            <NavLink to={item.path}>{item.name}</NavLink>
                        </div>
                    )
                })
            }</>

    )
}

export default Sidebar