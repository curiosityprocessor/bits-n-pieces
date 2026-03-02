import { Badge } from "@/components/ui/badge";
import { RunState } from "@/types";
import type { BadgeProps } from "@/components/ui/badge";

const STATE_VARIANT_MAP: Record<RunState, BadgeProps["variant"]> = {
  [RunState.RUNNING]: "running",
  [RunState.COMPLETE]: "complete",
  [RunState.FAILED]: "failed",
  [RunState.ABORTED]: "aborted",
  [RunState.UNKNOWN]: "unknown",
};

const STATE_LABEL_MAP: Record<RunState, string> = {
  [RunState.RUNNING]: "Running",
  [RunState.COMPLETE]: "Complete",
  [RunState.FAILED]: "Failed",
  [RunState.ABORTED]: "Aborted",
  [RunState.UNKNOWN]: "Unknown",
};

interface RunStateBadgeProps {
  state: RunState;
  className?: string;
}

export function RunStateBadge({ state, className }: RunStateBadgeProps) {
  return (
    <Badge variant={STATE_VARIANT_MAP[state]} className={className}>
      {STATE_LABEL_MAP[state]}
    </Badge>
  );
}
