import archive_icon from '../../assets/images/icon-archive.svg'
import home_icon from '../../assets/images/icon-home.svg'
import search_icon from '../../assets/images/icon-search.svg'
import setting_icon from '../../assets/images/icon-settings.svg'
import tag_icon from '../../assets/images/icon-tag.svg'


const Navigation = () => {
    return (
        <section className='relative right-4 top-96.5 flex flex-row justify-around items-center w-375 py-4 border-t border-black md:w-768 '>
            <button>
                <img src={home_icon} alt=" icon"/>
            </button>

            <button>
                <img src={search_icon} alt=" icon"/>
            </button>

            <button>
                <img src={archive_icon} alt=" icon"/>
            </button>

            <button>
                <img src={tag_icon} alt=" icon"/>
            </button>
            
            <button>
                <img src={setting_icon} alt=" icon"/>

            </button>
            
            
            

        </section>

    )
}

export default Navigation