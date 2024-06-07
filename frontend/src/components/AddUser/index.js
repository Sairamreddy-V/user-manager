import{ useState } from 'react';
import axios from 'axios';
import './index.css'

const AddUser=()=>{
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!/^\d{10}$/.test(formData.contactNumber)) {
            setError('Contact number must be 10 digits');
        } else {
            try {
                const response = await axios.post('http://localhost:3000/user', formData);
                const data= await response.data
                setSuccessMsg(data);
            } catch (error) {
                console.error('Error adding user:', error.message);
            }
            setError('');
        }
    };


    return (
        <div className='main-container'>
            <img className='add-user-image' alt="add-user" src="https://img.freepik.com/free-vector/app-development-concept-with-flat-deisng_23-2147852845.jpg?t=st=1717336466~exp=1717340066~hmac=aa81960f95c5c44271b9769f2cb169a56d9ba6062d2463fdfff1c662286513d8&w=740"/>
        <div className='form-container'>
            <h2 className='heading'>Add User</h2>
            <form onSubmit={handleSubmit}>
                <div className='sub-form-container'>
                    <label className='label-element' htmlFor="name">Name</label>
                    <input className='input-element' type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className='sub-form-container'>
                    <label className='label-element' htmlFor="dateOfBirth">Date of Birth</label>
                    <input className='input-element' type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
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
                <button className='add-button' type="submit">Add</button>
            </form>
            {success!=="" && <p className='successMsg'>{success}</p>}
        </div>
        </div>
    )
}

export default AddUser
