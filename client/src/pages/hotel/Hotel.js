import './hotel.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/mailList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { useContext, useState } from 'react'
import { SearchContext } from '../../context/searchContext'
import { AuthContext } from '../../context/AuthContext'
import Reserve from '../../components/reserve/Reserve'

const Hotel = () => {

  const navigate = useNavigate()
  const [openModal,setOpenModal] = useState(false)

  const {user} = useContext(AuthContext)
  const location = useLocation()
  const id = location.pathname.split("/")[2]


  const {data, loading, error} = useFetch(`/hotels/find/${id}`)

  const {dates,options} = useContext(SearchContext)
  
  const MILI_SECONDS_PER_DAY = 1000*60*60*24
  function dayDifference(date1, date2){
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILI_SECONDS_PER_DAY)
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate , dates[0].startDate);

  const handleClick = () =>{
    if(user){
      setOpenModal(true)
    }else{
      navigate('/login')
    }
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {
        loading ? "Loading" : 

        <div className="hotelContainer">
        <div className="hotelWrapper">
        <button className='bookNow'>Reserve or Book Now</button>
          <div className="hotelTitle">{data.name}</div>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot}/>
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">Excellent Location - {data.distance}m from center</span>
          <span className="hotelPriceHighlight">
            book a stay for ${data.cheapestPrice} and get a free taxi
          </span>
          <div className="hotelImages">
            {
              data.photos?.map(photo => 
                <div className="hotelImgWrapper">
                  <img src={photo.src} alt="" className="hotelImg" />
                </div>
              )
            }
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days} night stay</h1>
              <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto magnam, distinctio iste magni ab quod. Aspernatur accusantium eligendi soluta dicta?</span>
              <h2><b>${days * data.cheapestPrice * options.room}</b>({days} nights)</h2>
              <button onClick={handleClick}>Reserve or book now</button>
            </div>
          </div>
        </div>

            <MailList />

      </div>}
      {
        openModal && <Reserve setOpen = {setOpenModal} hotelId={id}/>
      }
    </div>
  )
}

export default Hotel