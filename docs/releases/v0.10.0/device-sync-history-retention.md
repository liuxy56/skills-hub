# Device sync history retention / 设备同步历史保留

## English

Device sync now retains the latest 100 meaningful history entries. Successful runs with content changes, conflicts, failures, and resolved-conflict activity count toward the limit. Successful no-change runs continue to update the latest-check status without creating a history entry.

Retention is enforced atomically whenever a sync or conflict resolution finishes. Older run rows and their feature-specific change details are removed together. Interrupted `running` rows are excluded from visible history and removed when a new run starts, so they cannot consume the completed-history allowance. Databases created by earlier development versions also converge to the limit after the next completed run, including a no-change run. The shared database schema version is unchanged and remains compatible with the previous stable release.

The history command never returns more than 100 entries. The existing history view loads 50 entries initially, loads the remaining retained entries once on request, and then removes the load-more action.

## 中文

设备同步现在只保留最近 100 条有效历史，包括发生内容变化的成功同步、冲突、失败和冲突处理记录。成功但无内容变化的同步继续只更新最近检查状态，不会创建历史记录或占用保留名额。

每次同步或冲突处理完成时，会在同一事务内裁剪历史记录及其变化明细。中断遗留的“运行中”记录不进入可见历史，并在新同步开始时清理，因此不会挤占有效记录名额。旧开发版本留下的超量记录也会在下一次同步完成后收敛到 100 条，即使该次同步没有变化。此改动不调整共享数据库版本，继续兼容上一稳定版本。

历史接口最多返回 100 条。页面沿用首次加载 50 条的紧凑体验，用户可再加载一次其余保留记录，到达上限后不再显示加载按钮。
