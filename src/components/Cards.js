import React, {useState, useEffect} from 'react';
import { 
	Group,
	CardGrid,
    ContentCard
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';
import SmallCard from './SmallCard';

const Cards = ({go}) => {
    const [cards, setCards] = useState([
        {
            id: 0,
            img: "https://images.unsplash.com/photo-1603928726698-a015a1015d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
            name: "Университет ИТМО", 
            description: "От 100 000 рублей в год", 
            address: "м. Гостиный Двор, 22 мин. пешком Набережная реки Фонтанки, 4, подъезд 7" 
        },
        {
            id: 1,
            img: "https://images.unsplash.com/photo-1603928726698-a015a1015d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
            name: "Университет ИТМО", 
            description: "От 100 000 рублей в год", 
            address: "м. Гостиный Двор, 22 мин. пешком Набережная реки Фонтанки, 4, подъезд 7" 
        },
        {
            id: 2,
            img: "https://images.unsplash.com/photo-1603928726698-a015a1015d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
            name: "Университет ИТМО", 
            description: "От 100 000 рублей в год", 
            address: "м. Гостиный Двор, 22 мин. пешком Набережная реки Фонтанки, 4, подъезд 7" 
        },
    ]);

/*   useEffect(() => {
    getData();

    async function getData() {
      const response = await fetch("");
      const data = await response.json();

      setCards(data);
    }
  }, []); */

	return (
        <Group>
            {cards && (
                <CardGrid size="l">
                {cards.map((card, index) => (
                    <div key={index}>
                        <SmallCard go={go}
                            id={card.id} img={card.img} name={card.name}
                            description={card.description} address={card.address}
                        />
                    </div>
                ))}

                </CardGrid>
            )}
        </Group>

	);
  };

Cards.propTypes = {
	go: PropTypes.func.isRequired,
};  
export default Cards;
