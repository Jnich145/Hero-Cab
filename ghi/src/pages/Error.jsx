import { useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError();
    return (
        <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <img
                src="https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png"
                alt="Error Icon"
                style={{ width: '100px', margin: '20px 0' }}
            />
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}

export default Error
