import LoginForm from "../components/LoginForm"
import { UserProvider } from '../context/UserContext';

export default function LoginPage() {
    return (
        <UserProvider>
        <div className= "min-h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: 'url("/images/background/login.png")', backgroundSize: 'cover', backgroundPosition: 'center'}}>      
            <LoginForm/>
        </div>
        </UserProvider>

       
    )
}