import React from 'react';
import {
    PanelHeader,
    PanelHeaderButton,
    PanelHeaderBack,
    Avatar,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import PropTypes from "prop-types";

const HeaderBack = ({go, panelBack}) => {

    return (
        <PanelHeader separator={false} left={<PanelHeaderBack onClick={e => {
            console.log('333');
            panelBack();
        }}/>}>
            AbitIn
        </PanelHeader>
    );
};

HeaderBack.propTypes = {
    go: PropTypes.func.isRequired,
    panelBack: PropTypes.func.isRequired,
};

export default HeaderBack;
