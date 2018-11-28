// JavaScript Document
var fileType;//上传文件类型
function $(id)
{
	return document.getElementById(id);
}


function getXmlHttpObject()
{
	var xmlHttpRequest;
	if(window.ActiveXObject)
		{
			xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			//alert('ie');
		}
	else 
		{
			xmlHttpRequest = new XMLHttpRequest();
			//alert('谷歌');
		}
	return xmlHttpRequest;
}

function send_ac()
{
//alert ("?");
	//0: 请求未初始化
//	1: 服务器连接已建立
//	2: 请求已接收
//	3: 请求处理中
//	4: 请求已完成，且响应已就绪
	$('hit_musfile').style.color = "green";
	if(myxmlhttp.readyState==1)
		{
			if(fileType=='music')
				{
					$('hit_musfile').innerText = "服务器连接已建立";
					console.log($('hit_musfile').innerText);
				}
			else if(fileType=='radio')
				{
					$('hit_radiofile').innerText = "服务器连接已建立";
					console.log($('hit_radiofile').innerText);
				}
		}
	if(myxmlhttp.readyState==2)
		{
			if(fileType=='music')
				{
					$('hit_musfile').innerText = "上传文件请求已接收";
					console.log($('hit_musfile').innerText);
				}
			else if(fileType=='radio')
				{
					$('hit_radiofile').innerText = "上传文件请求已接收";
					console.log($('hit_radiofile').innerText);
				}
		}
	if(myxmlhttp.readyState==3)
		{
			if(fileType=='music')
				{
					$('hit_musfile').innerText = "正在上传文件，请耐心等待";
					console.log($('hit_musfile').innerText);
				}
			else if(fileType=='radio')
				{
					$('hit_radiofile').innerText = "正在上传文件，请耐心等待";
					console.log($('hit_radiofile').innerText);
				}
		}
	if(myxmlhttp.readyState==4)
		{
			//alert ('?');
			//$('show_img').src = "../music/1.mp3";
			$('show_mus').src = "";
			if(myxmlhttp.status>=200&&myxmlhttp.status<300||myxmlhttp.status==304)
				{
					//var mesRes = myxmlhttp.responseText;
					var mesXml = myxmlhttp.responseXML;
					//var content = mesRes.getElementsByTagName("content");
					//sendTime[i].childNodes[0].nodeValue
					
					
					var file_name = mesXml.getElementsByTagName("file_name");
					var is_file = mesXml.getElementsByTagName("is_file");
					
					var hit_mus = mesXml.getElementsByTagName("hit_mus");
					var mus_id = mesXml.getElementsByTagName("mus_id");
					var mus_type = mesXml.getElementsByTagName("mus_type");
					
					var hit_mes = mesXml.getElementsByTagName("hit_mes");
					
					//alert (mesRes);
					if(type_hit=='picture')
						{
							//var name = file_name[0].childNodes[0].nodeValue;
							$('hit_picfile').innerText = hit_mes[0].childNodes[0].nodeValue;
							//$('hit_musfile').innerText = name;
							if(is_file[0].childNodes[0].nodeValue=='true')
								{
									
									
									$('show_img').src = "../picture/"+file_name[0].childNodes[0].nodeValue;
									//$('show_img').src = "upload/picture/QQu56feu7247.jpg";
									//$('show_img').src = "upload/picture/"+escape(file_name[0].childNodes[0].nodeValue);
									//$('show_img').src = "upload/picture/"+(escape(file_name[0].childNodes[0].nodeValue));
								}
							
							$('hit_musfile').innerText = '';
						}
					else if(type_hit=='music')
						{
							 //console.log("2");
							if(is_file[0].childNodes[0].nodeValue=='true')
								{
									$('show_mus').controls = 'controls';
									$('show_mus').src = "../music/"+mus_id[0].childNodes[0].nodeValue+mus_type[0].childNodes[0].nodeValue;
								}
							else
								{
									$('show_mus').controls = '';
									$('show_mus').src = '';
								}
							 //console.log("3");

							$('hit_musfile').innerText = hit_mes[0].childNodes[0].nodeValue+hit_mus[0].childNodes[0].nodeValue+';'
						    //console.log("嘿嘿嘿");	//+mus_id[0].childNodes[0].nodeValue+mus_type[0].childNodes[0].nodeValue;
							//$('hit_picfile').innerText = is_mus[0].childNodes[0].nodeValue;
							//$('hit_picfile').innerText = '';
						}
					else if(type_hit=='radio')
						{
							$('hit_radiofile').innerText = hit_mes[0].childNodes[0].nodeValue+hit_mus[0].childNodes[0].nodeValue+';'
						}
				}
			console.log($('hit_radiofile').innerText);
		}
}

var myxmlhttp="";
var type_hit ="";
function send_file(file_type)
{
	myxmlhttp = getXmlHttpObject();
	if(myxmlhttp)
		{
			type_hit = file_type;
			var url="UploadFileAjax.php";
			var formData = new FormData();
			if(file_type=='picture')
				{
					formData.append("ajax_picfile",$('pic_file').files[0]);
				}
			else if(file_type=='music')
				{
					formData.append("ajax_musfile",$('mus_file').files[0]);
				}
			else if(file_type=='radio')
				{
					formData.append("ajax_radiofile",$('radio_file').files[0]);
				}
			
			myxmlhttp.open("post",url,true);
			//myxmlhttp.setRequestHeader("Content-Type","multipart/form-data");//传递formdata中的东西，不需要设置header，否则会出错
			myxmlhttp.send(formData);
			myxmlhttp.onreadystatechange=send_ac;
		}
	//$('hit').innerText = file_type;
	//$('show_img').src = "upload/picture/timg.jpg";
	//window.location.href='UploadFile.php';
}


function ajax_fileup(file_type)
{
	fileType = file_type;
	send_file(file_type);
	//$('hit').innerText = file_type;
}

$('summer').onkeyup = function(event){
	var keycode = event.keyCode;
	//console.log(keycode);
	if(keycode==13&&this.value.length>0)
		{
			show_summer(this.value);
			$("hit_summer").innerText = "口令验证中";
		}
	else if(keycode==13&&this.value.length==0)
		{
			$("hit_summer").innerText = "口令不能为空";
		}
};

function send_pa(){
	
	if(myxmlhttp.readyState==4)
		{
			if(myxmlhttp.status>=200&&myxmlhttp.status<300||myxmlhttp.status==304)
				{
					var mesXml = myxmlhttp.responseXML;
					var isTrueTag = mesXml.getElementsByTagName('isTrue');
					//console.log(isTrueTag);
					var isTrue = isTrueTag[0].innerHTML;
					//console.log(isTrue);
					if(isTrue=='true')
						{
							$("ajax_radio").style.display = "inline";
							$("hit_summer").innerText = "验证成功";
							$('summer').value = '';
						}
					else
						{
							$("hit_summer").innerText = "口令错误";
							$('summer').value = '';
							$("ajax_radio").style.display = "none";
						}
				}
			
		}

}

function show_summer(value){
	myxmlhttp = getXmlHttpObject();
	if(myxmlhttp)
		{
			var url="UploadFileAjax.php";
			var data = "password="+value;
			myxmlhttp.open("post",url,true);
			myxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			myxmlhttp.onreadystatechange=send_pa;
			myxmlhttp.send(data);
			//console.log(value);
		}

}






