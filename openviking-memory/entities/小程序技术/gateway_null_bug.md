# 苏服办网关data:"null"误报网络错误
苏住房C移动端走苏服办JPAAS网关的接口在后端返回data:"null"时，前端误报「网络错误」而掩盖真实业务错误。

## 问题现象
- 接口如addOwnerByToken实际返回{"success":true,"code":0,"msg":"请求异常","data":"null"}，前端却提示「网络错误，请稍后再试」
- 用户误以为断网，真实业务错误文案被完全盖掉

## 根因
- gateway.js用isJSON(responseObj.data)判断，isJSON("null")为假，字符串"null"原样当业务数据透传
- 下游httpInstance.js拿到字符串无code/msg字段，code!=200且!=0且!=10000全成立，落到兜底showToast

## 解决方案
- gateway.js对data==="null"（及空串/"undefined"）单独分支，按msg/message/sub_msg抛真实业务错误，不当数据透传
- httpInstance.js兜底提示兼容message、sub_msg字段，三者皆无才显示「网络错误」
- 排查顺序：先curl复现看data是否为字符串"null"，再怀疑网络层

## 验证与归属
- 验证：会话949376aa用户给完整curl，agent定位gateway.js:300-304与httpInstance.js:101-104，修复后提示变「请求异常」
- 涉及文件：src/api/gateway.js、src/api/httpInstance.js、src/api/index.js
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：949376aa-2a8f-4366-9f75-db6d23ef2d53；代码基线：12ef89c

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "gateway_null_bug",
  "source_extraction_id": "1783407079064bbfa35c5b8e02609550",
  "version": 1,
  "memory_type": "entities"
}
-->