import {Component} from "react";
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

import './charList.scss';
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";




class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemsLoading: false,
        offset: 210,
        charEnded: false,
        showModal: false
    }

    marveService = MarvelService

    createObserver = () => {
        let options = {
            rootMargin: '0px',
            threshold: 1.0
        }

        const target = document.querySelector('.infinite-loading');

        const observer = new IntersectionObserver((entries, observer) => {
            const {loading,newItemsLoading,offset,charEnded} = this.state

            if (charEnded) {
                observer.unobserve(target)
                return
            }
            if (entries[0].isIntersecting && !loading && !newItemsLoading) {
                this.onRequest(offset)
            }
        }, options);

        observer.observe(target);
    }

    componentDidMount() {
        this.onRequest()
        // this.createObserver()
    }

    onRequest = (offset) => {
        if (!this.newItemsLoading) {
            this.onCharListLoading()
            this.marveService
                .getAllCharacters(offset)
                .then(this.onCharListLoaded)
                .catch(this.onError)
        }
    }

    onCharListLoading = () => {
        this.setState({
            newItemsLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = newCharList < 9

        this.setState(({charList,offset}) => ({
            charList: [...charList,...newCharList],
            loading:false,
            newItemsLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            loading:false,
            error: true
        })
    }

    onHandleKeyDown = (e,id) =>{

        if (
            e.code === "Enter" ||
            e.code === "Space"
        ) {
            e.preventDefault()
           this.onHandleClick(id)
        }
    }

    onHandleClick = (e,id) => {
        e.target.focus()
        this.props.onCharSelect(id)
        this.setState({
            showModal:true
        })
    }

    renderItems(charList) {
        const charClass = (id,thumbnail) => {
            let result = 'char__item'
            if (this.props.selectedChar === id) result += ' char__item_selected'
            if (thumbnail.includes('not_available')) result += ' not-available'
            return result
        }

        const items =  charList && charList.map(({id,name,thumbnail}) => {
            return (
                <li key={id}
                    tabIndex="0"
                    onClick = {(e)=>this.onHandleClick(e,id)}
                    onKeyDown = {(e)=>this.onHandleKeyDown(e,id)}
                    className={charClass(id,thumbnail)}>
                    <img src={thumbnail} alt={name}/>
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
        const {charList,error,loading,newItemsLoading,offset,charEnded,showModal} = this.state

        const items = this.renderItems(charList)

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button
                    className="button button__main button__long"
                    style={charEnded ? {display:'none'} : null}
                    disabled={newItemsLoading}
                    onClick={() => this.onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
                <div className="infinite-loading"></div>
                { showModal
                    ?   <Portal>
                            <div onClick={()=>{this.setState({showModal:false})}}
                                className="portal">
                                <h2>Char selected</h2>
                            </div>
                        </Portal>
                    : null
                }

            </div>
        )
    }
}

const Portal = (props) => {
    return ReactDOM.createPortal(props.children, document.body)
}

CharList.propTypes = {
    onCharSelect: PropTypes.func.isRequired
}

export default CharList;
