import React, {useState, useEffect} from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {
    Group,
    Search,
    Footer,
    Cell,
} from '@vkontakte/vkui';


const thematics = [
    {name: "Университет ИТМО"},
    {name: "Политех"},
    {name: "Горный"},
  ];

  class MainSearch extends React.Component {

    constructor (props) {
      super(props);
      this.state = {
        search: ''
      }
      this.onChange = this.onChange.bind(this);
    }

    onChange (e) { this.setState({ search: e.target.value }); }

    get thematics () {
      const search = this.state.search.toLowerCase();
      return thematics.filter(({name}) => name.toLowerCase().indexOf(search) > -1);
    }

    render() {
      return (
        <React.Fragment>
          <Group>
            <Search value={this.state.search} onChange={this.onChange} after={null}/>
            {this.thematics.length > 0 && this.thematics.map(thematic => <Cell key={thematic.id}>{thematic.name}</Cell>)}
            {this.thematics.length === 0 && <Footer>Ничего не найдено</Footer>}
          </Group>
        </React.Fragment>
      );
    }
  }
  export default MainSearch;