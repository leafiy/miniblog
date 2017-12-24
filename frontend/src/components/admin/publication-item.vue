<template>
  <div>
    <div class="publication" v-if="!showEdit && pub">
      <div class="actions">
        <icon name="menu">drag to sort</icon>
        <icon name="pencil" @click.native="edit">edit</icon>
      </div>
      <h3 class="title hover-line font-exo">{{pub.title}}</h3>
      <p class="muted">{{pub.date}}</p>
    </div>
    <publication-item-edit v-if="showEdit" :publication="pub" @cancel="cancel" @complete="complete" @delete="deletePub"></publication-item-edit>
  </div>
</template>
<script>
import publicationItemEdit from './publication-item-edit.vue';
import api from '../../api/index.js';
export default {
  data() {
    return {
      showEdit: false,
      pub: {}
    }
  },
  props: {
    publication: {
      type: Object,
      required: true
    }
  },
  components: {
    publicationItemEdit
  },
  methods: {
    edit() {
      this.showEdit = true
    },
    cancel() {
      this.showEdit = false
    },
    complete(data) {
      this.pub = data
      this.showEdit = false
    },
    deletePub() {
      this.showEdit = false
      this.pub = null
    }
  },
  mounted() {
    if (this.publication) {
      this.pub = this.publication
    }
  }
}

</script>
<style lang="scss" scoped>
.actions {
  position: absolute;
  bottom: 4px;
  right: 4px;
  i {
    margin: 0 10px;
    cursor: pointer;
  }
}

.icon-menu {
  cursor: move;
}

</style>
