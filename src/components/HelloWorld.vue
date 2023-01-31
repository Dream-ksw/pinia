<template>
  <div>
    <p>{{ mainStore.count }}</p>
    <p>{{ mainStore.foo }}</p>
    <p>{{ mainStore.arr }}</p>
    <p>{{ mainStore.count10 }}</p>
    <p>{{ mainStore.count10 }}</p>
    <p>{{ mainStore.count10 }}</p>

    <hr>
    <p>{{ count }}</p>
    <p>{{ foo }}</p>

    <hr>
    <button @click="handleChangeState">修改数据</button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMainStore } from '../store'

const mainStore = useMainStore()

// 直接解构store会丢失响应式,需要借助官方提供的storeToRefs API转换为响应式
// 原因: pinia其实是把state数据都做了reactive处理了
// const { count, foo } = useMainStore()

// 解决方式 把解构出来的数据做ref响应式处理
const { count, foo } = storeToRefs(useMainStore())

const handleChangeState = () => {
  // 修改state数据
  // 方式一: 
  // mainStore.count++
  // mainStore.foo = 'hello'

  // 方式二:如果需要修改多个数据,建议使用 $patch 接收一个对象 批量更新
  // mainStore.$patch({
  //   count: mainStore.count + 1,
  //   foo: 'hello',
  //   arr: [...mainStore.arr, 4]
  // })

  // 方式三: $path接收一个函数  批量更新
  // mainStore.$patch((state) => {
  //   state.count++
  //   state.foo = 'hello'
  //   state.arr.push(4)
  // })

  // 方式四: 逻辑比较多的时候可以封装到actions中使用
  mainStore.changeState(10)
}



</script>

<style scoped>

</style>