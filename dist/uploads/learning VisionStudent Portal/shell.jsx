// ============================================================
// SIDEBAR
// ============================================================
const { useState: useStateSB } = React;

function NavButton({ item, screen, setScreen, badge }) {
  const [hover, setHover] = useStateSB(false);
  const activeScreen = window.getActiveNavItem
    ? window.getActiveNavItem(screen)
    : screen;
  const active = activeScreen === item.screen;
  const badgeText = badge > 9 ? '9+' : String(badge);
  return (
    <div style={{
      position: 'relative', margin: '3px 0',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {active && (
        <span style={{
          position: 'absolute', left: 0, top: 8, bottom: 8,
          width: 3, borderRadius: '0 3px 3px 0',
          background: '#BD1313'
        }} />
      )}
      <button
        onClick={() => setScreen(item.screen)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: 44, height: 44, borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', border: 'none', position: 'relative',
          transition: 'all 0.2s',
          background: active ? '#FDF2F2' : (hover ? '#FDF8F4' : 'transparent'),
          boxShadow: active ? '0 2px 8px rgba(189,19,19,0.15)' : 'none',
          transform: hover && !active ? 'scale(1.08)' : 'scale(1)'
        }}
        aria-label={item.label}
      >
        <img
          src={item.icon}
          width={22}
          height={22}
          alt=""
          style={{
            background: 'transparent',
            opacity: active ? 1 : 0.6,
            filter: active ? 'none' : 'grayscale(30%)',
            flexShrink: 0
          }}
        />
        {badge > 0 && (
          <span style={{
            position: 'absolute', top: 2, right: 2,
            minWidth: 16, height: 16,
            padding: '0 4px',
            borderRadius: '50%',
            background: '#BD1313', color: 'white',
            fontSize: 9, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid white',
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1
          }}>{badgeText}</span>
        )}
        {item.aiBadge && (
          <span style={{
            position: 'absolute', top: 4, right: 4,
            width: 8, height: 8, borderRadius: '50%',
            background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
            border: '1px solid white'
          }} />
        )}
      </button>
      {hover && (
        <div style={{
          position: 'absolute', left: 56, top: '50%',
          transform: 'translateY(-50%)',
          background: '#1A1A2E', color: 'white',
          fontSize: 11, fontWeight: 600,
          fontFamily: "'Poppins', sans-serif",
          borderRadius: 8, padding: '6px 12px',
          whiteSpace: 'nowrap', zIndex: 9999,
          pointerEvents: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          letterSpacing: '0.2px',
          animation: 'tooltipEnter 150ms ease-out'
        }}>
          <div style={{
            position: 'absolute', left: -4, top: '50%',
            transform: 'translateY(-50%)',
            width: 0, height: 0,
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderRight: '4px solid #1A1A2E'
          }} />
          {item.label}
        </div>
      )}
    </div>
  );
}

function Sidebar({ screen, setScreen, unreadCount }) {
  return (
    <aside style={{
      position: 'fixed', left: 0, top: 0,
      width: 64, height: '100vh',
      background: 'white',
      borderRight: '1px solid #EEE8E3',
      boxShadow: '2px 0 8px rgba(26,26,46,0.06)',
      zIndex: 100,
      display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
      <div style={{ paddingTop: 16, marginBottom: 20 }}>
        <img
          src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png"
          height={28}
          alt="AIVision21"
          style={{
            filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.1))',
            background: 'transparent'
          }}
        />
      </div>

      {window.navItems.map(item => (
        <NavButton
          key={item.screen}
          item={item}
          screen={screen}
          setScreen={setScreen}
          badge={item.screen === 'notifications' ? unreadCount : 0}
        />
      ))}

      <div style={{
        marginTop: 'auto', paddingBottom: 16,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 8
      }}>
        <NavButton
          item={{
            label: 'Settings',
            screen: 'settings',
            icon: 'https://img.icons8.com/pulsar-color/48/settings.png'
          }}
          screen={screen}
          setScreen={setScreen}
          badge={0}
        />
        <img
          src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png"
          height={18}
          alt=""
          style={{ opacity: 0.4, background: 'transparent', marginTop: 4 }}
        />
        <div style={{ fontSize: 10, color: '#9898B0' }}>v1.0</div>
      </div>
    </aside>
  );
}

// ============================================================
// TOP BAR
// ============================================================
function TopBar({ screen, setScreen, unreadCount, selectedBatch, selectedTest }) {
  const { Search, Bell } = window.LucideIcons;
  const [bellHover, setBellHover] = useStateSB(false);
  const [searchFocused, setSearchFocused] = useStateSB(false);
  const bellBadgeText = unreadCount > 9 ? '9+' : String(unreadCount);

  let titleNode;
  if (screen === 'batch-detail' && selectedBatch) {
    titleNode = (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontFamily: "'Poppins', sans-serif"
      }}>
        <span
          onClick={() => setScreen('my-learning')}
          style={{
            fontSize: 14, color: '#9898B0', cursor: 'pointer'
          }}
        >My Learning</span>
        <span style={{ color: '#9898B0' }}>/</span>
        <span style={{
          fontSize: 14, fontWeight: 600, color: '#1A1A2E',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          maxWidth: 280
        }}>{selectedBatch.name}</span>
      </div>
    );
  } else if (screen === 'test-results' && selectedTest) {
    titleNode = (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontFamily: "'Poppins', sans-serif"
      }}>
        <span
          onClick={() => setScreen('tests')}
          style={{ fontSize: 14, color: '#9898B0', cursor: 'pointer' }}
        >Tests</span>
        <span style={{ color: '#9898B0' }}>/</span>
        <span style={{
          fontSize: 14, fontWeight: 600, color: '#1A1A2E',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          maxWidth: 320
        }}>{selectedTest.title}</span>
      </div>
    );
  } else {
    titleNode = (
      <div style={{
        fontSize: 16, fontWeight: 600,
        color: '#1A1A2E',
        fontFamily: "'Poppins', sans-serif"
      }}>
        {window.screenLabels[screen] || 'Dashboard'}
      </div>
    );
  }

  return (
    <header style={{
      marginLeft: 64,
      height: 56,
      background: 'white',
      borderBottom: '1px solid #EEE8E3',
      padding: '0 24px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky', top: 0,
      zIndex: 50, flexShrink: 0
    }}>
      {titleNode}

      <div style={{
        width: 320, height: 36,
        background: searchFocused ? 'white' : '#FDF8F4',
        border: searchFocused ? '1.5px solid #BD1313' : '1px solid #EEE8E3',
        boxShadow: searchFocused ? '0 0 0 3px rgba(189,19,19,0.08)' : 'none',
        borderRadius: 9999,
        display: 'flex', alignItems: 'center',
        padding: '0 14px', gap: 8,
        transition: 'all 0.2s'
      }}>
        <Search size={15} color={searchFocused ? '#BD1313' : '#9898B0'} />
        <input
          placeholder="Search courses, tests..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            flex: 1, border: 'none', outline: 'none',
            background: 'transparent',
            fontFamily: "'Poppins', sans-serif",
            fontSize: 13, color: '#1A1A2E'
          }}
        />
        {!searchFocused && (
          <span style={{
            background: '#EEE8E3', color: '#9898B0',
            fontSize: 11, fontWeight: 500,
            borderRadius: 4, padding: '2px 6px'
          }}>⌘K</span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => setScreen('notifications')}
          onMouseEnter={() => setBellHover(true)}
          onMouseLeave={() => setBellHover(false)}
          style={{
            width: 36, height: 36, borderRadius: 8,
            background: bellHover ? '#F7F0EA' : '#FDF8F4',
            border: '1px solid #EEE8E3',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', position: 'relative',
            transition: 'background 0.2s'
          }}
          aria-label="Notifications"
        >
          <Bell size={18} color="#4A4A68" />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute', top: -4, right: -4,
              minWidth: 16, height: 16, padding: '0 4px',
              borderRadius: '50%',
              background: '#BD1313', color: 'white',
              fontSize: 9, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid white',
              fontFamily: "'Poppins', sans-serif",
              lineHeight: 1
            }}>{bellBadgeText}</span>
          )}
        </button>

        <button
          onClick={() => setScreen('profile')}
          style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #BD1313, #7A0D0D)',
            color: 'white', fontSize: 13, fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', border: 'none'
          }}
          aria-label="Profile"
        >
          AS
        </button>

        <div style={{
          fontSize: 13, fontWeight: 500,
          color: '#4A4A68',
          fontFamily: "'Poppins', sans-serif"
        }}>
          Aarav Shah
        </div>
      </div>
    </header>
  );
}

Object.assign(window, { Sidebar, TopBar });
