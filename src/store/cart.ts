import { defineStore } from 'pinia'
import { buyProducts, IProduct } from '../api/shop'
import { useProductsStore } from './products'

type CartProduct = {
  quantity: number
} & Omit<IProduct, 'inventory'>

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      cartProducts: [] as CartProduct[],
      checkoutStatus: null as null | string
    }
  },

  getters: {
    totalPrice(state) {
      const price =  state.cartProducts.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
      return price.toFixed(2)
    }
  },

  actions: {
    addProductToCart(product:IProduct) {
      // 查看商品是否有库存
      if(product.inventory < 1) return
      // 查看购物车中是否已有该商品
      const cartItem = this.cartProducts.find(item => item.id === product.id)
      if(cartItem) {
        // 如果有则让商品的数量+1
        cartItem.quantity++
      } else {
        // 如果没有则添加到购物车列表中
        this.cartProducts.push({
          id: product.id,
          // 第一次加到购物车中的商品数量就是1
          quantity: 1,
          title: product.title,
          price: product.price
        })
      }
      // 更新商品的库存
      const productsStore = useProductsStore()
      productsStore.decreamentProduct(product)
    },

    async checkout() {
      if(this.cartProducts.length < 1) return
      const res = await buyProducts()
      this.checkoutStatus = res ? '成功' : '失败'
      // 如果结算成功清空购物车
      if(res) {
        this.cartProducts = []
      }
    }
  }
})