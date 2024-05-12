import {
  Button,
  Image,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";

const ScheduleRow = ({ title, icon }) => {
  const [selectedRepeatTime, setSelectedRepeatTime] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
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
  return (
    <View className="grid">
      <View className="flex-row justify-between items-center w-full py-4 px-12 pr-24">
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
      <View className="flex-row justify-start pl-12 gap-2">
        <View className="w-[60%] rounded-lg bg-terciary">
          <Picker
            selectedValue={selectedRepeatTime}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedRepeatTime(itemValue)
            }
            style={{ color: "#fff" }}
          >
            <Picker.Item label="2x A DAY" value="java" />
            <Picker.Item label="3x A DAY" value="js" />
          </Picker>
        </View>
        <View className="w-[20%] rounded-lg bg-terciary">
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
      </View>
    </View>
  );
};
export default ScheduleRow;
