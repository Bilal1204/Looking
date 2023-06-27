import "./maillist.css"

const MailList = () => {
  return (
    <div className="mail">
        <h1 className="mailTitle">Save Time, Save Money</h1>
        <span>Subscribe and we will send the best deals to you</span>
        <div className="mailInputContainer">
            <input type="text" placeholder="Your Email"/>
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default MailList