<template>
  <transition name="fade">
    <div class="progress" :class="wrapClasses" v-if="show">
      <div v-if="shape != 'circle'" class="progress-bar" :style="bgStyle"><span v-if="showInfo" class="progress-text">
  {{ percent }}%
      </span></div>
      <div class="progress-chart" v-else :style="chartStyles">
        <svg :width="width" :height="height" class="circle-svg">
          <circle class="pie" :cx="width/2" :cy="height/2" :r="width/4" :style="piePercent">
          </circle>
        </svg>
        <span v-if="showInfo" class="progress-text">
  {{ percent }}%
      </span>
      </div>
    </div>
  </transition>
</template>
<script>
const prefixCls = 'progress';

export default {
  name: 'UIProgress',
  props: {

    percent: {
      type: Number,
      default: 0
    },
    status: {
      validator(value) {
        return ['normal', 'active', 'wrong', 'success'].includes(value);
      },
      default: 'normal'
    },
    showInfo: {
      type: Boolean,
      default: true
    },
    shape: '',
    width: {
      type: Number,
      default: 60
    },
    height: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
      currentStatus: this.status,
      show: false

    };
  },
  computed: {
    chartStyles() {
      if (this.shape == 'circle') {
        return {
          width: `${this.width}px`,
          height: `${this.height}px`
        }
      }
    },
    showProgressInfo() {
      return this.currentStatus == 'wrong' || this.currentStatus == 'success';
    },
    piePercent() {
      return {
        'stroke-width': `${this.width/2}`,
        'stroke-dasharray': `${this.percent}, 100`
      }
    },
    bgStyle() {
      return {
        width: `${this.percent}%`
      };

    },
    wrapClasses() {
      return [
        `progress-status-${this.currentStatus}`,
        {
          [`progress-show-info`]: this.showInfo,
          [`progress-circle`]: this.shape == 'circle',
          [`progress-square`]: this.shape != 'circle'


        }
      ];
    }
  },

  watch: {
    status(val) {
      this.currentStatus = val;
    }
  },
  mounted() {
    this.show = true
  }
};

</script>
<style lang="scss">
@import '../assets/style/progress.scss'

</style>
