import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Icon } from "react-native-elements";

export function Bar({ type, porcentaje, icon_name, icon_type }) {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: porcentaje, // Asegura que se anime al porcentaje correcto
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [porcentaje]);

  return (
    <View>
      <Text> {type} </Text>
      <Icon name={icon_name} type={icon_type} />
      <View style={styles.contenedorBarra}>
        <Animated.View
          style={[
            styles.barra,
            {
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        >
          {/* Texto dentro de la barra */}
          <Text style={styles.barraTexto}>{porcentaje ? porcentaje : ""}</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedorBarra: {
    position: "relative",
    backgroundColor: "#ddd",
    borderRadius: 10,
    height: 30,
    justifyContent: "center",
    paddingHorizontal: 5, // Padding horizontal para que el contenido no toque los bordes
  },
  barra: {
    backgroundColor: "rgba(105, 221, 72, 1)",
    height: "100%",
    borderRadius: 10,
  },
  barraTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  textoExterno: {
    marginTop: 10, // Espacio después de la barra
    textAlign: "center",
  },
});

export default Bar;
