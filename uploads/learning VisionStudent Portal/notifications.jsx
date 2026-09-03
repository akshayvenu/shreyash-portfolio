// ============================================================
// STEP 4 — NOTIFICATIONS SCREEN
// ============================================================
const { useState: useStateNF } = React;

function NotificationRow({ notif, onMarkRead }) {
  const { Bell, AlertCircle, Award, BookOpen } = window.LucideIcons;
  const [hover, setHover] = useStateNF(false);
  let icon = <Bell size={18} color="#6B6B8A" />;
  let bg = '#F5F0EB';
  if (notif.type === 'test') {
    icon = (
      <img
        src="https://img.icons8.com/pulsar-color/48/test-passed.png"
        width={20} height={20} alt=""
        style={{ background: 'transparent' }}
      />
    );
    bg = '#EFF6FF';
  } else if (notif.type === 'deadline') {
    icon = <AlertCircle size={18} color="#DC2626" />;
    bg = '#FEF2F2';
  } else if (notif.type === 'result') {
    icon = <Award size={18} color="#16A34A" />;
    bg = '#DCFCE7';
  } else if (notif.type === 'content') {
    icon = <BookOpen size={18} color="#E8620A" />;
    bg = '#FFF3EE';
  }

  const rowBg = !notif.read
    ? '#FFFCFA'
    : (hover ? '#FFFCFA' : 'white');
  const rowBorder = !notif.read || hover ? '1px solid #EEE8E3' : '1px solid transparent';

  return (
    <div
      onClick={() => onMarkRead(notif.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', gap: 14, alignItems: 'flex-start',
        padding: '14px 16px',
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all 0.15s',
        marginBottom: 6,
        background: rowBg,
        border: rowBorder
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0
      }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex', gap: 8, alignItems: 'center', marginBottom: 3
        }}>
          <div style={{
            fontSize: 14,
            fontWeight: !notif.read ? 600 : 500,
            color: '#1A1A2E'
          }}>{notif.title}</div>
          {!notif.read && (
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#BD1313', flexShrink: 0
            }} />
          )}
        </div>
        <div style={{ fontSize: 13, color: '#4A4A68', lineHeight: 1.5 }}>
          {notif.body}
        </div>
        <div style={{ fontSize: 11, color: '#9898B0', marginTop: 4 }}>
          {notif.time}
        </div>
      </div>
      {!notif.read && (
        <button
          onClick={(e) => { e.stopPropagation(); onMarkRead(notif.id); }}
          style={{
            background: 'transparent',
            border: '1px solid #EEE8E3',
            color: '#9898B0',
            height: 26, padding: '0 8px',
            borderRadius: 6, cursor: 'pointer',
            fontSize: 11, fontWeight: 500,
            whiteSpace: 'nowrap',
            fontFamily: "'Poppins', sans-serif"
          }}
        >Mark read</button>
      )}
    </div>
  );
}

function NotificationsScreen(props) {
  const {
    notifList2, setNotifList2, showToast
  } = props;
  const { Bell, AlertCircle, Award, BookOpen } = window.LucideIcons;
  const unread = notifList2.filter(n => !n.read);

  const markAll = () => {
    setNotifList2(prev => prev.map(n => ({ ...n, read: true })));
    setTimeout(() => showToast('All notifications marked as read', 'success'), 0);
  };
  const markRead = (id) =>
    setNotifList2(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const groups = [
    { label: 'New',     items: notifList2.filter(n => !n.read) },
    { label: 'Earlier', items: notifList2.filter(n => n.read) }
  ].filter(g => g.items.length > 0);

  const typeMeta = [
    { type: 'test',     label: 'Tests',     bg: '#EFF6FF', icon: (
        <img src="https://img.icons8.com/pulsar-color/48/test-passed.png"
             width={14} height={14} alt=""
             style={{ background: 'transparent' }} />
      ) },
    { type: 'deadline', label: 'Deadlines', bg: '#FEF2F2', icon: <AlertCircle size={14} color="#DC2626" /> },
    { type: 'result',   label: 'Results',   bg: '#DCFCE7', icon: <Award size={14} color="#16A34A" /> },
    { type: 'content',  label: 'Content',   bg: '#FFF3EE', icon: <BookOpen size={14} color="#E8620A" /> }
  ];

  const [prefs, setPrefs] = useStateNF({
    testReminders: true,
    deadlineAlerts: true,
    contentUpdates: false
  });
  const togglePref = (k) => {
    setPrefs(p => ({ ...p, [k]: !p[k] }));
    setTimeout(() => showToast('Preferences updated', 'info'), 0);
  };
  const prefRows = [
    { key: 'testReminders',  label: 'Test Reminders' },
    { key: 'deadlineAlerts', label: 'Deadline Alerts' },
    { key: 'contentUpdates', label: 'Content Updates' }
  ];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%', overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        height: 56, background: 'white',
        borderBottom: '1px solid #EEE8E3',
        padding: '0 24px',
        display: 'flex', alignItems: 'center', gap: 16,
        flexShrink: 0
      }}>
        <div style={{
          display: 'flex', gap: 10, alignItems: 'center'
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: '#FFFBEB',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Bell size={16} color="#D97706" />
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A2E' }}>
            Notifications
          </div>
          {unread.length > 0 && (
            <span style={{
              background: '#BD1313', color: 'white',
              fontSize: 11, fontWeight: 700,
              borderRadius: 9999, padding: '2px 8px',
              fontFamily: "'Poppins', sans-serif"
            }}>{unread.length} new</span>
          )}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {unread.length > 0 && (
            <button
              onClick={markAll}
              style={{
                color: '#BD1313', fontSize: 12, fontWeight: 500,
                background: 'transparent', border: 'none', cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif"
              }}
            >Mark all read</button>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{
        flex: 1, overflow: 'hidden', display: 'flex', minHeight: 0
      }}>
        {/* List */}
        <div
          className="inner-scroll"
          style={{ flex: 1, overflowY: 'auto', padding: 24 }}
        >
          {notifList2.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '48px 0', color: '#9898B0'
            }}>No notifications.</div>
          ) : (
            <>
              {unread.length === 0 && (
                <div style={{
                  background: '#F0FDF4',
                  border: '1px solid #86EFAC',
                  borderRadius: 12,
                  padding: '16px 20px',
                  display: 'flex', gap: 10, alignItems: 'center',
                  marginBottom: 20
                }}>
                  {React.createElement(window.LucideIcons.CheckCircle, { size: 18, color: '#16A34A' })}
                  <span style={{
                    fontSize: 13, fontWeight: 500, color: '#16A34A'
                  }}>You're all caught up! No new notifications.</span>
                </div>
              )}
              {groups.map(group => (
            <div key={group.label} style={{ marginBottom: 20 }}>
              <div style={{
                fontSize: 11, fontWeight: 600, color: '#9898B0',
                textTransform: 'uppercase', letterSpacing: '0.8px',
                padding: '0 0 10px'
              }}>{group.label}</div>
              {group.items.map(notif => (
                <NotificationRow
                  key={notif.id}
                  notif={notif}
                  onMarkRead={markRead}
                />
              ))}
            </div>
          ))}
            </>
          )}
        </div>

        {/* Sidebar */}
        <div
          className="inner-scroll"
          style={{
            width: 280, padding: 20, flexShrink: 0,
            overflowY: 'auto', minHeight: 0,
            background: 'white',
            borderLeft: '1px solid #EEE8E3',
            display: 'flex', flexDirection: 'column', gap: 16
          }}
        >
          {/* Summary */}
          <div style={{
            background: 'white', border: '1px solid #EEE8E3',
            borderRadius: 16, padding: 16
          }}>
            <div style={{
              fontSize: 13, fontWeight: 600, color: '#1A1A2E', marginBottom: 12
            }}>Summary</div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8
            }}>
              {[
                { v: notifList2.length, l: 'Total', c: '#1A1A2E' },
                { v: notifList2.filter(n => !n.read).length, l: 'Unread', c: '#BD1313' },
                { v: notifList2.filter(n => n.type === 'test').length, l: 'Tests', c: '#1A1A2E' },
                { v: notifList2.filter(n => n.type === 'result').length, l: 'Results', c: '#1A1A2E' }
              ].map(s => (
                <div key={s.l} style={{
                  background: '#FDF8F4', borderRadius: 10,
                  padding: '10px 12px', textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: 18, fontWeight: 700,
                    color: s.l === 'Unread' && s.v > 0 ? '#BD1313' : '#1A1A2E'
                  }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: '#9898B0' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Types */}
          <div style={{
            background: 'white', border: '1px solid #EEE8E3',
            borderRadius: 16, padding: 16
          }}>
            <div style={{
              fontSize: 13, fontWeight: 600, color: '#1A1A2E', marginBottom: 12
            }}>Notification Types</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {typeMeta.map(t => (
                <div key={t.type} style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '10px 12px',
                  borderRadius: 10, background: '#FDF8F4'
                }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8,
                      background: t.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>{t.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: '#4A4A68' }}>
                      {t.label}
                    </div>
                  </div>
                  <span style={{
                    background: 'white', border: '1px solid #EEE8E3',
                    color: '#1A1A2E', fontSize: 11, fontWeight: 600,
                    borderRadius: 9999, padding: '2px 8px',
                    fontFamily: "'Poppins', sans-serif"
                  }}>{notifList2.filter(n => n.type === t.type).length}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div style={{
            background: 'white', border: '1px solid #EEE8E3',
            borderRadius: 16, padding: 16
          }}>
            <div style={{
              fontSize: 13, fontWeight: 600, color: '#1A1A2E', marginBottom: 12
            }}>Preferences</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {prefRows.map(r => {
                const on = prefs[r.key];
                return (
                  <div key={r.key} style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ fontSize: 13, color: '#4A4A68' }}>
                      {r.label}
                    </div>
                    <div
                      onClick={() => togglePref(r.key)}
                      style={{
                        width: 36, height: 20, borderRadius: 9999,
                        background: on ? '#BD1313' : '#EEE8E3',
                        position: 'relative', cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    >
                      <div style={{
                        width: 16, height: 16, borderRadius: '50%',
                        background: 'white',
                        position: 'absolute', top: 2,
                        left: on ? 'auto' : 2,
                        right: on ? 2 : 'auto',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                        transition: 'all 0.2s'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { NotificationsScreen });
