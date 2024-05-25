import {
  Button,
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import useMQTT from "./MQTT";
import { commandTopic } from "./MQTT/commands";
// import { Picker } from "@react-native-picker/picker";

const ScheduleRow = ({ title, icon, commandId }) => {
  const [selectedRepeatTime, setSelectedRepeatTime] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [scheduleTime, setScheduleTime] = useState([]);
  const mqtt = useMQTT();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setSelectedTime(`${date.getHours()}:${date.getMinutes()}`);
    hideDatePicker();
  };
  const handleAddNewSchedule = () => {
    setScheduleTime([
      ...scheduleTime,
      { id: scheduleTime.length + 1, time: selectedTime },
    ]);
    mqtt.PublishMessage(
      commandTopic.setSchedule,
      commandId + ":" + selectedTime.replaceAll(":", "")
    );
  };
  const handleDeleteSchedule = (id) => {
    let newArray = scheduleTime.filter((item) => item.id !== id);
    setScheduleTime(newArray);
    mqtt.PublishMessage(
      commandTopic.delSchedule,
      commandId +
        ":" +
        scheduleTime
          .filter((item) => item.id === id)[0]
          .time.replaceAll(":", "")
    );
  };

  return (
    <ScrollView className="grid mr-2">
      <View className="flex-row justify-between items-center w-full py-4 px-6 pr-24">
        <View className="flex-row justify-start items-center w-full">
          <View className="rounded-lg w-10 h-10 items-center justify-center bg-terciary mr-3">
            <Image
              source={icon}
              resizeMode="contain"
              tintColor={"white"}
              className="w-6 h-6"
            />
          </View>
          <Text className="font-bold text-white text-2xl">{title}</Text>
        </View>
        <Switch />
      </View>
      <View className="flex-row justify-start pl-6 gap-2">
        <View className="w-[40%] rounded-lg bg-terciary">
          <TouchableOpacity
            className="bg-terciary p-4 rounded rounded-md"
            onPress={showDatePicker}
          >
            <Text className="text-[16px] text-white">
              {selectedTime ? String(selectedTime) : "SELECT TIME"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            mode="time"
            isVisible={isDatePickerVisible}
            onCancel={hideDatePicker}
            onConfirm={handleConfirm}
          />
        </View>
        <View className="w-[40%] rounded-lg bg-terciary">
          {/* <Picker
            selectedValue={selectedRepeatTime}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedRepeatTime(itemValue)
            }
            style={{ color: "#fff" }}
          >
            <Picker.Item label="2x A DAY" value="java" />
            <Picker.Item label="3x A DAY" value="js" />
          </Picker> */}
          <TouchableOpacity
            className="bg-secondary p-4 rounded rounded-md"
            onPress={handleAddNewSchedule}
          >
            <Text className="text-[16px] font-bold text-white">
              Add New Time
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="grid gap-2 mt-2 ml-4">
        {scheduleTime?.map((item) => (
          <View
            id={item.id}
            className="p-3 bg-terciary mr-16 rounded-lg flex flex-row items-center justify-between"
          >
            <Text className="text-[14px] text-white">
              {title} - {item.time}
            </Text>
            <TouchableOpacity
              className="bg-primary p-2 rounded rounded-full w-9 items-center justify-center"
              onPress={() => {
                handleDeleteSchedule(item.id);
              }}
            >
              <Text className="text-[16px] font-bold text-red-200">-</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
export default ScheduleRow;
