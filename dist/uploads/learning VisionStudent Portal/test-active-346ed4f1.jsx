// ============================================================
// STEP 3 — TEST ACTIVE (full-screen test taking)
// ============================================================
const { useState: useStateTA } = React;

function TestStartCard(props) {
  const { selectedTest, onStart, onExit } = props;
  const { HelpCircle, Clock, Award } = window.LucideIcons;
  const [ctaHover, setCtaHover] = useStateTA(false);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flex: 1, padding: 24, overflowY: 'auto'
    }}>
      <div style={{
        background: 'white', borderRadius: 20, padding: 40,
        maxWidth: 520, width: '100%', textAlign: 'center',
        border: '1px solid #EEE8E3',
        boxShadow: '0 8px 24px rgba(26,26,46,0.08)'
      }}>
        <img
          src="https://img.icons8.com/pulsar-color/96/exam.png"
          width={80} height={80} alt=""
          style={{
            display: 'block', margin: '0 auto 20px',
            background: 'transparent',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))'
          }}
        />
        <div style={{
          fontSize: 22, fontWeight: 700, color: '#1A1A2E', marginBottom: 6
        }}>{selectedTest?.title}</div>
        <div style={{
          fontSize: 14, color: '#9898B0', marginBottom: 24
        }}>{selectedTest?.batch}</div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12, marginBottom: 28
        }}>
          {[
            { icon: <HelpCircle size={20} color="#BD1313" />, value: selectedTest?.totalQuestions, label: 'Questions' },
            { icon: <Clock size={20} color="#BD1313" />,      value: selectedTest?.duration,       label: 'Minutes' },
            { icon: <Award size={20} color="#BD1313" />,      value: 100,                          label: 'Total Marks' }
          ].map(b => (
            <div key={b.label} style={{
              background: '#FDF8F4', borderRadius: 12, padding: 16,
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: 6, display: 'flex', justifyContent: 'center' }}>{b.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#1A1A2E' }}>{b.value}</div>
              <div style={{
                fontSize: 11, color: '#9898B0',
                textTransform: 'uppercase', letterSpacing: '0.6px',
                marginTop: 2
              }}>{b.label}</div>
            </div>
          ))}
        </div>

        <div style={{
          background: '#FFFBEB', border: '1px solid #FCD34D',
          borderRadius: 12, padding: '14px 16px',
          marginBottom: 28, textAlign: 'left'
        }}>
          <div style={{
            fontSize: 12, fontWeight: 600,
            color: '#D97706', marginBottom: 8
          }}>Before you begin:</div>
          {[
            'Once started, the timer cannot be paused.',
            'You can change your answers before submitting.',
            'The test will auto-submit when time runs out.'
          ].map(rule => (
            <div key={rule} style={{
              display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#D97706', marginTop: 6, flexShrink: 0
              }} />
              <div style={{
                fontSize: 12, color: '#4A4A68', lineHeight: 1.5
              }}>{rule}</div>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          style={{
            background: ctaHover ? '#991010' : '#BD1313',
            color: 'white',
            height: 48, padding: '0 32px',
            borderRadius: 10, border: 'none',
            cursor: 'pointer',
            fontSize: 15, fontWeight: 600,
            fontFamily: "'Poppins', sans-serif",
            transform: ctaHover ? 'translateY(-1px)' : 'none',
            boxShadow: ctaHover
              ? '0 6px 20px rgba(189,19,19,0.30)'
              : 'none',
            transition: 'all 0.2s'
          }}
        >Start Test →</button>
        <div>
          <button
            onClick={onExit}
            style={{
              color: '#9898B0', background: 'transparent',
              border: 'none', cursor: 'pointer',
              fontSize: 13, marginTop: 12,
              fontFamily: "'Poppins', sans-serif"
            }}
          >← Exit Test</button>
        </div>
      </div>
    </div>
  );
}

function TestActiveScreen(props) {
  const {
    selectedTest,
    testStarted, setTestStarted,
    testAnswers, setTestAnswers,
    currentQuestion, setCurrentQuestion,
    testTimeLeft, setTestTimeLeft,
    handleSubmitTest,
    setScreen
  } = props;
  const { Clock, ChevronLeft } = window.LucideIcons;
  const questions = window.testQuestions;
  const q = questions[currentQuestion];
  const lowTime = (testTimeLeft || 0) <= 60;
  const [hoverSubmit, setHoverSubmit] = useStateTA(false);

  const start = () => {
    setTestStarted(true);
    setTestTimeLeft(selectedTest.duration * 60);
    setCurrentQuestion(0);
  };
  const exit = () => {
    setTestStarted(false);
    setScreen('tests');
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#FDF8F4',
      fontFamily: "'Poppins', sans-serif",
      display: 'flex', flexDirection: 'column',
      zIndex: 50
    }}>
      {/* Header */}
      <div style={{
        height: 56, background: 'white',
        borderBottom: '1px solid #EEE8E3',
        padding: '0 24px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png"
            height={24} alt="AIVision21"
            style={{
              background: 'transparent',
              filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.1))'
            }}
          />
          <div style={{ width: 1, height: 24, background: '#EEE8E3', margin: '0 16px' }} />
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A2E' }}>
            {selectedTest?.title}
          </div>
        </div>

        {testStarted && (
          <div style={{
            display: 'flex', gap: 8, alignItems: 'center',
            padding: '6px 16px',
            borderRadius: 9999,
            background: lowTime ? '#FEF2F2' : '#F0FDF4',
            border: lowTime ? '1px solid #FECACA' : '1px solid #86EFAC'
          }}>
            <Clock size={16} color={lowTime ? '#DC2626' : '#16A34A'} />
            <span style={{
              fontSize: 16, fontWeight: 700,
              color: lowTime ? '#DC2626' : '#16A34A',
              fontFamily: "'Poppins', sans-serif",
              fontVariantNumeric: 'tabular-nums'
            }}>{window.formatTime(testTimeLeft || 0)}</span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center' }}>
          {testStarted && (
            <>
              <div style={{ fontSize: 13, color: '#9898B0' }}>
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <button
                onClick={handleSubmitTest}
                onMouseEnter={() => setHoverSubmit(true)}
                onMouseLeave={() => setHoverSubmit(false)}
                style={{
                  background: hoverSubmit ? '#991010' : '#BD1313',
                  color: 'white',
                  height: 36, padding: '0 16px',
                  borderRadius: 9999, border: 'none',
                  cursor: 'pointer',
                  fontSize: 13, fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  marginLeft: 16,
                  transition: 'background 0.2s'
                }}
              >Submit Test</button>
            </>
          )}
        </div>
      </div>

      {!testStarted ? (
        <TestStartCard
          selectedTest={selectedTest}
          onStart={start}
          onExit={exit}
        />
      ) : (
        <TestActiveBody
          q={q}
          questions={questions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          testAnswers={testAnswers}
          setTestAnswers={setTestAnswers}
          handleSubmitTest={handleSubmitTest}
        />
      )}
    </div>
  );
}

function TestActiveBody({ q, questions, currentQuestion, setCurrentQuestion, testAnswers, setTestAnswers, handleSubmitTest }) {
  const typeBadge = q.type === 'mcq'
    ? { bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE', label: 'MCQ' }
    : { bg: '#F0FDF4', color: '#16A34A', border: '#86EFAC', label: 'True / False' };
  const isLast = currentQuestion === questions.length - 1;
  const answeredCount = Object.keys(testAnswers).length;

  return (
    <div style={{
      flex: 1, overflow: 'hidden', display: 'flex', gap: 0, minHeight: 0
    }}>
      {/* Question area */}
      <div
        className="inner-scroll"
        style={{ flex: 1, overflowY: 'auto', padding: 32 }}
      >
        <div style={{
          background: 'white', border: '1px solid #EEE8E3',
          borderRadius: 20, padding: 32, maxWidth: 680,
          boxShadow: '0 4px 16px rgba(26,26,46,0.06)'
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', gap: 16, marginBottom: 24
          }}>
            <div>
              <div style={{
                background: '#FDF2F2', color: '#BD1313',
                border: '1px solid #F5BFBF',
                fontSize: 12, fontWeight: 600,
                borderRadius: 9999, padding: '4px 12px',
                marginBottom: 12,
                fontFamily: "'Poppins', sans-serif",
                display: 'inline-block'
              }}>Question {currentQuestion + 1}</div>
              <div>
                <span style={{
                  background: '#FAF5FF', color: '#7C3AED',
                  border: '1px solid #DDD6FE',
                  fontSize: 11, fontWeight: 600,
                  borderRadius: 6, padding: '3px 8px',
                  fontFamily: "'Poppins', sans-serif"
                }}>{q.marks} marks</span>
              </div>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 600,
              borderRadius: 6, padding: '4px 10px',
              background: typeBadge.bg, color: typeBadge.color,
              border: `1px solid ${typeBadge.border}`,
              fontFamily: "'Poppins', sans-serif"
            }}>{typeBadge.label}</span>
          </div>

          <div style={{
            fontSize: 17, fontWeight: 500, color: '#1A1A2E',
            lineHeight: 1.6, marginBottom: 24
          }}>{q.question}</div>

          <div style={{
            display: 'flex', flexDirection: 'column', gap: 10
          }}>
            {q.options.map(option => (
              <OptionButton
                key={option}
                option={option}
                selected={testAnswers[q.id] === option}
                onPick={() => setTestAnswers(prev => ({ ...prev, [q.id]: option }))}
              />
            ))}
          </div>

          <div style={{
            marginTop: 28,
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button
              onClick={() => setCurrentQuestion(c => c - 1)}
              disabled={currentQuestion === 0}
              style={{
                height: 40, padding: '0 16px',
                borderRadius: 10,
                border: '1.5px solid #EEE8E3',
                background: 'transparent',
                color: '#4A4A68',
                cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                opacity: currentQuestion === 0 ? 0.4 : 1,
                fontSize: 13, fontWeight: 600,
                fontFamily: "'Poppins', sans-serif"
              }}
            >← Previous</button>

            <div style={{ display: 'flex', gap: 6 }}>
              {questions.map((qq, idx) => (
                <span
                  key={qq.id}
                  onClick={() => setCurrentQuestion(idx)}
                  style={{
                    width: 10, height: 10, borderRadius: '50%',
                    cursor: 'pointer',
                    background:
                      idx === currentQuestion ? '#BD1313'
                      : testAnswers[qq.id] ? '#16A34A'
                      : '#EEE8E3',
                    transform: idx === currentQuestion ? 'scale(1.3)' : 'scale(1)',
                    transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>

            {isLast ? (
              <button
                onClick={handleSubmitTest}
                style={{
                  height: 40, padding: '0 20px',
                  borderRadius: 10, border: 'none',
                  background: '#16A34A', color: 'white',
                  cursor: 'pointer',
                  fontSize: 13, fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif"
                }}
              >Submit Test ✓</button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(c => c + 1)}
                style={{
                  height: 40, padding: '0 20px',
                  borderRadius: 10, border: 'none',
                  background: '#BD1313', color: 'white',
                  cursor: 'pointer',
                  fontSize: 13, fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif"
                }}
              >Next →</button>
            )}
          </div>
        </div>
      </div>

      {/* Navigator */}
      <div style={{
        width: 260, flexShrink: 0,
        padding: 24, background: 'white',
        borderLeft: '1px solid #EEE8E3',
        display: 'flex', flexDirection: 'column', gap: 16,
        overflowY: 'auto'
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A2E' }}>
          Questions
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8
        }}>
          {questions.map((qq, idx) => {
            const active = idx === currentQuestion;
            const answered = !!testAnswers[qq.id];
            const styleProps = active
              ? { bg: '#FDF2F2', border: '#BD1313', color: '#BD1313' }
              : answered
                ? { bg: '#DCFCE7', border: '#86EFAC', color: '#16A34A' }
                : { bg: 'white',   border: '#EEE8E3', color: '#4A4A68' };
            return (
              <button
                key={qq.id}
                onClick={() => setCurrentQuestion(idx)}
                style={{
                  height: 32, borderRadius: 8,
                  border: `1.5px solid ${styleProps.border}`,
                  background: styleProps.bg,
                  color: styleProps.color,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  transition: 'all 0.15s'
                }}
              >{idx + 1}</button>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
          {[
            { label: 'Current',    c: '#BD1313' },
            { label: 'Answered',   c: '#16A34A' },
            { label: 'Unanswered', c: '#D1D5DB' }
          ].map(l => (
            <div key={l.label} style={{
              display: 'flex', gap: 8, alignItems: 'center',
              fontSize: 11, color: '#6B6B8A'
            }}>
              <span style={{
                width: 10, height: 10, borderRadius: '50%',
                background: l.c
              }} />
              {l.label}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 'auto',
          background: '#FDF8F4', borderRadius: 12, padding: 12,
          border: '1px solid #EEE8E3'
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: 12, color: '#4A4A68', marginBottom: 6
          }}>
            <span>Answered</span>
            <span style={{ fontWeight: 600, color: '#16A34A' }}>
              {answeredCount}/{questions.length}
            </span>
          </div>
          <div style={{
            height: 6, background: '#EEE8E3',
            borderRadius: 9999, overflow: 'hidden'
          }}>
            <div style={{
              width: `${(answeredCount / questions.length) * 100}%`,
              background: '#16A34A', height: '100%',
              borderRadius: 9999,
              transition: 'width 0.3s'
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function OptionButton({ option, selected, onPick }) {
  const [hover, setHover] = useStateTA(false);
  const bg = selected ? '#FDF2F2' : (hover ? '#FFFCFA' : 'white');
  const border = selected ? '#BD1313' : (hover ? '#DDD7D0' : '#EEE8E3');
  return (
    <div
      onClick={onPick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 18px',
        borderRadius: 12, cursor: 'pointer',
        border: `2px solid ${border}`,
        background: bg,
        transition: 'all 0.15s'
      }}
    >
      <div style={{
        width: 20, height: 20, borderRadius: '50%',
        border: `2px solid ${selected ? '#BD1313' : '#DDD7D0'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0
      }}>
        {selected && (
          <div style={{
            width: 10, height: 10, borderRadius: '50%', background: '#BD1313'
          }} />
        )}
      </div>
      <div style={{
        flex: 1, fontSize: 14,
        fontWeight: selected ? 600 : 400,
        color: selected ? '#BD1313' : '#1A1A2E'
      }}>{option}</div>
    </div>
  );
}

Object.assign(window, { TestActiveScreen });
