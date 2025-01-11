import logout_icon from '../../assets/images/icon-logout.svg';
import lock_icon from '../../assets/images/icon-lock.svg';
import sun_icon from '../../assets/images/icon-sun.svg';
import ColorTheme from './ColorTheme';
import FontTheme from './FontTheme';

const Settings = () => {

    return (
        <section>
            <h1></h1>
            <button>Color Theme</button>
            <button>Font Theme</button>
            <button>Change Password</button>
            <button>Lougout</button>
            <ColorTheme/>
            <FontTheme/>
        </section>
    )

}

export default Settings;