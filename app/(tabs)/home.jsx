import { Button, ScrollView, Text, View } from "react-native";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import WaterStatus from "../components/WaterStatus";
import StatusCard from "../components/StatusCard";
import ActivityCard from "../components/ActivityCard";

import { icons } from "../../constants";
import { useEffect, useState } from "react";
import ActivityRepository from "../database/ActivityRepository";

const repository = new ActivityRepository();

const Home = () => {
  const [activities, setActivities] = useState([]);

  const create = async () => {
    const id = await repository.create({
      title: "Title Test 3",
      type: "Type Tes 3",
      timeStamp: "TimeStamp Test 3",
    });
    await all();
  };

  const all = async () => {
    const activities = await repository.all();
    setActivities(activities);
  };

  useEffect(() => {
    all();
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-start bg-[#191C4A]">
      <Header />
      <WaterStatus />
      <View className="flex-row w-full justify-between pr-2">
        <StatusCard title={"Ball Launcher"} ammount={"2/4"} />
        <StatusCard title={"Snack Dispenser"} ammount={"OK"} />
      </View>
      <Text className="p-3 pl-5 mt-0 text-2xl font-semibold text-white">
        Recent Activities
      </Text>
      <ScrollView className="flex-1 w-full">
        {activities.reverse().map((activity) => (
          <View key={activity.id}>
            <ActivityCard
              title={activity.title}
              date={activity.timeStamp}
              icon={icons.bookmark}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;
