import React, { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerContextData {
	IsDrawerOpen: boolean;
	toggleDrawerOpen: () => void;
}

const DrawerContext = createContext({} as IDrawerContextData);
export const useDrawerContext = () => {
	return useContext(DrawerContext)
}
interface IAppDrawerProviderProps{
	children: React.ReactNode
}

export const DrawerProvider: React.FC<IAppDrawerProviderProps> = ({ children }) => {
	const [IsDrawerOpen, setIsDrawerOpen] = useState(false);
	const toggleDrawerOpen = useCallback(() => {
		setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
	}, []);

	return (
		<DrawerContext.Provider value={{ IsDrawerOpen , toggleDrawerOpen }}>			
			{children}
		</DrawerContext.Provider>
	);
}

