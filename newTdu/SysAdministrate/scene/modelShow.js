		//图片路径文件（绝对路径时使用）
		
		var imgurl="http://www.xmtdu.com:8094/TDu/Data/3D/Scene/";
   	 	
   	 	$(document).ready(function(){ 
   	 	
   	 		//1.初始化，加载所有数据
   	 		
   	 		
			doGetObjects();
            	var b=getRequest();
        		var index_i=b['subSceneId'];
                $("#insertTree").attr({ onclick: "window.location='insert.html?subSceneId=" + index_i+"'" });
                
                /*var dom=$("#subject",top.document);
            	console.log(dom);
            	dom.off("change").on("change", function() {
            		parent.location.reload();
            	})*/
            var  subject=  $(window.parent.parent.document).find(".choosesub");
            console.log("---"+subject);
            subject.bind('DOMNodeInserted',function(e) {
                console.log("11111111111")
                parent.location.reload();
            })

			$("#treeTable").css("margin","0 auto")
   	 	});
   	 	
   	 	
   	 	//获取网址后面id信息
   	 	function getRequest(){
    		var url=location.search;
    		var	theRequest= new Object();
    		var strs="";
    		if(url.indexOf("?")!=-1){
    			var str= url.substr(1);
    			strs=str.split("&");
    			for(var i=0; i<strs.length; i++ ){
    				theRequest[strs[i].split("=")[0]]= decodeURIComponent(strs[i].split("=")[1]);
    			}
    		}
    		return theRequest;
    	}
   	 	
   	 	
   	 	
 		//初始化操作
		function doGetObjects(){
			var a=getRequest();
        	var index_id=a['subSceneId'];
		$.ajax({
		type:"POST",
		url: houtaiurl+"DevelopScenesController/getSceneInfos.action?subSceneId="+index_id,
		success:function(data){
			console.log(data)
				setTableBodyRows(data)
			
		}
	});
}

//搜索操作，下一页
		function upCurrent_click(){
			var a=getRequest();
        	var index_id=a['subSceneId'];
		$.ajax({
		type:"POST",
		url: houtaiurl+"DevelopScenesController/getSceneInfos.action?subSceneId="+index_id,
		success:function(data){
			if(data.length>0){
				upCurrent_clickShow(data);
			}
		}
	});
}

//搜索操作，上一页
		function downCurrent_click(){
			var a=getRequest();
        	var index_id=a['subSceneId'];
		$.ajax({
		type:"POST",
		url: houtaiurl+"DevelopScenesController/getSceneInfos.action?subSceneId="+index_id,
		success:function(data){
			if(data.length>0){
				downCurrent_clickShow(data);
			}
		}
	});
}

//在页面上显示数据
function setTableBodyRows(result) {
	//页面总数
	var totalInfo = parseInt(result.length);
	if (totalInfo % 10 != 0) {
		totalInfo = parseInt(totalInfo / 10) + 1;
	} else {
		totalInfo = parseInt(totalInfo / 10);
	}
	var totalPage = $("#totalInfos");
	totalPage.empty();
	totalPage.append(totalInfo);

	//总数量
	var alls = result.length;
	var allModels = $("#allModel");
	allModels.empty();
	allModels.append(alls);

	var tbody = $("#treeTbody");
	//清空tbody中的内容
	tbody.empty();
	var i = 0;
	var j = 10;
	if (j > alls) {
		j = alls;
	}
	console.log(result)
	for (; i < j; i++) {
		console.log(result[i])
		if (result[i] != null) {
			var tr = $("<tr></tr>");
			tr.append("<td>" + result[i].customName + "</td>");
			tr.append("<td><img alt=\"缩略图\" height=\"50\" width=\"50\" src=\"" + imgurl + "/" + result[i].userKey + "/" + result[i].id + "/" + result[i].photoName + "\"></td>");
			tr.append("<td style='padding-left: 0px;'><input class='layui-btn' type='button' value='删除' onclick=\"deleteTree(\'" + result[i].scene_Id + "\')\"/><input class='layui-btn' type='button' value='编辑' onclick=\"create(\'" + result[i].id + "\',\'" + result[i].customName + "\')\"/></td>");
			tbody.append(tr);
		}
	}
}

//下一页
function upCurrent_clickShow(result){
		//得到页面页数信息
		var	pageCurrent_=$("#currentPage");
			var totals=result.length;
			//每页显示
			var pageCurrent=parseInt($("#currentPage").text());
			var totalPage_=parseInt($("#totalInfos").text());
			var i=pageCurrent*10;
			if(pageCurrent<totalPage_){
				pageCurrent=parseInt(pageCurrent)+1;
				pageCurrent_.empty();
				pageCurrent_.append(pageCurrent);
				var tbody=$("#treeTbody");
		//清空tbody中的内容
			tbody.empty();
			var j=10;
			if(result.length-i<10){
				j=totals;
			}else{
			var j=pageCurrent*10;
				
			}
		for(;i<j;i++){
			var tr=$("<tr></tr>");
			tr.append("<td>"+result[i].nmae+"</td>");
			tr.append("<td><img alt=\"缩略图\" height=\"50\" width=\"50\" src=\""+imgurl+"/"+result[i].userKey+"/"+result[i].id+"/"+result[i].photoName+"\"></td>");
			tr.append("<td><input type='button' value='删除' onclick=\"deleteTree(\'"+result[i].scene_Id+"\')\"/></td>");
			tbody.append(tr);
				
			}
			
		}
	}
	
//上一页
	function downCurrent_clickShow(result){
		//得到页面页数信息
			var	pageCurrent_=$("#currentPage");
			
		
			var totals=result.length;
			//每页显示
			var pageCurrent=parseInt($("#currentPage").text());
			var totalPage_=parseInt($("#totalInfos").text());
			if(pageCurrent>1){
				pageCurrent=parseInt(pageCurrent)-1;
				pageCurrent_.empty();
				pageCurrent_.append(pageCurrent);
				var tbody=$("#treeTbody");
		//清空tbody中的内容
			tbody.empty();
			var i=(pageCurrent-1)*10;
			var j=10;
			if(result.length-i<10){
				j=totals;
			}else{
			var j=pageCurrent*10;
				
			}
		for(;i<j;i++){
			var tr=$("<tr></tr>");
			tr.append("<td>"+result[i].nmae+"</td>");
			tr.append("<td><img alt=\"缩略图\" height=\"50\" width=\"50\" src=\""+imgurl+"/"+result[i].userKey+"/"+result[i].id+"/"+result[i].photoName+"\"></td>");
			tr.append("<td><input type='button' value='删除' onclick=\"deleteTree(\'"+result[i].scene_Id+"\')\"/></td>");
			tbody.append(tr);
				
			}
			
		}
	}
	
		function deleteTree(modelId){
			//var url_1="ModelController/deleteModel.action"
			var url_1=houtaiurl+"DevelopScenesController/delScenecontents.action"
			var model_Id={Id:modelId};
			$.post(url_1,model_Id,function(result){
				
					alert("删除成功！")
				
				
				doGetObjects();
			});
			/*$.post(url_1,model_Id,function(result){
				doGetObjects();
			});*/
		}
		
function create(modelId,str){
	window.location='create.html?subSceneId=' + modelId+"&name="+str;
	 //$("#insertTree").attr({ onclick: "window.location='create.php?subModelId=" + modelId+"'" });
}