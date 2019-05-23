<template>
  <div id="About">
  <transition name="fade">
    <div class="background"  id="background" v-show="show" @click="toggle($event)">
      <div class="about_con">
        <h2 class="line1">Data source</h2>
        <p v-for="(item,index) in dataSource" :key=index>{{item}}</p>
        <h2 class="line2">Desinged and developed by</h2>
        <p v-for="(item) in madeby" :key=item.name>
          {{item.name}}: {{item.email}}
        </p>
        <h2 class="line3">Project Github Address</h2>
        <p><a href="https://github.com/Ly2zzZ/2019ChinaVis_ArtVis">https://github.com/Ly2zzZ/2019ChinaVis_ArtVis</a></p>
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
      show:false,
      dataSource:[
        'https://www.iucnredlist.org',
        'https://ourworldindata.org',
        'https://wwf.panda.org',
        'http://www.poodwaddle.com',
        'http://www.theworldcounts.com',
        'https://data.giss.nasa.gov',
        'https://www.worldometers.info',
        '',
        '',
      ],
      madeby:[
        {
          name:'Luo Yu',
          email:'ly2_zzz@qq.com'
        },
        {
          name:'Zhao WeiXin',
          email:'weixin.zhao@outlook.com '
        },
        {
          name:'Zhou SiYi',
          email:'841932488@qq.com'
        }
      ]
    }
  },
  methods:{
    toggle($event){
      if (d3.select($event.target).attr("id") == "background")
        this.show = false
      else
        return;
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
  width: 350px;
  height: 400px;
  background: white;
  z-index: 102;
  color:black;
  text-align: center;
  top:-20%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border: 1px solid lavender;
  box-shadow: 0px 0px 8px #d4e0e6;
  border-radius: 20px;
  padding: 20px
}

.about_con p,.about_con a{
  margin: 5px;
  user-select: all !important;
}

.line2, .line3{
  margin-top: 25px;
}


.fade-enter-active, .fade-leave-active {
    transition: all 1s
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
    opacity: 0
}

.line1:before, .line1:after {
    content: '';
    position: absolute;
    top: 7%;
    background: #494949;
    width: 23%;
    height: 1px;
}

.line1:before{
    left: 10%;
}

.line1:after {
    right: 10%;
}

.line2:before, .line2:after {
    content: '';
    position: absolute;
    top: 47%;
    background: #494949;
    width: 6%;
    height: 1px;
}

.line2:before{
    left: 10%;
}

.line2:after {
    right: 10%;
}


.line3:before, .line3:after {
    content: '';
    position: absolute;
    top: 71%;
    background: #494949;
    width: 12%;
    height: 1px;
}

.line3:before{
    left: 10%;
}

.line3:after {
    right: 10%;
}
</style>
