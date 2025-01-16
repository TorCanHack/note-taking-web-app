export const Button1 = ({image, image2, text, className, buttonFunc}) => {

    return (
        <button 
            className={`flex flex-row p-2 w-240 h-10 text-sm font-medium ${className}`} 
            onClick={`${buttonFunc}`}
        >

            {image}
            {text}
            {image2}

        </button>
    )
}