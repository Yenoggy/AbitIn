import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import PropTypes from 'prop-types';
import { 
	Panel,
	Search,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import HeaderSlider from '../components/HeaderSlider';
import Cards from '../components/Cards';
import FooterMain from '../components/FooterMain';

const Main = ({id, go, setActiveModal}) => {
    const [cards, setCards] = useState([
      {
          id: 0,
          img: "https://images.unsplash.com/photo-1603928726698-a015a1015d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
          name: "Университет ИТМО", 
          description: "От 100 000 рублей в год", 
          address: "м. Гостиный Двор, 22 мин. пешком Набережная реки Фонтанки, 4, подъезд 7" 
      },
      {
          id: 1,
          img: "https://images.unsplash.com/photo-1603928726698-a015a1015d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
          name: "Университет ИТМО", 
          description: "От 100 000 рублей в год", 
          address: "м. Гостиный Двор, 22 мин. пешком Набережная реки Фонтанки, 4, подъезд 7" 
      },
      {
          id: 2,
          img: "https://images.unsplash.com/photo-1603928726698-a015a1015d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
          name: "Университет ИТМО", 
          description: "От 100 000 рублей в год", 
          address: "м. Гостиный Двор, 22 мин. пешком Набережная реки Фонтанки, 4, подъезд 7" 
      },
  ]);
  /*   useEffect(() => {
    getData();

    async function getData() {
      const response = await fetch("");
      const data = await response.json();

      setCards(data);
    }
  }, []); */

	return (
        <Panel id={id}>
            <HeaderSlider setActiveModal={setActiveModal}/>
            <Search/> 
            <Cards go={go} cards={cards}/>
            <FooterMain go={go} selectedText="search"/>
        </Panel>
	);
  };

Main.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
  setActiveModal: PropTypes.func.isRequired,
}; 
  
export default Main;

  
