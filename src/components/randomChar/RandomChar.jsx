import { Component } from "react";
import Spinner from '../spinner/Spinner'
import ErrorMessage from "../errorMessage/ErrorMessage";
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from "../../services/MarvelService";

class RandomChar extends Component {
    state = {
        char:{},
        loading: true,
        error: false
    }

    marveService = MarvelService

    // updateAll = () => {
    //     this.marveService
    //         .getAllCharacters()
    //         .then(res=>console.log(res))
    // }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading:false
        })
    }

    onReloadChar = () => {
        this.updateCharacter()
    }

    onError = () => {
        this.setState({
            loading:false,
            error: true
        })
    }

    updateCharacter = () => {
        this.setState({
            loading:true
        })
        const id = Math.floor(Math.random() * 400 + 1011000)
        this.marveService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    componentDidMount() {
        this.updateCharacter()
    }

    render(){
        console.log('render')
        const  {char,loading, error} = this.state

        const errorMessage = error ? <ErrorMessage/> :null
        const spinner = loading ? <Spinner/> :null
        const content = !(error || loading) ? <View char={char}/> :null

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
                    <button onClick={this.onReloadChar} type="button" className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const  {name,description,thumbnail,homepage,wiki} = char

    let thumbnailClass = 'randomchar__img'
    if (thumbnail.includes('not_available')) thumbnailClass += ' not-available'

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
