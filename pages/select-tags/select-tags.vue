<template>
	<view class="container">
		<view class="top">
			<text>选择个人标签</text>
		</view>


		<!-- 热门标签 ***********************************-->
		<view class="hot-title">
			<text>热门标签</text>
		</view>
		<view class="hot-tags">
			<view class="hot-tags-items" v-for="(item,index) in hotTags" :key="index" @tap="selectTag(index)"
				:class="(selectTags.includes(index)?'selectTag':'')">
				<text>{{item}}</text>
			</view>
		</view>


		<!-- 全部标签 ****************************************-->
		<view class="all-title">
			<text>全部标签</text>
		</view>
		<view class="all-tags">
			<!-- scroll-x="true" @scroll -->
			<view class="all-tags-items" v-for="items in hotTags">
				<text>{{items}}</text>
			</view>
		</view>


		<!-- 自定义标签 ********************************************-->
		<view class="custom-title">
			<text>自定义标签</text>
		</view>
		<view class="custom-container">
			<input type="text" v-model="tag" placeholder="请输入自定义标签文本" class="tagsInput" maxlength="5" />
			<view class="tagsInput-confirm" @tap="addTag">确认添加</view>
		</view>

		<!-- wt:已经选择的标签 -->
		<view class="selfTags-block">
			<view class="selfTags-box" v-for="(item,index) in selfTags" :key="index">
				<text>{{item}}</text>
				<text class="tags-delete" @tap="deleteTags(index)">x</text>
			</view>
		</view>


		<text class="footer">最多可添加三个标签</text>


		<!-- 底部按钮 -->
		<view class="btn-bottom">
			<view class="btn1" @click="jump()">
				<text>跳过</text>
			</view>
			<view class="btn2" @tap="confirmTags()">
				<text>确定</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hotTags: [],
				selfTags: [],
				selectTags:[],
				tag:"",
			};
		},
		onLoad() {
			this.getTags()
		},

		methods: {

			async getTags() {
				const res = await this.$myRequest({
					url: '/search/heat?type=0'
				})
				this.hotTags = res.data.data
			},
			// wt:删除已选择tag
			deleteTags(index){
				if(this.hotTags.includes(this.selfTags[index])){
					let i = this.hotTags.indexOf(this.selfTags[index])
					this.selectTags = this.selectTags.filter(function(item){return item != i})
				}
				this.selfTags.splice(index, 1)
			},
			// wt:选中tag
			selectTag(index){
				console.log(index)
				if(this.selectTags.includes(index)){
					// this.selectTags.splice(index,1)
				}
				else{
					if(this.selectTags.length==3){
						uni.showToast({
							title:"最多可添加3个标签",
							icon:'none',
						})
					}
					else{
						this.selectTags.push(index)
						this.selfTags.push(this.hotTags[index])
					}
				}
			},
			// wt:添加自定义tags
            addTag(){
            	if(this.tag==""){
            		uni.showToast({
            			title:"请输入自定义标签",
            			icon:'none',
            		})
            	}
            	else{
            		if(this.selfTags.length==3){
            			uni.showToast({
            				title:"最多可添加3个标签",
            				icon:'none',
            			})
            		}
            		else{
            			this.selfTags.push(this.tag)
            		}
            	}
            	this.tag = ""
            },
			confirmTags(){
				if(this.selfTags.length!=0){
					// let pages = getCurrentPages();
					// var currPage = pages[pages.length - 1]; //当前页面
					// var prevPage = pages[pages.length - 2]; //上一个页面
					// prevPage.$vm.tags = [...this.selfTags]
					// uni.navigateBack({})
					getApp().globalData.uesr = [...this.selfTags]
					console.log(getApp().globalData.uesr)
					uni.showToast({
						title:'添加成功！',
						icon:'success',
						duration:1000
					}),
					uni.switchTab({
						url:'../index/index'
					})
				}
				else{
					uni.showToast({
						title:"请添加标签",
						icon:'none',
					})
				}
			},
			jump() {
				uni.switchTab({
					url:'../index/index'
				})
			}

		}


	}
</script>

<style lang="less">
	.container {
		margin: 0 48rpx;

		.top {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100rpx;
			width: 100%;
			border-bottom: 1px solid #707070;

			>text {
				font-size: 38rpx;
				color: #006AD7;
				margin: 20rpx auto;
			}
		}

		.all-title,
		.hot-title,
		.custom-title {
			margin-top: 40rpx;

			>text {
				font-size: 30rpx;
				color: #006AD7;
			}
		}
        
		
		// wt:热门标签items
		
		
		 
		.hot-tags,
		.all-tags {
			margin-top: 20rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-wrap: wrap;

			.hot-tags-items,
			.all-tags-items {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 48rpx;
				padding: 0 40rpx;
				margin: 10rpx 20rpx 20rpx 4rpx;
				border-radius: 18rpx;
				border: 1rpx solid #4F73A5;

				>text {
					font-size: 28rpx;
					color: #4F73A5;
				}
			}
			// wt
			// .hot-tags-items {
			// 	display: inline-block;
			// 	height: 50rpx;
			// 	padding: 0rpx 40rpx 0rpx 40rpx;
			// 	margin: 30rpx 20rpx 0rpx 0rpx;
			// 	border: 1rpx solid #041746;
			// 	border-radius: 10rpx;
				
			// 	font-size: 28rpx;
			// 	color: #041746;
			// 	line-height: 50rpx;
			// 	text-align: center;
			// }
		}

		.all-tags {

			//white-space: nowrap;
		}

		.custom-container {
			margin: 20rpx 0rpx 20rpx 0rpx;

			// height: 400rpx;
			// width: 100%;
			.tagsInput {
				display: inline-block;
				border: 1rpx solid #041746;
				border-radius: 10rpx;
				width: 450rpx;
				height: 50rpx;
				margin: 0rpx 0rpx 0rpx 0rpx;
				padding-left: 10rpx;

				font-size: 28rpx;
				color: #041746;
			}

			.tagsInput-confirm {
				display: inline-block;
				vertical-align: 25%;
				border: 1rpx solid #041746;
				border-radius: 10rpx;
				margin: 0rpx 0rpx 0rpx 20rpx;
				padding: 0rpx 10rpx 0rpx 10rpx;
				height: 50rpx;
				font-size: 28rpx;
				line-height: 50rpx;
			}
		}

		//已选择的标签
		.selfTags-block {
			margin: 10rpx 0rpx 20rpx 0rpx;

			.selfTags-box {
				display: inline-block;
				height: 50rpx;
				padding: 0rpx 55rpx 0rpx 50rpx;
				margin: 10rpx 20rpx 20rpx 0rpx;
				background-color: #cfe1f4;
				border-radius: 20rpx;

				font-size: 28rpx;
				color: #0069D6;
				line-height: 50rpx;
				text-align: center;
			}

			.tags-delete {
				display: inline-block;
				position: absolute;
				padding-left: 25rpx;

				color: #002851;
				height: 30rpx;
				line-height: 46rpx;
				font-size: 32rpx;
			}
		}

		.selectTag {
			background-color: #dedede;
		}

		.footer {
			margin-left: 190rpx;
			font-size: 30rpx;
			color: #4F73A5;
			opacity: 0.7;
		}

		.btn-bottom {
			position: fixed;
			bottom: 10rpx;
			display: flex;
			justify-content: space-between;
			align-self: center;
			padding: 40rpx 20rpx;

			.btn1,
			.btn2 {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 87rpx;
				width: 260rpx;
				border-radius: 30rpx;
				border: 1px solid #006AD7;

				>text {
					font-size: 40rpx;
					color: #006AD7;
				}
			}

			.btn2 {
				margin-left: 92rpx;
				background-color: #006AD7;

				>text {
					color: #ffffff;
				}
			}

		}
	}
</style>
