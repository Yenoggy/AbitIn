import React, {useState, useEffect} from 'react';
import {
    ModalRoot,
    ModalPage,
    ModalPageHeader,
    PanelHeaderSubmit,
    PanelHeaderClose,
    PanelHeaderButton,
    FormItem,
    Group,
    PanelHeaderBack,
    SelectMimicry,
    Input,
    Radio,
    SelectModal,
    FormLayoutGroup,
    Headline,
    Select
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';


const SelectCity = ({id, isMobile, setActiveModal, modalBack, selectedCityName, setSelectedCityName}) => {
    const [cities, setCities] = useState([
        {
            id: 0,
            title: "Москва"
        }
        ,
        {
            id: 1,
            title: "Санкт-Петербург"
        }
    ]);

    const setCity = ({target}) => setSelectedCityName(target.value);
    return (

        <ModalPage
            id={id}
            onClose={modalBack}
            header={
                <ModalPageHeader
                    left={<PanelHeaderBack label="Назад" onClick={modalBack}/>}
                >
                    Выберите город
                </ModalPageHeader>
            }
            settlingHeight={80}
        >
            <Group>
                <FormLayoutGroup onClick={setCity}>
                    {cities.map(city => {
                        return (
                            <Radio key={city.id} name="city" value={city.title}>{city.title}</Radio>
                        );
                    })}
                </FormLayoutGroup>
            </Group>
        </ModalPage>
    );
};

SelectCity.propTypes = {
    id: PropTypes.string.isRequired,
    isMobile: PropTypes.bool.isRequired,
    setActiveModal: PropTypes.func.isRequired,
    modalBack: PropTypes.func.isRequired,
};
export default SelectCity;