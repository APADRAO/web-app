
import { Avatar, Box, Divider, Drawer, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme, List } from "@mui/material"
import { useAppThemeContext, useDrawerContext } from "../../contexts";
import { useIconeContext } from "../../contexts/IconeContexts";
import { ReactJSX } from "@emotion/react/dist/declarations/src/jsx-namespace";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

interface IListItemLinkProps{
	label:string,
	icon:ReactJSX.Element,
	to:string
	onClick: (() => void) | undefined
};
const ListItemLink: React.FC<IListItemLinkProps> =({to, icon, label, onClick}) =>{

	const navigate = useNavigate();
	const resolvedPath = useResolvedPath(to)
	const match = useMatch({path:resolvedPath.pathname, end:false})
	const handleClick = () =>{
		navigate(to);
		onClick?.();
	};

	return (
		<ListItemButton selected={!!match} onClick={handleClick}>
			<ListItemIcon>
				{icon}
			</ListItemIcon>
			<ListItemText primary={label} />
		</ListItemButton>
	);
}



interface IMenu {
	children: React.ReactNode
}
export const MenuLateral: React.FC<IMenu> = ({ children }) => {
	const theme = useTheme();
	const smDom = useMediaQuery(theme.breakpoints.down('sm'));
	const { IsDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
	const { selectedIcons,  } = useIconeContext();
	const {toggleTheme } =useAppThemeContext();
	return (
		<>
			<Drawer open={IsDrawerOpen} variant={smDom ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
				<Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>
					<Box width='100%' height={theme.spacing(28)} display='flex' alignItems='center' justifyContent='center'>
						<Avatar
							sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
							src="/static/images/avatar/1.jpg" />
					</Box>
					<Divider />
					<Box flex={1}>
						<List component='nav'>
						{drawerOptions.map(drawerOption => (
							<ListItemLink
								key={drawerOption.path}
								icon={drawerOption.icon}
								to={drawerOption.path}
								label={drawerOption.label}
								onClick={smDom?toggleDrawerOpen:undefined}
							/>))}
						</List>
					</Box>
					<Box>
						<List component='nav'>
							<ListItemButton onClick={toggleTheme}>
								<ListItemIcon>
									{selectedIcons.theme}
								</ListItemIcon>
								<ListItemText primary='Tema' />
							</ListItemButton>							
						</List>
					</Box>
				</Box>
			</Drawer>
			<Box height='100vh' marginLeft={smDom ? 0 : theme.spacing(28)}>
				{children}
			</Box>
		</>
	);
};
