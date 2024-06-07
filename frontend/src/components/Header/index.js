import {Link} from 'react-router-dom'
import './index.css'

const Header=()=>{
    return (
        <nav className='nav-container'>
            <h1 className='nav-h1'>UserManager</h1>
            <ul className='nav-ul'>
                <Link to="/" className='link-item'>
                    <li className='li-item'>Users</li>
                </Link>
                <Link to="/add-user" className='link-item'><li className='li-item'>Add User</li></Link>
            </ul>
        </nav>
    )
}

export default Header