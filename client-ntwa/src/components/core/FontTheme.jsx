import { useTheme } from '../shared/useTheme';
import { useNavigate } from 'react-router-dom';
import monospace_icon from '../../assets/images/icon-font-monospace.svg';
import monospace_icon_dark from '../../assets/images/icon-font-monospace copy.svg';
import sansserif_icon from '../../assets/images/icon-font-sans-serif.svg';
import sansserif_icon_dark from '../../assets/images/icon-font-sans-serif copy.svg';
import serif_icon from '../../assets/images/icon-font-serif.svg';
import serif_icon_dark from '../../assets/images/icon-font-serif copy.svg';
import arrow_left_icon from '../../assets/images/icon-arrow-left.svg';
import { useNote } from '../shared/useNote';
import arrow_left_icon_dark from '../../assets/images/icon-arrow-left copy.svg';


const FontTheme = () => {

    const {font, setFont, theme} = useTheme()
    const {states} = useNote();
    const {setIsFontModalOpen, setIsModalOpen} = states
    const navigate = useNavigate();

    const handleBackToSettings = () => {
        navigate('/settings')
        setIsFontModalOpen(false)
        setIsModalOpen(false)

    }

    return (
        <section className=" min-h-620 lg:w-full lg:px-6 ">
            <button 
                onClick={handleBackToSettings} 
                className="flex flex-row text-sm items-center lg:hidden "
            >
                {theme === 'light' ? <img src={arrow_left_icon} alt='arrow icon' className='h-5 w-5'/> : <img src={arrow_left_icon_dark} alt='arrow icon' className='h-5 w-5'/> }
                Settings
            </button>

            <form>
                <label 
                    className='flex flex-row justify-between items-center h-72 w-full border border-black rounded-md px-3 my-6 dark:border-white '
                >
                    {theme === 'light' ? 
                    <img 
                        src={sansserif_icon} 
                        alt='font icon' 
                        className='h-10 w-10 rounded-xl border border-black'
                    /> : 
                    <img 
                        src={sansserif_icon_dark} 
                        alt='font icon' 
                        className='h-10 w-10 rounded-xl border border-black'
                    />}

                    <div className='flex flex-col w-56'>
                        <span className='font-bold text-sm'>
                            Sans-Serif
                        </span>
                        <span className='text-xs'>Clean and modern, easy to read</span>
                    </div>
                    
                    <input 
                        type="radio" 
                        name='font' 
                        value='sans' 
                        checked={font === 'sans'} 
                        onChange={(e) => setFont(e.target.value)}
                    />
                </label>

                <label className='flex flex-row justify-between items-center h-72 w-full border border-black rounded-md px-3 mb-6 dark:border-white'>
                    {theme === 'light' ? 
                    <img 
                        src={serif_icon} 
                        alt='font(serif) icon' 
                        className='h-10 w-10 rounded-xl border border-black'
                    />
                    :
                    <img 
                        src={serif_icon_dark} 
                        alt='font(serif) icon' 
                        className='h-10 w-10 rounded-xl border border-black'
                    />}
                    <div className='flex flex-col w-56'>
                        <span className='font-bold text-sm'>Serif</span>
                        <span className='text-xs  '>Classic and elegant for a timeless fell</span>
                    </div>
                    
                    <input 
                        type="radio" 
                        name='font' 
                        value='serif' 
                        checked={font === 'serif'} 
                        onChange={(e) => setFont(e.target.value)} 
                    />
                </label>

                <label className='flex flex-row justify-between items-center h-72 w-full border border-black rounded-md px-3 mb-3 dark:border-white'>
                    {theme === 'light' ?
                    <img 
                        src={monospace_icon} 
                        alt='' className='h-10 w-10 rounded-xl border border-black'
                    />
                    :
                    <img 
                        src={monospace_icon_dark} 
                        alt='' className='h-10 w-10 rounded-xl border border-black'
                    /> }
                    <div className='flex flex-col w-56'>
                        <span className='font-bold text-sm'>Monospace</span>
                        <span className='text-xs'>Code-like, great for technical vibe</span>
                    </div>
                    
                    <input 
                        type="radio" 
                        name='font' 
                        value='mono' 
                        checked={font === 'mono'} 
                        onChange={(e) => setFont(e.target.value)}
                    />
                </label>
            </form>
        </section>
    )

}
export default FontTheme;