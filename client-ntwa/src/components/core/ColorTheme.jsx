import { useState } from 'react';
import { useTheme } from '../shared/useTheme';
import { useNavigate } from 'react-router-dom';
import sun_icon from '../../assets/images/icon-sun.svg';
import moon_icon from '../../assets/images/icon-moon.svg';
import system_icon from '../../assets/images/icon-system-theme.svg';
import arrow_left_icon from '../../assets/images/icon-arrow-left.svg';

const ColorTheme = () => {

    const {theme, setTheme} = useTheme()
    const navigate = useNavigate();

    const handleBackToSettings = () => {
        navigate('/settings')

    }

    return (
        <section className="w-375 bg-white rounded-t-lg pt-3 px-4 border border-black md:w-768 lg:w-950 min-h-620 ">
            <button onClick={handleBackToSettings}>
                <img src={arrow_left_icon} alt='arrow icon'/>
                Settings
            </button>
            <form>
                <label className='flex flex-row justify-between items-center h-72 w-full border border-black rounded-md px-3 my-3'>
                    <img src={sun_icon} alt='sun icon' className='h-10 w-10 rounded-xl border border-black'/>
                    <div className='flex flex-col'>
                        <span className='font-bold text-sm'>Light Mode</span>
                        <span className='text-xs'>Pick a clean and clasic light theme</span>
                    </div>
                    
                    <input type="radio" name='theme' value='light' checked={theme === 'light'} onChange={(e) => setTheme(e.target.value)}/>
                </label>

                <label className='flex flex-row justify-between items-center h-72 w-full border border-black rounded-md px-3 mb-3'>
                    <img src={moon_icon} alt='' className='h-10 w-10 rounded-xl border border-black'/>
                    <div className='flex flex-col'>
                        <span className='font-bold text-sm'>Dark Mode</span>
                        <span className='text-xs'>Select a sleek and dark modern skin</span>
                    </div>
                    
                    <input type="radio" name='theme' value='dark' checked={theme === 'dark'} onChange={(e) => setTheme(e.target.value)} />
                </label>

                <label className='flex flex-row justify-between items-center h-72 w-full border border-black rounded-md px-3 mb-3'>
                    <img src={system_icon} alt='' className='h-10 w-10 rounded-xl border border-black'/>
                    <div className='flex flex-col'>
                        <span className='font-bold text-sm'>System</span>
                        <span className='text-xs'>Adapt to your device system</span>
                    </div>
                    
                    <input type="radio" name='theme' value='system' checked={theme === 'system'} onChange={(e) => setTheme(e.target.value)}/>
                </label>
            </form>
        </section>
    )

}
export default ColorTheme;