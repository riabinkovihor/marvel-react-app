import './singleComic.scss';
import {Link} from "react-router-dom";
import {Helmet, HelmetProvider} from "react-helmet-async";

const SingleComic = ({data}) => {
    const {title,description,pageCount,thumbnail,language,price} = data

    return (
        <HelmetProvider>
            <div className="single-comic container">
                <Helmet>
                    <meta
                        name="description"
                        content={`Page of ${title} comic`}
                    />
                    <title>{title}</title>
                </Helmet>
                <img src={thumbnail} alt={title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">Price: {price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        </HelmetProvider>
    )
}

export default SingleComic;
