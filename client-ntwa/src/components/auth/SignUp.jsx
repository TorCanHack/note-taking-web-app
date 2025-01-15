import AuthButton from "../shared/AuthButton";
import Email from "../shared/Email";
import GoogleLogin from "../shared/GoogleLogin";
import Heading from "../shared/Heading"
import Password from "../shared/Password";
import { authServices } from "../core/Api";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import info_icon from '../../assets/images/icon-info-error.svg';
import ReactLoading from 'react-loading';
const SignUp = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState("")

    const handleInputChange = (e, field) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }))

        //clear errors when user starts typing
        if(errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }

        if(generalError) setGeneralError("");

        
    }

    //validation function
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

    //form submission handler 
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setGeneralError("");
        
        try {
            await authServices.signup(formData);
            //Automatically log in after succesful signup
            await authServices.login(formData);
            navigate('/');

        } catch(error) {
            setGeneralError(error.message || "an error occurred during signup");
        } finally {
            setIsLoading(false)
            
        }

    }

    return (
        <form className="  w-375 largePhone:w-410 px-6 md:w-522 lg:w-540 h-auto" onSubmit={handleSubmit}>
            <Heading title="Create Your Account" subtitle="Sign up to start organizing your notes and boost your productivity"/>
            <div className="mb-7">
                {generalError && <p>{generalError}</p>}
            </div>
            <Email 
                title="Email" 
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
            <AuthButton disabled={isLoading}>
                {isLoading?  
                    <div className="block mx-auto  w-20">
                        <ReactLoading 
                            type="bars" 
                            color="white" 
                            height={50} 
                            width={50} 
                        />
                    </div> 
                    : "sign up"
                }
            </AuthButton>
            <GoogleLogin/>
            <p className="text-sm text-center mb-2">
                <span className="mr-2 text-gray-500">Already have an account?</span> 
                <Link  to="/login" className="text-black">
                    <button>Login</button>
                </Link></p>
        </form>
    )

}

export default SignUp;