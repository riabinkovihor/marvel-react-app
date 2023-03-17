import AppBanner from "../appBanner/AppBanner";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams()
    const [data, setData] = useState(null)

    const {loading,error, getCharacter, getComic} = useMarvelService()

    const updateData = () => {
        if (dataType === 'character') getCharacter(id).then(onDataLoaded)
        else getComic(id).then(onDataLoaded)
    }

    const onDataLoaded = (data) => {
        setData(data)
    }

    useEffect(()=>{
        updateData()
    },[])

    useEffect(()=>{
        updateData()
    },[id])

    const skeleton = data || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> :null
    const spinner = loading ? <Spinner/> :null
    const content = !(error || loading) && data ? <Component data={data}/> :null
    return (
            <div className="container">
                <AppBanner/>
                {skeleton}
                {content}
                {errorMessage}
                {spinner}
            </div>
    )
}

export default SinglePage;
