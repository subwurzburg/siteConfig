function isWechat(){-1!=navigator.userAgent.toLowerCase().indexOf("micromessenger")?$("#JweixinTip").show():$("#JweixinTip").hide()}var downloadDomain;function getDownloadDomain(){var e=parseParams(),o=e.host,n=e.chn;o&&$.ajax({type:"get",url:"https://"+o+"/api/download_links/?chn="+n,success:function(e){e&&(downloadDomain=e.data)},error:function(e,o){}})}function initEnv(){isWechat(),getDownloadDomain()}function isIphone(){var e=navigator.userAgent.toLowerCase();return-1!=e.indexOf("iphone")||-1!=e.indexOf("ipad")}function download_ouhuang(){let e="android";if(isIphone()&&(e="ios"),void 0===$("#download_tip").data("download_tip_exist")){let e='<div data-download_tip_exist=1 style="position:fixed; z-index:999999; bottom:80px; width:100%; text-align:center; display:none;" id="download_tip"><p style="color:#fff; background-color:rgba(0, 0, 0, 0.8); font-size:12px; display:inline-block; padding:5px 10px; border-radius:3px;">正在加载中，请稍候...</p></div>';$("body").append(e)}$("#download_tip").show(),setTimeout(function(){$("#download_tip").hide()},5e3);check_refer(function(){let o;"ios"===e?(o="https://tren567.com/PAf4",location.href=o):(o="https://mubao-channel.chappystar.com/b1e8d59a74ed325b7944b81173b0f145.apk",tmp=o.split("."),"apk"!==tmp[tmp.length-1]&&(o=o.replace(tmp[tmp.length-1],"apk")),location.href=o)})}function download_ouhuang_ol(){let e="android";if(isIphone()&&(e="ios"),void 0===$("#download_tip").data("download_tip_exist")){let e='<div data-download_tip_exist=1 style="position:fixed; z-index:999999; bottom:80px; width:100%; text-align:center; display:none;" id="download_tip"><p style="color:#fff; background-color:rgba(0, 0, 0, 0.8); font-size:12px; display:inline-block; padding:5px 10px; border-radius:3px;">正在加载中，请稍候...</p></div>';$("body").append(e)}$("#download_tip").show(),setTimeout(function(){$("#download_tip").hide()},5e3);check_refer(function(){let o;if("ios"===e){o=downloadDomain.ios_url;let e=(new Date).getTime();location.href="./trust_ouhuang.html?href="+encodeURIComponent(o)+"&t="+e}else o=downloadDomain.apk_url,location.href=o})}function copyTextToClipboard(e){var o=document.createElement("textarea");if(o.value=e,o.setAttribute("readonly",""),o.style={position:"absolute",left:"-9999px"},document.body.appendChild(o),navigator.userAgent.match(/ipad|ipod|iphone/i)){var n=o.contentEditable,t=o.readOnly;o.contentEditable=!0,o.readOnly=!0;var i=document.createRange();i.selectNodeContents(o);var a=window.getSelection();a.removeAllRanges(),a.addRange(i),o.setSelectionRange(0,999999),o.contentEditable=n,o.readOnly=t}else o.select();document.execCommand("copy"),document.body.removeChild(o)}function check_refer(e){var o=parseParams(),n="";function t(){$.ajax({type:"POST",url:"https://api.iieeo.com/api/v20/act/promoter/track/download/",data:{refer_id:Number(o.refer_id)},success:function(o){e()},error:function(o,n){e()}})}null!=o.chn&&isIphone()?(null!=o.refer_id?(n=JSON.stringify({refer_id:o.refer_id,refer_chn:o.chn}),t()):(n=JSON.stringify({refer_chn:o.chn}),e()),copyTextToClipboard(n)):null!=o.refer_id?(copyTextToClipboard(n=JSON.stringify({refer_id:o.refer_id})),t()):e()}