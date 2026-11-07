# 苏服办网关上传参数须传{file}
苏住房C市民端在苏服办H5内上传签字图片时因调用方传{files:[...]}导致网关静默退化成普通POST，签名图片被丢弃且无报错。

## 问题现象与根因
- 上传签字图片报「请求异常」，无字段级错误；网关日志显示走POST业务接口szffluzm-whyhxx、version=2.1、header含zs-sign/zs-param，FormData无file字段
- api/gateway.js靠config.file真假判定是否文件上传；有才切到上传专用interface_id(szffluzm-wjsc)+精简header+version=v2.1
- httpInstance.js的file()只读data.file或data.filePath；调用方写fileUpload({files:[{file,name:'file'}]})时config.file为undefined，整条链路静默按普通POST发出

## 解决方案
- H5上传一律传扁平对象fileUpload({file})，与ImageUploader、ZsUploader等组件一致；仅需换字段名时用name
- 验收标准：日志出现interface_id=szffluzm-wjsc、version=v2.1、header不再有zs-sign/zs-param
- 新写上传调用点按这四条特征自查，而非只看有无报错

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话79a544a0用户贴网关日志对比；定位gateway.js第222-232行isFileUpload=!!config.file，httpInstance.js第214-223行file:data.file||data.filePath；根因SignBoard.vue写fileUpload({files:[...]})；修复为fileUpload({file})
- 涉及文件：src/components/SignBoard.vue、src/api/gateway.js、src/api/httpInstance.js、src/api/file.js
- 所属项目：苏住房C；来源会话ID：79a544a0-5a29-4c3d-acb1-c80b3b9dfa2c；代码基线：77666f8

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "gateway_file_param",
  "source_extraction_id": "3ba05a2df0ba496eb9f6fc33290d5132",
  "version": 1,
  "memory_type": "entities"
}
-->