# filePreview下载地址被正则压坏协议头
在苏住房C小程序中，filePreview的小程序分支用`${BASE_URL}${url}.replace(/\/\//g, "/")`拼接域名，把`https://`压成`https:/`，导致downloadFile报invalid url。
## 根因
- 后端返回相对路径，前端手拼域名+去重斜杠时正则全局替换双斜杠，连协议头一起吃掉
- 微信侧校验协议失败，判为非法URL，非网络或白名单问题
## 解决方案
- 统一走项目已有`resolveMediaUrl`（src/utils/index.js），按路径前缀正确选择域名、只处理路径段重复斜杠
- 修改点收在`filePreview`一处，所有调用方（FileList/Type2/contracts附件、收入信息等）自动生效
## 验证与归属
- 验证：会话114830fb，contracts.vue附件点击报invalid url；修复为改用resolveMediaUrl
- 涉及文件：src/utils/index.js、contracts.vue、FileList.vue、Type2.vue、api/common.js
- 所属项目：苏住房C；来源会话ID：114830fb-d6f5-4964-849d-72fac1151285；代码基线：b7bf813

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "downloadfile_invalid_url",
  "source_extraction_id": "b9d8b7ebce554cb182f77784992bd5df",
  "version": 1,
  "memory_type": "entities"
}
-->