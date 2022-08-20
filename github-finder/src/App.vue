<template>
  <div id="app" class="wrapper">
    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content">
            <div class="logo">GitHub Finder</div>
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
