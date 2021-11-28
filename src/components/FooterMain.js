import React, {useState} from 'react';
import { 
	Tabbar,
	TabbarItem,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';

import { Icon24FavoriteOutline, Icon24Search} from '@vkontakte/icons';

const FooterMain = ({go}) => {
    const [text, setText] = useState('search');
	return (
        <Tabbar style={{position: ''}} itemsLayout="vertical">
        <TabbarItem data-to="main" selected={text === 'search'} onClick={(e) => {
          setText('search');
          go(e);
        }} text="Поиск"><Icon24Search/></TabbarItem>
        <TabbarItem data-to="main" selected={text === 'favorites'} 
        onClick={(e) => {
          setText('favorites');
          go(e);
        }
        } text="Избранное"><Icon24FavoriteOutline/></TabbarItem>
        </Tabbar>
	);
  };
FooterMain.propTypes = {
  go: PropTypes.func.isRequired,
}; 
  
export default FooterMain;
