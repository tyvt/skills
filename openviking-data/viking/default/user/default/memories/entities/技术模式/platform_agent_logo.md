# 城市项目专属视觉素材抽离平台配置
带地域语义的视觉素材（如智能体形象logo）不能写死进代码仓库，应抽成 platformConfig 配置项由后端下发、未配置则不渲染。

## 问题背景
- 数据可视化-行政划分页硬编码「无锡智能体-水蜜桃形象」logo.gif，本项目是泰兴，形象与城市不符，且功能要部署到其他项目必错。
- 把地域语义素材写死在源码/静态资源，复制部署时不会改变，属同源复制项目典型污染源；图体积大（约2.8MB）进构建产物。

## 解决方案
- 系统管理-基础配置末尾加「智能体形象」字段（非必填，支持 png/jpg/jpeg/gif、单张10MB内），对应后端 agentLogo。
- 去掉代码与常量里 logo.gif 引用并删除静态资源（同时清 constants.js 引用）。
- 展示端改读 platformConfig.agentLogo，有配置才渲染、没有不渲染（不留占位图或默认形象）。
- store/modules/app.js 补 agentLogo 默认字段，ImageUpload 增加 acceptTypes 属性支持 gif 等自定义格式。
- 交付提示后端 /system/platformConfig/getInfo 与保存接口需支持该字段。推广口径：带城市/项目语义的图片、文案、默认值一律走平台配置。

## 验证与归属
- 验证证据：会话 d5195af1（基线 94b86fa）用户诉求「数智分析增加无锡智能体形象，部署其他项目不符，需单独配置删除gif用配置展示」。
- 落地为 platformConfig/detail.vue 新增字段、benefit/mapOverview 改读 platformConfig.agentLogo、删除 assets/images/mapOverview/logo.gif 与 constants.js 引用。
- 涉及文件：src/views/system/platformConfig/detail.vue、src/views/property/largeScreen/index.vue、componentMap.vue、svgMap.vue、src/store/modules/app.js。
- 所属项目：产品2.0；来源会话：d5195af1-3732-4c62-8c98-deedb2a38fa9；代码基线：94b86fa

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "platform_agent_logo",
  "source_extraction_id": "5310be18648c497aa40048c7aadc88c2",
  "version": 1,
  "memory_type": "entities"
}
-->