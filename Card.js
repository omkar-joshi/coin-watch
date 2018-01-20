import React from 'react';
import {Text, View} from 'react-native';

export const Card = (props) => {
    const price = `price_${props.baseCurrency.toLowerCase()}`;

    return (
        <View style={{
                backgroundColor: '#fff',
                marginHorizontal: 10,
                marginVertical: 5,
                borderRadius: 10,
                padding: 20
        }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>{props.name} | {props.symbol}</Text>
                <Text>{`${props.baseCurrency} ${props[price]}`}</Text>
            </View>
            <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
            }}>
                <Text>1h: {props.percent_change_1h}</Text>
                <Text>24H: {props.percent_change_24h}</Text>
                <Text>7d: {props.percent_change_7d}</Text>
            </View>
        </View>
    );
}
