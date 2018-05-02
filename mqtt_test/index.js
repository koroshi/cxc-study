var mqtt = require('mqtt')

let mqttConfig = {
    "host": "test.mosquitto.org",
    "port": "1883",
    "clientId": "groupid@@@deviceid",
    // "username": "xxxx",
    // "password": "xxx"
}
var client = mqtt.connect(mqttConfig)
client.on('connect', function () {
    client.subscribe('test/testAC1')
    client.publish('test/testAC', 'Hello mqtt1')
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(topic)
    console.log(message.toString())
    client.end()
})