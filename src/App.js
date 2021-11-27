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
	Search,
	Counter,
	Tabbar,
	TabbarItem,
	SimpleCell } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { Icon20SlidersOutline} from '@vkontakte/icons';
import { Icon24Search  } from '@vkontakte/icons';
import { Icon24FavoriteOutline } from '@vkontakte/icons';

const App = () => {
	const { viewWidth } = useAdaptivity();
	const [text, setText] = useState('one');
   
	return (
	  <AppRoot>
		<SplitLayout header={<PanelHeader separator={false} />}>
		  <SplitCol spaced={viewWidth && viewWidth > ViewWidth.MOBILE}>
			<View activePanel="profile">
			<Panel id="profile">

				<PanelHeader
				left={<PanelHeaderButton><Icon20SlidersOutline/></PanelHeaderButton>}
				>
				AbitIn
				</PanelHeader>
				<Search/> 
				<Group>
					<CardGrid size="l">
						<ContentCard
						src="https://images.unsplash.com/photo-1603928726698-a015a1015d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
						subtitle="unsplash"
						header="brown and gray mountains under blue sky during daytime photo"
						text="Mountain changji"
						caption="Photo by Siyuan on Unsplash"
						maxHeight={500}
						>
						</ContentCard>
						<ContentCard
						src="https://images.unsplash.com/photo-1603928726698-a015a1015d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
						subtitle="unsplash"
						header="persons left hand with pink paint"
						text="Five hours of makeup and paint to achieve the human anatomy photoshoot. Thank you Steph and Shay. See more and official credit on @jawfox.photography."
						caption="Photo by Alexander Jawfox on Unsplash"
						maxHeight={500}
						/>
					</CardGrid>
				</Group>
				<Tabbar style={{position: ''}} itemsLayout="vertical">
				<TabbarItem selected={text === 'one'} onClick={() => setText('one')} text="Поиск"><Icon24Search/></TabbarItem>
				<TabbarItem selected={text === 'two'} onClick={() => setText('two')} text="Избранное"><Icon24FavoriteOutline/></TabbarItem>
				</Tabbar>
			</Panel>
			</View>
		  </SplitCol>
		</SplitLayout>
	  </AppRoot>
	);
  };

  
export default App;
