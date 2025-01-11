import AuthButton from "../shared/AuthButton"
import Heading from "../shared/Heading"
import Password from "../shared/Password"
import icon_info from '../../assets/images/icon-info.svg'
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { authServices } from "../core/Api"

const PasswordReset = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');

    //get reset token from URL on component mount
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token")

        if (!token) {
            setGeneralError("invalid or expired token")
        }
    }, [location])

    const handleInputChange = (e, field) => {

        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }))

        if (error[field]){
            setError(prev => ({
                ...prev,
                [field]: ""
            }))
        } 

        if(generalError) setGeneralError("")
    }

    const validatePassword = (password) => {
        const newErrors = {};

         //password validation
         if(!password){
            newErrors.password = "Password is required"
            return false
        } else if (password.length < 8) {
            newErrors.password =  "Password must be at least 8 characters long";
            return false
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[/d])(?=.[@$!%*?&])/.test(password)) {
            newErrors.password = "Password must have at least one lowercase letter, uppercase letter, one number and one special character"
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match" 
            return false
        }

        setError(newErrors)
        return true
    }

    const handleFormSubmission = async (e) => {
        e.preventDefault();

        if (!validatePassword()) return;

        setIsLoading(true);
        setError("");

        try {

            const params = new URLSearchParams(location.search);
            const token = params.get("token")

            await authServices.resetPassword({
                token,
                newPassword: formData.password
            })

            navigate( "/login", {
                state: { message: "Password reset successful. Please log in with your password."}
            })

        } catch(error) {
            setGeneralError(error.message || "Failed to reset password")
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <form className="border border-black  w-375 px-6 md:w-522 lg:w-540 h-auto" onSubmit={handleFormSubmission}>
            <Heading title="Reset Your Password" subtitle="Choose a new password to secure your account"/>
            {generalError && (<div className="mb-3"> {generalError}</div>)}
            <Password maintext="New Password" value={formData.password} onChange={(e) => handleInputChange(e, "password")} error={error.password}/>
            <div className="flex flex-row  items-center text-gray-500 -mt-6 mb-3">
                <img src={icon_info} alt="info icon" className="w-4 h-4"/>
                <p className="text-xs ml-2">At least 8 characters</p>

            </div>
            <Password maintext="Confirm New Password" value={formData.confirmPassword} onChange={(e) => handleInputChange(e, "confirmPassword")} error={error.confirmPassword}/>
            <AuthButton>{isLoading? "Resetting password..." : "Reset Password"}</AuthButton>
            <div className="mb-5"></div>
        </form>
    )

}

export default PasswordReset