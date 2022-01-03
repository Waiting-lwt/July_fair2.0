<template>
	<view class="function-title">
		<view class="function-block" v-for="(item,index) in title" :key="index"
		@click="changeIndex(index)" :class="{textActive:currentIndex===index}">{{item}}</view>
		<view class="assistant" :class="{assistantActive1:currentIndex===0,
		assistantActive2:currentIndex===1}"></view>
		<view class="assistant-bottom" :class="{assistantBottomActive1:currentIndex===0,
		assistantBottomActive2:currentIndex===1}"></view>
	</view>
</template>

<script>
export default {
  data() {
    return {
		// title:["收藏","作品"],
		currentIndex:0,
	};
  },
  components: {},
  props:{
	  title:{
		  type:Array,
		  default:["titleUndefined","titleUndefined"]
	  },
	  functionIndex:{
		  type:Number,
		  default:0
	  }
  },
  methods: {
	  changeIndex(index){
		  this.currentIndex = index
		  //向父组件传递参数
		  this.$emit("returnIndex",this.currentIndex)
	}

  },
  // 组件初始化,未完全创建阶段
  beforeCreate() {
	console.log("beforeCreated")
  },
  // 组件创建后，但还未挂载
  // 在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  created() {
    console.log("created")
	if(this.$props.functionIndex){
	  this.currentIndex = this.$props.functionIndex
	}
  },
  //在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作
  mounted: function () {
    console.log("mounted")
  },
  
};
</script>
<style>
	@import url("./Tabs.css");
</style>
