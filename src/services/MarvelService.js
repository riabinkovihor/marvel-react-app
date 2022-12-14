class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=80f011b25c1428d39d22690f30880db4'
    _baseOffset = 210

    getResource = async(url) => {
        let response = await fetch(url)

        if (!response.ok) throw new Error(`Could not fetch ${url} , status: ${response.status}`)

        return await response.json()
    }

    // getResource(url) {
    //     return fetch(url)
    //         .then(res => {
    //             if (!res.ok) throw new Error(`Could not fetch ${url} , status: ${res.status}`)
    //             return res.json()
    //         })
    // }

    getAllCharacters = async (offset = this._baseOffset) => {
        let res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        // const res = await Promise.resolve('error')
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = ({id,name, description, thumbnail:{path,extension}, urls, comics}) => {
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
}

export default new MarvelService()




