export type TrustBadge = "Demo" | "Sandbox" | "Pilot" | "Production";

export type InputMode = "chip" | "email" | "file" | "website";

export type Autonomy = "assist" | "recommend" | "approve" | "guarded";

export type JourneyStep =
  | "result"
  | "map"
  | "workflow"
  | "estimate"
  | "plan"
  | "handoff";

export type MissionStatus = "pending" | "running" | "done" | "error";

export type MissionStep = {
  id: string;
  label: string;
  status: MissionStatus;
  input?: string;
  output?: string;
  source?: string;
  confidence?: number;
};

export type Field = { label: string; value: string };

export type Artifact =
  | {
      type: "quote";
      title: string;
      rows: Field[];
      notes: string[];
    }
  | {
      type: "table";
      title: string;
      columns: string[];
      rows: string[][];
    }
  | {
      type: "draft";
      title: string;
      body: string;
    }
  | {
      type: "missing";
      title: string;
      items: string[];
    };

export type GraphNode = {
  id: string;
  label: string;
  detail: string;
  column: "process" | "tasks" | "ai" | "outcome";
};

export type OpportunityGraph = {
  title: string;
  nodes: GraphNode[];
  edges: { from: string; to: string }[];
};

export type WorkflowLane = {
  id: string;
  title: string;
  owner: "human" | "ai" | "approve";
  todayMinutes: number;
  aiMinutes: number;
  detail: string;
};

export type EstimateInputs = {
  rfqsPerMonth: number;
  minutesToday: number;
  minutesWithAi: number;
  costPerHour: number;
  setupCost: number;
};

export type WorkInput = {
  mode: InputMode;
  problemId: string;
  text: string;
  fileName?: string;
  website?: string;
};

export type WorkResult = {
  engine: "rules" | "ai" | "sample";
  badge: TrustBadge;
  synthetic: boolean;
  confidence: number;
  title: string;
  summary: string;
  problemId: string;
  fields: Field[];
  artifacts: Artifact[];
  sources: string[];
  assumptions: string[];
  dataUsed: string[];
  mission: MissionStep[];
  map: OpportunityGraph;
  workflow: WorkflowLane[];
  fallbackReason?: string;
};

export type ProblemChip = {
  id: string;
  label: string;
  hint: string;
  sample: string;
  sampleKind: "email" | "chat" | "sheet" | "notes" | "url";
};

export type LabDemo = {
  id: string;
  name: string;
  blurb: string;
  inputLabel: string;
  input: string;
  problemId: string;
};

export type AgentProfile = {
  id: string;
  name: string;
  set: "textile" | "mill" | "office";
  mission: string;
  tools: string[];
  kpis: string[];
  autonomy: Autonomy;
  watchPath: string;
};

export type CaseStudy = {
  id: string;
  mill: string;
  place: string;
  problem: string;
  before: string;
  after: string;
  evidence: string;
  runId: string;
};

export type SearchItem = {
  id: string;
  title: string;
  kind: "agent" | "demo" | "workflow" | "case" | "page";
  blurb: string;
  href: string;
  tags: string[];
};

export type Lead = {
  name: string;
  mill: string;
  phone: string;
  email: string;
  channel: "whatsapp" | "call" | "email" | "link";
  planId: string;
  at: string;
};

export type AuditEvent = {
  id: string;
  at: string;
  actor: string;
  action: string;
  detail: string;
};

export type CustomAgent = {
  name: string;
  role: string;
  knowledge: string[];
  tools: string[];
  autonomy: Autonomy;
};
