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
    selectedCityName, setSelectedCityName,  mildep, setMildep,dorm,setDorm,minPoints,setMinPoints, maxPoints,setMaxPoints}) => {
    const [resultsCount, setResultsCount] = useState(0);
    const [selectedExams, setSelectedExams] = useState(exams.slice(0, 1));

    const [tempCards, setTempCards] = useState(null);
    const getCardsByFilters = async () => {
        let data;
        try {
            let specString = "";
            for (let i = 0; i < selectedExams.length; i++) {
                specString += "&";
                specString += `spec[${i}]=${selectedExams[i].value}`;
            }
            
            let requestText;
            
            let minscore = minPoints;
            let avgscore = maxPoints;
            if (!Number.isInteger(minPoints)) minscore = 0;
            if (!Number.isInteger(maxPoints)) avgscore = 1000;

            if (selectedCityName) requestText = SERVER_API + 
            `/MainInfo?mildep=${mildep}&dorm=${dorm}&city[0]=${selectedCityName}&minscore=${minscore}&avgscore=${avgscore}${specString}`;
            else requestText = SERVER_API + 
            `/MainInfo?mildep=${mildep}&dorm=${dorm}&minscore=${minscore}&avgscore=${avgscore}${specString}`;

            console.log(requestText);
            const res = await fetch(requestText,
                {
                    method: "POST",
                    mode: 'cors',
            }
            );
            data = await res.json(); 
            setTempCards(data); 
        } catch(error) {
            console.error('Ошибка SERVER-API getCardsByFilters', error);
        } 
        return data;
    };
    useEffect(() => {
    if (selectedCityName && selectedExams) {
        countAndUpdateResults();
    }
    }, [minPoints, maxPoints, dorm, mildep, selectedCityName, selectedExams])

    
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
    const countAndUpdateResults = async () => {
        //
        try {
            const cards = await getCardsByFilters(selectedExams);
            setResultsCount(cards.length);
        } catch (error) {
            console.error('Ошибка getCardsByFilters (в countAndUpdateResults)', error);
        }
    };

    const showResults = (event) => {
        setFilteredCards(tempCards);
        setSelectedCityName(null);
        setSelectedExams(exams.slice(0, 2));
        exitFilters();
    };
    return (
        <ModalPage
            id={id}
            onClose={exitFilters}
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
                                onInput={({target}) => setMinPoints(+target.value) }
                            />
                        </FormItem>
                        <FormItem top="Максимальные">
                            <Input 
                            id="max-points"
                            value={maxPoints} 
                                onInput={({target}) => setMaxPoints(+target.value)
                                } 
                            />
                        </FormItem>
                    </FormLayoutGroup>

                    <FormItem top="Дополнительно">
                        {mildep &&
                            <Cell style={{marginLeft: 0}} role={null} disabled
                                after={

                                    <>
                                        <Switch 
                                            id="mildep" checked
                                            onChange={({target}) => {
                                                setMildep(target.checked)
                                                }
                                            } 
                                            aria-label="Военная кафедра"
                                        />
                                    </>
                                }>
                                Военная кафедра
                            </Cell>
                        }
                        {!mildep &&
                            <Cell style={{marginLeft: 0}} role={null} disabled
                                after={

                                    <>
                                        <Switch 
                                            id="mildep"
                                            onChange={({target}) => 
                                                setMildep(target.checked)
                                            } 
                                            aria-label="Военная кафедра"
                                        />
                                    </>
                                }>
                                Военная кафедра
                            </Cell>
                        }
                        {dorm &&
                            <Cell style={{marginLeft: 0}} role={null} disabled
                            after={

                                <>
                                    <Switch 
                                        id="dorm" checked
                                        onChange={({target}) => {
                                            setDorm(target.checked)
                                        }
                                        } 
                                        aria-label="Общежитие"
                                    />
                                </>
                            }>
                            Общежитие
                        </Cell>
                        }
                        {!dorm &&
                            <Cell style={{marginLeft: 0}} role={null} disabled
                                after={

                                    <>
                                        <Switch 
                                            id="dorm"
                                            onChange={({target}) => {                                      
                                                setDorm(target.checked)
                                            }
                                            } 
                                            aria-label="Общежитие"
                                        />
                                    </>
                                }>
                                Общежитие
                            </Cell>
                        }
                    </FormItem>
                    <Div>
                        <Button
                            before={<Icon16Add/>}
                            after={
                                selectedCityName && 
                                <>
                                    <Counter>
                                        {resultsCount}
                                    </Counter>
                                </>
                            }
                            size="l"
                            onClick={showResults} data-modal=""
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