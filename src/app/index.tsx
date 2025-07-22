import ModalNote from '@/components/ModalNote';
import { useNotes } from '@/contexts/NotesContext';
import { Note } from '@/types/note';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function App() {
  const { notes, loading, error, deleteNote, updateNote, addNote } = useNotes();

  const [isModalVisible, setModalVisible] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      Toast.show({
        type: 'success',
        text1: 'Nota deletada',
        text2: 'A nota foi removida com sucesso.',
        position: 'top',
      });
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível deletar a nota.',
        position: 'top',
      });
    }
  };

  const handleSaveNote = async (
    noteData: Omit<Note, 'createdAt' | 'id'> & Partial<Pick<Note, 'id'>>,
  ) => {
    try {
      if (noteData.id) {
        await updateNote(noteData as Note);
        Toast.show({
          type: 'success',
          text1: 'Nota atualizada',
          text2: 'Sua nota foi atualizada com sucesso.',
          position: 'top',
        });
      } else {
        await addNote(noteData as Omit<Note, 'id' | 'createdAt'>);
        Toast.show({
          type: 'success',
          text1: 'Nota adicionada',
          text2: 'Sua nota foi salva com sucesso.',
          position: 'top',
        });
      }
      setModalVisible(false);
      setNoteToEdit(null);
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível salvar a nota.',
        position: 'top',
      });
    }
  };

  const openEditModal = (note: Note) => {
    setNoteToEdit(note);
    setModalVisible(true);
  };

  if (loading)
    return <Text className="text-center mt-10">Carregando notas...</Text>;
  if (error)
    return <Text className="text-center mt-10">Erro ao carregar notas.</Text>;

  return (
    <>
      <ScrollView className="flex-1 bg-gray-200">
        <View className="flex flex-col gap-6 py-6 px-5">
          {notes.length === 0 ? (
            <View className="flex-1 justify-center items-center mt-20">
              <Text
                style={{ fontFamily: 'Poppins-Regular' }}
                className="text-gray-500 text-lg"
              >
                Nenhuma nota encontrada.
              </Text>
            </View>
          ) : (
            notes.map(note => {
              const isAlta = note.priority === 'alta';

              return (
                <Pressable
                  key={note.id}
                  onPress={() => openEditModal(note)}
                  className={`w-full min-h-[260px] px-6 py-4 flex flex-col gap-3 rounded-2xl ${
                    isAlta ? 'bg-geraldine-lightActive' : 'bg-white'
                  }`}
                  style={({ pressed }) => ({
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                  })}
                >
                  <View className="flex flex-row items-center justify-between">
                    <Text
                      style={{ fontFamily: 'Poppins-SemiBold' }}
                      className={`text-2xl max-w-[90%] ${
                        isAlta ? 'text-white' : 'text-stormDust-normal'
                      }`}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {note.title}
                    </Text>
                    <FontAwesome5
                      name="trash"
                      size={24}
                      color={isAlta ? '#fde3e3' : '#d1d1d1'}
                      onPress={() => handleDelete(note.id)}
                    />
                  </View>
                  <View className="flex-1">
                    <Text
                      style={{ fontFamily: 'Poppins-Regular' }}
                      className={`text-lg ${
                        isAlta ? 'text-white' : 'text-stormDust-normal'
                      }`}
                    >
                      {note.content}
                    </Text>
                  </View>
                  <FontAwesome5
                    name="pen"
                    size={22}
                    color={isAlta ? '#fde3e3' : '#d1d1d1'}
                  />
                </Pressable>
              );
            })
          )}
        </View>
      </ScrollView>

      <ModalNote
        isVisible={isModalVisible}
        onClose={() => {
          setModalVisible(false);
          setNoteToEdit(null);
        }}
        onSave={handleSaveNote}
        noteToEdit={noteToEdit}
      />
    </>
  );
}
