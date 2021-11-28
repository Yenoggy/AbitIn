import React from 'react';
import { 
    ContentCard
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';

const SmallCard = ({id, img, name, description, address, go}) => {
	return (
        <ContentCard onClick={go} data-to="card" 
            src={img}
            header={name}
            text={description}
            caption={address}
            maxHeight={500}
            >
        </ContentCard>
	);
  };

SmallCard.propTypes = {
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
}; 
export default SmallCard;