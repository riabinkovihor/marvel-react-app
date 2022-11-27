import {useState,Children, cloneElement} from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

// const DynamicGreeting = (props) => {
//     return(
//         <div style={{color: props.color,display:'flex'}}>
//             {Children.map(props.children,(child) => {
//                 return cloneElement(child,{style: {
//                         margin: 10,
//                         padding : 10,
//                         border: '1px solid #282828'
//                     }})
//             })}
//         </div>
//     )
// }

const App = () => {

    const [selectedChar,setSelectedChar] = useState(null)

    const onCharSelect = (id) => {
        setSelectedChar(id)
    }

    return (
        <div className="app">
            {/*<DynamicGreeting color={'grey'}>*/}
            {/*    <h2>Hello</h2>*/}
            {/*    <h2>World!</h2>*/}
            {/*</DynamicGreeting>*/}
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList selectedChar={selectedChar} onCharSelect={onCharSelect}/>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;
