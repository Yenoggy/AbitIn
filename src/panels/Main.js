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
    const [cards, setCards] = useState([
/*         {
            id: 0,
            img: "https://news.itmo.ru/images/news/big/p9409.jpg",
            name: "Университет ИТМО",
            description: "От 100 000 рублей в год",
            address: "м. Гостиный Двор, 22 мин. пешком Набережная реки Фонтанки, 4, подъезд 7"
        },
        {
            id: 1,
            img: "https://news.itmo.ru/images/news/big/p9409.jpg",
            name: "Университет ИТМО",
            description: "От 100 000 рублей в год",
            address: "м. Гостиный Двор, 22 мин. пешком Набережная реки Фонтанки, 4, подъезд 7"
        },
        {
            id: 2,
            img: "https://news.itmo.ru/images/news/big/p9409.jpg",
            name: "Университет ИТМО",
            description: "От 100 000 рублей в год",
            address: "м. Гостиный Двор, 22 мин. пешком Набережная реки Фонтанки, 4, подъезд 7"
        }, */
    ]);
    useEffect(() => {
        async function getData() {
            try {
                console.log('gettting')
                const response = fetch("https://sniff-beb.ru:13535/MainInfo",{
                    method: "GET",
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                    }
                }).then(res => {
                    console.log(res)
                }).catch(e => {
                    console.log(e)
                });
                //setCards(data);
            } catch(error) {
                console.error(error);
            }
        }
        if (filteredCards) setCards(filteredCards);
        else {
             getData();
      }
    }, []);

    return (
        <Panel id={id} style={{justifyContent: "center"}}>
            <HeaderSlider setActiveModal={setActiveModal}/>
            <Group>
                <MainSearch/>
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


