# 基金面板波动率倍数徽标
基金面板中以 `fundVol` 计算年化波动率，并相对自身近一年倍数展示彩色徽标以解决绝对波动率跨资产不可比问题。

## 波动率计算
- `fundVol(code, 20)` 取近 21 交易日复权日收益，算样本标准差 × √244 得年化波动率

## 徽标规则
- 绝对波动率跨资产不可比，数值后展示相对自身近一年倍数徽标
- ×1.5 及以上标红、×1.2~1.5 标黄、×0.75 及以下标蓝

## 布局与适配
- 展开行改为 2×2 网格，右栏宽 300px
- 适配暗/浅色主题与 1440px / 760px 断点

## 验证与归属
- Python 直读 `hist` 表复算校验，须与页面一致
- 验证证据：基金面板/001.md
- 涉及文件：D:/repository/基金面板/config.js、index.html、_mock.js、_chk.js、README.md、/tmp/pw/t.js、_build_sqljs.py、_t.js
- 来源会话：8971d056-cb30-42ef-84b8-6b740c4d9a47；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fund_vol_badge",
  "source_extraction_id": "e6406a12d1d24366bd2dcf9145c8b9f2",
  "version": 1,
  "memory_type": "entities"
}
-->