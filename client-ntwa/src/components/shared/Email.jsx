import PropTypes from 'prop-types'


const Email = ({ title, className="", value, onChange, error }) => {
    return (
        <label className="mb-4 ">
            <span className=' flex text-left text-sm '>{title}</span>
            <input 
                className={`w-full h-10 border border-black rounded-xl mb-4 ${error ? 'border border-red-500' : ''}`}
                value={value} 
                onChange={onChange}
            />
        </label>
    )

}

Email.propTypes = {
    title: PropTypes.node.isRequired

}

export default Email;