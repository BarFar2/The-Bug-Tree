function resetUpgrades(id) {
    var tempArray = [];
    var j = 0;
    for (var i = 0; i < player.bug.upgrades.length; i++) {
        if (player.bug.upgrades[i] >= id) {
            tempArray[j] = player.bug.upgrades[i];
            j++;
        }
    }
    player.bug.upgrades = tempArray;
}
function resetLrUpgrades(id) {
    var tempArray = [];
    var j = 0;
    for (var i = 0; i < player.bug.upgrades.length; i++) {
        if (player.bug.upgrades[i] != id - 1 && player.bug.upgrades[i] != id + 1) {
            tempArray[j] = player.bug.upgrades[i];
            j++
        }
    }
    player.bug.upgrades = tempArray;
}
var zero = new Decimal(0);
var one = new Decimal(1);
var two = new Decimal(2);
var three = new Decimal(3);
var four = new Decimal(4);
addLayer("bug", {
    branches:["ew"],
    symbol: "B", // 这将显示在图层的节点上。默认值是首字母大写的id
    position: 0, // 一行中的水平位置。默认情况下，它使用图层id并按字母顺序排序
    row: 0, // 图层在树上的行（0是第一行）
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: '#FFFFFF',
    requires: new Decimal(1), // 第一个货币需要的点数
    resource: "bugs", // 货币名称
    baseResource: "points", // 在重置按钮下面&下一个货币在40个的资源名称
    baseAmount() {return player.points}, // 获取基本资源的当前数量
    type: "normal", // normal: 获得货币的成本取决于本次重置获得的货币。 static: 
    exponent: 0.5, // 重置获得货币的指数
    gainMult() { 
        mult = new Decimal(1)
        if (hasUpgrade('bug',12)) {
            if (inChallenge('sb',11) || inChallenge('sb',22)) {
                mult = mult.mul(new Decimal(1.5))
            } else {
                mult = mult.mul(new Decimal(4)) }}

        if (hasUpgrade('bug',14)) {
            if (inChallenge('sb',11) || inChallenge('sb',22)) {
                mult = mult.mul((player.points.add(new Decimal(1))).pow(new Decimal(0.033)))
            } else {mult = mult.mul((player.points.add(new Decimal(1))).pow(new Decimal(0.125))) }}

        if (hasUpgrade('bug',22)) {
        if (inChallenge('sb',11) || inChallenge('sb',22)) {
            mult = mult.mul((player.bug.points.add(1)).pow(0.05))
        } else {mult = mult.mul((player.bug.points.add(new Decimal(1))).pow(new Decimal(0.1))) }}

        

            mult = mult.mul(SBE())
        
        if (hasMilestone('sb',1) && hasUpgrade('bug',25)) mult = mult.mul(2)
        
        if (hasChallenge('sb',21)) mult = mult.mul(new Decimal(1.1).pow(new Decimal(1 + player.bug.upgrades.length) * player.bug.upgrades.length / 2))
        
        if (hasUpgrade('sb',12)) mult = mult.mul((player.bug.points.pow(player.sb.points.add(1)).add('e10')).log(10).log(10).log(10).add(1).pow(2))

        mult = rs(mult,new Decimal('e160'),2);

        return mult  
    },
    gainExp() { // 根据奖励计算主货币指数
        var exp = new Decimal(1)
        if (hasUpgrade('bug',24)) {
            if (inChallenge('sb',11) || inChallenge('sb',22)) {
                exp = exp.mul(new Decimal(1.025))
            } else {exp = exp.mul(new Decimal(1.1)) }}

            if (hasUpgrade('sb',12)) exp = exp.mul((player.bug.points.pow(player.sb.points.add(1)).add('e10')).log(10).log(10).log(10).add(1))
       
            if (hasUpgrade('sb',12)) exp = exp.mul(1.25)

            return exp
    },
    passiveGeneration() {
        var gen = 0
        if (hasUpgrade('bug',15)) gen = 1.14514
        gen = gen * devSpeed
        return gen
    },
    upgrades: {
        11: {
            title: "点数获取",
            description: '点数获取*4',
            cost(){return new Decimal(10)},
            unlocked(){return true},
            onPurchase(){if(inChallenge('sb',12) || inChallenge('sb',22)){player.points = zero;player.bug.points = zero;}if(inChallenge('sb',21) || inChallenge('sb',22)) {resetLrUpgrades(11);}}
        },
        12:{
            title: "bug获取",
            description: 'bug获取*4',
            cost(){return new Decimal(40)},
            unlocked(){return hasUpgrade('bug',11) || hasMilestone('sb',0)},
            onPurchase(){if(inChallenge('sb',12) || inChallenge('sb',22)){player.points = zero;player.bug.points = zero;resetUpgrades(12);}if(inChallenge('sb',21) || inChallenge('sb',22)) {resetLrUpgrades(12);}}
        },
        13:{
            title: "点数获取2",
            description: BU13w,
            effectDisplay() {if (inChallenge('sb',11) || hasChallenge('sb',11) || inChallenge('sb',22)){
                 return '点数获取*'+format((player.bug.points.add(new Decimal(1))).pow(1.05))
            } else { return '点数获取*'+format((player.bug.points.add(new Decimal(1)))) }},
            cost(){return new Decimal(200)},
            unlocked(){return hasUpgrade('bug',12) || hasMilestone('sb',0)},
            onPurchase(){if(inChallenge('sb',12) || inChallenge('sb',22)){player.points = zero;player.bug.points = zero;resetUpgrades(13);}if(inChallenge('sb',21) || inChallenge('sb',22)) {resetLrUpgrades(13);}}
        },
        14:{
            title: "bug获取2",
            description: 'bug获取*(点数数量+1)^0.125',
            effectDisplay() {return 'bug获取*' + format(player.points.add(1).pow(0.125))},
            cost(){return new Decimal(10000)},
            unlocked(){return hasUpgrade('bug',13) || hasMilestone('sb',0)},
            onPurchase(){if(inChallenge('sb',12) || inChallenge('sb',22)){player.points = zero;player.bug.points = zero;resetUpgrades(14);}if(inChallenge('sb',21) || inChallenge('sb',22)) {resetLrUpgrades(14);}}
        },
        15:{
            title: "这么臭的升级还有买的必要吗？",
            description: '每秒获得114.514%的当前重置可获得的bugs',
            cost(){return new Decimal(1919810)},
            unlocked(){return hasUpgrade('bug',14) || hasMilestone('sb',0)},
            onPurchase(){if(inChallenge('sb',12) || inChallenge('sb',22)){player.points = zero;player.bug.points = zero;resetUpgrades(15);}if(inChallenge('sb',21) || inChallenge('sb',22)) {resetLrUpgrades(15);}}
        },
        21:{
            title: "点数获取3",
            description: BU21w,
            effectDisplay() {
                if (inChallenge('sb',11)||hasChallenge('sb',11)||inChallenge('sb',22)) {
                    return '点数获取*'+format(player.points.add(1).pow(0.15))
                } else{ return '点数获取*'+format(player.points.add(1).pow(0.1))}
            },
            cost(){return new Decimal(100000000)},
            unlocked(){return hasUpgrade('bug',15) || hasMilestone('sb',0)},
            onPurchase(){if(inChallenge('sb',12) || inChallenge('sb',22)){player.points = zero;player.bug.points = zero;resetUpgrades(21);}if(inChallenge('sb',21) || inChallenge('sb',22)) {resetLrUpgrades(21);}}
        },
        22:{
            title: "bug获取3",
            description: 'bug获取*(bug+1)^0.1',
            effectDisplay() {return 'bug获取*'+format(player.bug.points.add(1).pow(0.1))},
            cost(){return new Decimal('e10')},
            unlocked(){return hasUpgrade('bug',21) || hasMilestone('sb',0)},
            onPurchase(){if(inChallenge('sb',12) || inChallenge('sb',22)){player.points = zero;player.bug.points = zero;resetUpgrades(22);}if(inChallenge('sb',21) || inChallenge('sb',22)) {resetLrUpgrades(22);}}
        },
        23:{
            title: "点数获取4",
            description: BU23w,
            cost(){return new Decimal('e13')},
            unlocked(){return hasUpgrade('bug',22) || hasMilestone('sb',0)},
            onPurchase(){if(inChallenge('sb',12) || inChallenge('sb',22)){player.points = zero;player.bug.points = zero;resetUpgrades(23);}if(inChallenge('sb',21) || inChallenge('sb',22)) {resetLrUpgrades(23);}}
        },
        24:{
            title: "bug获取4",
            description: 'bug获取^1.1',
            cost(){return new Decimal('e20')},
            unlocked(){return hasUpgrade('bug',23) || hasMilestone('sb',0)},
            onPurchase(){if(inChallenge('sb',12) || inChallenge('sb',22)){player.points = zero;player.bug.points = zero;resetUpgrades(24);}if(inChallenge('sb',21) || inChallenge('sb',22)) {resetLrUpgrades(24);}}
        },
        25:{
            title: "解锁一个新层级",
            description: BU25w,
            cost(){return new Decimal('e30')},
            unlocked(){return hasUpgrade('bug',24) || hasMilestone('sb',0)},
            onPurchase(){if(inChallenge('sb',12) || inChallenge('sb',22)){player.points = zero;player.bug.points = zero;resetUpgrades(25);}if(inChallenge('sb',21) || inChallenge('sb',22)) {resetLrUpgrades(25);}}
        },
    },
    
    hotkeys: [//热键
        {key: "B", description: "B：重置获得bug", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},//是否显示这个层级
    //doReset() {
        //player.bug.upgrades = [21,22,23,24,25]
        //layerDataReset('bug',upgrades);
        //layerDataReset('bug',player.points);
        //layerDataReset('bug',player.bug.points);
    //},
})

addLayer("sb", {
    branches:["bug"],
    symbol: "SB", 
    position: 0, 
    row: 1, 
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: '#00FF00',
    requires: new Decimal('e30'), 
    resource: "super bugs", 
    baseResource: "bugs", 
    baseAmount() {return player.bug.points}, 
    type: "static",
    exponent: 1.8,
    effectDescription:SBES,
    canBuyMax() {return hasMilestone('sb',3)},
    gainMult() { 
        mult = new Decimal(1)

        
        return mult
    },
    gainExp() { 
        var exp = new Decimal(1)
        if (hasChallenge('sb',22)) exp = exp.mul(two)
        if (hasUpgrade('sb',12)) exp = exp.mul((player.bug.points.pow(player.sb.points.add(1)).add('e10')).log(10).log(10).log(10).add(1))
        return exp
    },
    passiveGeneration() {
        var gen = 0
        if (hasMilestone('sb',4)) gen = 1
        gen = gen * devSpeed
        return gen
    },
    milestones: {
        0: {
            requirementDescription: "1 super bug(SB),可不要想成sha bi",
            effectDescription: SBM0w,
            done() { return player.sb.points.gte(1) },
        },
        1: {
            requirementDescription: "5 SB",
            effectDescription: "BU25并不是在做无用功，它会让点数和bug获取乘以2",
            done() { return player.sb.points.gte(5) },
            unlocked(){return hasMilestone('sb',0)}
        },
        2: {
            requirementDescription: "10 SB",
            effectDescription: "太无聊了，解锁4个bug,啊不对，是SB挑战(SBC)",
            done() { return player.sb.points.gte(10) },
            unlocked(){return hasMilestone('sb',1)}
        },
        3: {
            requirementDescription: "21 SB",
            effectDescription: "解锁一些升级,并且可以购买最大SB",
            done() { return player.sb.points.gte(21) },
            unlocked(){return hasMilestone('sb',2)},
        },
        4: {
            requirementDescription: "e250 SB",
            effectDescription: "自动获得SB",
            done() { return player.sb.points.gte('e250') },
            unlocked(){return hasUpgrade('sb',15)}
        },
    },
    upgrades: {
        11:{
            title: "SB太弱了，加强一下吧",
            description: '加成P和B的公式由(SB+1)^2变成(SB+1)^(SB+1)',
            cost(){return new Decimal('21')},
            unlocked(){return hasMilestone('sb',3)},
            //onPurchase(){}
        },
        12:{
            title: "协同",
            description: "B和SB加成B和SB，B为^，SB为*，公式：(log^3(B^(SB+1)<br>+e10)+1)",
            effectDisplay() {return 'B^及SB*都是' + format((player.bug.points.pow(player.sb.points.add(1)).add('e10')).log(10).log(10).log(10).add(1))},
            cost(){return new Decimal('68')},
            unlocked(){return hasUpgrade('sb',11)},
            //onPurchase(){}
        },
        13:{
            title: "朴实无华的升级",
            description: "点数获取^2.5",
            cost(){return new Decimal('399')},
            unlocked(){return hasUpgrade('sb',12)},
            //onPurchase(){}
        },
        14:{
            title: "ee7的神秘软上限",
            description: "bug获取^1.25",
            cost(){return new Decimal('1740')},
            unlocked(){return hasUpgrade('sb',13)},
            //onPurchase(){}
        },
        15:{
            title: "拥抱膨胀",
            description: "点数获取^log^2(bugs)^0.5",
            effectDisplay() {return "点数获取^"+format(player.bug.points.add(10).log(10).log(10).add(1).pow(0.5))},
            cost(){return new Decimal('34713')},
            unlocked(){return hasUpgrade('sb',14)},
            //onPurchase(){}
        },
    },
    challenges: {
        11:{
            name:"不平衡的升级",
            challengeDescription:"升级描述与实际效果不符(有一些升级被增强了，有些被削弱了)",
            goalDescription:"1e30bugs",
            rewardDescription:"被增强的升级在挑战外被保留",
            canComplete(){return player.bug.points.gte(new Decimal('e30'))},
            unlocked(){return hasMilestone('sb',2)},
            onEnter(){player.points = zero; player.bug.points = zero; player.bug.upgrades = []},
        },
        12:{
            name:"指upgrades为layers",
            challengeDescription:"升级像层级一样重置它之前的所有的升级、点数和bug",
            goalDescription:"购买前十个BU",
            rewardDescription:"SB层级不再重置任何东西(除了进入挑战)",
            canComplete(){return hasUpgrade('bug',25) && hasUpgrade('bug',24) && hasUpgrade('bug',23) && hasUpgrade('bug',22) && hasUpgrade('bug',21) && hasUpgrade('bug',15) && hasUpgrade('bug',14) && hasUpgrade('bug',13) && hasUpgrade('bug',12) && hasUpgrade('bug',11)},
            unlocked(){return hasChallenge('sb',11)},
            onEnter(){player.points = zero; player.bug.points = zero; player.bug.upgrades = []}
        },
        21:{
            name:"丢人的升级",
            challengeDescription:"每个升级都想起来了它曾经做了些丢人(丢升级)的事，所以如果有一个新的升级出现在旧升级的左边或右边，旧升级就会因为怕新升级嘲笑它而在地上找一个缝钻进去",
            goalDescription:"e56 bugs",
            rewardDescription:"升级们不会再嘲笑丢人升级了，因此丢人的升级不会找地缝钻进去了，而且升级们变得更加团结了，购买第n个升级会让bug获取*1.1^n",
            canComplete(){return player.bug.points.gte(new Decimal('e56'))},
            unlocked(){return hasChallenge('sb',12)},
            onEnter(){player.points = zero; player.bug.points = zero; player.bug.upgrades = []}
        },
        22:{
            name:"大杂烩",
            challengeDescription:"SBC11+SBC12+SBC21",
            goalDescription:"e20 bugs",
            rewardDescription:"SB获得*2，效果^2",
            canComplete(){return player.bug.points.gte(new Decimal('e20'))},
            unlocked(){return hasChallenge('sb',21)},
            onEnter(){player.points = zero; player.bug.points = zero; player.bug.upgrades = []}
        },
    },


    hotkeys: [
        {key: "s", description: "s：重置获得super bugs", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return ssb()},
    resetsNothing() {return hasChallenge('sb',12)},
    onEnter(){return false},
})

addLayer("ach",{
    symbol:'A',
    position: 0,
    row: "side",
    startData() { return {
        unlocked: true,
    }},
    color:'#FFFF00',
    resource: "成就点",
    achievements: {
        11: {
            name:"nice",
            tooltip:"获得6969bugs",
            done() {return player.bug.points.gte(new Decimal(6969))},
            //effect() { player.ach.points = player.ach.points.add(new Decimal(1))},
        },
        12: {
            name:"臭升级",
            tooltip:"购买BU15",
            done() {return hasUpgrade('bug',15)},
            //effect() {player.ach.points.add(new Decimal(1))},
        },
        13: {
            name:"文明layer",
            tooltip:"获得1SB",
            done() {return player.sb.points.gte(new Decimal(1))},
            //effect() {player.ach.points.add(new Decimal(1))},
        },
        14: {
            name:"梗已经被时代淘汰了",
            tooltip:"在不购买BU15的条件下达到e30bugs",
            done() {return !hasUpgrade('bug',15) && player.bug.points.gte(new Decimal('e30'))},
            //effect() {player.ach.points.add(new Decimal(1))},
        },
        15: {
            name:"慢",
            tooltip:"完成SB挑战11",
            done() {return hasChallenge('sb',11)},
            //effect() {player.ach.points.add(new Decimal(1))},
        },
        16: {
            name:"水货“层级”",
            tooltip:"完成SB挑战12",
            done() {return hasChallenge('sb',12)},
            //effect() {player.ach.points.add(new Decimal(1))},
        },
        21: {
            name:"废话一大堆",
            tooltip:"完成SB挑战21",
            done() {return hasChallenge('sb',21)},
            //effect() {player.ach.points.add(new Decimal(1))},
        },
        22: {
            name:"难",
            tooltip:"完成SB挑战22",
            done() {return hasChallenge('sb',22)},
            //effect() {player.ach.points.add(new Decimal(1))},
        },
        23: {
            name:"拥抱膨胀",
            tooltip:"购买SBU15",
            done() {return hasUpgrade('sb',15)},
            //effect() {player.ach.points.add(new Decimal(1))},
        },
    },
    layerShown(){return true}
})

addLayer("i", {
    branches:["sb"],
    symbol: "I", 
    position: 0, 
    row: 2, 
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: '#00FFFF',
    requires: new Decimal('e1000'),
    resource: "膨胀", 
    baseResource: "sb", 
    baseAmount() {return player.sb.points}, 
    type: "normal",
    exponent: 1 / 2 ** 1024,
    effectDescription: IEW,
    layerShown(){return player.sb.points.gte(new Decimal('e500')) || player.i.points.gte(1)},
})
