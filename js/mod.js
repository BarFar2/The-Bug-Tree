let modInfo = {
	name: "The-Bug-Tree",
	id: "什么",
	author: "nobody",
	pointsName: "points",
	//最上面资源的名字
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // 用于硬重置和新游戏
	//initialStartPoints 硬重置后或者刚开始新游戏时的点数
	offlineLimit: 1,  // In hours
}
//声明
function rs(va,start,root) {
	if (va.gte(start)) {
		var ava = va.div(start);
		var aava = ava.root(root).mul(start);
		return aava;
	} else {
		return va;
	}
}
var sbe = new Decimal(1);
var devSpeed = 1;
function SBES() {
    return '它们使点数和bug的获取*' + format(sbe);
}


// 在版本号和名字中设置您的版本
let VERSION = {
	num: "烂尾楼",//右上角的版本显示
	name: "Literally nothing",
}

let changelog = `<h1>更新日志</h1><br>
    <h3>v0.2</h3><br>
	    - 添加一个层级，烂尾楼<br><br>
    <h3>v0.1.6</h3><br>
	    - 添加3个升级<br><br>
    <h3>v0.1.5</h3><br>
        - 添加了升级描述和2个升级<br><br>
    <h3>v0.1.4</h3><br>
        - 重新平衡部分内容<br><br>
    <h3>v0.1.3.1</h3><br>
        - 修复一些bug，并且把SBC22的“但是购买升级不会重置点数和bugs了”删除，因为如果不删除，就跟没有SBC12一样<br>
    <h3>v0.1.3</h3><br>
        - 添加一个里程碑,2个挑战，2个成就<br><br>
    <h3>v0.1.2</h3><br>
        - 添加一个里程碑,2个挑战，5个成就<br><br>
    <h3>v0.1.1</h3><br>
        - 添加一个里程碑<br><br>
    <h3>v0.1.0</h3><br>
        - 添加一个新层级，又添加了一个Bug升级和一个SB升级<br><br>
    <h3>v0.0.3</h3><br>
        - 添加第四、五、六、七、八、九个升级<br><br>
    <h3>v0.0.2</h3><br>
        - 添加第二、三个升级<br><br>
    <h3>v0.0.1</h3><br>
	    - 添加第一个升级<br><br>
	<h3>v0.0.0</h3><br>
		- 在浏览器中运行了一遍<br>`

let winText = `祝贺你已经到了终点并且通关了这个游戏，但是现在……`

// 如果在层内的任何位置添加新函数，并且这些函数在调用时会产生效果，请在此处添加它们。
function ach() {//成就点计算
    //if (hasAchievement('ach',11)) { player.ach.points = player.ach.points.add(new Decimal(1))}
	//if (hasAchievement('ach',12)) { player.ach.points = player.ach.points.add(new Decimal(1))}
	//if (hasAchievement('ach',13)) { player.ach.points = player.ach.points.add(new Decimal(1))}
	//if (hasAchievement('ach',14)) { player.ach.points = player.ach.points.add(new Decimal(1))}
}
function ssb() {//是否显示SBlayer
	if (hasMilestone('sb',0) || hasUpgrade('bug',25) || player.i.points.gte(1)) {
		return true 
	} else {
		return false
	}
}
function BU25w() {//BU25升级描述
	if (hasMilestone('sb',1)) {
		return 'Multiply points and bugs gain by 2.'
	} else {
		return 'Unlock a new layer.'
	}
}
function BU13w() {//BU13升级描述
	if (hasChallenge('sb',11)) {
		return '点数获取*(bug数量+1)^1.05'
	} else {
		return '点数获取*(bug数量+1)'
	}
}
function BU21w() {//BU21升级描述
	if (hasChallenge('sb',11)) {
		return '点数获取*(点数数量+1)^0.15'
	} else {
		return '点数获取*(点数数量+1)^0.1'
	}
}
function BU23w() {//BU23升级描述
	if (hasChallenge('sb',11)) {
		return '点数获取^1.2'
	} else {
		return '点数获取^1.1'
	}
}
function SBM0w() {//SBM0升级描述
	if (hasChallenge('sb',22)) {
		return '点数和bug的产量乘以(SB+1)^2'
	} else {
		return '点数和bug的产量乘以(SB+1)'
	}
}
function SBE() {//SB效果
	sbe = new Decimal(1);
	if (hasMilestone('sb',0) && !hasUpgrade('sb',11)){
		sbe = sbe.mul((player.sb.points.add(1)))
	} else {
		if (hasUpgrade('sb',11)){
		    sbe = sbe.mul((player.sb.points.add(one)).pow(player.sb.points.add(one)));
		} else {
			sbe = sbe.mul((player.sb.points.add(one)).pow(2));
		}
	}
	return sbe;
}
function IEW() {
	return '它让点数获取变为'+ player.i.points.add(1) +'^原来的点数产量+原来点数产量-1';
}
// （此处为示例，所有官方功能均已完成）
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// 确定它是否应每秒获得点数
function canGenPoints(){
	return true
}



// 您可以将非层相关变量添加到“player”中，并与默认值一起保存在此处
function addedPlayerData() { return {
}}

// 在页面顶部显示额外的内容
var displayThings = [
]

// 确定游戏何时结束
function isEndgame() {
	return player.points.gte(new Decimal("f10"))
}

// 每秒计算点数！
function getPointGen() {
	//ach()

	if(!canGenPoints()) {
		return new Decimal(0)
	}
	gain = new Decimal(1)
	if (hasUpgrade('bug',11)) {
		if (inChallenge('sb',11) || inChallenge('sb',22)) {
			gain = gain.mul(new Decimal(2))
		} else {gain = gain.mul(new Decimal(4)) }}

	if (hasUpgrade('bug',13)) {
	    if (inChallenge('sb',11) || hasChallenge('sb',11) || inChallenge('sb',22)){
			gain = gain.mul((player.bug.points.add(new Decimal(1))).pow(1.05))
		} else {gain = gain.mul(player.bug.points.add(new Decimal(1))) }}
    
	if (hasUpgrade('bug',21)) {
	    if (inChallenge('sb',11) || hasChallenge('sb',11) || inChallenge('sb',22)) {
			gain = gain.mul((player.points.add(new Decimal(1))).pow(new Decimal(0.15)))
		} else {gain = gain.mul((player.points.add(new Decimal(1))).pow(new Decimal(0.1))) }}
	

	if (hasUpgrade('bug',23)) {
    	if (inChallenge('sb',11) || hasChallenge('sb',11) || inChallenge('sb',22)) {
			gain = gain.pow(new Decimal(1.2))
		} else {gain = gain.pow(new Decimal(1.1)) }}
	
    gain = gain.mul(SBE())

	if (hasUpgrade('sb',13)) {gain = gain.pow(2.5)}

	if (hasUpgrade('sb',15)) {gain = gain.pow(player.bug.points.add(10).log(10).log(10).add(1).pow(0.5))}

    gain = rs(gain,new Decimal('e60'),new Decimal(3))
    
    gain = rs(gain,new Decimal('e5000'),new Decimal(2))
    
    gain = rs(gain,new Decimal('ee1850'),new Decimal('e10'))

	gain = (player.i.points.add(1)).pow(gain).add(-1).add(gain)

	gain = gain.mul(devSpeed);
	return gain
}

// Less important things beyond this point!不太重要的事情超过这一点！

// 样式为背景，可以是函数
var backgroundStyle = {

}

function maxTickLength() {
	return(3600) // 默认值为1小时，这只是任意大
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.你可以用这个来限制他们目前的资源。
function fixOldSave(oldVersion){
}