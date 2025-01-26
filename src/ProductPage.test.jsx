import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import ProductPage from './ProductPage';

// Mock fetch response
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
            {
                id: 1,
                title: 'Test Product 1',
                description: 'This is a test product',
                image: 'https://via.placeholder.com/150',
                price: 10.99,
            },
            {
                id: 2,
                title: 'Test Product 2',
                description: 'This is a test product',
                image: 'https://via.placeholder.com/150',
                price: 20.99,
            },
        ]),
    })
);

describe('ProductPage', () => {
    it('renders loading state initially', () => {
        render(<ProductPage category="test-category" onAddToCart={jest.fn()} />);
        
        expect(screen.getByText(/loading products.../i)).toBeInTheDocument();
    });

    it('displays products after fetching data', async () => {
        await act(async () => {
            render(<ProductPage category="test-category" onAddToCart={jest.fn()} />);
        });

        // Wait for the products to load
        const productTitles = await screen.findAllByRole('heading', { level: 2, name: /test product/i });
        expect(productTitles).toHaveLength(2);

        // Ensure product details are displayed
        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        expect(screen.getByText('$ 10.99')).toBeInTheDocument();
    });

    it('calls onAddToCart when "Add to Cart" is clicked', async () => {
        const onAddToCartMock = jest.fn();
        await act(async () => {
            render(<ProductPage category="test-category" onAddToCart={onAddToCartMock} />);
        });

        // Wait for products to load
        await screen.findByText('Test Product 1');

        // Click the "Add to Cart" button
        const addToCartButton = screen.getAllByText(/add to cart/i)[0];
        fireEvent.click(addToCartButton);

        // Ensure the mock function was called with correct arguments
        expect(onAddToCartMock).toHaveBeenCalledWith(
            {
                id: 1,
                title: 'Test Product 1',
                description: 'This is a test product',
                image: 'https://via.placeholder.com/150',
                price: 10.99,
            },
            1 // Default quantity
        );
    });
});