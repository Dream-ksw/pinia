import { defineStore } from 'pinia'

// 1.定义并导出容器
// 参数1: 容器的ID, 必须唯一, 将来pinia会吧所有的容器挂载到根容器
// 参数2: 选项对象
export const useMainStore = defineStore('main', {
  /**
   * 类似于组件的data 用来存储全局状态的
   * 1.必须是函数: 为了在服务端渲染的时候避免交叉请求导致的数据状态污染
   * 2.必须是箭头函数: 这是为了更好的ts类型推导
   * 3.返回值是一个函数,调用获得容器实例
   */
  state: () => {
    return {
      count: 100,
      foo: 'bar',
      arr: [1, 2, 3]
    }
  },

  /**
   * 类似于组件的computed 用来封装计算属性 有缓存的功能
   */
  getters: {
    // 接收一个可选参数: state
    // count10(state) {
    //   console.log('count10调用了');
    //   return state.count + 10
    // }

    // 如果getters中使用this 那么必须手动指定返回值的类型 否则推导不出来
    count10 ():number {
      return this.count + 10
    }
  },

  /**
   * 类似于组件methods 封装业务逻辑 修改state
   * 注意: 不能使用箭头函数  因为箭头函数没有this 绑定的是父级this
   */
  actions: {
    changeState(num:number) {
      this.count += num
      this.foo = 'hello'
      this.arr.push(num)

      // 逻辑复杂的话建议使用 $patch 批量更新优化性能
      // this.$patch({})
      // this.$patch((state) => {})
    }
  }
})

// 2.使用容器中的state