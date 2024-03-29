import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import bridge from '@vkontakte/vk-bridge';
import {
    useAdaptivity,
    usePlatform,
    VKCOM,
    ANDROID,
    IOS,
    AppRoot,
    SplitLayout,
    SplitCol,
    ViewWidth,
    View,
    ModalRoot,
    PanelHeader,
    ScreenSpinner,
    Snackbar,
    Avatar,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { Icon24Error } from '@vkontakte/icons';

import Main from './panels/Main';
import CardInfo from './panels/CardInfo';
import Favorites from './panels/Favorites';

import {STORAGE_KEYS} from './config';

//
import Filters from './Modals/Filters';
import SelectCity from './Modals/SelectCity';


const App = () => {

    const {viewWidth, sizeX} = useAdaptivity();
    const platform = usePlatform();
    const hasHeader = platform !== VKCOM;

    const isMobile = viewWidth <= ViewWidth.MOBILE;
    const isDesktop = (viewWidth >= ViewWidth.TABLET);

    const [fetchedUser, setUser] = useState(null);
    const [dataForSearch, setDataForSearch] = useState(null);
    const [userFavorites, setUserFavorites] = useState([]);
    const [selectedCard, setSelectedCard] = useState(-1);
    const [selectedCityName, setSelectedCityName] = useState("");
    const [filteredCards, setFilteredCards] = useState(null);

    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);
    const [snackbar, setSnackbar] = useState(false);


    const [panelHistory, setPanelHistory] = useState([ROUTES.MAIN]);
    const [modalHistory, setModalHistory] = useState([""]);

    const [activePanel, setActivePanel] = useState(ROUTES.MAIN);
    const [activeModal, setActiveModal] = useState(null);
    const [activeBottomType, setActiveBottomType] = useState("search"); // Поиск или Избранное, отображение выбранного

    const [mildep, setMildep] = useState(false);
    const [dorm, setDorm] = useState(false); // Общежитие

    const [minPoints, setMinPoints] = useState("");
    const [maxPoints, setMaxPoints] = useState("");

    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });

        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            const storageData = await bridge.send('VKWebAppStorageGet', {
                keys: Object.values(STORAGE_KEYS)
            });

            const data = [];
            storageData.keys.forEach(({key, value}) => {
                try {
                    data[key] = value ? JSON.parse(value) : {};
                    switch (key) {
                        case STORAGE_KEYS.FAVORITES: {
                            if (data[key]) {
                                setUserFavorites([...data[key]]);
                            }
                            break;
                        }
                    }
                } catch (error) {
                    console.error(error);
                    setSnackbar(
                        <Snackbar
                        layout="vertical"
                        onClose={() => setSnackbar(null)}
                        before={
                            <Avatar size={24} style={{ backgroundColor: "var(--dynamic-red)"}}>
                                <Icon24Error fill="#fff" width={14} height={14}/>
                            </Avatar>
                        }
                        duration={900}
                        >
                            Произошла проблема получения данных из хранилища (Storage)
                        </Snackbar>
                    );
                }
            });


            setUser(user);
            setPopout(null);
        }

        async function fetchDataForSearch() {
            try {
                const response = await fetch(SERVER_API + `/MainInfo?NamesOnly=${true}`,{
                    method: "POST",
                    mode: 'cors',
                });
                const data = await response.json();
                setDataForSearch(data);
            } catch(error) {
                console.error(error);
            }
        } 

        fetchData();
        fetchDataForSearch();
    }, []);

    const addToFavorites = async universityId => {
        try {
            let copyUserFavorites = [...userFavorites];
            copyUserFavorites.push(universityId);
            copyUserFavorites = [...new Set(copyUserFavorites.sort())];
            setUserFavorites(copyUserFavorites);

            console.log(copyUserFavorites)
            console.log(userFavorites)

            await bridge.send("VKWebAppStorageSet", {
                key: STORAGE_KEYS.FAVORITES,
                value: JSON.stringify(copyUserFavorites)
            });
        } catch (error) {
            console.error(error);
            setSnackbar(
                <Snackbar
                layout="vertical"
                onClose={() => setSnackbar(null)}
                before={
                    <Avatar size={24} style={{ backgroundColor: "var(--dynamic-red)"}}>
                        <Icon24Error fill="#fff" width={14} height={14}/>
                    </Avatar>
                }
                duration={900}
                >
                    Произошла проблема с отправкой данных в хранилище (Storage)
                </Snackbar>
            );
        }

    };

    const removeFromFavorites = async universityId => {
        try {
            const setOfFavorites = new Set(userFavorites);
            setOfFavorites.delete(universityId);
            setUserFavorites([...setOfFavorites].sort());

            await bridge.send("VKWebAppStorageSet", {
                key: STORAGE_KEYS.FAVORITES,
                value: JSON.stringify(userFavorites)
            });
        } catch (error) {
            console.error(error);
            setSnackbar(
                <Snackbar
                layout="vertical"
                onClose={() => setSnackbar(null)}
                before={
                    <Avatar size={24} style={{ backgroundColor: "var(--dynamic-red)"}}>
                        <Icon24Error fill="#fff" width={14} height={14}/>
                    </Avatar>
                }
                duration={900}
                >
                    Произошла проблема с отправкой данных в хранилище (Storage)
                </Snackbar>
            );
        }

    };

    const getUnicFavoritesIds = () => [...new Set(userFavorites)];

    const _setActiveModal = e => {
        const modalName = e.currentTarget.dataset.modal;

        let _modalHistory = modalHistory ? [...modalHistory] : [];

        if (modalName === null) {
            _modalHistory = [];
        } else if (_modalHistory.indexOf(modalName) !== -1) {
            _modalHistory = _modalHistory.splice(0, modalHistory.indexOf(modalName) + 1);
        } else {
            _modalHistory.push(modalName);
        }

        setModalHistory([..._modalHistory]);
        setActiveModal(modalName);
        console.log("modalName = ", modalName);
    };

    const closeAndCleanModals = () => {
        setModalHistory([""]);
        setActiveModal(null);
    };
    const modalBack = () => {
        const modal = modalHistory[modalHistory.length - 2];
        if (!modal) return setActiveModal(null);
        setActiveModal(modalHistory[modalHistory.length - 2]);
    };

    const go = e => {
        const panelId = e.currentTarget.dataset.to;

        let _panelHistory = panelHistory ? [...panelHistory] : [];

        if (panelId === null) {
            _panelHistory = [];
        } else if (_panelHistory.indexOf(panelId) !== -1) {
            _panelHistory = _panelHistory.splice(0, panelHistory.indexOf(panelId) + 1);
        } else {
            _panelHistory.push(panelId);
        }

        setPanelHistory([..._panelHistory]);
        setActivePanel(panelId);
        console.log("panelCurrent = ", panelId);
    };

    const panelBack = () => {
        setActivePanel(panelHistory[panelHistory.length - 2]);
        console.log("panelnew=", panelHistory[panelHistory.length - 2]);
    };


    const modal = (
        <ModalRoot activeModal={activeModal}>

            <Filters id={MODALS.FILTERS} 
            isMobile={isMobile} closeModals={closeAndCleanModals} setActiveModal={_setActiveModal} 
            setFilteredCards={setFilteredCards} selectedCityName={selectedCityName} 
            setSelectedCityName={setSelectedCityName}
            mildep={mildep} setMildep={setMildep} dorm={dorm} setDorm={setDorm}
            minPoints={minPoints} setMinPoints={setMinPoints} maxPoints={maxPoints} setMaxPoints={setMaxPoints}
            />

            <SelectCity id={MODALS.SELECTCITY} isMobile={isMobile} setActiveModal={_setActiveModal}
                        modalBack={modalBack} selectedCityName={selectedCityName} setSelectedCityName={setSelectedCityName}/>

{/*             <SelectExams id={MODALS.SELECTEXAMS} isMobile={isMobile} setActiveModal={_setActiveModal}
                        modalBack={modalBack} selectedExams={selectedExams} setSelectedExams={setSelectedExams}/> */}
        </ModalRoot>
    );


    return (
        <AppRoot>
            <SplitLayout
                style={{justifyContent: "center"}}
                modal={modal}
                header={hasHeader && <PanelHeader separator={false}/>}>
                <SplitCol
                    animate={!isDesktop}
                    spaced={isDesktop}
                    width={isDesktop ? '560px' : '100%'}
                    maxWidth={isDesktop ? '560px' : '100%'}
                >
                    <View activePanel={activePanel} popout={popout}>
                        <Main id={ROUTES.MAIN} go={go} setActiveModal={_setActiveModal}
                              setSelectedCard={setSelectedCard} filteredCards={filteredCards} 
                              setActiveBottomType={setActiveBottomType} setPopout={setPopout} dataForSearch={dataForSearch}/>

                        {/* CardInfo принимает удаление из избранного и добавление обратно, на случай если пользователь сразу хочет вернуть обратно (находясь в избранном) */}
                        <CardInfo id={ROUTES.CARDINFO} go={go} selectedCard={selectedCard} panelBack={panelBack} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} activeBottomType={activeBottomType} setActiveBottomType={setActiveBottomType} getUnicFavoritesIds={getUnicFavoritesIds} setPopout={setPopout}/>

                        <Favorites id={ROUTES.FAVORITES} go={go} setActiveModal={_setActiveModal}
                                   getUnicFavoritesIds={getUnicFavoritesIds} setSelectedCard={setSelectedCard} 
                                   setActiveBottomType={setActiveBottomType} setPopout={setPopout}/>
                    </View>
                </SplitCol>
            </SplitLayout>
        </AppRoot>
    );
};

export default App;

  
