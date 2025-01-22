import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Styled containers
const ProductsContainer = styled.div`
    padding: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
`;

const ProductCard = styled.div`
    flex: 1 1 calc(25% - 1rem); /* 4 columns in each row */
    max-width: calc(25% - 1rem);
    min-width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 1rem;
    box-sizing: border-box;
`;

const ProductImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: contain;
`;

const ProductTitle = styled.h2`
    font-size: 1rem;
    margin: 0.5rem 0;
    text-align: center;
`;

const ProductDescription = styled.p`
    font-size: 0.85rem;
    text-align: center;
    color: #555;
`;

const ProductPrice = styled.p`
    font-weight: bold;
    margin: 0.5rem 0;
`;

const QuantityInput = styled.input`
    width: 60px;
    margin-right: 0.5rem;
    padding: 0.25rem;
`;

const AddButton = styled.button`
    background: #000;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
    
    &:hover {
        background: #444;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
`;

const LoadingMessage = styled.div`
    text-align: center;
    font-size: 1.2rem;
    margin: 2rem;
`;

function ProductPage({ category, onAddToCart }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
                if (!res.ok) {
                    throw new Error(`Error: ${res.statusText}`);
                }
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [category]);

    // Handle "Add to Cart" logic
    const handleAddToCart = (product, quantity) => {
        // Minimal input check
        if (quantity < 1) quantity = 1;
        onAddToCart(product, quantity);
    };

    // Render states
    if (loading) return <LoadingMessage>Loading Products...</LoadingMessage>;
    if (error) return <ErrorMessage>{error}</ErrorMessage>;

    // Only show first 8 products for this layout
    const displayedProducts = products.slice(0, 8);

    return (
        <ProductsContainer>
            {displayedProducts.map(product => {
                // Optional short desc
                const shortDesc = product.description
                    ? product.description.slice(0, 60) + '...'
                    : '';
                
                // Track quantity for each product (local state if desired)
                return (
                    <ProductCard key={product.id}>
                        <ProductImage src={product.image} alt={product.title} />
                        <ProductTitle>{product.title}</ProductTitle>
                        <ProductDescription>{shortDesc}</ProductDescription>
                        <ProductPrice>$ {product.price}</ProductPrice>
                        <div style={{ marginBottom: '1rem' }}>
                            <QuantityInput
                                type="number"
                                min="1"
                                defaultValue="1"
                                id={`quantity-${product.id}`}
                            />
                        </div>
                        <AddButton
                            onClick={() => {
                                const quantityInput = document.getElementById(
                                    `quantity-${product.id}`
                                );
                                const quantity = parseInt(quantityInput?.value) || 1;
                                handleAddToCart(product, quantity);
                            }}
                        >
                            Add to Cart
                        </AddButton>
                    </ProductCard>
                );
            })}
        </ProductsContainer>
    );
}

ProductPage.propTypes = {
    category: PropTypes.string.isRequired,
    onAddToCart: PropTypes.func.isRequired,
};

export default ProductPage;