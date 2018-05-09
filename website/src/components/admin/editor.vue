<template>
  <mavon-editor v-model="content" @change="change" ref="md" @imgAdd="$imgAdd" language="en"></mavon-editor>
</template>
<script>
import api from '../../api/index.js'
export default {
  data() {
    return {}
  },
  props: ['value'],
  computed: {
    content: {
      get: function() {
        return this.value
      },
      set: function(newValue) {
        return newValue
      }
    }
  },
  methods: {
    change(value) {
      this.$emit('input', value)
    },
    $imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append('image', $file)
      api.upload(formdata).then(data => {
        this.$refs.md.$img2Url(pos, data.data)
      }).catch(err => {
        console.log(err)
      })

    },

  }
}
</script>