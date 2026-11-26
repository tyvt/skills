# C端页面补齐返回按钮（禅道2948）
惠山二期H5的C端子模块从泰兴小程序yulin分支迁移返回按钮实现，共改动14个页面并保持惠山深蓝主题色。

## 任务与约束
- 禅道任务2948（http://zentao-biz.zhi.com/index.php?m=task&f=view&id=2948）："C端页面大部分都没有返回按钮，需要增加返回按钮"
- 参考源：D:/repository/泰兴小程序 最新的 yulin 分支，以其中权威提交给出的文件清单为准
- 用户要求主题色保持本项目：惠山深蓝 #0A3D62，只加按钮不写死色值，走 var(--primary-color)，不引入参考仓天蓝
- 编辑子模块：惠山二期H5/zhi2-mobile-admin-h5-c-unlimited
- C端开发网关：unlimited.c.h5.shimin.mobile.v2.product.huishan.wuxi.dev.zhi.com

## 改动内容
- 共14个页面：9页取消注释已有按钮 + 5页新增按钮（含 import + padding）+ 3页补 padding-bottom
- 公共组件 PageButton.vue 无需改动，已具备 showBackBtn 逻辑
- 5个新增页均用 <script setup>，import PageButton 自动注册
- 基线构建与改后构建均 exit 0，无主题色污染

## 进度与交接
- 计划已审核通过（95/100）并经用户确认实施
- 未完成：deploy-env 本地站点注册（上次因缺 --port-base 失败）→ agent-browser 实机验证截图 → 用户确认 → git 提交推送 + 禅道回写附图 → 清理产物
- 交接载荷：D:/plan/惠山二期H5/HANDOFF-CHAIN-禅道2948-C端返回按钮-hop1-20261126-1142.md
- 下一跳会话排程 2026-11-26 11:44:30（session-2ab8f496...），chain_id=禅道2948-C端返回按钮，hop1/10

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "c端返回按钮迁移",
  "source_extraction_id": "21f6a4a445b84b018a04dc2b365047d8",
  "version": 1,
  "memory_type": "entities"
}
-->