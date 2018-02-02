<template>
  <div id="app">
    <h3>vue-simple-assistive-ball</h3>
    <assistive-ball :data-list="dataList" v-on:ball-touch="touchEvent">
    </assistive-ball>
  </div>
</template>

<script>
import { AssistiveBall } from './lib/index.js'

export default {
  components: { AssistiveBall },

  data() {
    return {
      dataList: ['ab-movie', 'ab-zhihu', 'ab-weibo', 'ab-movie', 'ab-zhihu']
    }
  },

  methods: {
    touchEvent(icon) {
      console.log(icon, 33333)
      // do something...
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.image-show-section {
  max-width: 650px;
  max-height: 400px;
  border-radius: 5px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.fl-l {
  float: left;
}

.fl-r {
  float: right;
}

.upload-file-info-section {
  width: 800px;
  display: inline-block;
  margin-top: 40px;
  border: 1px solid #ddd;

  .section-title {
    margin: 0;
    font-weight: normal;
    text-align: left;
    line-height: 40px;
    text-indent: 20px;
    border-bottom: 1px solid #ddd;
  }

  .file-info-item {
    position: relative;
    height: 45px;
    line-height: 45px;
    background-color: #f5f7fa;
    text-align: left;

    &::not(:first-child) {
      border-top: 1px solid #dcdfe5;
    }
  }

  .progress-info {
    position: absolute;
    top: 0;
    height: 100%;
  }

  .progress-bg {
    height: 100%;

    &.uploading {
      background-color: #e5f2ff;
    }

    &.success {
      background-color: #e5ffef;
    }

    &.abort {
      background-color: #fff6e5;
    }

    &.error {
      background-color: #ffe5ea;
    }
  }

  .file-name {
    display: inline-block;
    width: 480px;
    padding-left: 20px;
  }

  .file-size, .file-progress, .operate {
    display: inline-block;
    width: 100px;
    vertical-align: top;
  }

  .operate {
    width: 70px;
    height: 45px;

    .fa {
      width: 20px;
      height: 20px;
      line-height: 20px;
      margin-top: 12px;
      text-align: center;
    }
  }
}
</style>
