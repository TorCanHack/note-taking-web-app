import PropTypes from 'prop-types'

const AuthButton = ({ children } ) => {
    return (
        <button className='w-full h-11 bg-blue-600 rounded-xl text-white'>
            {children} 
        </button>
    )
} 

AuthButton.propTypes = {
    children: PropTypes.node.isRequired
}

export default AuthButton