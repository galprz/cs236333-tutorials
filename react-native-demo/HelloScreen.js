import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";

export default class HelloScreen extends React.Component {
  state = { devices: [] };
  constructor() {
    super();
    const result = fetch(
      "https://iotcontrol-technion.azurewebsites.net/api/HttpTrigger2",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    ).then(result => {
      result.json().then(context => {
        this.setState({
          data: context.map(device => {
            return {
              key: device.deviceId,
              status: device.properties.desired.status,
              temp: device.properties.reported.temperature
            };
          })
        });
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <Text style={styles.item}>
              {item.key}:{item.status} - current temperature is {item.temp}
            </Text>
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});
