$(function(){  
	var u=Horn.getCompById("l_busin_flag").getValue();
	if(u=='22398'||u=='22399'||u=='22400'){
		  common_operate.geteditlist("l_rival_id_8","loanrival","1000185");
		  var l_officer_id=Horn.getCompById("l_officer_id_8").getValue();
		  holder.changeloanfam(8);
		  Horn.getCompById("l_officer_id_8").setValue(l_officer_id);
		  holder.changefamily(8);
	}else if(u=='22392'||u=='22393'||u=='22394'){
		common_operate.geteditlist("l_rival_id_edit","loanrival","1000185");
	} else if(u=='22395'||u=='22396'||u=='22397'){
		common_operate.geteditlist("l_rival_id_5","loanrival","1000185");
	} 
});  
