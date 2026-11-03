# H5子目录部署静态资源404需统一相对路径
苏住房C市民端H5部署在子目录下，代码大量使用绝对路径/static/...导致资源请求到域名根而404，新增resolveStaticUrl并增强resolveMediaUrl统一转相对路径。

## 问题现象
- 苏住房C市民端H5部署在ydzt.jszwfw.gov.cn子目录(vite生产base:'./')，线上大量本地静态图404
- 最典型空态图GET https://ydzt.jszwfw.gov.cn/static/images/empty.png请求打到域名根而非应用子路径
- 本地dev(base '/')页面在根层，绝对/相对路径异常均不暴露，仅部署子目录才出现

## 根因
- 代码写绝对路径/static/images/...被浏览器解析到域名根
- 手写相对路径./../static/...在嵌套深页面层级算错
- 两者在本地dev环境均看不出异常，仅子目录部署暴露

## 解决方案
- utils/index.js新增统一工具resolveStaticUrl(src, subpackage?)，H5生产生成./static/...或./page-query/static/...
- 增强resolveMediaUrl自动识别images/、/static/、/images/走同一解析
- 全量替换引用点共24文件(Tab首页/我的/社区/项目、菜单组件、custom-tab-bar、store/menu.js、业务页、业主模块、查询分包)
- ZsImage、ZsEmpty基础组件取图入口统一收敛到上述工具
- 不需改：import图片、CSS相对url()、page-query分包CSS(Vite处理)；menus.fallback.json的/static/经MenuImage→resolveMediaUrl自动转

## 验证与归属
- 验证：会话91e19c66用户报empty.png 404并要求全量排查，新增resolveStaticUrl增强resolveMediaUrl共改24文件后修复
- 验证重点：重新部署后核查空态图、首页顶部图与图标、底部Tab图标、在线服务卡片背景、分包内PDF/图标
- 涉及文件：src/utils/index.js、src/components/ZsImage/ZsImage.vue、src/components/ZsEmpty/ZsEmpty.vue、vite.config.ts、.env.production
- 所属项目：苏住房C；来源会话ID：91e19c66-ea53-4696-8d39-418b79f76553；代码基线：a444c05

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "h5_static_404",
  "source_extraction_id": "c55f157f273a42cf88ad1d855a226491",
  "version": 1,
  "memory_type": "entities"
}
-->