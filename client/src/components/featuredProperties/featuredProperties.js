import useFetch from '../../hooks/useFetch'
import './featuredProperties.css'

const FeaturedProperties = () => {

  const {data, loading, error} = useFetch("/hotels?featured=true")
  // data = Array.from(data);
  console.log(typeof(data))

  return (
    <div className='fp'>
        {loading ? "Loading" : 
        <>
        {
          data?.map((item,i) =>
        <div className="fpItem" key={i}>
        <img className='fpImg' src={item.photos[0]} alt="" />
        <span className="fpName">{item.name}</span>
        <span className="fpCity">{item.city}</span>
        <span className="fpPrice">Hotel starts from {item.cheapestPrice}</span>
       { 
        item.rating && <div className="fpRating">
            <button>{item.rating}</button>
            <span>Excellent</span>
        </div>
        }
        </div>
        )
        }
        </>
        }
    </div>
  )
}

export default FeaturedProperties