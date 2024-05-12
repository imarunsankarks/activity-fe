import {Link} from 'react-router-dom';

const Navber = () => {
    return ( 
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Activity Logs</h1>
                </Link>
            </div>
        </header>
     );
}
 
export default Navber;