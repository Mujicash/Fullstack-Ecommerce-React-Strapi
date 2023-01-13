import { useDispatch, useSelector } from 'react-redux';
import { Badge, Box, IconButton } from '@mui/material';
import { PersonOutline, ShoppingBagOutlined, MenuOutlined, SearchOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { shades } from '../../theme';
import { setIsCartOpen } from '../../state';

const NavBar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.cart);

	return (
		<Box
			display="flex"
			alignItems="center"
			width="100%"
			height="75px"
			backgroundColor="rgba(255, 255, 255, 0.95)"
			color="black"
			position="fixed"
			top="0"
			left="0"
			zIndex="1"
		>
			<Box
				width="85%"
				margin="auto"
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Box
					onClick={() => navigate("/")}
					sx={{ "&:hover": { cursor: "pointer" } }}
					color={shades.secondary[500]}
					fontSize="32px"
				>
					ECOMMERCE
				</Box>
				<Box
					display="flex"
					justifyContent="space-between"
					columnGap="20px"
					zIndex="2"
				>
					<IconButton sx={{ color: "black" }}>
						<SearchOutlined sx={{ fontSize: 30 }} />
					</IconButton>
					<IconButton sx={{ color: "black" }}>
						<PersonOutline sx={{ fontSize: 30 }} />
					</IconButton>
					<Badge
						badgeContent={cart.length}
						color="secondary"
						invisible={cart.length === 0}
						sx={{
							"& .MuiBadge-badge": {
								right: 5,
								top: 5,
								padding: "0 4px",
								height: "20px",
								minWidth: "20px",
							},
						}}
					>
						<IconButton
							onClick={() => dispatch(setIsCartOpen({}))}
							sx={{ color: "black" }}>
							<ShoppingBagOutlined sx={{ fontSize: 30 }} />
						</IconButton>
					</Badge>
					<IconButton sx={{ color: "black" }}>
						<MenuOutlined sx={{ fontSize: 30 }} />
					</IconButton>

				</Box>
			</Box>

		</Box>
	);
};


export default NavBar;