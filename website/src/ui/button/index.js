import UIButton from './button.vue';
import UIButtonGroup from './button-group.vue';


UIButton.install = function(Vue) {
  Vue.component(UIButton.name, UIButton);
  Vue.component(UIButtonGroup.name,UIButtonGroup)
};



export default UIButton;