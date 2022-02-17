import React, {useState, useEffect} from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';
import {
    Group,
    Search,
    Footer,
    Cell,
    ScreenSpinner,
    Div
} from '@vkontakte/vkui';




const MainSearch = ({searchData, setSelectedCard, go}) => {
  /* searchData - данные по которым ищем (список формата {name, id}) */
  // setSelectedCard - метод для установки выбранной карточки
  // go - для перехода в выбранную карточку

  const [outputNames, setOutputNames] = useState(searchData.slice(0,3));

  const onInput = ({target}) => {
    const inputText = target.value.toLowerCase();

    if (inputText.length == 0) {
      setOutputNames(searchData.slice(0,3));
      return;
    }

    setOutputNames(
      searchData.filter(({name}) => name.toLowerCase().indexOf(inputText) > -1)
    );
  }

  const showCard = (universityId, e) => {
    e.currentTarget.dataset.to = ROUTES.CARDINFO;
    setSelectedCard(Number(universityId));
    go(e);
  };

  return (
    <>
        {searchData &&
            
        <Group>
          <Search onChange={onInput} after={null}/>
          <div className="searchField">
            {outputNames.length > 0 && 
              outputNames.map(university => 
                <Cell key={university.id} onClick={(e) => {
                  showCard(university.id, e);
                }}>{university.name}</Cell>)}
          </div>

          {outputNames.length === 0 && <Footer>Ничего не найдено</Footer>}
        </Group>

        }
    </>
  );
};

MainSearch.propTypes = {
  setSelectedCard: PropTypes.func.isRequired,
  go: PropTypes.func.isRequired,
  searchData: PropTypes.array.isRequired,
};

export default MainSearch;