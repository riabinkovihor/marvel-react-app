import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

const ComicsPage = () => {
    return (
        <div className="container">
            <AppBanner/>
            <ComicsList/>
        </div>
    )
}

export default ComicsPage
