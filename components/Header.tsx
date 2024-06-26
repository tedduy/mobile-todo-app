import { FC } from "react";
import React, { StyleSheet, Text ,View } from "react-native";

interface Props {
    title: string;
}

const Header:FC<Props> = ({title}) => {
    return(
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
   header: {
    height: 80,
    paddingTop: 38,
    backgroundColor: "skyblue",
   },
   title: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
   }
})
