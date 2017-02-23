function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function onImageLoad(e, that) {

}
function onImageLoadError(e, that) {
  var error_ref = e.currentTarget.dataset.errorRef,
    error_url = e.currentTarget.dataset.errorUrl,
    error_obj = {};
  error_obj[error_ref] = error_url;
  that.setData(error_obj);
}
module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  onImageLoad: onImageLoad,
  onImageLoadError: onImageLoadError
}
