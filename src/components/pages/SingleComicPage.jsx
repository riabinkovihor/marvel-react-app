import SingleComic from "../singleComic/SingleComic";
import AppBanner from "../appBanner/AppBanner";
export default function SingleComicPage () {
    return (
        <div className="container">
            <AppBanner/>
            <SingleComic/>
        </div>
    )
}