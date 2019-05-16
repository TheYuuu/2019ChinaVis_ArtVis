<template>
  <div id="cloud">
    <div class="satic-area">
      <div class="dynamic-area1"></div>
      <div class="dynamic-area2"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cloud',
  mounted() {
  }
}
</script>

<style>
#cloud{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  pointer-events: none;
  z-index: 99;
}
</style>
