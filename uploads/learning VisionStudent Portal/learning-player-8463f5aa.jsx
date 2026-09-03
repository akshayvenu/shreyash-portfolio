// ============================================================
// STEP 5 — LEARNING PLAYER SCREEN
// ============================================================
const { useState: useStateLP } = React;

// ---------- Sidebar lesson row ----------
function PlayerLessonRow({ lesson, isActive, dark, onPick }) {
  const { CheckCircle, Play, Clock, Lock } = window.LucideIcons;
  const [hover, setHover] = useStateLP(false);
  const isLocked = lesson.status === 'locked';

  let statusBox;
  if (lesson.status === 'completed') {
    statusBox = (
      <div style={{
        width: 20, height: 20, borderRadius: '50%',
        background: '#16A34A',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0
      }}><CheckCircle size={11} color="white" /></div>
    );
  } else if (lesson.status === 'in-progress') {
    statusBox = (
      <div style={{
        width: 20, height: 20, borderRadius: '50%',
        background: '#BD1313',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0
      }}><Play size={9} color="white" /></div>
    );
  } else if (lesson.status === 'upcoming') {
    statusBox = (
      <div style={{
        width: 20, height: 20, borderRadius: '50%',
        background: dark ? 'rgba(255,255,255,0.12)' : '#EFF6FF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0
      }}><Clock size={11} color={dark ? 'rgba(255,255,255,0.5)' : '#2563EB'} /></div>
    );
  } else {
    statusBox = (
      <div style={{
        width: 20, height: 20, borderRadius: '50%',
        background: dark ? 'rgba(255,255,255,0.06)' : '#F1F5F9',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0
      }}><Lock size={11} color={dark ? 'rgba(255,255,255,0.25)' : '#9898B0'} /></div>
    );
  }

  let bg;
  if (dark) {
    bg = isActive ? 'rgba(189,19,19,0.18)'
      : (hover && !isLocked ? 'rgba(255,255,255,0.04)' : 'transparent');
  } else {
    bg = isActive ? '#FDF2F2'
      : (hover && !isLocked ? '#FFFCFA' : 'transparent');
  }
  const titleColor = dark
    ? (isActive ? 'white' : 'rgba(255,255,255,0.7)')
    : (isActive ? '#1A1A2E' : '#4A4A68');
  const durationColor = dark ? 'rgba(255,255,255,0.35)' : '#9898B0';

  return (
    <div
      onClick={!isLocked ? () => onPick(lesson) : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', gap: 10, alignItems: 'center',
        padding: '12px 16px',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        transition: 'all 0.15s',
        opacity: isLocked ? 0.45 : 1,
        background: bg,
        borderLeft: isActive ? '3px solid #BD1313' : '3px solid transparent'
      }}
    >
      {statusBox}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{
          fontSize: 12,
          fontWeight: isActive ? 600 : 400,
          color: titleColor,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
        }}>{lesson.title}</div>
        <div style={{ fontSize: 10, color: durationColor, marginTop: 2 }}>
          {lesson.duration}
        </div>
      </div>
      <img
        src={lesson.thumbnail}
        width={16} height={16} alt=""
        style={{
          background: 'transparent',
          opacity: isLocked ? 0.3 : isActive ? 1 : 0.5
        }}
      />
    </div>
  );
}

function PlayerSidebar(props) {
  const {
    lessonList, activeLesson, dark,
    setActiveLesson, lessonComplete, onMarkDone
  } = props;
  const { CheckCircle } = window.LucideIcons;
  const sections = [...new Set(lessonList.map(l => l.section))];
  const completedCount = lessonList.filter(l => l.status === 'completed').length;

  const headerBorder = dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #EEE8E3';
  const sectionLabelBorder = dark ? '1px solid rgba(255,255,255,0.04)' : '1px solid #F5F0EB';
  const sectionLabelColor = dark ? 'rgba(255,255,255,0.35)' : '#9898B0';
  const titleColor = dark ? 'white' : '#1A1A2E';
  const subColor = dark ? 'rgba(255,255,255,0.4)' : '#9898B0';
  const trackBg = dark ? 'rgba(255,255,255,0.12)' : '#EEE8E3';
  const sidebarBg = dark ? '#12121E' : 'white';
  const footerBorder = dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #EEE8E3';

  return (
    <div style={{
      width: 300, flexShrink: 0,
      display: 'flex', flexDirection: 'column',
      background: sidebarBg,
      borderLeft: headerBorder,
      overflow: 'hidden'
    }}>
      <div style={{
        height: 52, padding: '0 16px',
        borderBottom: headerBorder,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: titleColor }}>
          Lesson List
        </div>
        <div style={{ fontSize: 11, color: subColor }}>
          {lessonList.length} lessons
        </div>
      </div>

      <div className="inner-scroll" style={{ flex: 1, overflowY: 'auto' }}>
        {sections.map(section => (
          <div key={section}>
            <div style={{
              padding: '8px 16px',
              fontSize: 10, fontWeight: 600,
              letterSpacing: '0.7px', textTransform: 'uppercase',
              color: sectionLabelColor,
              borderBottom: sectionLabelBorder
            }}>{section}</div>
            {lessonList.filter(l => l.section === section).map(lesson => (
              <PlayerLessonRow
                key={lesson.id}
                lesson={lesson}
                isActive={lesson.id === activeLesson?.id}
                dark={dark}
                onPick={setActiveLesson}
              />
            ))}
          </div>
        ))}
      </div>

      <div style={{
        height: 56, padding: '0 16px',
        borderTop: footerBorder,
        display: 'flex', gap: 8, alignItems: 'center',
        flexShrink: 0
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, marginBottom: 4, color: subColor }}>
            {completedCount} of {lessonList.length} completed
          </div>
          <div style={{
            height: 3, background: trackBg,
            borderRadius: 9999, overflow: 'hidden'
          }}>
            <div style={{
              width: `${(completedCount / Math.max(1, lessonList.length)) * 100}%`,
              background: '#BD1313', height: '100%'
            }} />
          </div>
        </div>
        {!lessonComplete ? (
          <button
            onClick={onMarkDone}
            style={{
              background: '#BD1313', color: 'white',
              height: 32, padding: '0 12px',
              borderRadius: 8, border: 'none', cursor: 'pointer',
              fontSize: 11, fontWeight: 600,
              whiteSpace: 'nowrap',
              fontFamily: "'Poppins', sans-serif"
            }}
          >Mark Done</button>
        ) : (
          <div style={{
            background: '#DCFCE7', color: '#16A34A',
            border: '1px solid #86EFAC',
            height: 32, padding: '0 12px',
            borderRadius: 8,
            fontSize: 11, fontWeight: 600,
            display: 'flex', gap: 4, alignItems: 'center',
            fontFamily: "'Poppins', sans-serif"
          }}>
            <CheckCircle size={12} color="#16A34A" />
            Complete
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Video stage ----------
function VideoStage(props) {
  const {
    activeLesson, selectedBatch,
    playerPlaying, setPlayerPlaying,
    playerProgress, setPlayerProgress,
    lessonComplete, setLessonComplete,
    onNext
  } = props;
  const { Play, CheckCircle } = window.LucideIcons;
  const [playHover, setPlayHover] = useStateLP(false);
  return (
    <div style={{
      flex: 1, position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0F0F1A', overflow: 'hidden', padding: 20
    }}>
      <div style={{
        width: '100%', maxWidth: 840,
        aspectRatio: '16/9', position: 'relative',
        background: 'linear-gradient(135deg, #1E1B4B, #312E81)',
        borderRadius: 12, overflow: 'hidden', margin: '0 auto'
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          height: '100%', gap: 16
        }}>
          <img
            src="https://img.icons8.com/pulsar-color/96/video.png"
            width={56} height={56} alt=""
            style={{ background: 'transparent', opacity: 0.6 }}
          />
          <div style={{
            fontSize: 18, fontWeight: 600,
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center', padding: '0 32px'
          }}>{activeLesson?.title}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            {selectedBatch?.course}
          </div>
        </div>

        {!playerPlaying && playerProgress === 0 && !lessonComplete && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <button
              onClick={() => setPlayerPlaying(true)}
              onMouseEnter={() => setPlayHover(true)}
              onMouseLeave={() => setPlayHover(false)}
              style={{
                width: 72, height: 72, borderRadius: '50%',
                background: playHover ? 'rgba(189,19,19,1)' : 'rgba(189,19,19,0.85)',
                backdropFilter: 'blur(8px)',
                border: '2px solid rgba(255,255,255,0.3)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
                transform: playHover ? 'scale(1.05)' : 'scale(1)'
              }}
              aria-label="Play"
            >
              <Play size={28} color="white" style={{ marginLeft: 2 }} />
            </button>
          </div>
        )}

        {lessonComplete && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.75)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 16
          }}>
            <CheckCircle size={48} color="#16A34A" />
            <div style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>
              Lesson Complete! 🎉
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
              Great job! Ready for the next one?
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => {
                  setPlayerProgress(0);
                  setLessonComplete(false);
                  setPlayerPlaying(true);
                }}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white', height: 40, padding: '0 20px',
                  borderRadius: 9999, cursor: 'pointer',
                  fontSize: 13, fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif"
                }}
              >Replay</button>
              {onNext && (
                <button
                  onClick={onNext}
                  style={{
                    background: '#BD1313', color: 'white',
                    height: 40, padding: '0 20px',
                    borderRadius: 9999, border: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: 600,
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >Next Lesson →</button>
              )}
            </div>
          </div>
        )}

        {(playerPlaying || playerProgress > 0) && !lessonComplete && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 3, background: 'rgba(255,255,255,0.2)'
          }}>
            <div style={{
              width: `${playerProgress}%`,
              background: '#BD1313', height: '100%',
              transition: 'width 0.3s'
            }} />
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Video controls bar ----------
function VideoControls(props) {
  const {
    activeLesson,
    playerPlaying, setPlayerPlaying,
    playerProgress, setPlayerProgress,
    playerMuted, setPlayerMuted,
    playerVolume, setPlayerVolume,
    playerSpeed, setPlayerSpeed,
    showSpeedMenu, setShowSpeedMenu,
    lessonComplete, setLessonComplete,
    showToast
  } = props;
  const { Play, Pause, Volume1, Volume2, VolumeX, Maximize } = window.LucideIcons;

  return (
    <div style={{
      height: 64, flexShrink: 0,
      background: '#141420',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '0 20px',
      display: 'flex', alignItems: 'center', gap: 12
    }}>
      <button
        onClick={() => {
          if (lessonComplete) {
            setPlayerProgress(0);
            setLessonComplete(false);
          }
          setPlayerPlaying(p => !p);
        }}
        style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s'
        }}
        aria-label={playerPlaying ? 'Pause' : 'Play'}
      >
        {playerPlaying
          ? <Pause size={18} color="white" />
          : <Play size={18} color="white" style={{ marginLeft: 2 }} />}
      </button>

      <div
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = ((e.clientX - rect.left) / rect.width) * 100;
          setPlayerProgress(Math.max(0, Math.min(100, pct)));
        }}
        style={{
          flex: 1, position: 'relative', height: 20,
          display: 'flex', alignItems: 'center', cursor: 'pointer'
        }}
      >
        <div style={{
          width: '100%', height: 4,
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 9999, position: 'relative'
        }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: `${playerProgress}%`,
            background: '#BD1313', borderRadius: 9999
          }} />
          <div style={{
            position: 'absolute', top: '50%',
            left: `${playerProgress}%`,
            transform: 'translate(-50%, -50%)',
            width: 12, height: 12, borderRadius: '50%',
            background: 'white',
            boxShadow: '0 0 0 2px #BD1313'
          }} />
        </div>
      </div>

      <div style={{
        fontSize: 12, color: 'rgba(255,255,255,0.6)',
        whiteSpace: 'nowrap',
        fontFamily: "'Poppins', sans-serif",
        fontVariantNumeric: 'tabular-nums'
      }}>
        {window.formatSecs(activeLesson?.durationSecs || 0, playerProgress)} / {activeLesson?.duration}
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button
          onClick={() => setPlayerMuted(m => !m)}
          style={{
            width: 32, height: 32,
            background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          aria-label="Mute"
        >
          {playerMuted ? <VolumeX size={16} color="rgba(255,255,255,0.5)" />
            : playerVolume > 50 ? <Volume2 size={16} color="rgba(255,255,255,0.7)" />
            : <Volume1 size={16} color="rgba(255,255,255,0.7)" />}
        </button>
        <input
          type="range" min={0} max={100} value={playerVolume}
          onChange={(e) => setPlayerVolume(Number(e.target.value))}
          style={{
            width: 72, height: 4,
            WebkitAppearance: 'none',
            appearance: 'none',
            borderRadius: 9999,
            background: `linear-gradient(to right, rgba(255,255,255,0.7) ${playerVolume}%, rgba(255,255,255,0.15) ${playerVolume}%)`,
            cursor: 'pointer',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowSpeedMenu(s => !s)}
          style={{
            height: 32, padding: '0 10px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 8, cursor: 'pointer',
            fontSize: 12, fontWeight: 600, color: 'white',
            fontFamily: "'Poppins', sans-serif"
          }}
        >{playerSpeed}x</button>
        {showSpeedMenu && (
          <div style={{
            position: 'absolute', bottom: '100%', right: 0,
            marginBottom: 4,
            background: '#1A1A2E',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10, overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            zIndex: 100, minWidth: 70
          }}>
            {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => {
              const active = playerSpeed === speed;
              return (
                <div
                  key={speed}
                  onClick={() => { setPlayerSpeed(speed); setShowSpeedMenu(false); }}
                  style={{
                    padding: '8px 16px', cursor: 'pointer',
                    fontSize: 13,
                    fontFamily: "'Poppins', sans-serif",
                    background: active ? 'rgba(189,19,19,0.3)' : 'transparent',
                    color: active ? '#FF6B6B' : 'rgba(255,255,255,0.8)',
                    fontWeight: active ? 600 : 400
                  }}
                >{speed}x</div>
              );
            })}
          </div>
        )}
      </div>

      <button
        onClick={() => setTimeout(() => showToast('Fullscreen coming soon!', 'info'), 0)}
        style={{
          width: 32, height: 32,
          background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
        aria-label="Fullscreen"
      ><Maximize size={16} color="rgba(255,255,255,0.7)" /></button>
    </div>
  );
}

// ---------- PDF viewer ----------
function PdfViewer({ activeLesson, selectedBatch, showToast }) {
  const { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } = window.LucideIcons;

  const lineWidths1 = ['100%', '95%', '88%', '60%'];
  const lineWidths2 = ['100%', '92%', '85%', '78%'];
  const lineWidths3 = ['100%', '90%', '45%'];

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: '#F8F9FA', overflow: 'hidden'
    }}>
      <div style={{
        height: 48, background: 'white',
        borderBottom: '1px solid #EEE8E3',
        padding: '0 20px',
        display: 'flex', alignItems: 'center', gap: 12
      }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button style={pdfBtnStyle}><ChevronLeft size={14} color="#4A4A68" /></button>
          <div style={{
            fontSize: 12, fontWeight: 500, color: '#4A4A68',
            fontFamily: "'Poppins', sans-serif"
          }}>Page 1 of 5</div>
          <button style={pdfBtnStyle}><ChevronRight size={14} color="#4A4A68" /></button>
        </div>
        <div style={{ height: 20, width: 1, background: '#EEE8E3' }} />
        <div style={{ display: 'flex', gap: 4 }}>
          <button style={pdfBtnStyle}><ZoomOut size={14} color="#4A4A68" /></button>
          <span style={{ fontSize: 12, fontWeight: 500, color: '#4A4A68', alignSelf: 'center' }}>
            100%
          </span>
          <button style={pdfBtnStyle}><ZoomIn size={14} color="#4A4A68" /></button>
        </div>
        <button
          onClick={() => setTimeout(() => showToast('Download coming soon!', 'info'), 0)}
          style={{
            marginLeft: 'auto',
            display: 'flex', gap: 6, alignItems: 'center',
            height: 32, padding: '0 12px',
            background: '#FDF8F4', border: '1px solid #EEE8E3',
            borderRadius: 8, cursor: 'pointer',
            fontSize: 12, fontWeight: 600, color: '#4A4A68',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          <Download size={13} color="#4A4A68" />
          Download
        </button>
      </div>

      <div
        className="inner-scroll"
        style={{
          flex: 1, display: 'flex', justifyContent: 'center',
          overflowY: 'auto', padding: 32, background: '#E8E8E8'
        }}
      >
        <div style={{
          width: 595, maxWidth: '100%', minHeight: 842,
          background: 'white', borderRadius: 4,
          boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          padding: 60, margin: '0 auto'
        }}>
          <div style={{
            fontSize: 22, fontWeight: 700, color: '#1A1A2E', marginBottom: 8
          }}>{activeLesson?.title}</div>
          <div style={{ fontSize: 12, color: '#9898B0', marginBottom: 32 }}>
            {selectedBatch?.course} · {selectedBatch?.name}
          </div>
          <div style={{
            height: 2, background: '#BD1313', width: 48,
            marginBottom: 32, borderRadius: 1
          }} />
          {[
            { title: 'Overview',         lines: lineWidths1 },
            { title: 'Key Concepts',     lines: lineWidths2 },
            { title: 'Examples & Usage', lines: lineWidths3 }
          ].map((sec, i) => (
            <div key={sec.title} style={{ marginTop: i === 0 ? 0 : 24 }}>
              <div style={{
                fontSize: 14, fontWeight: 600, color: '#1A1A2E',
                marginBottom: 8
              }}>{sec.title}</div>
              {sec.lines.map((w, j) => (
                <div key={j} style={{
                  height: 10, borderRadius: 4,
                  background: '#F5F0EB',
                  width: w, marginBottom: 4
                }} />
              ))}
            </div>
          ))}
          <div style={{
            marginTop: 48, textAlign: 'center',
            fontSize: 11, color: '#9898B0'
          }}>— 1 —</div>
        </div>
      </div>
    </div>
  );
}
const pdfBtnStyle = {
  width: 28, height: 28, background: '#FDF8F4',
  border: '1px solid #EEE8E3', borderRadius: 6, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center'
};

// ---------- Quiz / assignment view ----------
function QuizAssignmentView({ activeLesson, setLessonComplete, showToast }) {
  const { Clock, HelpCircle, Award, Info } = window.LucideIcons;
  const isQuiz = activeLesson?.type === 'quiz';
  return (
    <div
      className="inner-scroll"
      style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#FDF8F4', overflowY: 'auto', padding: 32
      }}
    >
      <div style={{
        background: 'white', borderRadius: 20, padding: 40,
        maxWidth: 560, width: '100%',
        border: '1px solid #EEE8E3',
        boxShadow: '0 4px 16px rgba(26,26,46,0.08)'
      }}>
        <img
          src="https://img.icons8.com/pulsar-color/96/test-passed.png"
          width={64} height={64} alt=""
          style={{
            display: 'block', margin: '0 auto 20px',
            background: 'transparent'
          }}
        />
        <div style={{
          textAlign: 'center', fontSize: 13, fontWeight: 600,
          color: '#BD1313', textTransform: 'uppercase',
          letterSpacing: '0.6px', marginBottom: 8
        }}>{isQuiz ? 'Quick Quiz' : 'Assignment'}</div>
        <div style={{
          textAlign: 'center', fontSize: 20, fontWeight: 700,
          color: '#1A1A2E', marginBottom: 8
        }}>{activeLesson?.title}</div>
        <div style={{
          textAlign: 'center', fontSize: 13, color: '#9898B0', marginBottom: 24
        }}>{activeLesson?.section} · {activeLesson?.chapter}</div>

        <div style={{
          display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 28,
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13, color: '#4A4A68' }}>
            <Clock size={14} color="#9898B0" />
            {activeLesson?.duration}
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13, color: '#4A4A68' }}>
            <HelpCircle size={14} color="#9898B0" />
            {isQuiz ? '3 questions' : '1 task'}
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13, color: '#4A4A68' }}>
            <Award size={14} color="#9898B0" />
            {isQuiz ? '10 marks' : '20 marks'}
          </div>
        </div>

        <div style={{ height: 1, background: '#EEE8E3', marginBottom: 28 }} />

        <div style={{
          background: '#FFFBEB', border: '1px solid #FCD34D',
          borderRadius: 12, padding: '12px 16px', marginBottom: 24,
          display: 'flex', gap: 10, alignItems: 'flex-start'
        }}>
          <div style={{ flexShrink: 0, marginTop: 1 }}>
            <Info size={14} color="#D97706" />
          </div>
          <div style={{ fontSize: 12, color: '#4A4A68', lineHeight: 1.6 }}>
            {isQuiz
              ? 'This quiz tests your understanding of the current chapter. Complete all questions to mark this lesson as done.'
              : 'Submit your completed work as a file or link. Your supervisor will review and grade your submission.'}
          </div>
        </div>

        <button
          onClick={() => {
            setLessonComplete(true);
            setTimeout(() => showToast(
              isQuiz ? 'Quiz opened in Tests section!' : 'Assignment noted!',
              'success'
            ), 0);
          }}
          style={{
            background: '#BD1313', color: 'white',
            height: 48, borderRadius: 10,
            border: 'none', cursor: 'pointer',
            fontSize: 14, fontWeight: 600,
            width: '100%',
            fontFamily: "'Poppins', sans-serif"
          }}
        >{isQuiz ? 'Go to Quiz →' : 'Submit Assignment →'}</button>
      </div>
    </div>
  );
}

// ---------- Main Learning Player ----------
function LearningPlayerScreen(props) {
  const {
    activeLesson, setActiveLesson,
    selectedBatch, setScreen, showToast,
    playerProgress, setPlayerProgress,
    playerPlaying, setPlayerPlaying,
    playerSpeed, setPlayerSpeed,
    playerMuted, setPlayerMuted,
    playerVolume, setPlayerVolume,
    lessonComplete, setLessonComplete,
    showSpeedMenu, setShowSpeedMenu
  } = props;
  const { ChevronLeft } = window.LucideIcons;

  const lessonList = window.playerLessonList[selectedBatch?.id] || [];
  const currentIndex = lessonList.findIndex(l => l.id === activeLesson?.id);
  const nextLesson = currentIndex >= 0 ? lessonList[currentIndex + 1] : null;

  const handleNext = () => {
    if (nextLesson && nextLesson.status !== 'locked') {
      setActiveLesson(nextLesson);
    }
  };
  const handleMarkDone = () => {
    setLessonComplete(true);
    setPlayerProgress(100);
    setPlayerPlaying(false);
    setTimeout(() => showToast('Lesson marked complete! ✓', 'success'), 0);
  };

  const isVideo = activeLesson?.type === 'video';
  const isPdf = activeLesson?.type === 'pdf';
  const isQuizOrAssign = activeLesson?.type === 'quiz' || activeLesson?.type === 'assignment';

  const typeStyle = window.getItemTypeStyle(activeLesson?.type || 'video');

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%', overflow: 'hidden',
      background: isVideo ? '#1A1A2E' : '#FDF8F4'
    }}>
      {/* Player header */}
      <div style={{
        height: 52,
        background: isVideo ? '#1A1A2E' : 'white',
        borderBottom: isVideo
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid #EEE8E3',
        padding: '0 20px',
        display: 'flex', alignItems: 'center', gap: 16,
        flexShrink: 0
      }}>
        <button
          onClick={() => setScreen('batch-detail')}
          style={{
            display: 'flex', gap: 6, alignItems: 'center',
            cursor: 'pointer', border: 'none',
            background: isVideo ? 'rgba(255,255,255,0.08)' : '#FDF8F4',
            padding: '6px 12px', borderRadius: 8,
            transition: 'background 0.2s',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          <ChevronLeft size={16} color={isVideo ? 'white' : '#4A4A68'} />
          <span style={{
            fontSize: 12, fontWeight: 500,
            color: isVideo ? 'rgba(255,255,255,0.8)' : '#4A4A68'
          }}>Back to Batch</span>
        </button>
        <div style={{
          width: 1, height: 24,
          background: isVideo ? 'rgba(255,255,255,0.15)' : '#EEE8E3'
        }} />
        <div style={{
          flex: 1, fontSize: 14, fontWeight: 600,
          color: isVideo ? 'white' : '#1A1A2E',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
        }}>{activeLesson?.title || 'Loading...'}</div>
        <span style={{
          background: typeStyle.bg, color: typeStyle.color,
          border: `1px solid ${typeStyle.border}`,
          fontSize: 11, fontWeight: 600,
          borderRadius: 9999, padding: '4px 10px',
          fontFamily: "'Poppins', sans-serif"
        }}>{typeStyle.label}</span>
        <span style={{
          fontSize: 12,
          color: isVideo ? 'rgba(255,255,255,0.5)' : '#9898B0'
        }}>{activeLesson?.duration}</span>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', minHeight: 0 }}>
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          background: isVideo ? '#1A1A2E' : '#FDF8F4',
          overflow: 'hidden'
        }}>
          {isVideo && (
            <>
              <VideoStage
                activeLesson={activeLesson}
                selectedBatch={selectedBatch}
                playerPlaying={playerPlaying}
                setPlayerPlaying={setPlayerPlaying}
                playerProgress={playerProgress}
                setPlayerProgress={setPlayerProgress}
                lessonComplete={lessonComplete}
                setLessonComplete={setLessonComplete}
                onNext={nextLesson && nextLesson.status !== 'locked' ? handleNext : null}
              />
              <VideoControls
                activeLesson={activeLesson}
                playerPlaying={playerPlaying} setPlayerPlaying={setPlayerPlaying}
                playerProgress={playerProgress} setPlayerProgress={setPlayerProgress}
                playerMuted={playerMuted} setPlayerMuted={setPlayerMuted}
                playerVolume={playerVolume} setPlayerVolume={setPlayerVolume}
                playerSpeed={playerSpeed} setPlayerSpeed={setPlayerSpeed}
                showSpeedMenu={showSpeedMenu} setShowSpeedMenu={setShowSpeedMenu}
                lessonComplete={lessonComplete} setLessonComplete={setLessonComplete}
                showToast={showToast}
              />
            </>
          )}
          {isPdf && (
            <PdfViewer
              activeLesson={activeLesson}
              selectedBatch={selectedBatch}
              showToast={showToast}
            />
          )}
          {isQuizOrAssign && (
            <QuizAssignmentView
              activeLesson={activeLesson}
              setLessonComplete={setLessonComplete}
              showToast={showToast}
            />
          )}
        </div>

        <PlayerSidebar
          lessonList={lessonList}
          activeLesson={activeLesson}
          dark={isVideo}
          setActiveLesson={setActiveLesson}
          lessonComplete={lessonComplete}
          onMarkDone={handleMarkDone}
        />
      </div>
    </div>
  );
}

Object.assign(window, { LearningPlayerScreen });
