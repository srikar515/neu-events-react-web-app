import { Link } from "react-router-dom";
import "./Navbar.css";
function Nav() {
 return (
   <nav>
    <div className="logo-image-container">
        <img src="images/NULogo.png"></img>
    </div>
    <h2 className="title">Welcome to NEU events</h2>
    <ul className="login-pages">
        <li>
          <Link className="nav-link" to="/signup">SignUp</Link>
        </li>
        <li>
            <Link className="nav-link" to="/login">Login</Link>
        </li>
    </ul>
   </nav>
 );
}
export default Nav;