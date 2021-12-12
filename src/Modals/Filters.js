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
import {Icon16Clear, Icon16Add} from '@vkontakte/icons';
import {Icon16ChevronOutline} from '@vkontakte/icons';

const Filters = ({id, isMobile, setActiveModal, closeModals, setFilteredCards, selectedCityName, setSelectedCityName,}) => {
    const [resultsCount, setResultsCount] = useState(3);
    const [military, setMilitary] = useState(false);
    const [hostel, setHostel] = useState(false);

    const [minPoints, setMinPoints] = useState(100);
    const [averagePoints, setAveragePoints] = useState(200);

    useEffect(() => {
        if (selectedCityName) countAndUpdateResults();
    });

    const textInput = React.createRef();
    const clear = () => textInput.current.value = '';

    const checkChanges = ({target}) => {
        console.dir(target);
        countAndUpdateResults();
    };

    const countAndUpdateResults = () => {
        //
        console.log("Результаты должны были обновиться");
    };

    const exitFilters = () => {
        setSelectedCityName(null);
        closeModals();
    };

    const getCardsByFilters = () => {
        return [];
    };

    const showResults = () => {
        const cards = getCardsByFilters();
        setFilteredCards(cards);
        setSelectedCityName(null);
        console.log("Типа результаты");
    };

    return (
        <ModalPage
            id={id}
            onClose={exitFilters}
            onChange={checkChanges}
            header={
                <ModalPageHeader
                    left={isMobile && <PanelHeaderClose onClick={exitFilters}/>}
                    right={<PanelHeaderSubmit onClick={exitFilters}/>}
                >
                    Фильтры
                </ModalPageHeader>
            }
        >
            <Group>
                <FormLayout>
{/*                     <FormItem top="Специализация">
                        <Input getRef={textInput} type="text" defaultValue="Специализация"
                               after={<IconButton hoverMode="opacity" aria-label="Очистить поле"
                                                  onClick={clear}><Icon16Clear/></IconButton>}/>
                    </FormItem> */}

                    <FormItem top="Город">
                        <SelectMimicry id="select-city" placeholder="Выбрать город" data-modal="select-city" onClick={setActiveModal}>
                            {selectedCityName}
                        </SelectMimicry>
                    </FormItem>

                    <FormItem top="Баллы" style={{marginBottom: '-25px'}}>
                    </FormItem>
                    <FormLayoutGroup mode="horizontal" style={{marginTop: '0'}}>
                        <FormItem top="Минимальные">
                            <Input 
                            id="min-points"
                            value={minPoints} 
                                onChange={({target}) => setMinPoints(target.value)} 
                            />
                        </FormItem>
                        <FormItem top="Средние">
                            <Input 
                            id="average-points"
                            value={averagePoints} 
                                onChange={({target}) => setAveragePoints(target.value)} 
                            />
                        </FormItem>
                    </FormLayoutGroup>

                    <FormItem top="Дополнительно">
                        <Cell style={{marginLeft: 0}} role={null} defaultChecked disabled
                              after={
                                <Switch 
                                    id="military" value={military} 
                                    onChange={({target}) => setMilitary(target.value)} 
                                    aria-label="Военная кафедра"/>
                              }>
                            Военная кафедра
                        </Cell>
                        <Cell style={{marginLeft: 0}} role={null} defaultChecked disabled
                              after={
                                <Switch id="hostel" value={hostel} 
                                onChange={({target}) => setHostel(target.value)} 
                                aria-label="Общежитие"/>
                              }>
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
                            onClick={showResults}
                            stretched style={{marginRight: 8}}>
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
    closeModals: PropTypes.func.isRequired,
    setActiveModal: PropTypes.func.isRequired,
    setFilteredCards: PropTypes.func.isRequired,
};
export default Filters;