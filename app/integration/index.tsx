import { useEffect } from "react";
import { mqtt5, auth, iot } from "aws-iot-device-sdk-v2";
import { once } from "events";
import { CognitoIdentityCredentials } from "@aws-sdk/credential-provider-cognito-identity/dist-types/fromCognitoIdentity";
import { toUtf8 } from "@aws-sdk/util-utf8-browser";
const { fromCognitoIdentityPool } = require("@aws-sdk/credential-providers");

// @ts-ignore
import {
  AWS_REGION,
  AWS_COGNITO_IDENTITY_POOL_ID,
  AWS_IOT_ENDPOINT,
} from "./settings";
import jquery from "jquery";
import { Button, Text, TouchableHighlight, View } from "react-native";
const $: JQueryStatic = jquery;

function log(msg: string) {
  let now = new Date();
  $("#message").append(`<pre>${now.toString()}: ${msg}</pre>`);
}

/**
 * AWSCognitoCredentialOptions. The credentials options used to create AWSCongnitoCredentialProvider.
 */
interface AWSCognitoCredentialOptions {
  IdentityPoolId: string;
  Region: string;
}

/**
 * AWSCognitoCredentialsProvider. The AWSCognitoCredentialsProvider implements AWS.CognitoIdentityCredentials.
 *
 */
class AWSCognitoCredentialsProvider extends auth.CredentialsProvider {
  private options: AWSCognitoCredentialOptions;
  private cachedCredentials?: CognitoIdentityCredentials;

  constructor(
    options: AWSCognitoCredentialOptions,
    expire_interval_in_ms?: number
  ) {
    super();
    this.options = options;

    setInterval(async () => {
      await this.refreshCredentials();
    }, expire_interval_in_ms ?? 3600 * 1000);
  }

  getCredentials(): auth.AWSCredentials {
    return {
      aws_access_id: this.cachedCredentials?.accessKeyId ?? "",
      aws_secret_key: this.cachedCredentials?.secretAccessKey ?? "",
      aws_sts_token: this.cachedCredentials?.sessionToken,
      aws_region: this.options.Region,
    };
  }

  async refreshCredentials() {
    log("Fetching Cognito credentials");
    console.log("Fetching Cognito Credentials");
    this.cachedCredentials = await fromCognitoIdentityPool({
      // Required. The unique identifier for the identity pool from which an identity should be
      // retrieved or generated.
      identityPoolId: this.options.IdentityPoolId,
      clientConfig: { region: this.options.Region },
    })();
  }
}

function createClient(
  provider: AWSCognitoCredentialsProvider
): mqtt5.Mqtt5Client {
  let wsConfig: iot.WebsocketSigv4Config = {
    credentialsProvider: provider,
    region: AWS_REGION,
  };

  let builder: iot.AwsIotMqtt5ClientConfigBuilder =
    iot.AwsIotMqtt5ClientConfigBuilder.newWebsocketMqttBuilderWithSigv4Auth(
      AWS_IOT_ENDPOINT,
      wsConfig
    );

  let client: mqtt5.Mqtt5Client = new mqtt5.Mqtt5Client(builder.build());

  client.on("error", (error) => {
    log("Error event: " + error.toString());
  });

  client.on(
    "messageReceived",
    (eventData: mqtt5.MessageReceivedEvent): void => {
      log("Message Received event: " + JSON.stringify(eventData.message));
      if (eventData.message.payload) {
        log("  with payload: " + toUtf8(eventData.message.payload as Buffer));
      }
    }
  );

  client.on("attemptingConnect", (eventData: mqtt5.AttemptingConnectEvent) => {
    log("Attempting Connect event");
  });

  client.on("connectionSuccess", (eventData: mqtt5.ConnectionSuccessEvent) => {
    log("Connection Success event");
    log("Connack: " + JSON.stringify(eventData.connack));
    log("Settings: " + JSON.stringify(eventData.settings));
  });

  client.on("connectionFailure", (eventData: mqtt5.ConnectionFailureEvent) => {
    log("Connection failure event: " + eventData.error.toString());
  });

  client.on("disconnection", (eventData: mqtt5.DisconnectionEvent) => {
    log("Disconnection event: " + eventData.error.toString());
    if (eventData.disconnect !== undefined) {
      log("Disconnect packet: " + JSON.stringify(eventData.disconnect));
    }
  });

  client.on("stopped", (eventData: mqtt5.StoppedEvent) => {
    log("Stopped event");
  });

  return client;
}

function Mqtt() {
  var client: mqtt5.Mqtt5Client;
  var user_msg_count = 0;
  const qos0Topic = "/test/qos0";
  const qos1Topic = "/test/qos1";

  async function testSuccessfulConnection() {
    /** Set up the credentialsProvider */
    const provider = new AWSCognitoCredentialsProvider({
      IdentityPoolId: AWS_COGNITO_IDENTITY_POOL_ID,
      Region: AWS_REGION,
    });
    /** Make sure the credential provider fetched before setup the connection */
    await provider.refreshCredentials();

    client = createClient(provider);

    const attemptingConnect = once(client, "attemptingConnect");
    const connectionSuccess = once(client, "connectionSuccess");

    client.start();

    await attemptingConnect;
    await connectionSuccess;

    const suback = await client.subscribe({
      subscriptions: [
        { qos: mqtt5.QoS.AtLeastOnce, topicFilter: qos1Topic },
        { qos: mqtt5.QoS.AtMostOnce, topicFilter: qos0Topic },
      ],
    });
    log("Suback result: " + JSON.stringify(suback));

    const qos0PublishResult = await client.publish({
      qos: mqtt5.QoS.AtMostOnce,
      topicName: qos0Topic,
      payload: "This is a qos 0 payload",
    });
    log("QoS 0 Publish result: " + JSON.stringify(qos0PublishResult));

    const qos1PublishResult = await client.publish({
      qos: mqtt5.QoS.AtLeastOnce,
      topicName: qos1Topic,
      payload: "This is a qos 1 payload",
    });
    log("QoS 1 Publish result: " + JSON.stringify(qos1PublishResult));

    let unsuback = await client.unsubscribe({
      topicFilters: [qos0Topic],
    });
    log("Unsuback result: " + JSON.stringify(unsuback));
  }

  useEffect(() => {
    testSuccessfulConnection(); //initial execution
  }, []);

  async function PublishMessage() {
    const msg = `BUTTON CLICKED {${user_msg_count}}`;
    const publishResult = await client
      .publish({
        qos: mqtt5.QoS.AtLeastOnce,
        topicName: qos1Topic,
        payload: msg,
      })
      .then(() => {
        log("Button Clicked, Publish result: " + JSON.stringify(publishResult));
      })
      .catch((error) => {
        log(`Error publishing: ${error}`);
      });
    user_msg_count++;
  }

  async function CloseConnection() {
    const disconnection = once(client, "disconnection");
    const stopped = once(client, "stopped");

    client.stop();

    await disconnection;
    await stopped;
  }

  return (
    <View>
      <View>
        <TouchableHighlight onPress={() => PublishMessage()}>
          <Text>Publish A Message</Text>
        </TouchableHighlight>
      </View>
      <View>
        <TouchableHighlight onPress={() => CloseConnection()}>
          <Text>Disconnect</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default Mqtt;
