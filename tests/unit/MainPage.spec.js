import { shallowMount, createLocalVue } from "@vue/test-utils";
import MainPage from "@/views/MainPage.vue";
import VueRouter from "vue-router";
import Vuex from "vuex";

let wrapper;

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

describe("MainPage.vue", () => {
  let router;
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        users: {},
      },
      getters: {
        users(state) {
          return state.users;
        },
      },
      mutations: {
        setUsers(state, newUsers) {
          state.users = newUsers;
        },
      },
    });
    const users = [
      { userId: "toro", password: "dayo" },
      { userId: "wang", password: "www" },
      { userId: "takada", password: "ttt" },
    ];
    store.commit("setUsers", users);
    router = new VueRouter();
    router.push("/mainpage/toro");
    wrapper = shallowMount(MainPage, {
      store,
      localVue,
      router,
      propsData: { userName: "toro" },
    });
  });
  it("test Mainpage-3 h5", () => {
    expect(
      wrapper
        .findAll("h5")
        .at(0)
        .text()
    ).toContain("ようこそ、toroさん");
  });
  it("test Mainpage-3 logout button", () => {
    expect(wrapper.vm.$route.path).toEqual("/mainpage/toro");
    wrapper
      .findAll("button")
      .at(0)
      .trigger("click");
    expect(wrapper.vm.$route.path).toEqual("/");
  });
  it("test Mainpage-3 removeUser button", () => {
    expect(wrapper.vm.$route.path).toEqual("/mainpage/toro");
    wrapper
      .findAll("button")
      .at(1)
      .trigger("click");
    expect(wrapper.vm.$route.path).toEqual("/");
  });
  it("test Mainpage-5 h2", () => {
    expect(
      wrapper
        .findAll("h2")
        .at(0)
        .text()
    ).toEqual("かんばんボード");
  });
  it("test Mainpage-6 p", () => {
    expect(wrapper.find("p").text()).toEqual("とれぷろ！ 作");
  });
  it("test Mainpage-7 kanban", () => {
    const Kanban = wrapper.find("Kanban-stub");
    expect(Kanban.exists()).toBeTruthy();
  });
  it("test Mainpage-7 kanban send", () => {
    const beforepic = [...Array(60).keys()];
    wrapper.setData({ pics: beforepic });
    wrapper.find("Kanban-stub").vm.$emit("shuffle");
    expect(wrapper.vm.$data.pics).not.toStrictEqual(beforepic);
  }),
    it("test Mainpage img", () => {
      expect(
        wrapper
          .findAll("img")
          .at(3)
          .exists()
      ).toBeTruthy();
    });
});
