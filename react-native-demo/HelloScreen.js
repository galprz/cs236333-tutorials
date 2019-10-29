import React from 'react';
import { View,Button,TextInput,ToastAndroid} from 'react-native';

export default class HelloScreen extends React.Component {
    state = { value: "Name" };

    render() {
      const {navigate} = this.props.navigation;
      return (
        <View>
               <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={value => this.setState({value})}
                value={this.state.value}
                />
                <Button
                title="Hello"
                onPress={() => ToastAndroid.show('Hello'  + this.state.value, ToastAndroid.SHORT)}
                />
        </View>
  
      );
    }
  }