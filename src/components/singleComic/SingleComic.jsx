import './singleComic.scss';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import {Link} from "react-router-dom";

const SingleComic = () => {
    const {comicId} = useParams()
    const [comic,setComic] = useState(null)

    const {loading,error, getComic} = useMarvelService()
    const updateComic = () => {
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    useEffect(()=>{
        updateComic()
    },[])

    useEffect(()=>{
        updateComic()
    },[comicId])

    const skeleton = comic || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> :null
    const spinner = loading ? <Spinner/> :null
    const content = !(error || loading) && comic ? <View comic={comic}/> :null
    return (
        <>
            {skeleton}
            {content}
            {errorMessage}
            {spinner}
        </>
    )
}

const View = ({comic}) => {
    const {title,description,pageCount,thumbnail,language,price} = comic

    return (
        <div className="single-comic container">
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">Price: {price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComic;
