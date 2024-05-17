import { Link } from 'react-router-dom';
import {useLogout} from '../hooks/useLogout';

const Navber = () => {
    const {logout} = useLogout()
    const handleClick = ()=>{
        logout();
    }
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Activity Tracker</h1>
                </Link>
                <nav>
                    <div className="">
                        <button onClick={handleClick}>Logout</button>
                    </div>
                    <div className="">
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Navber;