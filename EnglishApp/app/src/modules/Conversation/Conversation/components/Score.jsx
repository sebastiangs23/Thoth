import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Bar from "../components/Bar.jsx";

export default function Score() {
  const score = useSelector((state) => state.score.value);

  useEffect(() => {
    console.log(score);
  }, []);

  return (
    <View style={styles.container_score}>
      {score.pronunciation_level && (
        <View>
          <View>
            <Bar
              type={"Acurracy"}
              porcentaje={score.pronunciation_level[0].accuracy_score}
              icon_name={"crosshairs"}
              icon_type={"font-awesome"}
            />

            <Bar
              type={"Completeness"}
              porcentaje={score.pronunciation_level[0].completeness_score}
              icon_name={"check"}
              icon_type={"font-awesome"}
            />

            <Bar
              type={"Fluency"}
              porcentaje={score.pronunciation_level[0].fluency_score}
              icon_name={"air"}
              icon_type={"material"}
            />

            <Bar
              type={"Pronunciation"}
              porcentaje={score.pronunciation_level[0].pronunciation_score}
              icon_name={"laugh-wink"}
              icon_type={"font-awesome-5"}
            />


          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container_score: {
    width: "100%",
  },
});
