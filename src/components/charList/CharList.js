import {Component} from "react";
import './charList.scss';
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

// import abyss from '../../resources/img/abyss.jpg';



class CharList extends Component {
    state = {
        chars:null,
        loading: true
    }

    marveService = MarvelService


    // updateAll = () => {
    //     this.marveService
    //         .getAllCharacters()
    //         .then(res=>console.log(res))
    // }

    updateAll = () => {
        this.setState({
            loading:true
        })
        this.marveService
            .getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoaded = (chars) => {
        this.setState({
            chars,
            loading:false
        })
    }

    onError = () => {
        this.setState({
            loading:false,
            error: true
        })
    }

    componentDidMount() {
        this.updateAll()
    }


    renderItems(chars) {
        const charClass = (selected) => {
            let result = 'char__item'
            if (selected) result += ' char__item_selected'
            return result
        }

        const imageClass = (thumbnail) => {
            return thumbnail.includes('not_available') && 'not-available'
        }


        const items =  chars && chars.map(({id,name,thumbnail,selected = false}) => {
            return (
                <li key={id}
                    className={charClass(selected)}>
                    <img className={imageClass(thumbnail)}
                         src={thumbnail} alt={name}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render () {
        const {chars,error,loading} = this.state

        const items = this.renderItems(chars)

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;
