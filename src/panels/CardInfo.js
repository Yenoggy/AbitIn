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
    Button,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import HeaderBack from '../components/HeaderBack';
import SmallCard from '../components/SmallCard';
import FooterMain from '../components/FooterMain';

import {Icon24CheckSquareOutline} from '@vkontakte/icons';
import {Icon24CheckBoxOff} from '@vkontakte/icons';

const CardInfo = ({id, go, selectedCard, getUnicFavoritesIds, panelBack, addToFavorites, removeFromFavorites, setActiveBottomType, activeBottomType}) => {
    const [card, setCardData] = useState(null);

    // Определяет находится ли пользователь в избранных и просматривает свою карточку из избранного
    const isInFavorites = () => activeBottomType === 'favorites';

    useEffect(() => {
        console.log('isInFavorites, 11', isInFavorites(), (isInFavorites() && getUnicFavoritesIds().indexOf(selectedCard) == -1));
        async function getData() {
            try {
                const response = await fetch(SERVER_API + `/GetInfo?Id=${selectedCard}`,{
                    method: "POST",
                    mode: 'cors',
                });
                const data = await response.json();
                setCardData(...data);
            } catch(error) {
                console.error('ERROR in fetch GetInfo CardInfo', error);
            }
        }

        if (selectedCard >= 0) {
            getData();
        }

    }, []);
    
    return (
        <Panel id={id}>
            <HeaderBack go={go} panelBack={panelBack}/>
            <Group>
                {card &&
                    <Div>
                        <Group>
                            <Gallery slideWidth="100%" style={{marginBottom: 16}}>
                                <img src={card.imgurl} alt="Фото ВУЗа" style={{borderRadius: 10}}/>
                            </Gallery>
                            <Title level="1" weight="bold" style={{marginBottom: 6}}>{card.name}</Title>
                            <Headline weight="semibold">Обучение от {card.mincost} ₽ в год</Headline>

                            {/* Если просто открыл карточку не из избранного 
                            или Если карточка из избранного и пользователь только что удалил её оттуда*/}
                            {!isInFavorites()  || (isInFavorites() && getUnicFavoritesIds().indexOf(selectedCard) == -1) &&
                                <Button size="m" id='add-favorites-btn' style={{marginTop:5}} onClick={(e) => {
                                    addToFavorites(selectedCard);
                                    document.querySelector('#add-favorites-btn').style.display = 'none';
                                }}>В избранное</Button>
                            }


                            {/* Если карточка из избранного и можно удалить её*/}
                            {isInFavorites() && getUnicFavoritesIds().indexOf(selectedCard) !== -1 &&
                                <Button size="m" id='add-favorites-btn' style={{marginTop:5}} onClick={(e) => {
                                    removeFromFavorites(selectedCard);
                                    document.querySelector('#add-favorites-btn').style.display = 'none';
                                }}>Убрать из избранного</Button>
                            }


                        </Group>
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
                            {card.extra && Object.keys(card.extra).map((linkName, index) =>
                                <Link key={index} href={card.extra[linkName]} target="_blank">
                                    {linkName}
                                    <Spacing/>
                                </Link>
                            )
                            }
                        </Group>

                        <Spacing separator="bottom" size={12}/>
                    </Div>
                }

            </Group>
            <FooterMain go={go} setActiveBottomType={setActiveBottomType} selectedText={activeBottomType}/>
        </Panel>
    );
};

CardInfo.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    selectedCard: PropTypes.number.isRequired,
    panelBack: PropTypes.func.isRequired,
    addToFavorites: PropTypes.func.isRequired,
    removeFromFavorites: PropTypes.func.isRequired,
    setActiveBottomType: PropTypes.func.isRequired,
    activeBottomType: PropTypes.string.isRequired,
    getUnicFavoritesIds: PropTypes.func.isRequired,
};

export default CardInfo;

  