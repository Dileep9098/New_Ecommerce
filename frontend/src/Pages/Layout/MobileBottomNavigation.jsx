
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ShopTwoIcon from '@mui/icons-material/ShopTwo';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 10,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));


export default function MobileBottomNavigation() {
    const [value, setValue] = useState(0);
    const { cart, TotalCartItems } = useSelector((state) => state.cart);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    // Scroll to top whenever the value changes
    useEffect(() => {
        scrollToTop();
    }, []);

    const [wishListCount, setWishListCount] = useState(0)

    useEffect(() => {
        const wishilist = localStorage.getItem("customerWishList");

        // Check if the wishlist is not null and parse it into an array
        if (wishilist) {
            const wishlistArray = JSON.parse(wishilist);
            const productCount = wishlistArray.length; // Get the count of products in the wishlist
            setWishListCount(parseInt(productCount))

            console.log("Number of products in the wishlist:", productCount);
        } else {
            console.log("Wishlist is empty or doesn't exist.");
        }

    }, [wishListCount])

    return (
        <>
            <div className="mobileBottomNavigation">



                {/* Bottom Navigation */}
                <Box sx={{ position: 'fixed', bottom: -2.8, left: 0, right: 0, zIndex: 1000 }}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <BottomNavigationAction label="Home" icon={<Link to="/" className='text-dark'><HomeIcon /></Link>} />
                        <BottomNavigationAction label="You" icon={<Link to="/profile" className='text-dark'><PersonIcon /></Link>} />
                        <BottomNavigationAction label="Archive" icon={
                            <Link to="/cart">
                                <IconButton aria-label="cart">
                                    <StyledBadge badgeContent={TotalCartItems ?? 0} color="secondary">
                                        <ShoppingCartIcon />
                                    </StyledBadge>
                                </IconButton>
                            </Link>

                        } />

                        {/* <BottomNavigationAction label="Archive" icon={
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={TotalCartItems ?? 0} color="secondary">
                                    <Link to="/cart" className='text-dark'><ShoppingCartIcon /></Link>
                                </StyledBadge>
                            </IconButton>

                        } /> */}
                        {/* <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} /> */}
                        <BottomNavigationAction label="Favorites" icon={
                            <Link to="/my-wishlist">
                                <IconButton aria-label="wishlist">
                                    <StyledBadge badgeContent={wishListCount ?? 0} color="secondary">
                                        <FavoriteIcon />
                                    </StyledBadge>
                                </IconButton>
                            </Link>

                        } />
                        <BottomNavigationAction label="Shop" icon={<Link to="/all-product/0/all-categories" className='text-dark'><ShopTwoIcon /></Link>} />

                    </BottomNavigation>
                </Box>

            </div>
        </>
    );
}

