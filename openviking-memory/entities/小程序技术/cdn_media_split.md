# 图片地址两套CDN前缀分流：V1走szfang.szfcweb.cn其余走V2
苏住房C小程序zhi2-mobile-shimin接口返回媒体路径有两种世代前缀，须靠路径前缀判别落哪套base。

## 世代与根因
- V1：/zs-fym/...（如 /zs-fym/2023/05/19/xxx.jpg）；V2：/zhi2-pro、/zhi2-dev、/zhi2-test 等
- 两代文件服务是两套独立域名，前端只有一份 resolveMediaUrl 靠路径前缀判别；任何一处只用单base会静默裂开，V1图片全部加载失败

## 解决方案
- utils/index.js 维护 MEDIA_PATH_PREFIXES 全量前缀表 + V1_MEDIA_PREFIX 常量 + isV1MediaPath() 判定；H5生产走 VITE_APP_IMG_PROXY_V1，小程序走 env/mp.js 的 IMAGE_BASE_V1，其余回落 V2 的 VITE_APP_API_PROXY/IMAGE_BASE
- 新增/修改CDN域名时四处必须成对同改：.env.development、.env.production 的 VITE_APP_IMG_PROXY_V1、src/env/mp.js 的 IMAGE_BASE_V1、vite.config.ts 里 /zs-fym 的 proxy target（本次该proxy原指向V2 API是漏改点）
- 协议必须 https（曾写http真机被拦截）；改动只影响V1分支，不要顺手改V2拼接逻辑

## 验证与归属
- 验证：会话3774cb0b用户指出/zs-fym前缀图片应用 https://szfang.szfcweb.cn/ 拼接，V2图片不需修改；改resolveMediaUrl、ZsImage、vite.config.ts代理与两个env文件、src/env/mp.js
- 当前代码核实：utils/index.js:76-83维护MEDIA_PATH_PREFIXES与isV1MediaPath，143-155 buildH5AbsoluteMediaUrl分流V1/V2，389/416小程序端按isV1MediaPath选IMAGE_BASE_V1/IMAGE_BASE；env/mp.js:11,17,23三环境IMAGE_BASE_V1均为https；vite.config.ts:140-141 /zs-fym代理target取VITE_APP_IMG_PROXY_V1
- 涉及文件：src/utils/index.js、src/components/ZsImage/ZsImage.vue、src/env/mp.js、vite.config.ts、.env.production、.env.development
- 所属项目：苏住房C；来源会话ID：3774cb0b-97a2-4a97-9edb-ca41b73ddf3e；代码基线：653505a

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "cdn_media_split",
  "source_extraction_id": "69140a56f4294c209be09391c39e043a",
  "version": 1,
  "memory_type": "entities"
}
-->