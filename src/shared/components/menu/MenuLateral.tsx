import { List } from "@mui/icons-material";
import { Avatar, Box, Divider, Drawer, Icon, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material"

interface IMenu {
	children: React.ReactNode
}

export const MenuLateral: React.FC<IMenu> = ({ children }) => {
	const theme = useTheme();
	return (
		<>
			<Drawer variant='permanent'>
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
									<Icon>
										home
									</Icon>
								</ListItemIcon>
							</ListItemButton>
						</List>
					</Box>
				</Box>
			</Drawer>
			<Box height='100vh' marginLeft={theme.spacing(28)} >
				{children}
			</Box>
		</>
	);
};
