import { noteService } from '@/services/noteService';
import { Note } from '@/types/note';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface NotesContextType {
  notes: Note[];
  loading: boolean;
  error: Error | null;
  loadNotes: () => Promise<void>;
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => Promise<void>;
  updateNote: (note: Note) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}

interface NotesProviderProps {
  children: ReactNode;
}

export function NotesProvider({ children }: NotesProviderProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const loadNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const allNotes = await noteService.getAll();
      setNotes(allNotes);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (note: Omit<Note, 'id' | 'createdAt'>) => {
    setLoading(true);
    setError(null);
    try {
      await noteService.add(note);
      await loadNotes();
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };

  const updateNote = async (note: Note) => {
    setLoading(true);
    setError(null);
    try {
      await noteService.update(note);
      await loadNotes();
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };

  const deleteNote = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await noteService.delete(id);
      await loadNotes();
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <NotesContext.Provider
      value={{
        notes,
        loading,
        error,
        loadNotes,
        addNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
