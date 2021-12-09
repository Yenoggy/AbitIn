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


const SelectCity = ({id, isMobile, setActiveModal, modalBack}) => {

    const [cities, setCities] = useState([]);
    useEffect(async () => {
        try {
            let response = await fetch(`https://api.vk.com/method/database.getCities?access_token=${vkToken}&country_id=1&need_all=1&count=1000&v=5.81?lang=ru`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                credentials: "same-origin"
            });

            const data = JSON.parse(response);
            setCities(data.map(d => {
                d.id, d.title
            }));
        } catch (error) {
            console.error(error);
        }
    });

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
                <FormLayoutGroup>
                    {cities.map(city => {
                        return (
                            <Radio key={city.id} name="city" value={city.id}>{city.title}</Radio>
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