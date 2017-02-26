(function($, undefined) {

    /**
     * 遮罩某个指定的div
     * @name FMask#doMask
     * @param  name显示的名称
     * @param  id显示的id
     * @function
     * @return void
     * @example
     */
    $.fn.setTargetSelectValue = function(name, id) {
        var element = $(this);
       	var objId = element.attr('id');
       	$("#view_"+objId).val(name);
       	$("#"+objId).val(id);
       	//$("#view_"+objId).removeClass();
       	
       $("#div_"+objId).next().remove();
        $("#div_"+objId).next().remove();
    };

})(jQuery);

//联系电话正则验证
function linkPhone(value){
	var pattern =/^[0-9-()]{0,20}$/;
	if(value !=''){
		if(!pattern.exec(value)){
			return "联系电话不合法，正确格式：13734234323或0571-8888888";
		}
	};
	return true;
}
//只能输入数字
function number(value){
	var pattern = /^([0-9]+)$/;
	if(value !=''){
		if(!pattern.exec(value)){
			return false;
		}
	};
	return true;
}
//非法输入，只能输入英文、数字和下划线
function checkCharAndNum(value){
	var pattern =/^[A-Za-z0-9_]+$/;
	if(value !=''){
		if(!pattern.exec(value)){
			return "非法输入，只能输入英文、数字和下划线";
		}
	};
	return true;
}
//非法输入，只能输入中文、英文、数字和下划线
function checkImproperChar(value){
	var pattern =/^[\w\u4e00-\u9fa5\.\/\,\，\.\。\“\（\）\(\)\-\s]*$/;
	if(value !=''){
		if(!pattern.exec(value)){
			return "非法输入，只能输入中文、英文、数字和下划线";
		}
	};
	return true;
}
//输入不合法图标地址
function checkIcon(value){
	var pattern =/^[\w\u4e00-\u9fa5\.\/\,\，\.\。\“\（\）\(\)\-\s]*$/;
	if(value !=''){
		if(!pattern.exec(value)){
			return "输入不合法图标地址";
		}
	};
	return true;
}
//输入不合法URL
function checkUrl(value){
	var pattern =/^[0-9A-Za-z_?:=@&\/\.\$]+$/;
	if(value !=''){
		if(!pattern.exec(value)){
			return "输入不合法URL";
		}
	};
	return true;
}
//iframe自适应高度方法
function reinitIframe(ifmId){
	var iframe = document.getElementById(ifmId);
	try{
		var bHeight = iframe.contentWindow.document.body.scrollHeight;
		var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
		var height = Math.max(bHeight, dHeight);
		iframe.height =  height+100;
	}catch (ex){}
}

window.onload=function(){  
	document.getElementsByTagName("body")[0].onkeydown =function(){  
    //获取事件对象  
    var elem = event.relatedTarget || event.srcElement || event.target ||event.currentTarget;   
    if(event.keyCode==8){//判断按键为backSpace键  
            //获取按键按下时光标做指向的element  
            var elem = event.srcElement || event.currentTarget;   
            //判断是否需要阻止按下键盘的事件默认传递  
            var name = elem.nodeName;  
            if(name!='INPUT' && name!='TEXTAREA'){  
                return _stopIt(event);  
            }  
            var type_e = elem.type.toUpperCase();  
            if(name=='INPUT' && (type_e!='TEXT' && type_e!='TEXTAREA' && type_e!='PASSWORD' && type_e!='FILE')){  
                    return _stopIt(event);  
            }  
            if(name=='INPUT' && (elem.readOnly==true || elem.disabled ==true)){  
                    return _stopIt(event);  
            }  
        }  
    }  
}  
function _stopIt(e){  
    if(e.returnValue){  
        e.returnValue = false ;  
    }  
    if(e.preventDefault ){  
        e.preventDefault();  
    }                 

    return false;  
} 

$(function(){
	
	$(".h_pagebtn-index").click(function(){
		$("body").doMask('正在提交,请稍后...');
	});
	$(".h_pagebtn-prev:not(.h_page-dis)").click(function(){
		$("body").doMask('正在提交,请稍后...');
	});
	$("a.h_page-num").click(function(){
		$("body").doMask('正在提交,请稍后...');
	});
	$(".h_pagebtn-next:not(.h_page-dis)").click(function(){
		$("body").doMask('正在提交,请稍后...');
	});
	$(".h_pagebtn-end").click(function(){
		$("body").doMask('正在提交,请稍后...');
	});
	$(".h_pagebtn-go").click(function(){
		$("body").doMask('正在提交,请稍后...');
	});
	
	$(".backward").click(function(){
		$("body").doMask('正在返回,请稍后...');
	});
	$("form[name=addForm]").submit(function(){
		if(Horn.getComp("addForm").isValid()){
			$("body").doMask('正在提交,请稍后...');
		}
	});
	$("form[name=modifyForm]").submit(function(){
		if(Horn.getComp("modifyForm").isValid()){
			$("body").doMask('正在提交,请稍后...');
		}
	});
	$("form[name=searchForm]").submit(function(){
		if(Horn.getComp("searchForm").isValid()){
			$("body").doMask('正在查询,请稍后...');
		}
	});
})