<template>
  <div id="deadList">
    <p class="Extinct_title">Extinction List</p>
    <div class="list_div" id="list_div">
      <transition-group>
        <template>
        <div v-for="(item,index) in getList" :key=index>
          <p class="year_p">
            {{item.year}} 
          </p>
          <p v-for="(i,index) in item.list" :key=index class="item_p">
            {{i}}
          </p>
        </div>
        </template>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: 'deadList',
  data:function(){
    return {
      list:[]
    }
  },
  filters:{
    myfilters(value){
      console.log(value)
      if (value!=undefined){
        return value
      }
    }
  },
  methods:{
    insert(year, name){
      this.list[year] = this.list[year] == undefined ? [] : this.list[year]
      this.list[year].push(name)
      this.$set(this.list, year, this.list[year]);
      var div = document.getElementById('deadList');
      div.scrollTop = div.scrollHeight;
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
      return arr
    }
  },        
  mounted() {
    // for (let i=0;i<10;i++){
    //   setTimeout(()=>{
    //     this.insert(1900+i,'as1231d')
    //   },i*500)
    // }
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
}
.list_div{
  width: 100%;
  height: auto;
  margin-top: 30px;
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
  margin-bottom: 20px;
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
    transition: 1s;
  }
.v-leave-active{
    position:absolute;
  }
.v-enter, .v-leave-to{
    opacity: 0;
    transform: translateX(-50px);
  }
</style>
