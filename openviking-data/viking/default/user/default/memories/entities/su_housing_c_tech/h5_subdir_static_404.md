# 苏服办H5子目录部署静态资源404
苏服办H5部署在ydzt.jszwfw.gov.cn子目录下，因绝对路径/static导致404，新增resolveStaticUrl统一处理。

## 问题根因
- 苏服办H5部署在 `ydzt.jszwfw.gov.cn` 子目录（vite生产环境base: './'）
- 大量代码使用绝对路径 `/static/...` 或错误运行时相对路径 `../../static/...`
- 浏览器请求到域名根目录导致404

## 解决方案
- 在utils/index.js新增统一工具函数resolveStaticUrl(src, subpackage?)
- H5生产环境生成./static/...或./page-query/static/...等相对路径
- 增强resolveMediaUrl自动识别images/、/static/、/images/等本地静态资源
- 修改24个文件含utils/index.js、components/ZsImage/ZsImage.vue、Home_Suzhufang.vue、My_Suzhufang.vue、Community_Suzhufang.vue、Project_Suzhufang.vue等

## 验证与归属
- 验证证据：extracted source=cursor session=91e19c66-ea53-4696-8d39-418b79f76553
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话：91e19c66-ea53-4696-8d39-418b79f76553；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "h5_subdir_static_404",
  "source_extraction_id": "de6419ee06b04af68200113dcef4346b",
  "version": 1,
  "memory_type": "entities"
}
-->