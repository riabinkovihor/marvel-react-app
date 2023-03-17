import './singleChar.scss';
import {Helmet, HelmetProvider} from "react-helmet-async";

const SingleChar = ({data}) => {
    const {name,description,thumbnail} = data

    return (
        <HelmetProvider>
            <Helmet>
                <meta
                    name="description"
                    content={`Page about ${name}`}
                />
                <title>{name}</title>
            </Helmet>
            <div className="single-char">
                <img
                    src={thumbnail}
                    alt={name}
                    className="single-char__img"
                />
                <div className="single-char__info">
                    <h2 className="single-char__name">{name}</h2>
                    <p className="single-char__descr">{description}</p>
                </div>
            </div>
        </HelmetProvider>

    )
}

export default SingleChar;
