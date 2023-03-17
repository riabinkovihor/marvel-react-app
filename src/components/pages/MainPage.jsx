import {useState} from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from "../../resources/img/vision.png";
import SearchForm from "../searchForm/SearchForm";
import {Helmet, HelmetProvider} from "react-helmet-async";

const MainPage = () => {
    const [selectedChar,setSelectedChar] = useState(null)
    const onCharSelect = (id) => {
        setSelectedChar(id)
    }
    return (
        <HelmetProvider>
            <Helmet>
                <meta
                    name="description"
                    content="Portal with list of characters"
                />
                <title>Marvel information portal</title>
            </Helmet>
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
        </HelmetProvider>
    )
}

export default MainPage
