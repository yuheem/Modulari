<template>
  <div>
    {{ tab.title}}
    <button :key="tab.id" @click="$emit('delete-tab', tab.id)">
      <i class="far fa-times-circle"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "Tab",
  props: ["tab"],
};
</script>

<style scoped>
button {
  margin: 0px 0px 0px 10px;
  float: right;
}
</style>>