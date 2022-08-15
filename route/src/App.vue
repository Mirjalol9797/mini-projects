<template>
  <div id="app" class="wrapper">
    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content">
            <div class="logo">VUECLI</div>
            <ul class="navbar-list">
              <li
                class="navbar-item"
                v-for="(item, index) in links"
                :key="index"
              >
                <router-link class="navbar-link" :to="item.link">{{
                  item.title
                }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          title: "Home",
          link: "/",
        },
        {
          title: "Example",
          link: "/example",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.navbar-link {
  &.router-link-exact-active {
    color: red;
  }
}
</style>
