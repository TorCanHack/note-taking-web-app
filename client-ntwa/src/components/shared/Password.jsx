import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import icon_hide_password from '../../assets/images/icon-hide-password.svg' 
import icon_hide_password_dark from '../../assets/images/icon-hide-password copy.svg' 
import icon_show_password from '../../assets/images/icon-show-password.svg'
import icon_show_password_dark from '../../assets/images/icon-show-password copy.svg'
import { useState } from 'react';
import { useTheme } from './useTheme';

const Password = ({ maintext, subtext, value, onChange, error }) => {

    const {theme} = useTheme()
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }

    return (
        <label >
            <span className=' block text-left text-sm '>
                {maintext} 
                <Link to="/forgot-password"><button className='relative left-56 text-xs underline md:left-82'>
                    {subtext}
                </button></Link>
            </span>
            <input 
                type={showPassword? 'text' : 'password'} 
                className={`w-full h-10 border border-black rounded-xl dark:bg-neutral-950 dark:text-white dark:border-white ${error ? 'border border-red-500' : ''}`} 
                value={value} 
                onChange={onChange}
            />
            <button type='button' onClick={togglePasswordVisibility} className='relative bottom-8 left-72 md:left-97'>
                {showPassword ? 
                    (theme === 'light' ? <img src={icon_hide_password} alt='hide password'/> : <img src={icon_hide_password_dark} alt='hide password'/>)
                    : (theme === 'light' ? <img src={icon_show_password} alt='show password'/> : <img src={icon_show_password_dark} alt='show password'/>)
                } 
        
            </button>
                            
        </label>
    )

}

Password.propTypes = {
    maintext: PropTypes.node.isRequired,
    subtext: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string

    
}

export default Password;