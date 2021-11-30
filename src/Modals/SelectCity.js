import React from 'react';
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

const SelectCity = ({isMobile, setActiveModal, modalBack}) => {

    const [cities, setCities] = useState([]);
    useEffect(() => {

        const resJson = fetch(`https://api.vk.com/method/database.getCities?access_token=${vkToken}&country_id=1&need_all=1&count=1000&v=5.81?lang=ru`);

        setCities(JSON.parse(resJson).map(data => {data.id, data.title}));
    });
    
	return (
        <ModalPage
          id="select-city"
          onClose={modalBack}
          header={
            <ModalPageHeader
              left={<PanelHeaderBack label="Назад" onClick={modalBack} />}
            >
              Выберите город
            </ModalPageHeader>
          }
          settlingHeight={80}
        >
          <Group>
            <FormLayoutGroup>
              {cities.map(({ id, title }) => {
                return (
                  <Radio key={id} name="city" value={id}>{title}</Radio>
                );
              })}
            </FormLayoutGroup>
          </Group>
        </ModalPage>
    );
  };

  SelectCity.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    setActiveModal: PropTypes.func.isRequired,
    modalBack: PropTypes.func.isRequired,
};  
export default SelectCity;