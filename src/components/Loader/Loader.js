
import './Loader.scss'
import Loader from '../../Assets/Images/loader.gif'

const Header = () => {
  return (
    <div className="loader-container"> 
        <img alt="loader" src={Loader} />
    </div> 
  )
  
}

export default Header;
