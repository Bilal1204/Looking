import useFetch from '../../hooks/useFetch'
import './featured.css'

const Featured = () => {

    const {data, loading, error} = useFetch("/hotels/countByCity?cities=Berlin,Madrid,London")
    
  return (
    <div className="featured">
    {loading ? "loading please wait " : 
     <>
        <div className="featuredItem">
            <img className='featuredImg' src="https://cf.bstatic.com/xdata/images/city/600x600/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o=" alt="" />
            <div className="featuredTitles">
                <h1>Berlin</h1>
                <h2>{data[0]} properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img className='featuredImg' src="https://cf.bstatic.com/xdata/images/city/600x600/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o=" alt="" />
            <div className="featuredTitles">
                <h1>Madrid</h1>
                <h2>{data[1]} properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img className='featuredImg' src="https://cf.bstatic.com/xdata/images/city/600x600/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o=" alt="" />
            <div className="featuredTitles">
                <h1>London</h1>
                <h2>{data[2]} properties</h2>
            </div>
        </div>
        </>
    }
    </div>
  )
}

export default Featured