Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds(),             //毫秒
    // "W"  : this.weekday()
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
};

export default {
  autoAddEllipsis(pStr, pLen){
    let _ret = cutString(pStr, pLen);
    let _cutFlag = _ret.cutflag;
    let _cutStringn = _ret.cutstring;

    if ("1" == _cutFlag) {
      return _cutStringn + "...";
    } else {
      return _cutStringn;
    }

    function cutString(pStr, pLen) {

      // 原字符串长度
      var _strLen = pStr.length;

      var _tmpCode;

      var _cutString;

      // 默认情况下，返回的字符串是原字符串的一部分
      var _cutFlag = "1";

      var _lenCount = 0;

      var _ret = false;

      if (_strLen <= pLen/2) {
        _cutString = pStr;
        _ret = true;
      }

      if (!_ret) {
        for (var i = 0; i < _strLen ; i++ ) {
          if (isFull(pStr.charAt(i))) {
            _lenCount += 2;
          } else {
            _lenCount += 1;
          }

          if (_lenCount > pLen) {
            _cutString = pStr.substring(0, i);
            _ret = true;
            break;
          } else if (_lenCount == pLen) {
            _cutString = pStr.substring(0, i + 1);
            _ret = true;
            break;
          }
        }
      }

      if (!_ret) {
        _cutString = pStr;
        _ret = true;
      }

      if (_cutString.length == _strLen) {
        _cutFlag = "0";
      }

      return {"cutstring":_cutString, "cutflag":_cutFlag};
    }

    function isFull (pChar) {
      if ((pChar.charCodeAt(0) > 128)) {
        return true;
      } else {
        return false;
      }
    }
  },
  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
}