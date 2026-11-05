# onLoad与nextTick未导入报错修复
在无锡市区小程序嵌入H5的elevatorPubEngCons页面中，<script setup>使用了onLoad和nextTick但未导入，导致报错。

## 问题根因
- elevatorPubEngCons的detail.vue与index.vue中<script setup>使用了onLoad和nextTick
- 未从对应包导入，导致onLoad is not defined等报错

## 解决方案
- onLoad从@dcloudio/uni-app导入（uni-app页面生命周期）
- nextTick从vue导入
- 保存后热更新即可消除报错，若仍有问题可刷新页面或重启dev服务

## 验证与归属
- 验证会话fc168ac2：elevatorPubEngCons页面onLoad未定义，补导入后修复
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/pages_benefit/elevatorPubEngCons/detail.vue、src/pages_benefit/elevatorPubEngCons/index.vue
- 所属项目：无锡市区小程序嵌入H5；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "onload_nexttick_import",
  "source_extraction_id": "75bbb1101ba1415cb00e5e2a501d635d",
  "version": 1,
  "memory_type": "entities"
}
-->