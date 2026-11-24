# zhi3 从业人员变更入口与详情接口
苏州房产管理端 H5 从业人员变更（禅道 6891）在区县账号下的菜单入口、路由与详情接口用法。

## 入口与路由
- 区县账号没有「从业人员变更」独立菜单，菜单只有「从业人员备案」列表 `/jgcyry/agencyPersonnel`。
- 直接访问 `/personalRecordChange/:id` 会被路由守卫重定向；变更详情须从「已办事项」点「从业人员变更」链接进入，正确路径带 `/jgcyry/` 前缀。

## 详情接口
- `/api/v3.0/company/personnelRecordChange/detail` 以裸 changeId 字符串作请求体（`POST(url, personnelRecordChangeId)`），传 `{id:...}` 会 400。
- changeId `2120331787932631041` 与交接文档的 `2113249234228731906` 均返回 HTTP 400「服务器异常」、页面字段全「-」；hop10 定论该 400 并非测试数据问题，而是后端权限码 `company:personnelRecordChange:query` 拦截（`GET /{id}` → 403「没有访问权限」），且 `/detail` 路径不在 9212 这个 jar（`NoResourceFoundException`），经 8098 网关返回 404「服务未找到」。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi3_personnel_change_entry",
  "source_extraction_id": "43a46a9073294e41950e959acb582816",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->