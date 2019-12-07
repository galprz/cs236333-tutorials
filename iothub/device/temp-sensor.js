const IoTDeviceClient = require("azure-iot-device").Client;
const connectionString =
  "HostName=technion-demo.azure-devices.net;DeviceId=temp_sensor;SharedAccessKey=RZ17Kv9bBpI2w4ylbXT/IcsUY3mnev94Elg/mv/3p+A=";
const protocol = require("azure-iot-device-mqtt").Mqtt;
const client = IoTDeviceClient.fromConnectionString(connectionString, protocol);
const prompt = require("prompt");
client.open(err => {
  if (err) {
    console.error("could not open IotHub client");
    return;
  }
  client.getTwin(function(err, twin) {
    twin.on("properties.desired.status", status => {
      console.log("Device status changed to", status);
    });
    prompt.start();
    function getInput() {
      prompt.get("Temperature", function(err, result) {
        const temperature = result.Temperature;
        if (temperature == "Q") {
          console.log("Got quite input, exit application");
          return;
        }
        const patch = { temperature: parseFloat(temperature) };
        twin.properties.reported.update(patch, err => {
          if (err) {
            console.error("could not update twin", err);
          } else {
            console.log("Temperature set to:", temperature);
            console.log("Twin state reported");
          }
        });
        getInput();
      });
    }
    getInput();
  });
});
