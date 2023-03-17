import NotFound from "../notFound/notFound";
import {Helmet, HelmetProvider} from "react-helmet-async";


export default function NotFoundPage () {
    return (
        <HelmetProvider>
            <Helmet>
                <meta
                    name="description"
                    content="Page of 404 error"
                />
                <title>404</title>
            </Helmet>
            <NotFound/>
        </HelmetProvider>

    )
}
