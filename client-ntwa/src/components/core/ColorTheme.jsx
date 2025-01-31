import { useTheme } from '../shared/useTheme';
import { useNavigate } from 'react-router-dom';
import sun_icon from '../../assets/images/icon-sun.svg';
import sun_icon_copy from '../../assets/images/icon-sun copy.svg';
import moon_icon from '../../assets/images/icon-moon.svg';
import moon_icon_copy from '../../assets/images/icon-moon copy.svg';
import system_icon from '../../assets/images/icon-system-theme.svg';
import system_icon_copy from '../../assets/images/icon-system-theme copy.svg';
import arrow_left_icon from '../../assets/images/icon-arrow-left.svg';
import arrow_left_icon_copy from '../../assets/images/icon-arrow-left copy.svg';
import { useNote } from '../shared/useNote';

const ColorTheme = () => {

    const {theme, setTheme} = useTheme();
    const {states} = useNote()
    const {setIsThemeModalOpen, setIsModalOpen} = states;
    const navigate = useNavigate();

    const handleBackToSettings = () => {
        navigate('/settings')
        setIsThemeModalOpen(false)
        setIsModalOpen(false)

    }

    return (
        <section className=" min-h-620 lg:w-full lg:px-6  ">
            <button onClick={handleBackToSettings} className="flex flex-row items-center text-sm text-gray-700 dark:text-white lg:hidden">
                {theme === 'light' ? <img src={arrow_left_icon} alt='arrow icon' className='h-5 w-5'/> : <img src={arrow_left_icon_copy} alt='arrow icon' className='h-5 w-5'/> }
                Settings
            </button>
            <form>
                <label className='flex flex-row justify-between items-center h-72 w-full border border-black rounded-md px-3 my-3 dark:border-white'>
                    {theme === 'light' ? <img src={sun_icon} alt='sun icon' className='h-10 w-10 rounded-xl border border-black'/> : <img src={sun_icon_copy} alt='sun icon' className='h-10 w-10 rounded-xl border border-white'/>}
                    <div className='flex flex-col w-56'>
                        <span className='font-bold text-sm'>Light Mode</span>
                        <span className='text-xs'>Pick a clean and clasic light theme</span>
                    </div>
                    
                    <input type="radio" name='theme' value='light' checked={theme === 'light'} onChange={(e) => setTheme(e.target.value)}/>
                </label>

                <label className='flex flex-row justify-between items-center h-72 w-full border border-black rounded-md px-3 mb-3 dark:border-white'>
                    {theme === 'light' ?<img src={moon_icon} alt='' className='h-10 w-10 rounded-xl border border-black'/> : <img src={moon_icon_copy} alt='' className='h-10 w-10 rounded-xl border border-white'/>}
                    <div className='flex flex-col w-56'>
                        <span className='font-bold text-sm'>Dark Mode</span>
                        <span className='text-xs'>Select a sleek and dark modern skin</span>
                    </div>
                    
                    <input type="radio" name='theme' value='dark' checked={theme === 'dark'} onChange={(e) => setTheme(e.target.value)} />
                </label>

                <label className='flex flex-row justify-between items-center h-72 w-full border border-black rounded-md px-3 mb-3 dark:border-white'>
                    {theme === 'light' ? <img src={system_icon} alt='' className='h-10 w-10 rounded-xl border border-black'/> : <img src={system_icon_copy} alt='' className='h-10 w-10 rounded-xl border border-white'/>}
                    <div className='flex flex-col w-56'>
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