import google from '../../assets/images/icon-google.svg'

const GoogleLogin = () => {

    return (
        <div className='w-full mb-4 border-t border-black pt-3'>
            <p className='mb-4 text-sm text-gray-600 text-center'>Or log in with</p>

            <button className=' flex flex-row w-full justify-center items-center h-11 border border-black rounded-xl'>
                <img src={google} alt="" className='mr-2'/>
                Google
            </button>
    </div>
    )

}

export default GoogleLogin;