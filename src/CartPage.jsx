import styled from 'styled-components';

// Left area container (cart items)
const CartContainer = styled.div`
    flex: 3;
    margin-right: 2rem;
`;

// Right area container (summary)
const SummaryContainer = styled.div`
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 1rem;
    height: fit-content;
`;

// Main wrapper for cart page
const CartPageWrapper = styled.div`
    display: flex;
    gap: 1rem;
    padding: 2rem;
    align-items: flex-start;
`;

// Individual cart item row
const CartItemRow = styled.div`
    display: grid;
    grid-template-columns: 80px 2fr 1fr 1fr 50px;
    /* Image, product details, price, quantity, total, delete */
    grid-template-areas:
        "image title price qty remove"
        "image desc price qty remove";
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid #ddd;
    align-items: center;
`;

// Image 
const CartItemImage = styled.img`
    grid-area: image;
    width: 80px;
    height: 80px;
    object-fit: contain;
`;

// Title
const CartItemTitle = styled.div`
    grid-area: title;
    font-weight: bold;
`;

// Description
const CartItemDesc = styled.div`
    grid-area: desc;
    font-size: 0.9rem;
    color: #666;
`;

// Price
const CartItemPrice = styled.div`
    grid-area: price;
    font-weight: bold;
`;

// Quantity input
const CartItemQty = styled.input`
    width: 60px;
    padding: 0.25rem;
    grid-area: qty;
`;

// Delete button
const DeleteButton = styled.button`
    grid-area: remove;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: #888;
    &:hover {
        color: #000;
    }
`;

// Row total
const CartItemTotal = styled.div`
    grid-column: 4;
    justify-self: end;
    font-weight: bold;
    margin-top: -2.2rem;
`;

// Summary items
const SummaryTitle = styled.h2`
    margin-bottom: 1rem;
`;

const SummaryRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
`;

// Checkout button
const CheckoutButton = styled.button`
    margin-top: 1rem;
    width: 100%;
    background-color: #000;
    color: #fff;
    padding: 0.75rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #333;
    }
`;

function CartPage({
    cartItems=[],
    updateItemQuantity,
    removeItem,
    shipping = 9.99,
    taxRate = 0.18
}) {
    // Calculate subtotal
    const subtotal = cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    // Tax
    const tax = subtotal * taxRate;

    // Total
    const total = subtotal + shipping + tax;

    // Render
    return (
        <CartPageWrapper>
            {/* Left side: Cart Items */}
            <CartContainer>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ): (
                    cartItems.map(item => (
                        <div key={item.id} style={{ position: 'relative' }}>
                            <CartItemRow>
                                {/* Product image */}
                                <CartItemImage src={item.image} alt={item.title} />

                                {/* Title */}
                                <CartItemTitle>{item.title}</CartItemTitle>

                                {/* Description */}
                                <CartItemDesc>{item.shortDesc}</CartItemDesc>

                                {/* Price */}
                                <CartItemPrice>${item.price}</CartItemPrice>

                                {/* Quantity */}
                                <CartItemQty
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={e => {
                                        const newQty = parseInt(e.target.value) || 1;
                                        updateItemQuantity(item.id, newQty);
                                    }}
                                />

                                {/* Delete Button */}
                                <DeleteButton onClick={() => removeItem(item.id)}>
                                    &times;
                                </DeleteButton>
                            </CartItemRow>

                            {/* Row Total (P x Q) */}
                            <CartItemTotal>
                                ${(item.price * item.quantity).toFixed(2)}
                            </CartItemTotal>
                        </div>
                    ))
                )}
            </CartContainer>

            {/* Right side: Summary */}
            <SummaryContainer>
                <SummaryTitle>Order Summary</SummaryTitle>

                <SummaryRow>
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                </SummaryRow>

                <SummaryRow>
                    <span>Shipping:</span>
                    <span>${shipping.toFixed(2)}</span>
                </SummaryRow>

                <SummaryRow>
                    <span>Tax ({(taxRate * 100).toFixed(0)}%):</span>
                    <span>${tax.toFixed(2)}</span>
                </SummaryRow>

                <hr />

                <SummaryRow style={{ fontWeight: 'bold' }}>
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </SummaryRow>

                <CheckoutButton>Checkout</CheckoutButton>
            </SummaryContainer>
        </CartPageWrapper>
    );
}

export default CartPage;