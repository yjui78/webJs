let app=new Vue({
	el:".app",
	data:{
		ruleShow:true,
		prizeShow:false,
		runOutShow:false,
		failShow:false,
		frequency:5
	},
	methods:{
		// 请求奖品接口
		getPrize(){
			this.prizeShow=true;
		},
		// 挑战失败
		fail(){
			this.frequency==0?this.runOutShow=true:this.failShow=true;
		},
		// 再次挑战
		challengeAgain(){
			this.failShow=false;
			this.frequency--;
			document.querySelector(".button").dispatchEvent(new Event('touchstart'));
		}
	}
})