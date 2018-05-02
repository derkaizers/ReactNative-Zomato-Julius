import React, { Component } from 'react';

import { Image } from 'react-native';
import { Container, Header,Content,Footer,Item,Input, Icon, Button,Text,Card, CardItem, Thumbnail,Left,Right,Body, Fab} from 'native-base';
import axios from 'axios';

class App extends Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            active: false,
            cari: '',
            headerTitle: 'LIHAT DAFTAR RESTO'
        }
    }

componentDidMount() {
    console.disableYellowBox = true;
}

klik = () => {
    var url = `https://developers.zomato.com/api/v2.1/search?q=${this.state.cari}`;
    var config = {
      headers: {'user-key':'8ef143d6eb35a45809dfc4a0c32236f7'}
    };
    axios.get(url, config).then((ambilData) => {
        console.log(ambilData.data.results);
        this.setState({ restaurants: ambilData.data.restaurants })
    });
}

render() {
  const data = this.state.restaurants.map(resto => {
    return 
      <Card style={{ flex: 0 }}>
        <CardItem>
            <Left>
                <Thumbnail source={{uri: `${resto.restaurant.thumb}`}} />
                <Body>
                    <Text>{resto.restaurant.name}</Text>
                    <Text note>{resto.restaurant.location.city}</Text>
                </Body>
            </Left>
            <Right>
              <Text>Rp. {resto.restaurant.average_cost_for_two / 2}</Text>
            </Right>
        </CardItem>
        <CardItem cardBody>
            <Image source={{uri: `${resto.restaurant.featured_image}`}} style={{height: 200, width: null, flex: 1}}/>
        </CardItem>
        <CardItem>
            <Left>
                <Button transparent textStyle={{ color: '#87838B' }}>
                    <Icon name="home" />
                    <Text>{resto.restaurant.location.address}</Text>
                </Button>
            </Left>
        </CardItem>
      </Card>
    });

return (
<Container>
  <Header searchBar rounded style={{backgroundColor:'red'}}>
    <Item>
      <Icon name="search" />
      <Input
          placeholder="Cari Menu Makanan..."
          onChangeText={(x) => { this.setState({ cari: x }) }}
          value={this.state.cari}/>
      <Icon  name="arrow-forward"
          onPress={this.klik} />
    </Item>
    <Button>
      <Text
          onPress={this.klik}
          title="Lihat Daftar Resto" color="red">
      </Text>
    </Button>
</Header>
  <Text style={{ textAlign: 'center', padding: 10, fontSize: 24, fontWeight: '800' }}>
        {this.state.headerTitle}
  </Text>

  <Content>
      {data}
  </Content>
    <Fab
        active={this.state.active}
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: '#5067FF' }}
        position="bottomRight"
        onPress={() => this.setState({ active: !this.state.active })}>
        <Icon name="share" />
    </Fab>
</Container>
        );
    }
}

export default App