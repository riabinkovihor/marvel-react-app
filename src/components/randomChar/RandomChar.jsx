import {useEffect, useState} from "react";
import Spinner from '../spinner/Spinner'
import ErrorMessage from "../errorMessage/ErrorMessage";
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from "../../services/MarvelService";

const RandomChar = () => {
    const [char,setChar] = useState({})

    const {loading,error, getCharacter} = useMarvelService()

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateCharacter = () => {
        const id = Math.floor(Math.random() * 400 + 1011000)
        getCharacter(id)
            .then(onCharLoaded)
    }

    useEffect(()=>{
        updateCharacter()
        const timerId = setInterval(updateCharacter, 60000);

        return () => {
            clearInterval(timerId)
        }
    },[])

    const errorMessage = error ? <ErrorMessage/> :null
    const spinner = loading ? <Spinner/> :null
    const content = !error && !loading && char ? <View char={char}/> :null

    return (
        <div className="randomchar">
            {/*{loading ? <Spinner/> : error ? <ErrorMessage/> :<View char={char}/> }*/}
            {content}
            {errorMessage}
            {spinner}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateCharacter} type="button" className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {
    const  {name,description,thumbnail,homepage,wiki} = char

    let thumbnailClass = 'randomchar__img'
    if (thumbnail?.includes('not_available')) thumbnailClass += ' not-available'

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character"
                 className={thumbnailClass}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description || 'Данные отсутствуют'}
                </p>
                <div className="randomchar__btns">
                    <a rel="noreferrer" href={homepage} target='_blank' className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a rel="noreferrer" href={wiki} target='_blank' className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;
