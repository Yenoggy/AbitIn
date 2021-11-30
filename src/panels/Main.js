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
	return (
        <Panel id={id}>
            <HeaderSlider setActiveModal={setActiveModal}/>
            <Search/> 
            <Cards go={go}/>
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

  
