
# 苏住房C /zs-fym 图片地址拼接修复
苏住房C(zhi2-mobile-shimin)生产环境 H5 的 /zs-fym 前缀图片原先误用 VITE_APP_IMG_PROXY_V1 拼接，导致地址错误加载失败，已修复为统一使用 VITE_APP_API_PROXY。

## 问题根因
- 生产环境 .env.production 中 VITE_APP_API_PROXY 已配为 https://szfweb.szzfcjj.cn:8887
- resolveMediaUrl 对 /zs-fym 开头路径误走另一条逻辑，拼 VITE_APP_IMG_PROXY_V1（http://szfang.szfcweb.cn），实际请求 http://szfang.szfcweb.cn/zs-fym/xxx.jpg 而非期望的 https://szfweb.szzfcjj.cn:8887/zs-fym/xxx.jpg

## 修复方案
- src/utils/index.js：去掉 /zs-fym 特殊分支，生产 H5 下所有相对路径统一用 VITE_APP_API_PROXY 拼接
- vite.config.ts：本地开发时 /zs-fym 代理也改为指向 VITE_APP_API_PROXY，与生产一致
- swiperImage.vue：补上 :local 属性绑定
- 微信小程序侧 ZsImage.vue 的 /zs-fym 仍可用 IMAGE_BASE_V1（https://szfang.szfcweb.cn），其他用 IMAGE_BASE（V2）

## 验证与归属
- 所属项目：苏住房C；来源会话：bb5ef4f6-787c-49c9-b071-0b62385878d7、3774cb0b-97a2-4a97-9edb-ca41b73ddf3e
- 涉及文件：src/utils/index.js、src/components/ZsImage/ZsImage.vue、vite.config.ts、swiperImage.vue
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "v1_image_fix",
  "source_extraction_id": "85eda2beba664de9b5d23d9ab50c962c",
  "version": 2,
  "memory_type": "entities"
}
-->