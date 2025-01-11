import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authServices } from "../core/Api";
import AuthButton from "../shared/AuthButton";
import Email from "../shared/Email";
import Heading from "../shared/Heading";
import { use } from "react";

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

        } else if (/\S+@\S+\.\S+/.test(email)){
            setError("Please address a valid email address");
            return false
        }
        return true

    } 

    const handleFormSubmission = async (e) => {
        e.prevenDefault()

        if(!validateEmail(email)) return;

        setIsLoading(true)
        setError('')

        try {
            await authServices.requestPasswordReset(email)
            setIsEmailSent(true);
            setEmail("")
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
                    <p className="mt-4 text-gray-600">
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
            <form className="border border-black  w-375 px-6 md:w-522 lg:w-540 h-auto" onSubmit={handleFormSubmission}>
                <Heading title="Forgotten your password?" subtitle="Enter your email below, and we will send you a link to reset it" className="md:px-0"/>
                {error &&(<div className="my-4">{error}</div>)}
                <Email title="Email Address" onChange={handleEmailChange} value={email} error={error} />
                <AuthButton disabled={isLoading}>{isLoading? "sending..." :"Send Reset Button"}</AuthButton>
                <div className="my-4"></div>
            </form>}



        </section>
        
    )

}

export default ForgottenPassword;