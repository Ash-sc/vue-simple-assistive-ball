import AssistiveBall from './AssistiveBall.vue'
const VueComponent = {
  install: function(Vue) {
    Vue.component('assistive-ball', AssistiveBall)
  }
}
// 这里的判断很重要
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueComponent)
}
export default VueComponent

export { AssistiveBall }
