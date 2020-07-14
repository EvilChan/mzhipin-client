<template>
  <div>
    <van-tabbar v-model="active" active-color="#1cae82" @change="onChange">
      <van-tabbar-item
        v-for="value in iconList"
        :key="value.text"
        :badge="value.path === '/message' ? count : null"
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
      count: null,
      iconList: []
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
  },
  methods: {
    onChange(index) {
      this.$router.history.replace(this.iconList[index].path)
    }
  }
}
</script>

<style></style>
