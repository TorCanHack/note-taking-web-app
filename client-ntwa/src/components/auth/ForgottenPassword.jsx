import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authServices } from "../core/Api";
import AuthButton from "../shared/AuthButton";
import Email from "../shared/Email";
import Heading from "../shared/Heading";
import { use } from "react";
import info_icon from '../../assets/images/icon-info-error.svg';
import ReactLoading from 'react-loading';

const ForgottenPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isEmailSent, setIsEmailSent] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        if (error) setError("")

    }
    const validateEmail = (email) => {
        
        if(!email) {
            setError("Please provide your email address");
            return false

        } else if (!/\S+@\S+\.\S+/.test(email)){
            setError("Please address a valid email address");
            return false
        }
        return true

    } 

    const handleFormSubmission = async (e) => {
        e.preventDefault()

        if(!validateEmail(email)) return;

        setIsLoading(true)
        

        try {
            const response = await authServices.requestPasswordReset(email)
            setIsEmailSent(true);
            setError('')
            setEmail("")
            if (response && response.resetToken){
                navigate(`/reset-password?token=${response.resetToken}`)
            } else {
                setError("failed")
            }
        } catch(error) {
            setError(error.message || "Failed to send reset email");

        } finally {
            setIsLoading(false)
        }
    }
    return (
        <section>
            {isEmailSent ? (<div>
                <Heading 
                        title="Check your email" 
                        subtitle="We've sent a password reset link to your email address"
                    />
                    <p className="mt-4 text-gray-600 text-sm px-2">
                        Didn&#39;t receive the email? Check your spam folder or
                        <button 
                            onClick={() => setIsEmailSent(false)}
                            className="text-blue-600 hover:underline ml-1"
                        >
                            try again
                        </button>
                    </p>
            </div>)
            :
            <form 
                className="  w-375 largePhone:410 px-6 md:w-522 lg:w-540 h-auto mt-32 bg-white rounded-2xl" 
                onSubmit={handleFormSubmission}
            >
                <Heading 
                    title="Forgotten your password?" 
                    subtitle="Enter your email below, and we will send you a link to reset it" className="md:px-0 text-center"
                />
                <div className="mb-5"></div>
                
                <Email 
                    title="Email Address" 
                    onChange={handleEmailChange} 
                    value={email} 
                    error={error} 
                />
                {error &&(<div className="flex flex-row text-sm text-red-500 -mt-4 mb-5">
                    <img 
                        src={info_icon} 
                        alt="info icon"
                        className="w-4 h-4 mr-2"/>
                    {error}
                </div>)}
                <AuthButton disabled={isLoading}>
                    {isLoading ?  
                        <div className="block mx-auto  w-20">
                            <ReactLoading 
                                type="bars" 
                                color="white" 
                                height={50} 
                                width={50} 
                            />
                        </div>  
                        :"Reset Password"
                    }
                </AuthButton>
                <div className="my-4 mb-6 h-5"></div>
            </form>}



        </section>
        
    )

}

export default ForgottenPassword;