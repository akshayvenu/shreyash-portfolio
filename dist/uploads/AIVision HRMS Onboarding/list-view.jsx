// List View Screen
const { useState: useStateL, useMemo: useMemoL } = React;

function ListView({ onOpenDetail, role, onRoleChange }) {
  const [search, setSearch] = useStateL('');
  const [typeF, setTypeF] = useStateL('all');
  const [stageF, setStageF] = useStateL('all');
  const [statusF, setStatusF] = useStateL('all');

  const filtered = useMemoL(() => {
    return AIV.PEOPLE.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.id.toLowerCase().includes(q) && !p.role.toLowerCase().includes(q)) return false;
      }
      if (typeF !== 'all' && p.type !== typeF) return false;
      if (stageF !== 'all' && statusF !== 'all') {
        if (stageF === 'kyc') {
          const anyMatch = Object.values(p.kyc).some((s) => s === statusF);
          if (!anyMatch) return false;
        } else {
          const stageVal = stageF === 'offer_letter' ? p.offer : stageF === 'approval' ? p.approval : p.onboarded;
          if (stageVal !== statusF) return false;
        }
      } else if (statusF !== 'all') {
        const all = [p.offer, p.approval, p.onboarded, ...Object.values(p.kyc)];
        if (!all.includes(statusF)) return false;
      }
      return true;
    });
  }, [search, typeF, stageF, statusF]);

  return (
    <Shell>
      <TopNav crumb={['AIVision HRMS', 'Onboarding']} role={role} onRoleChange={onRoleChange} />
      <div className="main">
        <div className="page-header">
          <div>
            <div className="page-title" style={{ fontFamily: "Poppins", fontSize: "24px", borderStyle: "solid", borderWidth: "0px" }}>Onboarding Pipeline</div>
            <div className="page-subtitle">Track and manage all candidate &amp; employee onboarding stages</div>
          </div>
          <button className="btn-export"><IconDownload /> Export CSV</button>
        </div>

        <div className="stats">
          <div className="stat-card">
            <div className="stat-label">Total Active</div>
            <div className="stat-value">48</div>
            <div className="stat-sub"><span className="stat-dot" style={{ background: 'var(--text-hint)' }}></span>Across all stages</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">KYC Pending</div>
            <div className="stat-value" style={{ color: '#D97706' }}>11</div>
            <div className="stat-sub"><span className="stat-dot" style={{ background: '#D97706' }}></span>Needs attention</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Awaiting Approval</div>
            <div className="stat-value" style={{ color: '#2563EB' }}>7</div>
            <div className="stat-sub"><span className="stat-dot" style={{ background: '#3B82F6' }}></span>Approval pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Completed</div>
            <div className="stat-value" style={{ color: '#16A34A' }}>23</div>
            <div className="stat-sub"><span className="stat-dot" style={{ background: '#16A34A' }}></span>This month</div>
          </div>
        </div>

        <div className="card">
          <div className="filter-bar">
            <div className="filter-left">
              <div className="search-input-wrap">
                <IconSearch />
                <input className="search-input" placeholder="Search by name, ID, role…" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <select className="select" value={typeF} onChange={(e) => setTypeF(e.target.value)}>
                <option value="all">All Types</option>
                <option value="candidate">Candidate</option>
                <option value="employee">Employee</option>
              </select>
              <select className="select" value={stageF} onChange={(e) => setStageF(e.target.value)}>
                <option value="all">All Stages</option>
                <option value="offer_letter">Offer Letter</option>
                <option value="kyc">KYC</option>
                <option value="approval">Approval</option>
                <option value="onboarded">Onboarded</option>
              </select>
              <select className="select" value={statusF} onChange={(e) => setStatusF(e.target.value)}>
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="not_started">Not Started</option>
              </select>
            </div>
            <div className="filter-right">Showing {filtered.length} of 48</div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Candidate / Employee</th>
                <th className="center">Type</th>
                <th className="center">Offer Letter</th>
                <th className="center">KYC Status</th>
                <th className="center">Onboarded</th>
                <th>Updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) =>
              <tr key={p.id} onClick={() => p.id === 'AIV-2025-0142' ? onOpenDetail(p.id) : onOpenDetail(p.id)}>
                  <td>
                    <div className="person-cell">
                      <Avatar initials={p.initials} color={p.color} size={38} />
                      <div>
                        <div className="person-name">{p.name}</div>
                        <div className="person-role">{p.role} · {p.dept}</div>
                        <div className="person-id">{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="center"><span className={`type-pill ${p.type}`}>{p.type}</span></td>
                  <td className="center"><Badge status={p.offer} /></td>
                  <td className="center"><Badge status={(() => {
                    const vals = Object.values(p.kyc);
                    if (vals.every((v) => v === 'verified' || v === 'not_required')) return 'verified';
                    if (vals.some((v) => v === 'rejected')) return 'rejected';
                    if (vals.every((v) => v === 'not_started')) return 'not_started';
                    return 'pending';
                  })()} /></td>
                  <td className="center"><Badge status={p.onboarded} /></td>
                  <td>
                    <div className="date-cell">
                      <div className="d">{p.updatedDate}</div>
                      <div className="t">{p.updatedTime}</div>
                    </div>
                  </td>
                  <td>
                    <button className="btn-view" onClick={(e) => {e.stopPropagation();onOpenDetail(p.id);}}>
                      View <IconArrowRight />
                    </button>
                  </td>
                </tr>
              )}
              {filtered.length === 0 &&
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '48px', color: '#94A3B8' }}>No matches found.</td></tr>
              }
            </tbody>
          </table>

          <div className="pagination">
            <div className="pagination-info">Page 1 of 6 · 48 records</div>
            <div className="page-buttons">
              <button className="page-btn" disabled><IconChevL /></button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span className="page-ellipsis">…</span>
              <button className="page-btn">6</button>
              <button className="page-btn"><IconChevR /></button>
            </div>
          </div>
        </div>
      </div>
    </Shell>);

}

window.ListView = ListView;