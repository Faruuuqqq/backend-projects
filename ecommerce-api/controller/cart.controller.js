const { Cart } = require('../model');

// create new cart
async function createCart(newCart) {
    try {
        const carts = await Cart.create(newCart);
        return carts;
    } catch (err) {
        throw err;
    }
}

// retrieve all carts
async function getAllCarts() {
    try {
        const carts = await Cart.findAll()
        return carts;
    } catch (err) {
        throw err;
    }
}

// retrieve a specific cart
async function getCartById(id) {
    try {
        const cart = await Cart.findByPk(id);
        return cart;
    } catch (err) {
        throw err;
    }
}

// update a specific part
async function updateCartById(id, updates) {
    try {
        const cart = await Cart.findByPk(id);
        if(!cart) {
            throw new Error(`Cart with id ${id} not found`);
        }
        await cart.update(updates);
        return cart;
    } catch (err) {
        throw err;
    }
}

// delete a specific cart
async function deleteCartById(id) {
    try {
        const cart = await Cart.findByPk(id);
        if (!cart) {
            throw new Error(`Cart with id ${id} not found`);
        }
        await cart.destroy();
        return true;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createCart,
    getAllCarts,
    getCartById,
    updateCartById,
    deleteCartById,
};