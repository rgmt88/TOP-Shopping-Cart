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
    position: absolute;
    top: -12px;
    right: -10px;
    background: #000;
    color: #fff;
    border-radius: 50%;
    font-size: 0.7rem;
    width: 18px;
    height: 18px;
    display: flex;
    align-items:center;
    justify-content: center;
`;

const IconWrapper = styled.div`
    position: relative;
    display: inline-block;
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
                <Link to="/user">
                    <IconWrapper>
                        <img 
                            src="./accountIcon.svg"
                            alt="Account Circle Icon"
                            style={{ width: '24px', height: '24px' }}
                        />
                    </IconWrapper>
                </Link>
                <Link to ="/cart">
                    <IconWrapper>
                        <img 
                            src="./cartIcon.svg"
                            alt="Cart Icon"
                            style={{ width: '24px', height: '24px' }}
                        />
                        {cartCount > 0 && <CartCounter>{cartCount}</CartCounter>}
                    </IconWrapper>
                </Link>
            </NavRight>

        </NavBarContainer>
    );
}

export default NavBar;