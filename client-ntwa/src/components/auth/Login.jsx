import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthButton from '../shared/AuthButton'
import Email from '../shared/Email'
import GoogleLogin from '../shared/GoogleLogin'
import Heading from '../shared/Heading'
import Password from '../shared/Password'
import { authServices } from '../core/Api'
 
const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        Password: ''
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e, field) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value

        }));
        if (error) setError('')

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('')

        try {
            await authServices.login(formData)

            //if login is succesful navigate to  the login page
            navigate("/")
        } catch(error) {
            setError(error.message);
        } finally {
            setIsLoading(false)
        }

    }



    return (
        <section className="border border-black flex flex-col justify-center items-center w-375 px-6 md:w-522 lg:w-540 h-auto">
           <Heading title="Welcome to Note" subtitle="Please log in to continue"/>
                
            <form className='w-full my-8' onSubmit={handleSubmit}>
                <Email title="Email Address" value={formData.email} onChange={(e) => handleInputChange(e, 'email')}/>
                <Password maintext="Password" subtext="Forgot" value={formData.Password} onChange={(e) => handleInputChange(e, 'password')}/>
                <AuthButton>Login</AuthButton>
            </form>
            <GoogleLogin/>

            <p className='border-t border-black w-full pt-4 mb-4 text-center'>No account yet? sign up</p>

        </section>
    )

}

export default Login;