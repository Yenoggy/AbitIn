import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
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
	CardGrid,
	ContentCard,
	Group,
	Search,
	Tabbar,
	TabbarItem,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Header from './panels/Header';
import Cards from './panels/Cards';
import Footer from './panels/Footer';

const App = () => {
	const { viewWidth } = useAdaptivity();
   
	return (
	  <AppRoot>
		<SplitLayout header={<PanelHeader separator={false} />}>
		  <SplitCol spaced={viewWidth && viewWidth > ViewWidth.MOBILE}>
			<View activePanel="profile">
			<Panel id="profile">
				<Header/>
				<Search/> 
				<Cards/>
				<Footer/>
			</Panel>
			</View>
		  </SplitCol>
		</SplitLayout>
	  </AppRoot>
	);
  };

  
export default App;
