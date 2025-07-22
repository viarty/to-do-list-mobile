import { Note } from '@/types/note';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

interface ModalNoteProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (
    note: Omit<Note, 'createdAt' | 'id'> & Partial<Pick<Note, 'id'>>,
  ) => Promise<void>;
  noteToEdit?: Note | null;
}

export default function ModalNote({
  isVisible,
  onClose,
  onSave,
  noteToEdit = null,
}: ModalNoteProps) {
  const [priority, setPriority] = useState<'alta' | 'baixa' | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setPriority(noteToEdit.priority);
    } else {
      setTitle('');
      setContent('');
      setPriority(null);
    }
  }, [noteToEdit, isVisible]);

  useEffect(() => {
    const validTitle = title.trim().length > 0 && title.trim().length <= 60;
    const validContent =
      content.trim().length > 0 && content.trim().length <= 400;
    const validPriority = priority !== null;

    setIsButtonDisabled(!(validTitle && validContent && validPriority));
  }, [title, content, priority]);

  const handleSave = async () => {
    if (isButtonDisabled) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Preencha todos os campos corretamente antes de salvar.',
        position: 'top',
      });
      return;
    }

    try {
      const noteData: Omit<Note, 'createdAt' | 'id'> &
        Partial<Pick<Note, 'id'>> = {
        title: title.trim(),
        content: content.trim(),
        priority: priority!,
        ...(noteToEdit?.id ? { id: noteToEdit.id } : {}),
      };

      await onSave(noteData);

      Toast.show({
        type: 'success',
        text1: noteToEdit ? 'Nota atualizada!' : 'Nota adicionada!',
        text2: noteToEdit
          ? 'Sua nota foi atualizada com sucesso.'
          : 'Sua nota foi salva com sucesso.',
        position: 'top',
      });

      onClose();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao salvar',
        text2: 'Ocorreu um erro ao salvar a nota.',
        position: 'top',
      });
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      avoidKeyboard
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      propagateSwipe
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        className="flex-1 justify-end"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="bg-white rounded-t-3xl min-h-[90%] flex py-10 flex-shrink">
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              className="px-8"
            >
              <Text className="text-2xl font-semibold mb-4 font-poppinsSemi">
                {noteToEdit ? 'Editar nota' : 'Nova nota'}
              </Text>

              <TextInput
                value={title}
                onChangeText={text => {
                  if (text.length <= 60) setTitle(text);
                  else {
                    Toast.show({
                      type: 'info',
                      text1: 'Limite de caracteres',
                      text2: 'Título máximo de 60 caracteres.',
                      position: 'top',
                    });
                  }
                }}
                placeholder="Título"
                placeholderTextColor="#999"
                className="font-poppinsRegular border border-gray-300 rounded-xl px-4 py-3 text-base mb-1"
              />
              <Text className="text-xs text-gray-500 mb-4">
                {title.length}/60
              </Text>

              <TextInput
                value={content}
                onChangeText={text => {
                  if (text.length <= 400) setContent(text);
                  else {
                    Toast.show({
                      type: 'info',
                      text1: 'Limite de caracteres',
                      text2: 'Nota máximo de 400 caracteres.',
                      position: 'top',
                    });
                  }
                }}
                placeholder="Escreva sua nota aqui..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                className="font-poppinsRegular border border-gray-300 rounded-xl px-4 py-3 text-base mb-1 min-h-[250px] "
              />
              <Text className="text-xs text-gray-500 mb-6">
                {content.length}/400
              </Text>

              <View className="mb-6 gap-3">
                {(['alta', 'baixa'] as const).map(level => (
                  <Pressable
                    key={level}
                    onPress={() => setPriority(level)}
                    className={`flex-row items-center gap-2 ${
                      priority === level ? 'opacity-100' : 'opacity-60'
                    }`}
                  >
                    <View className="w-5 h-5 rounded-full border border-[#f1a5a5] items-center justify-center">
                      {priority === level && (
                        <View className="w-3 h-3 rounded-full bg-[#f1a5a5]" />
                      )}
                    </View>
                    <Text className="text-lg font-poppinsRegular">
                      {level === 'alta'
                        ? 'Alta prioridade'
                        : 'Baixa prioridade'}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Pressable
                disabled={isButtonDisabled}
                onPress={handleSave}
                className={`py-4 rounded-3xl items-center ${
                  isButtonDisabled ? 'bg-gray-400' : 'bg-red-400'
                }`}
              >
                <Text className="text-white text-lg font-poppinsSemi">
                  {noteToEdit ? 'Salvar alterações' : 'Adicionar nota'}
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}
