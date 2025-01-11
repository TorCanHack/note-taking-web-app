import {  useNavigate } from 'react-router-dom'
import archive_icon from '../../assets/images/icon-archive.svg'
import home_icon from '../../assets/images/icon-home.svg'
import search_icon from '../../assets/images/icon-search.svg'
import setting_icon from '../../assets/images/icon-settings.svg'
import tag_icon from '../../assets/images/icon-tag.svg'


const Navigation = () => {

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
        <section className='relative right-4  flex flex-row justify-around items-center w-375 py-4 border-t border-black md:w-768 '>
            <button onClick={handleNavigationHome}>
                <img src={home_icon} alt=" icon"/>
            </button>

            <button onClick={handleNavigationSearch}>
                <img src={search_icon} alt=" icon"/>
            </button>

            <button onClick={handleNavigationArchive}>
                <img src={archive_icon} alt=" icon"/>
            </button>

            <button onClick={handleNavigationTags}>
                <img src={tag_icon} alt=" icon"/>
            </button>
            
            <button onClick={handleNavigationSettings}>
                <img src={setting_icon} alt=" icon"/>

            </button>
            
            
            

        </section>

    )
}

export default Navigation