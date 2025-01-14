import logout_icon from '../../assets/images/icon-logout.svg';
import lock_icon from '../../assets/images/icon-lock.svg';
import sun_icon from '../../assets/images/icon-sun.svg';
import font_icon from '../../assets/images/icon-font.svg'
import ColorTheme from './ColorTheme';
import FontTheme from './FontTheme';
import ChangePassword from '../auth/ChangePassword';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlusButton from '../shared/PlusButton';
import Navigation from '../shared/Navigation'
import PropTypes from 'prop-types';




const Settings = ({setCreate}) => {

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
    const [isFontModalOpen, setIsFontModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

   
    
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <section className="w-375 bg-white rounded-t-lg pt-3 px-4 md:w-768 lg:w-950  "> { !isModalOpen ?
            <div className='flex flex-col min-h-620'>
                <h1 className='font-bold text-2xl mb-7'>Settings</h1>

                <button className='flex flex-row justify-start items-center text-sm mb-5'onClick={() => (setIsModalOpen(true), setIsThemeModalOpen(true))}>
                    <img src={sun_icon} alt="sun icon"  className='mr-2'/>
                    Color Theme
                </button>

                <button className='flex flex-row justify-start items-center text-sm mb-5 'onClick={() => (setIsModalOpen(true), setIsFontModalOpen(true))} >
                    <img src={font_icon} alt="font icon" className='mr-2'/>
                    Font Theme
                </button>

                <button className='flex flex-row justify-start items-center text-sm mb-5 pb-4 border-b border-gray-400' onClick={() => (setIsModalOpen(true), setIsPasswordModalOpen(true))}>
                    <img src={lock_icon} alt="lock icon" className='mr-2'/>
                    Change Password
                </button>
                <button className='flex flex-row justify-start items-center text-sm mb-5 ' onClick={handleLogout}>
                    <img src={logout_icon} alt="logout icon" className='mr-2'/>
                    Lougout
                </button>

            </div>

            : <div> 
            {isThemeModalOpen && <ColorTheme setIsThemeModalOpen={setIsThemeModalOpen} setIsModalOpen={setIsModalOpen}/>}
            {isFontModalOpen && <FontTheme setIsFontModalOpen={setIsFontModalOpen} setIsModalOpen={setIsModalOpen}/>}
            {isPasswordModalOpen && <ChangePassword setIsPasswordModalOpen={setIsPasswordModalOpen} setIsModalOpen={setIsModalOpen}/>}

            </div>}

           {!isModalOpen && <PlusButton setCreate={setCreate}/>}
           <div className='mt-3'></div> 
           <Navigation/>
            
            
        </section>
    )

}

Settings.propTypes = {
    setCreate: PropTypes.func
}
export default Settings;