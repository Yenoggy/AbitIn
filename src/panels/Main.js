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
import HeaderSlider from '../components/HeaderSlider';
import Cards from '../components/Cards';
import FooterMain from '../components/FooterMain';

const Main = ({id, go, setActiveModal, setSelectedCard, filteredCards, setActiveBottomType, setPopout}) => {
    const [cards, setCards] = useState([]);
    const [names, setNames] = useState(null);

    let dataHasTaken = false;
    useEffect(() => {
        if (!dataHasTaken) {
            setPopout(<ScreenSpinner size='large'/>);
        }
        async function getCards() {
            try {
                const response = await fetch(SERVER_API + `/MainInfo`,{
                    method: "POST",
                    mode: 'cors',
                });
                const data = await response.json();
                setCards(data);
                
                setPopout(null);
                dataHasTaken = true;
            } catch(error) {
                console.error(error);
            }
        }
        async function getNames() {
        try {
            const response = await fetch(SERVER_API + `/MainInfo?NamesOnly=${true}`,{
                method: "POST",
                mode: 'cors',
            });
            const data = await response.json();
            setNames(data);
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
                {names &&
                    <MainSearch searchData={names} setSelectedCard={setSelectedCard} go={go}/>
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
};

export default Main;


