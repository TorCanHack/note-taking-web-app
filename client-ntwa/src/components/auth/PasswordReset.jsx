import AuthButton from "../shared/AuthButton"
import Heading from "../shared/Heading"
import Password from "../shared/Password"
import icon_info from '../../assets/images/icon-info.svg'

const PasswordReset = () => {

    return (
        <section className="border border-black  w-375 px-6 md:w-522 lg:w-540 h-auto">
            <Heading title="Reset Your Password" subtitle="Choose a new password to secure your account"/>
            <div className="mb-3"></div>
            <Password maintext="New Password"/>
            <div className="flex flex-row  items-center text-gray-500 -mt-6 mb-3">
                <img src={icon_info} alt="info icon" className="w-4 h-4"/>
                <p className="text-xs ml-2">At least 8 characters</p>

            </div>
            <Password maintext="Confirm New Password"/>
            <AuthButton>Reset Password</AuthButton>
            <div className="mb-5"></div>
        </section>
    )

}

export default PasswordReset