import { Image, Text, View } from "react-native";
import { iconActivity } from "./MQTT/commands";

const ActivityIcon = ({ icon, color }) => {
  return (
    <View className="items-center justify-center gap-2 mt-1">
      {icon}
    </View>
  );
};

const ActivityCard = ({ title, date, type }) => {
  return (
    <View className="flex-row items-center p-5 pt-0 w-full justify-center">
      <ActivityIcon icon={iconActivity[type]} color="#fff" />
      <View className="flex-1 items-start mt-3 ml-4">
        <Text className="font-bold text-white">{title}</Text>
        <Text className="text-white text-gray-200">{date}</Text>
      </View>
    </View>
  );
};
export default ActivityCard;
