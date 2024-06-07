import {useState,useEffect,useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import UserCard from '../UserCard'
import Loader from '../Loader'
import './index.css'

const Users=()=>{
    const [usersList,setUsersList]=useState([])
    const [isApiSuccess,setApiStatus]=useState(true)
    const [isLoadig,setLoadingStatus]=useState(true)
    const [isSearchTriggered,setSearchTriggered]=useState(false)
    const [search,setSearch]=useState("")
    const [page,setPage]=useState(1)
    const navigate=useNavigate()

    

    const getAllUsers = useCallback(async (search, page) => {
        setLoadingStatus(true);
        try {
            const response = await axios.get(`http://localhost:3000/users?search=${search}&page=${page}`);
            if (response.status === 200) {
                const data = response.data;
                if (data.result.length >= 1) {
                    const details = data.result.map(eachOne => ({
                        id: eachOne.id,
                        dateOfBirth: eachOne.date_of_birth,
                        name: eachOne.name,
                        contactNumber: eachOne.contact_number,
                        emailId: eachOne.email_id,
                        userDiscription: eachOne.user_discription
                    }));
                    setUsersList(details);
                } else {
                    setUsersList([]);
                }
                setApiStatus(true);
            } else {
                setApiStatus(false);
            }
        } catch (error) {
            console.log(`error: ${error.message}`);
            setApiStatus(false);
        } finally {
            setLoadingStatus(false);
        }
    }, []);

    useEffect(() => {
        // Call getAllUsers on component mount and when the page changes
        getAllUsers(search, page);
    }, [page, getAllUsers]);

    useEffect(() => {
        if (isSearchTriggered) {
            getAllUsers(search, page);
            setSearchTriggered(false);
        }
    }, [isSearchTriggered, search, page, getAllUsers]);


    const onInputChange=(event)=>{
        setSearch(event.target.value)
    }

    const onSearchClick=()=>{
        setSearchTriggered(true)
    }

    const onNextButton=()=>{
        setPage(prevState=>(prevState+1))
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }

    const onPrevButton=()=>{
        setPage(prevState=>{
            if(prevState!==1){
                return prevState-1
            }
            return prevState
        })
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }

    const onAddUser=()=>{
        navigate('/add-user')
    }

    const renderList=()=>(
        <ul className='list-ul-container'>
            {usersList.map(eachOne=>(
                <UserCard key={eachOne.id} details={eachOne}/>
            ))}
        </ul>
    )

    const renderNoList=()=>(
        <div className='no-user-container'> 
            <img className='no-user' alt="no-userfound" src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1328.jpg?t=st=1717333004~exp=1717336604~hmac=fe7014f12bdc28ebc7888717948067a1e92a42a92b6c2071fef5bb9f8b942bd6&w=740"/>
            <h2 className='no-match-h'>No Match for Your Search</h2>
        </div>
    )



    const renderApiSuccessView=()=>(
        isLoadig ? <Loader/>:
        <div className='users-main-conatiner'>
            <div className='users-top-container'>
                <div className='search-container'>
                    <input onChange={onInputChange} value={search} className='search-input' type="search" placeholder='Enter User Name'/>
                    <button onClick={onSearchClick} className='search-button'>Search</button>
                </div>
                <button onClick={onAddUser} className='add-user-button'>Add User</button>
            </div>
            <div className='ul-btn-container'>
            {usersList.length>=1 ? (renderList()):renderNoList()}
            {usersList.length>=1 &&<div className='pages-container'>
                <button onClick={onPrevButton} className='button'>Previous Page</button>
                <p className='page'>{page}</p>
                {usersList.length>=20 && <button onClick={onNextButton} className='button'>Next Page</button>}
            </div>}
            </div>
        </div>
    )

    return (
        isApiSuccess && renderApiSuccessView()
    )
}

export default Users