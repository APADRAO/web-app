import React, { createContext, JSX, useCallback, useContext, useState } from "react";
import { Home, Menu, Settings, Info, Person, DarkMode, Add, Save, Delete,ArrowBack } from "@mui/icons-material"; // Ícones padrão do MUI

// Interface do contexto para gerenciar os ícones
interface IIconeContextsData {
  selectedIcons: Record<string, JSX.Element>; // Ícones por botão
  setIcon: (button: string, iconName: string) => void; // Função para definir ícone
}

// Criando o contexto
const IconeContext = createContext({} as IIconeContextsData);

// Hook personalizado para acessar o contexto
export const useIconeContext = () => {
  return useContext(IconeContext);
};

// Tipagem do Provider
interface IIconeContextsProviderProps {
  children: React.ReactNode;
}

// Componente Provider que fornecerá o contexto para a aplicação
export const IconeProvider: React.FC<IIconeContextsProviderProps> = ({ children }) => {
  // Estado que armazena os ícones associados a cada botão
  const [selectedIcons, setSelectedIcons] = useState<Record<string, JSX.Element>>({
    home: <Home />,
    menu: <Menu />,
    settings: <Settings />,
    info: <Info />,
    user: <Person />,
    theme: <DarkMode />,
    add: <Add />,
    save: <Save />,
    delete:<Delete />,
    back: <ArrowBack />
  });

  // Mapeamento de ícones disponíveis
  const iconMap: Record<string, JSX.Element> = {
    home: <Home />,
    menu: <Menu />,
    settings: <Settings />,
    info: <Info />,
    user: <Person />,
    theme: <DarkMode />,
    add: <Add />,
    save: <Save />,
    delete:<Delete />,
    back: <ArrowBack />
  };

  // Função para atualizar o ícone de um botão específico
  const setIcon = useCallback((button: string, iconName: string) => {
    setSelectedIcons((prev) => ({
      ...prev,
      [button]: iconMap[iconName] || prev[button], // Mantém o ícone atual se o nome não for encontrado
    }));
  }, []);

  return (
    <IconeContext.Provider value={{ selectedIcons, setIcon }}>
      {children}
    </IconeContext.Provider>
  );
};
