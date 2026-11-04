# 引导聚焦padding致顶部按钮边框裁切

根因：driver.js默认给聚焦区加10px padding，使贴顶(`top:0`)「切换项目」按钮聚焦框上溢视口被裁，外border加剧。修复：设`padding:0`使框贴合，红色标识改内描边`box-shadow: inset`，验证前清`localStorage.driverProjectSwitch`。

**验证证据**：src=园区物管2.0/028.md

**涉及文件**：d:/repository/园区物管2.0/zhi2-web-admin/src/views/home/bProjectDialog.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/utils/driver.js、d:/repository/园区物管2.0/zhi2-web-admin/src/styles/index.scss、d:/repository/园区物管2.0/zhi2-web-admin/node_modules/driver.js/dist/driver.min.css、d:/repository/园区物管2.0/zhi2-web-admin/src/layout/components/Navbar.vue、d:/repository/园区物管2.0/zhi2-web-admin/package.json、d:/repository/园区物管2.0/zhi2-web-admin/src/App.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/main.js

**所属项目**：园区物管2.0
**来源会话**：b97cc65a-b35d-4756-a207-7c59f24b16eb
**代码基线**：none
<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "driver_top_clip",
  "source_extraction_id": "2e723bb38f8049e6a07ff416b0c2139b",
  "version": 1,
  "memory_type": "entities"
}
-->