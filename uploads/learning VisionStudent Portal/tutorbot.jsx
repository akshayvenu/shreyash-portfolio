// ============================================================
// STEP 6 — TUTORBOT AI CHAT SCREEN
// ============================================================
const { useState: useStateTB, useRef: useRefTB, useEffect: useEffectTB } = React;

// Render text with simple **bold** and ``` code-block ``` support
function renderBotText(text, isUser) {
  // Split into segments by code blocks
  const segments = [];
  const codeRe = /```([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;
  while ((match = codeRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ kind: 'text', value: text.slice(lastIndex, match.index) });
    }
    segments.push({ kind: 'code', value: match[1].replace(/^\n+|\n+$/g, '') });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    segments.push({ kind: 'text', value: text.slice(lastIndex) });
  }

  const renderBold = (str, keyPrefix) => {
    const parts = str.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) => {
      if (p.startsWith('**') && p.endsWith('**')) {
        return <strong key={keyPrefix + '-b-' + i}>{p.slice(2, -2)}</strong>;
      }
      return <React.Fragment key={keyPrefix + '-t-' + i}>{p}</React.Fragment>;
    });
  };

  return segments.map((seg, sIdx) => {
    if (seg.kind === 'code') {
      return (
        <pre key={'c-' + sIdx} style={{
          background: isUser ? 'rgba(0,0,0,0.2)' : '#F5F0EB',
          color: isUser ? 'white' : '#1A1A2E',
          borderRadius: 6,
          padding: '8px 12px',
          fontSize: 12,
          marginTop: 6,
          fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
          overflow: 'auto',
          whiteSpace: 'pre',
          maxWidth: '100%'
        }}>{seg.value}</pre>
      );
    }
    const lines = seg.value.split('\n');
    return lines.map((line, li) => (
      <div key={'l-' + sIdx + '-' + li} style={{ minHeight: line === '' ? '0.5em' : 'auto' }}>
        {renderBold(line, sIdx + '-' + li)}
      </div>
    ));
  });
}

function BotMessage({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div style={{
      display: 'flex',
      flexDirection: isUser ? 'row-reverse' : 'row',
      gap: 10, alignItems: 'flex-end'
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        flexShrink: 0,
        background: isUser
          ? 'linear-gradient(135deg, #BD1313, #7A0D0D)'
          : 'linear-gradient(135deg, #7C3AED, #4F46E5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontSize: 12, fontWeight: 700
      }}>
        {isUser ? 'AS' : (
          <img
            src="https://img.icons8.com/pulsar-color/48/bot.png"
            width={18} height={18} alt=""
            style={{ background: 'transparent' }}
          />
        )}
      </div>
      <div style={{
        maxWidth: '68%',
        display: 'flex', flexDirection: 'column', gap: 4,
        alignItems: isUser ? 'flex-end' : 'flex-start'
      }}>
        <div style={{
          padding: '12px 16px',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          fontSize: 14, lineHeight: 1.65,
          fontFamily: "'Poppins', sans-serif",
          background: isUser
            ? 'linear-gradient(135deg, #BD1313, #991010)'
            : 'white',
          color: isUser ? 'white' : '#1A1A2E',
          border: isUser ? 'none' : '1px solid #EEE8E3',
          boxShadow: isUser
            ? '0 2px 8px rgba(189,19,19,0.25)'
            : '0 2px 8px rgba(26,26,46,0.06)',
          wordBreak: 'break-word'
        }}>
          {renderBotText(msg.text, isUser)}
        </div>
        <div style={{ fontSize: 10, color: '#9898B0' }}>{msg.time}</div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0
      }}>
        <img
          src="https://img.icons8.com/pulsar-color/48/bot.png"
          width={18} height={18} alt=""
          style={{ background: 'transparent' }}
        />
      </div>
      <div style={{
        padding: '14px 18px',
        borderRadius: '18px 18px 18px 4px',
        background: 'white',
        border: '1px solid #EEE8E3',
        boxShadow: '0 2px 8px rgba(26,26,46,0.06)',
        display: 'flex', gap: 5, alignItems: 'center'
      }}>
        {[0, 0.16, 0.32].map(delay => (
          <span key={delay} style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#C4B5FD',
            display: 'inline-block',
            animation: 'dotPulse 1.4s ease-in-out infinite',
            animationDelay: `${delay}s`
          }} />
        ))}
      </div>
    </div>
  );
}

function TutorBotScreen(props) {
  const {
    botMessages, setBotMessages,
    botInput, setBotInput,
    botTyping, setBotTyping,
    botMessageId, setBotMessageId,
    showToast
  } = props;
  const { Trash2, BookOpen, Zap, Send, Sparkles } = window.LucideIcons;
  const scrollRef = useRefTB(null);
  const [inputFocused, setInputFocused] = useStateTB(false);

  useEffectTB(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [botMessages, botTyping]);

  const handleSend = (text) => {
    const msgText = (text != null ? text : botInput).trim();
    if (!msgText) return;
    const userId = botMessageId;
    const userMsg = {
      id: userId, role: 'user', text: msgText, time: 'Just now', typing: false
    };
    setBotMessages(prev => [...prev, userMsg]);
    setBotInput('');
    setBotTyping(true);
    setBotMessageId(id => id + 1);

    setTimeout(() => {
      const reply = window.getBotReply(msgText);
      setBotTyping(false);
      setBotMessages(prev => [...prev, {
        id: userId + 1, role: 'assistant',
        text: reply, time: 'Just now', typing: false
      }]);
      setBotMessageId(id => id + 1);
    }, 1400);
  };

  const handleClear = () => {
    setBotMessages(window.tutorBotInitialMessages);
    setBotMessageId(2);
    setTimeout(() => showToast('Chat cleared', 'info'), 0);
  };

  const topics = [
    { label: 'Your Batches', items: [
      'React Batch Progress 📊',
      'Python DS Status 🐍',
      'Upcoming Deadlines ⏰'
    ]},
    { label: 'Concepts', items: [
      'Explain useEffect 🎯',
      'Props vs State 🔄',
      'Virtual DOM 🌐',
      'JSX Rules ✍️'
    ]},
    { label: 'Practice', items: [
      'Quiz me on React 🧠',
      'Python practice questions',
      'Explain my test mistakes'
    ]}
  ];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%', overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        height: 64, background: 'white',
        borderBottom: '1px solid #EEE8E3',
        padding: '0 24px',
        display: 'flex', alignItems: 'center', gap: 14,
        flexShrink: 0
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(124,58,237,0.30)',
          flexShrink: 0
        }}>
          <img
            src="https://img.icons8.com/pulsar-color/48/bot.png"
            width={26} height={26} alt=""
            style={{ background: 'transparent' }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A2E' }}>
              TutorBot
            </div>
            <span style={{
              background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
              color: 'white',
              fontSize: 9, fontWeight: 700,
              borderRadius: 9999, padding: '2px 7px',
              textTransform: 'uppercase', letterSpacing: '0.5px',
              fontFamily: "'Poppins', sans-serif"
            }}>AI</span>
          </div>
          <div style={{
            display: 'flex', gap: 5, alignItems: 'center', marginTop: 1
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16A34A' }} />
            <span style={{ fontSize: 12, color: '#16A34A', fontWeight: 500 }}>
              Online · Ready to help
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={handleClear}
            style={{
              color: '#9898B0', fontSize: 12, fontWeight: 500,
              background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', gap: 5, alignItems: 'center',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            <Trash2 size={13} color="#9898B0" />
            Clear
          </button>
          <div style={{
            display: 'flex', gap: 6, alignItems: 'center',
            background: '#FAF5FF', border: '1px solid #DDD6FE',
            color: '#7C3AED', fontSize: 11, fontWeight: 600,
            borderRadius: 9999, padding: '5px 10px',
            fontFamily: "'Poppins', sans-serif"
          }}>
            <BookOpen size={12} color="#7C3AED" />
            React Batch context
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{
        flex: 1, overflow: 'hidden', display: 'flex', minHeight: 0
      }}>
        {/* Chat column */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          minWidth: 0, overflow: 'hidden'
        }}>
          <div
            ref={scrollRef}
            className="inner-scroll"
            style={{
              flex: 1, overflowY: 'auto',
              padding: '20px 24px',
              display: 'flex', flexDirection: 'column', gap: 16
            }}
          >
            {botMessages.map(msg => (
              <BotMessage key={msg.id} msg={msg} />
            ))}
            {botTyping && <TypingIndicator />}
          </div>

          {/* Suggestion chips */}
          <div style={{
            padding: '10px 24px 8px',
            display: 'flex', gap: 8, flexWrap: 'wrap',
            background: 'white',
            borderTop: '1px solid #EEE8E3'
          }}>
            {window.tutorBotSuggestions.slice(0, 4).map(s => (
              <SuggestionChip key={s} text={s} onPick={handleSend} />
            ))}
          </div>

          {/* Input bar */}
          <div style={{
            height: 64, flexShrink: 0,
            background: 'white',
            borderTop: '1px solid #EEE8E3',
            padding: '0 24px',
            display: 'flex', alignItems: 'center', gap: 10
          }}>
            <div style={{
              flex: 1, height: 44,
              background: '#FDF8F4',
              border: inputFocused
                ? '1.5px solid #7C3AED'
                : '1.5px solid #EEE8E3',
              borderRadius: 9999,
              display: 'flex', alignItems: 'center',
              padding: '0 16px', gap: 10,
              boxShadow: inputFocused ? '0 0 0 3px rgba(124,58,237,0.08)' : 'none',
              transition: 'all 0.15s'
            }}>
              <Zap size={15} color="#9898B0" />
              <input
                placeholder="Ask anything about your courses..."
                value={botInput}
                onChange={(e) => setBotInput(e.target.value.slice(0, 500))}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                style={{
                  flex: 1, border: 'none', outline: 'none',
                  background: 'transparent',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 14, color: '#1A1A2E'
                }}
              />
              {botInput.length > 0 && (
                <span style={{
                  fontSize: 11, color: '#9898B0', whiteSpace: 'nowrap'
                }}>{botInput.length}/500</span>
              )}
            </div>
            <SendButton
              hasText={botInput.trim().length > 0}
              onSend={handleSend}
            />
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{
          width: 280, flexShrink: 0,
          background: 'white',
          borderLeft: '1px solid #EEE8E3',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <div style={{
            height: 48, padding: '0 16px',
            borderBottom: '1px solid #EEE8E3',
            display: 'flex', alignItems: 'center',
            flexShrink: 0,
            fontSize: 13, fontWeight: 600, color: '#1A1A2E'
          }}>Quick Topics</div>

          <div
            className="inner-scroll"
            style={{
              flex: 1, overflowY: 'auto', padding: 12,
              display: 'flex', flexDirection: 'column', gap: 6
            }}
          >
            {topics.map((cat, ci) => (
              <div key={cat.label}>
                <div style={{
                  fontSize: 10, fontWeight: 600, color: '#9898B0',
                  textTransform: 'uppercase', letterSpacing: '0.7px',
                  marginBottom: 6, marginTop: ci === 0 ? 0 : 10
                }}>{cat.label}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {cat.items.map(it => (
                    <TopicButton key={it} text={it} onPick={handleSend} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            padding: 12,
            borderTop: '1px solid #EEE8E3',
            flexShrink: 0
          }}>
            <div style={{
              background: '#FAF5FF', border: '1px solid #DDD6FE',
              borderRadius: 10, padding: '10px 12px',
              display: 'flex', gap: 8, alignItems: 'flex-start'
            }}>
              <div style={{ flexShrink: 0, marginTop: 1 }}>
                <Sparkles size={14} color="#7C3AED" />
              </div>
              <div style={{ fontSize: 12, color: '#7C3AED', lineHeight: 1.5 }}>
                TutorBot uses AI to answer questions about your courses and learning progress.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuggestionChip({ text, onPick }) {
  const [hover, setHover] = useStateTB(false);
  return (
    <button
      onClick={() => onPick(text)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        height: 30, padding: '0 12px', borderRadius: 9999,
        border: `1px solid ${hover ? '#DDD6FE' : '#EEE8E3'}`,
        background: hover ? '#FAF5FF' : '#FDF8F4',
        cursor: 'pointer',
        fontSize: 11, fontWeight: 500,
        color: hover ? '#7C3AED' : '#4A4A68',
        fontFamily: "'Poppins', sans-serif",
        whiteSpace: 'nowrap',
        transition: 'all 0.15s'
      }}
    >{text}</button>
  );
}

function TopicButton({ text, onPick }) {
  const [hover, setHover] = useStateTB(false);
  return (
    <button
      onClick={() => onPick(text)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'block', width: '100%', textAlign: 'left',
        padding: '9px 12px', borderRadius: 10,
        border: `1px solid ${hover ? '#DDD6FE' : '#EEE8E3'}`,
        background: hover ? '#FAF5FF' : 'white',
        cursor: 'pointer',
        fontSize: 12, fontWeight: 500,
        color: hover ? '#7C3AED' : '#4A4A68',
        fontFamily: "'Poppins', sans-serif",
        transition: 'all 0.15s'
      }}
    >{text}</button>
  );
}

function SendButton({ hasText, onSend }) {
  const { Send } = window.LucideIcons;
  const [hover, setHover] = useStateTB(false);
  return (
    <button
      onClick={() => hasText && onSend()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 44, height: 44, borderRadius: '50%',
        border: 'none',
        cursor: hasText ? 'pointer' : 'default',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s',
        flexShrink: 0,
        background: hasText
          ? (hover ? '#6D28D9' : '#7C3AED')
          : '#EEE8E3',
        boxShadow: hasText && hover
          ? '0 4px 12px rgba(124,58,237,0.35)' : 'none',
        transform: hasText && hover ? 'scale(1.05)' : 'scale(1)'
      }}
      aria-label="Send"
    >
      <Send size={18} color={hasText ? 'white' : '#9898B0'} />
    </button>
  );
}

Object.assign(window, { TutorBotScreen });
