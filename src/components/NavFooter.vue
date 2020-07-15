<template>
  <div>
    <van-tabbar v-model="active" active-color="#1cae82" @change="onChange">
      <van-tabbar-item
        v-for="value in iconList"
        :key="value.text"
        :badge="formatUnReadCount(value)"
      >
        <span>{{ value.text }}</span>
        <template #icon="props">
          <img :src="props.active ? value.icon.active : value.icon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'NavFooter',
  props: {
    navList: Array,
    unReadCount: Number
  },
  data() {
    return {
      active: 0,
      iconList: []
    }
  },
  methods: {
    onChange(index) {
      this.$router.history.replace(this.iconList[index].path)
    },
    formatUnReadCount(value) {
      if (value.path === '/message' && this.unReadCount > 0) {
        return this.unReadCount
      }
      return null
    }
  },
  created() {
    const iconList = this.navList.filter(val => !val.hide)
    iconList.forEach(val => {
      this.iconList.push({
        icon: {
          inactive: require(`../assets/images/${val.icon}.png`),
          active: require(`../assets/images/${val.icon}_selected.png`)
        },
        text: `${val.text}`,
        path: val.path
      })
    })

    this.iconList.map((val, idx) => {
      if (this.$route.path === val.path) {
        return (this.active = idx)
      }
    })
  }
}
</script>

<style></style>
