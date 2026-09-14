import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_ESTIMATE } from "./catalog";
import type {
  AuditEvent,
  CustomAgent,
  EstimateInputs,
  JourneyStep,
  Lead,
  WorkInput,
  WorkResult,
} from "./types";

type JourneyEvent = { at: string; step: string; detail: string };

type State = {
  input: WorkInput;
  result: WorkResult | null;
  step: JourneyStep;
  estimate: EstimateInputs;
  millName: string;
  lead: Lead | null;
  leads: Lead[];
  events: JourneyEvent[];
  audit: AuditEvent[];
  customAgent: CustomAgent | null;
  planId: string | null;
  setInput: (input: Partial<WorkInput>) => void;
  setResult: (result: WorkResult | null) => void;
  setStep: (step: JourneyStep) => void;
  setEstimate: (e: Partial<EstimateInputs>) => void;
  setMillName: (n: string) => void;
  saveLead: (lead: Lead) => void;
  track: (step: string, detail: string) => void;
  setCustomAgent: (a: CustomAgent) => void;
  setPlanId: (id: string | null) => void;
  pushAudit: (e: Omit<AuditEvent, "id" | "at">) => void;
};

const emptyInput: WorkInput = {
  mode: "chip",
  problemId: "rfq-email",
  text: "",
};

export const useMill = create<State>()(
  persist(
    (set) => ({
      input: emptyInput,
      result: null,
      step: "result",
      estimate: DEFAULT_ESTIMATE,
      millName: "",
      lead: null,
      leads: [],
      events: [],
      audit: [],
      customAgent: null,
      planId: null,
      setInput: (input) =>
        set((s) => ({ input: { ...s.input, ...input } })),
      setResult: (result) => set({ result }),
      setStep: (step) => set({ step }),
      setEstimate: (e) => set((s) => ({ estimate: { ...s.estimate, ...e } })),
      setMillName: (millName) => set({ millName }),
      saveLead: (lead) =>
        set((s) => ({ lead, leads: [lead, ...s.leads].slice(0, 20) })),
      track: (step, detail) =>
        set((s) => ({
          events: [{ at: new Date().toISOString(), step, detail }, ...s.events].slice(0, 80),
        })),
      setCustomAgent: (customAgent) => set({ customAgent }),
      setPlanId: (planId) => set({ planId }),
      pushAudit: (e) =>
        set((s) => ({
          audit: [
            {
              id: `au-${Date.now()}`,
              at: new Date().toISOString(),
              ...e,
            },
            ...s.audit,
          ].slice(0, 40),
        })),
    }),
    {
      name: "millhand-v2",
      skipHydration: true,
      partialize: (s) => ({
        input: s.input,
        result: s.result,
        step: s.step,
        estimate: s.estimate,
        millName: s.millName,
        lead: s.lead,
        leads: s.leads,
        events: s.events,
        audit: s.audit,
        customAgent: s.customAgent,
        planId: s.planId,
      }),
    },
  ),
);

export function valueOf(e: EstimateInputs) {
  const hoursMonth = (e.rfqsPerMonth * Math.max(e.minutesToday - e.minutesWithAi, 0)) / 60;
  const hoursYear = hoursMonth * 12;
  const annual = hoursYear * e.costPerHour;
  const monthly = annual / 12;
  const paybackDays = monthly > 0 ? Math.ceil((e.setupCost / monthly) * 30) : 0;
  return { hoursMonth, hoursYear, annual, monthly, paybackDays };
}
