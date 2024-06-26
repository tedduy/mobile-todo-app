import { FC, useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

interface Props {
  title: string;
  description?: string;
  onClickDelete?(): void;
  onClickEdit?(updatedNote: { title: string; description: string }): void;
}

const NoteItem: FC<Props> = ({
  title,
  description,
  onClickDelete,
  onClickEdit,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <TouchableOpacity onPress={() => {setIsVisible(true)}}>
      <View style={styles.container}>
        <View style={{ flexDirection: "column" }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClickDelete}>
            <MaterialCommunityIcons
              name="delete-circle-outline"
              size={24}
              color="black"
            />
            </TouchableOpacity>
          </View>
          <View style={styles.dashLine}></View>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <View>
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={{backgroundColor: "skyblue", width: "100%", borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
          <TextInput style={styles.modalTitle}>{title}</TextInput>
          </View>
          <TextInput style={styles.modalDescription}>{description}</TextInput>
          <TouchableOpacity onPress={() => setIsVisible(false)}>
            <View style={{padding:10}}>
              <AntDesign name="closecircleo" size={24} color="skyblue" />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      </View>
    </TouchableOpacity>
  );
};

export default NoteItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 5,
    margin: 10,
  },
  title: {
    fontSize: 20,
    color: "black",
  },
  description: {
    color: "gray",
  },
  icon: {},
  dashLine: {
    borderTopWidth: 0.5,
    borderStyle: "dashed",
  },
  modalContainer: {
    margin:50,
    marginTop: "auto",
    marginBottom: "auto",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
  },
  modalTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  modalDescription: {
    textAlign: "center",
    paddingTop:5,
  }
  
});
