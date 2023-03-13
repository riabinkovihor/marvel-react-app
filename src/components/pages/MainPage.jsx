import {useState} from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from "../../resources/img/vision.png";
import SearchForm from "../searchForm/SearchForm";

const MainPage = () => {
    const [selectedChar,setSelectedChar] = useState(null)
    const onCharSelect = (id) => {
        setSelectedChar(id)
    }
    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <div className="char__column">
                    <ErrorBoundary>
                        <CharList selectedChar={selectedChar} onCharSelect={onCharSelect}/>
                    </ErrorBoundary>
                </div>
                <div className="char__column">
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <SearchForm/>
                    </ErrorBoundary>

                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage
