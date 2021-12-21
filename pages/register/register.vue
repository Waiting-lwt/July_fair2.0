<template>
	<view>
		<view class="container">
			<!-- 顶部条 -->
			<view class="top">
				<image src="../../static/images/left.png" mode="aspectFill" @click="goBack()"></image>
				<text>注册与认证</text>
			</view>
			<!-- 头像 -->
			<view class="portrait">
				<image :src="portraitSrc" mode="aspectFill"></image>
				<view class="add-portrait" v-if="plusBtn" @click="uploadImgType = 1 ,addPic()">
					<image src="../../static/images/408.png" mode="aspectFill"></image>
				</view>
			</view>

			<!-- 两个输入框 -->
			<view class="input">
				<text>昵称</text>
				<input type="text" value="" v-model="nickname" placeholder="请输入昵称" placeholder-style="color:#DFDDD9" />
			</view>
			<view class="input">
				<text>生日</text>
				<xp-picker ref="picker" @confirm="confirm()" />
				<input type="text" v-model="birthday" disabled="disabled" value="" placeholder="请输入生日" @tap='show()'
					placeholder-style="color:#DFDDD9" />
			</view>
			<!-- 小字-说明信息 -->
			<view class="info">
				<text>身份认证</text>
				<text>游客只能在平台购买，学生和商家可发布作品</text>
			</view>

			<!-- 按钮-身份选择 -->
			<view class="select-btn">
				<view :class="{ btn11: btn1==0 }" @click="selectBtn1()"><text>我是游客</text></view>
				<view :class="{ btn22: btn2==1 }" @click="selectBtn2()"><text>我是学生</text></view>
				<view :class="{ btn33: btn3==2 }" @click="selectBtn3()"><text>我是商家</text></view>
			</view>

			<!-- 学生区块 -->
			<block v-if="btn2==1">
				<view class="prompt">
					<image src="../../static/images/Layer%202.png" mode="aspectFill"></image>
					<text>以下信息填写确定后不可更改，请上传并填写真实有效的信息</text>
				</view>
				<view class="input">
					<text>学校</text>
					<input type="text" v-model="university" value="" placeholder="请输入学校名称"
						placeholder-style="color:#DFDDD9" />
				</view>
				<view class="input">
					<text>专业</text>
					<input type="text" v-model="major" value="" placeholder="请输入专业名称"
						placeholder-style="color:#DFDDD9" />
				</view>
				<view class="input">
					<text>学号</text>
					<input type="number" v-model="schoolNumber" value="" placeholder="请输入学号"
						placeholder-style="color:#DFDDD9" />
				</view>
				<view class="input2">
					<view class="input2-top">
						<text>校园卡</text>
						<text style="color:#DFDDD9">请上传学生证图片</text>
					</view>
					<!-- 未上传校园卡 -->
					<view class="icon-add" v-if="cardSrc==''" @tap="uploadImgType = 2 ,addPic()">
						<text>+</text>
					</view>
					<!-- 已经上传校园卡 -->
					<view class="card-img" v-if="cardSrc!=''">
						<image :src="cardSrc" mode="aspectFill"></image>
					</view>
				</view>
			</block>
			<!-- 商家区块 -->
			<block v-if="btn3==2">
				<view class="prompt">
					<image src="../../static/images/Layer%202.png" mode="aspectFill"></image>
					<text>以下信息填写确定后不可更改，请上传并填写真实有效的信息</text>
				</view>
				<view class="input2">
					<view class="input2-top">
						<text>证明资料</text>
						<text style="color:#DFDDD9">请上传资料图片</text>
					</view>
					<!-- 未上传商家资料 -->
					<view class="icon-add" v-if="merchantSrc==''" @click="addPic()">
						<text>+</text>
					</view>
					<!-- 已经上传商家资料 -->
					<view class="merchant-img" v-if="merchantSrc!=''">
						<image :src="merchantSrc" mode="aspectFill"></image>
					</view>
				</view>
			</block>
			<!-- 游客区块 -->
			<block v-if="btn1 == 0">
				<text class="block-yk">游客无需认证</text>
			</block>
			<view class="confirm" @click="goConfirm()">
				<text>立即认证</text>
			</view>
            
			<!-- 弹窗 -->
			<uni-popup ref="popup" type="dialog" class="confirmPrice-container">
				<view class="confirmPrice">
					<text>确定提交认证吗？</text>
					<text>身份认账一经通过无法更改</text>
					<view class="confirmPrice-btn">
						<view class="confirm-btn" @click="close()">
							<text>取消</text>
						</view>
						<view class="confirm-btn" @click="registerStudent()">
							<text>确定</text>
						</view>
					</view>
				</view>
			</uni-popup>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:getApp().globalData.uesr,
				btn1: -1,
				btn2: 1,
				btn3: -1,
				portraitSrc:'../../static/images/portrait_src.png',//头像地址
				plusBtn:true,//添加头像按钮显示
				nickname: '', //昵称和生日
				birthday: '',
				university: '', //学生注册信息
				major: '',
				schoolNumber: '',
				cardSrc:'',    //校园卡图片地址
				merchantSrc:'', //商家资料图片地址
				uploadImgType:'', //区分上传的是头像还是校园卡
				user_register:{}
			}
		},
		onLoad() {
			// uni.getStorageSync({
			// 	key:user,
			// 	success:function(res){
			// 		console.log('缓存的用户数据',res)
			// 	}
			// })
			console.log(this.user)
		},
		methods: {
			//弹窗
			open() {
				this.$refs.popup.open('center')
		    },
			close() {
			    this.$refs.popup.close()
			},
			//顶部条返回按钮
			goBack() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			// 三个按钮切换
			selectBtn1() {
				this.btn1 = 0;
				this.btn2 = -1;
				this.btn3 = -1
			},
			selectBtn2() {
				this.btn1 = -1;
				this.btn2 = 1;
				this.btn3 = -1
			},
			selectBtn3() {
				this.btn1 = -1;
				this.btn2 = -1;
				this.btn3 = 2
			},
			//底部的《立即认证》
			goConfirm() {
				console.log('昵称', this.nickname)
				console.log('生日', this.birthday)
				if (this.nickname && this.birthday) {
					if (this.btn2 == 1) {                 //学生认证
						console.log('学校', this.university)
						console.log('专业', this.major)
						console.log('学号', this.schoolNumber)
						console.log('校园卡地址：', this.cardSrc)
						if (this.university && this.major && this.schoolNumber&&this.cardSrc) {
						    this.open()
							this.user_register = {
								portrait:this.portraitSrc,
								nickname:this.nickname,
								birthday:this.birthday,
								university:this.university,
								major:this.major,
								schoolNumber:this.schoolNumber,
								card:this.cardSrc
							}
							console.log('注册信息：',this.user_register)
							getApp().globalData.user_register = this.user_register
							console.log('globaldata里的注册信息：',getApp().globalData.user_register)
						} else {
							uni.showToast({
								title: '请补全学生信息',
								duration: 1500,
								icon: 'none'
							})
						}
						console.log('昵称：', this.nickname, '生日：', this.birthday)

					}
					if(this.btn3==2) {    //商家认证
						console.alert('nihao')
					}
					if(this.btn1==0) {    //游客认证
						uni.switchTab({
							url:'../index/index'
						})
					}
				}else {
						uni.showToast({
							title: '请填写昵称和生日',
							duration: 1500,
							icon: 'none'
						})
					}
			},
			// 注册学生用户
			async registerStudent() {
				
				console.log('注册')
				const res = await this.$myRequest({
					method:'POST',
					url:'/user/register/student',
					//url: '/user/register/student?university=' + this.university + '&major=' + this.major + '&schoolNumber=' + this.schoolNumber + '&card=' + this.cardSrc,
					data: {
						name:this.nickName,
						univercity:this.university,
						major:this.major,
						schoolNumber:this.schoolNumber,
						card:this.cardSrc,
						openId:this.user.openId,
						type:this.user.Type,
						portrait:this.portraitSrc,
						fans:0,
						follows:0
					}
				})
				console.log('注册执行结果:',res)
				getApp().globalData.Type = 0
				console.log('修改用户身份：学生：（type==0）',getApp().globalData.Type)
				this.close()
				uni.showToast({
					icon:'success',
					title:'注册成功！',
					duration:1500
				})
				setTimeout(this.goToSelectTags(),2000);
				
				
			},
			goToSelectTags() {
			    uni.navigateTo({
					url:'../select-tags/select-tags'
				})	
			},
			// 生日选择器
			show() {
					this.$refs.picker.show()
				},
				confirm(e) {
					console.log(e)
					this.birthday = e.value
				
			},
			// 上传图片-学生
			async addPic() {
				console.log("uploading pics");
				var self = this;
				let res1 = await this.$chooseImage({})
				console.log('res1.temp...:',res1)
				let res2 = await this.$uploadFile({
					//url: "/goods/uploadImage",
					url: "/user/uploadImage?type=" + this.uploadImgType ,
					tempFilePaths: res1.tempFilePaths
				})
				console.log('res2.data:',res2.data)
				var obj = JSON.parse(res2.data);
				if(obj.status==0){
					console.log(obj.data[0])
					
					if(this.uploadImgType==1) {
						this.portraitSrc = obj.data[0]
						this.plusBtn = false
						// let key = "portraitSrc"
						// let value = this.portraitSrc
						console.log('globaluser：',getApp().globalData.uesr)
						console.log('用户上传的头像',this.portraitSrc)
						//getApp().globalData.user.portraitSrc = this.portraitSrc
						
					}
					if(this.uploadImgType==2) {
						this.cardSrc = obj.data[0]
					}
					
					uni.showToast({
						icon:"none",
						title:"上传成功"
					})
				}
				else{
					uni.showModal({
						title:"上传失败",
						content: 'error:'+obj.message,
					});
				}
			},
			// 上传图片-商家
			
		}
	}
</script>

<style lang="less">
	@import "register.less";
</style>
