import PropTypes from 'prop-types'
import logo from '../../assets/images/logo.svg'

const Heading = ({title, subtitle, className=""}) => {

    return (
        <div className={`flex flex-col justify-center items-center ${className}`}>
            <img src={logo} alt='logo' className='mt-8 mb-2'/>
            <h1 className='text-2xl font-bold mb-2'>{title}</h1>
            <p className='text-sm text-gray-600'>{subtitle}</p>
        </div>
    )

}

Heading.propTypes = {
    title: PropTypes.node.isRequired,
    subtitle: PropTypes.node.isRequired
}

export default Heading