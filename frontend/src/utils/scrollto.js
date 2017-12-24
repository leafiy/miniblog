'use strict';


const utils = {
  on: function(element, events, handler) {
    if (!(events instanceof Array)) {
      events = [events];
    }
    for (let i = 0; i < events.length; i++) {
      element.addEventListener(events[i], handler);
    }
  },
  off: function(element, events, handler) {
    if (!(events instanceof Array)) {
      events = [events];
    }
    for (let i = 0; i < events.length; i++) {
      element.removeEventListener(events[i], handler);
    }
  }
};

const install = (Vue) => {
  function handleClick(e) {

    let getScrollTopElement = function(e) {
      let top = 0;

      while (e.offsetParent != undefined && e.offsetParent != null) {
        top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
        e = e.offsetParent;
      }

      return top;
    };

    let getScrollTopDocument = function() {
      return document.documentElement.scrollTop + document.body.scrollTop;
    };

    let smoothScrollTo = function(element, target, duration) {
      target = Math.round(target);
      duration = Math.round(duration);

      if (duration < 0) {
        return Promise.reject("bad duration");
      }

      if (duration === 0) {
        element.scrollTop = target;
        return Promise.resolve();
      }

      let start_time = Date.now();
      let end_time = start_time + duration;
      let start_top = element.scrollTop;
      let distance = target - start_top;

      // based on http://en.wikipedia.org/wiki/Smoothstep
      let smooth_step = function(start, end, point) {
        if (point <= start) { return 0; }
        if (point >= end) { return 1; }

        let x = (point - start) / (end - start); // interpolation

        return x * x * (3 - 2 * x);
      }

      return new Promise(function(resolve, reject) {
        // This is to keep track of where the element's scrollTop is
        // supposed to be, based on what we're doing
        let previous_top = element.scrollTop;

        // This is like a think function from a game loop
        let scroll_frame = function() {

          if (element.scrollTop != previous_top) {
            reject("interrupted");
            return;
          }

          // set the scrollTop for this frame
          let now = Date.now();
          let point = smooth_step(start_time, end_time, now);
          let frameTop = Math.round(start_top + (distance * point));
          element.scrollTop = frameTop;

          // check if we're done!
          if (now >= end_time) {
            resolve();
            return;
          }

          if (element.scrollTop === previous_top && element.scrollTop !== frameTop) {
            resolve();
            return;
          }

          previous_top = element.scrollTop;

          setTimeout(scroll_frame, 0);
        }

        setTimeout(scroll_frame, 0);
      });
    }

    let splitclass = this.expression.split(', ');
    let padding = splitclass[1].replace(/\D/g, '');
    let speed = 500;
    let moving_frequency = 15;
    let element;
    splitclass[0] = splitclass[0].replace('\'', '');
    splitclass[1] = splitclass[1].replace('\'', '');

    if (element = document.querySelector(splitclass[0])) {

      let hop_count = speed / moving_frequency
      let getScrollTopDocumentAtBegin = getScrollTopDocument();
      let gap = (getScrollTopElement(element) - getScrollTopDocumentAtBegin - padding) / hop_count;

      for (let i = 1; i <= hop_count; i++) {

        (function() {
          let hop_top_position = gap * i;
          setTimeout(function() { window.scrollTo(0, hop_top_position + getScrollTopDocumentAtBegin); }, moving_frequency * i);
        })();
      }
    }
  }
  Vue.directive('scroll-to', {

    bind: function(el, binding) {
      utils.on(el, 'click', handleClick.bind(binding));
    },

    unbind: function(el) {
      utils.off(el, 'click', handleClick);
    }
  })
}


export default install;