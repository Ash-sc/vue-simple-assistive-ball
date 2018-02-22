# vue-simple-assistive-ball
a simple vue assistive ball component for WebApp.

> a simple vue assistive ball component for WebApp.

> demo:


### 1. Install

``` bash
npm install vue-simple-assistive-ball
```


#### 2. Usage

```
# global injection
import AssistiveBall from 'vue-simple-assistive-ball'
Vue.use(AssistiveBall)
...
```

```
# component injection
...
<script>
import { AssistiveBall } from 'vue-simple-assistive-ball'

export default {
  components: { AssistiveBall },
  ...
}
```

```

<template>
  <div>
    <assistive-ball :data-list="dataList" v-on:ball-touch="touchEvent">
    </assistive-ball>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: ['icon-movie', 'icon-zhihu', 'icon-weibo']
    }
  },

  methods: {
    touchEvent(icon) {
      // do something...
    }
  }
}
</script>
```

#### 3. options

* **dataList**
  * icon class list
  * type **Array**
  * required **Yes**


#### 4. emit function

use 'v-on:ball-touch="your-function"' to catch the ball touch event.
