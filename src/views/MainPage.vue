<template>
  <div id="mainpage">
    <h5>ようこそ、{{ userName }}さん  <button @click="logout">ログアウト</button><button @click="removeUser">アカウント削除</button></h5>
    <br />
    <h2>かんばんボード</h2>
    <p>とれぷろ！ 作</p>
    <Kanban  v-on:shuffle="shuffle" />
      <span v-for="pic in pics" :key="pic.key">
        <img :class="pic.class" :src="pic.src" />
      </span>
  </div>
</template>
<script>
import Kanban from "../components/Kanban";
import _ from "lodash";
import axios from "axios";

export default {
  name: "MainPage",
  components: {
    Kanban,
  },
  props: {
    userName: String,
  },
  data() {
    return {
      pics: [
        { key: 0, src: require("../assets/pic2.png"), class: "pic2" },
        { key: 1, src: require("../assets/pic2.png"), class: "pic2" },
        { key: 2, src: require("../assets/pic2.png"), class: "pic2" },
        { key: 3, src: require("../assets/pic1.png"), class: "pic1" },
      ],
       setUsers: []
    };
  },
  methods: {
    logout: function () {
      this.$router.push({ path: "/" });
    },
    shuffle: function () {
      this.pics = _.shuffle(this.pics);
    },
    removeUser: function(){
       axios
        .post(
          "https://nkcxahlvik.execute-api.us-east-2.amazonaws.com/remove-user" ,{
            userId: this.userName,
          }
        )
        .then(
          (response) =>
            (this.setUsers = JSON.parse(response.data.body)["Items"])
        )
        .catch((error) => console.log(error))
        .finally(() => this.$store.commit("setUsers", this.setUsers));
      this.$router.push({ path: "/"});
    }
  },
  mounted() {
      this.timer = setInterval( this.shuffle, 5000);
    },
  beforeDestroy() {
      clearInterval(this.timer);
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
h5 {
  position: absolute;
  top: -5px;
  right: 10px;
}
@keyframes myfirst {
  0% {
    background: red;
  }
  25% {
    background: yellow;
  }
  50% {
    background: cyan;
  }
  75% {
    background: chartreuse;
  }
  100% {
    background: red;
  }
}
h2 {
  animation-name: myfirst;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
</style>