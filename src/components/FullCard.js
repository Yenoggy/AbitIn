import React from 'react';
import { 
    ContentCard
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const SmallCard = ({key, img, name, description, address}) => {
	return (
        <ContentCard
            key={key}
            src={img}
            header={name}
            text={description}
            caption={address}
            maxHeight={500}
            >
        </ContentCard>
	);
  };

  
export default SmallCard;