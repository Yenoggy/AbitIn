import React, {useState, useEffect} from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {
    Group,
    Search,
    Footer,
    Cell,
} from '@vkontakte/vkui';




const MainSearch = () => {
  const [cards, setCards] = useState([
    {name: "Университет ИТМО"},
    {name: "Политех"},
    {name: "Горный"},
  ]);

    /* useEffect(() => {
  async function getData() {
        try {
            const response = await fetch(SERVER_API + `/MainInfo`,{
                method: "POST",
                mode: 'cors',
            });
            const data = await response.json();
            setCardData(...data);
        } catch(error) {
            console.error(error);
        }
    } 

    getData();

  }, []); */

  const onInput = ({target}) => {
    const search = target.value.toLowerCase();
    setCards(cards.filter(({name}) => name.toLowerCase().indexOf(search) > -1));
  }

  return (
    <>
        <Group>
          <Search onChange={onInput} after={null}/>
          {cards.length > 0 && cards.map(card => <Cell key={card.id}>{card.name}</Cell>)}
          {cards.length === 0 && <Footer>Ничего не найдено</Footer>}
        </Group>
    </>
  );
};

export default MainSearch;