import PopoverTrigger from './trigger.vue'




let Popover = {
  install(Vue, params = {}) {
    if (this.installed) {
      return
    }
    this.installed = true
    this.params = params

    Vue.component('PopoverTrigger', PopoverTrigger)


  }
}

export default Popover


// <popover-trigger trigger="mouseover" tooltip>  trigger / click 触发方式  tooltip特效
//  <span slot="trigger">tool tip test asdf asdf asdfas dfas d</span>
//  <div class="tooltip-menu" slot="menu"></div> 直接注入tooltip-menu 或 dropdown-menu
// </popover-trigger>
