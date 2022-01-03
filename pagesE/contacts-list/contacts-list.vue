<template>
	<view>
		<view class="contacts-list" v-for="(item,index) in contacts_list" :key="item.id">
			<view class="contacts-item" @click="toChat(item.id)">
				<image src="item.image" mode="aspectFill"></image>
				<view class="text-item">
					<text>{{item.nickname}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contacts_list:[
					{
						id:1,
						image:'',
						nickname:'lily'
					}
				]
			}
		},
		methods: {
			toChat(id){
				uni.navigateTo({
					url:"../chat/chat"
				})
			}
		}
	}
</script>

<style>
	.contacts-list{
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.contacts-item{
		width: 100%;
		height: 150rpx;
		border-bottom: 1px solid #a8a8a8;

		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
	.contacts-item image{
		width: 100rpx;
		height: 100rpx;
		border: 1px solid #a8a8a8;
	}
	.contacts-item .text-item{
		width: 500rpx;
		height: 100rpx;
		border: 1px solid #a8a8a8;
		padding: 10rpx;

		display: flex;
		flex-direction: column;
		/* justify-content: space-around; */
	}
	.contacts-item .text-item text:nth-child(1){
		font-size: 36rpx;
		color: #000000;
	}
</style>
