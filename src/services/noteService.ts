import { Note } from '@/types/note';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@notes';

let nextId = 1;

async function getStoredNotes(): Promise<Note[]> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export const noteService = {
  async getAll(): Promise<Note[]> {
    return await getStoredNotes();
  },

  async add(note: Omit<Note, 'id' | 'createdAt'>): Promise<void> {
    const notes = await getStoredNotes();
    const newNote: Note = {
      ...note,
      id: String(nextId++), // id incremental como você queria
      createdAt: new Date().toISOString(),
    };
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([newNote, ...notes]),
    );
  },

  async delete(id: string): Promise<void> {
    const notes = await getStoredNotes();
    const filtered = notes.filter(note => note.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  async update(updatedNote: Note): Promise<void> {
    const notes = await getStoredNotes();
    const updatedList = notes.map(note =>
      note.id === updatedNote.id ? updatedNote : note,
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  },

  async clearAll(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
  },
};
