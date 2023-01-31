import { defineStore } from 'pinia'
import { getProducts, IProduct } from '../api/shop'

export const useProductsStore = defineStore('products', {
  state: () => {
    return {
      // 所有商品列表  类型断言
      all: [] as IProduct[]
    }
  },

  getters: {

  },
   
  actions: {
    async LoadAllProducts() {
      const res = await getProducts()
      this.all = res
    },

    decreamentProduct(product: IProduct) {
      const res = this.all.find(item => item.id === product.id)
      if (res) {
        res.inventory--
      }
    }
  }
})