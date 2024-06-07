import{ useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'

const EditUser=(props)=>{
    const {id}=props
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        contactNumber: '',
        emailId: '',
        userDiscription: ''
    });
    const [error,setError]=useState("")
    const [success,setSuccessMsg]=useState("")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSuccessMsg("")
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

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
                setFormData(newData)
            }else{
                console.log("error")
            }
        }catch(e){
            console.log(e.message)
        }
    }

    useEffect(()=>{
        getUserDetails()
    },[])



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!/^\d{10}$/.test(formData.contactNumber)) {
            setError('Contact number must be 10 digits');
        } else {
            try {
                const response = await axios.put(`http://localhost:3000/edit-user/${id}`, formData);
                const data= await response.data
                setSuccessMsg(data);
            } catch (error) {
                console.error('Error adding user:', error.message);
            }
            setError('');
        }
    };


    return (
        <div className='edit-main-container'>
            <div className='form-edit-container'>
                <h2 className='heading'>Add User</h2>
                <form onSubmit={handleSubmit}>
                    <div className='sub-form-container'>
                        <label className='label-element' htmlFor="name">Name</label>
                        <input className='input-element' type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className='sub-form-container'>
                        <label className='label-element' htmlFor="dateOfBirth">Date of Birth</label>
                        <input className='input-element' type="date" id="dateOfBirth" name="dateOfBirth" placeholder={formData.dateOfBirth} value={formData.dateOfBirth} onChange={handleChange} />
                    </div>
                    <div className='sub-form-container'>
                        <label className='label-element' htmlFor="contactNumber">Contact Number</label>
                        <input className='input-element' type="text" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
                    </div>
                    <div className='sub-form-container'>
                        <label className='label-element' htmlFor="emailId">Email ID</label>
                        <input className='input-element' type="email" id="emailId" name="emailId" value={formData.emailId} onChange={handleChange} />
                    </div>
                    <div className='sub-form-container'>
                        <label className='label-element' htmlFor="userDescription">User Description</label>
                        <textarea className='input-element' id="userDescription" name="userDiscription" value={formData.userDiscription} onChange={handleChange} />
                    </div>
                    {error.length!=='' && <p className='error'>{error}</p> }
                    <button className='save-button' type="submit">Save</button>
                </form>
                {success!=="" && <p className='successMsg'>{success}</p>}
            </div>
        </div>
    )
}

export default EditUser
