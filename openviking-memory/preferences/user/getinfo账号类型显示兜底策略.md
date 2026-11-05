- 导航栏账号显示优先使用接口返回的 accountTypeName（若后端有返回）
- 依次尝试 sys_account_type_all、sys_account_type 两个字典将 accountType 转为中文
- 字典仍匹配不到时兜底用 deptName 显示（如「严严物业」），避免仅显示 nickName
- 修复后账号显示为「姓名（单位名称）」格式，如 卢司（严严物业）
- 适用于园区公共收益项目 layout/components/Navbar.vue、store/modules/user.js、views/system/user/detail.vue

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "getInfo账号类型显示兜底策略",
  "source_extraction_id": "ba7d59c85b1e426abf2d99029459c78e",
  "version": 1,
  "memory_type": "preferences"
}
-->