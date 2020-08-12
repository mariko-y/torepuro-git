<template>
  <div id="overlay" @click="$emit('close-add-modal')">
    <div id="content" @click="$emit('prevent-close-modal')">
      <h2>ストーリーを追加</h2>
      <p>ストーリー名</p>
      <input type="text" v-model="addStoryName" />
      <p>内容</p>
      <textarea
        v-model="addStoryContents"
        placeholder="内容を入力してください。"
        onfocus="this.placeholder = ''"
      ></textarea>
      <button @click="$emit('close-add-modal')">キャンセル</button>
      <span style="margin-right: 1em;"></span>
      <button @click="addItem">保存</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    stories: Array,
  },
  data() {
    return {
      addStoryName: "",
      addStoryContents: "",
      setStory: [],
    };
  },
  computed: {
    storyCount: function () {
      const stories = this.$store.getters.stories;
      var maxId = 0;
      for(const story of stories){
        if(story["id"] > maxId){
          maxId = story["id"]
        }
      }
      console.log(maxId+1)
      return maxId+1     
    },
  },
  methods: {
    addItem: function () {  
      var story = {
        id: this.storyCount,
        name: this.addStoryName,
        contents: this.addStoryContents,
        status: 1,
      };
      if (!story.name.match(/\S/g)) {
        alert("名前を入力してください！");
      } else {
        var mes =
          "?id=" +
          story.id +
          "&name=" +
          story.name +
          "&contents=" +
          story.contents +
          "&status=" +
          story.status;
        axios
          .get(
            "https://k2vpygj2sj.execute-api.us-east-2.amazonaws.com/add-story" +
              mes
          )
        this.$store.commit("addStory", story);
        this.$emit("close-add-modal");
      }
      this.addStoryName = "";
      this.addStoryContents = "";
    },
  },
};
</script>

<style>
@import "../style/Modal.css";
</style>