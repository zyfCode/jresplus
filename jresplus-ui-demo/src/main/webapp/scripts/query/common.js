/**
 * 全局函数，处理ajax请求，超时处理
 */
$(document).ajaxComplete(function(event, xhr, settings) {  
	var sessionstatus = xhr.getResponseHeader("sessionstatus");
    if(sessionstatus == "timeOut"){  
        if(xhr.getResponseHeader("loginPath")){//处理超时
//            alert("会话过期，请重新登陆!");
            window.location.replace(xhr.getResponseHeader("loginPath"));  

//        	query_operate.showLoginDiv(window);
        }else{  
            alert("请求超时请重新登陆 !");  
        }  
    } else if(sessionstatus == "online") {//处理错误
    	var errorMsg = xhr.getResponseHeader("errorInfo");
    	var c_error_level = xhr.getResponseHeader("c_error_level");
    	if(c_error_level == "0"){
            TDialog.Msg.warning("提示",unescape(decodeURI(errorMsg)));
//            TDialog.Msg.warning("提示",unescape(errorMsg));
        }else{  
        	TDialog.Msg.error("错误提示",unescape(decodeURI(errorMsg)));
        }  
    	TDialog.Msg.hideProgressBar();
    }  
}); 


/**
 * 一个curd的操作对象
 */
var query_operate = {
	showLoginDiv : function(window){
		if(typeof window.rlogin != "object"){     		
			window = window.parent;
    		arguments.callee(window);
    	} else {
    		window.rlogin.show();
    	}
	},
	// 关闭窗口
	closeWin : function(id) {
		Horn.getComp(id).hide();
	},
	// 弹出新增窗口
	showWin : function(winId, formId) {
		Horn.getComp(formId).clearValue();
		Horn.getComp('type', 'htype').setValue("add");
		Horn.getComp(winId).show();
	},
	// 弹出编辑窗口
	showEditWin : function(gridId, winId, formId) {
		var grid = Horn.getComp(gridId).getSelecteds();
		var checkedLength = grid.length;
		if (checkedLength !== 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		var form = Horn.getComp(formId);
		form.setValues(grid[0]);
		Horn.getComp('type', 'htype').setValue("edit");
		Horn.getComp(winId).show();
	},
	// 查询
	queryForm : function(pageBarId) {
		// grid+pageBar分页的方式
		Horn.getComp(pageBarId).firstpage();
		// Horn.getComp(pageBarId).loadByForm();
	},
	/***
	 * ajax请求提交请求到后台交互
	 * @param url:请求的地址
	 * @param data:请求时参数
	 * @param callback:请求返回的回调函数
	 * @param dataType:请求的类型
	 * @param isSynchron:请求类型：同步/异步
	 */
	ajax : function(url, data, callback, dataType, errorCallback, isAsync, requestType){
		var _async = isAsync || false;
		var _dataType = dataType || ajaxDataType.JSON;
		var _callback = callback || query_operate.callbackNoRefresh();
		var _requestType = requestType || ajaxRequestType.POST;
		var _errorCallback = errorCallback || query_operate.callbackError();
		$.ajax({
			type : _requestType,
			url : url,
			data : data,
			async : _async,
			dataType : _dataType
//			success : _callback,
//			error : _errorCallback
		}).done(_callback).fail(_errorCallback);
	},

	/**
	 * 用post请求提交ajax请求到后台交互
	 * 
	 * @param url:请求的地址
	 * @param data:请求时数据
	 * @param callback:请求返回的回调函数
	 */
	doPost : function(url, data, callback, dataType, errorCallback) {
		var _dataType = dataType || ajaxDataType.TEXT,
			_callback = callback || query_operate.callbackNoRefresh(),
			_errorCallback = errorCallback || query_operate.callbackError();
		$.post(url, data, _callback, _dataType).success(

		).error(_errorCallback);
	},
	// 通用回调函数,不刷新页面
	callbackNoRefresh : function(winId) {
		return function(result) {
			common_operate.endProgress();
			if (result == ajaxCallBackCode.OK) {
				if (winId) {
					Horn.getComp(winId).hide();
				}
				Horn.Tip.success("操作成功！");
			} 
//			else {
//				Horn.Tip.warn("操作失败！");
//			}
		};
	},// 通用回调函数,刷新grid页面
	callbackWithRefresh : function() {
		return function(result) {
			common_operate.endProgress();
			if (result == ajaxCallBackCode.OK) {
				Horn.Tip.success("操作成功");
				Horn.getComp("page_bar").firstpage();
			} 
//			else {
//				Horn.Tip.warn("操作失败");
//			}
		};
	},// 通用回调函数,刷新datagrid页面
	callbackWithDataGridRefresh : function(winId, gridId) {
		return function(result) {
			common_operate.endProgress();
			if (result == ajaxCallBackCode.OK) {
				Horn.Tip.success("操作成功！");
				if (winId) {
					Horn.getComp(winId).hide();
				}
				gridId = gridId || "dataTable";
				Horn.getCompById(gridId).load();
			} 
//			else {
////				Horn.Tip.warn(result);
//				Horn.Msg.warning("提示",result);
//			}
		};
	},//系统异常时的处理函数
	callbackError : function(){
		return function(XMLHttpRequest, textStatus){
			common_operate.endProgress();
			if(ajaxTextStatus.TIMEOUT == textStatus){
				TDialog.Msg.error("提示","连接服务器超时，请稍后重试！",function(){			
				});
			} else if(ajaxTextStatus.ERROR == textStatus || ajaxTextStatus.NOTMODIFIED == textStatus || ajaxTextStatus.PARSERERROR == textStatus){
				TDialog.Msg.error("提示","系统错误，请稍后重试或联系管理员！",function(){			
				});
			}		
		};	
	},
	// 随机生成色
	randowColor : function() {
		var aColor = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e",
				"f" ];
		var len = aColor.length;
		var iColor = "#";
		var randowIndex = 0;
		while (iColor.length < 7) {
			randowIndex = Math.floor(Math.random() * len);
			iColor += aColor[randowIndex];
		}
		return iColor;
	}
};

/**
 * 功能号集合对象
 */
var functionIds = {
	"busCfgUpd":"1000332",//业务流程配置修改
	"workgroup" : {
			"edit" : "1000693"// 资金账户修改
	},
	"dicta" : {
		"look" : "1000903",
		"updateDictStatus" : "1000491",
		"endDict" : "1009001",
		"getDatagridButtons" : "1000992",//业务流程管理界面查询datagrid按钮
		"getFormButtons" : "1000993"//业务流程管理界面查询form按钮
	},
	"test" : {
		"add" : "1000031",
		"edit" : "1000034"
	},
	"operators" : {
		"view" : "1000012",
		"resetPassword" : "1000015",
		"del" : "1000003",
		"logout" : "1000005",
		"authCommit" : "1000008",
		"edit" : "1000004",
		"menuAdd" : "1000010",// 菜单增加
		"menuDel" : "1000011",// 菜单删除
		"add" : "1000001",// 新增
		"update_status" : "1000005",// 用户状态修改
		"role_assign" : "1000014",// 角色分配
		"product_rightcommit" : "1000414"//
	},
	"branch" : {
		"add" : "1000031", // 部门添加
		"edit" : "1000034", // 部门修改
		"del" : "1000033",// 部门删除
		"addma" : "1000036",// 部门经理指定
		"delma" : "1000038"// 部门经理删除
	},
	"baseRate":{
		"add" : "1001113",//基准利率信息添加
		"edit": "1001114",//基准利率信息修改
		"del" : "1001115"//基准利率信息删除
	},
	"organization":{
		"edit" : "1001173"//组织机构信息修改
	},
	"orgAuthorize":{
		"add" : "1001203",    //机构授权信息增加
		"edit" : "1001205",  //机构授权信息修改
		"del" : "1001204"	//机构授权信息删除
	},
	"dctionary" : {
		"add" : "1000092",// 数据字典增加
		"edit" : "1000093",// 数据字典修改
		"del" : "1000094",// 数据字典删除
		"show" : "1000096"// 数据字典显示隐藏
	},
	"role" : {
		"add" : "1000121",
		"edit" : "1000124",
		"del" : "1000123",
		"menuAdd" : "1000128",// 菜单增加
		"menuDel" : "1000129",// 菜单删除
		"authCommit" : "1000126"
			
	},
	"login" : {// 登陆
		"check" : ""// 检查用户
	},
	"bankaccount" : {
		"add" : "1000211",// 银行账户增加
		"edit" : "1000212",// 银行账户修改
		"del" : "1000214",// 银行账户删除
		"dct" : "1000098", // 城市名称查询
		"dct2" : "1000099", // 城市名称查询(树形)
		"zl" : "1000217"// 流程管理
	},
	"collateral" : {
		"dictate" : "1000370",// jres指令流程
		"view" : "1000366",// 查看
		"return_view" : "1000366",// 查看借调归还
		"return_edit" : "1000374"// 更新借调归还
	},
	"product" : {
		"add" : "1000391",// 产品增加
		"edit" : "1000392",// 产品修改
		"overtime" : "1000396",// 到期处理
		"start" : "1000401",// 产品成立
		"end" : "1000394",// 产品不成立
		"addma" : "1000397",// 管理人员制定
		"getmainfo" : "1000398", // 管理人员制定查询
		"zl" : "1000403",// 产品指令操作
		"jlzl" : "1000404" // 产品经理指定
	},
	"project" : {
		"zl" : "1001417",// 产品指令操作
		"jlzl" : "1001420" // 产品经理指定
	},
	"sysconfig" : {
		"add" : "1000151",// 系统配置增加
		"del" : "1000153",// 系统配置删除
		"edit" : "1000154"// 系统配置修改
	},
	"msgconfig" : {
		"add":"1001351",//新增
		"edit":"1001351",//修改
		"set":"1001361",//提醒间隔设置
		//"update" : "1001351",//新增、修改
		"setupdate" : "1001354"//新增、修改
	},
	"stockcodesex" : {
		"dictate" : "1000467",// jres指令流程
		"view" : "1000455",// 查询
		"add" : "1000467",// 合同新增
		"edit" : "1000453",// 合同变更
		"extend_view" : "1000455",// 查看合同展期
		"extend_edit" : "1000459",// 更新合同展期
		"asset_view" : "1000455",// 查看五级分类
		"asset_edit" : "1000458",// 更新五级分类
		"equity" : "1000489",// 所有股权类-资金入口
		"Income" : "1000460",// 股权收益
		"gqfhsg" : "1000461",// 股权分红送股
		"Divest" : "1000462",// 股权出让
		"gqtz" : "1000463",// 股权投资
		"gqhg" : "1000464",// 股权回购
		"symxAdd" : "1000541",// 股权收益-明细新增
		"symxEdit" : "1000544",// 股权收益-明细修改
		"symxDel" : "1000543",// 股权收益-明细删除
		"query_cp_detail" : "1000402",// 根据产品代码查询合同相关信息
		"query_xm_detail" : "1001427",// 根据项目代码查询合同相关信息
		"query_cpdm_a":"1000406",//查询可用的产品代码--用于新增
		"query_cpdm_q":"1000407",//查询可用的产品代码--用于查询
		"query_xmdm_a":"1001426",//查询可用的项目代码--用于新增
	},
	"loanrival" : {
		"add" : "1000181",// 对手方信息增加
		"del" : "1000182",// 对手方信息删除
		"edit" : "1000183",// 对手方信息修改
		"zl" : "1000187",
		"gdzl" : "1000786", // 股东指令
		"ggzl" : "1000816", // 高管指令
		"jzcyzl" : "1000846" // 家族成员指令
	},
	"rivalbankaccount" : {
		"add" : "1000301",// 对手方账户增加
		"del" : "1000302",// 对手方账户删除
		"updatestate" : "1000307",// 对手方账户冻结
		"edit" : "1000303",// 对手方账户修改
		"zl" : "1000308"
	},
	"exchangedate" : {
		"add" : "1000631",// 交易日信息增加
		"del" : "1000632",// 交易日信息删除
		"init" : "1000635"// 交易日信息初始化
	},
	"holiday" : {
		"add" : "1001081",// 节假日信息增加
		"del" : "1001082",// 节假日信息删除
	},
	"tree" : {
		"get" : "1000099"// 树形
	},
	"productsgroup" : {
		"edit" : "1000663"// 产品资金账户修改
	},
	"investproduct" : {
		"zl" : "1000763",
		"ctzl" : "1000764", // 家族成员指令
		"ipl":"1000767"  //根据金融产品类型获取金融产品列表
	},
	"dictate" : {
		"zltz" : "1000490"// 指令调整
	},
    "repayplan" : {
		"zl" : "1000763",  //还款计划指令
		"look":"1001150",//还款计划单条详情
		"operdeal" : "1001149",  //还款计划增删改
		"automake":"1001141",  //还款计划生成
		"detaildeal":"1001146",   //还款计划   收益明细 增删改
		"detailconfirm":"1001147",   //还款计划   收益明细 确认
		"getorderno":"1001152",   //还款计划新增获取l_order_no
		"checkpay":"1001153"   //还款计划合同放款判断 
		//"detaillook":"1001151"   //还款计划   收益明细详情
	},
	"attachment" : {
		"add" : "1001445",// 附件上传系统配置增加
		"del" : "1001447",// 附件上传系统配置删除
		"edit" : "1001446"// 附件上传系统配置修改
	},
	// jres工作流-根据业务标识匹配对应的功能号
	"l_busin_flags" : {
		
		"22204" : "1000467",
		"22216" : "1000467",
		"22202" : "1000467",
		"22201" : "1000467",
		"22227" : "1000467",
		"22214" : "1000467",
		"22226" : "1000467",// 节息日调整
		"22229" : "1000467",
		"22205" : "1000467",// 利率变更
		"22359" : "1000467",//费率变更
		"22033" : "1000489",// 股权投资
		"22035" : "1000489",// 股权投资收益
		"22036" : "1000489",// 股权分红送股
		"22101" : "1000489",// 股权回购
		"22034" : "1000489",// 股权出让
		"22151" : "1000489",// 主动支付
		"22213" : "1000370",// 抵质押入库
		"22388" : "1000370",// 录入担保物
		"22219" : "1000370",// 资产作废
		"22206" : "1000370",// 资产信息调整
		"22228" : "1000370",// 借调归还
		"22215" : "1000370",// 借调出库
		"22212" : "1000370",// 借调出库
		"22211" : "1000370",// 估计价格调整
		"22209" : "1000370",// 分红送股

		"22243" : "1000217",
		"22244" : "1000217",
		"22245" : "1000217",
		"22389" : "1000403",
		"22390" : "1000403",
		"22391" : "1000403",
		"22401" : "1000403",
		"22340" : "1000403",
		"22402" : "1000404",
		"22236" : "1000187",
		"22237" : "1000187",
		"22238" : "1000187",
		"22392" : "1000786",
		"22393" : "1000786",
		"22394" : "1000786",
		"22395" : "1000816",
		"22396" : "1000816",
		"22397" : "1000816",
		"22398" : "1000846",
		"22399" : "1000846",
		"22400" : "1000846",
		"22403" : "1000763",
		"22404" : "1000763",
		"22405" : "1000763",
		"22406" : "1000764",
		"22407" : "1000764",
		"22408" : "1000764",
		"22246" : "1000308",
		"22247" : "1000308",
		"22248" : "1000308",
		"22368" : "1000308",
		"22410" : "1000489",
		"22411" : "1000489",
		"22409" : "1000489",
		"22412" : "1000489",
		"22078" : "1000489",// 物权投资
		"22079" : "1000489",// 物权投资收益
		"22080" : "1000489",//物权到期
		"22069" : "1000489",// 债权投资
		"22071" : "1000489",// 债权投资收益
		"22072" : "1000489",//债权回购
		"22070" : "1000489",//债权出售
		"22029" : "1000489",// 存款
		"22031" : "1000489",// 存款收息
		"22030" : "1000489",//存款提取
		"22032" : "1000489",//到期转存
		"22150":"1000489",//资产转入
		"22052":"1000489",//资产转出
		"22231":"1001147",   //还款计划
		"22413" : "1001417",
		"22414" : "1001417",
		"22415" : "1001417",	
		"22037" : "1000489",// 受让股权收益权   
		"22038" : "1000489",// 出让股权收益权
		"22039" : "1000489",// 股权收益权收益
		"22040" : "1000489",// 股权收益权回购
		
		"22382" : "1000489",// 信用证买入付款
		"22383" : "1000489",// 期间转让
		"22384" : "1000489",// 到期兑付
	
		"22045" : "1000489",// 受让其他收益权   
		"22047" : "1000489",// 其他收益权收益
		"22048" : "1000489",// 其他收益权回购
		"22046" : "1000489",// 出让其他收益权
		
		"22416" : "1001420", // 经理指定
		"22417":"1000467",  //项目绑定
		"22065" : "1000489",// 委托贷款发放
		"22066" : "1000489",// 委托贷款返本
		"22067" : "1000489",//委托贷款收息
		"22025" : "1000489",//受让信贷资产
		"22026" : "1000489",//信贷资产返本
		"22027" : "1000489",//信贷资产收息
		"22028" : "1000489",//出让信贷资产
			"22041" : "1000489",//票据
			"22042" : "1000489",//
			"22043" : "1000489",//
			"22044" : "1000489",//
			"22103" : "1000489"//
	}
};

/**
 * jres工作流操作单元
 */
var workflowStep = {
	// 发起
	launch : "launch",
	// 复核、审批...
	review : "review",

};

var selectConsts = {
	"c_op_status" : [ {
		"code" : "1",
		"text" : "正常"
	}, {
		"code" : "2",
		"text" : "冻结"
	} ]
	
};

/**
 * ajax请求类型
 */
var ajaxDataType = {
	TEXT : "text",
	JSON : "json"
};

/**
 * ajax请求方式
 */
var ajaxRequestType = {
	POST: "post",
	GET : "get"
};

/**
 * ajax请求返回结果
 */
var ajaxCallBackCode = {
		OK : "ok",
		ERROR : "error"
};

/**
 * ajax请求响应状态
 */
var ajaxTextStatus = {
		TIMEOUT : "timeout",
		ERROR : "error",
		NOTMODIFIED:"notmodified",
		PARSERERROR : "parsererror"
};

var urls = {
	//(卖方)存款 合同类
	"seller_ck" : "/am/am/sellerbusiness/deposit/list.htm",
	// (卖方)债权合同类
	"seller_zq" : "/am/am/sellerbusiness/credit/list.htm",
	// (卖方)物权合同类
	"seller_wq" : "/am/am/sellerbusiness/interest/list.htm",
	// (卖方)合同类
	"seller_ht" : "/am/am/sellerbusiness/stockcodesex/list.htm",
	// (卖方)金融产品合同类
	"seller_jrcp" : "/am/am/sellerbusiness/financialinvest/list.htm",
	// (卖方)其他收益权
	"seller_qtsyq" : "/am/am/sellerbusiness/otherProfileRight/list.htm",
	// (卖方)股权收益权合同类
	"seller_gqsyq" : "/am/am/sellerbusiness/stockrevenue/list.htm",
	// (卖方)信用证/福费廷合同类
	"seller_xyz" : "/am/am/sellerbusiness/letterofcredit/list.htm",
	// 存款 合同类
	"ck" : "/am/am/business/deposit/list.htm",
	// 债权合同类
	"zq" : "/am/am/business/credit/list.htm",
	// 物权合同类
	"wq" : "/am/am/business/interest/list.htm",
	// 合同类
	"ht" : "/am/am/business/stockcodesex/list.htm",
	// 资产类
	"zc" : "/am/am/business/collateral/list.htm",
	// 金融产品合同类
	"jrcp" : "/am/am/business/financialinvest/list.htm",
	// 对手方
	"dsf" : "/am/am/business/loanrival/list.htm",
	//业务配置
	"bussinessConfig":"am/am/system/bussinessConfig/list.htm",
	//(卖方)委托贷款合同
	"seller_wtdk":"/am/am/sellerbusiness/entrustedloan/list.htm",
	//(卖方)信贷资产合同
	"seller_xdzc":"/am/am/sellerbusiness/creditasset/list.htm",
	//(卖方)票据资产合同
	"seller_pjzc":"/am/am/sellerbusiness/noteasset/list.htm"
};

/**
 * 时间工具类对象
 */
var dataUtil = {
	/**
	 * 获得当前yyyy-MM-dd日期字符串
	 * 
	 * @returns {String},如2015-07-12
	 */
	getCurrentDate : function() {
		var now = new Date();

		var year = now.getFullYear(); // 年
		var month = now.getMonth() + 1; // 月
		var day = now.getDate(); // 日

		var clock = year + "-";

		if (month < 10)
			clock += "0";

		clock += month + "-";

		if (day < 10)
			clock += "0";

		clock += day;

		return clock;
	},
	/**
	 * 获得当前yyyyMMdd日期字符串
	 * 
	 * @returns {String},如20150712
	 */
	getCurrentDate2 : function() {
		return dataUtil.getCurrentDate().replace(/\-/g, "");
	},
	/**
	 * 获得当前yyyy-MM-dd时间字符串
	 * 
	 * @returns {String},如2015-07-12 12:00
	 */
	getCurrentTime : function() {
		var now = new Date();

		var year = now.getFullYear(); // 年
		var month = now.getMonth() + 1; // 月
		var day = now.getDate(); // 日

		var hh = now.getHours(); // 时
		var mm = now.getMinutes(); // 分

		var clock = year + "-";

		if (month < 10)
			clock += "0";

		clock += month + "-";

		if (day < 10)
			clock += "0";

		clock += day + " ";

		if (hh < 10)
			clock += "0";

		clock += hh + ":";
		if (mm < 10)
			clock += '0';
		clock += mm;
		return clock;
	},
	/**
	 * 获得当前yyyyMMdd日期字符串
	 * 
	 * @returns {String},如20150712
	 */
	getCurrentTime2 : function() {
		return dataUtil.getCurrentTime().replace(/\-/g, "");
	},
	/**
	 * 日期加减天数
	 * 
	 * @param date
	 *            2015-08-09
	 * @param days
	 *            正数为加，负数为减
	 * @returns {String}
	 */
	addDate : function(dateStr, days) {
		var year = dateStr.substring(0, 4);
		var mon = dateStr.substring(4, 6);
		var day = dateStr.substring(6);
		dateStr = year + "-" + mon + "-" + day;
		var d = new Date(dateStr);
		d.setDate(d.getDate() + days);
		var month = d.getMonth() + 1;
		var day = d.getDate();
		if (month < 10) {
			month = "0" + month;
		}
		if (day < 10) {
			day = "0" + day;
		}
		var val = d.getFullYear() + "" + month + "" + day;
		return val;
	},
	//计算两个日期的差值
	calculateDays:function(startDateStr,endDateStr){		
		var startDate = new Date(dataUtil.parseDate(startDateStr));
		var endDate = new Date(dataUtil.parseDate(endDateStr));
		 //得到时间戳相减 得到以毫秒为单位的差  
		 var mmSec = (endDate.getTime() - startDate.getTime());
		 //单位转换为天并返回 
		 return (mmSec / 3600000 / 24); 
	},
	/**
	 * 将yyyyMMdd日期字符转化为yyyy-MM-dd日期字符
	 * @param dateStr
	 * @returns
	 */
	parseDate : function(dateStr){
		var year = dateStr.substring(0, 4);
		var mon = dateStr.substring(4, 6);
		var day = dateStr.substring(6);
		dateStr = year + "-" + mon + "-" + day;
		return dateStr;
	},
	 // 日期类型格式成指定的字符串
    FormatDate: function(date, format) {
        format = Replace(format, "yyyy", date.getFullYear());
        format = Replace(format, "MM", dataUtil.GetFullMonth(date));
        format = Replace(format, "dd", dataUtil.GetFullDate(date));
        return format;
    },
    GetFullMonth: function(date) {
        var v = date.getMonth() + 1;
        if (v > 9) return v.toString();
        return "0" + v;
    },
    GetFullDate: function(date) {
        var v = date.getDate();
        if (v > 9) return v.toString();
        return "0" + v;
    }
};

var compare = function(obj1, obj2) {
	return function() {
		obj1.l_end_date_fdlv - obj2.l_end_date_fdlv;
	};
};
