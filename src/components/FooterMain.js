import React, {useState} from 'react';
import { 
	Tabbar,
	TabbarItem,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { Icon24FavoriteOutline, Icon24Search} from '@vkontakte/icons';
import PropTypes from "prop-types";


const FooterMain = ({go}) => {
    const [text, setText] = useState('search');

    function set1(e) {
      setText('search'), go(e);
    }
    function set2(e) {
      setText('favorites'), go(e);
    }

    return (
          <Tabbar style={{position: ''}} itemsLayout="vertical">
          <TabbarItem selected={text === 'search'} 
          data-to="main" onClick={set1} text="Поиск"><Icon24Search/></TabbarItem>

          <TabbarItem selected={text === 'favorites'} data-to="favorites" onClick={set2} text="Избранное"><Icon24FavoriteOutline/></TabbarItem>
          </Tabbar>
    );
  };

FooterMain.propTypes = {
    go: PropTypes.func.isRequired,
};
export default FooterMain;
