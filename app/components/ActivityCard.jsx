import { Image, Text, View } from "react-native";

const ActivityIcon = ({ icon, color }) => {
  return (
    <View className="items-center justify-center gap-2 mt-1">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
    </View>
  );
};

const ActivityCard = ({ title, date, icon }) => {
  return (
    <View className="flex-row items-center p-5 pt-0 w-full justify-center">
      <ActivityIcon icon={icon} color="#fff" />
      <View className="flex-1 items-start mt-3 ml-4">
        <Text className="font-bold text-white">{title}</Text>
        <Text className="text-white text-gray-200">{date}</Text>
      </View>
    </View>
  );
};
export default ActivityCard;
