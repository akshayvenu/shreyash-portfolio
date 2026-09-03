// ============================================================
// STEP 2 — BATCH DETAIL SCREEN
// ============================================================
const { useState: useStateBD } = React;

// ---------- Content tree row ----------
function ContentItemRow({ item, setActiveLesson, setScreen }) {
  const { CheckCircle, Play, Clock, Lock, ChevronRight } = window.LucideIcons;
  const [hover, setHover] = useStateBD(false);
  const typeStyle = window.getItemTypeStyle(item.type);
  const isLocked = item.status === 'locked';

  const bgByStatus = {
    completed:   { bg: '#FFFCFA', border: '#EEE8E3' },
    'in-progress': { bg: '#FFF8F0', border: '#FED7AA' },
    upcoming:    { bg: 'white',   border: '#EEE8E3' },
    locked:      { bg: '#F5F0EB', border: '#EEE8E3' }
  };
  const base = bgByStatus[item.status] || bgByStatus.upcoming;
  const bg     = (hover && !isLocked) ? '#FDF8F4'   : base.bg;
  const border = (hover && !isLocked) ? '#DDD7D0'   : base.border;

  let statusCircle;
  if (item.status === 'completed') {
    statusCircle = (
      <div style={{
        width: 20, height: 20, borderRadius: '50%',
        background: '#DCFCE7', display: 'flex',
        alignItems: 'center', justifyContent: 'center'
      }}><CheckCircle size={12} color="#16A34A" /></div>
    );
  } else if (item.status === 'in-progress') {
    statusCircle = (
      <div style={{
        width: 20, height: 20, borderRadius: '50%',
        background: '#FFF3EE', display: 'flex',
        alignItems: 'center', justifyContent: 'center'
      }}><Play size={10} color="#E8620A" /></div>
    );
  } else if (item.status === 'upcoming') {
    statusCircle = (
      <div style={{
        width: 20, height: 20, borderRadius: '50%',
        background: '#EFF6FF', display: 'flex',
        alignItems: 'center', justifyContent: 'center'
      }}><Clock size={12} color="#2563EB" /></div>
    );
  } else {
    statusCircle = (
      <div style={{
        width: 20, height: 20, borderRadius: '50%',
        background: '#F1F5F9', display: 'flex',
        alignItems: 'center', justifyContent: 'center'
      }}><Lock size={12} color="#9898B0" /></div>
    );
  }

  let action;
  if (item.status === 'completed') {
    action = <div style={{ fontSize: 11, color: '#16A34A' }}>Completed</div>;
  } else if (item.status === 'in-progress') {
    action = (
      <span style={{
        background: '#E8620A', color: 'white',
        fontSize: 10, fontWeight: 600,
        borderRadius: 9999, padding: '2px 8px',
        fontFamily: "'Poppins', sans-serif"
      }}>In Progress</span>
    );
  } else if (item.status === 'upcoming') {
    action = <ChevronRight size={14} color="#9898B0" />;
  } else {
    action = <Lock size={13} color="#9898B0" />;
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        if (isLocked) return;
        setActiveLesson(item);
        setScreen('learning-player');
      }}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 14px',
        borderRadius: 8,
        cursor: isLocked ? 'not-allowed' : 'pointer',
        border: `1px solid ${border}`,
        background: bg,
        opacity: isLocked ? 0.7 : 1,
        transition: 'all 0.15s'
      }}
    >
      {statusCircle}
      <span style={{
        background: typeStyle.bg, color: typeStyle.color,
        border: `1px solid ${typeStyle.border}`,
        fontSize: 10, fontWeight: 600,
        borderRadius: 4, padding: '2px 6px',
        whiteSpace: 'nowrap',
        fontFamily: "'Poppins', sans-serif"
      }}>{typeStyle.label}</span>
      <div style={{
        flex: 1, minWidth: 0,
        fontSize: 13,
        fontWeight: item.status === 'in-progress' ? 600 : 400,
        color: isLocked ? '#9898B0' : '#1A1A2E',
        whiteSpace: 'nowrap', overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>{item.title}</div>
      <div style={{
        fontSize: 11, color: '#9898B0', whiteSpace: 'nowrap'
      }}>{item.duration}</div>
      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        {action}
      </div>
    </div>
  );
}

// ---------- Chapter row ----------
function ChapterBlock({ chapter, expanded, toggleChapter, setActiveLesson, setScreen }) {
  const { ChevronDown, BookOpen } = window.LucideIcons;
  const [hover, setHover] = useStateBD(false);
  return (
    <div>
      <div
        onClick={() => toggleChapter(chapter.id)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px',
          background: hover ? '#FFFCFA' : 'white',
          borderRadius: 10,
          cursor: 'pointer',
          border: '1px solid #EEE8E3',
          transition: 'all 0.15s'
        }}
      >
        <span style={{
          transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
          transition: 'transform 0.2s', display: 'flex'
        }}>
          <ChevronDown size={14} color="#9898B0" />
        </span>
        <BookOpen size={14} color="#6B6B8A" />
        <div style={{
          fontSize: 13, fontWeight: 500,
          color: '#1A1A2E', flex: 1
        }}>{chapter.title}</div>
        <div style={{ fontSize: 11, color: '#9898B0' }}>
          {chapter.completedItems}/{chapter.totalItems} items
        </div>
      </div>
      {expanded && (
        <div style={{
          paddingLeft: 16, marginTop: 4,
          display: 'flex', flexDirection: 'column', gap: 3
        }}>
          {chapter.items.map(item => (
            <ContentItemRow
              key={item.id}
              item={item}
              setActiveLesson={setActiveLesson}
              setScreen={setScreen}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Section block ----------
function SectionBlock({ section, sIdx, expandedSections, expandedChapters, toggleSection, toggleChapter, setActiveLesson, setScreen }) {
  const { ChevronDown } = window.LucideIcons;
  const [hover, setHover] = useStateBD(false);
  const expanded = expandedSections[section.id];
  const done = section.completedItems === section.totalItems;
  return (
    <div style={{ marginBottom: 8 }}>
      <div
        onClick={() => toggleSection(section.id)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 16px',
          background: hover ? '#F5F0EB' : '#FDF8F4',
          borderRadius: 12,
          cursor: 'pointer',
          border: '1px solid #EEE8E3',
          transition: 'all 0.15s'
        }}
      >
        <span style={{
          transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
          transition: 'transform 0.2s', display: 'flex'
        }}>
          <ChevronDown size={16} color="#6B6B8A" />
        </span>
        <div style={{
          width: 22, height: 22, borderRadius: '50%',
          background: '#BD1313', color: 'white',
          fontSize: 11, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0
        }}>{sIdx + 1}</div>
        <div style={{
          fontSize: 14, fontWeight: 600,
          color: '#1A1A2E', flex: 1
        }}>{section.title}</div>
        <span style={{
          fontSize: 11, fontWeight: 600,
          borderRadius: 9999, padding: '3px 10px',
          fontFamily: "'Poppins', sans-serif",
          ...(done
            ? { background: '#DCFCE7', color: '#16A34A', border: '1px solid #86EFAC' }
            : { background: '#F5F0EB', color: '#6B6B8A', border: '1px solid #EEE8E3' })
        }}>
          {done ? '✓ Done' : `${section.completedItems}/${section.totalItems}`}
        </span>
      </div>
      {expanded && (
        <div style={{
          paddingLeft: 16, marginTop: 4,
          display: 'flex', flexDirection: 'column', gap: 4
        }}>
          {section.chapters.map(ch => (
            <ChapterBlock
              key={ch.id}
              chapter={ch}
              expanded={!!expandedChapters[ch.id]}
              toggleChapter={toggleChapter}
              setActiveLesson={setActiveLesson}
              setScreen={setScreen}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Right sidebar: progress ring card ----------
function ProgressRingCard({ batch }) {
  const { TrendingUp } = window.LucideIcons;
  const pct = batch?.progress || 0;
  const color = window.getProgressColor(pct);
  const C = 2 * Math.PI * 32; // ~201
  const offset = C - (C * pct) / 100;
  const tree = window.courseContentTree[batch?.id];
  const completed = tree?.completedItems || 0;
  const remaining = (tree?.totalItems || 0) - completed;

  return (
    <div style={{
      background: 'white',
      border: '1px solid #EEE8E3',
      borderRadius: 16, padding: 16
    }}>
      <div style={{
        fontSize: 13, fontWeight: 600, color: '#1A1A2E',
        marginBottom: 12, display: 'flex',
        gap: 8, alignItems: 'center'
      }}>
        <TrendingUp size={14} color="#BD1313" />
        Your Progress
      </div>

      <div style={{
        position: 'relative', width: 80, height: 80,
        margin: '0 auto 8px'
      }}>
        <svg viewBox="0 0 80 80" width={80} height={80}>
          <circle cx="40" cy="40" r="32" fill="none" stroke="#EEE8E3" strokeWidth="8" />
          <circle
            cx="40" cy="40" r="32" fill="none"
            stroke={color} strokeWidth="8"
            strokeDasharray={C.toFixed(1)}
            strokeDashoffset={offset.toFixed(1)}
            strokeLinecap="round"
            transform="rotate(-90 40 40)"
            style={{ transition: 'stroke-dashoffset 800ms ease-out' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 700, color
        }}>{pct}%</div>
      </div>

      <div style={{
        textAlign: 'center', fontSize: 11, color: '#9898B0',
        marginBottom: 12
      }}>{window.getProgressLabel(pct)}</div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8
      }}>
        {[
          { value: completed, label: 'Completed' },
          { value: remaining, label: 'Remaining' }
        ].map(s => (
          <div key={s.label} style={{
            background: '#FDF8F4', borderRadius: 10,
            padding: '10px 12px', textAlign: 'center'
          }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A2E' }}>{s.value}</div>
            <div style={{ fontSize: 10, color: '#9898B0' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Right sidebar: up next card ----------
function UpNextCard({ batch, showToast }) {
  const { Play } = window.LucideIcons;
  const [hover, setHover] = useStateBD(false);
  if (batch?.status === 'completed') return null;
  return (
    <div style={{
      background: 'linear-gradient(135deg, #FFF3EE, white)',
      border: '1px solid #FED7AA',
      borderRadius: 16, padding: 16,
      display: 'flex', gap: 10, alignItems: 'flex-start'
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: '#FFF3EE', display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}>
        <Play size={16} color="#E8620A" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 10, fontWeight: 600,
          color: '#E8620A', textTransform: 'uppercase',
          letterSpacing: '0.6px', marginBottom: 4
        }}>UP NEXT</div>
        <div style={{
          fontSize: 13, fontWeight: 600,
          color: '#1A1A2E', marginBottom: 4
        }}>{batch?.nextLesson}</div>
        <button
          onClick={() => setTimeout(() => showToast('Opening lesson...', 'info'), 0)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            background: hover ? '#C2540A' : '#E8620A',
            color: 'white',
            height: 32, padding: '0 14px',
            borderRadius: 9999, border: 'none',
            cursor: 'pointer',
            fontSize: 12, fontWeight: 600,
            fontFamily: "'Poppins', sans-serif",
            marginTop: 8,
            transition: 'background 0.2s'
          }}
        >Continue →</button>
      </div>
    </div>
  );
}

// ---------- Right sidebar: tests card ----------
function BatchTestsCard({ batch, setScreen }) {
  const tests = window.classTests.filter(t => t.batchId === batch?.id);
  return (
    <div style={{
      background: 'white', border: '1px solid #EEE8E3',
      borderRadius: 16, padding: 16
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 12
      }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <img
            src="https://img.icons8.com/pulsar-color/48/test-passed.png"
            width={18} height={18} alt=""
            style={{ background: 'transparent' }}
          />
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A2E' }}>
            Class Tests
          </div>
        </div>
        <button
          onClick={() => setScreen('tests')}
          style={{
            color: '#BD1313', fontSize: 12,
            border: 'none', background: 'transparent',
            cursor: 'pointer',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500
          }}
        >View All</button>
      </div>

      {tests.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <img
            src="https://img.icons8.com/pulsar-color/48/test-passed.png"
            width={32} height={32} alt=""
            style={{
              display: 'block', margin: '0 auto 8px',
              background: 'transparent', opacity: 0.4
            }}
          />
          <div style={{ fontSize: 12, color: '#9898B0' }}>No tests yet</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {tests.map(t => (
            <TestRow key={t.id} test={t} setScreen={setScreen} />
          ))}
        </div>
      )}
    </div>
  );
}

function TestRow({ test, setScreen }) {
  const [hover, setHover] = useStateBD(false);
  const dotColor =
    test.status === 'completed' ? '#16A34A' :
    test.status === 'available' ? '#E8620A' : '#9898B0';
  return (
    <div
      onClick={() => setScreen('tests')}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', gap: 10, alignItems: 'center',
        padding: '10px 12px',
        borderRadius: 10,
        border: '1px solid #EEE8E3',
        cursor: 'pointer',
        background: hover ? '#FFFCFA' : 'white',
        transition: 'all 0.15s'
      }}
    >
      <span style={{
        width: 10, height: 10, borderRadius: '50%',
        background: dotColor,
        animation: test.status === 'available' ? 'pulse 1.6s ease-out infinite' : 'none',
        flexShrink: 0
      }} />
      <div style={{
        flex: 1, fontSize: 12, fontWeight: 500, color: '#1A1A2E',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
      }}>{test.name}</div>
      {test.status === 'completed' && (
        <div style={{ fontSize: 12, fontWeight: 700, color: '#16A34A' }}>
          {test.score}%
        </div>
      )}
      {test.status === 'available' && (
        <span style={{
          background: '#FFF3EE', color: '#E8620A',
          border: '1px solid #FED7AA',
          fontSize: 10, fontWeight: 600,
          borderRadius: 9999, padding: '2px 8px',
          fontFamily: "'Poppins', sans-serif"
        }}>Open</span>
      )}
      {test.status === 'upcoming' && (
        <div style={{ fontSize: 11, color: '#9898B0' }}>Soon</div>
      )}
    </div>
  );
}

// ---------- Right sidebar: supervisor card ----------
function SupervisorCard({ batch, showToast }) {
  const [hover, setHover] = useStateBD(false);
  const initials = (batch?.supervisor || '')
    .split(' ').map(n => n[0]).join('').toUpperCase();
  return (
    <div style={{
      background: 'white', border: '1px solid #EEE8E3',
      borderRadius: 16, padding: 16
    }}>
      <div style={{
        display: 'flex', gap: 8, alignItems: 'center',
        marginBottom: 12
      }}>
        <img
          src="https://img.icons8.com/pulsar-color/48/manager.png"
          width={18} height={18} alt=""
          style={{ background: 'transparent' }}
        />
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A2E' }}>
          Supervisor
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
          color: 'white', fontSize: 12, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0
        }}>{initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 13, fontWeight: 600, color: '#1A1A2E',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
          }}>{batch?.supervisor}</div>
          <div style={{ fontSize: 11, color: '#9898B0' }}>Batch Supervisor</div>
        </div>
        <button
          onClick={() => setTimeout(() => showToast('Messaging coming soon!', 'info'), 0)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            background: hover ? '#F0E8FF' : '#FAF5FF',
            color: '#7C3AED',
            border: '1px solid #DDD6FE',
            height: 32, padding: '0 12px',
            borderRadius: 8, cursor: 'pointer',
            fontSize: 12, fontWeight: 600,
            fontFamily: "'Poppins', sans-serif",
            transition: 'background 0.2s'
          }}
        >Message</button>
      </div>
    </div>
  );
}

// ---------- Main Batch Detail screen ----------
function BatchDetail(props) {
  const {
    selectedBatch, setScreen, showToast,
    expandedSections, expandedChapters,
    toggleSection, toggleChapter,
    setActiveLesson,
    setExpandedSections, setExpandedChapters
  } = props;
  const { ChevronLeft } = window.LucideIcons;
  const batch = selectedBatch;
  const tree = window.courseContentTree[batch?.id];
  const progressColor = window.getProgressColor(batch?.progress || 0);

  const expandAll = () => {
    if (!tree) return;
    const secs = {};
    const chs  = {};
    tree.sections.forEach(s => {
      secs[s.id] = true;
      s.chapters.forEach(c => { chs[c.id] = true; });
    });
    setExpandedSections(secs);
    setExpandedChapters(chs);
  };

  const completed = batch?.status === 'completed';

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%', overflow: 'hidden'
    }}>
      {/* Batch header bar */}
      <div style={{
        height: 56, background: 'white',
        borderBottom: '1px solid #EEE8E3',
        padding: '0 24px',
        display: 'flex', alignItems: 'center', gap: 16,
        flexShrink: 0
      }}>
        <button
          onClick={() => setScreen('my-learning')}
          style={{
            border: 'none', background: 'transparent',
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '0 12px 0 0',
            borderRight: '1px solid #EEE8E3',
            cursor: 'pointer',
            fontFamily: "'Poppins', sans-serif",
            color: '#4A4A68'
          }}
        >
          <ChevronLeft size={18} color="#4A4A68" />
          <span style={{ fontSize: 13, fontWeight: 500 }}>My Learning</span>
        </button>
        <div style={{
          fontSize: 15, fontWeight: 600, color: '#1A1A2E',
          flex: 1,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
        }}>{batch?.name}</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{
            width: 10, height: 10, borderRadius: '50%',
            background: batch?.color
          }} />
          <span style={{ fontSize: 13, color: '#9898B0' }}>{batch?.course}</span>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 600,
          borderRadius: 9999, padding: '3px 10px',
          whiteSpace: 'nowrap',
          fontFamily: "'Poppins', sans-serif",
          ...(completed
            ? { background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE' }
            : { background: '#DCFCE7', color: '#16A34A', border: '1px solid #86EFAC' })
        }}>
          {completed ? '✓ Completed' : '● Active'}
        </span>
      </div>

      {/* Training summary strip */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #EEE8E3',
        padding: '12px 24px',
        display: 'flex', alignItems: 'center', gap: 0,
        flexShrink: 0, overflowX: 'auto'
      }}>
        {[
          { label: 'SUPERVISOR', value: batch?.supervisor },
          { label: 'DURATION',   value: batch?.duration },
          { label: 'START DATE', value: batch?.startDate },
          { label: 'END DATE',   value: batch?.endDate },
          {
            label: 'PROGRESS',
            value: (
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <div style={{
                  width: 60, height: 4, background: '#EEE8E3',
                  borderRadius: 9999, overflow: 'hidden'
                }}>
                  <div style={{
                    width: (batch?.progress || 0) + '%',
                    height: '100%', background: progressColor,
                    borderRadius: 9999,
                    transition: 'width 800ms ease-out'
                  }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: progressColor }}>
                  {batch?.progress}%
                </span>
              </div>
            )
          },
          { label: 'CONTENT', value: `${tree?.totalItems || 0} items` }
        ].map((it, i, arr) => (
          <div key={it.label} style={{
            display: 'flex', flexDirection: 'column', gap: 2,
            padding: '0 20px',
            paddingLeft: i === 0 ? 0 : 20,
            borderRight: i === arr.length - 1 ? 'none' : '1px solid #EEE8E3',
            flexShrink: 0
          }}>
            <div style={{
              fontSize: 10, fontWeight: 600, color: '#9898B0',
              textTransform: 'uppercase', letterSpacing: '0.6px'
            }}>{it.label}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A2E' }}>
              {it.value}
            </div>
          </div>
        ))}
      </div>

      {/* Main content (two panels) */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', gap: 0, minHeight: 0 }}>
        {/* Left — course content tree */}
        <div
          className="inner-scroll"
          style={{
            flex: 1, overflowY: 'auto', minHeight: 0,
            padding: 24, borderRight: '1px solid #EEE8E3'
          }}
        >
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 16
          }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: '#FFF3EE',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <img
                  src="https://img.icons8.com/pulsar-color/48/training.png"
                  width={18} height={18} alt=""
                  style={{ background: 'transparent' }}
                />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A2E' }}>
                  Course Content
                </div>
                <div style={{ fontSize: 12, color: '#9898B0' }}>
                  {tree?.completedItems || 0} of {tree?.totalItems || 0} completed
                </div>
              </div>
            </div>
            <button
              onClick={expandAll}
              style={{
                color: '#BD1313', fontSize: 12, fontWeight: 500,
                border: 'none', background: 'transparent',
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif"
              }}
            >Expand All</button>
          </div>

          {!tree ? (
            <div style={{
              background: 'white', border: '1px solid #EEE8E3',
              borderRadius: 12, padding: 24, textAlign: 'center',
              color: '#9898B0', fontSize: 14
            }}>No content available</div>
          ) : (
            tree.sections.map((section, sIdx) => (
              <SectionBlock
                key={section.id}
                section={section}
                sIdx={sIdx}
                expandedSections={expandedSections}
                expandedChapters={expandedChapters}
                toggleSection={toggleSection}
                toggleChapter={toggleChapter}
                setActiveLesson={setActiveLesson}
                setScreen={setScreen}
              />
            ))
          )}
        </div>

        {/* Right — info sidebar */}
        <div
          className="inner-scroll"
          style={{
            width: 320, overflowY: 'auto', minHeight: 0,
            padding: 20, background: 'white',
            display: 'flex', flexDirection: 'column', gap: 16
          }}
        >
          <ProgressRingCard batch={batch} />
          <UpNextCard batch={batch} showToast={showToast} />
          <BatchTestsCard batch={batch} setScreen={setScreen} />
          <SupervisorCard batch={batch} showToast={showToast} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BatchDetail });
