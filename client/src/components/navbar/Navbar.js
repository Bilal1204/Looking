import { useContext } from "react"
import "./navbar.css"
import {Link} from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"


const Navbar = () => {

  const navigate = useNavigate()

  const {user, dispatch} = useContext(AuthContext)
  // console.log(user)
  return (
    <div className="navbar">
        <div className="navContainer">
        <Link to='/' style={{color:"inherit", textDecoration:"none"}}>
            <span className="logo">Looking</span>
          </Link>
           {user ?
           <>
            <div className="navItems">
                {user.details.username} 
                <button onClick={()=>{dispatch({type:"LOGOUT"})}} className="navButton">Logout</button>
            </div>
           </>
            : 
            <div className="navItems">
                <button onClick={()=>navigate('/register')} className="navButton">Register</button>
                <button onClick={()=>navigate('/login')} className="navButton">Login</button>
            </div>
            
            }
        </div>
    </div>
  )
}

export default Navbar