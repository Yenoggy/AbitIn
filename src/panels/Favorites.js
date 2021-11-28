import React from 'react';
import { 
    ContentCard
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';

import HeaderSlider from '../components/HeaderSlider';
import FooterMain from '../components/FooterMain';

const Favorites = ({id, go}) => {
	return (
      <Panel id={id}>
          <HeaderSlider/>
          <Search/>

          <FooterMain/>
      </Panel>
	);
  };

Favorites.propTypes = {
    id: PropTypes.number.isRequired,
    go: PropTypes.func.isRequired,
}; 
export default Favorites;