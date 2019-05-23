<template>
  <div id="About">
  <transition name="fade">
    <div class="background"  id="background" v-show="show" @click="toggle($event)">
      <div class="about_con">
        <h2 class="line1 line">Data source</h2>
        <p v-for="(item,index) in dataSource" :key=index>{{item}}</p>
        <h2 class="line2 line">Desinged and developed by</h2>
        <p v-for="(item) in madeby" :key=item.name>
          {{item.name}}: {{item.email}}
        </p>
        <h2 class="line3 line">Project Github Address</h2>
        <p><a href="https://github.com/Ly2zzZ/2019ChinaVis_ArtVis"
        target="_blank">https://github.com/Ly2zzZ/2019ChinaVis_ArtVis</a></p>
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
  min-width: 500px;
  height: 50%;
  min-height: 400px;
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

.line{
  display: block;
  position: relative; 
}

.line:before, .line:after {
    content: '';
    position: absolute;
    top: 52%;
    background: #494949;
    height: 1px;
}

.line:before{
    left: 2%;
}

.line:after {
    right: 2%;
}


.line1:before, .line1:after {
    width: 30%;
}

.line2:before, .line2:after {
    width: 9%;
}

.line3:before, .line3:after {
    width: 15%;
}
</style>
