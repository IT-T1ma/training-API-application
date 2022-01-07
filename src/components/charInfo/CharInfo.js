import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spiner from '../Spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Sceleton from '../skeleton/Skeleton'

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])


    const updateChar = () => {
        const {charId} = props;

        if(!charId) {
            return
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const sceleton = char || loading || error ? null : <Sceleton/>,
            errorMessage = error ? <ErrorMessage/> : null,
            spiner = loading ? <Spiner/> : null,
            content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {sceleton}
            {errorMessage}
            {spiner}
            {content}
        </div>
    )
    
}

const View = ({char}) => {
    const {name, description, thumbnail, wiki, homepage, comics} = char;

    let imgStyle = {'objectFit': 'cover'};

    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit': 'contain'}
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character...'}

                {  
                    comics.map((item, i) => {
                        if(i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }                
            </ul>
        </>
    )
}

export default CharInfo;