
import React, { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerOptions {
	label:string;
	icon:React.JSX.Element;
	path:string;
}
interface IDrawerContextData {
	IsDrawerOpen: boolean;
	drawerOptions: IDrawerOptions[];
	toggleDrawerOpen: () => void;
	setDrawerOptions: (newDrawerOptions: IDrawerOptions[]) => void;
}

const DrawerContext = createContext({} as IDrawerContextData);
export const useDrawerContext = () => {
	return useContext(DrawerContext)
}
interface IAppDrawerProviderProps{
	children: React.ReactNode
}

export const DrawerProvider: React.FC<IAppDrawerProviderProps> = ({ children }) => {
	
	const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);
	const [IsDrawerOpen, setIsDrawerOpen] = useState(false);
	
	const toggleDrawerOpen = useCallback(() => {
		setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
	}, []);
	const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[]) => {
		setDrawerOptions (newDrawerOptions);
	}, []);

	return (
		<DrawerContext.Provider value={{ IsDrawerOpen , drawerOptions, toggleDrawerOpen, setDrawerOptions:handleSetDrawerOptions}}>			
			{children}
		</DrawerContext.Provider>
	);
}

