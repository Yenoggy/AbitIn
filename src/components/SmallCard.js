import React from 'react';
import {
    Button,
    ContentCard,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';

const SmallCard = ({id, img, name, description, go, toOnClick, setSelectedCard, addToFavorites}) => {
    return (
        <div data-to={toOnClick}>
            <ContentCard data-to={toOnClick} onClick={e => {
                if (toOnClick !== ROUTES.CARDINFO) return;
                setSelectedCard(id);
                e.currentTarget.dataset.to = toOnClick; // удалить
                go(e);
            }
            }
                src={img}
                header={name}
                text={description}
                caption={
                    <Button size="m" style={{marginTop:1}} onClick={(e) => {
                        console.log('нажал');
                        addToFavorites(id);
                    }}>В избранное</Button>
                }
                maxHeight={500}
            >
            </ContentCard>
        </div>

);
};

SmallCard.propTypes = {
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    addToFavorites: PropTypes.func.isRequired,
};
export default SmallCard;