function getUploadFileExt(fileName) {
  // 截取字符串最后一个点
  // let ext = fileName.substring(0, fileName.lastIndexOf('.'))
  // 获取到文件后缀
  let ext = fileName.split('.')
  return ext[ext.length - 1]
}

module.exports = getUploadFileExt
