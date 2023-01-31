<template>
  <h2>商品列表</h2>
  <ul v-for="item in productsStore.all" :key="item.id">
    <li>
      {{ item.title }} - {{ item.price }} - {{ item.inventory }}
      <br>
      <button :disabled="!item.inventory" @click="addCart(item)">添加到购物车</button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useProductsStore } from '../store/products'
import { useCartStore } from '../store/cart'
import { IProduct } from '../api/shop'

// 获取产品列表
const productsStore = useProductsStore()
productsStore.LoadAllProducts()

// 添加产品到购物车
const cartStore = useCartStore()
const addCart = (product: IProduct) => {
  cartStore.addProductToCart(product)
}


</script>