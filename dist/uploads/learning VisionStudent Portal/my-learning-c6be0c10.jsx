// ============================================================
// STEP 2 — MY LEARNING SCREEN
// ============================================================
const { useState: useStateML } = React;

function MlBatchCard({ batch, setSelectedBatch, setScreen }) {
  const { CheckCircle, Calendar, Clock, BookOpen, User } = window.LucideIcons;
  const [hover, setHover] = useStateML(false);
  const [ctaHover, setCtaHover] = useStateML(false);
  const completed = batch.status === 'completed';
  const progressColor = window.getProgressColor(batch.progress);

  const open = (e) => {
    if (e) e.stopPropagation();
    setSelectedBatch(batch);
    setScreen('batch-detail');
  };

  return (
    <div
      onClick={() => open()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'white',
        border: '1px solid #EEE8E3',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: hover ? '0 8px 24px rgba(26,26,46,0.10)' : '0 2px 8px rgba(26,26,46,0.06)',
        transition: 'all 0.2s',
        cursor: 'pointer',
        transform: hover ? 'translateY(-2px)' : 'none',
        display: 'flex', flexDirection: 'column'
      }}
    >
      <div style={{ height: 4, background: batch.color }} />
      <div style={{ padding: 20 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', gap: 8, marginBottom: 6
        }}>
          <div style={{
            fontSize: 15, fontWeight: 600,
            color: '#1A1A2E', lineHeight: 1.3, flex: 1
          }}>{batch.name}</div>
          <span style={{
            fontSize: 11, fontWeight: 600,
            borderRadius: 9999, padding: '3px 8px',
            whiteSpace: 'nowrap',
            fontFamily: "'Poppins', sans-serif",
            ...(completed
              ? { background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE' }
              : { background: '#DCFCE7', color: '#16A34A', border: '1px solid #86EFAC' })
          }}>
            {completed ? '✓ Completed' : '● Active'}
          </span>
        </div>
        <div style={{ fontSize: 12, color: '#9898B0', marginBottom: 16 }}>{batch.course}</div>

        <div style={{ marginBottom: 16 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 6
          }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: progressColor }}>
              {window.getProgressLabel(batch.progress)}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: progressColor }}>
              {batch.progress}%
            </div>
          </div>
          <div style={{
            height: 8, background: '#EEE8E3',
            borderRadius: 9999, overflow: 'hidden'
          }}>
            <div style={{
              height: '100%', width: `${batch.progress}%`,
              background: progressColor, borderRadius: 9999,
              transition: 'width 800ms ease-out'
            }} />
          </div>
          <div style={{ marginTop: 6, fontSize: 11, color: '#9898B0' }}>
            {batch.completedChapters} of {batch.totalChapters} chapters complete
          </div>
        </div>

        <div style={{ height: 1, background: '#F5F0EB', margin: '0 0 16px' }} />

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 10, marginBottom: 16
        }}>
          {[
            { icon: <Calendar size={13} color="#9898B0" />, label: 'Start',      value: batch.startDate },
            { icon: <Clock size={13} color="#9898B0" />,    label: 'Duration',   value: batch.duration },
            { icon: <User size={13} color="#9898B0" />,     label: 'Supervisor', value: batch.supervisor },
            { icon: <BookOpen size={13} color="#9898B0" />, label: 'End',        value: batch.endDate }
          ].map(m => (
            <div key={m.label} style={{ display: 'flex', gap: 6, alignItems: 'center', minWidth: 0 }}>
              {m.icon}
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <div style={{ fontSize: 11, color: '#9898B0' }}>{m.label}</div>
                <div style={{
                  fontSize: 12, fontWeight: 500, color: '#4A4A68',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>{m.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: '#F5F0EB', marginBottom: 16 }} />

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', gap: 8
        }}>
          {completed ? (
            <div style={{
              display: 'flex', gap: 6, alignItems: 'center',
              fontSize: 12, fontWeight: 500, color: '#16A34A'
            }}>
              <CheckCircle size={14} color="#16A34A" />
              Batch fully completed 🎉
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
              <div style={{
                fontSize: 10, fontWeight: 600,
                color: '#9898B0',
                textTransform: 'uppercase',
                letterSpacing: '0.6px'
              }}>UP NEXT</div>
              <div style={{
                fontSize: 12, fontWeight: 500, color: '#4A4A68',
                maxWidth: 160, overflow: 'hidden',
                whiteSpace: 'nowrap', textOverflow: 'ellipsis'
              }}>{batch.nextLesson}</div>
            </div>
          )}

          {completed ? (
            <button
              onClick={(e) => open(e)}
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
              style={{
                background: ctaHover ? '#DBEAFE' : '#EFF6FF',
                color: '#2563EB',
                border: '1px solid #BFDBFE',
                height: 36, padding: '0 14px',
                borderRadius: 9999, cursor: 'pointer',
                fontSize: 12, fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                transition: 'background 0.2s', flexShrink: 0
              }}
            >View Content</button>
          ) : (
            <button
              onClick={(e) => open(e)}
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
              style={{
                background: ctaHover ? '#991010' : '#BD1313',
                color: 'white',
                height: 36, padding: '0 16px',
                borderRadius: 9999, border: 'none',
                cursor: 'pointer',
                fontSize: 12, fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                transition: 'background 0.2s', flexShrink: 0
              }}
            >Continue →</button>
          )}
        </div>
      </div>
    </div>
  );
}

function MyLearning(props) {
  const {
    setScreen, setSelectedBatch,
    mlSearch, setMlSearch,
    mlStatusFilter, setMlStatusFilter
  } = props;
  const { Search, X } = window.LucideIcons;
  const batches = window.enrolledBatches;

  const filteredBatches = batches.filter(b => {
    const q = mlSearch.toLowerCase();
    const matchSearch = !q ||
      b.name.toLowerCase().includes(q) ||
      b.course.toLowerCase().includes(q);
    const matchStatus =
      mlStatusFilter === 'All' || b.status === mlStatusFilter;
    return matchSearch && matchStatus;
  });

  const avgProgress = Math.round(
    batches.reduce((s, b) => s + b.progress, 0) / batches.length
  );

  const metrics = [
    { value: String(batches.length),                                    label: 'Total Batches', dot: '#E8620A' },
    { value: String(batches.filter(b => b.status === 'active').length), label: 'Active Now',    dot: '#16A34A' },
    { value: '48',                                                      label: 'Hours Learned', dot: '#2563EB' },
    { value: avgProgress + '%',                                         label: 'Avg Progress',  dot: '#BD1313' }
  ];

  const statusOptions = ['All', 'active', 'completed'];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%', overflow: 'hidden'
    }}>
      {/* Metrics bar */}
      <div style={{
        height: 80, background: 'white',
        borderBottom: '1px solid #EEE8E3',
        padding: '0 24px',
        display: 'flex', alignItems: 'center', gap: 0,
        flexShrink: 0
      }}>
        {metrics.map((m, i) => (
          <div key={m.label} style={{
            display: 'flex', flexDirection: 'column', gap: 2,
            padding: '0 24px',
            paddingLeft: i === 0 ? 0 : 24,
            borderRight: i === metrics.length - 1 ? 'none' : '1px solid #EEE8E3'
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: m.dot, display: 'inline-block'
              }} />
              <div style={{
                fontSize: 22, fontWeight: 700, color: '#1A1A2E',
                lineHeight: 1
              }}>{m.value}</div>
            </div>
            <div style={{
              fontSize: 11, fontWeight: 500, color: '#9898B0',
              marginLeft: 16
            }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{
        height: 56, background: 'white',
        borderBottom: '1px solid #EEE8E3',
        padding: '0 24px',
        display: 'flex', alignItems: 'center', gap: 12,
        flexShrink: 0
      }}>
        <div style={{
          width: 280, height: 36,
          background: '#FDF8F4',
          border: '1px solid #EEE8E3',
          borderRadius: 9999,
          display: 'flex', alignItems: 'center',
          padding: '0 14px', gap: 8
        }}>
          <Search size={15} color="#9898B0" />
          <input
            placeholder="Search batches or courses..."
            value={mlSearch}
            onChange={(e) => setMlSearch(e.target.value)}
            style={{
              flex: 1, border: 'none', outline: 'none',
              background: 'transparent',
              fontFamily: "'Poppins', sans-serif",
              fontSize: 13, color: '#1A1A2E'
            }}
          />
          {mlSearch && (
            <span
              onClick={() => setMlSearch('')}
              style={{ cursor: 'pointer', display: 'flex' }}
            >
              <X size={14} color="#9898B0" />
            </span>
          )}
        </div>

        <div style={{ width: 1, height: 24, background: '#EEE8E3' }} />

        <div style={{ display: 'flex', gap: 6 }}>
          {statusOptions.map(status => {
            const active = mlStatusFilter === status;
            const label = status === 'All'
              ? 'All Batches'
              : status.charAt(0).toUpperCase() + status.slice(1);
            return (
              <button
                key={status}
                onClick={() => setMlStatusFilter(status)}
                style={{
                  height: 32, padding: '0 14px',
                  borderRadius: 9999, border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 12, fontWeight: 600,
                  transition: 'all 0.2s',
                  background: active ? '#BD1313' : '#F5F0EB',
                  color:      active ? 'white'   : '#6B6B8A'
                }}
              >{label}</button>
            );
          })}
        </div>

        <div style={{
          marginLeft: 'auto', fontSize: 13, color: '#9898B0'
        }}>
          {filteredBatches.length} batches
        </div>
      </div>

      {/* Batch grid (scrollable) */}
      <div
        className="inner-scroll"
        style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}
      >
        {filteredBatches.length === 0 ? (
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', height: '100%',
            padding: 24
          }}>
            <div style={{
              background: 'white', borderRadius: 20, padding: 48,
              border: '1px solid #EEE8E3', textAlign: 'center',
              maxWidth: 380,
              boxShadow: '0 4px 16px rgba(26,26,46,0.06)'
            }}>
              <img
                src="https://img.icons8.com/pulsar-color/96/empty-box.png"
                width={80} height={80}
                alt=""
                style={{
                  display: 'block', margin: '0 auto 20px',
                  background: 'transparent',
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.08))'
                }}
              />
              <div style={{
                fontSize: 16, fontWeight: 700,
                color: '#1A1A2E', marginBottom: 8
              }}>No batches found</div>
              <div style={{
                fontSize: 13, color: '#6B6B8A', lineHeight: 1.6,
                marginBottom: 24, maxWidth: 280, margin: '0 auto 24px'
              }}>Try adjusting your search or filter to find your courses.</div>
              <button
                className="btn-primary"
                onClick={() => { setMlSearch(''); setMlStatusFilter('All'); }}
                style={{
                  background: '#BD1313', color: 'white',
                  height: 44, padding: '0 24px',
                  borderRadius: 10, border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif"
                }}
              >Clear Filters</button>
            </div>
          </div>
        ) : (
          <div style={{
            padding: 24,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20, alignContent: 'start'
          }}>
            {filteredBatches.map(batch => (
              <MlBatchCard
                key={batch.id}
                batch={batch}
                setSelectedBatch={setSelectedBatch}
                setScreen={setScreen}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { MyLearning });
