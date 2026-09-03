// ============================================================
// STEP 4 — PROFILE SCREEN
// ============================================================
const { useState: useStateP } = React;

// ---------- Tab: OVERVIEW ----------
function OverviewTab({ setScreen, setSelectedBatch }) {
  const { TrendingUp, Check } = window.LucideIcons;
  const stats = [
    { icon: 'https://img.icons8.com/pulsar-color/48/training.png',    value: '3',   label: 'Batches' },
    { icon: 'https://img.icons8.com/pulsar-color/48/clock.png',       value: '48',  label: 'Hours' },
    { icon: 'https://img.icons8.com/pulsar-color/48/test-passed.png', value: '7',   label: 'Tests' },
    { icon: 'https://img.icons8.com/pulsar-color/48/trophy.png',      value: '82%', label: 'Avg Score' }
  ];

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      gap: 20, alignContent: 'start'
    }}>
      {/* Stats — full width */}
      <div style={{
        gridColumn: '1 / -1',
        background: 'white', border: '1px solid #EEE8E3',
        borderRadius: 16, padding: 20
      }}>
        <div style={{
          display: 'flex', gap: 8, alignItems: 'center',
          marginBottom: 16,
          fontSize: 15, fontWeight: 600, color: '#1A1A2E'
        }}>
          <TrendingUp size={16} color="#BD1313" />
          Learning Statistics
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12
        }}>
          {stats.map(s => (
            <div key={s.label} style={{
              background: '#FDF8F4', borderRadius: 12, padding: 16,
              textAlign: 'center', border: '1px solid #EEE8E3'
            }}>
              <img
                src={s.icon} width={28} height={28} alt=""
                style={{ background: 'transparent' }}
              />
              <div style={{
                fontSize: 24, fontWeight: 700, color: '#1A1A2E',
                marginTop: 8, marginBottom: 4
              }}>{s.value}</div>
              <div style={{
                fontSize: 11, color: '#9898B0',
                textTransform: 'uppercase', letterSpacing: '0.6px'
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div style={{
        background: 'white', border: '1px solid #EEE8E3',
        borderRadius: 16, padding: 20
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 16
        }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <img
              src="https://img.icons8.com/pulsar-color/48/goal.png"
              width={18} height={18} alt=""
              style={{ background: 'transparent' }}
            />
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A2E' }}>
              Skills Progress
            </div>
          </div>
        </div>
        {window.profileSkills.map((skill, i, arr) => (
          <div key={skill.name} style={{
            marginBottom: i === arr.length - 1 ? 0 : 12
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginBottom: 6
            }}>
              <span style={{
                fontSize: 13, fontWeight: 500, color: '#1A1A2E'
              }}>{skill.name}</span>
              <span style={{
                fontSize: 13, fontWeight: 700, color: skill.color
              }}>{skill.level}%</span>
            </div>
            <div style={{
              height: 8, background: '#EEE8E3',
              borderRadius: 9999, overflow: 'hidden'
            }}>
              <div style={{
                width: `${skill.level}%`,
                height: '100%', background: skill.color,
                borderRadius: 9999,
                transition: 'width 800ms ease-out'
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Streak */}
      <div style={{
        background: 'linear-gradient(135deg, #FFF3EE, white)',
        border: '1px solid #FED7AA',
        borderRadius: 16, padding: 20
      }}>
        <div style={{
          display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16
        }}>
          <img
            src="https://img.icons8.com/3d-fluency/100/fire-element.png"
            width={24} height={24} alt=""
            style={{ background: 'transparent' }}
          />
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A2E' }}>
            Learning Streak
          </div>
        </div>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{
            fontSize: 48, fontWeight: 800, color: '#E8620A', lineHeight: 1
          }}>12</div>
          <div style={{ fontSize: 14, color: '#6B6B8A', marginTop: 4 }}>
            days in a row
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {window.activityStreak.map((d, i) => (
            <div key={i} style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 4
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                background: d.active ? '#BD1313' : '#EEE8E3',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>{d.active && <Check size={12} color="white" />}</div>
              <div style={{
                fontSize: 10, fontWeight: 500,
                color: d.active ? '#BD1313' : '#9898B0'
              }}>{d.day}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Batches */}
      <div style={{
        gridColumn: '1 / -1',
        background: 'white', border: '1px solid #EEE8E3',
        borderRadius: 16, padding: 20
      }}>
        <div style={{
          display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16
        }}>
          <img
            src="https://img.icons8.com/pulsar-color/48/group.png"
            width={18} height={18} alt=""
            style={{ background: 'transparent' }}
          />
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A2E' }}>
            Enrolled Batches
          </div>
        </div>
        {window.enrolledBatches.map((batch, i, arr) => {
          const completed = batch.status === 'completed';
          return (
            <div
              key={batch.id}
              onClick={() => { setSelectedBatch(batch); setScreen('batch-detail'); }}
              style={{
                display: 'flex', gap: 10, alignItems: 'center',
                padding: '10px 12px', borderRadius: 10,
                background: '#FDF8F4', border: '1px solid #EEE8E3',
                cursor: 'pointer',
                marginBottom: i === arr.length - 1 ? 0 : 8
              }}
            >
              <span style={{
                width: 10, height: 10, borderRadius: '50%',
                background: batch.color, flexShrink: 0
              }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 13, fontWeight: 600, color: '#1A1A2E'
                }}>{batch.name}</div>
                <div style={{ fontSize: 11, color: '#9898B0', marginTop: 1 }}>
                  {batch.course}
                </div>
              </div>
              <div style={{
                fontSize: 13, fontWeight: 700,
                color: window.getProgressColor(batch.progress)
              }}>{batch.progress}%</div>
              <span style={{
                fontSize: 10, fontWeight: 600,
                borderRadius: 9999, padding: '3px 8px',
                fontFamily: "'Poppins', sans-serif",
                ...(completed
                  ? { background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE' }
                  : { background: '#DCFCE7', color: '#16A34A', border: '1px solid #86EFAC' })
              }}>{completed ? '✓ Done' : '● Active'}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Tab: ACHIEVEMENTS ----------
function AchievementCard({ ach }) {
  const { Lock } = window.LucideIcons;
  const [hover, setHover] = useStateP(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: ach.earned ? 'white' : '#FAFAFA',
        border: `1px solid ${ach.earned ? '#EEE8E3' : '#F0EDE8'}`,
        borderRadius: 16, padding: 20, textAlign: 'center',
        opacity: ach.earned ? 1 : 0.55,
        transition: 'all 0.2s',
        position: 'relative', overflow: 'hidden',
        transform: ach.earned && hover ? 'translateY(-2px)' : 'none',
        boxShadow: ach.earned && hover
          ? '0 8px 24px rgba(26,26,46,0.10)' : 'none'
      }}
    >
      {ach.earned && (
        <span style={{
          position: 'absolute', top: 0, right: 0,
          background: ach.color, color: 'white',
          fontSize: 9, fontWeight: 700,
          padding: '4px 8px',
          borderBottomLeftRadius: 8,
          textTransform: 'uppercase', letterSpacing: '0.4px',
          fontFamily: "'Poppins', sans-serif"
        }}>Earned</span>
      )}
      <img
        src={ach.icon} width={52} height={52} alt=""
        style={{
          display: 'block', margin: '0 auto 12px',
          background: 'transparent',
          filter: ach.earned ? 'none' : 'grayscale(100%) opacity(0.4)'
        }}
      />
      <div style={{
        fontSize: 14, fontWeight: 600, color: '#1A1A2E', marginBottom: 4
      }}>{ach.title}</div>
      <div style={{
        fontSize: 12, color: '#6B6B8A', lineHeight: 1.4, marginBottom: 8
      }}>{ach.desc}</div>
      {ach.earned ? (
        <div style={{
          fontSize: 11, color: ach.color, fontWeight: 500
        }}>Earned {ach.earnedDate}</div>
      ) : (
        <div style={{
          display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'center',
          marginTop: 4
        }}>
          <Lock size={14} color="#9898B0" />
          <span style={{ fontSize: 11, color: '#9898B0' }}>Not yet earned</span>
        </div>
      )}
    </div>
  );
}

function AchievementsTab() {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16
    }}>
      {window.achievements.map(ach => (
        <AchievementCard key={ach.id} ach={ach} />
      ))}
    </div>
  );
}

// ---------- Tab: CERTIFICATES ----------
function CertificatesTab({ setScreen, showToast }) {
  const { Download } = window.LucideIcons;
  if (window.certificates.length === 0) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, minHeight: 400
      }}>
        <div style={{
          background: 'white', borderRadius: 20, padding: 48,
          border: '1px solid #EEE8E3', textAlign: 'center', maxWidth: 400
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
            fontSize: 16, fontWeight: 600, color: '#1A1A2E', marginBottom: 8
          }}>No certificates yet</div>
          <div style={{ fontSize: 14, color: '#9898B0', marginBottom: 20 }}>
            Complete a batch to earn your first certificate.
          </div>
          <button
            onClick={() => setScreen('my-learning')}
            style={{
              background: '#BD1313', color: 'white',
              height: 40, padding: '0 20px', borderRadius: 10,
              border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 600,
              fontFamily: "'Poppins', sans-serif"
            }}
          >Go to My Learning</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 640
    }}>
      {window.certificates.map(cert => (
        <div key={cert.id} style={{
          background: 'white',
          border: `2px solid ${cert.color}`,
          borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(26,26,46,0.08)'
        }}>
          {/* Header */}
          <div style={{
            background: `linear-gradient(135deg, ${cert.color}18, white)`,
            padding: '20px 24px',
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${cert.color}30`
          }}>
            <div>
              <div style={{
                display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8
              }}>
                <img
                  src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png"
                  height={24} alt="AIVision21"
                  style={{ opacity: 0.8, background: 'transparent' }}
                />
                <div style={{
                  fontSize: 12, color: '#9898B0', fontWeight: 500
                }}>AIVision Learning Institute</div>
              </div>
              <div style={{
                fontSize: 11, fontWeight: 600, color: cert.color,
                textTransform: 'uppercase', letterSpacing: '0.8px'
              }}>Certificate of Completion</div>
            </div>
            <img
              src="https://img.icons8.com/3d-fluency/100/certificate.png"
              width={56} height={56} alt=""
              style={{ background: 'transparent' }}
            />
          </div>

          {/* Body */}
          <div style={{ padding: '20px 24px' }}>
            <div style={{ fontSize: 12, color: '#9898B0', marginBottom: 4 }}>
              This certifies that
            </div>
            <div style={{
              fontSize: 22, fontWeight: 700, color: '#1A1A2E', marginBottom: 4
            }}>Aarav Shah</div>
            <div style={{ fontSize: 12, color: '#9898B0', marginBottom: 4 }}>
              has successfully completed
            </div>
            <div style={{
              fontSize: 16, fontWeight: 600, color: cert.color, marginBottom: 16
            }}>{cert.title}</div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[
                { l: 'BATCH', v: cert.batch },
                { l: 'INSTRUCTOR', v: cert.instructor },
                { l: 'ISSUED', v: cert.issueDate }
              ].map(m => (
                <div key={m.l} style={{
                  display: 'flex', flexDirection: 'column', gap: 2
                }}>
                  <div style={{
                    fontSize: 10, color: '#9898B0',
                    textTransform: 'uppercase', letterSpacing: '0.6px'
                  }}>{m.l}</div>
                  <div style={{
                    fontSize: 13, fontWeight: 600, color: '#1A1A2E'
                  }}>{m.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{
            padding: '12px 24px',
            borderTop: `1px solid ${cert.color}20`,
            display: 'flex', justifyContent: 'flex-end', gap: 8
          }}>
            <button
              onClick={() => setTimeout(() => showToast('Share feature coming soon!', 'info'), 0)}
              style={{
                height: 36, padding: '0 14px', borderRadius: 8,
                border: '1.5px solid #EEE8E3', background: 'transparent',
                color: '#4A4A68', cursor: 'pointer',
                fontSize: 12, fontWeight: 600,
                fontFamily: "'Poppins', sans-serif"
              }}
            >Share</button>
            <button
              onClick={() => setTimeout(() => showToast('Certificate download coming soon!', 'info'), 0)}
              style={{
                background: cert.color, color: 'white',
                height: 36, padding: '0 14px',
                borderRadius: 8, border: 'none', cursor: 'pointer',
                fontSize: 12, fontWeight: 600,
                display: 'flex', gap: 6, alignItems: 'center',
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              <Download size={14} color="white" />
              Download
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- Tab: ACTIVITY ----------
function ActivityTab() {
  const { BarChart, Clock, Award, Play, BookOpen, CheckCircle } = window.LucideIcons;
  const maxHours = Math.max(...window.weeklyHours.map(w => w.hours));
  const totalHours = window.weeklyHours.reduce((s, w) => s + w.hours, 0);

  const iconFor = (type, color) => {
    if (type === 'video') return <Play size={14} color={color} />;
    if (type === 'test')  return <Award size={14} color={color} />;
    if (type === 'batch') return <CheckCircle size={14} color={color} />;
    return <BookOpen size={14} color={color} />;
  };

  const completedTests = window.classTests.filter(t => t.status === 'completed');

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      gap: 20, alignContent: 'start'
    }}>
      {/* Weekly hours — full width */}
      <div style={{
        gridColumn: '1 / -1',
        background: 'white', border: '1px solid #EEE8E3',
        borderRadius: 16, padding: 20
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 16
        }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <BarChart size={16} color="#2563EB" />
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A2E' }}>
              Weekly Learning Hours
            </div>
          </div>
          <div style={{ fontSize: 12, color: '#9898B0' }}>
            {totalHours} total hours
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'flex-end', gap: 12,
          height: 140, padding: '0 8px'
        }}>
          {window.weeklyHours.map((w, i) => {
            const pct = w.hours / maxHours;
            const barH = Math.max(4, Math.round(pct * 100));
            const isCurrent = i === window.weeklyHours.length - 1;
            return (
              <div key={w.week} style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 6, flex: 1
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 600, color: '#4A4A68'
                }}>{w.hours}h</div>
                <div style={{
                  width: '100%', maxWidth: 40,
                  height: barH,
                  background: isCurrent ? '#BD1313' : '#EFF6FF',
                  borderRadius: '6px 6px 0 0',
                  border: isCurrent ? 'none' : '1px solid #BFDBFE',
                  transition: 'height 800ms ease-out',
                  minHeight: 4
                }} />
                <div style={{ fontSize: 10, color: '#9898B0' }}>{w.week}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        background: 'white', border: '1px solid #EEE8E3',
        borderRadius: 16, padding: 20
      }}>
        <div style={{
          display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16
        }}>
          <Clock size={16} color="#E8620A" />
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A2E' }}>
            Recent Activity
          </div>
        </div>
        {window.recentActivity.map((item, index, arr) => {
          const isLast = index === arr.length - 1;
          return (
            <div key={item.id} style={{
              display: 'flex', gap: 12, alignItems: 'flex-start',
              paddingBottom: 12,
              borderBottom: isLast ? 'none' : '1px solid #F5F0EB',
              marginBottom: isLast ? 0 : 12
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: item.bgColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>{iconFor(item.iconType, item.color)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 13, fontWeight: 500, color: '#1A1A2E',
                  lineHeight: 1.4
                }}>{item.text}</div>
                <div style={{ fontSize: 11, color: '#9898B0', marginTop: 2 }}>
                  {item.batch}
                </div>
              </div>
              <div style={{ fontSize: 11, color: '#9898B0', whiteSpace: 'nowrap' }}>
                {item.time}
              </div>
            </div>
          );
        })}
      </div>

      {/* Test performance */}
      <div style={{
        background: 'white', border: '1px solid #EEE8E3',
        borderRadius: 16, padding: 20
      }}>
        <div style={{
          display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16
        }}>
          <Award size={16} color="#7C3AED" />
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A2E' }}>
            Test Performance
          </div>
        </div>
        {completedTests.length === 0 ? (
          <div style={{ fontSize: 13, color: '#9898B0' }}>
            No completed tests yet.
          </div>
        ) : completedTests.map((test, i, arr) => {
          const c = window.scoreColor(test.score);
          return (
            <div key={test.id} style={{
              display: 'flex', gap: 10, alignItems: 'center',
              padding: '10px 12px', borderRadius: 10,
              background: '#FDF8F4', border: '1px solid #EEE8E3',
              marginBottom: i === arr.length - 1 ? 0 : 10
            }}>
              <span style={{
                width: 10, height: 10, borderRadius: '50%',
                background: c, flexShrink: 0
              }} />
              <div style={{
                flex: 1, fontSize: 13, fontWeight: 500, color: '#1A1A2E',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
              }}>{test.title}</div>
              <div style={{
                width: 80, height: 6, background: '#EEE8E3',
                borderRadius: 9999, overflow: 'hidden', flexShrink: 0
              }}>
                <div style={{
                  width: `${test.score}%`, height: '100%',
                  background: c
                }} />
              </div>
              <div style={{
                fontSize: 13, fontWeight: 700, color: c,
                width: 40, textAlign: 'right'
              }}>{test.score}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- ProfileScreen ----------
function ProfileScreen(props) {
  const {
    profileTab, setProfileTab,
    setScreen, setSelectedBatch, showToast
  } = props;
  const { Mail, Building, Calendar: CalIcon, Hash, Edit } = window.LucideIcons;

  const tabs = [
    { key: 'overview',     label: 'Overview' },
    { key: 'achievements', label: 'Achievements' },
    { key: 'certificates', label: 'Certificates' },
    { key: 'activity',     label: 'Activity' }
  ];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%', overflow: 'hidden'
    }}>
      {/* Hero */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #EEE8E3',
        padding: '24px 24px 0',
        flexShrink: 0
      }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', gap: 20
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, #BD1313, #7A0D0D)',
            color: 'white', fontSize: 26, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '3px solid white',
            boxShadow: '0 4px 16px rgba(189,19,19,0.25)',
            flexShrink: 0
          }}>AS</div>
          <div style={{ flex: 1, paddingBottom: 16, minWidth: 0 }}>
            <div style={{
              fontSize: 20, fontWeight: 700, color: '#1A1A2E', marginBottom: 4
            }}>Aarav Shah</div>
            <div style={{
              display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6,
              flexWrap: 'wrap'
            }}>
              <span style={{
                background: '#FDF2F2', color: '#BD1313',
                border: '1px solid #F5BFBF',
                fontSize: 12, fontWeight: 600,
                borderRadius: 9999, padding: '3px 10px',
                fontFamily: "'Poppins', sans-serif"
              }}>Student</span>
              <span style={{
                background: '#EFF6FF', color: '#2563EB',
                border: '1px solid #BFDBFE',
                fontSize: 12, fontWeight: 600,
                borderRadius: 9999, padding: '3px 10px',
                fontFamily: "'Poppins', sans-serif"
              }}>Engineering</span>
            </div>
            <div style={{
              display: 'flex', gap: 16, flexWrap: 'wrap',
              color: '#6B6B8A'
            }}>
              {[
                { icon: <Mail size={13} color="#9898B0" />,     v: window.STUDENT.email },
                { icon: <Building size={13} color="#9898B0" />, v: window.STUDENT.institution },
                { icon: <CalIcon size={13} color="#9898B0" />,  v: 'Joined ' + window.STUDENT.joinedDate },
                { icon: <Hash size={13} color="#9898B0" />,     v: window.STUDENT.employeeId }
              ].map((m, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 5, alignItems: 'center',
                  fontSize: 12, color: '#6B6B8A'
                }}>{m.icon}{m.v}</div>
              ))}
            </div>
          </div>
          <div style={{ paddingBottom: 16 }}>
            <button
              onClick={() => setTimeout(() => showToast('Edit profile coming soon!', 'info'), 0)}
              style={{
                background: 'transparent', border: '1.5px solid #EEE8E3',
                color: '#4A4A68', height: 36, padding: '0 16px',
                borderRadius: 9999, cursor: 'pointer',
                fontSize: 12, fontWeight: 600,
                display: 'flex', gap: 6, alignItems: 'center',
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              <Edit size={14} color="#4A4A68" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div style={{
          marginTop: 24,
          display: 'flex', alignItems: 'flex-end', gap: 0,
          height: 48
        }}>
          {tabs.map(t => {
            const active = profileTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setProfileTab(t.key)}
                style={{
                  height: 48, padding: '0 20px',
                  border: 'none', background: 'transparent',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: active ? 600 : 500,
                  color: active ? '#BD1313' : '#6B6B8A',
                  fontFamily: "'Poppins', sans-serif",
                  position: 'relative',
                  transition: 'color 0.2s'
                }}
              >
                {t.label}
                {active && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: 2, background: '#BD1313',
                    borderRadius: '2px 2px 0 0'
                  }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div
        className="inner-scroll"
        style={{ flex: 1, overflowY: 'auto', padding: 24, minHeight: 0 }}
      >
        {profileTab === 'overview' && (
          <OverviewTab
            setScreen={setScreen}
            setSelectedBatch={setSelectedBatch}
          />
        )}
        {profileTab === 'achievements' && <AchievementsTab />}
        {profileTab === 'certificates' && (
          <CertificatesTab setScreen={setScreen} showToast={showToast} />
        )}
        {profileTab === 'activity' && <ActivityTab />}
      </div>
    </div>
  );
}

Object.assign(window, { ProfileScreen });
