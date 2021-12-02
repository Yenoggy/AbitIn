import React from 'react';
import {
    ContentCard
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';

const SmallCard = ({id, img, name, description, address, go, to, setSelectedCard}) => {
    return (
        <div data-to={to}>
            <ContentCard data-to={to} onClick={e => {
                if (to !== ROUTES.CARDINFO) return;
                setSelectedCard(id);
                e.currentTarget.dataset.to = to; // удалить
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
        </div>

);
};

SmallCard.propTypes = {
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};
export default SmallCard;