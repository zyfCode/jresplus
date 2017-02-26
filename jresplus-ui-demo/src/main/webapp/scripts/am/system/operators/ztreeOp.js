/**ztree的参数配置，setting主要是设置一些tree的属性，是本地数据源，还是远程，动画效果，是否含有复选框等等**/  
var setting = {
 check: { /**复选框**/
  enable: true,
  autoCheckTrigger: true,
   chkboxType: {"Y":"s", "N":"s"}
 },
 view: {                                  
  //dblClickExpand: false,
  expandSpeed: 300 //设置树展开的动画速度，IE6下面没效果，
 },                          
 data: {                                  
  simpleData: {   //简单的数据源，一般开发中都是从数据库里读取，API有介绍，这里只是本地的                         
   enable: true,
   idKey: "id",  //id和pid，这里不用多说了吧，树的目录级别
   pIdKey: "pId",
   rootPId: 0   //根节点
  }                          
 },                         
 callback: {     /**回调函数的设置，随便写了两个**/
//  beforeClick: beforeClick,                                  
 // onCheck: onCheck                          
 }
};
function beforeClick(treeId, treeNode) {
 alert("beforeClick");
}
function onCheck(e, treeId, treeNode) {
		var zTree = $.fn.zTree.getZTreeObj("cityTree");
		// 获得当前节点的子节点
		var nodes = treeNode.children;
		// 遍历每一个子节点更新其选中状态
		doCheck(nodes);	
}  

function doCheck(nodes){	
	for(var i=0;i<nodes.length;i++){
		if(nodes[i]){
			test(nodes[i])
		}
		nodes[i].checked = treeNode.checked;
			// 更新节点
		zTree.updateNode(nodes[i]);
	}	
}
