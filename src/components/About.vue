<template>
  <div id="About">
  <transition name="fade">
    <div class="background"  v-show="show" @click="show = false">
      <div class="about_con">
        <p>asda</p>
        <p>asda</p>
        <p>asda</p>
        <p>asda</p>
        <p>asda</p>
        <p>asda</p>
        <p>asda</p>
        <p>asda</p>
        <p>asda</p>
      </div>
    </div>
      </transition>
  </div>

</template>

<script>

export default {
  name: 'About',
  data:function(){
    return {
      show:false
    }
  },
  mounted() {
    const that = this
    d3.select("#Ab-button").on("click",function(){
      that.show=true
    })
  },
}
</script>

<style>
.background{
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #00000026;
  z-index: 102;
}

.about_con{
  position: fixed;
  width: 400px;
  height: 500px;
  background: white;
  z-index: 102;
  color:black;
  text-align: center;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border: 1px solid lavender;
  box-shadow: 0px 0px 8px #d4e0e6;
  border-radius: 20px;

}

.fade-enter-active, .fade-leave-active {
    transition: all 1s
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
    opacity: 0
}
</style>
