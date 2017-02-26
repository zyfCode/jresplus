var Doublereg={
		/**
		 * 
		 * @param value：校验的值
		 * @param data_len：整数位
		 * @param dec_len：小数位
		 * @returns
		 */
		 reg_double:function(value,data_len,dec_len){
			 //value=$.trim(value);
			 var int_len=data_len-dec_len;
			 if(value.length!=0){
				 if(dec_len==0){//整数
						eval("var reg2=/^([-]?)\\d{1,"+data_len+"}$/;");
						if(!reg2.test(value)){
							return "请输入保留"+data_len+"位整数的数字格式";
						}else{
							return true;
						}
					}else{//小数
						eval("var reg = /^([-]?)\\d{1,"+int_len+"}(\\.\\d{1,"+dec_len+"})?$/;");
						if(!reg.test(value)){
							return "请输入保留"+int_len+"位整数"+dec_len+"位小数的数字格式";
						}else{
							return true;
						}
					}
			 }else{
				 return true;
			 }
			
		},

	/**
	 * 正浮点数长度校验
	 * @param value：校验的值
	 * @param data_len：整数位
	 * @param dec_len：小数位
	 * @returns
	 */
 	reg_double_2:function(value,data_len,dec_len){
 		//value=$.trim(value);
 		var int_len=data_len-dec_len;
 		if(value.length!=0){
 			if(dec_len==0){//整数
				eval("var reg2=/^\\d{1,"+data_len+"}$/;");
				if(!reg2.test(value)){
					return "请输入保留"+data_len+"位整数的数字格式";
				}else{
					return true;
				}
			}else{//小数
				eval("var reg = /^\\d{1,"+int_len+"}(\\.\\d{1,"+dec_len+"})?$/;");
				if(!reg.test(value)){
					return "请输入保留"+int_len+"位整数"+dec_len+"位小数的数字格式";
				}else{
					return true;
				}
			}
	 }else{
		 return true;
	 }
	
}	
};


var Datereg={
		/**日期类型YYYYMMDD
		 * */
		reg_date:function(value){
			 //value=$.trim(value);
			 if(value.length!=0){
				 eval("var reg =/^([\\d]{4}(((0[13578]|1[02])((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|11)((0[1-9])|([12][0-9])|30))|(02((0[1-9])|(1[0-9])|(2[0-8])))))|((((([02468][048])|([13579][26]))00)|([0-9]{2}(([02468][048])|([13579][26]))))(((0[13578]|1[02])((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|11)((0[1-9])|([12][0-9])|30))|(02((0[1-9])|(1[0-9])|(2[0-9])))))$/;");
					if(!reg.test(value)){
						return "日期类型格式为YYYYMMDD";
					}else{
						return true;
					}	
			 }else{
				 return true;
			 }
			
		},
		/**日期类型YYYYMMDD(用于计算)
		 * */
		reg_datecal:function(value){
			 //value=$.trim(value);
			 if(value.length!=0){
				 eval("var reg =/^([\\d]{4}(((0[13578]|1[02])((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|11)((0[1-9])|([12][0-9])|30))|(02((0[1-9])|(1[0-9])|(2[0-8])))))|((((([02468][048])|([13579][26]))00)|([0-9]{2}(([02468][048])|([13579][26]))))(((0[13578]|1[02])((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|11)((0[1-9])|([12][0-9])|30))|(02((0[1-9])|(1[0-9])|(2[0-9])))))$/;");
					if(!reg.test(value)){
						return false;
					}else{
						return true;
					}	
			 }else{
				 return false;
			 }
			
		},
		/**日期类型YYYYMMDD区间限制   
		 * 参数：
		 * idtype:控件的id后缀
		 * name：比较的控件name值
		 * type：比较类型 1表示不能早于（校验结束日期）,2表示不能迟于（校验开始日期）
		 * */
		reg_datebetween:function(value,idtype,name,type){
			 //value=$.trim(value);
			if(idtype==1){
				idtype="";
			}else if(idtype==2){
				idtype="_edit";
			}else if(idtype==3){
				idtype="_look";
			}else{
				idtype="_"+idtype+"";
			}
			var value2=Horn.getCompById(name+idtype).getValue();
			 if(value.length!=0){
				 eval("var reg =/^([\\d]{4}(((0[13578]|1[02])((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|11)((0[1-9])|([12][0-9])|30))|(02((0[1-9])|(1[0-9])|(2[0-8])))))|((((([02468][048])|([13579][26]))00)|([0-9]{2}(([02468][048])|([13579][26]))))(((0[13578]|1[02])((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|11)((0[1-9])|([12][0-9])|30))|(02((0[1-9])|(1[0-9])|(2[0-9])))))$/;");
					if(!reg.test(value)){
						return "请日期类型格式为YYYYMMDD";
					}else{
						if(type==1){
							if(value2.length!=0){
								if(!reg.test(value2)){
									return "区间开始日期类型格式为YYYYMMDD";
								}else{
									if(value2>value){
										return "区间结束日期不能早于区间开始日期";
									}else{
										return  true;
									}
								}
							}else{
								return  true;			
							}
						}else{
							if(value2.length!=0){
								if(!reg.test(value2)){
									return "区间结束日期类型格式为YYYYMMDD";
								}else{
									if(value2<value){
										return "区间开始日期不能迟于区间结束日期";
									}else{
										return  true;
									}
								}
							}else{
								return  true;			
							}
							
						}
					}	
			 }else{
				 return true;
			 }			
		},
		/**
		 * 日期区间检验
		 */
		validateDate : function(){
			var l_rate_begin_date = Horn.getCompById("l_rate_begin_date_lvbg").getValue();
			var l_first_pay_date = Horn.getCompById("l_first_pay_date_lvbg").getValue();
			if(!l_rate_begin_date || !l_first_pay_date){
				return true;
			}
			if(l_rate_begin_date > l_first_pay_date){
				return "首次起息日不能大于首次结算日！";
			}
			var restul1 = Horn.getCompById("l_rate_begin_date_lvbg").isValid();
			if(!restul1){
				Horn.getCompById("l_rate_begin_date_lvbg").validate();
			}
			var restul2 = Horn.getCompById("l_first_pay_date_lvbg").isValid();
			if(!restul2){
				Horn.getCompById("l_first_pay_date_lvbg").validate();
			}
			return true;
		}
};

/*
 *  % 在Oracle中用来匹配0到多个字符。
	_ 在Oracle中用来匹配1个字符。
	&  在Oracle中用来作输入提示符。
	\   默认的转义字符。
	' 单引号用来括起字符串，所以如果字符串中有'，必须用两个连续的'来代替。
*/

var Stringreg={
		/**字符串校验长度（解决maxlength中文输入位数出错的问题）
		 * */
		reg_string:function(value,data_len,min_len){
			//如果最少位数超过了检验值长度，则设为检验值长度
			if(typeof min_len == "number" && min_len > data_len){
				min_len = data_len;
			}
			// value=$.trim(value);
			//eval("var reg =/^[a-zA-Z0-9_\\u4e00-\\u9fa5]{1,"+data_len+"}$/;");
			//alert(reg);
			var pattern = new RegExp("[%_&\']");
			var rValue="";
			for (var i = 0; i < value.length; i++) {
	        rValue = rValue + value.substr(i, 1).replace(pattern, '');
			}
			
			var len = 0;  
			 if(rValue.length!=0){
				 for (var i=0; i<rValue.length; i++) {   
				     var c = rValue.charCodeAt(i);   
				    //单字节加1   
				     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {   
				       len++;   
				     }   
				     else {   
				      len+=2;   
				     }   
				    }   
					if(len>data_len){
						return "当前字段输入长度不能超过"+data_len+"位";
					} if( (typeof min_len == "number") && len < min_len){//如果设置了最少字符，则进行校验
						return "当前字段输入长度不能少于"+min_len+"位";
					}
					else{
						return true;
					}	
			 }else{
				 return true;
			 }
		    
		}
};
//常用规则校验validate.ischeck('intege')  
var validate = {
		errorMessage : "",
		returnStr : "\r\n",
		 regexEnum : {
		        intege : "^-?[1-9]\\d*$", // 整数
		        intege1 : "^[1-9]\\d*$", // 正整数
		        intege2 : "^-[1-9]\\d*$", // 负整数
		        num : "^([+-]?)\\d*\\.?\\d*$", // 数字
		        num1 : "^[1-9]\\d*|0$", // 正数（正整数 + 0）
		        num2 : "^-[1-9]\\d*|0$", // 负数（负整数 + 0）
		        decmal : "^([+-]?)\\d*\\.\\d+$", // 浮点数
		        decmal1 : "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$", // 正浮点数
		        decmal2 : "^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$", // 负浮点数
		        decmal3 : "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$", // 浮点数
		        decmal4 : "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$", // 非负浮点数（正浮点数
		        // + 0）
		        decmal5 : "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$", // 非正浮点数（负浮点数
		        // + 0）

		        email : "^(\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+){0,1}$", // 邮件
		        color : "^[a-fA-F0-9]{6}$", // 颜色
		        url : "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$", // url
		        chinese : "^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$", // 仅中文
		        ascii : "^[\\x00-\\xFF]+$", // 仅ACSII字符
		        zipcode : "^\\d{6}$", // 邮编
		        mobile : "^(13|15|18|17)[0-9]{9}$", // 手机
		        ip4 : "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$", // ip地址
		        notempty : "^\\S+$", // 非空
		        picture : "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$", // 图片
		        rar : "(.*)\\.(rar|zip|7zip|tgz)$", // 压缩文件
		        date : "^\\d{4}\\d{1,2}\\d{1,2}$", // 日期
		        qq : "[1-9][0-9]{4,11}", // QQ号码
		        tel : "^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$", // 电话号码的函数(包括验证国内区号,国际区号,分机号)
		        username : "^\\w+$", // 用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
		        letter : "^[A-Za-z]+$", // 字母
		        letter_u : "^[A-Z]+$", // 大写字母
		        letter_l : "^[a-z]+$", // 小写字母
		        required : "^\\s*\\S[\\S\\s]*$", // 非空    BUG #7327 
		         bankno : "^(\\d{16}|\\d{19}|\\d{18})$",//银行账号
		        bigpaymentno :"^(\\d{12})$",//大额支付号
		        fax:"^((0\\d{2,3}-)?\\d{7,8})$",//传真
		        
		        Message : "输入格式不正确",
		        integeMessage : "输入的不是整数格式",
		        intege1Message : "输入的不是正整数格式",
		        intege2Message : "输入的不是负整数格式",
		        requiredMessage : "当前输入不能为空",
		        emailMessage : "邮件地址不正确",
		        zipcodeMessage : "邮编输入格式不正确",
		        dateMessage : "日期格式不正确",
		        qqMessage : "QQ号码格式不正确",
		        telMessage : "电话号码格式不正确",
		        mobileMessage : "移动电话格式不正确",
		        decmalMessage : "只能输入浮点数格式",
		        decmal1Message : "只能输入正浮点数格式",
		        decmal2Message : "只能输入负浮点数格式",
		        decmal3Message : "只能输入浮点数格式",
		        decmal4Message : "只能输入非负浮点数格式",
		        decmal5Message : "只能输入非正浮点数格式",
		        colorMessage : "只能输入颜色格式",
		        urlMessage : "只能输入url格式",
		        chineseMessage : "只能输入中文格式",
		        asciiMessage : "只能输入ACSII字符格式",
		        ip4Message : "只能输入ip4地址格式",
		        pictureMessage : "只能输入图片格式",
		        rarMessage : "只能输入压缩文件格式",

		        numMessage : "只能输入数字格式",
		        num1Message : "只能输入正数数字格式",
		        num2Message : "只能输入负数数字格式",
		        letterMessage : "只能输入字母格式",
		        letter_uMessage : "只能输入大写字母格式",
		        letter_lMessage : "只能输入小写字母格式",
		        usernameMessage :"只能输入由数字、26个英文字母或者下划线组成的字符串",
		        banknoMessage:"银行账户格式不正确",
			    bigpaymentnoMessage:"大额支付号格式不正确",
			    faxMessage:"传真格式不正确"
		    },
		 /**常用的校验  去空格 
		  * */ 
		 ischeck:function(value,reg){
			// value=$.trim(value);
			 var  reg_string="var reg2=/"+validate.regexEnum[reg]+"/;";
			 var s=reg+"Message";
			 var  errmess=validate.regexEnum[s];
			 eval(reg_string);
			 if(value.length!=0){
				 if(!reg2.test(value)){
					 if(reg=="intege"&&value==0){
						 return true;
					 }else{
						 return errmess;
					 }
				 }else{
					 return true;
				 }
			 }else{
				 return true;
			 }
			 
		 },
		 /**
	         * 身份证判断
	         * @param {String} value 校验值
	         * @return {Boolean}
	         */
	        idcard :function(value){
	            var vcity={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
	                21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",
	                33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",
	                42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",
	                51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
	                63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
	            };
	            //身份证验证
	            function checkCard(value)
	            {
	                var card = value;
	                //是否为空
	                if(card === '')
	                {
	                    return false;
	                }
	                //校验长度，类型
	                if(isCardNo(card) === false)
	                {
	                    return false;
	                }
	                //检查省份
	                if(checkProvince(card) === false)
	                {
	                    return false;
	                }
	                //校验生日
	                if(checkBirthday(card) === false)
	                {
	                    return false;
	                }
	                //检验位的检测
	                if(checkParity(card) === false)
	                {
	                    return false;
	                }
	                return true;
	            };
	            //检查号码是否符合规范，包括长度，类型
	            function isCardNo(card)
	            {
	                //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
	                var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
	                if(reg.test(card) === false)
	                {
	                    return false;
	                }
	                return true;
	            };
	            //取身份证前两位,校验省份
	            function checkProvince(card)
	            {
	                var province = card.substr(0,2);
	                if(vcity[province] == undefined)
	                {
	                    return false;
	                }
	                return true;
	            };
	            //检查生日是否正确
	            function checkBirthday(card)
	            {
	                var len = card.length;
	                //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
	                if(len == '15')
	                {
	                    var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
	                    var arr_data = card.match(re_fifteen);
	                    var year = arr_data[2];
	                    var month = arr_data[3];
	                    var day = arr_data[4];
	                    var birthday = new Date('19'+year+'/'+month+'/'+day);
	                    return verifyBirthday('19'+year,month,day,birthday);
	                }
	                //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
	                if(len == '18')
	                {
	                    var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
	                    var arr_data = card.match(re_eighteen);
	                    var year = arr_data[2];
	                    var month = arr_data[3];
	                    var day = arr_data[4];
	                    var birthday = new Date(year+'/'+month+'/'+day);
	                    return verifyBirthday(year,month,day,birthday);
	                }
	                return false;
	            };
	            //校验日期
	            function verifyBirthday(year,month,day,birthday)
	            {
	                var now = new Date();
	                var now_year = now.getFullYear();
	                //年月日是否合理
	                if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day)
	                {
	                    //判断年份的范围（0岁到120岁之间)
	                    var time = now_year - year;
	                    if(time >= 0 && time <= 120)
	                    {
	                        return true;
	                    }
	                    return false;
	                }
	                return false;
	            };
	            //校验位的检测
	            function checkParity(card)
	            {
	                //15位转18位
	                card = changeFivteenToEighteen(card);
	                var len = card.length;
	                if(len == '18')
	                {
	                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
	                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
	                    var cardTemp = 0, i, valnum;
	                    for(i = 0; i < 17; i ++)
	                    {
	                        cardTemp += card.substr(i, 1) * arrInt[i];
	                    }
	                    valnum = arrCh[cardTemp % 11];
	                    if (valnum == card.substr(17, 1))
	                    {
	                        return true;
	                    }
	                    return false;
	                }
	                return false;
	            };
	            //15位转18位身份证号
	            function changeFivteenToEighteen(card)
	            {
	                if(card.length == '15')
	                {
	                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
	                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
	                    var cardTemp = 0, i;
	                    card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
	                    for(i = 0; i < 17; i ++)
	                    {
	                        cardTemp += card.substr(i, 1) * arrInt[i];
	                    }
	                    card += arrCh[cardTemp % 11];
	                    return card;
	                }
	                return card;
	            };
	            return checkCard(value);
	        },
	     
		/**
		 * 
		 * @param value：校验的值
		 * @param data_len：整数位
		 * @param dec_len：小数位
		 * @returns
		 */
		 reg_double:function(value,data_len,dec_len){
			 //value=$.trim(value);
			 validate.errorMessage = "";
			 var int_len=data_len-dec_len;
			if(dec_len==0){//整数
				eval("var reg2=/^([-]?)\\d{1,"+data_len+"}$/;");
				if(!reg2.test(value)){
					validate.errorMessage += "请输入保留"+data_len+"位整数的数字格式!" + validate.returnStr;
				}
			}else{//小数
				eval("var reg = /^([-]?)\\d{1,"+int_len+"}(\\.\\d{1,"+dec_len+"})?$/;");
				if(!reg.test(value)){
					validate.errorMessage += "请输入保留"+int_len+"位整数"+dec_len+"位小数的数字格式!"+ validate.returnStr;
				}
			}
		}
};


var common_reg={
//表单元素去除校验红框
Formremoverr:function(v) {
	Horn.getComp(v).getFieldComps().each(function(){
		this.removeError();
    });
},
//表单元素清空值并去除校验红框
Formreset:function(v) {
	//Horn.getComp(v).clearValue();
	Horn.getComp(v).reset();
	Horn.getComp(v).getFieldComps().each(function(){
		this.removeError();
    });
},
//表单内日期控件默认值为0去除
formremdefzero:function(v) {
	Horn.getComp(v).getFieldComps().each(function(){
		if(this instanceof Horn.Calendar || this instanceof Horn.CalendarGroup){
			var val=this.el.children("input:text").val();
			if(val=='0'||val==0){
				this.setValue('');
			}
		}
    });
},//查询条件非隐藏域清空值
formforqueryreset:function(v) {
	Horn.getComp(v).getFieldComps().each(function(){
		if(this instanceof Horn.HiddenField){

		}else{
			//this.setValue('');
			this.reset();
		}
    });
},//清空form内部所有表单的值
formRest : function(formName){
	Horn.getComp(formName).clearValue();
},
windowhide:function(v) {
	Horn.getComp(v).hide();
}
};