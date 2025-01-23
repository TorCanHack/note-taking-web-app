import { useState } from "react";
import { passwordServices } from "../core/Api";
import Password from "../shared/Password";
import { useNavigate } from "react-router-dom";
import arrow_left_icon from '../../assets/images/icon-arrow-left.svg';

const ChangePassword = ({setIsPasswordModalOpen, setIsModalOpen}) => {

    const navigate = useNavigate();

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })
    const [error, setError] = useState("")

    const handleBackToSettings = () => {
        navigate('/settings')
        setIsPasswordModalOpen(false)
        setIsModalOpen(false)

    }

    const handlePassworInput = (e, field) => {
        setPasswordForm(prev => ({
            ...prev,
            [field]: e.target.value
        }))
        
    }

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setError('');

        if(passwordForm.newPassword !== passwordForm.confirmNewPassword) {
            setError("Passwords do not match")
        }

        try {
            await passwordServices.passwordChange(passwordForm.currentPassword, passwordForm.newPassword)

            setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: ""
            })

        } catch (error) {
            setError(error)
        }
    }
    return (
        <section className=" min-h-620 lg:w-full lg:px-8 lg:py-4 ">

            <button 
                onClick={handleBackToSettings} 
                className="flex flex-row items-center text-sm lg:hidden "
            >
                <img 
                    src={arrow_left_icon} 
                    alt='arrow icon' 
                    className="w-4 h-4"
                />
                Settings
            </button>

            <h1 
                className="font-bold text-2xl mb-4"
            >
                Change Password
            </h1>

            <form onSubmit={handlePasswordChange}>
                <Password 
                    maintext="Old Password" 
                    value={passwordForm.currentPassword} 
                    onChange={(e) => handlePassworInput(e, 'currentPassword')}
                />

                

                <Password 
                    maintext="New Password" 
                    value={passwordForm.newPassword} 
                    onChange={(e) => handlePassworInput(e, 'newPassword')}
                />

                <Password 
                    maintext="Confirm New Password" 
                    value={passwordForm.confirmNewPassword} 
                    onChange={(e) => handlePassworInput(e, 'confirmNewPassword')}
                />

                <div className=""></div>

                <button 
                    type="submit"
                    className="block w-132 h-10 text-sm text-white bg-blue-600  rounded-xl ml-auto"
                >
                    Save Password
                </button>

            </form>

        </section>
    )
}

export default ChangePassword;