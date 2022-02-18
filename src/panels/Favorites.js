import React, {useState, useEffect} from 'react';
import {
    Placeholder,
    Panel,
    Search,
    ScreenSpinner,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';
import HeaderSlider from '../components/HeaderSlider';
import FooterMain from '../components/FooterMain';
import MainSearch from '../components/MainSearch';

import {Icon20StarCircleFillGray} from '@vkontakte/icons';
import Cards from '../components/Cards';
const Favorites = ({id, go, setActiveModal, getUnicFavoritesIds, 
    setSelectedCard, setActiveBottomType, setPopout}) => {
    const [favorites, setFavorites] = useState(null);
    let dataHasTaken = false;

    useEffect(() => {
        console.log('dataHasTaken', dataHasTaken);
        if (!dataHasTaken) {
            setPopout(<ScreenSpinner size='large'/>);
        }
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
                    const partOfData = await response.json();
                    data.push(...partOfData);
                }
                
                setPopout(null);
                setFavorites(data);
                dataHasTaken = true;
                console.log('dataHasTaken')
                
            } catch(error) {
                console.error(error);
            }
        } 

        if (getUnicFavoritesIds().length) getFavorites(); //
    }, []);



    return (
        <Panel id={id}>
            <HeaderSlider setActiveModal={setActiveModal}/>
            {favorites &&
                <div>
                    <MainSearch dataForSearch={favorites} setSelectedCard={setSelectedCard}  go={go}/>
                    {!favorites.length && dataHasTaken &&
                        <Placeholder
                            icon={<Icon20StarCircleFillGray width={154.74} height={
                                148.61}/>}
                        >
                            Нет избранных вузов
                        </Placeholder>
                        }
                        {favorites.length > 0 &&
                            <Cards 
                                go={go} 
                                cards={favorites} 
                                setSelectedCard={setSelectedCard}
                            />
                    }
                </div>
            }
            <FooterMain go={go} setActiveBottomType={setActiveBottomType} selectedText="favorites"/>
        </Panel>
    );
};

Favorites.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    setActiveModal: PropTypes.func.isRequired,
    getUnicFavoritesIds: PropTypes.func.isRequired,
    setSelectedCard: PropTypes.func.isRequired,
    setPopout: PropTypes.func.isRequired,
};

export default Favorites;
