const Cart = require('../models/cartModel'); // Import the Cart model

// Controller function to add an item to the cart
const addToCart = async (req, res) => {
    const { userId, shoeId, shoeName, price, quantity = 1, image, size } = req.body; // Assuming data is sent via POST request body

    try {
        // Find the cart for the given userId or create a new cart if not found
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: []
            });
        }

        // Check if the item already exists in the cart
        const existingItemIndex = cart.items.findIndex(item => item.shoeId === shoeId);

        if (existingItemIndex !== -1) {
            // If item exists, update its quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // If item does not exist, add it to the cart
            cart.items.push({ shoeId, shoeName, price, quantity, image, size });
        }

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Item added to cart successfully', cart });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const removeFromCart = async (req, res) => {
    const { userId, shoeId } = req.body; // Assuming userId and shoeId are sent via POST request body

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Find the index of the item with the shoeId
        const itemIndex = cart.items.findIndex(item => item.shoeId === shoeId);

        if (itemIndex === -1) {
            return res.status(404).json({ error: 'Item not found in the cart' });
        }

        // Remove the item from the cart's items array
        cart.items.splice(itemIndex, 1);

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Item removed from cart successfully', cart });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getCart = async (req, res) => {
    const { userId } = req.params; // Assuming userId is sent as a route parameter

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json({ cart });
    } catch (error) {
        console.error('Error getting cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { addToCart, removeFromCart, getCart };