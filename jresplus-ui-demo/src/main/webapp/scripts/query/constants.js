/**
 * 静态数据对象
 */
var constants = {
	// 授权是否过期标识
	isExpire : "",
	/**
	 * 用于资金类流程
	 */
	o32_process : {

		"22037" : "srgqsyq",// 受让股权收益权
		"22038" : "crgqsyq",// 出让股权收益权
		"22039" : "gqsyqsy",// 股权收益权收益
		"22040" : "gqsyqhg",// 股权收益权回购
		"22382": "xyzmrfk",
		"22383":"qjzr",
		"22384": "dqdf",
        "22033" : "gqtz",
		"22035" : "gqtzsy",
		"22036" : "gqfhsg",
		"22101" : "gqhg",
		"22034" : "gqcr",
		"22410" : "jctz",
		"22411" : "jctzsy",
		"22409" : "jchg",
		"22412" : "jccr",
		"22151" : "zdzf",
		"22078" : "wqtz",
		"22079" : "wqtzsy",
		"22080" : "wqhg",
		"22069" : "zqtz",
		"22071" : "zqtzsy",
		"22072" : "zqhg",
		"22070" : "zqcr",
		"22029" : "ck",
		"22031" : "cksy",
		"22030" : "ckhg",
		"22032" : "ckcr",
		"22150" : "zczr",
		"22052" : "zczc",
		"22045" : "srqtsyq",// 受让其他收益权   
		"22047" : "qtsyqsy",// 其他收益权收益
		"22048" : "qtsyqhg",// 其他收益权回购
		"22046" : "crqtsyq",// 出让其他收益权
		"22065" : "wtdkff",//委托贷款发放
		"22067" : "wtdksx",//委托贷款收息
		"22066" : "wtdkfb",//委托贷款返本
		"22025" : "srxdzc",//受让信贷资产
		"22026" : "xdzcfb",//信贷资产返本
		"22027" : "xdzcsx",//信贷资产收息
		"22028" : "crxdzc",//出让信贷资产
		"22041" : "pjmr",//票据买入
		"22042" : "pjtx",//票据贴现
		"22043" : "pjsx",//票据收息
		"22044" : "pjhg",//票据回购
		"22103" : "pjcr",//票据出让
	},
	/**
	 * 根据业务类型找到对应的业务标识
	 */
	type2BusFlg : {
		"srgqsyq" : "22037",// 受让股权收益权
		"crgqsyq" : "22038",// 出让股权收益权
		"gqsyqsy" : "22039",// 股权收益权收益
		"gqsyqhg" : "22040",// 股权收益权回购
		
		"xyzmrfk":"22382",
		"qjzr":"22383",
		"dqdf":"22384",
		
		"srqtsyq":"22045",// 受让其他收益权   
		"qtsyqsy":"22047",// 其他收益权收益
		"qtsyqhg":"22048",// 其他收益权回购
		"crqtsyq":"22046",// 出让其他收益权

		"gqtz" : "22033",
		"gqtzsy" : "22035",
		"gqfhsg" : "22036",
		"gqhg" : "22101",
		"gqcr" : "22034",
		"jctz" : "22410",
		"jctzsy" : "22411",
		"jchg" : "22409",
		"jccr" : "22412",
		"wqtz" : "22078",
		"wqtzsy" : "22079",
		"wqhg" : "22080",
		"zqtz" : "22069",
		"zqtzsy" : "22071",
		"zqhg" : "22072",
		"zqcr" : "22070",
		"ck" : "22029",
		"cksy" : "22031",
		"ckhg" : "22030",
		"ckcr" : "22032",
		"zdzf" : "22151",
		"zczr" : "22150",
		"zczc" : "22052",
		"investproduct" : "22403",
		"investproduct" : "22404",
		"zltz" : "22310",// 指令调整、作废
		"zlzf" : "22311",
		"wtdkff" : "22065",//委托贷款发放
		"wtdksx" : "22067",//委托贷款收息
		"wtdkfb" : "22066",//委托贷款返本
		"srxdzc" : "22025",//受让信贷资产
		"xdzcfb" : "22026",//信贷资产返本
		"xdzcsx" : "22027",//信贷资产收息
		"crxdzc" : "22028",//出让信贷资产
		"pjmr" : "22041",//票据买入
		"pjtx" : "22042",//票据贴现
		"pjsx" : "22043",//票据收息
		"pjhg" : "22044",//票据回购
		"pjcr" : "22103",//票据出让
	},
	businflag_fun : {
		"22413" : "project",
		"22414" : "project",
		"22415" : "project",
		"22416" : "projectjl",
		"22243" : "bankaccount",
		"22244" : "bankaccount",
		"22245" : "bankaccount",
		"22389" : "product",
		"22390" : "product",
		"22391" : "product",
		"22401" : "productcl",
		"22391" : "productbcl",
		"22340" : "productdq",
		"22402" : "productjl",
		"22236" : "loanrival",
		"22237" : "loanrival",
		"22238" : "loanrival",
		"22392" : "holder",
		"22393" : "holder",
		"22394" : "holder",
		"22395" : "officers",
		"22396" : "officers",
		"22397" : "officers",
		"22398" : "family",
		"22399" : "family",
		"22400" : "family",
		"22403" : "investproduct",
		"22404" : "investproduct",
		"22405" : "investproduct",
		"22406" : "penetrateproduct",
		"22407" : "penetrateproduct",
		"22408" : "penetrateproduct",
		"22246" : "rivalbankaccount",
		"22247" : "rivalbankaccount",
		"22248" : "rivalbankaccount",
		"22368" : "rivalbankaccount",
		"22033" : "gqtz",
		"22035" : "gqtzsy",
		"22036" : "gqfhsg",
		"22101" : "gqhg",
		"22034" : "gqcr",
		"22410" : "jctz",
		"22411" : "jctzsy",
		"22409" : "jchg",
		"22412" : "jccr",
		"22078" : "wqtz",
		"22079" : "wqtzsy",
		"22080" : "wqhg",
		"22069" : "zqtz",
		"22071" : "zqtzsy",
		"22072" : "zqhg",
		"22070" : "zqcr",
		"22029" : "ck",
		"22031" : "cksy",
		"22030" : "ckhg",
		"22032" : "ckcr",
		"22151" : "zdzf",
		"22150" : "zczr",
		"22052" : "zczc",
		"22216" : "contract",
		"22204" : "contract",
		"22325" : "contract",// 合同信息删除
		"22229" : "contract",// 合同撤销
		"22227" : "contract_htjq",// 合同结清
		"22202" : "contract_htzq",// 合同展期
		"22201" : "contract_wjfl",// 五级分类
		"22214" : "contract_zchx",// 不良资产核销

		"22213" : "collateral",// 抵质押入库
		"22388" : "collateral",// 担保品录入
		"22219" : "collateral",// 资产作废
		"22206" : "collateral",// 资产信息调整
		"22228" : "collateral_jdgh",// 借调归还
		"22211" : "collateral_pgjgtz",// 评估价格调整
		"22209" : "collateral_fhsg",// 分红送股
		"22215":"collateral_jdck",//借调出库
		"22212" : "collateral_jyck",// 解押出库:与借调出库同一窗口
		"22205" : "rate",// 利率变更
		"22359" : "fareRate",// 费率变更
		"22226" : "adjust",// 结息日调整
		"22231" : "repayplan", // 还款计划
		
		"22417" : "contract_xmbd",// 项目绑定

		"22037" : "srgqsyq",// 受让股权收益权
		"22038" : "crgqsyq",// 出让股权收益权
		"22039" : "gqsyqsy",// 股权收益权收益
		"22040" : "gqsyqhg",// 股权收益权回购
		
		"22382": "xyzmrfk",// 买入付款
		"22383":"qjzr",// 期间转让
		"22384": "dqdf",//到期兑付

		"22065" : "wtdkff",//委托贷款发放
		"22067" : "wtdksx",//委托贷款收息
		"22066" : "wtdkfb",//委托贷款返本
		"22025" : "srxdzc",//受让信贷资产
		"22026" : "xdzcfb",//信贷资产返本
		"22027" : "xdzcsx",//信贷资产收息
		"22028" : "crxdzc",//出让信贷资产
		"22041" : "pjmr",//票据买入
		"22042" : "pjtx",//票据贴现
		"22043" : "pjsx",//票据收息
		"22044" : "pjhg",//票据回购
		"22103" : "pjcr",//票据出让
		
		"22045" : "srqtsyq",// 受让其他收益权   
		"22047" : "qtsyqsy",// 其他收益权收益
		"22048" : "qtsyqhg",// 其他收益权回购
		"22046" : "crqtsyq"// 出让其他收益权	
	},
	/**
	 * 是否出现iframe滚动条集合,用于资金类流程
	 */
	auto_fun : {
		"22037" : "srgqsyq",// 受让股权收益权   
		"22038" : "crgqsyq",// 出让股权收益权
		"22039" : "gqsyqsy",// 股权收益权收益
		"22040" : "gqsyqhg",// 股权收益权回购
		
		"22382": "xyzmrfk",// 买入付款
		"22383":"qjzr",// 期间转让
		"22384": "dqdf",//到期兑付
		
		"22033" : "gqtz",
		"22035" : "gqtzsy",
		"22036" : "gqfhsg",
		"22101" : "gqhg",
		"22034" : "gqcr",
		"22389" : "product",
		"22390" : "product",
		"22410" : "jctz",
		"22411" : "jctzsy",
		"22409" : "jchg",
		"22078" : "wqtz",
		"22079" : "wqtzsy",
		"22080" : "wqhg",
		"22069" : "zqtz",
		"22071" : "zqtzsy",
		"22072" : "zqhg",
		"22070" : "zqcr",
		"22029" : "ck",
		"22031" : "cksy",
		"22030" : "ckhg",
		"22032" : "ckcr",
		"22412" : "jccr",
		"22151" : "zdzf",
		"22150" : "zczr",
		"22052" : "zczc",
		"22214" : "contract_zchx",// 不良资产核销
			
		"22065" : "wtdkff",//委托贷款发放
		"22067" : "wtdksx",//委托贷款收息
		"22066" : "wtdkfb",//委托贷款返本
		"22025" : "srxdzc",//受让信贷资产
		"22026" : "xdzcfb",//信贷资产返本
		"22027" : "xdzcsx",//信贷资产收息
		"22028" : "crxdzc",//出让信贷资产
		"22041" : "pjmr",//票据买入
		"22042" : "pjtx",//票据贴现
		"22043" : "pjsx",//票据收息
		"22044" : "pjhg",//票据回购
		"22103" : "pjcr",//票据出让
		
		"22045" : "srqtsyq",// 受让其他收益权   
		"22047" : "qtsyqsy",// 其他收益权收益
		"22048" : "qtsyqhg",// 其他收益权回购
		"22046" : "crqtsyq"// 出让其他收益权
	},
	/**
	 * 根据业务标识找到对应的业务类型(用于复核界面附件查询判断)
	 */
	formObj :{
		"22033" : "gqtz",
		"22035" : "gqtzsy",
		"22036" : "gqfhsg",
		"22101" : "gqhg",
		"22034" : "gqcr",
		"22215" : "jdck",
		"22212" : "jdck",
		"22226" : "adjust",
		"22205" : "rate",
		"22359" : "fareRate",
		"22410" : "jctz",
		"22411" : "jctzsy",
		"22409" : "jchg",
		"22412" : "jccr",
		"22078" : "wqtz",
		"22079" : "wqtzsy",
		"22080" : "wqhg",
		"22151" : "zdzf",
		"22069":"zqtz", 
		"22071":"zqtzsy", 
		"22072":"zqhg",
		"22070":"zqcr",
		"22201":"wjfl",
		"22202":"htzq",
		"22214":"zchx",
		"22227":"htjq",
		"22029" : "ck",
		"22031" : "cksy",
		"22030" : "ckhg",
		"22032" : "ckcr",
		"22150":"zczr",
		"22052":"zczc",
		"22037" : "srgqsyq",// 受让股权收益权
		"22038" : "crgqsyq",// 出让股权收益权
		"22039" : "gqsyqsy",// 股权收益权收益
		"22040" : "gqsyqhg",// 股权收益权回购
		"22382": "xyzmrfk",
		"22383":"qjzr",
		"22384": "dqdf",
		"22045" : "srqtsyq",// 受让其他收益权   
		"22047" : "qtsyqsy",// 其他收益权收益
		"22048" : "qtsyqhg",// 其他收益权回购
		"22046" : "crqtsyq",// 出让其他收益权
		"22065" : "wtdkff",//委托贷款发放
		"22067" : "wtdksx",//委托贷款收息
		"22066" : "wtdkfb",//委托贷款返本
		"22025" : "srxdzc",//受让信贷资产
		"22026" : "xdzcfb",//信贷资产返本
		"22027" : "xdzcsx",//信贷资产收息
		"22028" : "crxdzc",//出让信贷资产
		"22041" : "pjmr",//票据买入
		"22042" : "pjtx",//票据贴现
		"22043" : "pjsx",//票据收息
		"22044" : "pjhg",//票据回购
		"22103" : "pjcr",//票据出让
	},
	// 业务管理界面：以下业务标识界面不自动生成
	undoauto_fun : {
		"22205" : "rate",// 利率变更
		"22359" : "fareRate",// 费率变更
		"22226" : "adjust",// 结息日调整
		"22215" : "jdck",// 借调出库
		"22212" : "jdck",// 解押出库:与借调出库同一窗口
		"22231" : "repayplan" // 还款计划
	},
	// 为title 的type装换
	bussinessMap : {
		"zlck" : "—指令查看",
		"fhdb" : "—复核待办",
		"fhtg" : "—复核通过",
		"fhbtg" : "—复核不通过",
		"spdb" : "—审批待办",
		"sptg" : "—审批通过",
		"spbtg" : "—审批不通过",
		"zxtg" : "—指令执行",
		"zxbtg" : "—指令驳回",
		"zlxg" : "—指令修改",
		"zlcx" : "—指令撤销",
		"zltz" : "—指令调整",
		"zlzf" : "—指令作废",
		"fqqr" : "—划款确认",
		"zlqr" : '—指令确认'
	},
	// 资金类对象标识
	funds : {
		SRGQSYQ : "srgqsyq",// 受让股权收益权   
		CRGQSYQ : "crgqsyq",// 出让股权收益权
		GQSYQSY : "gqsyqsy",// 股权收益权收益
		GQSYQHG : "gqsyqhg",// 股权收益权回购
		

		XYZMRFK: "xyzmrfk",// 买入付款
		QJZR:"qjzr",// 期间转让
		DQDF: "dqdf",//到期兑付
		
		GQTZ : "gqtz",
		GQTZSY : "gqtzsy",
		GQFHSG : "gqfhsg",
		GQHG : "gqhg",
		GQCR : "gqcr",
		JCTZ : "jctz",
		JCTZSY : "jctzsy",
		JCHG : "jchg",
		JCCR : "jccr",
		WQTZ : "wqtz",
		WQTZSY : "wqtzsy",
		WQHG : "wqhg",
		ZQTZ : "zqtz",
		ZQTZSY : "zqtzsy",
		ZQHG : "zqhg",
		ZQCR : "zqcr",
		CK : "ck",
		CKSY : "cksy",
		CKHG : "ckhg",
		CKCR : "ckcr",
		ZCZR : "zczr",
		ZCZC : "zczc",
		WTDKFF : "wtdkff",//委托贷款发放
		WTDKSX : "wtdksx",//委托贷款收息
		WTDKFB : "wtdkfb",//委托贷款返本
		SRXDZC : "srxdzc",//受让信贷资产
		XDZCFB : "xdzcfb",//信贷资产返本
		XDZCSX : "xdzcsx",//信贷资产收息
		CRXDZC : "crxdzc",//出让信贷资产
		PJMR : "pjmr",//票据买入
		PJTX : "pjtx",//票据贴现
		PJSX : "pjsx",//票据收息
		PJHG : "pjhg",//票据回购
		PJCR : "pjcr",//票据出让
		SRQTSYQ : "srqtsyq",// 受让其他收益权   
		QTSYQSY : "qtsyqsy",// 其他收益权收益
		QTSYQHG : "qtsyqhg",// 其他收益权回购
		CRQTSYQ : "crqtsyq",// 出让其他收益权
		invest : {// 投资放款类
			"gqtz" : "22033",
			"jctz" : "22410",
			"wqtz" : "22078",
			"zqtz" : "22069",
			"ck" : "22029",
			"zczr" : "22150",
			"wtdkff" : "22065",
		    "xyzmrfk":"22382",
            "pjmr" : "22041",
			"srxdzc" : "22025",
			"srgqsyq":"22037",
			"srqtsyq":"22045"
		}
	},
	// 收益类型
	cProfitKind : {
		"sy" : "P",// 收益
		"dk" : "O"// 抵扣
	},
	//收益类型对象
	profitType : {
		SY : "sy",// 收益
		DK : "dk"// 抵扣
	},
	// 抵扣
	mxArr1 : [ '1101', '1102', '1103', '1111', '1112', '1113', '1114', '1115',
			'1116', '1117', '1118', '1119', '1120', '1131', '1102' ],
	mxArr2 : [ '100', '101', '102', '103', '104', '105', '106', '107', '108',
			'109', '110', '111', '130', '131', '132', '133', '134', '136',
			'137', '138', '140', '141', '142', '150', '151', '153', '154',
			'156', '157', '159', '160', '162', '163', '165', '166', '167',
			'168', '170', '171', '172', '174', '175', '177', '178', '179',
			'182', '183', '185', '186', '187', '189', '190', '192', '193',
			'195', '196', '198', '199', '1201', '1202', '1203', '1204', '1205',
			'1206' ],
	/**
	 * 操作类型-调用o32的确认接口: '1' 表示执行确认,'2' 表示指令撤销，'3' 表示指令调整(作废)
	 */
	operType : {
		"qr" : "1",
		"cx" : "2",
		"tzzf" : "3"
	},
	/**
	 * 转发节点：调用o32的确认接口
	 */
	tranferNode : {
		"4" : "fhtg",// 转发节点：已复核-复核通过
		"7" : "sptg"// 审批通过:转发节点-已审批
	},
	/**
	 * 利率和费率状态字典常量
	 */
	c_rate_status : {
		"0" : "待确认",// 新增
		"1" : "正常",
		"2" : "待确认",// 修改
		"3" : "作废"// 删除
	},
	/**
	 * O32配置开关
	 */
	o32Switch : {
		ON : "1"
	},
	// 字符串常量
	strConstan : {
		YES : "1",
		NO : "0"
	},
	/**
	 * ajax请求返回结果
	 */
	ajaxCallBackCode : {
		OK : "ok",
		ERROR : "error"
	},
	/**
	 * ajax请求方式
	 */
	ajaxRequestType : {
		POST : "post",
		GET : "get"
	},
	/**
	 * ajax请求类型
	 */
	ajaxDataType : {
		TEXT : "text",
		JSON : "json"
	},
	buttonIds : {
		zlxg : "zlxg",
		zltz : "zltz"
	},
	l_action_in : {
		add : "1",// 新增
		edit : "2",// 修改
		set : "2",// 修改
		del : "3"// 删除
	},// 菜单id
	menu_id : {
		"0" : "51",
		"1" : {
			"5" : "41",
			"F" : "42"
		}
	},
	messageUrl : {// 业务提醒
		"5" : "/am/am/business/stockcodesex/list.htm?vc_stock_code=",//
		"F" : "/am/am/business/financialinvest/list.htm?vc_stock_code"//
	},
	c_warn_inteval : 30000,// 默认的消息提醒间隔
	stockcode : {// 投资明细
		menu_id : {// 菜单
			"I" : "404015",
			"5" : "402015",
			"D" : "405015",
			"4" : "406015",
			"F" : "403015",
			"6" : "407015",
			"H" : "409015",
			"7" : "408015",
			"C" : "410015",
			"2" : "411015",
			"3" : "412015"
		},
		ft_menu_id : {// 费率设置菜单
			"I" : "402017",
			"5" : "403017",
			"D" : "404017",
			"4" : "405017",
			"F" : "406017",
			"6" : "408017",
			"H" : "407017",
			"7" : "409017",
			"C" : "410015",
			"2" : "411015",
			"3" : "412015"
		},
		preTitle : {
            "I" : "物权投资",
			"5" : "股权投资",
			"D" : "债权投资",
			"4" : "存款",
			"F" : "金融产品",
			"6":"股权收益权",
			"H":"信用证/福费廷",
            "C":"委托贷款",
			"2":"信贷资产",
			"7":"其他收益权",
			"3":"票据资产"
		},
		seller_url : {
			"I" : "/am/am/sellerbusiness/interest/view.htm",
			"5" : "/am/am/sellerbusiness/stockcodesex/view.htm",
			"D" : "/am/am/sellerbusiness/credit/view.htm",
			"4" : "/am/am/sellerbusiness/deposit/view.htm",
			"F" : "/am/am/sellerbusiness/financialinvest/view.htm",
			"6"	:	"/am/am/sellerbusiness/stockrevenue/view.htm",
			"H"	:	"/am/am/sellerbusiness/letterofcredit/view.htm",
			"7"	:"/am/am/sellerbusiness/otherProfileRight/view.htm",
			"C":"/am/am/sellerbusiness/entrustedloan/view.htm",
			"2":"/am/am/sellerbusiness/creditasset/view.htm",
			"3":"/am/am/sellerbusiness/noteasset/view.htm"
		},
		url : {
			"I" : "/am/am/business/interest/view.htm",
			"5" : "/am/am/business/stockcodesex/view.htm",
			"D" : "/am/am/business/credit/view.htm",
			"4" : "/am/am/business/deposit/view.htm",
			"F" : "/am/am/business/financialinvest/view.htm"
		}
	},
	/**
	 * 还款方式对象：根据业务类型得到对应的还款方式
	 */
	c_repay_type : {
		"gqtz" : "A",
		"gqtzsy" : "0",
		"gqfhsg" : "0",
		"jctz" : "A",
		"jctzsy" : "0",
		"wqtz" : "A",
		"wqtzsy" : "0",
		"zqtz" : "A",
		"zqtzsy" : "0",
		"ck" : "A",
		"cksy" : "0",
		
		"srgqsyq" : "A",
		"gqsyqsy" : "0",
//			"crgqsyq" : "0",
//			"gqsyqhg" : "0",
					
		"xyzmrfk" : "A",
		"srqtsyq":"A",   
		"qtsyqsy":"0",
		"wtdkff" : "A",
		"wtdksx" : "0",
		"srxdzc" : "A",
		"xdzcsx" : "0",
		"pjmr" : "A",
		"pjsx" : "0",
		
		"qjzr":"3",
		"dqdf":"3",
		"pjtx":"3",
		"pjhg":"3",
		"pjcr":"3"
	},
	c_deliver_status : {// 交收状态与是否取消冻结映射关系,5:指令已风控，不需要解冻；6:指令已申请：需要解决
		"5" : "0",
		"6" : "1",
		RISK : "5",
		APPLY : "6",
		DELIVING : "7"// 交收中
	},
	// 自动生成时，字段的后缀1-新增，2-修改，3-查看
	suffix : {
		"1" : "",
		"2" : "_edit",
		"3" : "_look",
		"4" : "_4",
		"5" : "_5",
		"6" : "_6"
	}

};


/*******************************************************************************
 * 业务标识、操作按钮映射关系对象,key:业务标识/按钮ID，value:按钮名称,buttonType:1发起、6执行
 * 买方、卖方：共用一套按钮配置
 */
var buttonsObj = {
	"workgroup" : {// 资金账户管理
		"3141" : {
			"buttonName" : "ctbutton1" // 资金账户修改
		}
	},
	"zl" : {// 指令
		"22310" : {
			"buttonName" : "zltz",// 调整
			"buttonType" : "1"
		},
		"22311" : {
			"buttonName" : "zlzf",// 作废
			"buttonType" : "1"
		}
	},
	"loanrival" : {// 对手方
		"22236" : {
			"buttonName" : "ctbutton1",// 新增,
			"buttonType" : "1"
		},
		"22237" : {
			"buttonName" : "ctbutton2",// 修改,
			"buttonType" : "1"
		},
		"22238" : {
			"buttonName" : "ctbutton3",// 删除,
			"buttonType" : "1"
		}
	},
	"holder" : {// 对手方股东
		"22392" : {
			"buttonName" : "holder1",// 新增,
			"buttonType" : "1"
		},
		"22393" : {
			"buttonName" : "holder2",// 修改,
			"buttonType" : "1"
		},
		"22394" : {
			"buttonName" : "holder3",// 删除,
			"buttonType" : "1"
		}
	},
	"officers" : {// 对手方高管
		"22395" : {
			"buttonName" : "officers1",// 新增,
			"buttonType" : "1"
		},
		"22396" : {
			"buttonName" : "officers2",// 修改,
			"buttonType" : "1"
		},
		"22397" : {
			"buttonName" : "officers3",// 删除,
			"buttonType" : "1"
		}
	},
	"family" : {// 对手方家族成员
		"22398" : {
			"buttonName" : "family1",// 新增,
			"buttonType" : "1"
		},
		"22399" : {
			"buttonName" : "family2",// 修改,
			"buttonType" : "1"
		},
		"22400" : {
			"buttonName" : "family3",// 删除,
			"buttonType" : "1"
		}
	},
	"investproduct" : {// 金融产品
		"22403" : {
			"buttonName" : "invest1",// 新增,
			"buttonType" : "1"
		},
		"22404" : {
			"buttonName" : "invest2",// 修改,
			"buttonType" : "1"
		},
		"22405" : {
			"buttonName" : "invest3",// 删除,
			"buttonType" : "1"
		}
	},
	"ctproduct" : {// 穿透资产
		"22406" : {
			"buttonName" : "ct1",// 新增,
			"buttonType" : "1"
		},
		"22407" : {
			"buttonName" : "ct2",// 修改,
			"buttonType" : "1"
		},
		"22408" : {
			"buttonName" : "ct3",// 删除,
			"buttonType" : "1"
		}
	},
	"rivalbankaccount" : {// 对手方账户
		"22246" : {
			"buttonName" : "ctbutton1",// 新增,
			"buttonType" : "1"
		},
		"22247" : {
			"buttonName" : "ctbutton2",// 修改,
			"buttonType" : "1"
		},
		"22248" : {
			"buttonName" : "ctbutton3",// 删除,
			"buttonType" : "1"
		}
	},
	"product" : {// 产品
		"22389" : {
			"buttonName" : "ctbutton1",// 新增,
			"buttonType" : "1"
		},
		"22390" : {
			"buttonName" : "ctbutton2",// 修改,
			"buttonType" : "1"
		}
// ,
// "22402" : {
// "buttonName" : "ctbutton3",// 管理人员任命,
// "buttonType" : "1"
// },
// "22401" : {
// "buttonName" : "ctbutton4",// 产品成立,
// "buttonType" : "1"
// },
// "22391" : {
// "buttonName" : "ctbutton5",// 产品不成立,
// "buttonType" : "1"
// },
// "22340" : {
// "buttonName" : "ctbutton6",// 到期处理,
// "buttonType" : "1"
// }
	},
	"project" : {// 项目
		"22413" : {
			"buttonName" : "ctbutton1",// 新增,
			"buttonType" : "1"
		},
		"22414" : {
			"buttonName" : "ctbutton2",// 修改,
			"buttonType" : "1"
		},
		"22415" : {
			"buttonName" : "ctbutton3",// 删除,
			"buttonType" : "1"
		},
		"22416" : {
			"buttonName" : "ctbutton4",// 管理人员任命,
			"buttonType" : "1"
		}
	},
	"yhzh" : {// 银行账户
		"22243" : {
			"buttonName" : "ctbutton1",// 新增,
			"buttonType" : "1"
		},
		"22244" : {
			"buttonName" : "ctbutton2",// 修改,
			"buttonType" : "1"
		},
		"22245" : {
			"buttonName" : "ctbutton3",// 删除,
			"buttonType" : "1"
		}
	},
	"wqyw" : {// 物权业务管理
		"22078" : {
			"buttonId" : "wqtz",
			"buttonName" : "物权投资",// 物权投资
			"buttonType" : "1",
			"sortId" : 1
		},
		"22150" : {
			"buttonId" : "zczr",
			"buttonName" : "资产转入",//资产转入
			"buttonType" : "1",
			"sortId" : 1
		},
		"22079" : {
			"buttonId" : "wqtzsy",
			"buttonName" : "物权投资收益",// 物权投资收益
			"buttonType" : "1",
			"sortId" : 2
		},
		"22080" : {
			"buttonId" : "wqhg",
			"buttonName" : "物权出让",// 物权产品到期
			"buttonType" : "1",
			"sortId" : 3
		},
		"22151" : {
			"buttonId" : "zdzf",
			"buttonName" : "费用支付",// 费用支付
			"buttonType" : "1",
			"sortId" : 4
		}
	},
	"jryw" : {// 金融产品业务管理
		"22410" : {
			"buttonId" : "jctz",
			"buttonName" : "金融产品投资",// 金融产品投资
			"buttonType" : "1",
			"sortId" : 1
		},
		"22150" : {
			"buttonId" : "zczr",
			"buttonName" : "资产转入",//资产转入
			"buttonType" : "1",
			"sortId" : 1
		},
		"22411" : {
			"buttonId" : "jctzsy",
			"buttonName" : "金融产品投资收益",// 金融产品投资收益
			"buttonType" : "1",
			"sortId" : 2
		},
		"22409" : {
			"buttonId" : "jchg",
			"buttonName" : "金融产品到期",// 金融产品到期
			"buttonType" : "1",
			"sortId" : 3
		},
		"22412" : {
			"buttonId" : "jccr",
			"buttonName" : "金融产品转出",// 金融产品转出
			"buttonType" : "1",
			"sortId" : 4
		},
		"22151" : {
			"buttonId" : "zdzf",
			"buttonName" : "费用支付",// 费用支付
			"buttonType" : "1",
			"sortId" : 5
		}
	},
	"ht" : {// 合同类
		"22216" : {
			"buttonName" : "ctbutton1",// 合同新增,
			"buttonType" : "1"
		},
		"22204" : {
			"buttonName" : "ctbutton2",// 合同变更,
			"buttonType" : "1"
		},
		"22227" : {
			"buttonName" : "ctbutton4",// 合同结清,
			"buttonType" : "1"
		},
		"22229" : {
			"buttonName" : "ctbutton3",// 合同撤销,
			"buttonType" : "1"
		},
		"22205" : {
			"buttonName" : "ctbutton5",// 利率变更,
			"buttonType" : "1"
		},
		"22202" : {
			"buttonName" : "ctbutton6",// 合同展期,
			"buttonType" : "1"
		},
		"22201" : {
			"buttonName" : "ctbutton7",// 五级分类,
			"buttonType" : "1"
		},
		"22214" : {
			"buttonName" : "ctbutton8",// 不良资产核销,
			"buttonType" : "1"
		},
		"22226" : {
			"buttonName" : "ctbutton9",// 结息日调整,
			"buttonType" : "1"
		},
		"22231" : {
			"buttonName" : "ctbutton10",// 还款计划,
			"buttonType" : "1"
		},
		"22359" : {
			"buttonName" : "ctbutton11",// 费率变更
			"buttonType" : "1"
		},
		"22417" : {
			"buttonName" : "ctbutton12",// 项目归属变更
			"buttonType" : "1"
		}
		
	},
	"htywgl" : {// 股权投资业务管理
		"22033" : {
			"buttonId" : "gqtz",
			"buttonName" : "股权投资",// 股权投资
			"buttonType" : "1",
			"sortId" : 1
		},
		"22150" : {
			"buttonId" : "zczr",
			"buttonName" : "资产转入",//资产转入
			"buttonType" : "1",
			"sortId" : 1
		},
		"22035" : {
			"buttonId" : "gqtzsy",
			"buttonName" : "股权投资收益",// 股权投资收益
			"buttonType" : "1",
			"sortId" : 2
		},
		"22036" : {
			"buttonId" : "gqfhsg",
			"buttonName" : "股权分红送股",// 股权分红送股
			"buttonType" : "1",
			"sortId" : 3
		},
		"22101" : {
			"buttonId" : "gqhg",
			"buttonName" : "股权回购",// 股权回购
			"buttonType" : "1",
			"sortId" : 4
		},
		"22034" : {
			"buttonId" : "gqcr",
			"buttonName" : "股权出让",// 股权出让
			"buttonType" : "1",
			"sortId" : 5
		},
		"22151" : {
			"buttonId" : "zdzf",
			"buttonName" : "费用支付",// 费用支付
			"buttonType" : "1",
			"sortId" : 6
		}
	},
	"zqyw" : {// 债权投资业务管理
		"22069" : {
			"buttonId" : "zqtz",
			"buttonName" : "债权投资",// 债权投资
			"buttonType" : "1",
			"sortId" : 1
		},
		"22150" : {
			"buttonId" : "zczr",
			"buttonName" : "资产转入",//资产转入
			"buttonType" : "1",
			"sortId" : 1
		},
		"22071" : {
			"buttonId" : "zqtzsy",
			"buttonName" : "债权投资收益",// 债权投资收益
			"buttonType" : "1",
			"sortId" : 2
		},
		"22072" : {
			"buttonId" : "zqhg",
			"buttonName" : "债权回购",// 债权回购
			"buttonType" : "1",
			"sortId" : 3
		},
		"22070" : {
			"buttonId" : "zqcr",
			"buttonName" : "债权出售",// 债权出让
			"buttonType" : "1",
			"sortId" : 4
		},
		"22151" : {
			"buttonId" : "zdzf",
			"buttonName" : "费用支付",// 费用支付
			"buttonType" : "1",
			"sortId" : 5
		},
		"22052" : {
			"buttonId" : "zczc",
			"buttonName" : "资产转出",//资产转出
			"buttonType" : "1",
			"sortId" : 6
		}
	},
	
	"xyzyw" : {// 信用证/福费廷业务管理
		"22382" : {
			"buttonId" : "xyzmrfk",
			"buttonName" : "信用证买入付款",// 信用证买入付款
			"buttonType" : "1",
			"sortId" : 1
		},
		"22383" : {
			"buttonId" : "qjzr",
			"buttonName" : "期间转让",//期间转让
			"buttonType" : "1",
			"sortId" : 2
		},
		"22384" : {
			"buttonId" : "dqdf",
			"buttonName" : "到期兑付",// 到期兑付
			"buttonType" : "1",
			"sortId" : 3
		},
		
		"22151" : {
			"buttonId" : "zdzf",
			"buttonName" : "费用支付",// 费用支付
			"buttonType" : "1",
			"sortId" : 4
		},
		
	},
	
	"gqsyqyw" : {// 股权收益权业务管理
		"22037" : {
			"buttonId" : "srgqsyq",
			"buttonName" : "受让股权收益权",// 受让股权收益权
			"buttonType" : "1",
			"sortId" : 1
		},
		"22039" : {
			"buttonId" : "gqsyqsy",
			"buttonName" : "股权收益权收益",// 股权收益权收益
			"buttonType" : "1",
			"sortId" : 2
		},
		"22040" : {
			"buttonId" : "gqsyqhg",
			"buttonName" : "股权收益权回购",// 股权收益权回购
			"buttonType" : "1",
			"sortId" : 3
		},
		"22038" : {
			"buttonId" : "crgqsyq",
			"buttonName" : "出让股权收益权",// 出让股权收益权
			"buttonType" : "1",
			"sortId" : 4
		},
		"22151" : {
			"buttonId" : "zdzf",
			"buttonName" : "费用支付",// 费用支付
			"buttonType" : "1",
			"sortId" : 5
		},
		
	},
	"qtsyqyw" : {// 其他收益权业务管理
		"22045" : {
			"buttonId" : "srqtsyq",
			"buttonName" : "受让其他收益权",// 受让其他收益权
			"buttonType" : "1",
			"sortId" : 1
		},
		"22047" : {
			"buttonId" : "qtsyqsy",
			"buttonName" : "其他收益权收益",// 其他收益权收益
			"buttonType" : "1",
			"sortId" : 2
		},
		"22046" : {
			"buttonId" : "crqtsyq",
			"buttonName" : "出让其他收益权",// 出让其他收益权
			"buttonType" : "1",
			"sortId" : 3
		},
		"22048" : {
			"buttonId" : "qtsyqhg",
			"buttonName" : "其他收益权回购",// 其他收益权回购
			"buttonType" : "1",
			"sortId" : 4
		},
		"22151" : {
			"buttonId" : "zdzf",
			"buttonName" : "费用支付",// 费用支付
			"buttonType" : "1",
			"sortId" : 5
		},
		
	},
	"ckyw" : {// 存款业务管理
		"22029" : {
			"buttonId" : "ck",
			"buttonName" : "存款",// 存款
			"buttonType" : "1",
			"sortId" : 1
		},
		"22150" : {
			"buttonId" : "zczr",
			"buttonName" : "资产转入",//资产转入
			"buttonType" : "1",
			"sortId" : 1
		},
		"22031" : {
			"buttonId" : "cksy",
			"buttonName" : "存款收息",// 存款收息
			"buttonType" : "1",
			"sortId" : 2
		},
		"22030" : {
			"buttonId" : "ckhg",
			"buttonName" : "存款提取",// 存款提取
			"buttonType" : "1",
			"sortId" : 3
		},
//		"22032" : {
//			"buttonId" : "ckcr",
//			"buttonName" : "到期转存",// 到期转存
//			"buttonType" : "1",
//			"sortId" : 4
//		},
		"22151" : {
			"buttonId" : "zdzf",
			"buttonName" : "费用支付",// 费用支付
			"buttonType" : "1",
			"sortId" : 5
		}
	},
	"wtdk" : {// 委托贷款业务管理
		"22065" : {
			"buttonId" : "wtdkff",
			"buttonName" : "委托贷款发放",// 委托贷款发放
			"buttonType" : "1",
			"sortId" : 1
		},
		"22067" : {
			"buttonId" : "wtdksx",
			"buttonName" : "委托贷款收息",//委托贷款收息
			"buttonType" : "1",
			"sortId" : 2
		},
		"22066" : {
			"buttonId" : "wtdkfb",
			"buttonName" : "委托贷款返本",//委托贷款返本
			"buttonType" : "1",
			"sortId" : 3
		},
		"22151" : {
			"buttonId" : "zdzf",
			"buttonName" : "费用支付",// 费用支付
			"buttonType" : "1",
			"sortId" : 4
		}
	},
	"xdzc" : {//信贷资产业务管理
		"22025" : {
			"buttonId" : "srxdzc",
			"buttonName" : "受让信贷资产",//
			"buttonType" : "1",
			"sortId" : 1
		},
		"22026" : {
			"buttonId" : "xdzcfb",
			"buttonName" : "信贷资产返本",//
			"buttonType" : "1",
			"sortId" : 2
		},
		"22027" : {
			"buttonId" : "xdzcsx",
			"buttonName" : "信贷资产收息",//
			"buttonType" : "1",
			"sortId" : 3
		},
		"22028" : {
			"buttonId" : "crxdzc",
			"buttonName" : "出让信贷资产",//
			"buttonType" : "1",
			"sortId" : 4
		},
		"22151" : {
			"buttonId" : "zdzf",
			"buttonName" : "费用支付",// 费用支付
			"buttonType" : "1",
			"sortId" : 5
		}
	},
	"pjzc" : {//pj资产业务管理
		"22041" : {
			"buttonId" : "pjmr",
			"buttonName" : "票据买入",//
			"buttonType" : "1",
			"sortId" : 1
		},
		"22043" : {
			"buttonId" : "pjsx",
			"buttonName" : "票据收息",//
			"buttonType" : "1",
			"sortId" : 2
		},
		"22042" : {
			"buttonId" : "pjtx",
			"buttonName" : "票据贴现",//
			"buttonType" : "1",
			"sortId" : 3
		},
		"22044" : {
			"buttonId" : "pjhg",
			"buttonName" : "票据回购",//
			"buttonType" : "1",
			"sortId" : 4
		},
		"22103" : {
			"buttonId" : "pjcr",
			"buttonName" : "票据出让",//
			"buttonType" : "1",
			"sortId" : 5
		},
		"22151" : {
			"buttonId" : "zdzf",
			"buttonName" : "费用支付",// 费用支付
			"buttonType" : "1",
			"sortId" : 6
		}
	},
	"bzzc" : {// 保证资产
		"22213" : {
			"buttonName" : "dzyrkButton",// 抵质押入库
			"buttonType" : "1"
		},
		"22388" : {
			"buttonName" : "dbplrButton",// 担保物录入
			"buttonType" : "1"
		},
		"22212" : {
			"buttonName" : "jyckButton",// 解押出库
			"buttonType" : "1"
		},
		"22228" : {
			"buttonName" : "jdghButton",// 借调归还
			"buttonType" : "1"
		},
		"22219" : {
			"buttonName" : "zczfButton",// 资产作废
			"buttonType" : "1"
		},
		"22215" : {
			"buttonName" : "jdckButton",// 借调出库
			"buttonType" : "1"
		},
		"22211" : {
			"buttonName" : "pgjgtzButton",// 评估价格调整
			"buttonType" : "1"
		},
		"22209" : {
			"buttonName" : "fhsgButton",// 分红送股信息/红股红利到账
			"buttonType" : "1"
		},
		"22206" : {
			"buttonName" : "zcxxtzButton",// 资产信息调整
			"buttonType" : "1"
		}
	},
	"productsgroup" : {// 资金存取
		"3131" : {
			"buttonName" : "ctbutton1" // 资金存取
		}
	},
	"branch" : {// 部门
		"10120" : {
			"buttonName" : "ctbutton1" // 新增,
		},
		"10121" : {
			"buttonName" : "ctbutton2"// 修改,
		},
		"10122" : {
			"buttonName" : "ctbutton3"// 删除,
		},
		"10123" : {
			"buttonName" : "ctbutton4"// 部门经理,
		},
		"10124" : {
			"buttonName" : "ctbutton5"// 分管领导,
		}
	},
	"dctionary" : {
		"10140" : {
			"buttonName" : "ctbutton1" // 新增,
		},
		"10141" : {
			"buttonName" : "ctbutton2"// 修改,
		},
		"10142" : {
			"buttonName" : "ctbutton3"// 删除,
		},
		"10143" : {
			"buttonName" : "ctbutton4"// 显示字典,
		},
		"10144" : {
			"buttonName" : "ctbutton5"// 隐藏字典,
		}
	},
	"systemconfig" : {
		"10150" : {
			"buttonName" : "ctbutton1" // 查看 ,
		},
		"10151" : {
			"buttonName" : "ctbutton2"// 新增,
		},
		"10152" : {
			"buttonName" : "ctbutton3"// 修改,
		},
		"10153" : {
			"buttonName" : "ctbutton4"// 删除,
		}
	},
	"operator" : {// 用户管理
		"10110" : {
			"buttonName" : "410"
		},
		"10111" : {
			"buttonName" : "411"
		},
		"10112" : {
			"buttonName" : "412"
		},
		"10113" : {
			"buttonName" : "413"
		},
		"10114" : {
			"buttonName" : "414"
		},
		"10115" : {
			"buttonName" : "415"
		},
		"10116" : {
			"buttonName" : "416"
		},
		"10117" : {
			"buttonName" : "417"
		},
		"10118" : {
			"buttonName" : "418"
		},
		"10119" : {
			"buttonName" : "419"
		}
	},
	"role" : {// 角色管理
		"10130" : {
			"buttonName" : "430"
		},
		"10131" : {
			"buttonName" : "431"
		},
		"10132" : {
			"buttonName" : "432"
		},
		"10133" : {
			"buttonName" : "433"
		},
		"10134" : {
			"buttonName" : "434"
		}
	},
	// 基准利率
	"baseRate" : {
		"331": {
			"buttonName" : "ctbutton1"
		},
		"332":{
			"buttonName" : "ctbutton2"
		},
		"333":{
			"buttonName" : "ctbutton3"
		}
	},
	"exchangedate" : {// 工作日设置
		"10160" : {
			"buttonName" : "460"
		},
		"10161" : {
			"buttonName" : "461"
		},
		"10162" : {
			"buttonName" : "462"
		},
		"10163" : {
			"buttonName" : "463"
		}
	},
	"organization" : {// 机构信息维护
		"10171" : {
			"buttonName" : "ctbutton2"
		}
	},
	"organizationAuthorize" : {// 机构授权信息维护
		"10181" : {
			"buttonName" : "ctbutton3"
		}
	},
	"msgconfig" :{ //消息配置
		"10201" : {
			"buttonName" : "430"
		},
		"10202" : {
			"buttonName" : "431"
		},
		"10203" : {
			"buttonName" : "432"
		}
	},
	"msgReminder" :{ //消息提醒设置
		"1121" : {
			"buttonName" : "431"
		},
		"1122" : {
			"buttonName" : "432"
		}
	},
	"attachmentconfig" :{ //附件上传配置管理
		"10241" : {
			"buttonName" : "ctbutton2"
		},
		"10242" : {
			"buttonName" : "ctbutton3"
		},
		"10243" : {
			"buttonName" : "ctbutton4"
		}
	},
	"FA" :{//FA导出
		"9161":{
			"buttonName" : "exportDBF"
		},
		"9171":{
			"buttonName" : "exportDBF"
		},
		"9181":{
			"buttonName" : "exportDBF"
		},
		"9191":{
			"buttonName" : "exportDBF"
		},
		"9201":{
			"buttonName" : "ctbutton2"
		},
		"9202":{
			"buttonName" : "ctbutton3"
		}
		
	},
	"bussiness_submit_button":{//业务流程配置提交按钮
		"1043":{
			"buttonName" : "bussiness_submit_button"//按钮名字用按钮的真实id来替换
		}
	}
};