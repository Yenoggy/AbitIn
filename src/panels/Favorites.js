import React, {useState, useEffect} from 'react';
import {
    Placeholder,
    Panel,
    Search
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';
import HeaderSlider from '../components/HeaderSlider';
import FooterMain from '../components/FooterMain';
import MainSearch from '../components/MainSearch';

import {Icon20StarCircleFillGray} from '@vkontakte/icons';
import Cards from '../components/Cards';
const Favorites = ({id, go, setActiveModal, getUnicFavoritesIds, addToFavorites}) => {
    const [favorites, setFavorites] = useState([]);
    let dataHasTaken = false;
    useEffect(() => {
        console.log('data ids', getUnicFavoritesIds());
        // Получаем по списку с id-шниками фаворитных вузов карточки из базы данных для отрисовки, чистим лишние
        async function getFavorites() {

            try {
                const unicIds = getUnicFavoritesIds();
                const requestArguments =  {
                    method: "POST",
                    mode: 'cors',
                };

                const data = [];
                for (const unicId of unicIds) {
                    const response = await fetch(SERVER_API + `/GetInfo?Id=${unicId}`, requestArguments);
                    console.log(response)
                    const partOfData = await response.json();
                    data.push(...partOfData);
                }
                console.log('data ids', unicIds);
                console.log('data Favorites', data)
                setFavorites(data);
                dataHasTaken = true;
            } catch(error) {
                console.error(error);
            }
        } 

        if (!dataHasTaken && getUnicFavoritesIds().length) getFavorites(); //
    }, []);



    return (
        <Panel id={id}>
            <HeaderSlider setActiveModal={setActiveModal}/>
            <MainSearch searchData={favorites} />
            {!favorites.length &&
            <Placeholder
                icon={<Icon20StarCircleFillGray width={154.74} height={
                    148.61}/>}
            >
                Нет избранных вузов
            </Placeholder>
            }
            {favorites.length > 0 &&
            <Cards go={go} cards={favorites} addToFavorites={addToFavorites}/>
            }
            <FooterMain go={go} selectedText={ROUTES.FAVORITES}/>
        </Panel>
    );
};

Favorites.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    setActiveModal: PropTypes.func.isRequired,
    addToFavorites: PropTypes.func.isRequired,
    getUnicFavoritesIds: PropTypes.func.isRequired,
};

export default Favorites;
