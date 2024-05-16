import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AudioRow from "../components/AudioRow";
import { TouchableHighlight } from "react-native-gesture-handler";
import CustomButton from "../components/CustomButton";
import { Audio as AudioDevice } from "expo-av";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";

const Audio = () => {
  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState("idle");
  const [audioPermission, setAudioPermission] = useState(null);
  useEffect(() => {
    // Simply get recording permission upon first render
    async function getPermission() {
      await AudioDevice.requestPermissionsAsync()
        .then((permission) => {
          console.log("Permission Granted: " + permission.granted);
          setAudioPermission(permission.granted);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Call function to get permission
    getPermission();
    // Cleanup upon first render
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  async function startRecording() {
    try {
      // needed for IoS
      if (audioPermission) {
        await AudioDevice.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
      }

      const newRecording = new AudioDevice.Recording();
      console.log("Starting Recording");
      await newRecording.prepareToRecordAsync(
        AudioDevice.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus("recording");
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  }

  async function stopRecording() {
    try {
      if (recordingStatus === "recording") {
        console.log("Stopping Recording");
        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();

        // Create a file name for the recording
        const fileName = `recording-${Date.now()}.caf`;

        // Move the recording to the new directory with the new file name
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "recordings/",
          { intermediates: true }
        );
        await FileSystem.moveAsync({
          from: recordingUri,
          to: FileSystem.documentDirectory + "recordings/" + `${fileName}`,
        });

        // This is for simply playing the sound back
        const playbackObject = new AudioDevice.Sound();
        await playbackObject.loadAsync({
          uri: FileSystem.documentDirectory + "recordings/" + `${fileName}`,
        });
        await playbackObject.playAsync();

        // resert our states to record again
        setRecording(null);
        setRecordingStatus("stopped");
      }
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  }

  async function handleRecordButtonPress() {
    if (recording) {
      const audioUri = await stopRecording(recording);
      if (audioUri) {
        console.log("Saved audio file to", savedUri);
      }
    } else {
      await startRecording();
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#191C4A]">
      <View className="flex-row justify-start p-8">
        <Text className="text-2xl text-white">Audio</Text>
      </View>
      <AudioRow title={"Sound"} />
      <AudioRow title={"Sound"} />
      <AudioRow title={"Sound"} />
      <AudioRow title={"Sound"} />
      <AudioRow title={"Sound"} />
      {/* <AudioRow title={"Sound"} excludable={true} /> */}
      <View className="flex-row p-8">
        <CustomButton
          handlePress={handleRecordButtonPress}
          title={`${
            recordingStatus === "recording" ? "Recording..." : "Record"
          }`}
          containerStyles={"flex justify-center w-full bg-terciary p-3"}
        />
      </View>
      {/* <Text>{`Recording status: ${recordingStatus}`}</Text> */}
    </SafeAreaView>
  );
};
export default Audio;
