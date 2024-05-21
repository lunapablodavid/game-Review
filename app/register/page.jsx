import RegisterForm from "../components/RegisterForm"

export default function RegisterPage() {
    return (
        
        <div className= "min-h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: 'url("/images/background/login.png")' }}>      
            <RegisterForm/>
        </div>
       
    )
}