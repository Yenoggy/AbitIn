import React, {useState, useEffect} from 'react';
import { 
	Group,
	CardGrid,
    ContentCard
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

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

    // we will use async/await to fetch this data
    async function getData() {
      const response = await fetch("https://www.anapioficeandfire.com/api/books");
      const data = await response.json();

      // store the data into our books variable
      setCards(data) ;
    }
  }, []); // <- you may need to put the setBooks function in this array

	return (
        <Group>
            {cards && (
                <CardGrid size="l">
                {cards.map((card, index) => (
                <ContentCard
                    key={index}
                    src={card.img}
                    header={card.name}
                    text={card.description}
                    caption={card.address}
                    maxHeight={500}
                    >
                </ContentCard>
                ))}

                </CardGrid>
            )}
        </Group>

	);
  };

  
export default Cards;
