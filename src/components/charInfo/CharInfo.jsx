import {Component} from "react"
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import './charInfo.scss'
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharInfo extends Component {

    state = {
        char: null,
        error: null,
        loading: false
    }

    marvelServices = MarvelService

    updateChar = () => {
        const {charId} = this.props
        if(!charId) return
        this.onCharLoading()
        this.marvelServices
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)

        // this.foo.bar = 0
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading:false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading:true
        })
    }

    onError = () => {
        this.setState({
            loading:false,
            error: true
        })
    }

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('update')
        if(prevProps.charId !== this.props.charId) this.updateChar()
    }


    render() {
        const {char,loading,error} = this.state

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

export default CharInfo;
