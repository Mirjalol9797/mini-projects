<template>
  <div class="search">
    <input :type="type" v-model="dataSearch" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataSearch: this.value,
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "",
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    func: {
      type: Function,
    },
  },
  watch: {
    dataSearch(val) {
      this.$emit("dataSearch", val);
    },
  },
};
</script>

<style lang="scss">
.search {
  width: 100%;
  input {
    margin-bottom: 0;
  }
}
</style>
