// ============================================================
// STEP 4 — CALENDAR SCREEN
// ============================================================
const { useState: useStateCal } = React;

function CalendarDayCell({ day, events, isToday, isSelected, onSelect }) {
  const [hover, setHover] = useStateCal(false);
  const hasEvents = events.length > 0;
  const bg = isSelected ? '#FDF2F2'
    : (hover && hasEvents ? '#FFFCFA' : 'white');

  // Day-number badge style
  let badgeStyle = {
    display: 'inline-flex',
    width: 24, height: 24, borderRadius: '50%',
    alignItems: 'center', justifyContent: 'center',
    fontSize: 13, fontWeight: 400, marginBottom: 4
  };
  if (isToday) {
    badgeStyle = { ...badgeStyle, background: '#BD1313', color: 'white', fontWeight: 700 };
  } else if (isSelected) {
    badgeStyle = {
      ...badgeStyle,
      background: '#FDF2F2', color: '#BD1313',
      border: '1.5px solid #BD1313', fontWeight: 600
    };
  } else {
    badgeStyle = { ...badgeStyle, background: 'transparent', color: '#1A1A2E' };
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={hasEvents ? () => onSelect(day) : undefined}
      style={{
        minHeight: 80,
        padding: '8px 10px',
        borderRight: '1px solid #F5F0EB',
        borderBottom: '1px solid #F5F0EB',
        cursor: hasEvents ? 'pointer' : 'default',
        transition: 'background 0.15s',
        background: bg,
        position: 'relative'
      }}
    >
      <div style={badgeStyle}>{day}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {events.slice(0, 2).map((ev, ei) => (
          <div key={ei} style={{
            display: 'flex', gap: 4, alignItems: 'center',
            padding: '2px 6px', borderRadius: 4,
            background: ev.color + '18'
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: ev.color, flexShrink: 0
            }} />
            <span style={{
              fontSize: 10, fontWeight: 500, color: ev.color,
              whiteSpace: 'nowrap', overflow: 'hidden',
              textOverflow: 'ellipsis', maxWidth: '100%'
            }}>{ev.label}</span>
          </div>
        ))}
        {events.length > 2 && (
          <div style={{ fontSize: 10, color: '#9898B0', marginTop: 2 }}>
            +{events.length - 2} more
          </div>
        )}
      </div>
    </div>
  );
}

function CalendarScreen(props) {
  const {
    calMonth, setCalMonth, calYear, setCalYear,
    calSelectedDay, setCalSelectedDay
  } = props;
  const { ChevronLeft, ChevronRight, Calendar: CalIcon, Zap, Check } = window.LucideIcons;

  const days = window.getDaysInMonth(calMonth, calYear);
  const firstDay = window.getFirstDay(calMonth, calYear);
  const monthData = window.calendarEvents[calYear]?.[calMonth];
  const getEvents = (d) => (monthData && monthData[d]) || [];

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
    setCalSelectedDay(null);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
    setCalSelectedDay(null);
  };
  const today = () => {
    setCalMonth(4); setCalYear(2025); setCalSelectedDay(20);
  };

  const weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const legend = [
    { c: '#16A34A', label: 'Activity' },
    { c: '#2563EB', label: 'Test' },
    { c: '#DC2626', label: 'Deadline' }
  ];

  const selectedEvents = calSelectedDay ? getEvents(calSelectedDay) : [];
  const eventTypeLabel = {
    activity: { bg: '#DCFCE7', color: '#16A34A', label: 'Activity' },
    test:     { bg: '#EFF6FF', color: '#2563EB', label: 'Test' },
    deadline: { bg: '#FEF2F2', color: '#DC2626', label: 'Deadline' }
  };

  return (
    <div style={{
      flex: 1, overflow: 'hidden', display: 'flex', gap: 0
    }}>
      {/* Left — calendar */}
      <div
        className="inner-scroll"
        style={{ flex: 1, overflowY: 'auto', padding: 24, minHeight: 0 }}
      >
        {/* Header row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 20
        }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#1A1A2E' }}>
            {window.monthNames[calMonth]} {calYear}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={prevMonth}
              style={{
                width: 32, height: 32, borderRadius: 8,
                border: '1px solid #EEE8E3',
                background: 'white', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
              aria-label="Previous month"
            ><ChevronLeft size={16} color="#4A4A68" /></button>
            <button
              onClick={today}
              style={{
                height: 32, padding: '0 12px', borderRadius: 8,
                border: '1px solid #EEE8E3',
                background: 'white', cursor: 'pointer',
                fontSize: 12, fontWeight: 600, color: '#4A4A68',
                fontFamily: "'Poppins', sans-serif"
              }}
            >Today</button>
            <button
              onClick={nextMonth}
              style={{
                width: 32, height: 32, borderRadius: 8,
                border: '1px solid #EEE8E3',
                background: 'white', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
              aria-label="Next month"
            ><ChevronRight size={16} color="#4A4A68" /></button>
          </div>
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16
        }}>
          {legend.map(l => (
            <div key={l.label} style={{
              display: 'flex', gap: 6, alignItems: 'center'
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%', background: l.c
              }} />
              <span style={{ fontSize: 12, color: '#6B6B8A' }}>{l.label}</span>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          background: 'white', border: '1px solid #EEE8E3',
          borderRadius: 16, overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(26,26,46,0.06)'
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)'
          }}>
            {weekdays.map(w => (
              <div key={w} style={{
                height: 40, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 600, color: '#9898B0',
                textTransform: 'uppercase', letterSpacing: '0.6px',
                borderBottom: '1px solid #EEE8E3',
                background: '#FDF8F4'
              }}>{w}</div>
            ))}
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)'
          }}>
            {Array(firstDay).fill(null).map((_, i) => (
              <div key={'empty-' + i} style={{
                minHeight: 80,
                borderRight: '1px solid #F5F0EB',
                borderBottom: '1px solid #F5F0EB'
              }} />
            ))}
            {Array(days).fill(null).map((_, i) => {
              const day = i + 1;
              const events = getEvents(day);
              const isToday = day === 20 && calMonth === 4 && calYear === 2025;
              const isSelected = day === calSelectedDay;
              return (
                <CalendarDayCell
                  key={day}
                  day={day}
                  events={events}
                  isToday={isToday}
                  isSelected={isSelected}
                  onSelect={setCalSelectedDay}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <div
        className="inner-scroll"
        style={{
          width: 320, flexShrink: 0, padding: 20,
          overflowY: 'auto', minHeight: 0,
          background: 'white', borderLeft: '1px solid #EEE8E3',
          display: 'flex', flexDirection: 'column', gap: 16
        }}
      >
        {calSelectedDay && (
          <>
            <div>
              <div style={{
                fontSize: 15, fontWeight: 600, color: '#1A1A2E',
                marginBottom: 12
              }}>
                {window.monthNames[calMonth]} {calSelectedDay}, {calYear}
              </div>
              {selectedEvents.length === 0 ? (
                <div style={{
                  textAlign: 'center', padding: '32px 0',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 4
                }}>
                  {React.createElement(window.LucideIcons.Clock, {
                    size: 32, color: '#EEE8E3'
                  })}
                  <div style={{
                    marginTop: 8,
                    fontSize: 13, fontWeight: 500, color: '#9898B0'
                  }}>No events on this day</div>
                  <div style={{ fontSize: 12, color: '#9898B0' }}>
                    Enjoy the free time! 🌟
                  </div>
                </div>
              ) : (
                <div>
                  {selectedEvents.map((ev, i) => {
                    const t = eventTypeLabel[ev.type] || eventTypeLabel.activity;
                    return (
                      <div key={i} style={{
                        display: 'flex', gap: 12, alignItems: 'center',
                        padding: '12px 14px', borderRadius: 12,
                        background: ev.color + '12',
                        border: `1px solid ${ev.color}30`,
                        marginBottom: 8
                      }}>
                        <span style={{
                          width: 10, height: 10, borderRadius: '50%',
                          background: ev.color, flexShrink: 0
                        }} />
                        <div>
                          <div style={{
                            fontSize: 13, fontWeight: 600, color: '#1A1A2E'
                          }}>{ev.label}</div>
                          <div style={{
                            fontSize: 11, fontWeight: 600,
                            borderRadius: 9999, padding: '2px 8px',
                            marginTop: 3, display: 'inline-block',
                            background: t.bg, color: t.color,
                            fontFamily: "'Poppins', sans-serif"
                          }}>{t.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div style={{ height: 1, background: '#EEE8E3' }} />
          </>
        )}

        {/* Upcoming Events */}
        <div>
          <div style={{
            fontSize: 13, fontWeight: 600, color: '#1A1A2E',
            display: 'flex', gap: 8, alignItems: 'center',
            marginBottom: 12
          }}>
            <CalIcon size={14} color="#BD1313" />
            Upcoming Events
          </div>
          {window.upcomingEvents.map(event => (
            <div key={event.id} style={{
              display: 'flex', gap: 10, alignItems: 'center',
              padding: '10px 12px', borderRadius: 10,
              background: event.bg,
              border: `1px solid ${event.color}22`,
              marginBottom: 8, cursor: 'pointer'
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: 'white',
                border: `1px solid ${event.color}33`,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                <span style={{
                  fontSize: 14, fontWeight: 700, color: event.color,
                  lineHeight: 1
                }}>{event.daysLeft}</span>
                <span style={{
                  fontSize: 9, color: event.color, opacity: 0.8
                }}>days</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 12, fontWeight: 600, color: '#1A1A2E',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>{event.title}</div>
                <div style={{ fontSize: 11, color: '#9898B0', marginTop: 2 }}>
                  {event.date} · {event.time}
                </div>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 600,
                borderRadius: 9999, padding: '2px 8px',
                background: event.type === 'test' ? '#EFF6FF' : '#FEF2F2',
                color: event.type === 'test' ? '#2563EB' : '#DC2626',
                border: event.type === 'test' ? '1px solid #BFDBFE' : '1px solid #FECACA',
                fontFamily: "'Poppins', sans-serif"
              }}>
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </span>
            </div>
          ))}
        </div>

        {/* Weekly Activity */}
        <div style={{
          background: 'white', border: '1px solid #EEE8E3',
          borderRadius: 16, padding: 16, marginTop: 'auto'
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 12
          }}>
            <div style={{
              display: 'flex', gap: 8, alignItems: 'center',
              fontSize: 13, fontWeight: 600, color: '#1A1A2E'
            }}>
              <Zap size={14} color="#E8620A" />
              This Week
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#BD1313' }}>
              12 day streak 🔥
            </div>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between'
          }}>
            {window.activityStreak.map((d, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 4
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: d.active ? '#BD1313' : '#EEE8E3',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {d.active && <Check size={12} color="white" />}
                </div>
                <div style={{
                  fontSize: 10, fontWeight: 500,
                  color: d.active ? '#BD1313' : '#9898B0'
                }}>{d.day}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CalendarScreen });
