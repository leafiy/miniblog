<template>
  <div class="player-wrapper">
    <div class="player-player">
      <div class="player-button" @click="pause()">
        <icon :name="paused? 'play' :'pause'"></icon>
      </div>
      <div class="player-button" @click="stop()">
        <icon name="stop"></icon>
      </div>
      <div class="player-time">
        <div v-on:click="setPosition" class="player-time-wrapper">
          <div v-bind:style="progressStyle" class="player-time-indicator"></div>
        </div>
        <div class="player-time-current">{{currentTime}}</div>
        <div class="player-time-total">{{duration}}</div>
      </div>
    </div>
    <div class="player-name">
      <span><icon name="download" v-if="showDownload"  @click.native="download()" class="pointer"></icon>{{name}}</span>
    </div>
    <audio ref="audiofile" :src="file" preload="auto" style="display:none;"></audio>
  </div>
</template>
<script>
let audio;




export const convertTimeHHMMSS = (val) => {
  let hhmmss = new Date(val * 1000).toISOString().substr(11, 8)
  return (hhmmss.indexOf('00:') === 0) ? hhmmss.substr(3) : hhmmss
}

export default {
  name: 'player',
  props: {
    file: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: ''
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    showDownload: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    duration: function() {
      return this.audio ? convertTimeHHMMSS(this.totalDuration) : ''
    }
  },
  data() {
    return {
      loaded: false,
      playing: false,
      paused: true,
      progressStyle: '',
      currentTime: '00:00',
      index: '0',
      audio: undefined,
      totalDuration: 0
    }
  },
  methods: {
    setPosition: function name(e) {
      let tag = e.target


      if (e.target.tagName === 'SPAN') {
        return
      }
      const pos = tag.getBoundingClientRect()
      const seekPos = (e.clientX - pos.left) / pos.width
      this.audio.currentTime = parseInt(this.audio.duration * seekPos)
    },

    stop: function() {
      this.playing = false
      this.paused = true
      this.audio.pause()
      this.audio.currentTime = 0
    },
    play: function() {
      if (this.playing) return
      this.paused = false
      this.audio.play()
      this.playing = true
    },
    pause: function() {
      this.paused = !this.paused;
      (this.paused) ? this.audio.pause(): this.audio.play()
    },
    download: function() {
      this.stop()
      window.open(this.file, 'download')
    },
    _handleLoaded: function() {
      if (this.audio.readyState >= 2) {
        if (this.autoPlay) this.audio.play()
        this.loaded = true
        this.totalDuration = parseInt(this.audio.duration)
      } else {
        throw new Error('Failed to load sound file')
      }
    },
    _handlePlayingUI: function(e) {
      let currTime = parseInt(this.audio.currentTime)
      let percentage = parseInt((currTime / this.totalDuration) * 100)
      this.progressStyle = `width:${percentage}%;`
      this.currentTime = convertTimeHHMMSS(currTime)
    },
    _handlePlayPause: function(e) {
      if (e.type === 'pause' && this.playing === false) {
        this.paused = true
      }
    },
    init: function() {
      this.audio.addEventListener('timeupdate', this._handlePlayingUI)
      this.audio.addEventListener('loadeddata', this._handleLoaded)
      this.audio.addEventListener('pause', this._handlePlayPause)
      this.audio.addEventListener('play', this._handlePlayPause)
    },
    getAudio: function() {
      return this.$el.querySelectorAll('audio')[0]
    }
  },
  mounted: function() {
    this.audio = this.getAudio()
    this.init()
  },
  beforeDestroy: function() {
    this.audio.removeEventListener('timeupdate', this._handlePlayingUI)
    this.audio.removeEventListener('loadeddata', this._handleLoaded)
    this.audio.removeEventListener('pause', this._handlePlayPause)
    this.audio.removeEventListener('play', this._handlePlayPause)
  }

}

</script>
<style lang="scss">
@import '../assets/style/player.scss';

</style>
