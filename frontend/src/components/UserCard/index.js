import {Link} from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";

import './index.css'

const UserCard=(props)=>{
    const {details}=props
    const {id,name,contactNumber}=details 
    return(
        <Link to={`/user-details/${id}`} className='link-el'>
            <li className='li-container'>
                <div className='name-container'>
                    <FaRegUserCircle className="icon"/>
                    <h2 className='name'>{name}</h2>
                </div>
                <p className='contact-num'>Contact: {contactNumber}</p>
            </li>
        </Link>
    )
}

export default UserCard