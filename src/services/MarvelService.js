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

    return {loading,error, getAllCharacters,getCharacter}
}

export default useMarvelService




