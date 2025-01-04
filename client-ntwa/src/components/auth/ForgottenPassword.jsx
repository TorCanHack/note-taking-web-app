import AuthButton from "../shared/AuthButton";
import Email from "../shared/Email";
import Heading from "../shared/Heading";

const ForgottenPassword = () => {
    return (
        <section className="border border-black  w-375 px-6 md:w-522 lg:w-540 h-auto">
            <Heading title="Forgotten your password?" subtitle="Enter your email below, and we will send you a link to reset it" className="md:px-0"/>
            <div className="my-4"></div>
            <Email title="Email Address"  />
            <AuthButton>Send Reset Button</AuthButton>
            <div className="my-4"></div>
        </section>
    )

}

export default ForgottenPassword;