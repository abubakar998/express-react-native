import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Cookies from 'js-cookie'

import { Input, Button  } from "@rneui/themed";
import Axios from 'axios';


const SignIn = ({navigation}) =>{
    const [formData, setFormdata] = useState({});

    const handleChange = (name, text) => {
        setFormdata({...formData, [name] : text});
    }

    const onLoginPressed = () => {
        console.log(formData);
        Axios.post('http://192.168.40.15:5000/login/',formData)
        .then((response)=>{
          // gContext.handleSignUpSuccess(response);
          console.log(response);
        })
        .catch((err)=>{
          // gContext.validationErrorCB(err);
          console.log(err, "###############");
        });
    }

    useEffect(()=>{
        console.log(Cookies.get('accessToken'))
    },[Cookies.get('accessToken')])

    return (
        <>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Sign In Screen</Text>
            <Input
                placeholder='demo@example.com'
                label="Email"
                onChangeText={text=>handleChange('username',text)} 
                value={formData?.email}
            />
            <Input
                label="Password"
                onChangeText={text=>handleChange('password',text)} 
                value={formData?.password}
                secureTextEntry
            />
            <Button
              title={'Sign In'}
              onPress={onLoginPressed}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginTop: 10,
                marginBottom: 30,
                borderRadius: 10,
              }}
            />
            <Text>Don't have an account? </Text>
            <Button
                buttonStyle={{ backgroundColor: 'transparent' }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    // marginVertical: 10,
                }}
                title="Create a free account"
                onPress={() => navigation.navigate("SignUp")}
                // type="clear"
                titleStyle={{ 
                    color: 'rgba(78, 116, 289, 1)',
                }}
            />
        </View>
      </>
    );
}

export default SignIn;