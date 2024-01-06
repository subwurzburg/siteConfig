
function isWechat() {
  var ua = navigator.userAgent.toLowerCase();
  var isWeiXin = ua.indexOf('micromessenger') != -1;

  if (isWeiXin) {
    $('#JweixinTip').show();
  } else {
    $('#JweixinTip').hide();
  }
}

var downloadDomain;
function getDownloadDomain() {
  var params = parseParams();
  var host = params.host
  var chn = params.chn
  if (host){
    $.ajax({
      type: 'get',
      url: 'https://'+ host +'/api/download_links/?chn='+chn,
      success: function (data) {
        if (data){
          downloadDomain = data.data;
        }
      },
      error: function (xhr, type) {

      }
    })
  }
}

// 初始化环境信息
function initEnv() {
  isWechat();
  getDownloadDomain();
}

function isIphone() {
  var ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('iphone') != -1 || ua.indexOf('ipad') != -1;
}

/**
 * SCTitle棋牌官网 */
function SCDLName() {
  let platform = 'android';
  if (isIphone()) {
    platform = 'ios';
  }
  if (typeof($('#download_tip').data('download_tip_exist')) == 'undefined') {
    let download_tip_html = '<div data-download_tip_exist=1 style="position:fixed; z-index:999999; bottom:80px; width:100%; text-align:center; display:none;" id="download_tip"><p style="color:#fff; background-color:rgba(0, 0, 0, 0.8); font-size:12px; display:inline-block; padding:5px 10px; border-radius:3px;">正在加载中，请稍候...</p></div>';
    $('body').append(download_tip_html);
  }
  $('#download_tip').show();
  setTimeout(function () {
    $('#download_tip').hide();
  }, 5000);

  var download_fun = function () {
    let target;
    if (platform === 'ios') {
      target = 'SCIOSUrl';
      location.href = target;
    } else {
      target = 'SCAndriodUrl';
      tmp = target.split('.')
      if (tmp[tmp.length -1] !== 'apk') {
        target = target.replace(tmp[tmp.length -1], 'apk');
      }
      location.href = target
    }
  }

  check_refer(download_fun)
}

/**
 * SCTitle落地页*/
function SCDLNameOl() {
  let platform = 'android';
  if (isIphone()) {
    platform = 'ios';
  }
  if (typeof($('#download_tip').data('download_tip_exist')) == 'undefined') {
    let download_tip_html = '<div data-download_tip_exist=1 style="position:fixed; z-index:999999; bottom:80px; width:100%; text-align:center; display:none;" id="download_tip"><p style="color:#fff; background-color:rgba(0, 0, 0, 0.8); font-size:12px; display:inline-block; padding:5px 10px; border-radius:3px;">正在加载中，请稍候...</p></div>';
    $('body').append(download_tip_html);
  }
  $('#download_tip').show();
  setTimeout(function () {
    $('#download_tip').hide();
  }, 5000);

  var download_fun = function () {
    let target;
    if (platform === 'ios') {
      target = downloadDomain.ios_url;
      let nocache = new Date().getTime();
      location.href = './trust_SCSiteName.html?href=' + encodeURIComponent(target) + '&t=' + nocache
    } else {
      target = downloadDomain.apk_url;
      location.href = target
    }
  }
  check_refer(download_fun)
}

// 复制到粘贴板
function copyTextToClipboard(str) {
  var el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style = {position:'absolute', left: '-9999px'};
  document.body.appendChild(el);

  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    // save current contentEditable/readOnly status
    var editable = el.contentEditable;
    var readOnly = el.readOnly;

    // convert to editable with readonly to stop iOS keyboard opening
    el.contentEditable = true;
    el.readOnly = true;

    // create a selectable range
    var range = document.createRange();
    range.selectNodeContents(el);

    // select the range
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    el.setSelectionRange(0, 999999);

    // restore contentEditable/readOnly to original state
    el.contentEditable = editable;
    el.readOnly = readOnly;
  } else {
    el.select();
  }

  document.execCommand('copy');
  document.body.removeChild(el);
}

function check_refer(realDownload) {
  var params = parseParams();
  var copy = '';
  function trackDownload () {
    $.ajax({
      type: 'POST',
      url: 'https://api.iieeo.com/api/v20/act/promoter/track/download/',
      data: {
        'refer_id': Number(params.refer_id),
      },
      success: function (data) {
        realDownload()
      },
      error: function (xhr, type) {
        realDownload()
      }
    })
  }
  if (params.chn != null) {
    if (isIphone()){
      if (params.refer_id != null ){
        copy = JSON.stringify({"refer_id": params.refer_id, "refer_chn": params.chn});
        trackDownload()
      }else {
        copy = JSON.stringify({"refer_chn": params.chn})
        realDownload()
      }
      copyTextToClipboard(copy);
    }else {
      if (params.refer_id != null){
        copy = JSON.stringify({"refer_id": params.refer_id})
        copyTextToClipboard(copy);
        trackDownload()
      }else {
        realDownload()
      }
    }
  } else if (params.refer_id != null) {
    copy = JSON.stringify({"refer_id": params.refer_id})
    copyTextToClipboard(copy);
    trackDownload()
  }else {
    realDownload()
  }
}
