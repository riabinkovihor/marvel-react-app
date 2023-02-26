import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";
import './notFound.scss'

export default function NotFound () {
    return (
        <div className="page-404 container">
            <ErrorMessage/>
            <h1 className="page-404__title">404</h1>
            <h2 className="page-404__subtitle">Not found</h2>
            <Link className="page-404__button"
                  to="/"
            >Back to main page</Link>
        </div>
    )
}
