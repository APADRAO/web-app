
import { Avatar, Box, Divider, Drawer, Icon, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme, List as MuiList, SvgIcon } from "@mui/material"
import { useDrawerContext } from "../../contexts";
import { useIconeContext } from "../../contexts/IconeContexts";

interface IMenu {
	children: React.ReactNode
}

export const MenuLateral: React.FC<IMenu> = ({ children }) => {
	const theme = useTheme();
	const smDom = useMediaQuery(theme.breakpoints.down('sm'));
	const { IsDrawerOpen, toggleDrawerOpen } = useDrawerContext();
	const { selectedIcons, setIcon } = useIconeContext();

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
						<MuiList component='nav'>
							<ListItemButton>
								<ListItemIcon>
									{selectedIcons.home}
								</ListItemIcon>
								<ListItemText primary='Página Inicial' />
							</ListItemButton>
							<ListItemButton>
								<ListItemIcon >
									{selectedIcons.settings}
								</ListItemIcon>
								<ListItemText primary='Settings' />
							</ListItemButton>
						</MuiList>
					</Box>
				</Box>
			</Drawer>
			<Box height='100vh' marginLeft={smDom ? 0 : theme.spacing(28)}>
				{children}
			</Box>
		</>
	);
};
