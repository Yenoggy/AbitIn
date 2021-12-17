import React, {useState, useEffect} from 'react';
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
    Headline,
    Div,
    Text,
    CustomSelectOption,
    Avatar,
    Subhead,
    Spacing,
    Link, Gallery, Title,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import HeaderBack from '../components/HeaderBack';
import SmallCard from '../components/SmallCard';
import FooterMain from '../components/FooterMain';

import {Icon24CheckSquareOutline} from '@vkontakte/icons';
import {Icon24CheckBoxOff} from '@vkontakte/icons';

const CardInfo = ({id, go, selectedCard, panelBack}) => {
    const [card, setCardData] = useState({
        name: "Университет ИТМО",
        img: "https://avatars.mds.yandex.net/i?id=a7709dbc6ddecde207a68c6286a03c9f-5607498-images-thumbs&n=13",
        mincost: '100 000',
        avgscore: '0',
        mildep: true, // Военная кафедра
        dorm: false, // Общежитие,
        city: "Санкт-Петербург",
        id: 1,
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
            try {
                const jsonData = await fetch(SERVER_API + `/GetInfo?Id=${id}`);
                const data = JSON.parse(jsonData);
                setCardData(data); 
            } catch(error) {
                console.error(error);
            }
        }
    })
    return (
        <Panel id={id}>
            <HeaderBack go={go} panelBack={panelBack}/>
            <Group>
                <Div>
                    {/*База о ВУЗе*/}
                    <Group>
                        {/*Галерея фотографий ВУЗа*/}
                        <Gallery slideWidth="100%" style={{marginBottom: 16}}>
                            <img src={card.imgurl} alt="Фото ВУЗа" style={{borderRadius: 10}}/>
                        </Gallery>
                        {/*Название ВУЗа*/}
                        <Title level="1" weight="bold" style={{marginBottom: 6}}>{card.name}</Title>
                        {/*Прайс*/}
                        <Headline weight="semibold">Обучение от {card.mincost} ₽ в год</Headline>
                    </Group>
                    {/*Секция с особенностями*/}
                    <Group>
                        {card.mildep ?
                            <CustomSelectOption style={{marginLeft: -12, background: 'var(--background_content)'}}
                                                after={<Icon24CheckSquareOutline/>}>Военная кафедра</CustomSelectOption>
                            :
                            <CustomSelectOption style={{marginLeft: -12, background: 'var(--background_content)'}}
                                                after={<Icon24CheckBoxOff/>}>Военная кафедра</CustomSelectOption>
                        }

                        {card.dorm ?
                            <CustomSelectOption style={{marginLeft: -12, background: 'var(--background_content)'}}
                                                after={<Icon24CheckSquareOutline/>}>Общежитие</CustomSelectOption>
                            :
                            <CustomSelectOption style={{marginLeft: -12, background: 'var(--background_content)'}}
                                                after={<Icon24CheckBoxOff/>}>Общежитие</CustomSelectOption>
                        }
                    </Group>
                    {/*Полезные ссылки*/}
                    <Group>
                        <Title level="2" weight="heavy" style={{marginBottom: 12}}>Полезные ссылки</Title>
                        {/*<Subhead weight="bold" style={{marginBottom: 12}}>Полезные ссылки</Subhead>*/}
                        {card.links && Object.keys(card.links).map((linkName, index) =>
                            <Link key={index} href={card.links[linkName]} target="_blank">
                                {linkName}
                                <Spacing/>
                            </Link>
                        )
                        }
                    </Group>

                    <Spacing separator="bottom" size={12}/>
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

  