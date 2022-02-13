import React, {useState, useEffect} from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';
import {
    Group,
    Search,
    Footer,
    Cell,
} from '@vkontakte/vkui';




const MainSearch = ({searchData}) => {

  const defaultNames = [
    {name: "Университет ИТМО"},
    {name: "Политех"},
    {name: "Горный"},
  ];

  const [outputNames, setOutputNames] = useState(defaultNames);

  const onInput = ({target}) => {
    const inputText = target.value.toLowerCase();

    if (inputText.length == 0) {
      setOutputNames(defaultNames);
      return;
    }

    setOutputNames(
      searchData.filter(({name}) => name.toLowerCase().indexOf(inputText) > -1)
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

MainSearch.propTypes = {
  searchData: PropTypes.array.isRequired,
}
export default MainSearch;