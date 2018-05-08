import ModalTemplate from './modal.vue'
import { events } from '../events.js'




let Modal = {
  install(Vue, params = {}) {
    if (this.installed) {
      return
    }
    this.installed = true
    this.params = params

    Vue.component('modal', ModalTemplate)

    Vue.prototype.$Modal = (params) => {
      if (typeof params === 'string') {
        params = { type: 'message', title: '', message: params }
      }
      events.$emit('addModal', params)
    }
    Vue.prototype.$Modal.dismiss = () => {
      events.$emit('removeModal')
    }
  }
}

export default Modal


      // this.$Modal({
      //   type:'alert',
      //   title:'发水电费',
      //   message:'asdfasdfasdf asdf as dfas f asdf a sdf asf as df asdf ',
      //   size:'small',
      //   buttons:[
      //     {
      //       name:'ok',
      //       action:()=>{
      //         this.$Toast('a')
      //       }
      //     },
      //     {
      //       name:'cancel',
      //       action:()=>{
      //         this.$Toast('b');
      //         this.$Modal.dismiss()
      //       }
      //     }
      //   ]
      // })