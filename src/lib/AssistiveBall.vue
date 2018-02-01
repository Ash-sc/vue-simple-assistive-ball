<template>
  <div
    class="assistive-ball-body"
    :class="`ball-status-${currentStatus} position-${mainBallPosition.position || 'left'}`"
    :style="{
      left: mainBallPosition.X + 'px',
      top: mainBallPosition.Y + 'px',
      'transition-duration': mainBallMove ? '0s' : '.1s'
    }"
  >
    <button
      class="main-ball"
      @touchstart="mainBallActionStart"
      @touchmove="mainBallActionMove"
      @touchend="mainBallActionEnd"
      :class="{'ab-close': currentStatus === 'wake-up'}"
    ></button>
    <ul class="child-ball-list">
      <li
        class="child-ball"
        v-for="(icon, index) in dataList"
        :key="index"
      >
        <div
          class="ball"
          :class="`${icon}`"
          @touchmove="childBallActionMove"
          @touchend="e => childBallActionEnd(e, icon)"
        ></div>
      </li>
    </ul>
    <div
     class="assistive-ball-bg"
     v-show="currentStatus === 'wake-up'"
     @touchend="closeBall"
    ></div>
  </div>
</template>

<script>
import './icon.less'

export default {
  props: {
    dataList: {
      type: Array,
      required: true,
      default: () =>([])
    }
  },
  data() {
    const {
      clientWidth,
      clientHeight
    } = document.documentElement

    return {
      rem: window.getComputedStyle(document.body,null).getPropertyValue("font-size").replace('px', ''),
      clientWidth,
      clientHeight,
      currentStatus: 'adsorption', // component status: 'adsorption' or 'wake-up'
      mainBallPosition: {
        X: 0,
        Y: clientHeight / 2,
        position: 'left'
      },
      touchStartPosition: { X: 0, Y: 0 },
      mainBallMove: false,
      childBallMove: false
    }
  },

  methods: {
    mainBallActionStart(event) {
      const e = event || window.event
      const { currentStatus } = this

      e.preventDefault()

      if (currentStatus === 'adsorption') {
        this.touchStartPosition = { X: e.touches[0].clientX, Y: e.touches[0].clientY }
      }
    },

    mainBallActionMove(event) {
      const e = event || window.event
      e.preventDefault()

      this.mainBallMove = true

      if (this.currentStatus === 'wake-up') return

      const {
        touchStartPosition,
        mainBallPosition
      } = this
      const moveX = touchStartPosition.X - e.touches[0].clientX
      const moveY = touchStartPosition.Y - e.touches[0].clientY

      this.mainBallPosition = {
        X: mainBallPosition.X - moveX,
        Y: mainBallPosition.Y - moveY
      }
      this.touchStartPosition = {
        X: e.touches[0].clientX,
        Y: e.touches[0].clientY
      }
    },

    mainBallActionEnd(event) {
      const e = event || window.event
      e.preventDefault()

      const {
        rem,
        clientWidth,
        clientHeight,
        mainBallPosition,
        currentStatus
      } = this

      const currectY = mainBallPosition.Y < 6 * rem
        ? 6 *rem
        : mainBallPosition.Y +  6 * rem > clientHeight
          ? clientHeight - 6 * rem
          : mainBallPosition.Y

      this.mainBallPosition = {
        X: (mainBallPosition.X < clientWidth / 2) ? 0 : clientWidth,
        Y: currectY,
        position: (mainBallPosition.X < clientWidth / 2) ? 'left': 'right'
      }

      if (!this.mainBallMove) {
        this.currentStatus = currentStatus === 'adsorption' ? 'wake-up' : 'adsorption'
      }
      this.mainBallMove = false

      window[`${currentStatus === 'adsorption' ? 'add' : 'remove'}EventListener`]('scroll', this.scrollListener)
    },

    childBallActionMove(event) {
      const e = event || window.event
      e.preventDefault()

      this.childBallMove = true
    },

    childBallActionEnd(event, icon) {
      const e = event || window.event
      e.preventDefault()

      if (!this.childBallMove) {
        this.currentStatus = 'adsorption'
        this.$emit('ball-touch', icon)
      }
      this.childBallMove = false
    },

    closeBall() {
      this.currentStatus = 'adsorption'
    },

    scrollListener() {
      const {
        isSroll,
        currentStatus
      } = this

      if (isSroll) return false

      if (currentStatus === 'wake-up') this.currentStatus = 'adsorption'

      this.isSroll = true
      window.setTimeout(() => { this.isSroll = false }, 1000)
    }
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollListener)
  }
}
</script>
<style lang="less" scoped>
.assistive-ball-body * {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}
.assistive-ball-body {
  position: fixed;
  top: 50%;
  margin-left: 1.1rem;
  box-sizing: border-box;
  z-index: 1024;
  transition-property: margin-left, left, top;

  &.position-right {
    margin-left: -1.1rem;
  }

  .main-ball {
    position: absolute;
    width: 2rem;
    height: 2rem;
    left: -1rem;
    top: -1rem;
    border: none;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, .5);
    padding: .3rem;
    outline: none;
    z-index: 1;
  }

  .main-ball:not(.icon-close):before {
    content: '';
    position: absolute;
    width: 1.4rem;
    height: 1.4rem;
    border: .1rem solid #fff;
    border-radius: 50%;
    left: .3rem;
    top: .3rem;
    box-sizing: border-box;
  }
  .main-ball.icon-close {
    color: #fff;
    font-size: 1rem;
  }

  .child-ball-list {
    position: absolute;
    left: 0;
    top: 0;
    padding: 0;
    margin: 0;
    list-style: none;
    z-index: 1;

    .child-ball {
      position: absolute;
      width: 0;
      height: 0;
      background-color: #000;
      transform: translate(0, 0);
      transition: transform .2s cubic-bezier(0.42, 0, 0.4, 1.76);
    }

    .ball {
      position: absolute;
      width: 2rem;
      height: 2rem;
      left: -1rem;
      top: -1rem;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, .5);
      transform: scale(0);
      transition: transform .2s cubic-bezier(0.42, 0, 0.4, 1.76);
      line-height: 2rem;
      text-align: center;
      color: #fff;
    }

  }

}

.generate-child-ball(20);

.generate-child-ball(@n, @i: 1) when (@i =< @n) {
  .ball-status-wake-up.position-right {

    .child-ball:nth-child(@{i}) {
      transform: translate(0 - sin(3.14 / 180 * (18 + 36 * (@i - 1))) * 5rem, 0 - cos(3.14 / 180 * (18 + 36 * (@i - 1))) * 5rem);
      transition-delay: @i * .1s;

      .ball {
        transform: scale(1);
        transition-delay: @i * .1s;
      }

    }

  }

  .ball-status-wake-up.position-left {

    .child-ball:nth-child(@{i}) {
      transform: translate(sin(3.14 / 180 * (18 + 36 * (@i - 1))) * 5rem, 0 - cos(3.14 / 180 * (18 + 36 * (@i - 1))) * 5rem);
      transition-delay: @i * .1s;

      .ball {
        transform: scale(1);
        transition-delay: @i * .1s;
      }

    }

  }

  .generate-child-ball(@n, (@i + 1));

}

.ball-status-adsorption {
  margin-left: 0rem!important;
}

.assistive-ball-bg {
  position: fixed;
  opacity: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>