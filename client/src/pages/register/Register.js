import { useContext, useState } from 'react'
import './register.css'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        username : undefined,
        email : undefined,
        password : undefined
    })

    const handleChange = (e) =>{
        setCredentials((prev) => ({...prev, [e.target.id] : e.target.value}))
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post('/auth/register',credentials)
            console.log(res)
            // if(res.status() === 200){
                navigate('/login')
            // }
        } catch (error) {
            <h1>{error}</h1>
        }
    }

    
  return (
    <div className="login">
        <div className="lContainer">
            <input type="text" placeholder='username' id='username' onChange={handleChange} className='lInput'/> 
             <input type="text" placeholder='email' id='email' onChange={handleChange} className='lInput'/> 
            <input type="password" placeholder='password' id='password' onChange={handleChange} className='lInput'/>
            <button onClick={handleClick} className="lButton">Register</button>
        </div>
    </div>
  )
}

export default Register