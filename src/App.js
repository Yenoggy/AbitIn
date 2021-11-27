import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {   AdaptivityProvider,
	ConfigProvider,
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
	Header,
	Group,
	Counter,
	SimpleCell } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { Icon20SlidersOutline, Icon28PictureOutline  } from '@vkontakte/icons';
const App = () => {
	const { viewWidth } = useAdaptivity();
   
	return (
	  <AppRoot>
		<SplitLayout header={<PanelHeader separator={false} />}>
		  <SplitCol spaced={viewWidth && viewWidth > ViewWidth.MOBILE}>
			<View activePanel="main">
			<Panel id="main">
				<PanelHeader
				left={<PanelHeaderButton><Icon20SlidersOutline/></PanelHeaderButton>}
				>
				AbitIn
				</PanelHeader>
			</Panel>
			</View>
		  </SplitCol>
		</SplitLayout>
	  </AppRoot>
	);
  };

  
export default App;
