import { shallowMount, createLocalVue } from "@vue/test-utils";
import register from "@/views/register.vue";
import Vuex from "vuex";
import VueRouter from "vue-router";

let wrapper;

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe("register.vue", () => {
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
    router = new VueRouter();
    router.push("/register");
    wrapper = shallowMount(register, { store, localVue, router });
  });
  it("test register-4 a", () => {
    expect(
      wrapper
        .findAll("a")
        .at(0)
        .text()
    ).toEqual("ログイン");
    expect(wrapper.vm.$route.path).toEqual("/register");
    wrapper
      .findAll("a")
      .at(0)
      .trigger("click");
    expect(wrapper.vm.$route.path).toEqual("/");
  });
  it("test register-6 a", () => {
    expect(
      wrapper
        .findAll("a")
        .at(1)
        .text()
    ).toEqual("登録");
  });
  it("test register-8 p", () => {
    expect(
      wrapper
        .findAll("p")
        .at(0)
        .text()
    ).toEqual("ID:");
  });
  it("test register-9 input", () => {
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
    expect(wrapper.vm.$data.addUserId).toEqual("hogehoge");
  });
  it("test register-10 p", () => {
    expect(
      wrapper
        .findAll("p")
        .at(1)
        .text()
    ).toEqual("Password:");
  });
  it("test register-11 input", () => {
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
    expect(wrapper.vm.$data.addPassword).toEqual("hogehoge0");
  });
  it("test register-11 input keyup.enter", async () => {
    const users = [{ userId: "toro", password: "dayo" }];
    store.commit("setUsers", users);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.path).toEqual("/register");
    wrapper
      .findAll("input")
      .at(0)
      .setValue("suga");
    wrapper
      .findAll("input")
      .at(1)
      .setValue("jyunitiro");
    wrapper
      .findAll("input")
      .at(1)
      .trigger("keyup.enter");
    expect(wrapper.vm.$route.path).toEqual("/mainpage/suga");
  });
  it("test register-13 button OK", async () => {
    const users = [{ userId: "toro", password: "dayo" }];
    store.commit("setUsers", users);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.path).toEqual("/register");
    wrapper
      .findAll("input")
      .at(0)
      .setValue("suga");
    wrapper
      .findAll("input")
      .at(1)
      .setValue("jyunitiro");
    wrapper
      .findAll("button")
      .at(0)
      .trigger("click");
    expect(wrapper.vm.$route.path).toEqual("/mainpage/suga");
  });
  it("test register-13 button no-name & no-pass", async () => {
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
  it("test register-13 button halfwidth", async () => {
    window.alert = jest.fn();
    wrapper
      .findAll("input")
      .at(0)
      .setValue("あいうえお");
    wrapper
      .findAll("input")
      .at(1)
      .setValue("dayo");
    wrapper
      .findAll("button")
      .at(0)
      .trigger("click");
    expect(window.alert.mock.calls.length).toBe(1);
    expect(window.alert).toHaveBeenNthCalledWith(
      1,
      "入力項目は半角英数字を入力してください！"
    );

    wrapper
      .findAll("input")
      .at(0)
      .setValue("toro");
    wrapper
      .findAll("input")
      .at(1)
      .setValue("ＡＢＣＤＥ");
    wrapper
      .findAll("button")
      .at(0)
      .trigger("click");
    expect(window.alert.mock.calls.length).toBe(2);
    expect(window.alert).toHaveBeenNthCalledWith(
      2,
      "入力項目は半角英数字を入力してください！"
    );

    wrapper
      .findAll("input")
      .at(0)
      .setValue("toro");
    wrapper
      .findAll("input")
      .at(1)
      .setValue("ai-ueo");
    wrapper
      .findAll("button")
      .at(0)
      .trigger("click");
    expect(window.alert.mock.calls.length).toBe(3);
    expect(window.alert).toHaveBeenNthCalledWith(
      3,
      "入力項目は半角英数字を入力してください！"
    );
  });
  it("test login-12 button registered id", async () => {
    const users = [
      { userId: "toro", password: "dayo" },
    ];
    store.commit("setUsers", users);
    await wrapper.vm.$nextTick();

    window.alert = jest.fn();
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
    expect(window.alert.mock.calls.length).toBe(1);
    expect(window.alert).toHaveBeenNthCalledWith(1,
      "このIdは登録されています！"
    );
  });
});
