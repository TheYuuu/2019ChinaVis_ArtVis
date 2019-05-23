<template>
  <div id="deadList">
    <p class="Extinct_title">Extinction List</p>
    <div class="list_div" id="list_div">
      <transition-group>
        <template>
        <div v-for="(item,index) in getList" :key=index>
          <br>
          <p class="year_p">
            {{item.year}} 
          </p>
          <p v-for="(i,index) in item.list" :key=index class="item_p"
            @click="show_inf(item.list)">
            {{i.name}}
          </p>
          <br>
        </div>
        </template>
      </transition-group>
      <br>
      <br>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
import { setTimeout, setInterval } from 'timers';
export default {
  name: 'deadList',
  data:function(){
    return {
      list:[]
    }
  },
  methods:{
    autoScroll(){
      var div = document.getElementById("deadList")
      setInterval(()=>{
        div.scrollTop+=1;
      },100)
    },
    show_inf(d){
      this.$emit("show_inf",d)
    },
    insert(obj){
      let year = obj.year
      this.list[year] = this.list[year] == undefined ? [] : this.list[year]
      this.list[year].push(obj.obj)
      this.$set(this.list, year, this.list[year]);
    }
  },
  computed:{
    getList(){
      let arr = [];
      for (let k in this.list){
        if (this.list[k].length!=0){
          arr.push({
            year:k,
            list:this.list[k]
          })
        }
      }
      return arr.sort((a,b)=>{
        if (a.year>b.year)
          return -1;
        else if (a.year<b.year)
          return 1;
        else 
          return 0;
      })
    }
  },        
  mounted() {
    this.autoScroll();
  }
}
</script>

<style>
#deadList{
  width: calc(100vw / 2 - 100vh / 2 );
  height: 100vh;
  padding:20px;
  overflow: auto;
  float: right;
  font-size: 1.1rem;
  font-weight: bold;
  /* transition: all 0.1s; */
}
.list_div{
  width: 100%;
  height: auto;
  margin-top: 15px;
}

#deadList p{
  text-align: center;
  max-width: 200px;
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 101;
}

.year_p{
  display: block;
  position: relative; 
}

.Extinct_title{
  font-weight: bolder;
}
/* .item_p{

} */

.year_p:before, .year_p:after {
    content: '';
    position: absolute;
    top: 52%;
    background: #494949;
    width: 35%;
    height: 1px;
}

.year_p:before{
    left: 0%;
}

.year_p:after {
    right: 0%;
}
/* 
.v-enter, .v-leave-to {
  animation: bounce-in .5s;
}
.v-enter-active, .v-leave-active {
  animation: bounce-in .5s reverse;
} */

.v-item {
    display: inline-block;
    margin-right: 10px;
  }
.v-move,.v-enter-active, .v-leave-active {
    transition: 0.5s;
  }
.v-leave-active{
    position:absolute;
  }
.v-enter, .v-leave-to{
    opacity: 0;
    color: red;
    transform: translateX(-100px);
  }
</style>
