import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from './CartPage';

describe('CartPage', () => {
    const mockCartItems = [
        {
            id: 1,
            image: 'https://via.placeholder.com/150',
            title: 'Product 1',
            shortDesc: 'Description of Product 1',
            price: 10.99,
            quantity: 2,
        },
        {
            id: 2,
            image: 'https://via.placeholder.com/150',
            title: 'Product 2',
            shortDesc: 'Description of Product 2',
            price: 20.99,
            quantity: 1,
        },
    ];

    const mockUpdateItemQuantity = jest.fn();
    const mockRemoveItem = jest.fn();

    it('renders "Your cart is empty" when there are no items', () => {
        render(
            <CartPage
                cartItems={[]}
                updateItemQuantity={mockUpdateItemQuantity}
                removeItem={mockRemoveItem}
            />
        );

        expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });

    it('renders cart items and calculates subtotal, tax, and total correctly', () => {
        render(
            <CartPage
                cartItems={mockCartItems}
                updateItemQuantity={mockUpdateItemQuantity}
                removeItem={mockRemoveItem}
                shipping={5.99}
                taxRate={0.1} // 10%
            />
        );

        // Check if cart items are displayed
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Product 2')).toBeInTheDocument();

        // Check subtotal, tax, and total
        expect(screen.getByText('$42.97')).toBeInTheDocument(); // Subtotal: (10.99*2 + 20.99)
        expect(screen.getByText('$4.30')).toBeInTheDocument(); // Tax: 10% of subtotal
        expect(screen.getByText('$53.26')).toBeInTheDocument(); // Total: Subtotal + Shipping + Tax
    });

    it('calls updateItemQuantity when quantity input is changed', () => {
        render(
            <CartPage
                cartItems={mockCartItems}
                updateItemQuantity={mockUpdateItemQuantity}
                removeItem={mockRemoveItem}
            />
        );

        const quantityInput = screen.getAllByRole('spinbutton')[0]; // Get the first input
        fireEvent.change(quantityInput, { target: { value: '3' } });

        expect(mockUpdateItemQuantity).toHaveBeenCalledWith(1, 3); // Product ID: 1, Quantity: 3
    });

    it('calls removeItem when the delete button is clicked', () => {
        render(
            <CartPage
                cartItems={mockCartItems}
                updateItemQuantity={mockUpdateItemQuantity}
                removeItem={mockRemoveItem}
            />
        );

        const deleteButton = screen.getAllByText('×')[0]; // Get the first delete button
        fireEvent.click(deleteButton);

        expect(mockRemoveItem).toHaveBeenCalledWith(1); // Product ID: 1
    });

    it('renders the correct summary for a single item', () => {
        render(
            <CartPage
                cartItems={[mockCartItems[0]]} // Single item
                updateItemQuantity={mockUpdateItemQuantity}
                removeItem={mockRemoveItem}
                shipping={0}
                taxRate={0.2} // 20%
            />
        );

        // Subtotal: 10.99 * 2 = 21.98
        // Tax: 20% of 21.98 = 4.40
        // Total: 21.98 + 4.40 = 26.38

        // Use `screen.getAllByText` to select the second occurrence of `$21.98`
        const subtotal = screen.getAllByText('$21.98')[1];
        expect(subtotal).toBeInTheDocument(); // Subtotal

        expect(screen.getByText('$4.40')).toBeInTheDocument(); // Tax
        expect(screen.getByText('$26.38')).toBeInTheDocument(); // Total
    });
});
