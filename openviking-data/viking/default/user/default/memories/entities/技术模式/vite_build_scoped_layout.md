# Vite build 产物 scoped 样式布局错乱
vite build 产物与本地 dev 的 scoped 样式编译和 CSS 合并顺序不同，导致依赖父级 flex 行布局的提示语在生产环境排版错乱。
## 问题现象
- survey 模板 TopicDialog 的题目分组提示语（.topic-group-tip）本地 dev 正常，生产环境（www.ylzhwy.com:8081，vite build 产物）排版错乱
- 写死宽度或依赖父级 flex 行布局的提示语在生产侧被挤成窄条或错行，dev 环境复现不出
## 根因
- 本地 dev 与 build 产物的 scoped 样式编译、CSS 合并顺序不同
- 这类布局问题在 dev 环境下复现不出来，靠肉眼验证等于没验证
## 解决方案
- 涉及布局的生产问题一律以 build 产物为准核对，不靠 dev 肉眼验证
- 提示语块显式撑满整行：width: 100% + flex-basis: 100%
- 通过 :deep(.el-form-item__content) 把外层表单项内容改成纵向 flex，让提示语落在控件下方
- :deep() 必须是 scoped 块里可编译的写法，生产验证需说明「需重新构建部署后生效」
- 改完按仓库分支口径 cherry-pick 到对应版本分支（develop/v2.6.2、develop/v2.6.1），而非只留开发分支
## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/survey/template/components/TopicDialog.vue、src/styles/element-ui.scss、src/styles/index.scss
- 所属项目：产品2.0；代码基线：71e6ed9
- 来源会话ID：e1ad93b0-6622-47db-907c-870e43850734；cherry-pick 到 develop/v2.6.2（0e8e5ad22）与 develop/v2.6.1（02155506c）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_build_scoped_layout",
  "source_extraction_id": "5a1f60793990469a86c8c5a93e7974f0",
  "version": 1,
  "memory_type": "entities"
}
-->