import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import useApiHelper from '../api';

import { Input, Icon, Button } from "@rneui/themed";
import Axios from 'axios';


const SignUp = ({navigation}) =>{
    const [formData, setFormdata] = useState({});
    const [errorData, setErrorData] = useState();

    const api = useApiHelper();

    const handleChange = (name, text) => {
        setFormdata({...formData, [name] : text});
    }

    const onSignupPressed = () => {    

      console.log(formData);
      if(formData.password1===formData.password2){
        Axios.post('http://192.168.40.15:5000/users/',{...formData, 'password': formData.password1})
        .then((response)=>{
          // gContext.handleSignUpSuccess(response);
          console.log(response.data);
        })
        .catch((err)=>{
          // gContext.validationErrorCB(err);
          console.log(err, "###############");
        });
      } else {
        setErrorData("Password didn't match")
      }
  };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Sign Up Screen</Text>
            <Input
                placeholder='John Doe..'
                label="Name"
                onChangeText={text=>handleChange('name',text)} 
                value={formData?.name}
                // multiline
                // numberOfLines={10}
                // leftIcon={
                //     <Icon
                //       name='user'
                //       size={24}
                //       color='black'
                //     />
                // }
                // leftIcon={{ type: 'font-awesome', name: 'comments' }}
            />
            <Input
                placeholder='demo@example.com'
                label="Email"
                onChangeText={text=>handleChange('email',text)} 
                value={formData?.email}
            />
            <Input
                // placeholder='Password..'
                label="Password"
                onChangeText={text=>handleChange('password1',text)} 
                value={formData?.password1}
                secureTextEntry
            />
            {errorData &&
                <Text>{ errorData }</Text>
            }
            <Input
                // placeholder='Confirm Password'
                label="Confirm Password"
                onChangeText={text=>handleChange('password2',text)} 
                value={formData?.password2}
                secureTextEntry
            />
        
             {/* <Text>Native Input</Text>
             <TextInput
                style={styles.input}
                onChangeText={text=>handleChange('email',text)} 
                name="email"
                value={formData?.email}
                placeholder="Enter Email.."
            /> */}
            <Button
              title={'Sign Up'}
              onPress={onSignupPressed}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginTop: 10,
                marginBottom: 30,
                borderRadius: 10,
              }}
            />

            <Text>Already Have an Account? </Text>
            <Button
                buttonStyle={{ backgroundColor: 'transparent' }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    // marginVertical: 10,
                }}
                title="Sign In"
                onPress={() => navigation.navigate("SignIn")}
                // type="clear"
                titleStyle={{ 
                    color: 'rgba(78, 116, 289, 1)',
                }}
            />
        </View>
    );
}

export default SignUp;