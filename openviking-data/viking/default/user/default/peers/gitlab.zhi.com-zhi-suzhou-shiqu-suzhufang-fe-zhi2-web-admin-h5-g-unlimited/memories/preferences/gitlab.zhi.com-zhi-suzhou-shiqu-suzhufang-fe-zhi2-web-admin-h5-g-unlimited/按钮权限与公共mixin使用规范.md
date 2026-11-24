- 要求页面所有操作按钮都接入真实安全权限码，不接受 permission:true 这类绕过校验的写法。
- 编辑、删除按钮统一使用公共 mixin 的 editButton/deleteButton，不自行重复实现按钮配置。
- 自定义业务按钮（如反馈进度、处置完成）保留自定义结构，但必须补 :permission 真实权限码。
- 权限码以菜单/系统配置为准，按实际码取值（如删除用 delete 而非 remove），必要时覆盖 mixin 默认 permissionType。
- 禅道缺陷修复后需回写禅道、反馈进度，并附验证截图作为佐证。
- 同一按钮权限码不得与同类页面共用：需换成独立字符隔离（覆盖 extraPerms/permsPrefix，不动 businessName），且新字符须与后端菜单配置一致。

<!-- MEMORY_FIELDS
{
  "user": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "topic": "按钮权限与公共mixin使用规范",
  "source_extraction_id": "1a0e7b46db974b45bfcadd1f5fbc4962",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "preferences"
}
-->