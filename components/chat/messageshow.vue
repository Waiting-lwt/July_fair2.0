<template>
	<view class="m-item" :id="'message'+id">
		<view class="m-left">
			<!-- <image class="head_icon" :src="abosultPaht+user.home.img" v-if="message.user=='home'"></image> -->
			<image class="head_icon" v-if="message.user=='home'"></image>
		</view>
		<view class="m-content">
			<view class="m-content-head" :class="{'m-content-head-right':message.user=='customer'}">
				<view :class="'m-content-head-'+message.user">{{message.content}} </view>
			</view>
		</view>
		<view class="m-right">
			<!-- <image class="head_icon" :src="abosultPaht+user.customer.img" v-if="message.user=='customer'"></image> -->
			<image class="head_icon" v-if="message.user=='customer'"></image>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				abosultPaht: "../../"
			}
		},
		props: ['message', 'id'],
		computed: mapState(['user'])
	}
</script>

<style>
	.m-item {
		display: flex;
		flex-direction: row;
		padding-top: 40px;
	}
	.m-left {
		display: flex;
		width: 120rpx;
		justify-content: center;
		align-items: flex-start;
	}
	.m-content {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;
		word-break: break-all;
	}
	.m-right {
		display: flex;
		width: 120rpx;
		justify-content: center;
		align-items: flex-start;
	}
	.head_icon {
		width: 80rpx;
		height: 80rpx;
		border: 1rpx solid #000000;
	}
	.m-content-head {
		position: relative;
		display: flex;
		justify-content: flex-start;
	}
	.m-content-head-right {
		display: flex;
		justify-content: flex-end;
	}
	.m-content-head-home {
		text-align: left;
		background: #1482d1;
		border: 1rpx #1482d1 solid;
		border-radius: 20rpx;
		padding: 20rpx;
		color: white;
	}
	.m-content-head-home:before {
		border: 15rpx solid transparent;
		border-right: 15rpx solid #1482d1;
		left: -26rpx;
		width: 0;
		height: 0;
		position: absolute;
		content: ' '
	}
	.m-content-head-customer {
		border: 1rpx #a6dcff solid;
		background: #a6dcff;
		border-radius: 20rpx;
		padding: 20rpx;
	}
	.m-content-head-customer:after {
		border: 15rpx solid transparent;
		border-left: 15rpx solid #a6dcff;
		top: 20rpx;
		right: -26rpx;
		width: 0;
		height: 0;
		position: absolute;
		content: ' '
	}
</style>