# houseCard徽章被type当开关致二手房缺徽章
苏找房二手房Tab房源卡片缺「个人/中介」徽章，根因是houseCard把徽章显示条件写成type为空才渲染，而二手房必须传type="stock"。

## 现象与根因
- 苏找房「二手房」Tab房源卡片缺少发布角色徽章，同页新房卡片正常
- components/commonNew/houseCard.vue把徽章显示条件写成「type为空才渲染」
- 苏找房二手房列表必须传type="stock"区分房源形态与图片底部前缀，于是徽章被自己的形态参数关掉
- type是「房源形态」而非「是否显示徽章」，两个语义挤在同一prop上
- 同源项目（苏州房地产监测V3/泰兴小程序/苏住房G）此处写法已分叉，直接同步会带偏徽章逻辑

## 修复做法
- 徽章显示条件改为按房源形态白名单判定（type为空或type==='stock'都渲染发布角色徽章）
- 个人=蓝、中介=橙，颜色绑定到发布角色字段而非写死
- 更彻底收敛是把「是否显示徽章/是否显示前缀」拆成独立boolean prop（如showPublishRole）
- 列表页传了type的场景（二手房、租房、新房）都要回归徽章与图片前缀

## 验证与归属
- 来源会话：2259f4fa；代码基线：5f0f4dc
- 涉及文件：houseCard.vue、stockHouse/index.vue、Project_Suzhufang.vue

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "housecard_badge_bug",
  "source_extraction_id": "bc2e17ccbf314a70a51b2c2bf67c360f",
  "version": 1,
  "memory_type": "entities"
}
-->