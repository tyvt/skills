# uni-app Vue3 script setup 需显式导入onLoad
uni-app Vue3组合式API页面在script setup中使用onLoad等生命周期须从@dcloudio/uni-app显式导入，否则运行报未定义。

## 现象
- 页面script setup里调用onLoad运行时报onLoad is not defined
- 配合nextTick亦需从vue导入，漏导入会在该页首次进入即报错

## 根因
- Vue3组合式API不会自动注入uni-app页面生命周期，与选项式API不同
- H5与小程序共用页面时漏导入会在首次进入报错

## 解决方案
- import { onLoad } from '@dcloudio/uni-app'
- import { nextTick } from 'vue'
- 与同目录已正常页面（如index.vue）对齐写法，保存后热更新应消除报错，否则重启dev

## 验证与归属
- 验证会话fc168ac2：elevatorPubEngCons/detail.vue报onLoad is not defined，补导入后解决
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/pages_benefit/elevatorPubEngCons/detail.vue
- 所属项目：无锡市区小程序嵌入H5；代码基线：0804e57

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "onload_import_required",
  "source_extraction_id": "3527dbc6cabc42928f2894d85a85de59",
  "version": 1,
  "memory_type": "entities"
}
-->