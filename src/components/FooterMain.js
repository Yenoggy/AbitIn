import React, {useState} from 'react';
import { 
	Tabbar,
	TabbarItem,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { Icon24FavoriteOutline, Icon24Search} from '@vkontakte/icons';
import PropTypes from "prop-types";


const FooterMain = ({go, selectedText}) => {

    return (
          <Tabbar style={{position: ''}} itemsLayout="vertical">
          <TabbarItem selected={selectedText === 'search'} 
          data-to="main" onClick={go} text="Поиск"><Icon24Search/></TabbarItem>

          <TabbarItem selected={selectedText === 'favorites'} data-to="favorites" onClick={go} text="Избранное"><Icon24FavoriteOutline/></TabbarItem>
          </Tabbar>
    );
  };

FooterMain.propTypes = {
    go: PropTypes.func.isRequired,
    selectedText: PropTypes.string.isRequired,
};
export default FooterMain;
