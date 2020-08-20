<template>
  <div>
    <div id="content">
      <a @click="toLogin" class="login">ログイン</a>
      <span style="margin-right: 1em;"></span>
      <a class="here">登録</a>

      <p>ID:</p>
      <input type="text" v-model="addUserId" />
      <p>Password:</p>
      <input type="text" v-model="addPassword" @keyup.enter="addUser"/>
      <p>
        <button @click="addUser">登録</button>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      addUserId: "",
      addPassword: "",
      setUsers: [],
    };
  },
  methods: {
    toLogin: function () {
      this.$router.push({ path: "/" });
    },
    addUser: function () {
      if (!this.addUserId.match(/\S/g) || !this.addPassword.match(/\S/g)) {
        alert("未入力項目があります！");
        return;
      }
      if (!this.addUserId.match(/^[A-Za-z0-9]*$/) || !this.addPassword.match(/^[A-Za-z0-9]*$/)) {
        alert("入力項目は半角英数字を入力してください！");
        return;
      }
      for (var registeredUser of this.$store.getters.users) {
        if (this.addUserId == registeredUser.userId) {
          alert("このIdは登録されています！");
          return;
        }
      }
      axios
        .post(
          "https://80i4jtwfz4.execute-api.us-east-2.amazonaws.com/add-user-post" ,{
            userId: this.addUserId,
            password: this.addPassword
          }
        )
        .then(
          (response) =>
            (this.setUsers = JSON.parse(response.data.body)["Items"])
        )
        .catch((error) => console.log(error))
        .finally(() => this.$store.commit("setUsers", this.setUsers));

      this.$router.push({ path: "/mainpage/" + this.addUserId});
      this.addUserId = "";
      this.addPassword = "";
    },
  },
};
</script>

<style>
@import "../style/Modal.css";
</style>