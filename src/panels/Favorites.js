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
const Favorites = ({id, go, setActiveModal, favoritiesIds, addToFavorites}) => {
    const [favorites, setFavorities] = useState([]);
    useEffect(() => {
   
        async function getFavorites() {
            try {
            console.log('Получаем names')
                const response = await fetch(SERVER_API + `/Favorites?Id=${favoritiesIds}`,{
                    method: "POST",
                    mode: 'cors',
                });
                console.log(response)
                const data = await response.json();
                console.log(data)
                setFavorities(data);
            } catch(error) {
                console.error(error);
            }
        } 

        if (!favorites.length) getFavorites(); //
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
    favoritiesIds: PropTypes.array.isRequired,
    addToFavorites: PropTypes.func.isRequired,
};

export default Favorites;
