const iothub = require("azure-iothub");
const connectionString =
  "HostName=technion-demo.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=j2eZc3bHS2pKc8NCbxGs9JS/en8DInNkg9fkrwqiGb8=";

module.exports = function(context, IoTHubMessages) {
  context.log(`Got new message:${JSON.stringify(IoTHubMessages)}`);
  const registry = iothub.Registry.fromConnectionString(connectionString);
  IoTHubMessages.forEach(message => {
    if (
      !message.properties ||
      !message.properties.reported ||
      !message.properties.reported.temperature
    ) {
      context.done();
      return;
    }
    context.log(
      `Device temperature: ${message.properties.reported.temperature}`
    );
    const temp = message.properties.reported.temperature;
    if (temp > 40) {
      const deviceId = message.properties.reported.name || "temp_sensor";
      context.log(`Temperature exceeded the limit, turn off ${deviceId}`);
      const registry = iothub.Registry.fromConnectionString(connectionString);
      registry.getTwin(deviceId, function(err, twin) {
        context.log(`Found device ${deviceId}`);
        const patch = {
          properties: {
            desired: {
              status: "disable"
            }
          }
        };
        twin.update(patch, function(err) {
          if (err) {
            context.log(
              "Could not update twin: " +
                err.constructor.name +
                ": " +
                err.message
            );
          } else {
            context.log("Disabled device");
          }
          context.done();
        });
      });
    }
  });
};
