# 街道社区编码名称统一工具 regOrg.js
产品2.0 中公共收益/物业协议等模块选择街道/社区后页面显示编码而非名称，抽公共工具 regOrg.js 统一收敛口径。

## 问题根因
- 接口/表单长期只存 subdistrict/community 编码，名称字段是后补的
- 「社区=哪个编码值」在模块间口径不同：公共收益模块 0=街道、1=社区，物业模块 3=社区、其他=街道
- 硬写一套判断必错，页面展示的是编码（如 320508018）而非名称

## 解决方案
- 抽公共工具 src/utils/regOrg.js：getSubdistrictName/getCommunityName 优先取名称字段、无名称回退编码（兼容旧数据）
- getBenefitRegCompanyName/getPropertyRegCompanyName 分别按两套模块口径判街道/社区
- assignSubdistrictCommunity 从监管账户行数据同时赋值编码与名称
- 所有用 /benefit/pubRegulatoryAccount/page（及 pageIsAgreement）的选择弹窗：街道/社区列展示名称字段，表单赋值同时写入 subdistrictName + communityName
- 后端未返回名称字段时前端已兼容回退编码；选择管理区域时成对保存「编码+名称」是本项目约定

## 验证与归属
- 批量更新 19 个调用监管账户接口的页面，新建 utils/regOrg.js 收敛四类函数
- 涉及文件：zhi2-web-admin/src/utils/regOrg.js、zhi2-web-admin/src/views/benefit/pubRegulatoryAgreement/detail.vue、zhi2-web-admin/src/views/property/propertyAgreement/detail.vue
- 所属项目：产品2.0；代码基线：526c1ff；来源会话：8a66ad42-2f27-4ff8-b445-5f8e160f357f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "regorg_code_name",
  "source_extraction_id": "339530474fdc41989e139e610acb727b",
  "version": 1,
  "memory_type": "entities"
}
-->