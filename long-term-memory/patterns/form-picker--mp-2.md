# 表单与选择器 · 小程序（第 2/2 部分）

共 1 条，本文件是其中一部分；同类其它条目见本主题的其它分片。

其中 🔵 长期有效 0 条（排在最前，属必须遵守的约定）。

---

### x2882 · 承租方信用代码校验报错源自后端

⚪ 偏好 ｜ 验证于 苏州市区苏服办 ｜ 无 git 基线，引用前请自行核对

在`d:/repository`全库搜索无信用代码校验前端文案，报错由网关/业务后端返回，苏服办H5仅展示接口`reason`无表单。监测V3录入弹窗实施USCI校验与去`/g`，苏服办对`idno`规范化；仍报错需录入端改承租方USCC或后端查合同库字段。

> 依据（摘）：src=苏州市区苏服办/001.md

文件：`d:/repository/苏州市区苏服办/src/pages/leaseContract/index.vue`、`d:/repository/苏州市区苏服办/src/utils/formatter.js`、`d:/repository/苏州市区苏服办/src/utils/index.js`
---
