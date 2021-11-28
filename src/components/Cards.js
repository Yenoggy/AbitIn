import React, {useState, useEffect} from 'react';
import { 
	Group,
	CardGrid,
    ContentCard
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Card from './Card';

const Cards = () => {
    const [cards, setCards] = useState([
        {
            img: "https://images.unsplash.com/photo-1603928726698-a015a1015d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
            name: "Университет ИТМО", 
            description: "От 100 000 рублей в год", 
            address: "м. Гостиный Двор, 22 мин. пешком Набережная реки Фонтанки, 4, подъезд 7" 
        },
        {
            img: "https://images.unsplash.com/photo-1603928726698-a015a1015d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
            name: "Университет ИТМО", 
            description: "От 100 000 рублей в год", 
            address: "м. Гостиный Двор, 22 мин. пешком Набережная реки Фонтанки, 4, подъезд 7" 
        },
        {
            img: "https://images.unsplash.com/photo-1603928726698-a015a1015d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
            name: "Университет ИТМО", 
            description: "От 100 000 рублей в год", 
            address: "м. Гостиный Двор, 22 мин. пешком Набережная реки Фонтанки, 4, подъезд 7" 
        },
    ]);

    // + adding the use
  useEffect(() => {
    getData();

    async function getData() {
      const response = await fetch("");
      const data = await response.json();

      setCards(data) ;
    }
  }, []);

	return (
        <Group>
            {cards && (
                <CardGrid size="l">
                {cards.map((card, index) => (
                    <Card 
                        key={index} img={card.img} name={card.name}
                        description={card.description} address={card.address}
                    />
                ))}

                </CardGrid>
            )}
        </Group>

	);
  };

  
export default Cards;
