import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, PanelHeaderButton, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import { Icon24Search } from '@vkontakte/icons';
import { Icon16StarCircle } from '@vkontakte/icons';

const MainFooter = () => (
	<Group header={<Header mode="secondary"></Header>}>
		<Div>
			<PanelHeader mode="secondary"
				left={<PanelHeaderButton><Icon24Search/></PanelHeaderButton>}
				right={<PanelHeaderButton><Icon24Search/></PanelHeaderButton>}
			/>
		</Div>
	</Group>
);

export default MainFooter;
