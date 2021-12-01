import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { 
	useAdaptivity,
	AppRoot,
	SplitLayout,
	SplitCol,
	ViewWidth,
	View,
	ModalRoot,
	PanelHeader,
	ScreenSpinner,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Main from './panels/Main';
import CardInfo from './panels/CardInfo';
import Favorites from './panels/Favorites';

import Filters from './Modals/Filters';
import SelectCity from './Modals/SelectCity';

import {STORAGE_KEYS} from './config';


const App = () => {
	const { viewWidth } = useAdaptivity();
	const isMobile = viewWidth <= ViewWidth.MOBILE;

	const [activePanel, setActivePanel] = useState(ROUTES.MAIN);
	const [fetchedUser, setUser] = useState(null);

	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [modalHistory, setModalHistory] = useState([]);
	const [activeModal, setActiveModal] = useState(null);

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
		setActivePanel(e.currentTarget.dataset.to);
		console.log(e.currentTarget.dataset.to);
	};
	const _setActiveModal = e => {
		const modalName = e.currentTarget.dataset.modal;

		let _modalHistory = modalHistory ? [...modalHistory] : [];

		if (modalName === null) {
			_modalHistory = [];
		  } else if (_modalHistory.indexOf(modalName) !== -1) {
			_modalHistory = _modalHistory.splice(0, modalHistory.indexOf(modalName) + 1);
		  } else {
			_modalHistory.push(modalName);
		}

		setModalHistory(..._modalHistory);
		setActiveModal(modalName);
		console.log("modalName = ", modalName);
	}

	const modalBack = () => {
		setActiveModal(modalHistory[modalHistory.length - 2]);
	};

	const modal = (
		<ModalRoot activeModal={activeModal}>
			<Filters isMobile={isMobile} setActiveModal={_setActiveModal} modalBack={modalBack}/>
			<SelectCity isMobile={isMobile} setActiveModal={_setActiveModal} modalBack={modalBack}/>
		</ModalRoot>
	);

	return (
	  <AppRoot>
		<SplitLayout modal={modal} header={<PanelHeader separator={false}/>}>
		  <SplitCol spaced={viewWidth && viewWidth > ViewWidth.MOBILE}>
		  	<View activePanel={activePanel} popout={popout}>
				<Main id={ROUTES.MAIN} go={go} setActiveModal={_setActiveModal}/>
				<CardInfo id={ROUTES.CARDINFO} go={go}/>
				<Favorites id={ROUTES.FAVORITES} go={go} setActiveModal={_setActiveModal}/>
			</View>
		  </SplitCol>
		</SplitLayout>
	  </AppRoot>
	);
  };

  
export default App;

  
