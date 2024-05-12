import { Text, View } from "react-native";

const StatusCard = ({ title, ammount }) => {
  return (
    <View className="flex-row w-[47%] rounded-lg justify-between items-center p-3 bg-gray ml-2">
      <Text className="font-bold text-white">{title}</Text>
      <Text className="font-bold text-white text-terciary">{ammount}</Text>
    </View>
  );
};
export default StatusCard;
