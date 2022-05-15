<template>
  <div>
      <!-- 订单成功付款后的跳转页面 -->
  </div>
</template>
<script>
export default {
  name: "Return",
  methods: {
    redirect() {
      const _this = this;
      this.$axios.get(`/return${location.search}`).then((res) => {
        let msg = res.data.msg;
        _this.$message({
          message: msg,
          type: "success",
        });
        _this.$router.push("/order");
      });
    },
  },
  created() {
      const _this = this;
      this.$nextTick(()=>{
          _this.redirect();
      })
  },
};
</script>