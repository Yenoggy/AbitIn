import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import PropTypes from 'prop-types';
import {
    Panel,
    Search,
    Group, Spacing,
    ScreenSpinner,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import MainSearch from '../components/MainSearch';
import HeaderFilter from '../components/HeaderFilter';
import Cards from '../components/Cards';
import FooterMain from '../components/FooterMain';

const Main = ({id, go, setActiveModal, setSelectedCard, filteredCards, setActiveBottomType, setPopout, dataForSearch}) => {
    /* Filteredcards - карточки переданные из фильтров ( то есть если пользователь воспользовался фильтрами)
    ПО умолчанию - null
     */
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function getCards() {
            try {
                const response = await fetch(SERVER_API + `/MainInfo`,{
                    method: "POST",
                    mode: 'cors',
                });
                const data = await response.json();
                setCards(data);
                setPopout(null);

            } catch(error) {
                console.error(error);
            }
        }

        if (filteredCards) {
            setCards(filteredCards);
            setPopout(null);
        }
        else {
            setPopout(<ScreenSpinner size='large'/>);
            getCards();
        }
    }, []);



    return (
        <Panel id={id} style={{justifyContent: "center"}}>
            <HeaderFilter setActiveModal={setActiveModal}/>
            <Group>
                {dataForSearch &&
                    <MainSearch dataForSearch={dataForSearch} setSelectedCard={setSelectedCard} go={go}/>
                }
                <Cards go={go} cards={cards} setSelectedCard={setSelectedCard}/>
                <Spacing size={30}/>
                <FooterMain go={go} selectedText="search" setActiveBottomType={setActiveBottomType}/>
            </Group>
        </Panel>
    );
};

Main.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    setActiveModal: PropTypes.func.isRequired,
    setSelectedCard: PropTypes.func.isRequired,
    filteredCards: PropTypes.array,
    setActiveBottomType: PropTypes.func.isRequired,
    setPopout: PropTypes.func.isRequired,
    dataForSearch: PropTypes.array.isRequired,
};

export default Main;


