import json, os, re, sys

ROOT = r"D:\repository\skills\cursor-model-routing"
CORPUS = os.path.join(ROOT, "results", "offtask-composer-20261113.json")

OLD = r"第\s*\d+\s*轮|【ID】|【Title】|【Difficulty】|SkillUpgradeTracker|skill-upgrade-tracker|前端面试题|面试题|#{1,3}\s*助手\s*$|#{1,3}\s*用户\s*$"
NEW = OLD + r"|instruction\.md|Final file content|tasks/architecture"

# 2026-11-13 新增：虚构交付物型偏题。原样本来自本会话 code_edit_with_signal 首次冒烟
# （32.6s），特征为凭空构造项目文件路径与写作规范、输出整篇与提问无关的博客。
FAKE_DELIVERY = (r"source/blogs|blog_skill|Mike Dane|Giraffa|请保存为|drafts/[\w-]+\.md"
                 r"|正在阅读项目内的风格指南")

CANDIDATES = {
    "OLD": OLD,
    "NEW": NEW,
    "NEW+FAKE_DELIVERY": NEW + "|" + FAKE_DELIVERY,
}

# 人工确认的正类：本次那个 32.6s 偏题输出（已保存于 offtask-golden）
GOLDEN = os.path.join(ROOT, "results", "offtask-golden-composer-20261113.txt")
golden_text = ""
if os.path.exists(GOLDEN):
    with open(GOLDEN, encoding="utf-8") as f:
        golden_text = f.read()

rows = []
if os.path.exists(CORPUS):
    with open(CORPUS, encoding="utf-8") as f:
        rows = json.load(f)

# 构建评测集：golden 为唯一已知正类；全部重放样本为负类
tests = []
if golden_text:
    tests.append({"name": "golden(offtask)", "content": golden_text, "truth": True})
else:
    print("[WARN] golden 文件不存在，正类为空——无法算 recall")
for r in rows:
    c = r.get("content") or ""
    if c:
        tests.append({"name": f"{r['task']}-r{r['rep']}", "content": c, "truth": False})

print(f"\n语料：正类 {sum(1 for t in tests if t['truth'])}，负类 {sum(1 for t in tests if not t['truth'])}")
print("=" * 72)

for label, pat in CANDIDATES.items():
    rx = re.compile(pat)
    tp = fp = tn = fn = 0
    fps, fns = [], []
    for t in tests:
        hit = bool(rx.search(t["content"]))
        if t["truth"] and hit:
            tp += 1
        elif t["truth"] and not hit:
            fn += 1; fns.append(t["name"])
        elif not t["truth"] and hit:
            fp += 1; fps.append(t["name"])
        else:
            tn += 1
    prec = round(100.0 * tp / (tp + fp), 1) if (tp + fp) else 0.0
    rec = round(100.0 * tp / (tp + fn), 1) if (tp + fn) else 0.0
    print(f"[{label:20s}] TP={tp} FP={fp} TN={tn} FN={fn}  Precision={prec}%  Recall={rec}%")
    if fps: print(f"    FP: {', '.join(fps)}")
    if fns: print(f"    FN: {', '.join(fns)}")
