# zs-select 组件仅支持 options 属性传参

zhi3-web-admin-h5-g 项目中 zs-select 组件仅通过 :options 属性接收下拉选项，不支持 zs-option 子节点写法。

## 背景
- 监管机构管理、主账户管理、监督开户确认、监管账户四个详情页最初使用 <zs-option v-for> 子元素写法，导致下拉显示「无数据」。
- 字典接口与数据均正常（REGULATOR_ORG_TYPE 返回 count:1），问题在前端组件用法。

## 解决方案
- 改为 <zs-select :value.sync="..." :label.sync="..." :options="xxxOptions"> 无子元素写法。
- 协议版本等字段需做 dictLabel/dictValue 结构映射（如 agreementVersionSelectOptions 计算属性）。

## 验证与归属
- 2026-11-02 浏览器 UI 实测发现下拉「无数据」，根因定位为 zs-select 不支持 zs-option 子节点。
- 涉及文件：监管机构、主账户、监督开户确认、监管账户等 5 个详情页。
- 所属项目：zhi3-web-admin-h5-g。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "zs_select_options_prop",
  "source_extraction_id": "02bbd63fa1f2447f91ec80c61f9b32df",
  "version": 1,
  "memory_type": "entities"
}
-->