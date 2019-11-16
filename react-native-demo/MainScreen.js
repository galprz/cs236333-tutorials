import React from 'react';
import {  View, Button, StyleSheet , Text, TextInput} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
   },
  passContainer:{
    width: 250,
    justifyContent: 'center',
    margin:80
  }
});
export default class MainScreen extends React.Component {
    constructor(props) {
      super(props);
      this.login = this.login.bind(this);
    }
    static navigationOptions = {
      title: 'Demo',
    };
    state = {
      isWrongPassword: false,
      email: "",
      password: ""
    }

    async login(email, password){
      const { navigate } = this.props.navigation;
      try{
        const result = await fetch('https://iotcontrol-technion.azurewebsites.net/api/HttpTrigger1', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        })
        if(result.status == 200){
          this.setState({isWrongPassword: false})
          navigate("Hello")
        }else{
          this.setState({isWrongPassword: true})
        }
      }catch(err){
          this.setState({isWrongPassword: true})
      }
    
    }
    
    render() {
      return (
        <View style={styles.container}>
        <View style={styles.passContainer}>
          <Text>{this.state.isWrongPassword ? "Wrong email or password" : ""}</Text> 
          <Text>email</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={email => this.setState({email})}
            value={this.state.email}
            />
          <Text>password</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={password => this.setState({password})}
            value={this.state.password}
            secureTextEntry={true}
          />
          <Button
              color="#841584"
              title="Login"
                onPress={() => this.login(this.state.email, this.state.password)}
              />
        </View>
        </View>
      );
    }
  }