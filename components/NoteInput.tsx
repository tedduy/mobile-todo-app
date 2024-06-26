import {  FC, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

interface NoteInputProps {
    addNote: (note: { title: string; description: string }) => void;
  }

const NoteInput:FC<NoteInputProps> = ({addNote}) => {
   const [values, setValues] = useState({
    title: "",
    description: "",
   })
   const handleChange = ( name: string, value: string ) => {
    setValues({ ...values, [name]: value });
  };
  
  const handleAddNote = () => {
    addNote(values);
    setValues({ title: "", description: "" });
  };

  return (
    <View style={{ margin: 12 }}>
      <TextInput style={styles.input} 
      placeholder="new todo"
      value={values.title}
      onChangeText={(text) => handleChange('title', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="some description (if have)"
        value={values.description}
        onChangeText={(text) => handleChange('description', text)}
      />
      <Button
        onPress={handleAddNote}
        title="Add todo"
        color="skyblue"
      ></Button>
    </View>
  );
};

export default NoteInput;

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
