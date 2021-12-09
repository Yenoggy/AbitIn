import React, {useState, useEffect} from 'react';
import { 
    ModalRoot,
    ModalPage,
    ModalPageHeader,
    PanelHeaderSubmit,
    PanelHeaderClose,
    PanelHeaderButton,
    PanelHeaderBack,
    FormItem,
    Group,
    PanelHeaderContent,
    SelectMimicry,
    Cell,
    Switch,
    Counter,
    Input,
    Button,
    SelectModal,
    FormLayout,
    FormLayoutGroup,
    IconButton,
    Spacing,
    Headline,
    Text,
    Select,
    Div,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';
import { Icon16Clear, Icon16Add } from '@vkontakte/icons';
import { Icon16ChevronOutline } from '@vkontakte/icons';
const Filters = ({id, isMobile, setActiveModal, modalBack}) => {
    const textInput = React.createRef();
    const clear = () => textInput.current.value = '';

    const [resultsCount, setResultsCount] = useState(3);

	return (
        <ModalPage
            id={id}
            onClose={modalBack}
            header={
                <ModalPageHeader
                    left={isMobile && <PanelHeaderClose onClick={modalBack} />}
                    right={<PanelHeaderSubmit onClick={modalBack} />}
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

                        <FormItem top="Баллы" style={{ marginBottom: '-25px'}}>
                        </FormItem>
                        <FormLayoutGroup mode="horizontal" style={{ marginTop: '0'}}>
                                <FormItem top="Минимальные">            
                                    <Input />
                                </FormItem>
                                <FormItem top="Средние">            
                                    <Input />
                                </FormItem>
                        </FormLayoutGroup>

                    <FormItem top="Дополнительно">
                        <Cell style={{marginLeft: 0}} role={null} defaultChecked disabled after={<Switch aria-label="Военная кафедра" />}>
                            Военная кафедра
                        </Cell> 
                        <Cell style={{marginLeft: 0}} role={null} defaultChecked disabled after={<Switch defaultChecked aria-label="Общежитие" />}>
                            Общежитие
                        </Cell>
                    </FormItem>
                    <Div>
                        <Button 
                            before={<Icon16Add/>} 
                            after={ 
                                <>
                                    <Counter>
                                        {resultsCount}
                                    </Counter>
                                </>
                            }
                            size="l" 
                            stretched style={{ marginRight: 8 }}>
                            Показать результаты
                        </Button>
                    </Div>
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