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

  useEffect(() => {
  async function getNames() {
        try {
          console.log('Получаем names')
            const response = await fetch(SERVER_API + `/MainInfo?NamesOnly=${true}`,{
                method: "POST",
                mode: 'cors',
            });
            console.log(response)
            const data = await response.json();
            console.log(data)
            setCards(data);
        } catch(error) {
            console.error(error);
        }
    } 

    getNames();

  }, []); 

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