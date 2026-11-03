
# 同源副本空状态统一规范
苏住房C 同类详情页空状态统一为缺省图加「暂无数据」，以主字段判据加 v-else ZsEmpty 实现。
## 统一方案
- 页面外层套 flex flex-column justify-center h-full bg-fff，内容区用 v-if 主字段有值（如 detailInfo.name）包原信息模块，v-else 直接放 ZsEmpty，不另造空态组件
- 以已做对的页（业委会信息 committee/info）为模板复制结构
- 配套待统一：小区/项目信息、企业信息、街道信息、社区信息（project/info、company/info、subdistrict/info、community/info）
## 跨分支合并
- mainv2.1-mp 合并到 mainv2.1 只挑逻辑改动，保留目标分支自身引用路径（baseCard 用 @/pages/commonNew/baseCard.vue，不跟 mp 分支改 @/components/commonNew）
- 落地按「子模块先提交 + 父仓库只更新子模块指针」两步走，核对本地领先远程提交数
## 验证与归属
- 涉及文件：community/info/index.vue、subdistrict/info/index.vue、committee/info/index.vue、ZsEmpty.vue
- 所属项目：苏住房C；来源会话 6999b799；代码基线 0cea241


<!-- MEMORY_FIELDS
{
  "category": "项目约定",
  "name": "empty_state_unify",
  "source_extraction_id": "5e371535e51540189614394318a97e79",
  "version": 1,
  "memory_type": "entities"
}
-->