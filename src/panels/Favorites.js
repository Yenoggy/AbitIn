import React, { useState, useEffect }from 'react';
import { 
    Placeholder,
    Panel,
    Search
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';

import HeaderSlider from '../components/HeaderSlider';
import FooterMain from '../components/FooterMain';

import BigStar from '../img/bigstar.svg';

import { Icon20StarCircleFillGray } from '@vkontakte/icons';


const Favorites = ({id, go}) => {
    const [isHaveFavorites, setFavorites] = useState(false);

	return (
      <Panel id={id}>
          <HeaderSlider/>
          <Search/>
          {!isHaveFavorites &&
            <Placeholder
                icon={<Icon20StarCircleFillGray width={154.74} height={
                    148.61}/>}
                >
                Нет избранных вузов
            </Placeholder>
          }
          <FooterMain go={go} selectedText="favorites" />
      </Panel>
	);
  };

Favorites.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
}; 

export default Favorites;
