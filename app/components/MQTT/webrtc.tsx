import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { mediaDevices, RTCView } from "react-native-webrtc";

export const WebRTC = () => {
  const [stream, setStream] = useState(null);
  const start = async () => {
    console.log("start");
    if (!stream) {
      try {
        const s = await mediaDevices.getUserMedia({ video: true });
        setStream(s);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const stop = () => {
    console.log("stop");
    if (stream) {
      stream.release();
      setStream(null);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.body}>
        {stream && <RTCView streamURL={stream.toURL()} />}
        <View style={styles.footer}>
          <Button title="Start" onPress={start} />
          <Button title="Stop" onPress={stop} />
        </View>
      </SafeAreaView>
      {stream && <RTCView streamURL={stream.toURL()} />}
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    ...StyleSheet.absoluteFill
  },
  stream: {
    flex: 1
  },
  footer: {
    backgroundColor: '#ff0000',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
});
