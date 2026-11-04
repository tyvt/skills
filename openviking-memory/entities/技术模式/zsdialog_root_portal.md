
# ZsDialog真机弹窗内容缺失因未用root-portal
模拟器弹窗内能看到巡检图片、真机看不到，根因是 `ZsDialog` 原地渲染 `uni-popup`，真机上受祖先层叠上下文/transform 影响，而真机验证过的 `ZsBottomPopup` 用了 `root-portal`。
## 排查结论
- 排除证书问题：`www.ylzhwy.com:19002` 证书有效（TrustAsia 泛域名，2027-01 到期，TLS 1.3），`<image>` 不受小程序域名白名单限制。
- `ZsBottomPopup` 外包 `root-portal`（弹层挂页面根节点）；`ZsDialog`（全站 20 处）原地渲染 `uni-popup`，fixed 弹层在真机受祖先层叠上下文/transform 影响，导致「模拟器正常、真机内容缺失/底层页面透出」。
## 解决方案
- `src/components/ZsDialog/ZsDialog.vue`：MP-WEIXIN 下加 `<root-portal>` 包裹 `uni-popup`，对齐 ZsBottomPopup 真机方案；`App.vue` 的 z-index 覆盖对 root-portal 内部同样生效，全站 20 处 ZsDialog 一并受益。
- 编译产物 `ZsDialog.wxml` 已确认含 root-portal。
- `src/staff/components/ZsUploader/ZsUploader.vue` 同步调整。
## 验证与归属
- 验证证据：src=泰兴小程序
- 涉及文件：src/components/ZsDialog/ZsDialog.vue、App.vue、src/staff/components/ZsUploader/ZsUploader.vue
- 来源会话ID：1f1cffd7-ca4f-4638-a390-b56e691f9e57
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsdialog_root_portal",
  "source_extraction_id": "628e445ead5342fe8e8a0f3c75869f07",
  "version": 1,
  "memory_type": "entities"
}
-->