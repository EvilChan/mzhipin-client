<template>
  <van-cell-group>
    <van-cell>
      <van-row v-if="justify" type="flex" :justify="justify">
        <div class="msg-content">{{ content }}</div>
        <van-image width="22" height="22" :src="image ? image : ''" />
      </van-row>
      <van-row v-else type="flex">
        <van-image width="22" height="22" :src="image ? image : ''" />
        <div class="msg-content">{{ content }}</div>
      </van-row>
    </van-cell>
  </van-cell-group>
</template>

<script>
export default {
  name: 'Msg',
  props: {
    content: String,
    justify: String,
    image: String
  }
}
</script>

<style lang="less" scoped>
.msg-content {
  color: #000;
  font-size: 17px;
  margin-left: 15px;
}
</style>
