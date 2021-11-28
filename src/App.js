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
	ScreenSpinner,
	CardGrid,
	ContentCard,
	Group,
	Search,
	Tabbar,
	TabbarItem,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Main from './panels/Main';
import CardInfo from './panels/CardInfo';

const App = () => {
	const { viewWidth } = useAdaptivity();
	const [activePanel, setActivePanel] = useState('main');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		console.dir(e);
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
	  <AppRoot>
		<SplitLayout header={<PanelHeader separator={false} />}>
		  <SplitCol spaced={viewWidth && viewWidth > ViewWidth.MOBILE}>
		  	<View activePanel={activePanel} popout={popout}>
				<Main id="main" go={go}/>
				<CardInfo id="card" go={go}/>
			</View>
		  </SplitCol>
		</SplitLayout>
	  </AppRoot>
	);
  };

  
export default App;

  
