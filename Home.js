import React from 'react';
import {View, FlatList, TextInput, Button, AsyncStorage} from 'react-native';
import {Card} from './Card';
import {BASE_CURRENCY_KEY} from './Settings';
const API_URL = 'https://api.coinmarketcap.com/v1/ticker';

export class Home extends React.Component {

    state = {
        coinData: [],
        isFetching: false,
        searchString: '',
        baseCurrency: 'USD'
    }

    static navigationOptions = ({navigation}) => ({
        title: 'CoinWatch',
        headerRight: (
            <Button onPress={() => navigation.navigate('Settings')} title="Settings" />
        )
    });

    componentWillMount() {
        this.fetchCoinData();
    }

    setCurrencyAndFetchData = () => {
        this.setState({isFetching: true});
        AsyncStorage.getItem(BASE_CURRENCY_KEY)
            .then((value) => {
                this.fetchCoinData(value || 'USD');
                this.setState({baseCurrency: value || 'USD'});
            });
    }

    fetchCoinData = (baseCurrency) => {
        fetch(`${API_URL}?convert=${baseCurrency}`)
            .then((response) => response.json())
            .then((coinData) => this.setState({coinData, isFetching: false}));
    }

    getFilteredData = () => {
        const {coinData, searchString} = this.state;

        return coinData.filter(({name}) => new RegExp(searchString, 'i').test(name));
    }

    render() {
        const {coinData, isFetching, searchString, baseCurrency} = this.state;
        const filteredData = this.getFilteredData();

        return (
            <View style={{backgroundColor: 'grey'}}>
                <TextInput
                        style={{
                            height: 40,
                            marginVertical: 5,
                            marginHorizontal: 10,
                            padding: 10,
                            backgroundColor: '#fff',
                            borderRadius: 10
                        }}
                        placeholder="Search"
                        onChangeText={(searchString) => this.setState({searchString})}
                        value={searchString}
                        autoCorrect={false}
                        autoCapitalize="none"
                        underlineColorAndroid="transparent"
                />
                <FlatList
                        onRefresh={this.fetchCoinData}
                        data={filteredData}
                        keyExtractor={item => item.id}
                        refreshing={isFetching}
                        renderItem={({item}) => (<Card baseCurrency={baseCurrency} key={item.id} {...item} />)}
                />
            </View>
        );
    }
}
