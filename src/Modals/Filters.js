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
    Cell,
    Switch,
    Input,
    SelectModal,
    FormLayout,
    FormLayoutGroup,
    IconButton,
    Headline,
    Select,
    Div,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';
import { Icon16Clear } from '@vkontakte/icons';
const Filters = ({id, isMobile, setActiveModal, modalBack}) => {
    const textInput = React.createRef();
    const clear = () => textInput.current.value = '';

	return (
        <ModalPage
            id={id}
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
                <FormLayout>
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
                    <Div>
                            <Cell role={null} defaultChecked disabled after={<Switch aria-label="Военная кафедра" />}>
                                Военная кафедра
                            </Cell>
                            <Cell role={null} defaultChecked disabled after={<Switch defaultChecked aria-label="Общежитие" />}>
                                Общежитие
                            </Cell>
                    </Div>
                    </FormItem>
                </FormLayout>
                
            </Group>
        </ModalPage>
    );
  };

Filters.propTypes = {
    id: PropTypes.string.isRequired,
    isMobile: PropTypes.bool.isRequired,
    setActiveModal: PropTypes.func.isRequired,
    modalBack: PropTypes.func.isRequired,
};  
export default Filters;