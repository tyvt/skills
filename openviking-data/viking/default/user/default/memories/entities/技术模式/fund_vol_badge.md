# 基金面板波动率倍数徽标
基金面板中以 `fundVol` 计算年化波动率，并相对自身近一年倍数展示彩色徽标以解决绝对波动率跨资产不可比问题。

## 波动率计算
- `fundVol(code, 20)` 取近 21 交易日复权日收益，算样本标准差 × √244 得年化波动率

## 徽标规则
- 绝对波动率跨资产不可比，数值后展示相对自身近一年倍数徽标
- ×1.5 及以上标红、×1.2~1.5 标黄、×0.75 及以下标蓝

## 实测波动率倍数
- Python 直读 `hist` 表独立复算，与页面完全一致
- 科创50 32.6% ×0.84、创业板 26.1% ×0.82、中证1000 23.3% ×0.95
- 黄金 16.3% ×0.55、红利低波 11.9% ×1.01
- 债券 675091 0.32% ×0.91、017024 0.11% ×0.48

## 布局与适配
- 展开行改为 2×2 网格，右栏宽 300px
- 适配暗/浅色主题与 1440px / 760px 断点

## 验证与归属
- Python 直读 `hist` 表复算校验，须与页面一致；本次全部 204 项测试通过
- 验证证据：基金面板/001.md
- 涉及文件：D:/repository/基金面板/fund.sql、config.js、index.html、_mock.js、_shot1.png、_shot2.png、_shot3.png、_shot4.png、_chk.js、README.md、/tmp/pw/t.js、_build_sqljs.py、_t.js
- 来源会话：8971d056-cb30-42ef-84b8-6b740c4d9a47；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fund_vol_badge",
  "source_extraction_id": "e2c1efda8c7143009b5d6d9683a9706d",
  "version": 2,
  "memory_type": "entities"
}
-->