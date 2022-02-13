import React, {useState, useEffect} from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {
    Group,
    Search,
    Footer,
    Cell,
} from '@vkontakte/vkui';




const MainSearch = () => {
  let serverCards = null;
  const defaultNames = [
    {name: "Университет ИТМО"},
    {name: "Политех"},
    {name: "Горный"},
  ];

  const [outputNames, setOutputNames] = useState(defaultNames);

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
            serverCards = data;
        } catch(error) {
            console.error(error);
        }
    } 

    if (!serverCards) getNames();

  }, []); 

  const onInput = ({target}) => {
    const inputText = target.value.toLowerCase();
    if (inputText.length == 0) {
      setOutputNames(defaultNames);
      return;
    }

    setOutputNames(
      serverCards.filter(({name}) => name.toLowerCase().indexOf(inputText) > -1)
    );
  }

  return (
    <>
        <Group>
          <Search onChange={onInput} after={null}/>
          {outputNames.length > 0 && outputNames.map(university => <Cell key={university.id}>{university.name}</Cell>)}
          {outputNames.length === 0 && <Footer>Ничего не найдено</Footer>}
        </Group>
    </>
  );
};

export default MainSearch;