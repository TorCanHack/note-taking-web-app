import {  useNavigate } from 'react-router-dom'
import archive_icon from '../../assets/images/icon-archive.svg'
import archive_icon_dark from '../../assets/images/icon-archive dark.svg'
import home_icon from '../../assets/images/icon-home.svg'
import home_icon_dark from '../../assets/images/icon-home dark.svg'
import search_icon from '../../assets/images/icon-search.svg'
import search_icon_dark from '../../assets/images/icon-search dark.svg'
import setting_icon from '../../assets/images/icon-settings.svg'
import setting_icon_dark from '../../assets/images/icon-settings dark.svg'
import tag_icon from '../../assets/images/icon-tag.svg'
import tag_icon_dark from '../../assets/images/icon-tag dark.svg'
import { useTheme } from './useTheme'


const Navigation = () => {

    const {theme} = useTheme();
    const navigate = useNavigate();

    const handleNavigationHome = () => {
        navigate("/")
    }

    const handleNavigationArchive = () => {

        navigate("/archive")

    }

    const handleNavigationSearch = () => {

        navigate('/search')
    }

    const handleNavigationTags = () => {
        navigate('/tags')
    }

    const handleNavigationSettings = () => {
        navigate('/settings')
    }

    return (
        <section className='relative right-4 w-375 flex flex-row justify-around items-center  py-4 border-t border-black largePhone:w-410 md:w-768 lg:hidden dark:border-white '>
            <button onClick={handleNavigationHome}>
                {theme === 'light' ? <img src={home_icon} alt=" icon"/> : <img src={home_icon_dark} alt=" icon"/> }
            </button>

            <button onClick={handleNavigationSearch}>
                { theme === 'light' ? <img src={search_icon} alt=" icon"/> : <img src={search_icon_dark} alt=" icon"/>}
            </button>

            <button onClick={handleNavigationArchive}>
                {theme === 'light' ? <img src={archive_icon} alt=" icon"/> : <img src={archive_icon_dark} alt=" icon"/>}
            </button>

            <button onClick={handleNavigationTags}>
                {theme === 'light' ? <img src={tag_icon} alt=" icon"/> : <img src={tag_icon_dark} alt=" icon"/>}
            </button>
            
            <button onClick={handleNavigationSettings}>
                { theme === 'light' ? <img src={setting_icon} alt=" icon"/> : <img src={setting_icon_dark} alt=" icon"/>}

            </button>
            
            
            

        </section>

    )
}

export default Navigation