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
      </SafeAreaView>{" "}
      {stream && <RTCView streamURL={stream.toURL()} />}
    </>
  );
};
