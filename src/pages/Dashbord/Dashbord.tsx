import React, { useState } from "react";
import type { ApprovalItem } from "../../Types/index";
import { adminActivity, approvals, eventBreakdown, calendarEventDays } from "../../data/mockData";

const StatCard: React.FC<{ label: string; value: string; sub: string; accent: string }> = ({ label, value, sub, accent }) => (
  <div style={{ ...styles.statCard }}>
    <div style={{ ...styles.accentBar, background: accent }} />
    <div style={styles.statLabel}>{label}</div>
    <div style={styles.statVal}>{value}</div>
    <div style={styles.statSub}>{sub}</div>
  </div>
);

const MiniCalendar: React.FC = () => {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const today = 8;
  const eventDays = calendarEventDays;

  return (
    <div style={styles.panel}>
      <div style={styles.panelHd}>
        <div style={styles.panelTitle}>
          <i className="ti ti-calendar" style={{ fontSize: 15 }} aria-hidden="true" /> June 2026
        </div>
      </div>
      <div style={styles.calGrid}>
        {days.map((d) => (
          <div key={d} style={styles.calHead}>{d}</div>
        ))}
        {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
          let cellStyle = { ...styles.calDay };
          if (d === today) cellStyle = { ...cellStyle, ...styles.calToday };
          else if (eventDays.includes(d)) cellStyle = { ...cellStyle, ...styles.calEvent };
          return <div key={d} style={cellStyle}>{d}</div>;
        })}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [pendingApprovals, setPendingApprovals] = useState<ApprovalItem[]>(approvals);

  const handleApprove = (id: string) => {
    setPendingApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "approved" as const } : a))
    );
  };

  const handleReject = (id: string) => {
    setPendingApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "rejected" as const } : a))
    );
  };

  return (
    <div style={styles.content}>
      {/* Stats */}
      <div style={styles.statGrid}>
        <StatCard label="Total events" value="142" sub="This semester" accent="#7F77DD" />
        <StatCard label="Pending approval" value={String(pendingApprovals.filter((a) => a.status === "pending").length)} sub="Needs action" accent="#EF9F27" />
        <StatCard label="Total registrations" value="1,284" sub="Across all events" accent="#1D9E75" />
        <StatCard label="Active users" value="393" sub="345 students · 48 faculty" accent="#378ADD" />
      </div>

      {/* Middle row */}
      <div style={styles.twoCol}>
        {/* Approvals */}
        <div style={styles.panel}>
          <div style={styles.panelHd}>
            <div style={styles.panelTitle}>
              <i className="ti ti-clock-check" style={{ fontSize: 15 }} aria-hidden="true" /> Pending approvals
            </div>
            <button style={styles.viewAll}>View all</button>
          </div>
          {pendingApprovals.map((item) => (
            <div key={item.id} style={{ ...styles.approvalRow, opacity: item.status !== "pending" ? 0.4 : 1 }}>
              <div style={styles.approvalInfo}>
                <div style={styles.approvalName}>{item.eventTitle}</div>
                <div style={styles.approvalSub}>
                  {item.submittedBy} · {item.department} · {item.date}
                </div>
              </div>
              {item.status === "pending" ? (
                <div style={styles.approvalActions}>
                  <button style={styles.btnApprove} onClick={() => handleApprove(item.id)}>Approve</button>
                  <button style={styles.btnReject} onClick={() => handleReject(item.id)}>Reject</button>
                </div>
              ) : (
                <span style={{
                  ...styles.badge,
                  ...(item.status === "approved" ? styles.bApproved : styles.bRejected),
                }}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Activity */}
        <div style={styles.panel}>
          <div style={styles.panelHd}>
            <div style={styles.panelTitle}>
              <i className="ti ti-activity" style={{ fontSize: 15 }} aria-hidden="true" /> Recent activity
            </div>
          </div>
          {adminActivity.map((item) => (
            <div key={item.id} style={styles.actRow}>
              <div style={{ ...styles.actDot, background: item.dotColor }} />
              <div>
                <div style={styles.actText}>{item.text}</div>
                <div style={styles.actTime}>{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div style={styles.twoCol}>
        <MiniCalendar />
        <div style={styles.panel}>
          <div style={styles.panelHd}>
            <div style={styles.panelTitle}>
              <i className="ti ti-chart-bar" style={{ fontSize: 15 }} aria-hidden="true" /> Event breakdown
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
            {eventBreakdown.map((item) => (
              <div key={item.label}>
                <div style={styles.barLabel}>
                  <span style={{ fontSize: 12, color: "#777" }}>{item.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#1a1a1a" }}>{item.count}</span>
                </div>
                <div style={styles.pbarBg}>
                  <div style={{ ...styles.pbarFill, width: `${Math.round((item.count / item.total) * 100)}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  content: { flex: 1, padding: "16px 20px", overflowY: "auto" },
  statGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 },
  statCard: { background: "#f5f4f0", borderRadius: 8, padding: 14, position: "relative", overflow: "hidden" },
  accentBar: { position: "absolute", top: 0, left: 0, width: 3, height: "100%", borderRadius: "2px 0 0 2px" },
  statLabel: { fontSize: 11, color: "#777", marginBottom: 6, paddingLeft: 8 },
  statVal: { fontSize: 22, fontWeight: 500, color: "#1a1a1a", paddingLeft: 8, lineHeight: 1 },
  statSub: { fontSize: 11, color: "#aaa", paddingLeft: 8, marginTop: 3 },
  twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 },
  panel: { background: "#fff", border: "0.5px solid #e8e6df", borderRadius: 12, padding: "14px 16px" },
  panelHd: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  panelTitle: { fontSize: 13, fontWeight: 500, color: "#1a1a1a", display: "flex", alignItems: "center", gap: 6 },
  viewAll: { fontSize: 11, color: "#185FA5", cursor: "pointer", border: "none", background: "none", padding: 0, fontFamily: "inherit" },
  approvalRow: { display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "0.5px solid #f0ede6" },
  approvalInfo: { flex: 1, minWidth: 0 },
  approvalName: { fontSize: 13, fontWeight: 500, color: "#1a1a1a" },
  approvalSub: { fontSize: 11, color: "#aaa", marginTop: 2 },
  approvalActions: { display: "flex", gap: 6 },
  btnApprove: { padding: "4px 10px", fontSize: 11, borderRadius: 8, border: "0.5px solid #1D9E75", background: "#E1F5EE", color: "#085041", cursor: "pointer", fontWeight: 500, fontFamily: "inherit" },
  btnReject: { padding: "4px 10px", fontSize: 11, borderRadius: 8, border: "0.5px solid #e8e6df", background: "#fff", color: "#666", cursor: "pointer", fontFamily: "inherit" },
  badge: { fontSize: 10, fontWeight: 500, padding: "3px 7px", borderRadius: 99 },
  bApproved: { background: "#EAF3DE", color: "#27500A" },
  bRejected: { background: "#FCEBEB", color: "#791F1F" },
  actRow: { display: "flex", alignItems: "flex-start", gap: 10, padding: "7px 0", borderBottom: "0.5px solid #f0ede6" },
  actDot: { width: 7, height: 7, borderRadius: "50%", marginTop: 5, flexShrink: 0 },
  actText: { fontSize: 12, color: "#555", lineHeight: 1.5 },
  actTime: { fontSize: 11, color: "#aaa", marginTop: 1 },
  calGrid: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3, marginTop: 8 },
  calHead: { fontSize: 10, color: "#aaa", textAlign: "center", padding: "3px 0", fontWeight: 500 },
  calDay: { fontSize: 11, textAlign: "center", padding: "5px 3px", borderRadius: 6, color: "#777" },
  calToday: { background: "#7F77DD", color: "#fff", fontWeight: 500 },
  calEvent: { background: "#EEEDFE", color: "#3C3489", fontWeight: 500, cursor: "pointer" },
  barLabel: { display: "flex", justifyContent: "space-between", marginBottom: 4 },
  pbarBg: { height: 4, borderRadius: 99, background: "#e8e6df", overflow: "hidden" },
  pbarFill: { height: "100%", borderRadius: 99, transition: "width 0.4s ease" },
};

export default Dashboard;
