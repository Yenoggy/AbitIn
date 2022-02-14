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
import { ChipsSelect } from '@vkontakte/vkui/dist/unstable';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';
import {Icon16Clear, Icon16Add} from '@vkontakte/icons';
import {Icon16ChevronOutline} from '@vkontakte/icons';

const exams = [
    {value: 'Р', label: 'Русский язык'}, 
    {value: 'М', label: 'Математика'}, 
    {value: 'ИК', label: 'Информатика',}, 
    {value: 'И', label: 'История',},
    {value: 'АЯ', label: 'Английский язык'}
];


const Filters = ({id, isMobile, setActiveModal, closeModals, setFilteredCards, 
    selectedCityName, setSelectedCityName}) => {
    const [resultsCount, setResultsCount] = useState(0);
    const [cards, setCards] = useState(null);
    const [mildep, setMildep] = useState(false);
    const [dorm, setDorm] = useState(false); // Общежитие

    const [minPoints, setMinPoints] = useState(100);
    const [maxPoints, setMaxPoints] = useState(200);

    const [selectedExams, setSelectedExams] = useState(exams.slice(0, 2));


    useEffect(() => {
        if (selectedCityName && selectedExams) countAndUpdateResults();
    });

    
    const exitFilters = () => {
        setSelectedCityName(null);
        closeModals();
    };

    const examsChipsProps = {
        value: selectedExams,
        onChange: setSelectedExams,
        options: exams,
        placeholder:"Не выбраны",
        creatable: true,
        creatableText: '',
    };


    const checkChanges = ({target}) => {
        console.dir('changes', target);
        countAndUpdateResults();
    };

    const countAndUpdateResults = async () => {
        //
        try {
            const cards = await getCardsByFilters();
            setResultsCount(cards.length);
        } catch (error) {
            console.error('Ошибка getCardsByFilters (в countAndUpdateResults)', error);
        }
    };


    const getCardsByFilters = async () => {
        let data;
        try {
            let specString = "";
            for (let i = 0; i < selectedExams.length; i++) {
                specString += "&";
                specString += `spec[${i}]=${selectedExams[i].value}`;
            }
            
            let requestText;
            if (selectedCityName) requestText = SERVER_API + 
            `/MainInfo?mildep=${mildep}&dorm=${dorm}&city[0]=${selectedCityName}&minscore=${minPoints}&avgscore=${maxPoints}${specString}`;
            else requestText = SERVER_API + 
            `/MainInfo?mildep=${mildep}&dorm=${dorm}&minscore=${minPoints}&avgscore=${maxPoints}${specString}`;

            console.log(requestText);
            const res = await fetch(requestText,
                {
                    method: "POST",
                    mode: 'cors',
            }
            );
            data = await res.json(); 
            console.log('data', data);
            setCards(data); 
        } catch(error) {
            console.error('Ошибка SERVER-API getCardsByFilters', error);
        } 
        return data;
    };

    const showResults = () => {
        setFilteredCards(cards);
        setSelectedCityName(null);
        setSelectedExams(exams.slice(0, 2));
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

                                        
                    <FormItem top="Выбрать предметы ЕГЭ">
                        <ChipsSelect {...examsChipsProps}/>
                    </FormItem>
                    
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
                        <FormItem top="Максимальные">
                            <Input 
                            id="max-points"
                            value={maxPoints} 
                                onChange={({target}) => setMaxPoints(target.value)} 
                            />
                        </FormItem>
                    </FormLayoutGroup>

                    <FormItem top="Дополнительно">
                        <Cell style={{marginLeft: 0}} role={null} defaultChecked disabled
                              after={
                                <Switch 
                                    id="mildep" value={mildep} 
                                    onChange={({target}) => setMildep(target.value)} 
                                    aria-label="Военная кафедра"/>
                              }>
                            Военная кафедра
                        </Cell>
                        <Cell style={{marginLeft: 0}} role={null} defaultChecked disabled
                              after={
                                <Switch id="dorm" value={dorm} 
                                onChange={({target}) => setDorm(target.value)} 
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