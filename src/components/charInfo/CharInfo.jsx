import {useEffect, useState} from "react"
import PropTypes from 'prop-types'

import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import './charInfo.scss'
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharInfo = (props) => {
    const [char,setChar] = useState(null)

    const {loading,error, getCharacter} = useMarvelService()

    const updateChar = () => {
        const {charId} = props
        if(!charId) return
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
    },[props.charId])

    const skeleton = char || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> :null
    const spinner = loading ? <Spinner/> :null
    const content = !(error || loading) && char ? <View char={char}/> :null

    return (
        <div className="char__info">
            {skeleton}
            {content}
            {errorMessage}
            {spinner}
        </div>
    )
}

const View = ({char}) => {
    const {name,description,thumbnail,homepage,wiki,comics} = char

    const imgStyle = (thumbnail) => {
        return thumbnail.includes('not_available') ? {objectFit: 'contain'} : null
    }

    return (
        <>
            <div className="char__basics">
                <img style={imgStyle(thumbnail)} src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a rel="noreferrer" target="_blanc" href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a rel="norefferer" target="_blanc" href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                { comics.slice(0,10).map((item,i) => {
                    return (
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                    )
                })}
            </ul>
        </>

    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;
