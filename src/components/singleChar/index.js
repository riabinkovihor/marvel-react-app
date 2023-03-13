import './singleChar.scss';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const Index = () => {
    const {charId} = useParams()
    const [char,setChar] = useState(null)

    const {loading,error, getCharacter} = useMarvelService()
    const updateChar = () => {
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    useEffect(()=>{
        updateChar()
    },[])

    useEffect(()=>{
        updateChar()
    },[charId])

    const skeleton = char || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> :null
    const spinner = loading ? <Spinner/> :null
    const content = !(error || loading) && char ? <View char={char}/> :null
    return (
        <>
            {skeleton}
            {content}
            {errorMessage}
            {spinner}
        </>
    )
}

const View = ({char}) => {
    const {name,description,thumbnail} = char

    return (
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
    )
}

export default Index;
