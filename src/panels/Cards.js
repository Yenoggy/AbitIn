import React from 'react';
import { 
	Group,
	CardGrid,
    ContentCard
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const Cards = () => {
	return (
        <Group>
            <CardGrid size="l">
                <ContentCard
                src="https://images.unsplash.com/photo-1603928726698-a015a1015d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                header="Университет ИТМО"
                text="От 100 000 рублей в год"
                caption="м. Гостиный Двор, 22 мин. пешком
                Набережная реки Фонтанки, 4, подъезд 7"
                maxHeight={500}
                >
                </ContentCard>
                <ContentCard
                src="https://images.unsplash.com/photo-1603928726698-a015a1015d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                header="Университет ИТМО"
                text="От 100 000 рублей в год"
                caption="м. Гостиный Двор, 22 мин. пешком
                Набережная реки Фонтанки, 4, подъезд 7"
                maxHeight={500}
                />
            </CardGrid>
        </Group>
	);
  };

  
export default Cards;
