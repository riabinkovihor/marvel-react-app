import img from './error.gif'
import './errorMessage.scss'

const ErrorMessage = () => {
    return (
        <div className={'error-message'}>
            <img src={img}
                 alt="Error"
            />
        </div>
    )
}

export default ErrorMessage
