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
	Header,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import FooterMain from '../components/FooterMain';

const CardInfo = ({id, go}) => {
	return (
        <Panel id={id}>
			<Header>Test</Header>
            <FooterMain/>
        </Panel>
	);
  };

  CardInfo.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
}; 
  
export default CardInfo;

  