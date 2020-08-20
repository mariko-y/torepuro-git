import { shallowMount, createLocalVue } from "@vue/test-utils";
import login from "@/views/login.vue";
import Vuex from "vuex";
import VueRouter from "vue-router";

let wrapper;

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe("login.vue", () => {
  let store;
  let router;
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        stories: {},
        users: {},
      },
      getters: {
        stories(state) {
          return state.stories;
        },
        users(state) {
          return state.users;
        },
      },
      mutations: {
        setStories(state, newStories) {
          state.stories = newStories;
        },
        addStory(state, newStory) {
          state.stories.push(newStory);
        },
        setUsers(state, newUsers) {
          state.users = newUsers;
        },
        addUser(state, newUser) {
          state.users.push(newUser);
        },
      },
    });
    router = new VueRouter({ routes: [{ path: "/", component: login }] });
    wrapper = shallowMount(login, { store, localVue, router });
  });
  it("test login-4 a", () => {
    expect(
      wrapper
        .findAll("a")
        .at(0)
        .text()
    ).toEqual("ログイン");
  });
  it("test login-4 a", () => {
    expect(
      wrapper
        .findAll("a")
        .at(1)
        .text()
    ).toEqual("登録");
    expect(wrapper.vm.$route.path).toEqual("/");
    wrapper
      .findAll("a")
      .at(1)
      .trigger("click");
    expect(wrapper.vm.$route.path).toEqual("/register");
  });
  it("test login-8 input", () => {
    expect(
      wrapper
        .findAll("input")
        .at(0)
        .exists()
    ).toBeTruthy();
    wrapper
      .findAll("input")
      .at(0)
      .setValue("hogehoge");
    expect(wrapper.vm.$data.checkUserId).toEqual("hogehoge");
  });
  it("test login-10 input", () => {
    expect(
      wrapper
        .findAll("input")
        .at(1)
        .exists()
    ).toBeTruthy();
    wrapper
      .findAll("input")
      .at(1)
      .setValue("hogehoge0");
    expect(wrapper.vm.$data.checkPassword).toEqual("hogehoge0");
  });
  it("test login-10 input keyup.enter", async () => {
    const users = [
      { userId: "toro", password: "dayo" },
      { userId: "taro", password: "dayon" },
    ];
    store.commit("setUsers", users);
    await wrapper.vm.$nextTick();

    router.push({ path: "/" });
    expect(wrapper.vm.$route.path).toEqual("/");
    wrapper
      .findAll("input")
      .at(0)
      .setValue("toro");
    wrapper
      .findAll("input")
      .at(1)
      .setValue("dayo");
    wrapper
      .findAll("input")
      .at(1)
      .trigger("keyup.enter");
    expect(wrapper.vm.$route.path).toEqual("/mainpage/toro");
  });
  it("test login-12 button OK", async () => {
    const users = [
      { userId: "toro", password: "dayo" },
      { userId: "taro", password: "dayon" },
    ];
    store.commit("setUsers", users);
    await wrapper.vm.$nextTick();

    router.push({ path: "/" });
    expect(wrapper.vm.$route.path).toEqual("/");
    wrapper
      .findAll("input")
      .at(0)
      .setValue("toro");
    wrapper
      .findAll("input")
      .at(1)
      .setValue("dayo");
    wrapper
      .findAll("button")
      .at(0)
      .trigger("click");
    expect(wrapper.vm.$route.path).toEqual("/mainpage/toro");
  });

  it("test login-12 button no-name & no-pass", async () => {
    const users = [
      { userId: "toro", password: "dayo" },
      { userId: "taro", password: "dayon" },
    ];
    store.commit("setUsers", users);
    await wrapper.vm.$nextTick();

    window.alert = jest.fn();
    wrapper
      .findAll("input")
      .at(0)
      .setValue("");
    wrapper
      .findAll("input")
      .at(1)
      .setValue("dayo");
    wrapper
      .findAll("button")
      .at(0)
      .trigger("click");
    expect(window.alert.mock.calls.length).toBe(1);
    expect(window.alert).toHaveBeenNthCalledWith(1, "未入力項目があります！");

    wrapper
      .findAll("input")
      .at(0)
      .setValue("toro");
    wrapper
      .findAll("input")
      .at(1)
      .setValue("");
    wrapper
      .findAll("button")
      .at(0)
      .trigger("click");
    expect(window.alert.mock.calls.length).toBe(2);
    expect(window.alert).toHaveBeenNthCalledWith(2, "未入力項目があります！");
  });
  it("test login-12 button wrong name or wrong pass", async () => {
    const users = [
      { userId: "toro", password: "dayo" },
      { userId: "taro", password: "dayon" },
    ];
    store.commit("setUsers", users);
    await wrapper.vm.$nextTick();

    window.alert = jest.fn();
    wrapper
      .findAll("input")
      .at(0)
      .setValue("taro");
    wrapper
      .findAll("input")
      .at(1)
      .setValue("dayo");
    wrapper
      .findAll("button")
      .at(0)
      .trigger("click");
    expect(window.alert.mock.calls.length).toBe(1);
    expect(window.alert).toHaveBeenNthCalledWith(1,
      "idまたはpasswordが間違っています。"
    );
  });
});
