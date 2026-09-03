// ============================================================
// STEP 6 — ANALYTICS SCREEN
// ============================================================
const { useState: useStateAN } = React;

function AnalyticsStatCard({ stat }) {
  const [hover, setHover] = useStateAN(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: stat.gradient,
        border: '1px solid #EEE8E3',
        borderRadius: 16, padding: '16px 20px',
        borderTop: `3px solid ${stat.borderColor}`,
        position: 'relative', overflow: 'hidden',
        transition: 'all 0.2s',
        transform: hover ? 'translateY(-2px)' : 'none',
        boxShadow: hover ? '0 8px 24px rgba(26,26,46,0.10)' : 'none'
      }}
    >
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: 8
      }}>
        <img src={stat.icon} width={28} height={28} alt="" style={{ background: 'transparent' }} />
        <span style={{
          fontSize: 11, fontWeight: 600,
          color: stat.subColor,
          background: stat.subColor + '14',
          borderRadius: 9999, padding: '2px 8px',
          fontFamily: "'Poppins', sans-serif",
          whiteSpace: 'nowrap'
        }}>{stat.sub}</span>
      </div>
      <div style={{
        fontSize: 28, fontWeight: 700, color: '#1A1A2E',
        lineHeight: 1, marginBottom: 2
      }}>{stat.value}</div>
      <div style={{
        fontSize: 11, color: '#9898B0',
        textTransform: 'uppercase', letterSpacing: '0.6px'
      }}>{stat.label}</div>
    </div>
  );
}

function WeeklyHoursChart({ data }) {
  const { BarChart } = window.LucideIcons;
  const maxH = 12;
  const total = data.reduce((s, w) => s + w.hours, 0);
  return (
    <div style={{
      background: 'white', border: '1px solid #EEE8E3',
      borderRadius: 16, padding: 20
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 20
      }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <BarChart size={16} color="#2563EB" />
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A2E' }}>
            Weekly Learning Hours
          </div>
        </div>
        <div style={{ fontSize: 12, color: '#9898B0' }}>{total}h total</div>
      </div>

      <div style={{ position: 'relative', height: 180 }}>
        {/* Y-axis labels */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 20,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          fontSize: 10, color: '#9898B0', width: 24
        }}>
          <span>12</span>
          <span>6</span>
          <span>0</span>
        </div>
        {/* Grid lines */}
        <div style={{
          position: 'absolute', left: 28, right: 0, top: 0, bottom: 20
        }}>
          {[0, 0.5, 1].map(t => (
            <div key={t} style={{
              position: 'absolute', left: 0, right: 0,
              top: `${t * 100}%`,
              height: 1, background: '#F5F0EB'
            }} />
          ))}
        </div>
        {/* Bars */}
        <div style={{
          paddingLeft: 28, paddingBottom: 20,
          display: 'flex', alignItems: 'flex-end',
          gap: 8, height: '100%', position: 'relative'
        }}>
          {data.map((w, i) => {
            const isCurrent = i === data.length - 1;
            const barH = Math.max(6, Math.round((w.hours / maxH) * 140));
            return (
              <div key={w.label} style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 4, flex: 1
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 600,
                  color: isCurrent ? '#2563EB' : '#4A4A68'
                }}>{w.hours}h</div>
                <div style={{
                  width: '100%', maxWidth: 36,
                  height: barH,
                  borderRadius: '6px 6px 0 0',
                  background: isCurrent
                    ? 'linear-gradient(180deg, #2563EB, #1D4ED8)'
                    : '#EFF6FF',
                  border: isCurrent ? 'none' : '1px solid #BFDBFE',
                  transition: 'height 800ms ease-out'
                }} />
                <div style={{
                  fontSize: 9, color: '#9898B0', textAlign: 'center'
                }}>{w.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function BatchProgressCard({ batches }) {
  const { TrendingUp } = window.LucideIcons;
  return (
    <div style={{
      background: 'white', border: '1px solid #EEE8E3',
      borderRadius: 16, padding: 20
    }}>
      <div style={{
        display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16
      }}>
        <TrendingUp size={16} color="#BD1313" />
        <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A2E' }}>
          Batch Progress
        </div>
      </div>
      {batches.map((b, i, arr) => (
        <div key={b.name} style={{ marginBottom: i === arr.length - 1 ? 0 : 14 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 6
          }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%', background: b.color
              }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: '#1A1A2E' }}>
                {b.name}
              </span>
            </div>
            <div style={{
              fontSize: 13, fontWeight: 700,
              color: window.getProgressColor(b.pct)
            }}>{b.pct}%</div>
          </div>
          <div style={{
            height: 10, background: '#EEE8E3',
            borderRadius: 9999, overflow: 'hidden'
          }}>
            <div style={{
              width: `${b.pct}%`, height: '100%',
              background: b.color,
              borderRadius: 9999,
              transition: 'width 800ms ease-out'
            }} />
          </div>
          {b.pct === 100 && (
            <div style={{ fontSize: 11, color: '#16A34A', marginTop: 4 }}>
              ✓ Completed
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ContentTypeBreakdown({ data }) {
  const { BookOpen } = window.LucideIcons;
  const total = data.reduce((s, d) => s + d.count, 0);
  const r = 44;
  const C = 2 * Math.PI * r; // ~276.46

  // Pre-compute cumulative percentage starts
  let cum = 0;
  const segments = data.map(item => {
    const dashLen = (item.pct / 100) * C;
    const start = cum;
    cum += item.pct;
    return { ...item, dashLen, startPct: start };
  });

  return (
    <div style={{
      background: 'white', border: '1px solid #EEE8E3',
      borderRadius: 16, padding: 20
    }}>
      <div style={{
        display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16
      }}>
        <BookOpen size={16} color="#E8620A" />
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>
          Content Breakdown
        </div>
      </div>

      <div style={{
        position: 'relative', width: 120, height: 120,
        margin: '0 auto 16px'
      }}>
        <svg viewBox="0 0 120 120" width={120} height={120}>
          <circle cx="60" cy="60" r={r} fill="none" stroke="#F5F0EB" strokeWidth="18" />
          {segments.map(seg => {
            // strokeDashoffset rotates the dash; using transform rotate(-90) to start at top
            const offset = -((seg.startPct / 100) * C);
            return (
              <circle
                key={seg.type}
                cx="60" cy="60" r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth="18"
                strokeDasharray={`${seg.dashLen} ${C - seg.dashLen}`}
                strokeDashoffset={offset}
                transform="rotate(-90 60 60)"
                style={{ transition: 'stroke-dasharray 800ms ease-out' }}
              />
            );
          })}
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A2E' }}>
            {total}
          </div>
          <div style={{
            fontSize: 10, color: '#9898B0',
            textTransform: 'uppercase', letterSpacing: '0.6px'
          }}>lessons</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {data.map(item => (
          <div key={item.type} style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{
                width: 12, height: 8, borderRadius: 3, background: item.color
              }} />
              <span style={{ fontSize: 12, color: '#4A4A68' }}>{item.type}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#1A1A2E' }}>
                {item.count}
              </span>
              <span style={{ fontSize: 11, color: '#9898B0' }}>{item.pct}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestScoresCard({ scores }) {
  const { Award } = window.LucideIcons;
  const avg = scores.length
    ? Math.round(scores.reduce((s, t) => s + t.score, 0) / scores.length)
    : 0;
  return (
    <div style={{
      background: 'white', border: '1px solid #EEE8E3',
      borderRadius: 16, padding: 20
    }}>
      <div style={{
        display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16
      }}>
        <Award size={16} color="#7C3AED" />
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>
          Test Scores
        </div>
      </div>
      {scores.map((t, i, arr) => {
        const c = window.scoreColor(t.score);
        return (
          <div key={t.test} style={{
            marginBottom: i === arr.length - 1 ? 0 : 12
          }}>
            <div style={{
              fontSize: 12, fontWeight: 600,
              color: '#1A1A2E', marginBottom: 6
            }}>{t.test}</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{
                flex: 1, height: 10, background: '#EEE8E3',
                borderRadius: 9999, overflow: 'hidden'
              }}>
                <div style={{
                  width: `${t.score}%`, height: '100%',
                  background: c, borderRadius: 9999,
                  transition: 'width 800ms ease-out'
                }} />
              </div>
              <div style={{
                fontSize: 14, fontWeight: 700, color: c, width: 44, textAlign: 'right'
              }}>{t.score}%</div>
            </div>
            <div style={{ fontSize: 10, color: '#9898B0', marginTop: 2 }}>
              {t.date}
            </div>
          </div>
        );
      })}
      <div style={{
        marginTop: 16, paddingTop: 16,
        borderTop: '1px solid #F5F0EB',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: 12, color: '#9898B0' }}>Average Score</span>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#16A34A' }}>
          {avg}%
        </span>
      </div>
    </div>
  );
}

function MonthlyHeatmap({ data }) {
  const { Calendar } = window.LucideIcons;
  const activeCount = data.filter(d => d.active).length;
  return (
    <div style={{
      background: 'white', border: '1px solid #EEE8E3',
      borderRadius: 16, padding: 20
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 16
      }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Calendar size={16} color="#16A34A" />
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>
            May 2025 Activity
          </div>
        </div>
        <div style={{ fontSize: 12, color: '#16A34A' }}>
          {activeCount} active days
        </div>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6
      }}>
        {data.map(d => (
          <div key={d.day} style={{
            aspectRatio: '1 / 1',
            borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: d.active ? '#BD1313' : '#F5F0EB',
            border: d.active ? 'none' : '1px solid #EEE8E3',
            boxShadow: d.active ? '0 2px 6px rgba(189,19,19,0.25)' : 'none',
            transition: 'all 0.15s'
          }}>
            <span style={{
              fontSize: 10,
              fontWeight: d.active ? 700 : 400,
              color: d.active ? 'white' : '#9898B0'
            }}>{d.day}</span>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 12, display: 'flex',
        gap: 10, alignItems: 'center', justifyContent: 'flex-end'
      }}>
        <span style={{ fontSize: 10, color: '#9898B0' }}>Less</span>
        {['#F5F0EB', '#FECACA', '#BD1313'].map(c => (
          <span key={c} style={{
            width: 20, height: 10, borderRadius: 3, background: c
          }} />
        ))}
        <span style={{ fontSize: 10, color: '#9898B0' }}>More</span>
      </div>
    </div>
  );
}

function AnalyticsScreen() {
  const stats = [
    { gradient: 'linear-gradient(135deg, #EFF6FF, white)', borderColor: '#2563EB', icon: 'https://img.icons8.com/pulsar-color/48/clock.png',                                value: '48', label: 'Hours Learned',  sub: '+7h this week',   subColor: '#16A34A' },
    { gradient: 'linear-gradient(135deg, #F0FDF4, white)', borderColor: '#16A34A', icon: 'https://img.icons8.com/pulsar-color/48/training.png',                             value: '15', label: 'Lessons Done',   sub: 'of 23 total',     subColor: '#9898B0' },
    { gradient: 'linear-gradient(135deg, #FAF5FF, white)', borderColor: '#7C3AED', icon: 'https://img.icons8.com/pulsar-color/48/test-passed.png',                          value: '7',  label: 'Tests Taken',    sub: 'Avg 82%',         subColor: '#16A34A' },
    { gradient: 'linear-gradient(135deg, #FFF3EE, white)', borderColor: '#E8620A', icon: 'https://img.icons8.com/3d-fluency/100/fire-element.png',                          value: '12', label: 'Day Streak',     sub: 'Personal best!',  subColor: '#E8620A' }
  ];
  const data = window.analyticsData;

  return (
    <div
      className="inner-scroll"
      style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}
    >
      <div style={{
        padding: 24,
        display: 'flex', flexDirection: 'column', gap: 20
      }}>
        {/* Top stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16
        }}>
          {stats.map((s, i) => <AnalyticsStatCard key={i} stat={s} />)}
        </div>

        {/* Middle row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20
        }}>
          <WeeklyHoursChart data={data.weeklyHoursChart} />
          <BatchProgressCard batches={data.completionByBatch} />
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20
        }}>
          <ContentTypeBreakdown data={data.contentTypeSplit} />
          <TestScoresCard scores={data.testScoresHistory} />
          <MonthlyHeatmap data={data.monthlyStreak} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AnalyticsScreen });
