
# uni.scss 相对路径导入构建失败修复
苏住房C(zhi2-mobile-shimin)构建失败因 uni.scss 中使用相对路径导入，已被各页面文件错误解析，改为别名路径后构建通过。

## 问题根因
- uni.scss 中使用相对路径 @import './styles/zs-button.scss'
- uni.scss 会被注入到每个页面样式中，相对路径按当前页面文件解析（如 pages_tab/benefit/index.vue）而非 src/uni.scss，导致找不到 styles/zs-button.scss

## 修复方案
- 将导入改为项目统一别名路径：@import '@/styles/zs-button.scss';（与 @import "@/styles/btn.scss" 等写法一致）
- npm run build 已成功通过

## 验证与归属
- 所属项目：苏住房C；来源会话：8f10f353-5bab-456e-8115-00b593a5bd85
- 涉及文件：src/uni.scss、pages_tab/benefit/index.vue
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "uni_scss_import_fix",
  "source_extraction_id": "85eda2beba664de9b5d23d9ab50c962c",
  "version": 1,
  "memory_type": "entities"
}
-->