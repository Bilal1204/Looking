import useFetch from '../../hooks/useFetch'
import './propertyList.css'

const PropertyList = () => {

    const {data, loading, error} = useFetch("/api/hotels/countByType")

    const images = [
        "https://cf.bstatic.com/xdata/images/city/600x600/684534.jpg?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o=",
        "https://cf.bstatic.com/xdata/images/city/600x600/684534.jpg?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o=",
        "https://cf.bstatic.com/xdata/images/city/600x600/684534.jpg?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o=",
        "https://cf.bstatic.com/xdata/images/city/600x600/684534.jpg?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o=",
        "https://cf.bstatic.com/xdata/images/city/600x600/684534.jpg?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o="
    ]
    
  return (
    <div className="pList">
    { loading ? "loading" : 
     <>
     {
    data && images.map((img, i) => (
        <div className="pListItem" key={i}>
            <img src= {img} alt="" className="pListImg" />
            <div className="pListTitles">
                <h1>{data[i]?.type}</h1>
                <h2>{data[i]?.count} {data[i]?.type} </h2>
            </div>
        </div>
    ))
     } 
        </>
    }
    </div>
  )
}

export default PropertyList