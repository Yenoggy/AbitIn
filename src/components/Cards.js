import React, {useState, useEffect} from 'react';
import {
    Group,
    CardGrid,
    ContentCard, Spacing, Button
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';
import SmallCard from './SmallCard';

const Cards = ({go, cards, setSelectedCard, addToFavorites}) => {

    return (
        <Group>
            {cards && (
                <CardGrid size="l">
                    {cards.map((card, index) => (
                        <div key={index} style={{marginBottom: 8}}>
                            <SmallCard key={index} go={go}
                                       id={card.id} img={card.img} name={card.name}
                                       description={card.description} address={card.address} toOnClick={ROUTES.CARDINFO}
                                       setSelectedCard={setSelectedCard} addToFavorites={addToFavorites}
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
    setSelectedCard: PropTypes.func.isRequired,
    addToFavorites: PropTypes.func.isRequired,
};
export default Cards;
