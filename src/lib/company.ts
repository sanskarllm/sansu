export const COMPANY = {
  name: "PrivacyByAI",
  product: "Millhand",
  founded: 2024,
  founder: "Sanskar",
  place: "India",
  line: "Privacy-first AI for companies that cannot leak the shopfloor.",
  long: "PrivacyByAI deploys offline, privacy-based LLMs on a mill’s own machines — or a careful non-offline stack when the work genuinely needs the cloud. We do not train public models on your files. A person still approves what leaves the building.",
};

export const PRINCIPLES = [
  {
    n: "01",
    t: "The mill owns the data",
    d: "RFQs, price cards, GST, buyer names. They stay on hardware you control unless you sign a cloud job with a written fence.",
  },
  {
    n: "02",
    t: "Offline first",
    d: "If the job can run on a local model, it does. Air-gap is a real option, not a slide.",
  },
  {
    n: "03",
    t: "No training on your work",
    d: "Uploaded files never go to a provider that trains on customer data. Bytes stay on the mill or on a no-train endpoint.",
  },
  {
    n: "04",
    t: "A person still sends",
    d: "AI drafts. Autonomy stops at approval unless you raise the fence in writing.",
  },
  {
    n: "05",
    t: "Say what ran",
    d: "Every result carries sources, assumptions, confidence, and a badge: Demo, Sandbox, Pilot, or Production.",
  },
  {
    n: "06",
    t: "Synthetic is labelled",
    d: "If we used a sample because your file would not parse, the page says so. No silent filler.",
  },
];

export const MODES = [
  {
    id: "offline",
    name: "Offline LLM",
    kicker: "Privacy-based, on your floor",
    blurb: "A local model on a mill PC, a small GPU box, or an air-gapped server. No enquiry leaves the LAN.",
    fits: [
      "Price cards and constructions you will not put on the public internet",
      "Buyer emails with names, LCs, and shade standards",
      "Plants with weak or watched links",
      "A written rule: nothing outbound without the owner",
    ],
    stack: [
      "Local open-weight LLM (quantised, mill-sized hardware)",
      "Rules engine on constructions, incoterms, yarn sheets",
      "Optional offline embedding store of your own cards",
      "Approvals and audit on the same machine",
    ],
    not: "Live web research, multi-mill SaaS, or a model that needs a datacentre.",
  },
  {
    id: "hybrid",
    name: "Hybrid desk",
    kicker: "Local by default, cloud by exception",
    blurb: "Rules and extraction stay on the mill. A no-train cloud model is called only when fields are thin — short text, never the file.",
    fits: [
      "Messy buyer English the local model cannot parse",
      "A merchandiser desk that already uses mail in the cloud",
      "Pilots that must start this month, then move offline",
    ],
    stack: [
      "Same mill rules engine",
      "Short snippets only, capped tokens",
      "Provider chosen for a no-training contract",
      "Kill-switch: the mill can drop the cloud path",
    ],
    not: "Dumping the ERP into a chatbot.",
  },
  {
    id: "cloud",
    name: "Careful cloud",
    kicker: "Non-offline, still fenced",
    blurb: "When the mill wants a hosted desk. Keys stay server-side. No training. Human approval. Data residency named in the order.",
    fits: [
      "Groups with several units and one owner",
      "IT teams that will not rack a GPU this quarter",
      "A sandbox on mill work before an offline install",
    ],
    stack: [
      "Hosted Millhand with mill login later",
      "No-train inference, region written down",
      "File bytes not sent; text extract only",
      "Export of logs back to the mill",
    ],
    not: "A consumer chatbot with your buyers in the prompt history.",
  },
];

export const OFFERINGS = [
  {
    t: "Millhand desk",
    d: "The product on this site. RFQ to quote, samples, export docs, yarn, follow-ups, quality. A costed plan in minutes.",
    href: "/",
  },
  {
    t: "Offline LLM install",
    d: "Hardware size, model choice, rules on your constructions, air-gap if needed. We sit with IT until a labelled job runs.",
    href: "/services",
  },
  {
    t: "Hybrid / cloud fence",
    d: "A written list of what may leave. No-train endpoints. Kill-switch. Audit.",
    href: "/security",
  },
  {
    t: "Workforce on your book",
    d: "Quotation, sample tracking, export docs and the rest — autonomy you set: assist, recommend, act with approval, guarded.",
    href: "/workforce",
  },
];

export const STAGES = [
  {
    n: "01",
    t: "Listen on the floor",
    d: "One inbox, one sheet, one WhatsApp group. We run Millhand on that work. No slide deck first.",
  },
  {
    n: "02",
    t: "Sandbox week",
    d: "Your RFQs, labelled. Owner approval on every draft. Offline or hybrid named on day one.",
  },
  {
    n: "03",
    t: "Pilot with a fence",
    d: "One desk, KPIs vs last quarter, audit log. Cloud path only if the mill signed it.",
  },
  {
    n: "04",
    t: "Production or we leave",
    d: "If the hours do not show, the install does not stay. Models and logs remain yours.",
  },
];

export const TIMELINE = [
  { y: "2024", t: "Founded", d: "Sanskar starts PrivacyByAI in India. The brief: mills were pasting buyer mail into tools that train on it." },
  { y: "2024", t: "First offline desks", d: "Local models on mill PCs. Rules engine before any LLM. Human send." },
  { y: "2025", t: "Textile set", d: "Quotation, sample tracking, export docs — the jobs a merchandiser actually does." },
  { y: "2026", t: "Millhand", d: "A mill owner can see the work, the rupee number, and the plan without a sales call." },
];

export const POLICY = [
  {
    h: "Who we are",
    p: "PrivacyByAI is a privacy-first company founded by Sanskar in 2024 in India. Millhand is our mill desk. This policy covers the site you are on and the installs we do at a company.",
  },
  {
    h: "What this site collects",
    p: "If you paste work into Millhand, it is processed to show you a result. If you send a plan or a contact form, we keep name, mill, phone or mail, and the channel you chose — so a person can reply. We do not sell lists.",
  },
  {
    h: "What we do not collect by default",
    p: "No account is required to try the desk. We do not need your ERP login, CCTV, or a full mailbox to run a labelled demo. Do not paste secrets you would not show a merchandiser.",
  },
  {
    h: "Offline installs",
    p: "On an offline LLM job, mill data stays on mill hardware. We do not copy price cards off the floor. Updates to the model are files you accept, not a silent phone-home.",
  },
  {
    h: "Non-offline (cloud) jobs",
    p: "Only when you choose that mode. Short text may go to a no-train provider. File bytes do not. Region and provider are written in the order. You can switch the path off.",
  },
  {
    h: "Training",
    p: "We do not train PrivacyByAI models on your mill’s documents. We do not send your files to a provider that trains on customer data.",
  },
  {
    h: "Retention",
    p: "Sandbox runs on this browser stay on this device unless you send a plan. Production retention is in the mill’s order — typically logs you can export or wipe.",
  },
  {
    h: "Your rights",
    p: "Ask us to delete a lead, a plan, or an install copy we hold. For offline installs, you already hold the data.",
  },
];

export const SECURITY = [
  {
    t: "Air-gap",
    d: "Model, rules, and audit on a machine with no route out. Updates on a stick. Used when the mill says so.",
  },
  {
    t: "On-prem GPU / mill PC",
    d: "Quantised local LLM sized to the box you actually have. We do not require a datacentre to start.",
  },
  {
    t: "No-train inference",
    d: "If a cloud path exists, the contract forbids training. Keys never sit in the browser.",
  },
  {
    t: "Least text",
    d: "Rules engine first. LLM only on thin fields. Snippets capped. Files are read as text here, not uploaded whole.",
  },
  {
    t: "Approval fence",
    d: "Assist, recommend, act with approval, guarded autonomy. Default: nothing outbound without a named person.",
  },
  {
    t: "Audit",
    d: "Extracts, drafts, approvals, model path (offline / hybrid / cloud). Exportable to the mill.",
  },
];

export const FOUNDER = {
  name: "Sanskar",
  role: "Founder",
  since: "2024",
  bio: "Sanskar founded PrivacyByAI in 2024 after watching factories treat a public chatbot as a clerk. The company exists to put the model on the mill’s terms: offline when the work is private, careful cloud when it is not, and a person on the send button either way.",
};
