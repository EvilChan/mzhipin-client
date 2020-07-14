<template>
  <div>
    <div class="am-list-header">
      <div class="selector-icon">
        已选择头像：
        <img v-if="icon" :src="icon" alt="" />
      </div>
    </div>
    <van-grid :column-num="5" icon-size="21px">
      <van-grid-item
        v-for="value in imgList"
        :key="value.text"
        :icon="value.img"
        :text="value.text"
        @click="handleClick({ icon: value.img, text: value.text })"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'HeaderSelector',
  props: {
    setHeader: Function
  },
  data() {
    return {
      icon: null,
      imgList: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      for (let i = 0; i < 20; i++) {
        this.imgList.push({
          img: require(`../assets/images/头像${i + 1}.png`),
          text: `头像${i + 1}`
        })
      }
    },
    handleClick({ icon, text }) {
      this.icon = icon
      this.setHeader(text)
    }
  }
}
</script>

<style lang="less" scoped>
.am-list-header {
  padding: 15px 15px 9px 15px;
  font-size: 14px;
  color: #888;
  width: 100%;
  box-sizing: border-box;
}
.selector-icon {
  display: flex;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
  }
}
</style>
