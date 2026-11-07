# sfb分支cherry-pick接口分叉处理
苏服办(sfb)分支与主分支在房屋核验失败逻辑上因API调用族不同而产生cherry-pick冲突，需保留目标分支API仅搬交互。

## 背景与根因
- 主分支修好「我的-添加房屋-核验失败缺少人工登记入口」后需pick到sfb分支
- 原提交6f2df161冲突根因：sfb走verifyAndSubmitOwnerByToken（token换主信息独立通道），主分支走handleHouseOwner
- 两侧业主核验提交接口已不是同一个，不能简单跟代码

## 正确取舍
- 保留目标分支(sfb)现有API调用方式，只补「核验失败→弹人工登记弹窗→走人工登记提交」交互
- 凡是换了接口族/鉴权方式的代码段一律不跟，只跟交互与提示文案

## 落地清单
- 子模块zhi2-mobile-shimin在sfb分支解决冲突并提交fix(property): enhance house owner handling and error messaging，推origin/sfb
- 父仓库切dev-sfb，只更新子模块指针（旧SHA→新SHA）再单独提交推送
- 核对顺序：子模块先行、父仓库只更新指针，不混入本地环境文件
- 分支对应：主分支suzhou-shiqu-suzhufang-main-v2.1，苏服办是父仓dev-sfb+子模块sfb，切回主分支时父仓与子模块都要checkout

## 验证与归属
- 会话90a7df70：用户诉求核验失败缺人工登记入口，需pick到sfb；解决后提交6cc8c352推origin/sfb，父仓提交929d4bb（子模块引用2a237c2→6cc8c352）推origin/dev-sfb
- 涉及文件：addHouse.vue、api/property.js、api/index.js；所属项目苏住房C；代码基线5f0f4dc

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "sfb_cherrypick_api_fork",
  "source_extraction_id": "cd066349e13749679f633dd45256c607",
  "version": 1,
  "memory_type": "entities"
}
-->