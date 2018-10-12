
function _getUrlParam(name, url) {
  url = url || window.location.search
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = url.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]); return null;
}
