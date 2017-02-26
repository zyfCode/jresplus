//兼容ie6的fixed代码 
//jQuery(function($j){
//	$j('#pop').positionFixed()
//})
(function($j){
    $j.positionFixed = function(el){
        $j(el).each(function(){
            new fixed(this);
        });
        return el;                  
    };
    $j.fn.positionFixed = function(){
        return $j.positionFixed(this);
    };
    var fixed = $j.positionFixed.impl = function(el){
        var o=this;
        o.sts={
            target : $j(el).css('position','fixed'),
            container : $j(window)
        };
        o.sts.currentCss = {
            top : o.sts.target.css('top'),              
            right : o.sts.target.css('right'),              
            bottom : o.sts.target.css('bottom'),                
            left : o.sts.target.css('left')             
        };
        if(!o.ie6)return;
        o.bindEvent();
    };
    $j.extend(fixed.prototype,{
        ie6 : $.browser.msie && $.browser.version < 7.0,
        bindEvent : function(){
            var o=this;
            o.sts.target.css('position','absolute');
            o.overRelative().initBasePos();
            o.sts.target.css(o.sts.basePos);
            o.sts.container.scroll(o.scrollEvent()).resize(o.resizeEvent());
            o.setPos();
        },
        overRelative : function(){
            var o=this;
            var relative = o.sts.target.parents().filter(function(){
                if($j(this).css('position')=='relative')return this;
            });
            if(relative.size()>0)relative.after(o.sts.target);
            return o;
        },
        initBasePos : function(){
            var o=this;
            o.sts.basePos = {
                top: o.sts.target.offset().top - (o.sts.currentCss.top=='auto'?o.sts.container.scrollTop():0),
                left: o.sts.target.offset().left - (o.sts.currentCss.left=='auto'?o.sts.container.scrollLeft():0)
            };
            return o;
        },
        setPos : function(){
            var o=this;
            o.sts.target.css({
                top: o.sts.container.scrollTop() + o.sts.basePos.top,
                left: o.sts.container.scrollLeft() + o.sts.basePos.left
            });
        },
        scrollEvent : function(){
            var o=this;
            return function(){
                o.setPos();
            };
        },
        resizeEvent : function(){
            var o=this;
            return function(){
                setTimeout(function(){
                    o.sts.target.css(o.sts.currentCss);      
                    o.initBasePos();
                    o.setPos();
                },1);   
            };           
        }
    });
})(jQuery);

jQuery(function($j){
	$j('#footer').positionFixed();
});

//pop右下角弹窗函数
function Pop(title,url,intro,l_msg_serial_no,menu_title,c_msg_kind,l_menu_id,vc_relative_id,vc_stock_code){
	this.l_msg_serial_no = l_msg_serial_no;// 消息流水号:用做唯一id标识
	this.title=title;
	this.url=url;
	this.intro=intro;
	this.menu_title = menu_title;
	this.c_msg_kind = c_msg_kind;
	this.l_menu_id = l_menu_id;
	this.vc_relative_id = vc_relative_id;//流水号
	this.vc_stock_code = vc_stock_code;//合同号
	this.apearTime=1000;
	this.hideTime=500;
	this.delay=20000;
	
	//显示
	this.showDiv();
	//添加信息
	this.addInfo();	
	//关闭
	this.closeDiv();
	//跳转
	this.jump();
}
Pop.prototype={
  addInfo:function(){
	$("#popTitle" + this.l_msg_serial_no + " a").attr('href',this.url).html(this.title);
    $("#popIntro" + this.l_msg_serial_no).html(this.intro);
    $("#popMore" + this.l_msg_serial_no + " a").attr('href',this.url);
  },
  showDiv:function(time){	  
	  //创建弹出窗口
	  var pop = "<div id=\"pop" + this.l_msg_serial_no + "\" class=\"pop\" style=\"display:none;\">" +		
					"<div id=\"popHead" + this.l_msg_serial_no + "\" class=\"popHead\">" +
					"<a id=\"popClose" + this.l_msg_serial_no + "\" class=\"popClose\" title=\"关闭\">X</a>" +
					"<h2>❤温馨提示</h2>" +
					"</div>" +
					"<div id=\"popContent" + this.l_msg_serial_no + "\" class=\"popContent\">" +
					"<dl>" +
						"<dt id=\"popTitle" + this.l_msg_serial_no + "\" class=\"popTitle\"><a href=\"javascript:void(0);\" target=\"_self\">这里是参数</a></dt>" +
						"<dd id=\"popIntro" + this.l_msg_serial_no + "\" class=\"popIntro\">这里是内容简介</dd>" +
					"</dl>" +
					"<p id=\"popMore" + this.l_msg_serial_no + "\" class=\"popMore\"><a href=\"javascript:void(0);\" target=\"_self\">查看 »</a></p>" +
					"</div>"+
			 	"</div>";
	  
	  $("#message").append(pop);  
	if (!($.browser.msie && ($.browser.version == "6.0") && !$.support.style)) {
      $("#pop" + this.l_msg_serial_no).slideDown(this.apearTime).delay(this.delay).fadeOut(400);
    } else{//调用jquery.fixed.js,解决ie6不能用fixed
      $("#pop" + this.l_msg_serial_no).show();
			jQuery(function($j){
			    $j('#pop'+ this.l_msg_serial_no).positionFixed();
			});
    }
  },
  closeDiv:function(){
  	$("#popClose" + this.l_msg_serial_no).click(function(e){
  			$(this).parent(".popHead").parent(".pop").hide();
  		}
    );
  },
  jump:function(){//跳转
	  var _url = this.url,
	  	  _title = this.menu_title,
	  	  _l_msg_serial_no = this.l_msg_serial_no,
	  	  _menu_id = this.l_menu_id;
	  if(this.c_msg_kind === "1"){//业务提醒
		  _url += this.vc_stock_code;
	  } else if(this.c_msg_kind === "0"){//指令提醒
		  _url += "?l_serial_no=" + this.vc_relative_id; 	  
	  }
	  $("#popTitle" + this.l_msg_serial_no + " a").click(function(e){
		  messager.updateMsg(_l_msg_serial_no);
		  window.parent.Horn.Frame.screen.close(_menu_id);
		  window.parent.Horn.Frame.openMenu(_menu_id, _url, _title, 'inbox');
		  $("#pop" + _l_msg_serial_no).hide();
		  return false;
	  });
	  $("#popMore" + this.l_msg_serial_no + " a").click(function(e){
		  messager.updateMsg(_l_msg_serial_no);
		  window.parent.Horn.Frame.screen.close(_menu_id);
		  window.parent.Horn.Frame.openMenu(_menu_id, _url, _title, 'inbox');
		  $("#pop" + _l_msg_serial_no).hide();
		  return false;
	  });
  }
};
