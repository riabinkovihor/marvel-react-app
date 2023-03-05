import {Suspense, lazy, createContext, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
// import { MainPage, ComicsPage, NotFoundPage, SingleComicPage} from "../pages"

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export const MyContext = createContext({})

const App = () => {
    const [appCounter, setAppData] = useState({
        counter: 0
    })
    return (
        <MyContext.Provider value={ appCounter }>
            <Router basename="/marvel-react-app">
                <div onClick={()=>setAppData((v)=> ({counter: v.counter + 1}))} className="app">
                    <AppHeader/>
                    <main>
                        <Suspense fallback={<div>Загрузка...</div>}>
                            <Routes>
                                <Route path="/" element={ <MainPage/>}/>
                                <Route path="comics" element={ <ComicsPage/>}/>
                                <Route path="/comics/:comicId" element={<SingleComicPage />} />
                                <Route path='*' element={<NotFoundPage />} />
                            </Routes>
                        </Suspense>
                    </main>
                </div>
            </Router>
        </MyContext.Provider>
    )
}

export default App;
