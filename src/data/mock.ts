export type ProjectStatus = "On Track" | "At Risk" | "Delayed" | "Completed";

export interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  owner: { name: string; initials: string };
  progress: number;
  updatedAt: string;
}

export const projects: Project[] = [
  {
    id: "proj-1",
    name: "Aurora Design System",
    client: "Internal Platform",
    status: "On Track",
    owner: { name: "Maya Chen", initials: "MC" },
    progress: 78,
    updatedAt: "2 hours ago",
  },
  {
    id: "proj-2",
    name: "Orbit Mobile App",
    client: "Orbit Labs",
    status: "At Risk",
    owner: { name: "Daniel Osei", initials: "DO" },
    progress: 42,
    updatedAt: "5 hours ago",
  },
  {
    id: "proj-3",
    name: "Nimbus Data Pipeline",
    client: "Nimbus Analytics",
    status: "On Track",
    owner: { name: "Priya Rao", initials: "PR" },
    progress: 91,
    updatedAt: "Yesterday",
  },
  {
    id: "proj-4",
    name: "Fleetline Onboarding",
    client: "Fleetline Logistics",
    status: "Delayed",
    owner: { name: "Jordan Lee", initials: "JL" },
    progress: 23,
    updatedAt: "2 days ago",
  },
  {
    id: "proj-5",
    name: "Beacon Marketing Site",
    client: "Beacon Health",
    status: "Completed",
    owner: { name: "Sofia Martins", initials: "SM" },
    progress: 100,
    updatedAt: "4 days ago",
  },
  {
    id: "proj-6",
    name: "Vertex API Gateway",
    client: "Internal Platform",
    status: "On Track",
    owner: { name: "Ethan Brooks", initials: "EB" },
    progress: 64,
    updatedAt: "5 days ago",
  },
];

export interface Task {
  id: string;
  title: string;
  project: string;
  due: string;
  priority: "Low" | "Medium" | "High";
  done: boolean;
}

export const initialTasks: Task[] = [
  { id: "task-1", title: "Review Aurora component tokens", project: "Aurora Design System", due: "Today", priority: "High", done: false },
  { id: "task-2", title: "Sync with Orbit Labs on scope changes", project: "Orbit Mobile App", due: "Today", priority: "High", done: false },
  { id: "task-3", title: "Finalize Nimbus dashboard copy", project: "Nimbus Data Pipeline", due: "Tomorrow", priority: "Medium", done: false },
  { id: "task-4", title: "Prepare Fleetline recovery plan", project: "Fleetline Onboarding", due: "Tomorrow", priority: "High", done: false },
  { id: "task-5", title: "Archive Beacon launch assets", project: "Beacon Marketing Site", due: "Fri", priority: "Low", done: true },
  { id: "task-6", title: "Draft Vertex rate-limit proposal", project: "Vertex API Gateway", due: "Mon", priority: "Medium", done: false },
];

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
  status: "online" | "away" | "offline";
}

export const teamMembers: TeamMember[] = [
  { id: "tm-1", name: "Maya Chen", initials: "MC", role: "Product Designer", email: "maya@novaflow.io", status: "online" },
  { id: "tm-2", name: "Daniel Osei", initials: "DO", role: "Mobile Engineer", email: "daniel@novaflow.io", status: "online" },
  { id: "tm-3", name: "Priya Rao", initials: "PR", role: "Data Engineer", email: "priya@novaflow.io", status: "away" },
  { id: "tm-4", name: "Jordan Lee", initials: "JL", role: "Project Manager", email: "jordan@novaflow.io", status: "offline" },
  { id: "tm-5", name: "Sofia Martins", initials: "SM", role: "Marketing Lead", email: "sofia@novaflow.io", status: "online" },
  { id: "tm-6", name: "Ethan Brooks", initials: "EB", role: "Backend Engineer", email: "ethan@novaflow.io", status: "away" },
  { id: "tm-7", name: "Lucas Fischer", initials: "LF", role: "QA Engineer", email: "lucas@novaflow.io", status: "offline" },
  { id: "tm-8", name: "Amara Diallo", initials: "AD", role: "Customer Success", email: "amara@novaflow.io", status: "online" },
];

export interface FileItem {
  id: string;
  name: string;
  type: "pdf" | "image" | "sheet" | "doc" | "archive" | "code";
  size: string;
  updatedAt: string;
  owner: string;
}

export const files: FileItem[] = [
  { id: "file-1", name: "Aurora_Brand_Guidelines.pdf", type: "pdf", size: "4.2 MB", updatedAt: "2 hours ago", owner: "Maya Chen" },
  { id: "file-2", name: "Q3_Revenue_Report.xlsx", type: "sheet", size: "1.8 MB", updatedAt: "Yesterday", owner: "Jordan Lee" },
  { id: "file-3", name: "Orbit_App_Screens.fig", type: "image", size: "12.6 MB", updatedAt: "2 days ago", owner: "Daniel Osei" },
  { id: "file-4", name: "Nimbus_Pipeline_Spec.docx", type: "doc", size: "640 KB", updatedAt: "3 days ago", owner: "Priya Rao" },
  { id: "file-5", name: "Fleetline_Assets.zip", type: "archive", size: "28.4 MB", updatedAt: "4 days ago", owner: "Ethan Brooks" },
  { id: "file-6", name: "vertex-gateway-config.yaml", type: "code", size: "12 KB", updatedAt: "5 days ago", owner: "Ethan Brooks" },
];

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  kind: "success" | "info" | "warning" | "message";
}

export const notifications: NotificationItem[] = [
  { id: "n-1", title: "Deployment succeeded", description: "Vertex API Gateway v2.4.0 shipped to production.", time: "12m ago", read: false, kind: "success" },
  { id: "n-2", title: "New comment", description: "Priya Rao commented on Nimbus Data Pipeline.", time: "1h ago", read: false, kind: "message" },
  { id: "n-3", title: "Task overdue", description: "\"Sync with Orbit Labs\" is due today.", time: "3h ago", read: false, kind: "warning" },
  { id: "n-4", title: "Storage almost full", description: "Your workspace is using 92% of its storage plan.", time: "6h ago", read: true, kind: "warning" },
  { id: "n-5", title: "Weekly report ready", description: "Your team's activity summary for last week is ready.", time: "Yesterday", read: true, kind: "info" },
  { id: "n-6", title: "Welcome to NovaFlow", description: "Your workspace has been created successfully.", time: "3 days ago", read: true, kind: "success" },
];

export interface ActivityItem {
  id: string;
  actor: string;
  initials: string;
  action: string;
  target: string;
  time: string;
}

export const activity: ActivityItem[] = [
  { id: "a-1", actor: "Maya Chen", initials: "MC", action: "updated the design tokens in", target: "Aurora Design System", time: "12m ago" },
  { id: "a-2", actor: "Daniel Osei", initials: "DO", action: "opened a pull request on", target: "Orbit Mobile App", time: "45m ago" },
  { id: "a-3", actor: "Priya Rao", initials: "PR", action: "completed a milestone in", target: "Nimbus Data Pipeline", time: "2h ago" },
  { id: "a-4", actor: "Jordan Lee", initials: "JL", action: "flagged a blocker on", target: "Fleetline Onboarding", time: "5h ago" },
  { id: "a-5", actor: "Sofia Martins", initials: "SM", action: "published the launch page for", target: "Beacon Marketing Site", time: "Yesterday" },
  { id: "a-6", actor: "Ethan Brooks", initials: "EB", action: "merged changes into", target: "Vertex API Gateway", time: "2 days ago" },
];

export const monthlyActivitySeries = [
  { label: "Jan", value: 32 },
  { label: "Feb", value: 41 },
  { label: "Mar", value: 38 },
  { label: "Apr", value: 55 },
  { label: "May", value: 49 },
  { label: "Jun", value: 62 },
  { label: "Jul", value: 58 },
  { label: "Aug", value: 71 },
  { label: "Sep", value: 66 },
  { label: "Oct", value: 79 },
  { label: "Nov", value: 84 },
  { label: "Dec", value: 92 },
];

export const projectStatusBreakdown = [
  { label: "On Track", value: 12, color: "var(--brand-primary)" },
  { label: "At Risk", value: 3, color: "var(--accent-solid)" },
  { label: "Delayed", value: 2, color: "oklch(0.6 0.22 25)" },
  { label: "Completed", value: 7, color: "var(--brand-secondary)" },
];

export const weeklyTasksSeries = [
  { label: "Mon", value: 14 },
  { label: "Tue", value: 22 },
  { label: "Wed", value: 18 },
  { label: "Thu", value: 27 },
  { label: "Fri", value: 21 },
  { label: "Sat", value: 9 },
  { label: "Sun", value: 6 },
];

export const statCards = [
  { label: "Active Projects", value: "24", delta: "+4.2%", trend: "up" as const },
  { label: "Tasks Completed", value: "1,284", delta: "+12.8%", trend: "up" as const },
  { label: "Team Members", value: "38", delta: "+2", trend: "up" as const },
  { label: "Monthly Activity", value: "92%", delta: "-1.4%", trend: "down" as const },
];

export const invoices = [
  { id: "INV-1042", date: "Jun 1, 2026", amount: "$99.00", status: "Paid" },
  { id: "INV-1031", date: "May 1, 2026", amount: "$99.00", status: "Paid" },
  { id: "INV-1020", date: "Apr 1, 2026", amount: "$99.00", status: "Paid" },
  { id: "INV-1009", date: "Mar 1, 2026", amount: "$79.00", status: "Paid" },
];

export interface MessagePreview {
  id: string;
  from: string;
  initials: string;
  preview: string;
  time: string;
  unread: boolean;
}

export const messages: MessagePreview[] = [
  { id: "m-1", from: "Maya Chen", initials: "MC", preview: "Can you review the new tokens before EOD?", time: "10m ago", unread: true },
  { id: "m-2", from: "Jordan Lee", initials: "JL", preview: "Fleetline call moved to 3pm tomorrow.", time: "2h ago", unread: true },
  { id: "m-3", from: "Sofia Martins", initials: "SM", preview: "Launch page copy looks great, shipping it.", time: "Yesterday", unread: false },
];

export const faqItems = [
  {
    question: "How do I invite a new team member?",
    answer: "Go to Team from the sidebar and click \"Invite Team\", then enter their email address. They'll receive an invite link to join your workspace.",
  },
  {
    question: "Can I change my subscription plan?",
    answer: "Yes — open Settings > Billing to compare plans and upgrade or downgrade at any time. Changes are prorated automatically.",
  },
  {
    question: "How do I export a project report?",
    answer: "Use the \"Generate Report\" quick action on your dashboard, or open a project and select Export from the project menu.",
  },
  {
    question: "Is my data backed up?",
    answer: "All workspace data is backed up continuously and retained for 30 days, even on the free plan.",
  },
];
