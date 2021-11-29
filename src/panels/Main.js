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

const Main = ({id, go, changePopup}) => {
	return (
        <Panel id={id}>
            <HeaderSlider changePopup={changePopup}/>
            <Search/> 
            <Cards go={go}/>
            <FooterMain go={go} selectedText="search"/>
        </Panel>
	);
  };

Main.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
  changePopup: PropTypes.func.isRequired,
}; 
  
export default Main;

  
