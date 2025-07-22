import React from 'react';
import { BaseToast, ToastConfig } from 'react-native-toast-message';

export const toastConfig: ToastConfig = {
  success: ({ text1, text2, ...rest }) => (
    <BaseToast
      {...rest}
      style={{
        borderLeftColor: '#4CAF50',
        backgroundColor: '#e6f4ea',
        position: 'relative',
        zIndex: 1000,
      }}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'semibold',
        color: '#2e7d32',
      }}
      text2Style={{
        fontSize: 14,
        color: '#4caf50',
      }}
      text1={text1}
      text2={text2}
    />
  ),

  error: ({ text1, text2, ...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: '#f44336', backgroundColor: '#fcebea' }}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'semibold',
        color: '#b71c1c',
        position: 'relative',
        zIndex: 1000,
      }}
      text2Style={{
        fontSize: 14,
        color: '#f44336',
      }}
      text1={text1}
      text2={text2}
    />
  ),
};
