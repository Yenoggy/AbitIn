import React from 'react';
import {
    Button,
    ContentCard
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';

const SmallCard = ({id, img, name, description, address, go, toOnClick, setSelectedCard}) => {
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
                caption={address}
                maxHeight={500}
            >
            </ContentCard>
            <Button>В избранное</Button>
        </div>

);
};

SmallCard.propTypes = {
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};
export default SmallCard;