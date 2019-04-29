import { Client, Message } from "paho-mqtt"

/*jshint esversion: 6 */
class Mqtt {
  constructor(scene) {
    this.scene = scene;
    let mqtt = this;
    this.client = new Client("mqtt.labict.be", 1884, "");

    this.arrayPlayers = [];
    this.hasdied = [0];

    // set callback handlers
    this.client.onConnectionLost = function(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    };

    this.client.onMessageArrived = function(message) {
      let receivedMessage = JSON.parse(message.payloadString);
      console.log(receivedMessage);

      for (let i = 0; i < receivedMessage.players.length; i++) {
        let username = receivedMessage.players[i].name;
        let player = receivedMessage.players[i];
        if (!this.arrayPlayers.includes(username)) {
          this.arrayPlayers.push(username);
          mqtt.scene.createTankSprite(player);
        } else {
          //console.log(receivedMessage.players[i]);
          mqtt.scene.setTankPosition(player);
        }
        if (player.tank.health <= 0 && !this.hasdied[i]) {
          mqtt.scene.destroyTank(username);
          this.hasdied[i] = 1;
        }
      }
    };
    // connect the client
    this.client.connect({
      onSuccess: function() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        mqtt.client.subscribe("game3/replicated");
        let message = new Message("Hello");
        message.destinationName = "World";
        mqtt.client.send(message);
      }
    });
  }
}

export default Mqtt;
