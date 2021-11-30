import React from 'react';
import { 
	PanelHeader,
	PanelHeaderButton,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import PropTypes from "prop-types";

import { Icon20SlidersOutline} from '@vkontakte/icons';

const HeaderSlider = ({setActiveModal}) => {
	return (
        <PanelHeader
        left={<PanelHeaderButton data-modal="filters" onClick={setActiveModal}><Icon20SlidersOutline/></PanelHeaderButton>}
        >
        AbitIn
        </PanelHeader>
	);
  };

  
HeaderSlider.propTypes = {
  setActiveModal: PropTypes.func.isRequired,
};  
export default HeaderSlider;
