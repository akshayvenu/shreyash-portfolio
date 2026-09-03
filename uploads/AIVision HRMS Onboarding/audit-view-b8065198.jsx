// Audit Trail Screen
const { useState: useStateA, useMemo: useMemoA } = React;

function AuditView({ onBack, role, onRoleChange }) {
  const [actionF, setActionF] = useStateA('all');
  const [stageF, setStageF] = useStateA('all');
  const [actorF, setActorF] = useStateA('all');

  const filtered = useMemoA(() => {
    return AIV.AUDIT_TRAIL.filter(a => {
      if (actionF !== 'all' && a.action !== actionF) return false;
      if (stageF !== 'all' && a.stage !== stageF) return false;
      if (actorF !== 'all' && a.actor !== actorF) return false;
      return true;
    });
  }, [actionF, stageF, actorF]);

  function reset() { setActionF('all'); setStageF('all'); setActorF('all'); }

  return (
    <Shell>
      <TopNav crumb={['AIVision HRMS', 'Onboarding', 'Arjun Mehta', 'Audit Trail']} showBack onBack={onBack} role={role} onRoleChange={onRoleChange} />
      <div className="main">
        <div className="page-header">
          <div>
            <div className="page-title">Audit Trail</div>
            <div className="page-subtitle">Arjun Mehta · AIV-2025-0142</div>
          </div>
        </div>

        <div className="card" style={{ maxWidth: 960 }}>
          <div className="audit-card-header">
            <div>
              <div className="audit-card-title">Audit Trail</div>
              <div className="audit-card-sub">Arjun Mehta · AIV-2025-0142 · {AIV.AUDIT_TRAIL.length} events</div>
            </div>
            <div className="audit-card-actions">
              <button className="btn-ghost">Export</button>
              <select className="audit-select">
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
          </div>

          <div className="audit-filters">
            <div className="action-pills">
              {['all', 'CREATE', 'UPDATE', 'DELETE'].map(a => (
                <button key={a} className={`action-pill ${actionF === a ? 'active' : ''}`}
                  onClick={() => setActionF(a)}>
                  {a === 'all' ? 'All' : a}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <select className="audit-select" value={stageF} onChange={e => setStageF(e.target.value)}>
                <option value="all">All Stages</option>
                <option value="offer_letter">offer_letter</option>
                <option value="kyc">kyc</option>
                <option value="approval">approval</option>
                <option value="onboarded">onboarded</option>
                <option value="other">other</option>
              </select>
              <select className="audit-select" value={actorF} onChange={e => setActorF(e.target.value)}>
                <option value="all">All Actors</option>
                <option value="system">System</option>
                <option value="Ravi Kumar">Ravi Kumar</option>
                <option value="Priya Sharma">Priya Sharma</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="audit-empty">
              <img src="https://img.icons8.com/3d-fluency/200/clock.png" alt="" />
              <div className="t">No events match your filters</div>
              <button className="btn-ghost" style={{ marginTop: 12 }} onClick={reset}>Clear filters</button>
            </div>
          ) : (
            <div>
              {filtered.map((a, i) => {
                const actor = AIV.ACTORS[a.actor];
                return (
                  <div className="audit-row" key={i} style={{ animationDelay: `${i * 50}ms` }}>
                    <div className={`audit-marker ${a.action}`}>
                      <div className="bar"></div>
                      <div className="dot"></div>
                    </div>
                    <div className="audit-date">
                      <div className="d">{a.date}</div>
                      <div className="t">{a.time}</div>
                    </div>
                    <div className="audit-content">
                      <div className="audit-top">
                        <span className={`action-badge ${a.action}`}>{a.action}</span>
                        <span className="audit-entity">candidate_onboarding</span>
                      </div>
                      {a.changes.length > 0 && (
                        <div className="audit-changes">
                          {a.changes.map((c, j) => (
                            <div className="change-line" key={j}>
                              <span className="change-field">{c.field}</span>
                              <span className="mini-pill old">{c.old}</span>
                              <span className="arrow">→</span>
                              <span className="mini-pill new-green">{c.new}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {a.note && <div className="change-note" style={{ marginTop: 4 }}>{a.note}</div>}
                      <div className="audit-actor">
                        <div className="avatar avatar-24" style={{ background: actor.bg, color: actor.color }}>{actor.initials}</div>
                        <span className="name">{a.actor}</span>
                        <span className="meta">· {actor.via}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="pagination">
            <div className="pagination-info">Showing {filtered.length} of {AIV.AUDIT_TRAIL.length} events</div>
            <div style={{ fontSize: 12, color: '#94A3B8', fontFamily: "'SF Mono', Menlo, monospace" }}>skip=0 · limit=50</div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

window.AuditView = AuditView;
