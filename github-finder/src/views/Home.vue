<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <div class="error" style="margin: 0 0 20px 0">
          <p v-if="error">{{ error }}</p>
        </div>

        <Search
          :value="search"
          type="text"
          placeholder="Enter name git user"
          @dataSearch="search = $event"
        />

        <button v-if="!repos" class="btn btnPrimary" @click="getProfile">
          Search
        </button>
        <button v-else class="btn btnPrimary" @click="getProfile">
          Search Again!
        </button>

        <div class="user-detail user" v-if="user">
          <div class="top-detail">
            <div class="user-img">
              <img :src="user.avatar_url" alt="" />
            </div>
            <div class="user-info">
              <div class="user-name">Name: {{ user.login }}</div>
            </div>
          </div>
          <div class="user-repos">
            Number of repositories: {{ user.public_repos }}
          </div>
        </div>

        <div class="repos__wrapper" v-if="repos">
          <div class="repos-sort">
            <div class="name sort-item" @click="sort('name')">
              Name
              <span v-if="currentSortDir === 'asc' && currentSort === 'name'">
                👇</span
              >
              <span v-else>☝️</span>
            </div>
            <div class="star sort-item" @click="sort('stargazers_count')">
              Star
              <span
                v-if="
                  currentSortDir === 'asc' && currentSort === 'stargazers_count'
                "
              >
                👇</span
              >
              <span v-else>☝️</span>
            </div>
          </div>
          <div
            class="repo-item"
            v-for="(item, index) in reposSort"
            :key="index"
          >
            <div class="repo-info">
              <a class="link" :href="item.html_url" target="_blank">
                {{ item.name }}
              </a>
              <span> {{ item.stargazers_count }} ⭐ </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

import Search from "../components/Search.vue";
export default {
  data() {
    return {
      search: "",
      repos: null,
      error: null,
      user: null,
      // sort
      currentSort: "name",
      currentSortDir: "asc",
    };
  },
  components: {
    Search,
  },
  computed: {
    reposSort() {
      return this.repos.sort((a, b) => {
        let mod = 1;
        if (this.currentSortDir === "desc") mod = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * mod;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * mod;
        return 0;
      });
    },
  },

  methods: {
    sort(e) {
      if (e === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = e;
    },
    getProfile() {
      // get repos
      axios
        .get(`https://api.github.com/users/${this.search}/repos`)
        .then((res) => {
          this.repos = res.data;
          this.error = null;
        })
        .catch((err) => {
          this.repos = null;
          this.error = "Can't find this user";
        });

      // get user
      axios
        .get(`https://api.github.com/users/${this.search}`)
        .then((res) => {
          this.user = res.data;
        })
        .catch((err) => {
          this.user = null;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
button {
  margin-top: 40px;
}
.repos__wrapper {
  max-width: 600px;
  width: 100%;
  margin: 30px 0;
}
.repo-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #dbdbdb;
}
.link {
  border-bottom: 0;
}
.repos-sort {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  .sort-item {
    cursor: pointer;
  }
}
.user {
  margin-top: 40px;
  max-width: 600px;
  width: 100%;
  .top-detail {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  img {
    width: 90px;
    border-radius: 50px;
  }
}
</style>
