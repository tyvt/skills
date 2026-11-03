# 苏住房G首页多套区域导航拆独立state
首页v2（index-v2.vue）有「关键数据」与「检查数据」两个区域Tab，须拆成独立state各自刷新，公共收益/报事报修/学习园地等区块不随区域切接口。

## 问题现象
- 原只有一个regionCode，两套导航共用导致互相覆盖
- created时用platformConfig.region覆盖首页区域，一进页就选中区县而非「全市」
- 三个社区类区块本身是全局维度数据，多传region既改口径又白跑请求

## 解决做法
- 拆成keyRegionCode/checkRegionCode两个data，初值都给''（对应「全市」），删掉platformConfig.region对首页区域的初始覆盖
- 只有loadKeyData（用queryParams()）和loadCheckData(checkRegionCode)带区域，onKeyRegionChange只调loadKeyData
- getBenefitData({})、getRepairData({})、getStudyList({tab:this.studyTab})一律不传region，切换区域不重新拉
- 待办getTaskCount({})/loadTodoPanelList按用户维度不拼queryParams()，从onKeyRegionChange摘掉loadTodoPanel()
- Tab选中态用String(a)===String(b)判等，避免数字/字符串编码致「全市」不高亮

## 通用约定
- 凡同屏两套筛选器都按「各自state+各自loader」拆，并默认停在「全市/全部」
- 已知清单无此约定，可复用性高

## 验证与归属
- 验证：会话c67476bc/cf4b4d2c/09f68d49围绕index-v2.vue拆分keyRegionCode与checkRegionCode、去platformConfig.region覆盖、benefit/repair/study改传{}；09f68d49 review确认queryParams()仅被loadKeyData/loadCheckData使用
- 涉及文件：zhi2-web-admin/src/views/home/index-v2.vue、home/v2/components/RegionTabs.vue、src/api/portal/home.js
- 所属项目：苏住房G；来源会话：c67476bc-3452-4236-a711-0e3a61e0d8f5等4个；代码基线：15e201a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhou_g_region_decouple",
  "source_extraction_id": "89bde800f6fd4be7996bc80e03c166d2",
  "version": 1,
  "memory_type": "entities"
}
-->