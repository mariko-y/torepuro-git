import { shallowMount, createLocalVue } from "@vue/test-utils";
import App from "@/App.vue";
import VueRouter from "vue-router";

let wrapper;
const localVue = createLocalVue();
localVue.use(VueRouter);


describe("App.vue", () => {
    let router;
    beforeEach(() => {
      router = new VueRouter();
      wrapper = shallowMount(App, { localVue, router });
    }); 
  it("test App-3 router-view exist", () => {
    const RouterView = wrapper.find("router-view-stub");
    expect(RouterView.exists()).toBeTruthy();
  });
});
