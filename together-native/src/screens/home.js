import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { Input } from "@rneui/themed";


const Home = ({navigation}) =>{
    const [text, setText] = useState('');

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Input
                placeholder='BASIC INPUT'
                onChangeText={newText => setText(newText)}
                defaultValue={text}
            />
             <Text>{text}</Text>

             <Button
                title="Go to Sign In Screen"
                onPress={() => navigation.navigate('SignIn')}
            />
        </View>
    );
}

export default Home;