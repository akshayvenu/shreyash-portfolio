// ============================================================
// STEP 3 — TESTS LIST SCREEN
// ============================================================
const { useState: useStateTS } = React;

function TestCard({ test, onOpen, onStart, onReview }) {
  const { HelpCircle, Clock, Award, Calendar, AlertCircle } = window.LucideIcons;
  const [hover, setHover] = useStateTS(false);
  const [ctaHover, setCtaHover] = useStateTS(false);
  const reviewable = test.status === 'completed';
  const startable = test.status === 'available';
  const upcoming = test.status === 'upcoming';

  const handleClick = () => {
    if (startable) onStart(test);
    else if (reviewable) onReview(test);
  };

  const scoreColor = reviewable ? window.scoreColor(test.score) : '#1A1A2E';

  const statusBadge =
    startable ? { bg: '#FFF3EE', color: '#E8620A', border: '#FED7AA', label: '● Available' } :
    reviewable ? { bg: '#DCFCE7', color: '#16A34A', border: '#86EFAC', label: '✓ Completed' } :
    { bg: '#F1F5F9', color: '#64748B', border: '#CBD5E1', label: '○ Upcoming' };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'white',
        border: '1px solid #EEE8E3',
        borderRadius: 16, overflow: 'hidden',
        position: 'relative',
        boxShadow: hover && !upcoming
          ? '0 8px 24px rgba(26,26,46,0.10)'
          : '0 2px 8px rgba(26,26,46,0.06)',
        transition: 'all 0.2s',
        cursor: upcoming ? 'default' : 'pointer',
        transform: hover && !upcoming ? 'translateY(-2px)' : 'none'
      }}
    >
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: 4, background: test.color
      }} />
      <div style={{ padding: '16px 16px 16px 20px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', gap: 12, marginBottom: 8
        }}>
          <div style={{
            fontSize: 15, fontWeight: 600,
            color: '#1A1A2E', flex: 1, lineHeight: 1.3
          }}>{test.title}</div>
          <span style={{
            fontSize: 11, fontWeight: 600,
            borderRadius: 9999, padding: '4px 10px',
            whiteSpace: 'nowrap',
            background: statusBadge.bg,
            color: statusBadge.color,
            border: `1px solid ${statusBadge.border}`,
            fontFamily: "'Poppins', sans-serif"
          }}>{statusBadge.label}</span>
        </div>

        <div style={{
          display: 'flex', gap: 8, alignItems: 'center',
          marginBottom: 12
        }}>
          <span style={{
            background: test.colorBg, color: test.color,
            border: `1px solid ${test.color}33`,
            fontSize: 11, fontWeight: 600,
            borderRadius: 6, padding: '3px 8px',
            fontFamily: "'Poppins', sans-serif",
            whiteSpace: 'nowrap'
          }}>{test.batch}</span>
          <span style={{ color: '#9898B0', fontSize: 12 }}>/</span>
          <span style={{
            fontSize: 12, color: '#9898B0',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
          }}>{test.course}</span>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8
        }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', minWidth: 0 }}>
            <HelpCircle size={13} color="#9898B0" />
            <span style={{ fontSize: 12, color: '#4A4A68' }}>
              {test.totalQuestions} Questions
            </span>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', minWidth: 0 }}>
            <Clock size={13} color="#9898B0" />
            <span style={{ fontSize: 12, color: '#4A4A68' }}>
              {test.duration} min
            </span>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', minWidth: 0 }}>
            {reviewable ? (
              <>
                <Award size={13} color={scoreColor} />
                <span style={{ fontSize: 12, color: scoreColor, fontWeight: 600 }}>
                  Score: {test.score}%
                </span>
              </>
            ) : (
              <>
                <Calendar size={13} color="#9898B0" />
                <span style={{ fontSize: 12, color: '#4A4A68' }}>
                  {startable ? 'Due' : 'Opens'}: {test.dueDate}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 12,
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', gap: 12
        }}>
          {reviewable && (
            <>
              <div style={{
                flex: 1, display: 'flex', gap: 8, alignItems: 'center'
              }}>
                <div style={{
                  flex: 1, height: 6, background: '#EEE8E3',
                  borderRadius: 9999, overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${test.score}%`, height: '100%',
                    background: scoreColor, borderRadius: 9999,
                    transition: 'width 800ms ease-out'
                  }} />
                </div>
                <span style={{
                  fontSize: 12, fontWeight: 700, color: scoreColor,
                  whiteSpace: 'nowrap'
                }}>{test.score}%</span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onReview(test); }}
                onMouseEnter={() => setCtaHover(true)}
                onMouseLeave={() => setCtaHover(false)}
                style={{
                  background: ctaHover ? '#DBEAFE' : '#EFF6FF',
                  color: '#2563EB',
                  border: '1px solid #BFDBFE',
                  height: 34, padding: '0 14px',
                  borderRadius: 8, cursor: 'pointer',
                  fontSize: 12, fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  transition: 'background 0.2s', flexShrink: 0
                }}
              >Review</button>
            </>
          )}

          {startable && (
            <>
              <div style={{
                display: 'flex', gap: 6, alignItems: 'center'
              }}>
                <AlertCircle size={13} color="#E8620A" />
                <span style={{
                  fontSize: 12, color: '#E8620A', fontWeight: 500
                }}>Due in {test.daysLeft} days</span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onStart(test); }}
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
              >Start Test →</button>
            </>
          )}

          {upcoming && (
            <>
              <div style={{
                display: 'flex', gap: 6, alignItems: 'center'
              }}>
                <Clock size={13} color="#9898B0" />
                <span style={{ fontSize: 12, color: '#9898B0' }}>
                  Available in {test.daysLeft} days
                </span>
              </div>
              <button
                disabled
                style={{
                  background: '#F5F0EB', color: '#9898B0',
                  height: 36, padding: '0 16px',
                  borderRadius: 9999, border: 'none',
                  cursor: 'not-allowed',
                  fontSize: 12, fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  flexShrink: 0
                }}
              >Not Available Yet</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TestsScreen(props) {
  const {
    setScreen, setSelectedTest,
    testsFilter, setTestsFilter,
    resetTestState
  } = props;
  const { Zap, Award } = window.LucideIcons;
  const tests = window.classTests;

  const scored = tests.filter(t => t.score !== null);
  const avgScore = scored.length
    ? Math.round(scored.reduce((s, t) => s + t.score, 0) / scored.length)
    : 0;

  const stats = [
    { dot: '#2563EB', value: String(tests.filter(t => t.status === 'available').length), label: 'Available Tests' },
    { dot: '#16A34A', value: String(tests.filter(t => t.status === 'completed').length), label: 'Completed' },
    { dot: '#9898B0', value: String(tests.filter(t => t.status === 'upcoming').length),  label: 'Upcoming' },
    { dot: '#BD1313', value: avgScore + '%', label: 'Avg Score' }
  ];

  const filterOptions = ['All', 'available', 'completed', 'upcoming'];
  const filteredTests = testsFilter === 'All'
    ? tests : tests.filter(t => t.status === testsFilter);

  const startTest = (test) => {
    resetTestState();
    setSelectedTest(test);
    setScreen('test-active');
  };
  const reviewTest = (test) => {
    resetTestState();
    setSelectedTest(test);
    setScreen('test-results');
  };

  const tips = [
    'Read each question carefully before selecting your answer.',
    'You can navigate between questions using the panel on the right.',
    'The timer counts down — submit before time runs out!',
    'Unanswered questions count as incorrect.'
  ];
  const tiers = [
    { label: '≥ 80%',  msg: 'Excellent 🏆',        c: '#16A34A', bg: '#DCFCE7', br: '#86EFAC' },
    { label: '60–79%', msg: 'Good 👍',             c: '#D97706', bg: '#FEF3C7', br: '#FCD34D' },
    { label: '< 60%',  msg: 'Review needed 📚',    c: '#DC2626', bg: '#FEF2F2', br: '#FECACA' }
  ];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%', overflow: 'hidden'
    }}>
      {/* Stats bar */}
      <div style={{
        height: 80, background: 'white',
        borderBottom: '1px solid #EEE8E3',
        padding: '0 24px',
        display: 'flex', alignItems: 'center',
        flexShrink: 0
      }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{
            display: 'flex', flexDirection: 'column', gap: 2,
            padding: '0 24px',
            paddingLeft: i === 0 ? 0 : 24,
            borderRight: i === stats.length - 1 ? 'none' : '1px solid #EEE8E3'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: s.dot
              }} />
              <div style={{
                fontSize: 22, fontWeight: 700, color: '#1A1A2E',
                lineHeight: 1
              }}>{s.value}</div>
            </div>
            <div style={{
              fontSize: 11, fontWeight: 500, color: '#9898B0',
              marginLeft: 16
            }}>{s.label}</div>
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
          fontSize: 12, fontWeight: 500, color: '#9898B0'
        }}>Filter:</div>
        {filterOptions.map(f => {
          const active = testsFilter === f;
          const label = f === 'All' ? 'All Tests'
            : f.charAt(0).toUpperCase() + f.slice(1);
          return (
            <button
              key={f}
              onClick={() => setTestsFilter(f)}
              style={{
                height: 32, padding: '0 14px',
                borderRadius: 9999, border: 'none',
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                fontSize: 12, fontWeight: 600,
                transition: 'all 0.2s',
                background: active ? '#BD1313' : '#F5F0EB',
                color: active ? 'white' : '#6B6B8A'
              }}
            >{label}</button>
          );
        })}
        <div style={{
          marginLeft: 'auto', fontSize: 13, color: '#9898B0'
        }}>{filteredTests.length} tests</div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', gap: 0, minHeight: 0 }}>
        {/* Left — list */}
        <div
          className="inner-scroll"
          style={{ flex: 1, overflowY: 'auto', padding: 24 }}
        >
          {filteredTests.length === 0 ? (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              height: '100%', padding: 24
            }}>
              <div style={{
                background: 'white', borderRadius: 20, padding: 48,
                border: '1px solid #EEE8E3', textAlign: 'center',
                maxWidth: 400
              }}>
                <img
                  src="https://img.icons8.com/pulsar-color/96/empty-box.png"
                  width={80} height={80} alt=""
                  style={{
                    display: 'block', margin: '0 auto 16px',
                    background: 'transparent', opacity: 0.5
                  }}
                />
                <div style={{
                  fontSize: 16, fontWeight: 600,
                  color: '#1A1A2E', marginBottom: 8
                }}>No tests found</div>
                <div style={{ fontSize: 14, color: '#9898B0', marginBottom: 20 }}>
                  No tests match your current filter.
                </div>
                <button
                  onClick={() => setTestsFilter('All')}
                  style={{
                    background: '#BD1313', color: 'white',
                    height: 40, padding: '0 20px',
                    borderRadius: 10, border: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: 600,
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >Show All</button>
              </div>
            </div>
          ) : (
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 12
            }}>
              {filteredTests.map(test => (
                <TestCard
                  key={test.id}
                  test={test}
                  onStart={startTest}
                  onReview={reviewTest}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right — tips + score guide */}
        <div
          className="inner-scroll"
          style={{
            width: 300, padding: 24, flexShrink: 0,
            overflowY: 'auto', minHeight: 0,
            display: 'flex', flexDirection: 'column', gap: 16,
            background: 'white',
            borderLeft: '1px solid #EEE8E3'
          }}
        >
          {/* Tips */}
          <div style={{
            background: 'white', border: '1px solid #EEE8E3',
            borderRadius: 16, padding: 16
          }}>
            <div style={{
              display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: '#FFF3EE',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Zap size={16} color="#E8620A" />
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>
                Test Tips
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {tips.map((tip, idx) => (
                <div key={idx} style={{
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  padding: '10px 12px',
                  background: '#FDF8F4', borderRadius: 10
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: '#BD1313', color: 'white',
                    fontSize: 10, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: 1
                  }}>{idx + 1}</div>
                  <div style={{
                    fontSize: 12, color: '#4A4A68', lineHeight: 1.5
                  }}>{tip}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Score guide */}
          <div style={{
            background: 'white', border: '1px solid #EEE8E3',
            borderRadius: 16, padding: 16
          }}>
            <div style={{
              display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12
            }}>
              <Award size={16} color="#7C3AED" />
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>
                Score Guide
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {tiers.map(t => (
                <div key={t.label} style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '8px 12px',
                  borderRadius: 8,
                  background: t.bg, border: `1px solid ${t.br}`
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.c }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: t.c }}>{t.msg}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TestsScreen });
