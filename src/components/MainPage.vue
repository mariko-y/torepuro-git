<template>
  <div id="mainpage">
    <h2>かんばんボード</h2>
    <button @click="logout" class="logout">ログアウト</button>
    <p>とれぷろ！ 作</p>
    <!-- <input type="text" v-model="keyWord" placeholder="検索" onfocus="this.placeholder = ''"> -->
    <Kanban />
    <div display:inline-block>
      <!-- <img class="pic1" src="../assets/pic1.png" /> -->
      <img class="pic2" src="../assets/pic2.png" />
      <img class="pic2" src="../assets/pic2.png" />
      <img class="pic2" src="../assets/pic2.png" />
      <img class="pic1" src="../assets/pic1.png" />
    </div>
  </div>
</template>
<script>
import Kanban from "./Kanban";
export default {
  name: "MainPage",
  components: {
    Kanban
  },

  methods: {
    logout: function () {
      this.$router.push({ path: "/" });
    },
  }
};
</script>
<style scoped>
#mainpage {
  text-align: center;
}
.pic1 {
  width: 30%;
  height: auto;
}
.pic2 {
  width: 15%;
  height: auto;
}
.logout {
  position:  absolute;
  top: 10px;
  right: 10px;
}
</style>