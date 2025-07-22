import ModalNote from '@/components/ModalNote';
import { useNotes } from '@/contexts/NotesContext';
import { Note } from '@/types/note';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function Header() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);
  const { addNote, updateNote } = useNotes();

  const handleSaveNote = async (
    noteData: Omit<Note, 'createdAt' | 'id'> & Partial<Pick<Note, 'id'>>,
  ) => {
    if (noteData.id) {
      await updateNote(noteData as Note);
    } else {
      await addNote(noteData as Omit<Note, 'id' | 'createdAt'>);
    }
  };

  const openAddModal = () => {
    setNoteToEdit(null);
    setModalVisible(true);
  };

  return (
    <>
      <View className="w-full bg-white px-6 py-5 flex flex-row items-center justify-between gap-2 ">
        <View className="flex flex-row items-center gap-2">
          <Feather name="home" size={24} color="black" />
          <Text
            className="text-xl font-semibold"
            style={{ fontFamily: 'Poppins-Bold' }}
          >
            Caderno de Notas
          </Text>
        </View>
        <Pressable
          onPress={openAddModal}
          className="flex-row items-center gap-2 px-4 py-2 rounded-full bg-geraldine-lightActive"
        >
          <Feather name="plus" size={20} color="white" />
        </Pressable>
      </View>

      <ModalNote
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveNote}
        noteToEdit={noteToEdit}
      />
    </>
  );
}
