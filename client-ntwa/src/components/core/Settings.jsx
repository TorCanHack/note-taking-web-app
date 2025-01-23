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
import SettingsOptions from './SettingsOptions';




const Settings = ({setCreate}) => {

   
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
    const [isFontModalOpen, setIsFontModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

   
    
    
    return (
        <section className="w-375 bg-white rounded-t-lg pt-3 px-4 md:w-768 lg:w-full   "> { !isModalOpen ?
            <SettingsOptions/>

            : <div className='lg:hidden'> 
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