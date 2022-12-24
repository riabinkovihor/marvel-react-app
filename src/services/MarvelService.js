import useHttp from "../hooks/useHttp.hook";

const useMarvelService = () => {

    const {request, loading, error} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=80f011b25c1428d39d22690f30880db4'
    // _apiKey = 'apikey=f55ef85c523bfdec0ca090c582466126'
    const _baseOffset = 210

    const getAllCharacters = async (offset = _baseOffset) => {
        try {
            let res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
            return res.data.results.map(_transformCharacter)
        } catch (e) {
            console.log('Error on getAllCharacters --> ', e)
        }
    }

    const getCharacter = async (id) => {
        try {
            const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
            return _transformCharacter(res.data.results[0])
        } catch (e) {
            console.log('Error on getCharacter --> ', e)
        }
    }

    const getAllComics = async (offset = 0) => {
        try {
            const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
            return res.data.results.map(_transformComics);
        } catch (e) {
            console.log('Error on getAllComics --> ',e)
        }

    }

    const getComics = async (id) => {
        try {
            const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
            return _transformComics(res.data.results[0]);
        } catch (e) {
            console.log('Error on getComics --> ',e)
        }
    }

    const _transformCharacter = ({id,name, description, thumbnail:{path,extension}, urls, comics}) => {
        return {
            id,
            name,
            description: description ? `${description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: `${path}.${extension}`,
            homepage: urls[0].url,
            wiki: urls[1].url,
            comics: comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }

    return {loading,error, getAllCharacters,getCharacter, getAllComics, getComics}
}

export default useMarvelService




