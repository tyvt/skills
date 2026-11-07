# 字典全量与常规必须用两套缓存key
人员类型下拉需查看态显示停用项label、新增编辑态不出现停用项；字典全量与常规缓存key不能复用，否则互相污染。

## 问题现象
- utils/dict.js中getDictsIncludeDisabled复用getDicts缓存key，两套选项内容不同（含disabled项与否）导致后写覆盖先写，页面加载顺序不定表现为有时对有时错
- 修完又出现反向问题：新增反而用上全量字典

## 解决方案
- utils/dict.js全量缓存与普通缓存分开两个key（如dict_all_*与dict_*），互不覆盖
- 抽mixin（personnelTypeDictMixin.js）：selectOptions←getDicts、allOptions←getDictsIncludeDisabled，computed按formMode/dialogMode自动切换，模板只绑一个xxxOptions
- 同一字典多处消费时逐处确认用哪套，不默认字段同名就同源

## 验证与归属
- 涉及文件：utils/dict.js、mixins/personnelTypeDictMixin.js、staffManagement/detail.vue、companyManagement/personnelDialog.vue等五个页面
- 所属项目：苏住房G；来源会话ID：b98071de-1d3c-403f-89ee-8b1bfcae504e；代码基线：d5eee56

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dict_cache_key_separation",
  "source_extraction_id": "f7f1e07dd4db4c05b244379202929f45",
  "version": 1,
  "memory_type": "entities"
}
-->