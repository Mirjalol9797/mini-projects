<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <table>
          <thead>
            <tr>
              <th @click="sort('name')">Name &#8595;</th>
              <th @click="sort('username')">Username &#8595;</th>
              <th @click="sort('phone')">Phone &#8595;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in userSort" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.phone }}</td>
            </tr>
          </tbody>
        </table>
        <p>
          <span>debug: sort: {{ currentSort }}, dir: {{ currentSortDir }}</span>
          <br />
          <span
            >page: {{ this.page.current }} length: {{ this.page.length }}</span
          >
        </p>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="button-list">
          <div class="btn btnPrimary" @click="prevPage">&#8592;</div>
          <div class="btn btnPrimary" @click="nextPage">&#8594;</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      users: [],
      currentSort: "name",
      currentSortDir: "asc",
      page: {
        current: 1,
        length: 4,
      },
    };
  },
  created() {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      this.users = res.data;
    });
  },
  computed: {
    userSort() {
      return this.users
        .sort((a, b) => {
          let mod = 1;
          if (this.currentSortDir === "desc") mod = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * mod;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * mod;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.page.current - 1) * this.page.length;
          let end = this.page.current * this.page.length;
          if (index >= start && index < end) return true;
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
    prevPage() {
      if (this.page.current > 1) {
        this.page.current -= 1;
      }
    },
    nextPage() {
      if (this.page.current * this.page.length < this.users.length) {
        this.page.current += 1;
      }
    },
  },
};
</script>

<style lang="scss">
.button-list {
  text-align: center;

  .btn {
    border-radius: 60px;
    margin: 0 15px;
  }
}
</style>
