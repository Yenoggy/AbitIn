import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import PropTypes from 'prop-types';
import { 
	useAdaptivity,
	AppRoot,
	SplitLayout,
	SplitCol,
	ViewWidth,
	View,
	Panel,
	PanelHeader,
	PanelHeaderButton,
	ScreenSpinner,
	CardGrid,
	ContentCard,
	Group,
	Search,
	Tabbar,
	TabbarItem,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Header from '../components/Header';
import Cards from '../components/Cards';
import Footer from '../components/Footer';

const Main = ({id, go}) => {
	return (
        <Panel id={id}>
            <Header/>
            <Search/> 
            <Cards/>
            <Footer/>
        </Panel>
	);
  };

Main.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
}; 
  
export default Main;

  
