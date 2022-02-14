import React, {useState, useEffect} from 'react';
import {
    Group,
    CardGrid,
    ContentCard, Spacing, Button
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';
import SmallCard from './SmallCard';

const Cards = ({go, cards, setSelectedCard}) => {

    return (
        <Group>
            {cards && (
                <CardGrid size="l">
                    {cards.map((card, index) => (
                        <div key={index} style={{marginBottom: 8}}>
                            <SmallCard key={index} go={go}
                                       id={card.id} img={card.imgurl} name={card.name}
                                       description={`От ${card.mincost} рублей в год`} address={card.address} toOnClick={ROUTES.CARDINFO}
                                       setSelectedCard={setSelectedCard}
                            />
                        </div>
                    ))}

                </CardGrid>
            )}
        </Group>
    );
};

Cards.propTypes = {
    go: PropTypes.func.isRequired,
    cards: PropTypes.array.isRequired,
};
export default Cards;
