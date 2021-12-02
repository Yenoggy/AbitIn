import React from 'react';
import {
    PanelHeader,
    PanelHeaderButton,
    PanelHeaderBack,
    Avatar,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import PropTypes from "prop-types";

const HeaderBack = ({go}) => {

    return (
        <PanelHeader separator={false} left={<PanelHeaderBack data-to="main" onClick={go} />}>
            AbitIn
        </PanelHeader>
    );
};

HeaderBack.propTypes = {
    go: PropTypes.func.isRequired,
};

export default HeaderBack;
