<template>
  <div>
    <UIButton type="border" @click="addPublication" v-if="!showAdd">增加一条 publication</UIButton>
    <publication-item-edit v-if="showAdd" :publication="publication" @complete="addComplete" @cancel="cancel"></publication-item-edit>
    <draggable v-model="publicationList" :options="{handle:'.icon-menu'}" @end="dragEnd">
      <div v-for="item of publicationList" :key="item._id" class="admin-panel">
        <publication-item :publication="item"></publication-item>
      </div>
    </draggable>
  </div>
</template>
<script>
import publicationItemEdit from './publication-item-edit.vue';
import publicationItem from './publication-item.vue'
import api from '../../api/index.js';
import draggable from 'vuedraggable';



export default {
  data() {
    return {
      publicationList: [],
      showAdd: false,
      publication: null
    }
  },
  components: {
    publicationItemEdit,
    publicationItem,
    draggable
  },
  methods: {
    dragEnd(e) {
      let indexArr = []
      for (var i = 0; i < this.publicationList.length; i++) {
        indexArr.push({
          index: i,
          id: this.publicationList[i]._id
        })
      }
      api.updateOrder(indexArr).then(response => {
        this.$Toast({
          group: 'top-center',
          text: 'reorder succsee'
        });

      }).catch(error => {
        console.log(error)
      })
    },
    addPublication() {

      this.showAdd = true
    },
    addComplete(data) {
      this.showAdd = false;
      this.publicationList.push(data)
    },
    cancel(){
      this.showAdd = false;
    }
  },
  mounted() {
    api.getList('publication').then(response => {
      this.publicationList = response.data.articleList;
      console.log(this.publicationList)
    }).catch(error => {
      console.log(error)
    })
  }
}

</script>
