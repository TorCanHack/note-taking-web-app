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
import { useNote } from '../shared/useNote';




const Settings = () => {

   
    
    const {states} = useNote();
    const {isModalOpen, isThemeModalOpen, isFontModalOpen, isPasswordModalOpen, setCreate} = states

   
    
    
    return (
        <section className="w-375 bg-white rounded-t-lg pt-3 px-4 md:w-768 lg:w-full dark:bg-neutral-950 dark:text-white "> { !isModalOpen ?
            <SettingsOptions/>

            : <div className='lg:hidden'> 
            {isThemeModalOpen && <ColorTheme/>}
            {isFontModalOpen && <FontTheme/>}
            {isPasswordModalOpen && <ChangePassword/>}

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