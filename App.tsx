import { ScrollView, StyleSheet, View } from "react-native";
import Header from "./components/Header";
import NoteItem from "./components/NoteItem";
import NoteInput from "./components/NoteInput";
import { useEffect, useState } from "react";
import axios from "axios";

type noteTypes = {
  id: string;
  title: string;
  description?: string;
};

export default function App() {
  const [notes, setNotes] = useState<noteTypes[]>([]);
  const [selectedNoteID, setSelectedNoteID] = useState("");

  useEffect(() => {
    // fetch all notes
    const fetchNotes = async () => {
      const { data } = await axios.get("http://192.168.2.19:3000");
      setNotes(data.notes);
    };
    fetchNotes();
  }, []);

  const addNote = async (note: Omit<noteTypes, "id">) => {
    try {
      const { data } = await axios.post("http://192.168.2.19:3000/create", {
        title: note.title,
        description: note.description,
      });
      setNotes([data.note, ...notes]);
    } catch (error) {
      console.error(error);
    }
  };


  
  return (
    <View style={styles.container}>
      <Header title="Todo App"></Header>
      <NoteInput addNote={addNote} />
      <View style={styles.list}>
        <ScrollView>
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              title={note.title}
              description={note.description}
              onClickDelete={async () => {
                  await axios.delete("http://192.168.2.19:3000/" + note.id);

                  // const updatedNote = notes.filter(({id})=>{
                  //   if(id !== note.id)
                  //     return note;
                  // })
                  const updatedNote = notes.filter(({ id }) => id !== note.id);
                  setNotes([...updatedNote]);
                
              }}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
});
