//import LoginForm from "./loginComponent";
import '../css/Connection.css'
import RegistrationForm from "../Components/RegisterComponent";
import { Link } from "react-router-dom";


const Connection = () => {
    return(
        <div className="container">
            <div className="card">
                <h3>Inscription </h3>
                    <RegistrationForm/>

                <Link className="alreadyAccount" to='/login'>Deja un compte ?</Link>

            </div>    
        </div>
    )
}

export default Connection;