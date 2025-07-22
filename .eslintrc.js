module.exports = {
  root: true,
  extends: [
    '@react-native-community', // Base para React Native
    'plugin:react/recommended', // Regras para React
    'plugin:react-hooks/recommended', // Regras para Hooks
    'plugin:react-native/all', // Regras para React Native
    'prettier', // Desativa regras conflitantes com Prettier
  ],
  plugins: ['react', 'react-native', 'prettier'],
  rules: {
    'prettier/prettier': 'error', // Mostra erros do Prettier como erros do ESLint
    'react/react-in-jsx-scope': 'off', // Necessário para projetos com Expo
    'react-native/no-inline-styles': 'off', // Permitir estilos inline no React Native
  },
  settings: {
    react: {
      version: 'detect', // Detecta automaticamente a versão do React
    },
  },
};
