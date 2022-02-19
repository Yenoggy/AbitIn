import React from 'react';
import {
    PanelHeader,
    PanelHeaderButton,
    Avatar,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import PropTypes from "prop-types";

import {Icon28SlidersOutline} from '@vkontakte/icons';

const HeaderFilter = ({setActiveModal}) => {

    return (
        <PanelHeader separator={false}
                     left={<PanelHeaderButton data-modal="filters"
                                              onClick={setActiveModal}><Icon28SlidersOutline/></PanelHeaderButton>}
                     right={<Avatar size={100}/>}
        >
            AbitIn
        </PanelHeader>
    );
};


// HeaderFilter.propTypes = {
//     setActiveModal: PropTypes.func.isRequired,
// };
export default HeaderFilter;
