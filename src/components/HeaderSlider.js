import React from 'react';
import { 
	PanelHeader,
	PanelHeaderButton,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import PropTypes from "prop-types";

import { Icon20SlidersOutline} from '@vkontakte/icons';
import Filters from '../components/Filters';

const HeaderSlider = ({changePopout}) => {
	return (
        <PanelHeader
        left={<PanelHeaderButton onClick={() => changePopout(Filters)}><Icon20SlidersOutline/></PanelHeaderButton>}
        >
        AbitIn
        </PanelHeader>
	);
  };

  
HeaderSlider.propTypes = {
  changePopout: PropTypes.func.isRequired,
};  
export default HeaderSlider;
