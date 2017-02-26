/**ztree的参数配置，setting主要是设置一些tree的属性，是本地数据源，还是远程，动画效果，是否含有复选框等等**/  
	  var  s;
	  var trigger;
		var setting = {
			callback: {
			beforeClick: zTreeBeforeClick,
		    onClick: zTreeOnClick
	   },
    //树形图动作
		view: {
					showIcon: showIconForTree,
					expandSpeed: "fast", //节点展开的速度
					selectedMulti: false //设置是否允许同时选中多个节点。
		},
		 data: {
				simpleData: {   //简单的数据源，一般开发中都是从数据库里读取，API有介绍，这里只是本地的                         
         enable: true,
			   idKey: "id",  //id和pid，这里不用多说了吧，树的目录级别
			   pIdKey: "pId",
			   rootPId: 0   //根节点
			  }
			}
		};

		function showIconForTree(treeId, treeNode) {
			return !treeNode.isParent;
		};
		function zTreeBeforeClick(treeId, treeNode) {
			return !treeNode.isParent;
		};
		function zTreeOnClick(event, treeId, treeNode) {
       //alert(treeNode.pId + ", " + treeNode.name);
       $("#"+s).val(treeNode.name);
        $("#show_"+s).val(treeNode.id);
        $("#tree_"+s).hide();
        //Horn.getComp(s.substring(9)).removeError();
        Horn.getComp(s.substring(9)).validate();
        };
        
     $(document).ready(function(){  
	       
     });
	/*例子
	 * $(document).ready(function(){
			
			$("#treeinput").focus(function(){
				   // $("#tree").css("top",$("#check").css("top")+1);
				  
				   s="treeinput";
				    $.fn.zTree.init($("#"+s+"_treeDemo"), setting, zNodes);
				    $("#"+s+"_tree").show();
				}
			)
		});
	//页面	
	  <div  style="position:relaitve;">
	<div  id="" style="margin-left:20px;height:20px;position:absolute; z-index:2;">
		<input type="text"  id="treeinput" />
		<input type="hidden"  id="show_treeinput" />
	</div>
	<div  id="tree_treeinput" style="display: none;margin-top:15px;margin-left:20px;position:absolute; z-index:3;">
		<ul id="treeDemo_treeinput" class="ztree"></ul>
	</div>
   </div>
	
	*/
  


