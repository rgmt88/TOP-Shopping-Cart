import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled components
const NavBarContainer = styled.nav`
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: #f2f2f2;    
`;

const Logo = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`;

const NavLinks = styled.div`
    display: flex;
    gap: 1.5rem;
`;

const NavRight = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
`;

const CartCounter = styled.span`
    background: #000;
    color: #fff;
    border-radius: 50%;
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
    margin-left: 0.25rem;
`;

// Main NavBar component
function NavBar({ cartCount }) {
    return (
        <NavBarContainer>
            {/* Left: Logo */}
            <Logo>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    My Store
                </Link>
            </Logo>

            {/* Middle: Shopping section links */}
            <NavLinks>
                <Link to="/electronics">Electronics</Link>
                <Link to="/clothing">Clothing</Link>
                <Link to="/accessories">Accessories</Link>
            </NavLinks>

            {/* Right: User Page Link and Cart icon with count */}
            <NavRight>
                <Link to="/user">User Page</Link>
                <Link to ="/cart">
                    Cart
                    {cartCount > 0 && <CartCounter>{cartCount}</CartCounter>}
                </Link>
            </NavRight>

        </NavBarContainer>
    );
}

export default NavBar;