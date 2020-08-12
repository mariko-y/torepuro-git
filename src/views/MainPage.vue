<template>
  <div id="mainpage">
    <h2>かんばんボード</h2>
    <button @click="logout" class="logout">ログアウト</button>
    <p>とれぷろ！ 作</p>
    <!-- <input type="text" v-model="keyWord" placeholder="検索" onfocus="this.placeholder = ''"> -->
    <Kanban />
    <button @click="shuffle">SHUFFLE</button>
    <transition-group>
      <span v-for="pic in pics" :key="pic.key" >
        <img :class="pic.class" :src="pic.src" />
      </span>
    </transition-group>
  </div>
</template>
<script>
import Kanban from "../components/Kanban";
import _ from "lodash"
export default {
  name: "MainPage",
  components: {
    Kanban
  },
  data() {
    return {
   pics: [
        {key: 0, src: require("../assets/pic2.png"), class: "pic2"},
        {key: 1, src: require("../assets/pic2.png"), class: "pic2"},
        {key: 2, src: require("../assets/pic2.png"), class: "pic2"},
        {key: 3, src: require("../assets/pic1.png"), class: "pic1"},
      ],
    }
  },
  methods: {
    logout: function () {
      this.$router.push({ path: "/" });
    },
    shuffle: function () {
      this.pics = _.shuffle(this.pics)
    }
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
@keyframes myfirst
{
	0%   {background:red; left:0px; top:0px;}
	25%  {background:yellow; left:200px; top:0px;}
	50%  {background:cyan; left:200px; top:200px;}
	75%  {background:chartreuse; left:0px; top:200px;}
	100% {background:red; left:0px; top:0px;}
}
h2{
  animation-name: myfirst;
	animation-duration:5s;
	animation-timing-function:linear;
	animation-delay:2s;
	animation-iteration-count:infinite;
	animation-direction:alternate;
	animation-play-state:running;
}
</style>