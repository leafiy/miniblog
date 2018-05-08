<template>
  <div>
    <UIButton type="primary" @click="$router.push('/admin/create/article/'+$route.params.panel)">新建Project</UIButton>
    <div class="hr"></div>
    <div v-if="projectList" v-for="item of projectList">
      <background v-if="item.fileList.length" :src="item.fileList[0].url" width="100%" height="100px" style="margin-right:20px;"></background>
      <div>
        <h3><span class="muted" v-if="item.isDraft"><small><icon name="box"></icon>draft</small></span> {{item.title}}</h3>
        <p class="muted">
          <span class="pointer" @click="edit(item._id)"><icon name="pencil"></icon>edit</span>
          <span class="pointer" @click="del(item._id)"><icon name="cancel-circled"></icon>delete</span>
        </p>
        <p class="muted" v-if="item.location">
          <icon name="map"></icon><b>{{item.location.formatted_address}}</b></p>
        <p class="muted">{{item.intro}}</p>
      </div>
      <div class="hr"></div>
    </div>
  </div>
</template>
<script>
import api from '../../api/index.js';
export default {
  data() {
    return {
      saveSpin: false,
      projectList: null
    }
  },
  methods: {
    edit(id) {

      this.$router.push('/admin/create/article/edit/' + id)
    },
    del(id) {

      this.$Modal({
        type: 'alert',
        title: 'delete this research?',
        message: 'cannot undo it',
        size: 'small',
        buttons: [{
          name: 'cancel',
          action: () => {

            this.$Modal.dismiss()
          }
        }, {
          name: 'delete',
          action: () => {
            this.doDel(id)
          }
        }]
      })
    },
    doDel(id) {
      api.deleteContent(id).then(response => {
        this.$Modal.dismiss();
        this.load()
      }).catch(error => {
        console.log(error)
      })
    },
    save(name, type) {
      this.saveSpin = true;

      api.updateContent(this.about).then(response => {
        this.saveSpin = false;
        this.$Toast({
          group: 'top-center',
          text: 'about update succsee'
        });
      }).catch(error => {
        this.$Toast({
          group: 'top-center',
          type: 'error',
          text: 'update failed'
        });
        this.saveSpin = false;
      })
    },
    load() {
      const param = this.$route.params.panel;
      api.getContent(param).then(response => {
        this.about = response.data.content;
      }).catch(error => {})
      api.getList(param).then(response => {
        this.projectList = response.data.articleList

      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.load();
  }
}

</script>
