import { Link } from 'react-router-dom';

const Navber = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Activity Tracker</h1>
                </Link>
                <nav>
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