// ============================================================
// DASHBOARD SCREEN
// ============================================================
const { useState: useStateDB } = React;

const getProgressColor = (pct) => {
  if (pct >= 75) return '#16A34A';
  if (pct >= 40) return '#E8620A';
  return '#BD1313';
};

const getProgressLabel = (pct) => {
  if (pct >= 100) return 'Completed! 🎉';
  if (pct >= 75) return 'Almost there! 🎯';
  if (pct >= 40) return 'Good progress! 💪';
  return 'Just getting started 🚀';
};

Object.assign(window, { getProgressColor, getProgressLabel });

// ---------- Hero Banner ----------
function HeroBanner({ setScreen }) {
  const { Play, BarChart } = window.LucideIcons;
  const [ctaHover, setCtaHover] = useStateDB(false);
  const [analyticsHover, setAnalyticsHover] = useStateDB(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getMotivation = (batches) => {
    const activeBatch = batches.find(b => b.status === 'active');
    if (!activeBatch) return "Keep up the great work! 🚀";
    if (activeBatch.progress >= 75)
      return `Almost done with ${activeBatch.name}! 🎯`;
    if (activeBatch.progress >= 40)
      return `You're ${activeBatch.progress}% through ${activeBatch.name}! 💪`;
    return `Keep the momentum going, Aarav! 🚀`;
  };

  const activeBatch = window.enrolledBatches.find(b => b.status === 'active');
  const subLine = activeBatch
    ? `You're ${activeBatch.progress}% through ${activeBatch.name}. ${activeBatch.progress >= 75 ? 'Almost there!' : 'Keep going!'}`
    : 'Pick up where you left off.';
  return (
    <section style={{
      background: 'linear-gradient(135deg, #BD1313, #7A0D0D)',
      borderRadius: 20,
      padding: '28px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0
    }}>
      <div style={{
        position: 'absolute', right: 180, top: -60,
        width: 180, height: 180, borderRadius: '50%',
        background: 'rgba(255,255,255,0.06)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', right: 60, bottom: -40,
        width: 120, height: 120, borderRadius: '50%',
        background: 'rgba(255,255,255,0.06)',
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontSize: 12, fontWeight: 500,
          color: 'rgba(255,255,255,0.75)',
          letterSpacing: '0.6px',
          textTransform: 'uppercase',
          marginBottom: 4
        }}>
          {getGreeting()}
        </div>
        <h1 style={{
          fontSize: 24, fontWeight: 700,
          color: 'white',
          fontFamily: "'Poppins', sans-serif",
          marginBottom: 8
        }}>
          Hey Aarav! {getMotivation(window.enrolledBatches)}
        </h1>
        <div style={{
          fontSize: 14, fontWeight: 400,
          color: 'rgba(255,255,255,0.80)',
          marginBottom: 20
        }}>
          {subLine}
        </div>
        <button
          onClick={() => setScreen('my-learning')}
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          style={{
            background: ctaHover ? 'rgba(255,255,255,0.9)' : 'white',
            color: '#BD1313',
            fontSize: 13, fontWeight: 600,
            height: 40, padding: '0 20px',
            borderRadius: 9999,
            border: 'none', cursor: 'pointer',
            display: 'flex', gap: 8, alignItems: 'center',
            fontFamily: "'Poppins', sans-serif",
            transition: 'background 0.2s'
          }}
        >
          <Play size={14} color="#BD1313" />
          Continue Learning
        </button>
        <div
          onClick={() => setScreen('analytics')}
          onMouseEnter={() => setAnalyticsHover(true)}
          onMouseLeave={() => setAnalyticsHover(false)}
          style={{
            display: 'flex', gap: 8, alignItems: 'center',
            marginTop: 8, cursor: 'pointer'
          }}
        >
          <BarChart size={12} color={analyticsHover ? 'white' : 'rgba(255,255,255,0.7)'} />
          <span style={{
            fontSize: 12, fontWeight: 500,
            color: analyticsHover ? 'white' : 'rgba(255,255,255,0.7)'
          }}>View Analytics →</span>
        </div>
      </div>

      <img
        src="https://img.icons8.com/pulsar-color/96/graduation-cap.png"
        width={110} height={110}
        alt=""
        style={{
          background: 'transparent',
          filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.25))',
          flexShrink: 0,
          position: 'relative',
          zIndex: 1
        }}
      />
    </section>
  );
}

// ---------- Stat Card ----------
function StatCard({ stat }) {
  const [hover, setHover] = useStateDB(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: stat.gradient,
        border: '1px solid #EEE8E3',
        borderRadius: 16,
        padding: '16px 20px',
        height: 100,
        position: 'relative',
        overflow: 'hidden',
        borderTop: `3px solid ${stat.borderColor}`,
        transition: 'all 0.2s',
        cursor: 'default',
        transform: hover ? 'translateY(-2px)' : 'none',
        boxShadow: hover ? '0 8px 24px rgba(26,26,46,0.10)' : 'none'
      }}
    >
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginBottom: 8
      }}>
        <img src={stat.icon} width={28} height={28} alt="" style={{ background: 'transparent' }} />
      </div>
      <div style={{
        fontSize: 26, fontWeight: 700,
        color: '#1A1A2E',
        fontFamily: "'Poppins', sans-serif",
        lineHeight: 1, marginBottom: 4
      }}>
        {stat.value}
      </div>
      <div style={{
        fontSize: 11, fontWeight: 600,
        color: '#9898B0',
        textTransform: 'uppercase',
        letterSpacing: '0.6px'
      }}>
        {stat.label}
      </div>
    </div>
  );
}

// ---------- Batch Card ----------
function BatchCard({ batch, setSelectedBatch, setScreen }) {
  const { BookOpen, CheckCircle } = window.LucideIcons;
  const [hover, setHover] = useStateDB(false);
  const [ctaHover, setCtaHover] = useStateDB(false);
  const completed = batch.status === 'completed';
  const progressColor = getProgressColor(batch.progress);

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
        boxShadow: hover
          ? '0 8px 24px rgba(26,26,46,0.10)'
          : '0 2px 8px rgba(26,26,46,0.06)',
        transition: 'all 0.2s',
        cursor: 'pointer',
        transform: hover ? 'translateY(-2px)' : 'none',
        display: 'flex', flexDirection: 'column'
      }}
    >
      <div style={{ height: 4, background: batch.color }} />
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', marginBottom: 4, gap: 8
        }}>
          <div style={{
            fontSize: 14, fontWeight: 600,
            color: '#1A1A2E', lineHeight: 1.3
          }}>
            {batch.name}
          </div>
          <span style={{
            fontSize: 11, fontWeight: 600,
            borderRadius: 9999, padding: '3px 8px',
            whiteSpace: 'nowrap',
            fontFamily: "'Poppins', sans-serif",
            ...(completed ? {
              background: '#EFF6FF', color: '#2563EB',
              border: '1px solid #BFDBFE'
            } : {
              background: '#DCFCE7', color: '#16A34A',
              border: '1px solid #86EFAC'
            })
          }}>
            {completed ? '✓ Done' : '● Active'}
          </span>
        </div>
        <div style={{
          fontSize: 12, color: '#9898B0', marginBottom: 12
        }}>
          {batch.course}
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 6
          }}>
            <div style={{
              fontSize: 12, fontWeight: 500, color: progressColor
            }}>
              {getProgressLabel(batch.progress)}
            </div>
            <div style={{
              fontSize: 13, fontWeight: 700, color: progressColor
            }}>
              {batch.progress}%
            </div>
          </div>
          <div style={{
            height: 8, background: '#EEE8E3',
            borderRadius: 9999, overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${batch.progress}%`,
              background: progressColor,
              borderRadius: 9999,
              transition: 'width 800ms ease-out'
            }} />
          </div>
          <div style={{
            marginTop: 8, fontSize: 11, color: '#9898B0'
          }}>
            {batch.completedChapters}/{batch.totalChapters} chapters
          </div>
        </div>

        <div style={{ height: 1, background: '#F5F0EB', margin: '0 0 12px' }} />

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', gap: 8
        }}>
          {completed ? (
            <div style={{
              display: 'flex', gap: 6, alignItems: 'center',
              fontSize: 12, color: '#16A34A', fontWeight: 500
            }}>
              <CheckCircle size={14} color="#16A34A" />
              Batch completed
            </div>
          ) : (
            <div style={{
              display: 'flex', gap: 6, alignItems: 'center',
              fontSize: 12, color: '#6B6B8A',
              maxWidth: 140, overflow: 'hidden',
              whiteSpace: 'nowrap', textOverflow: 'ellipsis'
            }}>
              <BookOpen size={12} color="#9898B0" />
              <span style={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
              }}>
                Next: {batch.nextLesson}
              </span>
            </div>
          )}

          {completed ? (
            <button
              onClick={(e) => open(e)}
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
              style={{
                color: '#2563EB',
                fontSize: 12, fontWeight: 600,
                background: ctaHover ? '#DBEAFE' : '#EFF6FF',
                height: 32, padding: '0 12px',
                borderRadius: 9999,
                border: '1px solid #BFDBFE',
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                transition: 'background 0.2s'
              }}
            >
              Review
            </button>
          ) : (
            <button
              onClick={(e) => open(e)}
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
              style={{
                background: ctaHover ? '#991010' : '#BD1313',
                color: 'white',
                fontSize: 12, fontWeight: 600,
                height: 32, padding: '0 14px',
                borderRadius: 9999,
                border: 'none', cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                transition: 'background 0.2s'
              }}
            >
              Continue →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- Upcoming Events Card ----------
function UpcomingEventsCard() {
  const { Calendar } = window.LucideIcons;
  const typeStyles = {
    test:     { bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE', label: 'Test' },
    deadline: { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA', label: 'Deadline' }
  };

  return (
    <div style={{
      background: 'white',
      border: '1px solid #EEE8E3',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(26,26,46,0.06)'
    }}>
      <div style={{
        height: 52, padding: '0 20px',
        borderBottom: '1px solid #F5F0EB',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: '#F0FDF4',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Calendar size={16} color="#16A34A" />
          </div>
          <div style={{
            fontSize: 15, fontWeight: 600, color: '#1A1A2E'
          }}>
            Upcoming Events
          </div>
        </div>
        <div style={{ fontSize: 12, color: '#9898B0' }}>
          {window.upcomingEvents.length} events
        </div>
      </div>

      <div style={{
        padding: 16, display: 'flex',
        flexDirection: 'column', gap: 10
      }}>
        {window.upcomingEvents.map(event => {
          const ts = typeStyles[event.type] || typeStyles.test;
          return (
            <div key={event.id} style={{
              display: 'flex', gap: 12, alignItems: 'center',
              padding: '10px 12px',
              borderRadius: 12,
              background: event.bg,
              border: `1px solid ${event.color}22`
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: 'white',
                border: `1px solid ${event.color}33`,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                <div style={{
                  fontSize: 16, fontWeight: 700,
                  color: event.color, lineHeight: 1
                }}>
                  {event.daysLeft}
                </div>
                <div style={{
                  fontSize: 9, fontWeight: 500,
                  color: event.color, opacity: 0.8,
                  textTransform: 'uppercase', marginTop: 2
                }}>
                  days
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 13, fontWeight: 600,
                  color: '#1A1A2E', marginBottom: 2
                }}>
                  {event.title}
                </div>
                <div style={{
                  fontSize: 11, color: '#9898B0',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis'
                }}>
                  {event.batch} · {event.time}
                </div>
              </div>
              <div style={{
                fontSize: 11, fontWeight: 600,
                borderRadius: 6, padding: '3px 8px',
                background: ts.bg, color: ts.color,
                border: `1px solid ${ts.border}`,
                fontFamily: "'Poppins', sans-serif",
                flexShrink: 0
              }}>
                {ts.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Recent Activity Card ----------
function RecentActivityCard({ showToast }) {
  const { Zap, Play, Award, CheckCircle, BookOpen } = window.LucideIcons;
  const iconFor = (type, color) => {
    if (type === 'video') return <Play size={14} color={color} />;
    if (type === 'test')  return <Award size={14} color={color} />;
    if (type === 'batch') return <CheckCircle size={14} color={color} />;
    return <BookOpen size={14} color={color} />;
  };
  return (
    <div style={{
      background: 'white',
      border: '1px solid #EEE8E3',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(26,26,46,0.06)'
    }}>
      <div style={{
        height: 52, padding: '0 20px',
        borderBottom: '1px solid #F5F0EB',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: '#FFF3EE',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Zap size={16} color="#E8620A" />
          </div>
          <div style={{
            fontSize: 15, fontWeight: 600, color: '#1A1A2E'
          }}>
            Recent Activity
          </div>
        </div>
        <button
          onClick={() => setTimeout(() => showToast('Coming soon!', 'info'), 0)}
          style={{
            color: '#BD1313', fontSize: 12,
            border: 'none', background: 'transparent',
            cursor: 'pointer',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500
          }}
        >
          View all
        </button>
      </div>

      <div style={{ padding: 16 }}>
        {window.recentActivity.map((item, index) => {
          const isLast = index === window.recentActivity.length - 1;
          return (
            <div
              key={item.id}
              style={{
                display: 'flex', gap: 12, alignItems: 'flex-start',
                paddingBottom: 14,
                borderBottom: isLast ? 'none' : '1px solid #F5F0EB',
                marginBottom: isLast ? 0 : 14
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: item.bgColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                {iconFor(item.iconType, item.color)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 13, fontWeight: 500, color: '#1A1A2E',
                  lineHeight: 1.4
                }}>
                  {item.text}
                </div>
                <div style={{
                  fontSize: 11, color: '#9898B0', marginTop: 2
                }}>
                  {item.batch}
                </div>
              </div>
              <div style={{
                fontSize: 11, color: '#9898B0',
                whiteSpace: 'nowrap'
              }}>
                {item.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- TutorBot promo card ----------
function TutorBotPromo({ setScreen }) {
  const [hover, setHover] = useStateDB(false);
  const [btnHover, setBtnHover] = useStateDB(false);
  return (
    <div
      onClick={() => setScreen('tutorbot')}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'linear-gradient(135deg, #FAF5FF, #EDE9FE)',
        border: '1px solid #DDD6FE',
        borderRadius: 16,
        padding: '14px 20px',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'all 0.2s',
        transform: hover ? 'translateY(-1px)' : 'none',
        boxShadow: hover ? '0 4px 12px rgba(124,58,237,0.12)' : 'none'
      }}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <img
            src="https://img.icons8.com/pulsar-color/48/bot.png"
            width={20} height={20} alt=""
            style={{ background: 'transparent' }}
          />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#7C3AED' }}>
            Ask TutorBot
          </div>
          <div style={{
            fontSize: 12, color: '#7C3AED', opacity: 0.8, marginTop: 1
          }}>Get instant help with your courses</div>
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); setScreen('tutorbot'); }}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        style={{
          background: btnHover ? '#6D28D9' : '#7C3AED',
          color: 'white',
          height: 32, padding: '0 14px',
          borderRadius: 9999, border: 'none', cursor: 'pointer',
          fontSize: 12, fontWeight: 600,
          fontFamily: "'Poppins', sans-serif",
          transition: 'background 0.2s'
        }}
      >Try it →</button>
    </div>
  );
}

// ---------- Dashboard ----------
function Dashboard({ setScreen, setSelectedBatch, showToast }) {
  return (
    <div className="inner-scroll" style={{
      flex: 1, overflowY: 'auto', minHeight: 0
    }}>
      <div style={{
        padding: 24,
        display: 'flex', flexDirection: 'column', gap: 24
      }}>
        <HeroBanner setScreen={setScreen} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16, flexShrink: 0
        }}>
          {window.dashboardStats.map(stat => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>

        <TutorBotPromo setScreen={setScreen} />

        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: '#FFF3EE',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <img
                  src="https://img.icons8.com/pulsar-color/48/training.png"
                  width={18} height={18}
                  alt=""
                  style={{ background: 'transparent' }}
                />
              </div>
              <div style={{
                fontSize: 16, fontWeight: 600, color: '#1A1A2E'
              }}>
                Continue Learning
              </div>
            </div>
            <button
              onClick={() => setScreen('my-learning')}
              style={{
                color: '#BD1313', fontSize: 13, fontWeight: 500,
                border: 'none', background: 'transparent',
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              View All
            </button>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16
          }}>
            {window.enrolledBatches.map(batch => (
              <BatchCard
                key={batch.id}
                batch={batch}
                setSelectedBatch={setSelectedBatch}
                setScreen={setScreen}
              />
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16, paddingBottom: 24
        }}>
          <UpcomingEventsCard />
          <RecentActivityCard showToast={showToast} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Dashboard });
