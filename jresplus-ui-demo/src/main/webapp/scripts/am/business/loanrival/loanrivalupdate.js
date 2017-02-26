    $(function() {  
    	changeandresize();
         common_style.disable_style();	       
        var y=Horn.getCompById("l_group_rival_id_edit").getValue();
        loanrival.changeinit(y);
        //loanrival.rolechange(2);
        var l_rat=Horn.getCompById("l_rating_organ_edit").getValue();
        if(l_rat=='0'){
        	Horn.getCompById("l_rating_organ_edit").setValue("0");
        }
        //小手下拉框单条值获取
        common_operate.geteditlist("l_rating_organ_edit","loanrival","1000185");
        common_operate.geteditlist("l_group_rival_id_edit","loanrival","1000185");
    }); 
    //公用   根据对手方类型改变字段隐藏属性
    function  changeandresize(){
    	loanrival.change(2); 
        window.parent.resizeuesWin($(document.body).height());
    }
   
