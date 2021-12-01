import React, {useState, useEffect} from 'react';
import { 
	Group,
	CardGrid,
    ContentCard
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';
import SmallCard from './SmallCard';

const Cards = ({go, cards}) => {

	return (
        <Group>
            {cards && (
                <CardGrid size="l">
                {cards.map((card, index) => (
                    <div key={index}>
                        <SmallCard go={go}
                            id={card.id} img={card.img} name={card.name}
                            description={card.description} address={card.address}
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
