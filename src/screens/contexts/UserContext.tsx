// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  usuario: { email: string; token: string } | null;
  setUsuario: (usuario: { email: string; token: string }) => void;
};

const AuthContext = createContext<AuthContextType>({
  usuario: null,
  setUsuario: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuarioState] = useState<{ email: string; token: string } | null>(null);

  useEffect(() => {
    const loadUsuario = async () => {
      const storedUsuario = await AsyncStorage.getItem('usuario');
      if (storedUsuario) {
        setUsuarioState(JSON.parse(storedUsuario));
      }
    };
    loadUsuario();
  }, []);

  const setUsuario = async (newUsuario: { email: string; token: string }) => {
    await AsyncStorage.setItem('usuario', JSON.stringify(newUsuario));
    await AsyncStorage.setItem('token', newUsuario.token); // Armazenando token
    setUsuarioState(newUsuario);
  };

  return (
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
