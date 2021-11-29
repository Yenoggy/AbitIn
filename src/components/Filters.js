import React from 'react';
import { 
    PopoutWrapper,
    Headline,
    Select
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const Filters = () => {
	return (
        <PopoutWrapper alignY="center" alignX="center">
            <Headline weight="regular" style={{ marginBottom: 16 }}>Headline regular</Headline>
            <Select placeholder="Выберите пол">
                <option value="m">Мужской</option>
                <option value="f">Женский</option>
            </Select>
        </PopoutWrapper>
	);
  };

  
export default Filters;