import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import * as Font from 'expo-font';
import { Icon } from "react-native-elements";

export function Bar({ type, porcentaje, icon_name, icon_type }) {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: porcentaje, // Asegura que se anime al porcentaje correcto
      duration: 800,
      useNativeDriver: false,
    }).start();

    loadFonts()

  }, [porcentaje]);

  async function loadFonts() {
    await Font.loadAsync({
      'Roboto-Italic': require('../../../../assets/fonts/titles/Roboto-Italic.ttf'),  // Asegúrate de usar el path correcto
    });
    setFontsLoaded(true);
  }


  return (
    <View style={styles.container_bar}>
      <View style={styles.container_text_icon}>
        <Icon name={icon_name} type={icon_type} style={styles.texto} color={'#9B9A9A'} />
        <Text style={styles.texto} > {type} </Text>
      </View>

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
  container_bar: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: 3,
    marginBottom: 3,
  },
  container_text_icon: {
    display: "flex",
    flexDirection: "row",
    width: "40%"
  },
  contenedorBarra: {
    position: "relative",
    backgroundColor: "#ddd",
    borderRadius: 10,
    height: 30,
    width: "60%",
    justifyContent: "center",
    paddingHorizontal: 5, // Padding horizontal para que el contenido no toque los bordes
  },
  barra: {
    backgroundColor: "#81E362",
    height: "100%",
    borderRadius: 10,
  },
  barraTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  texto: {
    color: '#9B9A9A',
    fontFamily: 'Roboto-Italic',
  },
  textoExterno: {
    marginTop: 10, // Espacio después de la barra
    textAlign: "center",
  },
});

export default Bar;
