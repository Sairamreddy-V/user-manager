import {useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios'
import Loader from '../Loader'
import { FaRegUserCircle } from "react-icons/fa";
import Popup from 'reactjs-popup'
import EditUser from '../EditUser'
import './index.css'

const UserDetails=()=>{
    const [userDetails,setUserDetails]=useState({})
    const [isLoading,setLoadingStatus]=useState(true)
    const [apiStatus,setApiStatus]=useState(true)
    const [deleteMsg,setDeleteMsg]=useState("")
    const [closeButton,setButton]=useState(false)
    const navigate=useNavigate()
    const {id}=useParams()
    console.log(id)

    const getUserDetails=async()=>{
        try{
            const response=await axios.get(`http://localhost:3000/user/${id}`)
            if(response.status===200){
                const data= await response.data 
                const newData={
                    name:data.result.name,
                    dateOfBirth:data.result.date_of_birth,
                    contactNumber:data.result.contact_number,
                    emailId:data.result.email_id,
                    userDiscription:data.result.user_discription
                }
                setUserDetails(newData)
                console.log(data)
                setLoadingStatus(false)
            }else{
                setApiStatus(false)
            }
        }catch(e){
            setApiStatus(false)
            console.log(e.message)
        }
    }

    useEffect(()=>{
        setLoadingStatus(true)
        getUserDetails()
    },[])

    useEffect(()=>{
        setLoadingStatus(true)
        getUserDetails()
    },[closeButton])



    const onDeleteClick= async ()=>{
        try{
            const resposne= await axios.delete(`http://localhost:3000/delete-user/${id}`)
            if(resposne.status===200){
                const data=resposne.data 
                setTimeout(() => {
                    navigate('/')
                    console.log('navigated to home')
                }, 500);
                setDeleteMsg(data)
            }
        }catch(e){
            setDeleteMsg('')
            console.log(e.message)
        }
    }

    const onCloseButton=()=>{
        setButton(prevState=>(!prevState))
    }

    const renderApiSuccessView=()=>(
        isLoading ? <Loader/> :
        (
            <div className='user-details-mainpage-container'>
                <div className='details-card-container'>
                    <div className='profile-details-container'>
                        <FaRegUserCircle className='profile-icon'/>
                        <div className='details-contaier'>
                            <p className='name'>Name : {userDetails.name}</p>
                            <p className='remaing-para'>Date of Birth : {userDetails.dateOfBirth}</p>
                            <p className='remaing-para'>Contact : {userDetails.contactNumber}</p>
                            <p className='remaing-para'>Email Id : {userDetails.emailId}</p>
                        </div>
                    </div>
                    <div className='description-container'>
                        <h1 className='description-h'>Description</h1>
                        <p className='description'>{userDetails.userDiscription}</p>
                    </div>
                </div>
                <div className='button-container'>
                <Popup
                    modal
                    trigger={
                        <button className='edit-button' type="button">Edit</button>
                    }
                >
                    {close => (
                    <div className='popup-container'>
                        <button
                        type="button"
                        className="trigger-button"
                        onClick={() => {
                            close();
                            onCloseButton();
                        }}
                        >
                        Close
                        </button>
                        <EditUser id={id}/>
                    </div>
                    )}
                </Popup>
                    <button onClick={onDeleteClick} className='delete-button'>Delete</button>
                </div>
                { deleteMsg!=="" && <p className='delete-msg'>{deleteMsg}</p>}
            </div>
        )
    )


    return (
        apiStatus && renderApiSuccessView()
    )
}



export default UserDetails