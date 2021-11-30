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
    SelectMimicry,
    Input,
    SelectModal,
    Headline,
    Select
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';

const Filters = ({isMobile, setActiveModal, modalBack}) => {
    const textInput = React.createRef();
    const clear = () => textInput.current.value = '';

	return (
        <ModalPage
            id="filters"
            onClose={modalBack}
            header={
            <ModalPageHeader
                left={isMobile && <PanelHeaderClose onClose={modalBack} />}
                right={<PanelHeaderSubmit onClose={modalBack} />}
            >
                Фильтры
            </ModalPageHeader>
            }
        >
            <Group>
            <FormItem top="Специализация">
                <Input getRef={textInput} type="text" defaultValue="Специализация" after={<IconButton hoverMode="opacity" aria-label="Очистить поле" onClick={clear}><Icon16Clear/></IconButton>} />
            </FormItem>

            <FormItem top="Город">            
                <SelectMimicry placeholder="Выбрать город" data-modal="select-city" onClick={setActiveModal} />
            </FormItem>

            <FormItem top="Баллы">
                <FormLayoutGroup mode="horizontal">
                    <FormItem top="Минимальные">            
                        <Input />
                    </FormItem>
                    <FormItem top="Средние">            
                        <Input />
                    </FormItem>
                </FormLayoutGroup>
            </FormItem>

            <FormItem top="Дополнительно">
                <Cell role={null} defaultChecked disabled after={<Switch aria-label="Военная кафедра" />}>
                    Военная кафедра
                </Cell>
                <Cell role={null} defaultChecked disabled after={<Switch defaultChecked aria-label="Общежитие" />}>
                    Общежитие
                </Cell>
            </FormItem>


            </Group>
        </ModalPage>
    );
  };

Filters.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    setActiveModal: PropTypes.func.isRequired,
    modalBack: PropTypes.func.isRequired,
};  
export default Filters;