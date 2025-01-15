import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import AuthButton from '../shared/AuthButton'
import Email from '../shared/Email'
import GoogleLogin from '../shared/GoogleLogin'
import Heading from '../shared/Heading'
import Password from '../shared/Password'
import { authServices } from '../core/Api'
import ReactLoading from "react-loading"
import info_icon from '../../assets/images/icon-info-error.svg';
 
const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const [generalError, setGeneralError] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e, field) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value

        }));
        if (errors) setErrors({
            email: '',
            password: ''
        })

    }
    const validateForm = () => {
        const newErrors = {};

        //email validation
        if(!formData.email){
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid Email address"
        }

        //password validation
        if(!formData.password){
            newErrors.password = "Password is required"
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long"
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.[@$!%*?&])/.test(formData.password)) {
            newErrors.password = "Password must have at least one lowercase letter, uppercase letter, one number and one special character"
        }
        setErrors(newErrors)
        
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        

        if (!validateForm()) return;
        setIsLoading(true);

        try {
            
            await authServices.login(formData)
           
            //if login is succesful navigate to  the login page
            navigate("/")
        } catch(error) {
            setGeneralError(error.message);
        } finally {
            setIsLoading(false)
        }

    }



    return (
        <section className=" flex flex-col justify-center items-center w-375 px-6 md:w-522 lg:w-540 h-auto">
           <Heading 
                title="Welcome to Note" 
                subtitle="Please log in to continue"
            />
                
            <form className='w-full my-8' onSubmit={handleSubmit}>
                <Email 
                    title="Email Address" 
                    value={formData.email} 
                    onChange={(e) => handleInputChange(e, 'email')}
                    error={errors.email}
                />
                {errors.email && <p className='flex flex-row text-red-500 text-xs -mt-4 mb-4'>
                    <img 
                        src={info_icon}
                        alt='info icon'
                        className='h-4 w-4 '
                    />
                    {errors.email}
                </p>}
                <Password 
                    maintext="Password" 
                    subtext="Forgot" 
                    value={formData.password} 
                    onChange={(e) => handleInputChange(e, 'password')}
                    error={errors.password}
                />
                {errors.password && <p className='flex flex-row text-red-500 text-xs -mt-8 mb-4'>
                    <img 
                        src={info_icon}
                        alt='info icon'
                        className='h-4 w-4 '
                    />
                    {errors.password}
                </p>}
                <AuthButton>
                    { isLoading ? 
                        <div className="block mx-auto  w-20">
                            <ReactLoading 
                                type="bars" 
                                color="white" 
                                height={50} 
                                width={50} 
                            />
                        </div>
                        : 'Login'
                    }
                </AuthButton>
            </form>
            <GoogleLogin/>

            <p className='border-t text-sm border-black w-full pt-4 mb-4 text-center'>
                <span className='mr-2 text-gray-500'>
                    No account yet?
                </span>
                <Link to="/signup">
                    <button>Sign up</button>
                </Link>
            </p>

        </section>
    )

}

export default Login;