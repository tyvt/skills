# 管理员维护与变更共用 detail.vue
zhi2-web-admin 中「管理员维护」与「管理员变更」共用 detail.vue（zhi2-web-admin/src/views/company/companyAdmin/detail.vue），变更入口 developer/detail.vue 写死 :is-change="true"。

## 行为机制
- 变更入口 developer/detail.vue 设置 :is-change="true"，使 changeActive 为真。
- 当 changeActive 为真，businessName 从 companyAdmin 切换为 companyAdminChange。
- 通用保存方法据此拼出 POST /company/companyAdminChange/add，查看拼出 /company/companyAdminChange/detail。

## 影响与排查
- 变更单本不走新增接口，而是已有管理员点「变更」后由 getLast 生成，故误调用返回 400。
- 若菜单把「管理员维护」配成变更组件，或两条详情 path 均为 companyAdmin/:tableid，先注册的变更路由会吃掉维护的新增和查看。
- 开发库菜单正确（维护详情指向 companyAdmin/developer/detail，变更指向 companyAdminChange），客测库缺失 companyAdmin 菜单集时会误入变更路由。


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "company_admin_detail_shared",
  "source_extraction_id": "96880db863e64627b65b98cf8445e38b",
  "version": 1,
  "memory_type": "entities"
}
-->