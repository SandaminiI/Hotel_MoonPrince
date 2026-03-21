import { useState, useMemo } from "react";
import AdminPageLayout from "../../../layouts/AdminPageLayout";
import {
  Megaphone, Search, Pin, Calendar, Clock, Flag,
  ChevronDown, Eye, Pencil, Trash2, FileText,
  AlertCircle, CheckCircle2, Filter, SlidersHorizontal
} from "lucide-react";

const DUMMY = [
  {
    _id: "1",
    title: "Royal Weekend Escape: 30% Off Luxury Suites",
    content: "Indulge in a weekend of celestial luxury with our exclusive seasonal offer. Book any of our Princess Suites and enjoy a complimentary moonlit dinner for two.",
    priority: "important",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80",
    publishDate: "2024-10-24",
    expiryDate: "2024-11-30",
    isPinned: true,
    isDraft: false,
    createdBy: "Admin",
    createdAt: "2024-10-20T08:00:00Z",
  },
  {
    _id: "2",
    title: "Scheduled Spa Renovation & Enhancements",
    content: "Our main spa facility will be undergoing minor upgrades to enhance your wellness experience. Select treatments will still be available in our garden pavilion.",
    priority: "normal",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80",
    publishDate: "2024-10-20",
    expiryDate: "2024-11-12",
    isPinned: false,
    isDraft: false,
    createdBy: "Admin",
    createdAt: "2024-10-18T10:30:00Z",
  },
  {
    _id: "3",
    title: "Annual Silver Moon Gala: Reservations Now Open",
    content: "Join us for an enchanting evening under the full moon. Seven-course dinner, live jazz quartet, and midnight fireworks over the reflecting pool.",
    priority: "urgent",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&q=80",
    publishDate: "2024-10-15",
    expiryDate: "2024-12-31",
    isPinned: false,
    isDraft: false,
    createdBy: "Admin",
    createdAt: "2024-10-12T09:00:00Z",
  },
  {
    _id: "4",
    title: "New Year Celebration Package — Draft",
    content: "Exclusive New Year's Eve package including a five-course dinner, champagne reception, and overnight stay in our Presidential Suite.",
    priority: "important",
    image: null,
    publishDate: null,
    expiryDate: null,
    isPinned: false,
    isDraft: true,
    createdBy: "Admin",
    createdAt: "2024-10-25T14:00:00Z",
  },
  {
    _id: "5",
    title: "Pool Maintenance Notice",
    content: "The rooftop infinity pool will be closed for routine maintenance on November 3rd from 8AM to 2PM. The garden pool remains open.",
    priority: "normal",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&q=80",
    publishDate: "2024-10-28",
    expiryDate: "2024-11-03",
    isPinned: false,
    isDraft: false,
    createdBy: "Admin",
    createdAt: "2024-10-26T11:00:00Z",
  },
  {
    _id: "6",
    title: "Winter Wellness Retreat — Draft",
    content: "A curated winter wellness programme featuring daily yoga sessions, heated stone therapy, and organic nourishment menus.",
    priority: "normal",
    image: null,
    publishDate: null,
    expiryDate: null,
    isPinned: false,
    isDraft: true,
    createdBy: "Admin",
    createdAt: "2024-10-27T16:00:00Z",
  },
];

const PRIORITY_META = {
  urgent:    { label: "Urgent",    color: "#dc2626", bg: "#fef2f2", border: "#fca5a5" },
  important: { label: "Important", color: "#d97706", bg: "#fffbeb", border: "#fcd34d" },
  normal:    { label: "Normal",    color: "#16a34a", bg: "#f0fdf4", border: "#86efac" },
};

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

export default function AllAnnouncementsPage() {
  const [search, setSearch]       = useState("");
  const [priority, setPriority]   = useState("all");
  const [sort, setSort]           = useState("newest");
  const [sortOpen, setSortOpen]   = useState(false);
  const [priOpen, setPriOpen]     = useState(false);

  const published = useMemo(() => {
    return DUMMY.filter((a) => !a.isDraft)
      .filter((a) => {
        const q = search.toLowerCase();
        return a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q);
      })
      .filter((a) => priority === "all" || a.priority === priority)
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        const da = new Date(a.createdAt), db = new Date(b.createdAt);
        return sort === "newest" ? db - da : da - db;
      });
  }, [search, priority, sort]);

  const drafts = useMemo(() => {
    return DUMMY.filter((a) => a.isDraft)
      .filter((a) => {
        const q = search.toLowerCase();
        return a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q);
      });
  }, [search]);

  return (
    <AdminPageLayout>
      <style>{`
        .ann-no-outline:focus,
        .ann-no-outline:focus-visible { outline: none !important; box-shadow: none !important; }
        .ann-row:hover { background: #faf7ff; }
        .ann-action:hover { background: #f3f0ff; }
      `}</style>

      <div className="rounded-[30px] bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] md:p-6">

        {/* ── HEADER ── */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
              <Megaphone size={14} /> Admin Panel
            </div>
            <h2 className="m-0 text-[20px] font-bold leading-tight text-[#1f2430] md:text-[24px]">
              All Announcements
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#6b7280]">
              Manage published announcements and drafts from one place.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-[#faf7ff] px-4 py-2 text-center">
              <p className="m-0 text-lg font-bold text-violet-700">{published.length}</p>
              <p className="m-0 text-xs text-gray-500">Published</p>
            </div>
            <div className="rounded-2xl bg-[#fffbeb] px-4 py-2 text-center">
              <p className="m-0 text-lg font-bold text-amber-600">{drafts.length}</p>
              <p className="m-0 text-xs text-gray-500">Drafts</p>
            </div>
          </div>
        </div>

        {/* ── TOOLBAR ── */}
        <div className="mb-6 flex flex-wrap items-center gap-3">

          {/* Search */}
          <div className="flex flex-1 min-w-[200px] items-center gap-2 rounded-2xl border border-[#e5e7eb] bg-white px-4 py-2.5 transition focus-within:border-violet-400">
            <Search size={15} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by title or content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ann-no-outline w-full border-none bg-transparent text-sm text-[#1f2430] outline-none placeholder:text-gray-400"
            />
            {search && (
              <button onClick={() => setSearch("")} className="ann-no-outline flex-shrink-0 text-gray-400 hover:text-gray-600">
                <AlertCircle size={14} />
              </button>
            )}
          </div>

          {/* Priority Filter */}
          <div className="relative">
            <button
              onClick={() => { setPriOpen((o) => !o); setSortOpen(false); }}
              className="ann-no-outline flex items-center gap-2 rounded-2xl border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] transition hover:border-violet-300"
              style={{ outline: "none", boxShadow: "none" }}
            >
              <Filter size={14} className="text-violet-600" />
              {priority === "all" ? "All Priorities" : PRIORITY_META[priority].label}
              <ChevronDown size={13} className="text-gray-400" style={{ transform: priOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform .2s" }} />
            </button>
            {priOpen && (
              <div className="absolute left-0 top-[calc(100%+6px)] z-50 min-w-[160px] overflow-hidden rounded-2xl border border-[#f3f4f6] bg-white shadow-lg">
                {[["all", "All Priorities", "#6b7280", "#f9fafb"], ...Object.entries(PRIORITY_META).map(([k, v]) => [k, v.label, v.color, v.bg])].map(([val, label, color, bg]) => (
                  <button
                    key={val}
                    onClick={() => { setPriority(val); setPriOpen(false); }}
                    className="ann-no-outline flex w-full items-center gap-2 px-4 py-2.5 text-sm transition hover:bg-violet-50"
                    style={{ background: priority === val ? bg : "transparent", color: priority === val ? color : "#374151", fontWeight: priority === val ? 600 : 400 }}
                  >
                    {val !== "all" && <Flag size={12} style={{ color }} />}
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => { setSortOpen((o) => !o); setPriOpen(false); }}
              className="ann-no-outline flex items-center gap-2 rounded-2xl border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] transition hover:border-violet-300"
              style={{ outline: "none", boxShadow: "none" }}
            >
              <SlidersHorizontal size={14} className="text-violet-600" />
              {sort === "newest" ? "Newest First" : "Oldest First"}
              <ChevronDown size={13} className="text-gray-400" style={{ transform: sortOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform .2s" }} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-[150px] overflow-hidden rounded-2xl border border-[#f3f4f6] bg-white shadow-lg">
                {[["newest", "Newest First"], ["oldest", "Oldest First"]].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => { setSort(val); setSortOpen(false); }}
                    className="ann-no-outline flex w-full items-center px-4 py-2.5 text-sm transition hover:bg-violet-50"
                    style={{ background: sort === val ? "#faf7ff" : "transparent", color: sort === val ? "#7c3aed" : "#374151", fontWeight: sort === val ? 600 : 400 }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* ── DRAFTS SECTION ── */}
        {drafts.length > 0 && (
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <FileText size={16} className="text-amber-500" />
              <h3 className="m-0 text-sm font-semibold text-amber-600 uppercase tracking-wide">
                Drafts ({drafts.length})
              </h3>
            </div>

            <div className="overflow-hidden rounded-[20px] border border-amber-100 bg-[#fffdf7]">
              {drafts.map((item, idx) => (
                <div
                  key={item._id}
                  className="ann-row flex items-center gap-4 px-5 py-4 transition"
                  style={{ borderTop: idx > 0 ? "1px solid #fef3c7" : "none" }}
                >
                  {/* Thumb */}
                  <div className="flex-shrink-0 h-12 w-12 rounded-xl overflow-hidden bg-amber-100 flex items-center justify-center">
                    {item.image
                      ? <img src={item.image} alt="" className="h-full w-full object-cover" />
                      : <FileText size={20} className="text-amber-400" />
                    }
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="m-0 text-sm font-semibold text-[#1f2430] truncate">{item.title}</p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-600 uppercase tracking-wide">
                        Draft
                      </span>
                    </div>
                    <p className="m-0 mt-1 text-xs text-gray-400 line-clamp-1">{item.content}</p>
                  </div>

                  {/* Meta */}
                  <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-xs text-gray-400">Created {formatDate(item.createdAt)}</span>
                    <PriorityBadge priority={item.priority} />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <ActionBtn icon={<Pencil size={14} />} title="Edit" />
                    <ActionBtn icon={<Trash2 size={14} />} title="Delete" danger />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PUBLISHED SECTION ── */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-violet-600" />
            <h3 className="m-0 text-sm font-semibold text-violet-700 uppercase tracking-wide">
              Published ({published.length})
            </h3>
          </div>

          {published.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-violet-200 bg-[#faf7ff] py-16 text-center">
              <Megaphone size={36} className="text-violet-300 mb-3" />
              <p className="text-sm font-semibold text-gray-500">No announcements found</p>
              <p className="mt-1 text-xs text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-[20px] border border-[#ede9fe] bg-[#fcfbff]">
              {published.map((item, idx) => (
                <div
                  key={item._id}
                  className="ann-row flex items-center gap-4 px-5 py-4 transition"
                  style={{ borderTop: idx > 0 ? "1px solid #ede9fe" : "none" }}
                >
                  {/* Thumb */}
                  <div className="relative flex-shrink-0 h-12 w-12 rounded-xl overflow-hidden bg-violet-100">
                    {item.image
                      ? <img src={item.image} alt="" className="h-full w-full object-cover" />
                      : <Megaphone size={20} className="absolute inset-0 m-auto text-violet-400" />
                    }
                    {item.isPinned && (
                      <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-700 shadow">
                        <Pin size={8} className="text-white" style={{ transform: "rotate(45deg)" }} />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="m-0 text-sm font-semibold text-[#1f2430] truncate">{item.title}</p>
                      {item.isPinned && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-700 uppercase tracking-wide">
                          <Pin size={8} style={{ transform: "rotate(45deg)" }} /> Pinned
                        </span>
                      )}
                    </div>
                    <p className="m-0 mt-1 text-xs text-gray-400 line-clamp-1">{item.content}</p>
                  </div>

                  {/* Meta */}
                  <div className="hidden lg:flex flex-col items-end gap-1.5 flex-shrink-0">
                    <PriorityBadge priority={item.priority} />
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} /> {formatDate(item.publishDate)}
                      </span>
                      {item.expiryDate && (
                        <span className="flex items-center gap-1">
                          <Clock size={11} /> {formatDate(item.expiryDate)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <ActionBtn icon={<Eye size={14} />} title="View" />
                    <ActionBtn icon={<Pencil size={14} />} title="Edit" />
                    <ActionBtn icon={<Trash2 size={14} />} title="Delete" danger />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </AdminPageLayout>
  );
}

/* ── Sub-components ── */

function PriorityBadge({ priority }) {
  const meta = PRIORITY_META[priority] || PRIORITY_META.normal;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
      style={{ backgroundColor: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}
    >
      <Flag size={9} />
      {meta.label}
    </span>
  );
}

function ActionBtn({ icon, title, danger = false }) {
  return (
    <button
      title={title}
      className="ann-no-outline ann-action flex h-8 w-8 items-center justify-center rounded-xl transition"
      style={{
        border: "none",
        background: "transparent",
        color: danger ? "#ef4444" : "#7c3aed",
        outline: "none",
        boxShadow: "none",
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = danger ? "#fef2f2" : "#f3f0ff"}
      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
    >
      {icon}
    </button>
  );
}