import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import PropTypes from 'prop-types';
import {
    Panel,
    Search,
    Group, Spacing,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import MainSearch from '../components/MainSearch';
import HeaderSlider from '../components/HeaderSlider';
import Cards from '../components/Cards';
import FooterMain from '../components/FooterMain';

const Main = ({id, go, setActiveModal, setSelectedCard, filteredCards, addToFavorites}) => {
    const [cards, setCards] = useState([]);
    const [names, setNames] = useState(null);
    useEffect(() => {
        async function getCards() {
            try {
                console.log('gettting')
                const response = await fetch(SERVER_API + `/MainInfo`,{
                    method: "POST",
                    mode: 'cors',
                });
                const data = await response.json();
                setCards(data);
            } catch(error) {
                console.error(error);
            }
        }
        async function getNames() {
        try {
          console.log('Получаем names')
            const response = await fetch(SERVER_API + `/MainInfo?NamesOnly=${true}`,{
                method: "POST",
                mode: 'cors',
            });
            const data = await response.json();
            setNames(data);
            console.log('имена', names)
        } catch(error) {
            console.error(error);
        }
        } 

        if (filteredCards) setCards(filteredCards);
        else {
            getCards();
        }
        if (!names) getNames();
    }, []);



    return (
        <Panel id={id} style={{justifyContent: "center"}}>
            <HeaderSlider setActiveModal={setActiveModal}/>
            <Group>
                <MainSearch searchData={names}/>
                <Cards go={go} cards={cards} setSelectedCard={setSelectedCard} addToFavorites={addToFavorites}/>
                <Spacing size={30}/>
                <FooterMain go={go} selectedText="search"/>
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
    addToFavorites: PropTypes.func.isRequired,
};

export default Main;


