# Notes and Plan for the APP

Objective: build a mock shopping cart

UI /UX:
We are going to have a simple landing page to greet the users. There’s going to be a nav bar with the logo on the left, on the middle – links to the 3 different shopping sections, and on the right the “user page” logo/link and the shopping cart logo/link (displays the number of items in the cart). This navbar stays constant in all the links.

Then we are going to have a page that displays 6 items for shopping with corresponding information and the “Add to Cart” button (user manually types in how many items to buy).

Finally, we are going to have a shopping cart page that shows:

- Product info
- Price
- Quantity (adjustable by user)
- Total
- “X” to eliminate the product

On the right side, we should have the order summary with subtotal, shipping, tax, total, and a “Checkout” button.

Tech Stack:
- React with Vite template
- React Router
- styled components for css
- Since is a mock-up, everything on the front
- Fetch shop items from FakeStore API
- Include error/loading states when fetching from the FakeStore API
- Consider adding a 404 or “Not Found” page for invalid routes

** We are going to use a top-level component (Add.jsx) using useState to manage the info from the shopping cart



