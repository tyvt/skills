# ZenTao Bug 6955 C-end Home Real Data
ZenTao defect 6955 covered C-end home data not displaying after MOCK removal; root causes were an uncalled loadRegions and empty activeDeptId blocking G-end stats, with 2026-11-25 fixes, build, data display, and later hop3 commit/push while write-back remained pending.

## Issue and Root Cause
- Bug: C-end home APIs returned data but the page did not show it; user said it had worked before and appeared after mock data removal (http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6955).
- Root cause: loadRegions was defined but never called/mounted, so regions were uninitialized; G-end activeDeptId was empty, so statistics requests were skipped.
- The 8095 claim came from old nginx/memory and was wrong; deployment panel set dev http://localhost:8161 and test 8162, after 8095 was unreachable and code evidence was used to reproduce.
- A plan was written and submitted for plan_review; after approval and user confirmation, implementation proceeded on home/index.vue.

## Fix and Verification
- Changes in src/pages/home/index.vue added an inflight guard to loadRegions, called loadStats after defaulting to the whole city, and mounted it in onMounted/onShow.
- build:h5 completed; 8161 home key data appeared (for example 10842).
- Full-page screenshot C:/Users/Administrator/AppData/Local/Temp/bug6955-home-20261125-162830.png was saved and presented.
- Login checks found 8161/8162 home required login; captcha UUID mismatch kept the page at login, so API direct login was attempted and browser captcha synchronization completed login and confirmed statistics display.

## Handoff and Follow-up
- On 2026-11-25 hop1 cost handoff was D:/plan/苏住房防汛C端/HANDOFF-CHAIN-zentao-bug-6955-hop1-20261125-1631.md, with a new session around 16:32; the user approved data doubts: the C-end current-month API truly returned 0, historical cumulative data had three real records (3/0/3), and G-end used a different API/definition.
- hop3 aligned report/repair with G-end "马上办": three tabs/trend chart/real numbers passed real-device verification at 8161 and user confirmation; changes to src/pages/home/index.vue (tab/label definition plus SVG trend chart and styles, +100/-27 lines), build exit 0, artifact index-_8g0CgpU.js, and 8161 http=200; two verification images entered the chat and the gate passed.
- Before commit, untracked process artifacts x! (empty file from a keyboard mistake) and _review.json (hook verification state file) were deleted, leaving only src/pages/home/index.vue modified; commit 782a75a was pushed to origin/dev.
- ZenTao 6955 write-back remained for hop4: bug was active (lichandan reactivated it at 15:57 because home data had no value), previous resolved could be a template, and status→resolved plus comment with two verification images was needed (images had to be uploaded for fileIDs, method not yet found).
- hop3 P0 handoff document was HANDOFF-CHAIN-zentao-bug-6955-hop3-20261125-1713.md, and the next hop was schedule-b3ff5a91-b477-4fa1-accd-78ce87c44623 (delivered 17:13:44, new_once).

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6955",
  "source_extraction_id": "016ade41304a4d5e92868fb2a5bc1ea2",
  "version": 5,
  "memory_type": "entities"
}
-->