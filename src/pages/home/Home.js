import Featured from "../../components/featured/Featured"
import FeaturedProperties from "../../components/featuredProperties/featuredProperties"
import Header from "../../components/header/Header"
import MailList from "../../components/mailList/mailList"
import Navbar from "../../components/navbar/Navbar"
import PropertyList from "../../components/propertyList/propertyList"
import "./home.css"


const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by Property Type</h1>
        <PropertyList />
        <h1 className="homeTitle">Home Guests Love</h1>
        <FeaturedProperties />
        <MailList/>
      </div>
    </div>
  )
}

export default Home