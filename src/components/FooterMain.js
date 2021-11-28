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
	return (
        <Tabbar style={{position: ''}} itemsLayout="vertical">
        <TabbarItem selected={text === 'search'} 
        onClick={go} onClick={() => setText('search')} text="Поиск"><Icon24Search/></TabbarItem>

        <TabbarItem selected={text === 'favorites'} onClick={() => setText('favorites')} text="Избранное"><Icon24FavoriteOutline/></TabbarItem>
        </Tabbar>
	);
  };

FooterMain.propTypes = {
    go: PropTypes.func.isRequired,
};
export default FooterMain;
