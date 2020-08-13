<template>
  <div>
    <p class="storiesLength">達成度 {{ doneLength }} /{{ $store.getters.stories.length }}</p>
    <table class="kanban">
      <tr>
        <td v-for="status in statuses" v-bind:key="status.id">
          <thead>
            <tr>
              <th>{{status.name}}</th>
            </tr>
          </thead>
          <tbody>
            <div v-for="story in sortedStoriesById" v-bind:key="story.id" class="story">
              <tr v-if="story.status==status.id">
                <td @click="openDetailModal(story)">{{story.name}}</td>
              </tr>
            </div>
          </tbody>
          <tfoot v-if="status.id==1">
            <button @click="openAddModal">＋</button>
          </tfoot>
        </td>
      </tr>
    </table>

    <transition name="fade">
      <AddModal
        v-show="addShowing"
        v-on:close-add-modal="closeAddModal"
        v-on:prevent-close-modal="preventCloseModal"
      />
    </transition>
    <transition name="fade">
      <DetailModal
        v-show="detailShowing"
        :statuses.sync="statuses"
        :passStoryName.sync="storyName"
        :passStoryContents.sync="storyContents"
        :passStoryID.sync="storyID"
        :passStoryStatus.sync="storyStatus"
        v-on:close-detail-modal="closeDetailModal"
        v-on:prevent-close-modal="preventCloseModal"
      ></DetailModal>
    </transition>
  </div>
</template>

<script>
import AddModal from "./AddModal";
import DetailModal from "./DetailModal";

export default {
  name: "Kanban",
  components: {
    AddModal,
    DetailModal,
  },
  data() {
    return {
      addShowing: false,
      detailShowing: false,
      statuses: [
        { id: 1, name: "Todo" },
        { id: 2, name: "Doing" },
        { id: 3, name: "Review" },
        { id: 4, name: "Done" },
      ],
      storyID: null,
      storyName: "",
      storyContents: "",
      storyStatus: null,
    };
  },
  computed: {
    doneLength: function () {
      return this.$store.getters.stories.filter(function (val) {
        return val.status == 4;
      }).length;
    },
    sortedStoriesById(){
        return this.$store.getters.stories.slice().sort((a, b) => {
          return (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0;
        })
    }

  },
  methods: {
    openAddModal: function () {
      this.addShowing = true;
    },
    closeAddModal: function () {
      this.addShowing = false;
    },
    preventCloseModal: function () {
      event.stopPropagation();
    },
    openDetailModal: function (story) {
      this.storyName = story.name;
      this.storyContents = story.contents;
      this.storyID = story.id;
      this.storyStatus = story.status;
      this.detailShowing = true;
    },
    closeDetailModal: function () {
      this.detailShowing = false;
    },
  },
};
</script>

<style scoped>
.storiesLength {
  padding-right: 20%;
  text-align: right;
}
.kanban {
  text-align: center;
  margin: auto;
  background-color: white;
  width: 800px;
}
.kanban td {
  border: 1px solid;
  vertical-align: top;
}
.story {
  width: 200px;
  margin-left: auto;
  margin-right: auto;
}
.story tfoot td {
  text-align: left;
  border: none;
}
.story td {
  width: 200px;
  max-width: 190px;
  height: 30px;
  background-color: #ffffb2;
  vertical-align: middle;
  /* word-break: break-all; */
  white-space: nowrap;
  overflow: hidden; 
  text-overflow: ellipsis;
}
.story td:hover{
  background-color:#ffff7f;
  cursor:pointer;
}

tfoot {
  text-align: left;
}
th {
  font-size: 120%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>