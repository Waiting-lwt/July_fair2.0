<template>
	<view class="areo-main">
		<view class="tipRegistrate" v-if="isLogin===false">
		<view class="modal-mask"></view>
			<view class="tipDetail">
				<text class="tipRegistrate-text" style="padding-left: 50rpx;">
					注册认证后即可解锁完整功能</text>
			</view>
			<view class="toRegistrate" @tap="toLogin">
				<text class="tipRegistrate-text">注册认证</text>
			</view>
		</view>
		
		<!-- 个人信息头部 -->
		<view class="areo-top">
			<view class="user0">
				<view class="platform" @tap="showSpringBox=(showSpringBox+1)%2">
					<text class="icon-3lines-white"></text>
				</view>
				
				<view class="modal-mask" @tap="showSpringBox=(showSpringBox+1)%2;" v-if="showSpringBox==true"></view>
				<view class="arrivalNavigation" v-if="showSpringBox">
					<view class="sideNavigation">
						<navigator class="navigatorStyle" url="../../pages/index/index">
							<text>平台规则</text>
						</navigator>
						<view class="liBottomBorder"></view>
						<navigator class="navigatorStyle" url="../../pages/index/index">
							<text>联系平台</text>
						</navigator>
					</view>
				</view>
					
					
				<view class="address">
					<text class="icon-car-address"></text>
					<text style="margin-left: 10rpx;" @tap="toAddress()">收货地址</text>
				</view>
				
			</view>
			<view class="user1">
				
				<view @tap="toMyself()">
					<image class="user-image" :src="userMine.portrait" mode="aspectFill" lazy-load="false" @error
						@load></image>
				</view>
				<view class="user-info">
					<text class="user-name">{{userMine.name}}</text>
					<view class="user-identity-block">
						<template v-if="userMine.type==0||userMine.type==1">
							<text class="user-identity" v-if="userMine.type==0">学生</text>
							<text class="user-identity" v-if="userMine.type==1">商家</text>
							<text class="iconfont icon-hook-blue" style="margin-top: 5rpx;">
							</text>
						</template>
						<template v-if="userMine.type==2||userMine.type==3">
							<text class="check-bar"></text>
							<text class="check-text" v-if="userMine.type==2">审核未通过</text>
							<text class="check-text" v-if="userMine.type==3">未审核</text>
						</template>
					</view>
					
					<text class="user-follow">
						<text class="followed">
							<text class="follow-title">关注</text>
							<text class="num">{{userMine.follows}}</text>
						</text>
						<text class="followed">
							<text class="follow-title">粉丝</text>
							<text class="num">{{userMine.fans}}</text>
						</text>
					</text>
				</view>
			</view>
			<view class="user2">
				<view class="user-tags">
					<view class="tag-background" v-for="(item,index) in userMine.tags" :key="index">
						<view class="tag-item">
							<text class="tag-text">{{item}}</text>
						</view>
					</view>
					<view class="discounts">
						<text style="margin-right: 10rpx;" @tap="toDiscounts">优惠中心</text>
						<text class="icon-rightarrow-white"></text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- areo-body -->
		<view class="areo-body-box">
			<view class="areo-body">
				<view class="title">
					<view class="title-bar"></view>
					<text class="title-name">我的买卖</text>
				</view>
				<view class="collection-block">
					<view class="collection-item" @click="toOrder(0)">
						<text class="category">市集</text>
						<text class="iconfont icon-rightarrow" style="float: right;">
						</text>
						<text class="collection-count">共{{ordergoodsNum}}个</text>
					</view>
					<view class="collection-item" @click="toOrder(1)">
						<text class="category">拍卖</text>
						<text class="iconfont icon-rightarrow" style="float: right;">
						</text>
						<text class="collection-count">共{{orderauctionsNum}}个</text>
					</view>
				</view>
				<view class="title">
					<view class="title-bar"></view>
					<text class="title-name">我的收藏</text>
				</view>
				<view class="collection-block">
					<view class="collection-item" @click="toCollection(0)">
						<text class="category">商品</text>
						<text class="iconfont icon-rightarrow" style="float: right;">
						</text>
						<text class="collection-count">共{{collgoodsNum}}个</text>
					</view>
					<view class="collection-item" @click="toCollection(1)">
						<text class="category">拍卖品</text>
						<text class="iconfont icon-rightarrow" style="float: right;">
						</text>
						<text class="collection-count">共{{collauctionsNum}}个</text>
					</view>
				</view>
				<view class="title">
					<view class="title-bar"></view>
					<text class="title-name">历史踪迹</text>
					<text class="more-history" @tap="toMoreHistory">查看更多</text>
				</view>
				<view class="history-block">
					<view class="history-item" v-for="(item,index) in userHistoryLate" :key="index"
						@tap="toClassify(item.id,item.type)">
						<view class="pic-box">
							<image class="pic" :src="item.introImage[0]" lazy-load="true" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="areo-bottom">......已经到底啦......</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// app:getApp(),
				userid:getApp().globalData.userid,
				//userid:1,
				//表示的是缓存里面的数据
				userInfo: {},
				//表示 的是用户我的页表里面的数据
				userMine: {
					tags:['','','']
				},
				showSpringBox:false,
				showdetail:false,
				test: {},
				//记录用户的历史踪迹
				userHistory: [],
				//9张
				userHistoryLate: [],
				//订单数量
				orderNum: 0,
				ordergoodsNum: 0,
				orderauctionsNum: 0,
				//收藏品的数量
				exhibitionsNum: 0,
				collgoodsNum: 0,
				collauctionsNum: 0,
			};
		},
		components: {},
		props: {},
		computed: {
			myDate() {
				let date = new Date()
				return this.$formatDate(date)
			},
			isLogin(){
				if(!this.userid){
					return false;
				}
				return true;
			},
		},
		methods: {
			toLogin(){
				console.log("tologin")
				// yedn:转去封面login页面
				uni.navigateTo({
					url:'../login/login'
				})
			},
			
			//获取用户信息
			async getUserInfo() {
				console.log(this.userid)
				if (this.userid) {
					const res = await this.$myRequest({
						url: "/user/baseInformation?id="+this.userid,
					})
					this.userMine = res.data.data
				}
			},
			//获取历史记录
			async getHistory() {
				let res = await this.$myRequest({
					url: "/goods/history?userId=" + this.userid,
				})
				this.userHistory = [...this.userHistory, ...res.data.data]
				this.userHistoryLate = this.userHistory.slice(0,9)
			},
			//获取买卖订单的数量
			async getOrder() {
				//showType 普通商品：0，拍卖品：1
				let showType = 0
				let res = await this.$myRequest({
					url: "/goods/nums/user",
					data:{
						id:this.userid,
						type:showType,
					}
				})
				this.ordergoodsNum = res.data.data;
				showType++;
				res = await this.$myRequest({
					url: "/goods/nums/user",
					data:{
						id:this.userid,
						type:showType,
					}
				})
				this.orderauctionsNum = res.data.data;
			},
			//获取收藏各部分的总数
			async getCollection() {
				//showType 普通商品：0，拍卖品：1
				let showType = 0
				let res = await this.$myRequest({
					url: "/goods/nums/collect",
					data:{
						userId:this.userid,
						type:showType,
					}
				})
				this.collgoodsNum = res.data.data;
				showType++;
				res = await this.$myRequest({
					url: "/goods/nums/collect",
					data:{
						userId:this.userid,
						type:showType,
					}
				})
				this.collauctionsNum = res.data.data;
			},
			//前往订单页面
			toOrder(type) {
				//type 市集：0，拍卖：1
				uni.navigateTo({
					url: "../../pagesD/my-orders/my-orders?type=" + type + "&userid=" + this.userid
				})
			},
			//前往收藏页面
			toCollection(type) {
				uni.navigateTo({
					url: "../../pagesD/my-collections/my-collections?type=" + type + "&userid=" + this.userid
				})
			},
			//个人(me)页面
			toMyself() {
				// 加密传递的对象数据
				let item = encodeURIComponent(JSON.stringify(this.userMine))
				uni.navigateTo({
					url: "../../pagesC/person-me/person-me" + "?userMine=" + item,
				})
			},
			//根据type跳转到相对应的页
			toClassify(id, type) {
				
			},
			//收货地址
			toAddress(){
				uni.navigateTo({
					url: "../../pagesC/my-address/my-address",
				})
			},
			//查看更多历史踪迹
			toMoreHistory(){
				uni.navigateTo({
					url: "../../pagesD/my-morehistory/my-morehistory" + "?userid=" + this.userid,
				})
			},
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		
		onLoad() {
			this.getUserInfo();
			this.getOrder();
			this.getCollection();
			this.getHistory();
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			
		},
		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
	};
</script>
<style>
	@import "./my.css";
</style>
