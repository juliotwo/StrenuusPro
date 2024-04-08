'use client'
import { createContext, useEffect, useState } from 'react';
import { addNewProduct, getProducts, substProductItem, sumProductItem, cleanCart } from '@/utils/cart';
import { productsData } from '@/data';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const getProductsCart = () => {
        const productsStorage = getProducts()
        const newProducts = productsStorage?.map(item => {
            return productsData.find(it => +it.id === +item.id)
        })
        setProducts(newProducts)
    }

    useEffect(() => {
        getProductsCart()
    }, [])

    const validateProductInCart = (id) => {
        const exist = products.find(it => {
            console.log(it.id, id)
            return +it.id === +id
        })

        return exist
    }

    const handleAddOrRemoveProduct = (id) => {
        addNewProduct(id)
        getProductsCart()
    }

    const sumProductItemCart = (id) => {
        sumProductItem(id)
        getProductsCart()
    }
    const substProductItemCart = (id) => {
        substProductItem(id)
        getProductsCart()
    }

    const getQuantityProductCart = (id) => {
        const quantity = getProducts().find(it => +it.id === +id)?.quantity;
        return quantity || 1
    }

    const getTotalCart = () => {
        const total = products.reduce((acc, item) => (
            acc + (+item.price * getQuantityProductCart(item.id))
        ), 0)
        return total
    }

    const cleanCartItems = () => {
        cleanCart()
        getProductsCart()
    }

    return (
        <CartContext.Provider value={{
            products,
            handleAddOrRemoveProduct,
            validateProductInCart,
            getTotalCart,
            sumProductItemCart,
            substProductItemCart,
            getQuantityProductCart,
            cleanCartItems
        }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider