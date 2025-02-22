import { List } from "@mui/icons-material";
import { Avatar, Box, Divider, Drawer, Icon,  ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material"
import { useAppDrawerContext } from "../../contexts";

interface IMenu {
	children: React.ReactNode
}

export const MenuLateral: React.FC<IMenu> = ({ children }) => {
	const theme = useTheme();
	const smDom = useMediaQuery(theme.breakpoints.down('sm'));
	const { IsDrawerOpen} = useAppDrawerContext()
	return (
		<>
			<Drawer open={IsDrawerOpen} variant= {smDom ? 'temporary' :'permanent'}>
				<Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>
					<Box width='100%' height={theme.spacing(28)} display='flex' alignItems='center' justifyContent='center'>
						<Avatar
							sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
							src="/static/images/avatar/1.jpg" />
					</Box>
					<Divider />
					<Box flex={1}>
						<List component='nav'>
							<ListItemButton>
								<ListItemIcon>
									<Icon>home</Icon>
								</ListItemIcon>
							</ListItemButton>
							<ListItemText primary='Pagina Inicial' />
						</List>
					</Box>
				</Box>
			</Drawer>
			<Box height='100vh' marginLeft={smDom ? 0 : theme.spacing(28)} >
				{children}
			</Box>
		</>
	);
};
