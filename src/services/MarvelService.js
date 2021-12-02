class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=c5d6fc8b83116d92ed468ce36bac6c62'

    getResources = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }
    
    getAllCharacters = () => {
        return this.getResources(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
    }

    getCharacter = async (id) => {
        const res = await this.getResources(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._trasformChar(res.data.results[0]);
    }

    _trasformChar = (char) => {
        return {
            name: char.name,
            description:  char.description ? `${char.description.slice(0, 200)}...`: 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    } 
}

export default MarvelService;