import React, {useState} from 'react';
import { 
	Tabbar,
	TabbarItem,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { Icon24FavoriteOutline, Icon24Search} from '@vkontakte/icons';
import PropTypes from "prop-types";


const FooterMain = ({go, selectedText}) => {
    function set1(e) {
      go(e);
    }
    function set2(e) {
      go(e);
    }

    return (
          <Tabbar style={{position: ''}} itemsLayout="vertical">
          <TabbarItem selected={selectedText === 'search'} 
          data-to="main" onClick={set1} text="Поиск"><Icon24Search/></TabbarItem>

          <TabbarItem selected={selectedText === 'favorites'} data-to="favorites" onClick={set2} text="Избранное"><Icon24FavoriteOutline/></TabbarItem>
          </Tabbar>
    );
  };

FooterMain.propTypes = {
    go: PropTypes.func.isRequired,
    selectedText: PropTypes.string.isRequired,
};
export default FooterMain;
