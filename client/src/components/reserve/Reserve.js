import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './reserve.css'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'
import { useContext,useState } from 'react'
import { SearchContext } from '../../context/searchContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Reserve = ({setOpen, hotelId}) => {

    const navigate = useNavigate()

    const {data, loading, error} = useFetch(`/api/hotels/room/${hotelId}`)
    // data = Array.from(data);
    const [selectedRooms, setSelectedRooms] = useState([])
    const {dates} = useContext(SearchContext)

    const getDatesInRange = (startDate, endDate) =>{
        const start = new Date(startDate);
    const end = new Date(endDate);
        const date = new Date(start.getTime())
        let list = []
        while(date <= end){
            list.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }
        return list
    }

    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailaible = (roomNumber) =>{
        // console.log(roomNumber.unavailaibleDates)
        const isFound = roomNumber.unavailaibleDates.some((date) =>
            allDates.includes(new Date(date).getTime())
        )
        return !isFound
    } 

    const handleSelect = (e) =>{
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(
            checked ? [...selectedRooms, value] : 
            selectedRooms.filter((item) => item !== value)
        )
    }
    // console.log({selectedRooms})
    const handleClick = async () => {
        try {
          await Promise.all(
            selectedRooms?.map((roomId) => {
              const res = axios.put(`/api/rooms/availability/${roomId}`, {
                dates: allDates,
              });
              console.log(res)
              return res.data;
            })
          );
          setOpen(false);
          navigate("/");
        } catch (err) {}
      };

  return (
    <div className="reserve">
        <div className="rContainer">
            <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={()=>setOpen(false)}/>
            <span>Select your rooms:</span>
            {
                data?.map(item =>(
                    <div className="rItem">
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">
                            Max People: <b>{item.maxPeople}</b>
                            </div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        <div className="rSelectRooms">

                        {
                            item.roomNumbers?.map((roomNumber) =>
                                <div className="room">
                                <label>{roomNumber.number}</label>
                                <input type="checkbox" value={roomNumber._id} onChange={handleSelect}
                                    disabled={!isAvailaible(roomNumber)}
                                />
                                </div>
                            )
                        }
                        
                        </div>
                    </div>
                )
            )}
            <button onClick={handleClick} className="rButton">Reserve Now</button>
        </div>
    </div>
  )
}

export default Reserve