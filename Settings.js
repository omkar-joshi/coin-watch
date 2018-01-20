import React from 'react';
import {Text, View, Button, AsyncStorage} from 'react-native';
export const BASE_CURRENCY_KEY = '@coinwatch:baseCurrency';

export class Settings extends React.Component {

    state = {
        baseCurrency: ''
    }

    componentWillMount() {
        AsyncStorage.getItem(BASE_CURRENCY_KEY)
            .then((value) => this.setState({baseCurrency: value || 'USD'}));
    }

    handlePress = (currency) => {
        this.setState({baseCurrency: currency});
        AsyncStorage.setItem(BASE_CURRENCY_KEY, currency);
    }

    render() {
        const {baseCurrency} = this.state;

        return (
            <View>
                <Button
                        title="USD"
                        onPress={() => this.handlePress('USD')}
                        color={baseCurrency !== 'USD' ? 'green' : 'red'}
                />
                <Button
                        title="INR"
                        onPress={() => this.handlePress('INR')}
                        color={baseCurrency !== 'INR' ? 'green' : 'red'}
                />
            </View>
        );
    }
}
