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
	Link
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import HeaderBack from '../components/HeaderBack';
import SmallCard from '../components/SmallCard';
import FooterMain from '../components/FooterMain';

import { Icon24CheckSquareOutline } from '@vkontakte/icons';
import { Icon24CheckBoxOff } from '@vkontakte/icons';
const CardInfo = ({id, go, selectedCard}) => {
	const [card, setCardData] = useState({
		name: "Университет ИТМО",
		img: "https://avatars.mds.yandex.net/i?id=a7709dbc6ddecde207a68c6286a03c9f-5607498-images-thumbs&n=13",
		costFrom: '100 000',
		milDepartment: true, // Военная кафедра
		hostel: false, // Общежитие
		linkNames: ["Страница факультетов на сайте", "Основная группа ВК"],
		links:["https://www.figma.com/file/6J1hEjVnvxqC7MCjwkBVM0/AbitIn-main?node-id=82%3A813", "https://github.com/nodenwwsfww/AbitIn/blob/main/VK_AbitIn/src/panels/Persik.js"],
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
			<HeaderBack go={go}/>
			<Group>
				<Div>
					<SmallCard id={selectedCard} img={card.img} name={card.name}/>
					<Separator style={{ margin: '12px 0' }} />
						<Text weight="regular" style={{ marginBottom: 12}}>Обучение от {card.costFrom} ₽ в год</Text>
					<Separator style={{ margin: '12px 0' }} />
					
					{card.milDepartment ?
						<CustomSelectOption disabled={true} style={{ background: 'var(--background_content)' }} after={<Icon24CheckSquareOutline/>}>Военная кафедра</CustomSelectOption>
						:
						<CustomSelectOption disabled={true} style={{ background: 'var(--background_content)' }} after={<Icon24CheckBoxOff/>}>Военная кафедра</CustomSelectOption>
					}

					{card.hostel ?
						<CustomSelectOption disabled={true} style={{ background: 'var(--background_content)' }} after={<Icon24CheckSquareOutline/>}>Общежитие</CustomSelectOption>
						:
						<CustomSelectOption disabled={true} style={{ background: 'var(--background_content)' }} after={<Icon24CheckBoxOff/>}>Общежитие</CustomSelectOption>
					}

					<Separator style={{ margin: '12px 0' }} />
					<Subhead weight="bold" style={{ marginBottom: 12 }}>Полезные ссылки</Subhead>
					
					{card.links && card.linkNames && (
						<Div>
							{card.links.map((link, index) => (
								<Link key={index} href={link} target="_blank">{card.linkNames[index]}</Link>
							))}
						</Div>
					)}
					<Separator style={{ margin: '12px 0' }} />
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
}; 

export default CardInfo;

  