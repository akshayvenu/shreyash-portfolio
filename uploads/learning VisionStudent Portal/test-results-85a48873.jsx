// ============================================================
// STEP 3 — TEST RESULTS SCREEN
// ============================================================
const { useState: useStateTR } = React;

function ScoreRing({ pct, color }) {
  const C = 2 * Math.PI * 32;
  const offset = C - (C * pct) / 100;
  return (
    <div style={{ position: 'relative', width: 80, height: 80, flexShrink: 0 }}>
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
  );
}

function QuestionReviewCard({ q, idx, userAnswer }) {
  const { CheckCircle, X, Info } = window.LucideIcons;
  const isCorrect  = userAnswer === q.correct;
  const isAnswered = !!userAnswer;
  const accent = isCorrect ? '#16A34A' : isAnswered ? '#DC2626' : '#9898B0';
  const borderColor = isCorrect ? '#86EFAC' : isAnswered ? '#FECACA' : '#EEE8E3';

  const typeBadge = q.type === 'mcq'
    ? { bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE', label: 'MCQ' }
    : { bg: '#F0FDF4', color: '#16A34A', border: '#86EFAC', label: 'True / False' };

  const resultBadge = isCorrect
    ? { bg: '#DCFCE7', color: '#16A34A', border: '#86EFAC', label: '✓ Correct' }
    : isAnswered
      ? { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA', label: '✗ Incorrect' }
      : { bg: '#F1F5F9', color: '#64748B', border: '#CBD5E1', label: '— Skipped' };

  return (
    <div style={{
      background: 'white',
      border: `1px solid ${borderColor}`,
      borderRadius: 16,
      position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: 4, background: accent
      }} />
      <div style={{ padding: '20px 20px 20px 24px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', marginBottom: 12, gap: 12, flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#9898B0' }}>
              Q{idx + 1}
            </span>
            <span style={{
              background: typeBadge.bg, color: typeBadge.color,
              border: `1px solid ${typeBadge.border}`,
              fontSize: 11, fontWeight: 600,
              borderRadius: 6, padding: '3px 8px',
              fontFamily: "'Poppins', sans-serif"
            }}>{typeBadge.label}</span>
            <span style={{
              background: '#FAF5FF', color: '#7C3AED',
              border: '1px solid #DDD6FE',
              fontSize: 11, fontWeight: 600,
              borderRadius: 6, padding: '3px 8px',
              fontFamily: "'Poppins', sans-serif"
            }}>{q.marks} marks</span>
          </div>
          <span style={{
            fontSize: 12, fontWeight: 600,
            borderRadius: 9999, padding: '4px 12px',
            background: resultBadge.bg, color: resultBadge.color,
            border: `1px solid ${resultBadge.border}`,
            whiteSpace: 'nowrap',
            fontFamily: "'Poppins', sans-serif"
          }}>{resultBadge.label}</span>
        </div>

        <div style={{
          fontSize: 15, fontWeight: 500, color: '#1A1A2E',
          lineHeight: 1.6, marginBottom: 14
        }}>{q.question}</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
          {q.options.map(opt => {
            const isUserChoice = userAnswer === opt;
            const isCorrectOpt = q.correct === opt;
            const optStyle = isCorrectOpt
              ? { bg: '#DCFCE7', border: '#86EFAC' }
              : isUserChoice && !isCorrectOpt
                ? { bg: '#FEF2F2', border: '#FECACA' }
                : { bg: '#F5F0EB', border: 'transparent' };

            let indicator;
            if (isCorrectOpt) {
              indicator = (
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: '#16A34A',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}><CheckCircle size={12} color="white" /></div>
              );
            } else if (isUserChoice && !isCorrectOpt) {
              indicator = (
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: '#DC2626',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}><X size={12} color="white" /></div>
              );
            } else {
              indicator = (
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: '#EEE8E3', flexShrink: 0
                }} />
              );
            }

            const tag = isCorrectOpt
              ? { text: 'Correct answer', c: '#16A34A' }
              : isUserChoice && !isCorrectOpt
                ? { text: 'Your answer', c: '#DC2626' }
                : null;

            return (
              <div key={opt} style={{
                display: 'flex', gap: 12, alignItems: 'center',
                padding: '10px 14px',
                borderRadius: 10,
                background: optStyle.bg,
                border: `1.5px solid ${optStyle.border}`
              }}>
                {indicator}
                <div style={{
                  flex: 1, fontSize: 13,
                  fontWeight: (isCorrectOpt || isUserChoice) ? 600 : 400,
                  color: isCorrectOpt ? '#16A34A'
                    : isUserChoice && !isCorrectOpt ? '#DC2626'
                    : '#6B6B8A'
                }}>{opt}</div>
                {tag && (
                  <div style={{ fontSize: 11, color: tag.c, whiteSpace: 'nowrap' }}>
                    {tag.text}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{
          background: '#FFFBEB', border: '1px solid #FCD34D',
          borderRadius: 10, padding: '10px 14px',
          display: 'flex', gap: 10, alignItems: 'flex-start'
        }}>
          <div style={{ flexShrink: 0, marginTop: 1 }}>
            <Info size={14} color="#D97706" />
          </div>
          <div>
            <div style={{
              fontSize: 11, fontWeight: 600,
              color: '#D97706', marginBottom: 3
            }}>Explanation:</div>
            <div style={{
              fontSize: 12, color: '#4A4A68', lineHeight: 1.5
            }}>{q.explanation}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestResultsScreen(props) {
  const {
    selectedTest, setScreen, showToast,
    testAnswers, testSubmitted,
    calculateScore, resetTestState
  } = props;
  const { ChevronLeft, Download, CheckCircle, Clock, Award, Trophy } = window.LucideIcons;
  const questions = window.testQuestions;

  // Score: either from current submission, or from completed test summary
  const score = testSubmitted
    ? calculateScore()
    : {
        earned: selectedTest?.score || 0,
        total: 100,
        pct: selectedTest?.score || 0
      };
  const scoreColor = window.scoreColor(score.pct);
  const headerBadgeStyle =
    score.pct >= 80 ? { bg: '#DCFCE7', color: '#16A34A', border: '1px solid #86EFAC' } :
    score.pct >= 60 ? { bg: '#FEF3C7', color: '#D97706', border: '1px solid #FCD34D' } :
                      { bg: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' };

  const correctCount = questions.filter(q => testAnswers[q.id] === q.correct).length;
  const incorrectCount = questions.filter(
    q => testAnswers[q.id] && testAnswers[q.id] !== q.correct
  ).length;

  const bannerBg =
    score.pct >= 80 ? 'linear-gradient(135deg, #DCFCE7, #F0FDF4)' :
    score.pct >= 60 ? 'linear-gradient(135deg, #FEF3C7, #FFFBEB)' :
                      'linear-gradient(135deg, #FEF2F2, #FFF1F2)';
  const bannerBorder =
    score.pct >= 80 ? '1px solid #86EFAC' :
    score.pct >= 60 ? '1px solid #FCD34D' :
                      '1px solid #FECACA';

  const retake = () => {
    resetTestState();
    setScreen('test-active');
  };

  const [dlHover, setDlHover] = useStateTR(false);

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
        <button
          onClick={() => setScreen('tests')}
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
          <span style={{ fontSize: 13, fontWeight: 500 }}>Tests</span>
        </button>
        <div style={{
          fontSize: 15, fontWeight: 600, color: '#1A1A2E', flex: 1,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
        }}>{selectedTest?.title}</div>
        <span style={{
          background: headerBadgeStyle.bg,
          color: headerBadgeStyle.color,
          border: headerBadgeStyle.border,
          fontSize: 14, fontWeight: 700,
          borderRadius: 9999, padding: '6px 16px',
          fontFamily: "'Poppins', sans-serif",
          whiteSpace: 'nowrap'
        }}>{score.pct}%</span>
        <button
          onClick={() => setTimeout(() => showToast('PDF download coming soon!', 'info'), 0)}
          onMouseEnter={() => setDlHover(true)}
          onMouseLeave={() => setDlHover(false)}
          style={{
            background: dlHover ? '#FFFCFA' : 'transparent',
            border: '1px solid #EEE8E3',
            color: '#4A4A68',
            height: 36, padding: '0 14px',
            borderRadius: 8, cursor: 'pointer',
            fontSize: 12, fontWeight: 600,
            display: 'flex', gap: 6, alignItems: 'center',
            fontFamily: "'Poppins', sans-serif",
            transition: 'background 0.2s'
          }}
        >
          <Download size={14} color="#4A4A68" />
          Download PDF
        </button>
      </div>

      {/* Body */}
      <div style={{
        flex: 1, overflow: 'hidden', display: 'flex', gap: 0, minHeight: 0
      }}>
        {/* Left — questions review */}
        <div
          className="inner-scroll"
          style={{ flex: 1, overflowY: 'auto', padding: 24 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Performance banner */}
            <div style={{
              background: bannerBg,
              border: bannerBorder,
              borderRadius: 16, padding: 20,
              display: 'flex', alignItems: 'center', gap: 20
            }}>
              <ScoreRing pct={score.pct} color={scoreColor} />
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 18, fontWeight: 700, color: '#1A1A2E', marginBottom: 4
                }}>
                  {score.pct >= 80 ? 'Excellent work! 🏆'
                   : score.pct >= 60 ? 'Good effort! 👍'
                   : 'Keep practicing! 📚'}
                </div>
                <div style={{ fontSize: 13, color: '#6B6B8A', marginBottom: 12 }}>
                  {score.pct >= 80
                    ? "You've demonstrated strong understanding."
                    : score.pct >= 60
                      ? 'Review the questions you missed.'
                      : 'Review the material and try again.'}
                </div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{
                    display: 'flex', gap: 6, alignItems: 'center', fontSize: 13
                  }}>
                    <CheckCircle size={14} color="#16A34A" />
                    <span style={{ color: '#6B6B8A' }}>Correct:</span>
                    <span style={{ fontWeight: 600, color: '#1A1A2E' }}>
                      {correctCount}/{questions.length}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex', gap: 6, alignItems: 'center', fontSize: 13
                  }}>
                    <Clock size={14} color="#9898B0" />
                    <span style={{ color: '#6B6B8A' }}>Time:</span>
                    <span style={{ fontWeight: 600, color: '#1A1A2E' }}>
                      {selectedTest?.duration} min
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section title */}
            <div style={{
              display: 'flex', gap: 8, alignItems: 'baseline',
              marginTop: 8
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>
                Question Review
              </div>
              <div style={{ fontSize: 12, color: '#9898B0' }}>
                ({questions.length} questions)
              </div>
            </div>

            {questions.map((q, idx) => (
              <QuestionReviewCard
                key={q.id}
                q={q}
                idx={idx}
                userAnswer={testAnswers[q.id]}
              />
            ))}
          </div>
        </div>

        {/* Right — summary sidebar */}
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
          {/* Breakdown */}
          <div style={{
            background: 'white', border: '1px solid #EEE8E3',
            borderRadius: 16, padding: 16
          }}>
            <div style={{
              display: 'flex', gap: 8, alignItems: 'center',
              marginBottom: 12,
              fontSize: 13, fontWeight: 600, color: '#1A1A2E'
            }}>
              <Award size={14} color="#BD1313" />
              Score Breakdown
            </div>
            {[
              { label: 'Total Questions', value: questions.length },
              { label: 'Correct',  value: correctCount, color: '#16A34A' },
              { label: 'Incorrect', value: incorrectCount, color: '#DC2626' },
              {
                label: 'Marks Earned',
                value: `${score.earned}/${score.total}`,
                weight: 700, color: '#BD1313'
              }
            ].map((row, i, arr) => (
              <div key={row.label} style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: i === arr.length - 1 ? 'none' : '1px solid #F5F0EB'
              }}>
                <span style={{ fontSize: 12, color: '#6B6B8A' }}>{row.label}</span>
                <span style={{
                  fontSize: 13,
                  fontWeight: row.weight || 600,
                  color: row.color || '#1A1A2E'
                }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Performance badge */}
          {score.pct >= 80 && (
            <div style={{
              background: 'linear-gradient(135deg, #DCFCE7, white)',
              border: '1px solid #86EFAC',
              borderRadius: 16, padding: 16,
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
                <Trophy size={32} color="#16A34A" />
              </div>
              <div style={{
                fontSize: 14, fontWeight: 700, color: '#1A1A2E', marginBottom: 4
              }}>Excellent Performance!</div>
              <div style={{ fontSize: 12, color: '#16A34A', marginBottom: 12 }}>
                You're in the top performers for this test.
              </div>
              <img
                src="https://img.icons8.com/3d-fluency/100/trophy.png"
                width={56} height={56} alt=""
                style={{
                  display: 'block', margin: '0 auto',
                  background: 'transparent'
                }}
              />
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              onClick={retake}
              style={{
                background: 'transparent',
                border: '1.5px solid #EEE8E3',
                color: '#4A4A68',
                height: 40, borderRadius: 10,
                cursor: 'pointer',
                fontSize: 13, fontWeight: 600,
                width: '100%',
                fontFamily: "'Poppins', sans-serif"
              }}
            >Retake Test</button>
            <button
              onClick={() => setScreen('tests')}
              style={{
                background: '#BD1313', color: 'white',
                height: 40, borderRadius: 10,
                border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 600,
                width: '100%',
                fontFamily: "'Poppins', sans-serif"
              }}
            >Back to Tests</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TestResultsScreen });
