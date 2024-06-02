import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Score() {
  const score = useSelector((state) => state.score.value);
  useEffect(() => {
    console.log(score);
  }, []);

  return (
    <View>
      {score.pronunciation_level && (
            <View>
              <Text>Acurracy: {score.pronunciation_level[0].accuracy_score} </Text>
              <Text>completeness: {score.pronunciation_level[0].completeness_score} </Text>
              <Text>Fluency: {score.pronunciation_level[0].fluency_score} </Text>
              <Text>Pronunciation: {score.pronunciation_level[0].prosody_score} </Text>
            </View>
          )
       }
    </View>
  );
}
