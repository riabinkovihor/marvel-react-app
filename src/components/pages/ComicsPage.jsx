import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import {Helmet, HelmetProvider} from "react-helmet-async";

const ComicsPage = () => {
    return (
        <HelmetProvider>
            <div className="container">
                <Helmet>
                    <meta
                        name="description"
                        content="Page with list of comics"
                    />
                    <title>Comics page</title>
                </Helmet>
                <AppBanner/>
                <ComicsList/>
            </div>
        </HelmetProvider>
    )
}

export default ComicsPage
