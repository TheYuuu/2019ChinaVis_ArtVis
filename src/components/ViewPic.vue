<template>
  <transition
    :duration="{ enter: 1000, leave: 800 }"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div class="ViewPic" v-show="BackgroundShow">
      <div class="mianpic">
        <div class="main">
          <div class="imgDiv">
            <img
              :src="'http://localhost:8080/static/img/img/' + showPic.img"
              alt="loading"
              class="showpic"
              id="showpic"
            >
          </div>
          <div class="InfDiv">
            <div class="InfContent">
              <p>Name: {{showPic.name}}</p>              
              <hr>
              <p>population: {{showPic.populationNow}}</p>
              <hr>
              <p>Description: {{showPic.Description}}</p>
              <hr>
              <p>Threat: {{showPic.threat}}</p>

            </div>
          </div>
        </div>
        <div class="left PreAndNext" v-on:click="Pre()">Pre</div>
        <div class="right PreAndNext" v-on:click="Next()">Next</div>
      </div>
      <div class="list" id="list">
        <ul class="list_ul" :style="{ left : Move + 'px' }">
          <template>
            <li
              v-for="(item, index) in list"
              :class="{choosed: index == showIndex}"
              v-on:click="imgClick(index)"
              :key="index"
            >
              <img :src="'http://localhost:8080/static/img/img/' + item.img" alt
              :style="YiXiang(item)">
            </li>
          </template>
        </ul>
      </div>
      <span class="close" v-on:click="quit()">Close</span>
    </div>
  </transition>
</template>

<script>
import * as d3 from "d3";
import { setInterval, clearInterval } from 'timers';
export default {
  name: "ViewPic",
  data: function() {
    return {
      maxWidth: "",
      Move: 0,
      BackgroundShow: false,
      showIndex: 0,
      list: [{
        Imagetitle:''
      }]
    };
  },
  watch: {
    showIndex() {
      this.position = setInterval(() => {
        if (this.BackgroundShow) {
          this.UlMove();
        }
      }, 1500);
    }
  },
  computed: {
    getMove() {
      return this.Move;
    },
    showPic() {
      return this.list[this.showIndex];
    }
  },
  methods: {
    YiXiang(item){
      if (item.populationNow<=0){
        return 'filter: grayscale(100%);'
      }
    },
    quit(){
      this.BackgroundShow = false;
      clearInterval(this.position)
    },
    imgClick(index) {
      this.showIndex = index;
    },
    showMe(list, index) {
      this.list = list;
      this.showIndex = index;
      this.BackgroundShow = true;
    },
    Next() {
      if (this.showIndex + 1 < this.list.length) {
        this.showIndex++;
      }
    },
    Pre() {
      if (this.showIndex - 1 >= 0) {
        this.showIndex--;
      }
    },
    UlMove() {
      var imgw = document.getElementsByClassName("choosed")[0].offsetWidth;
      var imgR = document
        .getElementsByClassName("choosed")[0]
        .getBoundingClientRect().right;
      var imgL = document
        .getElementsByClassName("choosed")[0]
        .getBoundingClientRect().left;
      if (this.maxWidth - imgR < 0) {
        this.Move -= 300;
      } else if (imgL - imgw < 0) {
        this.Move += 300;
      }
    }
  },
  mounted() {
    this.maxWidth = document.getElementById("app").offsetWidth;
  },
  updated() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  transition: all 0.5s;
}
.ViewPic {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background: black;
  z-index: 999;
}

.showpic {
  max-width: 100%;
  max-height: 70vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.mianpic {
  display: table-cell;
  width: 100vw;
  height: 80vh;
  padding-left: 150px;
  padding-right: 150px;
  text-align: center;
  vertical-align: middle;
}

.list {
  width: 100%;
  height: 20%;
}

.list_ul {
  height: 100%;
  width: 100000px;
  padding: 30px 0;
  margin: 0 20px;
  overflow: auto;
  position: relative;
}

.list_ul li {
  height: 100%;
  float: left;
  margin: 0 3px;
  list-style: none;
}

.list_ul li:hover {
  margin: 0 5px;
  border: 2px solid #6494fb;
  height: 120%;
}

.list_ul img {
  height: 100%;
}

.choosed {
  margin: 0 10px;
  border: 2px solid #6494fb;
  height: 120% !important;
}

.PreAndNext {
  float: left;
  color: white;
  cursor: pointer;
  user-select: none;
  position: relative;
  padding: 20% 0;
}

.left {
  width: 150px;
  height: 100%;
  margin-left: -100%;
  left: -150px;
}
.main {
  width: 100%;
  height: 100%;
  position: relative;
  float: left;
}
.right {
  width: 150px;
  height: 100%;
  margin-left: -150px;
  right: -150px;
}
.close {
  position: fixed;
  top: 10px;
  right: 50px;
  color: white;
  z-index: 10;
  cursor: pointer;
}

.imgDiv {
  height: 100%;
  width: 70%;
  position: relative;
  float: left;
  color: white;
  padding: 0px 10px;
}
.InfDiv {
  height: 100%;
  width: 30%;
  float: left;
  color: white;
  position: relative;
  text-align: left;
  font-size: 0.8rem;
  overflow: hidden;
  padding: 10px 10px;
  transform: translate(-10%, 0%);
}

.InfContent {
  width: 100%;
  max-height: 80vh;
  overflow: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 10px;
}
</style>
