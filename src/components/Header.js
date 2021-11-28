import React from 'react';
import { 
	PanelHeader,
	PanelHeaderButton,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { Icon20SlidersOutline} from '@vkontakte/icons';

const Header = () => {
	return (
        <PanelHeader
        left={<PanelHeaderButton><Icon20SlidersOutline/></PanelHeaderButton>}
        >
        AbitIn
        </PanelHeader>
	);
  };

  
export default Header;
