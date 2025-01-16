import plus from '../../assets/images/icon-plus.svg'
import { useNavigate } from 'react-router-dom'



const PlusButton = ({setCreate}) => {

    const navigate = useNavigate();
    const handeCreateButton = () => {
    
        setCreate(true)
        navigate("/")
       }

    return (
        <button className=" flex flex-col justify-center items-center bg-blue-600 rounded-full h-12 w-12 ml-auto lg:hidden">
            <img src={plus} alt="cross icon" onClick={handeCreateButton} className="h-9 w-9  "/>
        </button>
    )

}

export default PlusButton;