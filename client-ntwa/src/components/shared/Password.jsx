import PropTypes from 'prop-types';
import icon_hide_password from '../../assets/images/icon-hide-password.svg' 

const Password = ({ maintext, subtext, value, onChange, error }) => {

    return (
        <label >
            <span className=' block text-left text-sm '>{maintext} <a className='relative left-56 text-xs underline md:left-82'>{subtext}</a></span>
            <input className='w-full h-10 border border-black rounded-xl ' value={value} onChange={onChange}/>
            <button className='relative bottom-8 left-72 md:left-97'>
                <img src={icon_hide_password} alt='hide password'/>
        
            </button>
                            
        </label>
    )

}

Password.propTypes = {
    maintext: PropTypes.node.isRequired,
    
}

export default Password;