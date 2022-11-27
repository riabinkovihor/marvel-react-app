import {useEffect, useRef, useState} from "react";
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

import './charList.scss';
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";


const InfiniteLoading = ({onIntersect,isDisabled}) => {
    const [entries,setEntries] = useState(null)

    const elementRef = useRef(null)

    const observer = useRef(null)

    const createObserver = () => {
        let options = {
            rootMargin: '0px',
            threshold: 1.0
        }

        observer.current = new IntersectionObserver((entries) => {
            setEntries(entries)
        }, options)

        observer.current.observe(elementRef.current);
    }

    const destroyObserver = () =>{
        observer.current.unobserve(elementRef.current)
    }

    useEffect(()=>{
        createObserver()
        return destroyObserver
    },[])


    useEffect(()=>{
        if (isDisabled) {
            observer.current.unobserve(elementRef.current)
            return
        }

        if (entries?.[0].isIntersecting) {
            onIntersect()
        }
    },[entries,isDisabled])

    return (
        <div ref={elementRef} className="infinite-loading"></div>
    )
}

const CharList = (props) => {
    const [charList,setCharList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [newItemsLoading, setNewItemsLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)
    const [showModal,setShowModal] = useState(false)

    const marveService = MarvelService


    useEffect(()=>{
        onRequest()
    },[])


    const onRequest = (offset) => {
        if (!newItemsLoading) {
            onCharListLoading()
            marveService
                .getAllCharacters(offset)
                .then(onCharListLoaded)
                .catch(onError)
        }
    }

    const onIntersect = () =>{
        onRequest(offset)
    }

    const onCharListLoading = () => {
        setNewItemsLoading(true)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = newCharList.length < 9
        setCharList(charList=> [...charList,...newCharList])
        setLoading(false)
        setNewItemsLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(ended)
    }

    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const onHandleKeyDown = (e,id) =>{

        if (
            e.code === "Enter" ||
            e.code === "Space"
        ) {
            e.preventDefault()
           onHandleClick(id)
        }
    }

    const onHandleClick = (e,id) => {
        e.target.focus()
        props.onCharSelect(id)
        setShowModal(true)
    }

    const renderItems = (charList) => {
        const charClass = (id,thumbnail) => {
            let result = 'char__item'
            if (props.selectedChar === id) result += ' char__item_selected'
            if (thumbnail.includes('not_available')) result += ' not-available'
            return result
        }

        const items =  charList && charList.map(({id,name,thumbnail}) => {
            return (
                <li key={id}
                    tabIndex="0"
                    onClick = {(e)=>onHandleClick(e,id)}
                    onKeyDown = {(e)=>onHandleKeyDown(e,id)}
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

    const items = renderItems(charList)
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
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
            <InfiniteLoading onIntersect={onIntersect} isDisabled={charEnded}></InfiniteLoading>
            { showModal
                ?   <Portal>
                        <div onClick={()=>{setShowModal(false)}}
                            className="portal">
                            <h2>Char selected</h2>
                        </div>
                    </Portal>
                : null
            }
        </div>
    )
}

const Portal = (props) => {
    return ReactDOM.createPortal(props.children, document.body)
}

CharList.propTypes = {
    onCharSelect: PropTypes.func.isRequired
}

export default CharList;
