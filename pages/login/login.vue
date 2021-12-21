<template>
	<view>
		<view class="container">
			<image src="../../static/upload/register2.png" mode="aspectFill"></image>
			<!-- 注册按钮 -->
			<view class="login-button" @click="toLogin()">
				<text></text>
				<text>点击进入注册界面</text>
				<view class="img-right">
					<image src="../../static/images/right.png" mode="aspectFill"></image>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: '',
				openId: '',
				token:'',
				
				try:'123321',

			}
		},
		// onLoad() {
		// 	uni.login({
		// 		success:res => {
		// 			console.log(res)
		// 		},
		// 		fail:function(err){
		// 		  console.log("获取失败: ",err)
		// 		}
		// 	})
		// }
		methods: {
			toLogin() {
				
				uni.getUserProfile({
					desc: "正在获取", //获取userInfo
                    
					success: function(userRes) {
						console.log('获取成功: ', userRes)
						//********************************************************
						uni.showToast({
							icon: 'none',
							title: '获取成功'
						})
						let code = ''
						let avatarUrl = userRes.userInfo.avatarUrl
						let gender = userRes.userInfo.gender
						let nickName = userRes.userInfo.nickName
						let language = userRes.userInfo.language

						uni.login({ //获取code
							provider: 'weixin',

							success: loginRes => {
								console.info('获取code', loginRes),
									code = loginRes.code,          //存code
									console.info('code:', code),
                                    //********************************************************
                                    uni.showToast({
                                    	icon: 'none',
                                    	title: '获取code成功'
                                    })
									console.log(avatarUrl)
								uni.request({                  //获取token
									url: 'http://120.24.48.171:8081/user/login?code=' + code,
									method: 'POST',
									success: function(res) {      
										
										// openId = res.data.data.openid
										// Type = res.data.data.type
										console.log('login返回的结果：token',res)      //获取token成功
										//********************************************************
										uni.showToast({
											icon: 'none',
											title: '获取token成功'
										})
										let token = res.data.data
										console.log('存到本地的token：',token)
										let openid = ''
										let Type = ''
										let userid = ''
										uni.request({                                   //发送token获取openid，userid，type
											url:'http://120.24.48.171:8081/user/regInformation',
											header:{token},
											success:function(res2){
												console.log('带token请求得id：',res2)            //获取openid，userid，type成功
												//********************************************************
												uni.showToast({
													icon: 'none',
													title: '获取openid，userid，type成功'
												})
												openid = res2.data.data.openId
												userid = res2.data.data.userId
												Type = res2.data.data.type
												console.log('temp结果：openid：',openid,'userid:',userid,'Type:',Type);
												
											},
											fail:function(err){
												console.log('带token请求失败：',err)
											}
										});
										
										setTimeout(function() {
											let user = {
									        	avatarUrl: avatarUrl,
									        	gender: gender,
									        	nickName: nickName,
									        	openid: openid,
									        	Type: Type,
									        	language: language,
									        	userid:userid
									        }
											console.log('存入global之前的user',user)		
											
											uni.setStorageSync("avatarUrl",user.avatarUrl)
											uni.setStorageSync("gender",user.gender)
											uni.setStorageSync("nickName",user.nickName)
											uni.setStorageSync("openid",user.openid)
											uni.setStorageSync("Type",user.Type)
											uni.setStorageSync("userid",user.userid)
											getApp().globalData.avatarUrl = user.avatarUrl
											getApp().globalData.gender = user.gender
											getApp().globalData.nickName = user.nickName
											getApp().globalData.openid = user.openid
											getApp().globalData.Type = user.Type
											getApp().globalData.userid = user.userid
											console.log('存入global的',
											    getApp().globalData.avatarUrl,
												getApp().globalData.gender,
									            getApp().globalData.nickName = user.nickName,
												getApp().globalData.openid,
												getApp().globalData.Type = user.Type,
												getApp().globalData.userid = user.userid
											)
											
										}, 2000);
										//********************************************************
										uni.showToast({
											icon: 'none',
											title: 'user存入global成功'
										})
										//};
										
										//uni.setStorageSync("user", user)
											uni.navigateTo({
												url:'../register/register'
											})
										// if(res.data.data.type == -1) {
										// 	uni.navigateTo({
										// 		url:'../register/register'
										// 	})
										// }



										// if(res.data.data.type != -1) {
										// 	uni.showToast({
										// 		title:'登陆成功',
										// 		icon:'success'
										// 	})
										// 	uni.switchTab({
										// 		url:'../index/index'
										// 	})
										// }
									},
									fail: function(err) {
										console.log("获取openid失败: ", err)
										//********************************************************
										uni.showToast({
											icon: 'none',
											title: '获取token失败'
										})
									}
								})

							},
							fail: function(err) {
								console.log("获取code失败: ", err)
							}
						})

					},

					fail: function(err) {
						console.log("获取失败: ", err)
						uni.showToast({
							icon: 'none',
							title: '获取失败'
						})
					}
				})







			},
   //          trytoget() {
			// 	uni.request({
			// 		url:'http://120.24.48.171:8081/user/baseInformation?id=11',
			// 		method:'GET',
			// 		success:function(res){
			// 			console.log('chenggong',res)
			// 		}
			// 	})
			// }

		}
	}
</script>

<style lang="less">
	.container {
		height: 1206rpx;
		position: relative;

		>image {
			height: 1796rpx;
			width: 100%;
		}

		.login-button {
			display: flex;
			justify-content: space-around;
			align-items: center;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translateX(-50%);
			background-color: #707070;
			width: 574rpx;
			height: 82rpx;
			background-color: #006AD7;
			border-radius: 20rpx;
			opacity: 0.7;

			>text {
				// line-height: 82rpx;
				color: #FFFFFF;
				font-size: 30rpx;
			}

			.img-right {
				height: 32rpx;
				width: 18rpx;

				>image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
