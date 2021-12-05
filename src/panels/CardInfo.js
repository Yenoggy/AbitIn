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
	Separator,
	Caption,
	Div,
	Text,
	CustomSelectOption,
	Avatar,
	Subhead,
	Spacing,
	Link
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import HeaderBack from '../components/HeaderBack';
import SmallCard from '../components/SmallCard';
import FooterMain from '../components/FooterMain';

import { Icon24CheckSquareOutline } from '@vkontakte/icons';
import { Icon24CheckBoxOff } from '@vkontakte/icons';
const CardInfo = ({id, go, selectedCard, panelBack}) => {
	const [card, setCardData] = useState({
		name: "Университет ИТМО",
		img: "https://avatars.mds.yandex.net/i?id=a7709dbc6ddecde207a68c6286a03c9f-5607498-images-thumbs&n=13",
		mincost: '100 000',
		milDepartment: true, // Военная кафедра
		hostel: false, // Общежитие,
		links: {
			"Страница факультетов на сайте": "https://www.figma.com/file/6J1hEjVnvxqC7MCjwkBVM0/AbitIn-main?node-id=82%3A813",
			"Основная группа ВК": "https://github.com/nodenwwsfww/AbitIn/blob/main/VK_AbitIn/src/panels/Persik.js"
		},
	});
	useEffect(() => {
		if (selectedCard >= 0) {
			fetchData();
		}

		async function fetchData() {
			/* const jsonData = await fetch("https://images.unsplash.com/photo-1603928726698-a015a1015d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&");
			const data = JSON.parse(jsonData);
			setCardData(data); */
		}
	})
	return (
        <Panel id={id}>
			<HeaderBack go={go} panelBack={panelBack}/>
			<Group>
				<Div>

					<SmallCard id={selectedCard} img={card.img} name={card.name}/>
					<Spacing separator size={16} />
					<Caption weight="regular" style={{ marginBottom: 12 }}>
						Обучение от {card.mincost} ₽ в год
					</Caption>
					<Spacing separator size={12} />
					<Group>
						{card.milDepartment ?
							<CustomSelectOption style={{ background: 'var(--background_content)' }} after={<Icon24CheckSquareOutline/>}>Военная кафедра</CustomSelectOption>
							:
							<CustomSelectOption style={{ background: 'var(--background_content)' }} after={<Icon24CheckBoxOff/>}>Военная кафедра</CustomSelectOption>
						}

						{card.hostel ?
							<CustomSelectOption style={{ background: 'var(--background_content)' }} after={<Icon24CheckSquareOutline/>}>Общежитие</CustomSelectOption>
							:
							<CustomSelectOption style={{ background: 'var(--background_content)' }} after={<Icon24CheckBoxOff/>}>Общежитие</CustomSelectOption>
						}
					</Group>
					<Group>
						<Subhead weight="bold" style={{ marginBottom: 12 }}>Полезные ссылки</Subhead>
						{card.links && Object.keys(card.links).map(linkName => {
							<Link href={card.links[linkName]} target="_blank">
								{linkName}
								<Spacing />
							</Link>
						})
						}
					</Group>
					
					<Spacing separator="bottom" size={12} />
				</Div>

			</Group>
            <FooterMain go={go} selectedText="search"/>
        </Panel>
	);
  };

  CardInfo.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	selectedCard: PropTypes.number.isRequired,
	panelBack: PropTypes.func.isRequired,
}; 

export default CardInfo;

  