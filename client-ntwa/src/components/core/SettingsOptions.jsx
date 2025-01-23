import logout_icon from '../../assets/images/icon-logout.svg';
import lock_icon from '../../assets/images/icon-lock.svg';
import sun_icon from '../../assets/images/icon-sun.svg';
import font_icon from '../../assets/images/icon-font.svg'
import { useNote } from '../shared/useNote';
import { useNavigate } from 'react-router-dom';


const SettingsOptions = () => {

    const navigate = useNavigate();
    const {states} = useNote()
    const {setIsModalOpen, setIsPasswordModalOpen, setIsFontModalOpen, setIsThemeModalOpen} = states;

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className='flex flex-col min-h-620 md:min-h-1024 lg:min-h-full'>
        <h1 className='font-bold text-2xl mb-7 lg:hidden'>Settings</h1>

        <button className='flex flex-row justify-start items-center text-sm mb-5 md:mb-8'onClick={() => (setIsModalOpen(true), setIsThemeModalOpen(true), setIsFontModalOpen(false), setIsPasswordModalOpen(false))}>
            <img src={sun_icon} alt="sun icon"  className='mr-2'/>
            Color Theme
        </button>

        <button className='flex flex-row justify-start items-center text-sm mb-5 md:mb-8 'onClick={() => (setIsModalOpen(true), setIsFontModalOpen(true), setIsThemeModalOpen(false), setIsPasswordModalOpen(false))} >
            <img src={font_icon} alt="font icon" className='mr-2'/>
            Font Theme
        </button>

        <button className='flex flex-row justify-start items-center text-sm mb-5 md:mb-8 pb-4 border-b border-gray-400' onClick={() => (setIsModalOpen(true), setIsPasswordModalOpen(true), setIsFontModalOpen(false), setIsThemeModalOpen(false))}>
            <img src={lock_icon} alt="lock icon" className='mr-2'/>
            Change Password
        </button>
        <button className='flex flex-row justify-start items-center text-sm mb-5 ' onClick={handleLogout}>
            <img src={logout_icon} alt="logout icon" className='mr-2'/>
            Logout
        </button>

    </div>
    )

}

export default SettingsOptions