<template>
  <nav class="scrollspy-nav">
    <slot></slot>
  </nav>
</template>
<script>

export default {
  name: 'Scrollspy',
  props: {
    activeClass: {
      type: String,
      default: 'is-active',
    },
    offset: {
      type: Number,
      default: 20,
    },
    clickToScroll: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 300,
    },

    /**
     * Defines if the plugin should track the section change when
     * clicking an item to scroll to its section. If set to true,
     * it will always keep track and change the active class to the
     * current section while scrolling, if false, the active class
     * will be immediately applied to the clicked menu item, ignoring
     * the passed sections until the scrolling is over.
     *
     * @default false
     * @type {Boolean}
     */
    alwaysTrack: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      scrollspyItems: null,
      lastActiveItem: null,
    };
  },

  methods: {
    onScroll(event) {
      const distanceFromTop = window.pageYOffset;
      let currentItem;

      this.scrollspyItems.forEach((scrollspyItem) => {
        scrollspyItem.classList.remove(this.activeClass);
        const target = document.getElementById(scrollspyItem.dataset.target.substr(1));

        if (distanceFromTop >= this.getOffsetTop(target) - this.offset) {
          currentItem = scrollspyItem;
        }
      });

      if (currentItem !== this.lastActiveItem) {
        // Makes sure to not fire when it's mounted
        if (this.lastActiveItem) this.$emit('itemchanged', event, currentItem, this.lastActiveItem);
        this.lastActiveItem = currentItem;
      }

      if (currentItem) currentItem.classList.add(this.activeClass);
    },

    /**
     * Sets the initial list of menu items, validating if its hash
     * corresponds to a valid element ID.
     */
    setScrollspyItems() {
      const scrollspyItems = document.querySelectorAll('.scrollspy-item');

      scrollspyItems.forEach((scrollspyItem) => {
        let target =scrollspyItem.dataset.target.substr(1);
        if (!document.getElementById(target)) {
          throw new Error(`[vue-scrollspy] Element '${scrollspyItem.hash}' was not found. Make sure it is set in the DOM.`);
        }
      });

      this.scrollspyItems = scrollspyItems;

      if (this.clickToScroll) {
        scrollspyItems.forEach((scrollspyItem) => {
          scrollspyItem.addEventListener('click', this.scrollToTargetElement);
        });
      } else {
        scrollspyItems.forEach((scrollspyItem) => {
          scrollspyItem.removeEventListener('click', this.scrollToTargetElement);
        });
      }
    },

    /**
     * Handles the scrolling when clicking a menu item.
     */
    scrollToTargetElement(event) {
      event.preventDefault();

      if (!this.alwaysTrack) {
        window.removeEventListener('scroll', this.onScroll);
        window.cancelAnimationFrame(window.AFRequestID);

        this.scrollspyItems.forEach((scrollspyItem) => {
          scrollspyItem.classList.remove(this.activeClass);
        });

        event.currentTarget.classList.add(this.activeClass);
      }

      const vm = this;
      const target = document.getElementById(event.currentTarget.dataset.target.substr(1));
      const targetDistanceFromTop = this.getOffsetTop(target);
      const startingY = window.pageYOffset;
      const difference = targetDistanceFromTop - startingY;
      // const easing = vm.bezierEasing(
      //   this.cubicBezierArray[0],
      //   this.cubicBezierArray[1],
      //   this.cubicBezierArray[2],
      //   this.cubicBezierArray[3],
      // );
      let start = null;

      function step(timestamp) {
        if (!start) start = timestamp;

        let progress = timestamp - start;
        let progressPercentage = progress / vm.duration;

        if (progress >= vm.duration) progress = vm.duration;
        if (progressPercentage >= 1) progressPercentage = 1;

        const perTick = startingY + progressPercentage * (difference - vm.offset);

        window.scrollTo(0, perTick);

        if (progress < vm.duration) {
          window.AFRequestID = window.requestAnimationFrame(step);
        } else {
          window.addEventListener('scroll', vm.onScroll);
        }
      }

      window.requestAnimationFrame(step);
    },

    /**
     * Gets the top offset position of an element in the document.
     *
     * @param  {Element} element
     * @return {Number}
     */
    getOffsetTop(element) {
      let yPosition = 0;
      let nextElement = element;

      while (nextElement) {
        yPosition += (nextElement.offsetTop);
        nextElement = nextElement.offsetParent;
      }

      return yPosition;
    },
  },

  mounted() {
    this.setScrollspyItems();
    this.onScroll();
    window.addEventListener('scroll', this.onScroll);
  },

  updated() {
    this.setScrollspyItems();
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
    window.cancelAnimationFrame(window.AFRequestID);
  },
};

</script>
