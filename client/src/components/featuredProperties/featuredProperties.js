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
        <img className='fpImg' src={"https://cf.bstatic.com/xdata/images/hotel/square600/187853972.webp?k=dd753431cf4b638642614dc060512d832d24f3249eef30b9a5f18601d2ac5635&o="} alt="" />
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