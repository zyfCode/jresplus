var numUtil = {
	/***************************************************************************
	 * 数字格式化,金额 用逗号 隔开:整数分割，小数位不处理
	 * 
	 * @param p_num
	 * @returns {String} eg:10000.78显示为10,000.78
	 */
	toThousands : function(p_num) {
		var num = (p_num || 0).toString(), result = '', decimal = num
				.substring(num.indexOf("."), num.length);
		num = num.substring(0, num.indexOf("."));
		while (num.length > 3) {
			result = ',' + num.slice(-3) + result;
			num = num.slice(0, num.length - 3);
		}
		if (num) {
			result = num + result + decimal;
		}
		return result;
	},// 数字格式化,金额 用逗号 隔开
	fmoney : function(s, n) {
		n = n > 0 && n <= 20 ? n : 2;
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
		var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
		var t = "";
		for ( var i = 0; i < l.length; i++) {
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
		}
		return t.split("").reverse().join("") + "." + r;
	},
	/***************************************************************************
	 * 格式化
	 * 
	 * @params money {Number or String} 金额
	 * @params digit {Number} 小数点的位数，不够补0
	 * @returns {String} 格式化后的金额
	 */
	formatMoney : function(money, digit) {
		var tpMoney = '0.00';
		if (undefined != money) {
			tpMoney = money;
		}
		tpMoney = new Number(tpMoney);
		if (isNaN(tpMoney)) {
			return '0.00';
		}
		tpMoney = tpMoney.toFixed(digit) + '';
		var re = /^(-?\d+)(\d{3})(\.?\d*)/;
		while (re.test(tpMoney)) {
			tpMoney = tpMoney.replace(re, "$1,$2$3");
		}
		return tpMoney;
	},
	// 还原函数
	rmoney : function(s) {
		return parseFloat(s.replace(/[^\d\.-]/g, ""));
	},
	/**
	 * 页面金额数字格式化:保留两位小数
	 * @param data
	 * @returns
	 */
	reverse2Html : function(data) {
		return numUtil.formatMoney(data.val, 2);
	}
};

/**
 * String类型工具类
 */
var StringUtil = {
		/**
		 * 判断是否以指定字符串开头
		 * @param s:指标
		 * @param str:被检验值
		 * @returns boolean
		 */
		 startWith : function(s,str){     
			  var reg=new RegExp("^"+str);     
			  return reg.test(s);        
		}
};