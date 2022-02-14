import React, {useState} from 'react';
import {
    Tabbar,
    TabbarItem,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import {Icon24FavoriteOutline, Icon24Search} from '@vkontakte/icons';
import PropTypes from "prop-types";


const FooterMain = ({go, selectedText, setActiveBottomType}) => {

    return (
        <Tabbar style={{position: ''}} itemsLayout="vertical">
            <TabbarItem selected={selectedText === "search"}
                        data-to={ROUTES.MAIN} onClick={(event) => {
                            setActiveBottomType("search");
                            go(event);
                        }} text="Поиск"><Icon24Search/></TabbarItem>

            <TabbarItem selected={selectedText === "favorites"} data-to={ROUTES.FAVORITES} onClick={(event) => {
                setActiveBottomType("favorites");
                go(event);
            }}
                        text="Избранное"><Icon24FavoriteOutline/></TabbarItem>
        </Tabbar>
    );
};

FooterMain.propTypes = {
    go: PropTypes.func.isRequired,
    selectedText: PropTypes.string.isRequired,
    setActiveBottomType: PropTypes.func.isRequired,
};
export default FooterMain;
