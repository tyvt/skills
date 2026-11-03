# 苏服办登录漏调V2换V1 token
苏住房C的苏服办免登链路initSfbUser只写V2 token漏换V1，导致依赖apiV1功能不可用。

## 现象
- 苏服办(ticket换token免登)登录成功后，依赖apiV1的文件上传、交易等功能全部不可用
- 普通登录页、扫码redirect页一切正常

## 根因
- 项目有V2(主接口szf.szzfcjj.cn,/api)与V1(http://szfang.szfcweb.cn,/prod-api)两套token
- 普通登录页与redirect/index.vue拿到accessToken后会调getTokenV1()换V1 token写入userStore.tokenV1
- 苏服办逻辑独立写在App.vue的initSfbUser里(ticket换token)，只写了V2 token，漏了换V1这一步
- 这是一条并行的第三套登录链路

## 修复与可复用套路
- 在initSfbUser设置完V2 token后立即await getTokenV1()
- 按data.code==200把data.msg存进userStore.setTokenV1
- 失败也要显式setTokenV1('')，保持与其它登录入口一致
- 新增任何登录/免登入口时，把「存V2 token + 换V1 token」收敛成一个共用函数
- 三个入口都调它，避免再次漏写

## 验证与归属
- 来源会话cf09ca87(基线0d96de2)：用户指出苏服办登录成功后需立刻调用V2换V1 token接口
- 涉及文件：App.vue、store/user.js、pages/redirect/index.vue、api/index.js
- 所属项目：苏住房C

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "sfb_v1_token",
  "source_extraction_id": "91c4dec38b054bbba12cbff6d880442c",
  "version": 1,
  "memory_type": "entities"
}
-->