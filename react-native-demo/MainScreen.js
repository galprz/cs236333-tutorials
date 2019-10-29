import React from 'react';
import {  Button } from 'react-native';

export default class MainScreen extends React.Component {
    static navigationOptions = {
      title: 'Demo',
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <Button
          title="CHANGE ACTIVITY"
          onPress={() => navigate('Hello')}
        />
      );
    }
  }