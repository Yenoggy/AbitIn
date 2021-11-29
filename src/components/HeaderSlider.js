import React from 'react';
import { 
	PanelHeader,
	PanelHeaderButton,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import PropTypes from "prop-types";

import { Icon20SlidersOutline} from '@vkontakte/icons';
import Filters from '../components/Filters';

const HeaderSlider = ({changePopup}) => {
	return (
        <PanelHeader
        left={<PanelHeaderButton onClick={() => changePopup(Filters)}><Icon20SlidersOutline/></PanelHeaderButton>}
        >
        AbitIn
        </PanelHeader>
	);
  };

  
HeaderSlider.propTypes = {
  changePopup: PropTypes.func.isRequired,
};  
export default HeaderSlider;
