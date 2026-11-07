# Vue2下划线前缀data属性不被代理
物业管理区域页（RegionTreeLayout.vue）一进页报Cannot read properties of undefined (reading 'forEach')，根因是data里以_开头的属性不被Vue2代理到this。

## 问题现象
- 一进页报[Vue warn] Error in mounted hook: TypeError: Cannot read properties of undefined (reading 'forEach')
- devtools看不到该属性，data声明处不报错，只有运行期首次访问才炸，易误判成「容器ref没拿到」

## 根因
- Vue2出于内部命名空间保护，不把data()里以_或$开头的属性代理到组件实例
- 代码定义_containerHeightTimers等，所有this._containerHeightTimers访问都得到undefined

## 解决做法
- 计时器/监听器/剪贴板等实例级状态不要命名成_或$前缀，统一去掉前缀（containerHeightTimers等）
- 同步改mounted、beforeDestroy（clearTimeout）与所有方法里的引用
- 或显式在created里this.xxx=...赋值（绕过data代理）而非放进data

## 差异说明与归属
- 区别于#1081（methods用了data未声明状态，根因是压根没声明），本条是「声明了但因下划线前缀被跳过代理」，改法去前缀而非补声明
- 验证：会话9585b1b4定位RegionTreeLayout.vue的_containerHeightTimers，改名containerHeightTimers等三个属性后修复
- 涉及文件：zhi2-web-admin/src/views/property/complex/components/RegionTreeLayout.vue、property/complex/index.vue
- 所属项目：苏住房G；来源会话：9585b1b4-8f7c-4b98-81e1-bf7e7b44659c；代码基线：2a3ef8a

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhou_g_vue2_underscore",
  "source_extraction_id": "89bde800f6fd4be7996bc80e03c166d2",
  "version": 1,
  "memory_type": "entities"
}
-->
