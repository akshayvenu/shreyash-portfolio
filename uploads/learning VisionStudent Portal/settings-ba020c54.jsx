// ============================================================
// STEP 5 — SETTINGS SCREEN
// ============================================================
const { useState: useStateST } = React;

// ---------- Reusable toggle ----------
function SettingsToggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      style={{
        width: 44, height: 24, borderRadius: 9999,
        position: 'relative', cursor: 'pointer',
        transition: 'background 0.2s',
        border: 'none', padding: 0,
        background: on ? '#BD1313' : '#EEE8E3'
      }}
      aria-pressed={on}
    >
      <div style={{
        width: 18, height: 18, borderRadius: '50%',
        background: 'white',
        position: 'absolute', top: 3,
        left: on ? 'calc(100% - 21px)' : 3,
        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        transition: 'all 0.2s'
      }} />
    </button>
  );
}

// ---------- Toggle row (label + sub + toggle) ----------
function ToggleRow({ label, sub, on, onChange, last }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', padding: '14px 0',
      borderBottom: last ? 'none' : '1px solid #F5F0EB'
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#1A1A2E' }}>
          {label}
        </div>
        {sub && (
          <div style={{ fontSize: 12, color: '#9898B0', marginTop: 2 }}>
            {sub}
          </div>
        )}
      </div>
      <SettingsToggle on={on} onChange={onChange} />
    </div>
  );
}

// ---------- Section header ----------
function SectionHeader({ icon, iconBg, title, subtitle }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      marginBottom: 24
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A2E' }}>
          {title}
        </div>
        <div style={{ fontSize: 12, color: '#9898B0' }}>
          {subtitle}
        </div>
      </div>
    </div>
  );
}

// ---------- Tab: Account ----------
function AccountTab({ settingsForm, showToast }) {
  const { User } = window.LucideIcons;
  const fields = [
    { label: 'FULL NAME',     value: settingsForm.name },
    { label: 'EMAIL ADDRESS', value: settingsForm.email },
    { label: 'PHONE',         value: settingsForm.phone },
    { label: 'DEPARTMENT',    value: settingsForm.dept },
    { label: 'DESIGNATION',   value: settingsForm.designation },
    { label: 'EMPLOYEE ID',   value: settingsForm.employeeId, readOnly: true }
  ];
  return (
    <div>
      <SectionHeader
        icon={<User size={16} color="#2563EB" />}
        iconBg="#EFF6FF"
        title="Account Settings"
        subtitle="Manage your personal information"
      />

      {/* Personal info */}
      <div style={{
        background: 'white', border: '1px solid #EEE8E3',
        borderRadius: 16, overflow: 'hidden', marginBottom: 20
      }}>
        <div style={{
          padding: '16px 20px', background: '#FDF8F4',
          borderBottom: '1px solid #EEE8E3',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>
            Personal Information
          </div>
          <button
            onClick={() => setTimeout(() => showToast('Edit mode coming soon!', 'info'), 0)}
            style={{
              color: '#BD1313', fontSize: 12, fontWeight: 500,
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif"
            }}
          >Edit</button>
        </div>
        <div style={{
          padding: 20,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16
        }}>
          {fields.map(f => (
            <div key={f.label}>
              <div style={{
                fontSize: 11, fontWeight: 600, color: '#6B6B8A',
                textTransform: 'uppercase', letterSpacing: '0.6px',
                marginBottom: 6
              }}>{f.label}</div>
              <input
                value={f.value}
                readOnly
                style={{
                  height: 44, padding: '0 14px',
                  background: f.readOnly ? '#F5F0EB' : '#FDF8F4',
                  border: '1.5px solid #EEE8E3',
                  borderRadius: 10,
                  fontSize: 14, color: '#1A1A2E',
                  width: '100%',
                  fontFamily: "'Poppins', sans-serif",
                  cursor: 'default', outline: 'none'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div style={{
        background: 'white', border: '1px solid #EEE8E3',
        borderRadius: 16, overflow: 'hidden', marginBottom: 20
      }}>
        <div style={{
          padding: '16px 20px', background: '#FDF8F4',
          borderBottom: '1px solid #EEE8E3'
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>
            Preferences
          </div>
        </div>
        <div style={{
          padding: 20,
          display: 'flex', flexDirection: 'column', gap: 0
        }}>
          {[
            { label: 'Language',    sub: 'Preferred display language', opts: ['English', 'Hindi', 'Tamil', 'Telugu', 'Marathi'] },
            { label: 'Timezone',    sub: 'Your local timezone',        opts: ['Asia/Kolkata (IST)', 'UTC', 'America/New_York'] },
            { label: 'Date Format', sub: 'How dates appear',           opts: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'] }
          ].map((row, i, arr) => (
            <div key={row.label} style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '12px 0',
              borderBottom: i === arr.length - 1 ? 'none' : '1px solid #F5F0EB'
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#1A1A2E' }}>
                  {row.label}
                </div>
                <div style={{ fontSize: 12, color: '#9898B0', marginTop: 2 }}>
                  {row.sub}
                </div>
              </div>
              <select
                defaultValue={row.opts[0]}
                style={{
                  height: 36, padding: '0 12px',
                  background: '#FDF8F4', border: '1px solid #EEE8E3',
                  borderRadius: 8, fontSize: 13, color: '#1A1A2E',
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif", outline: 'none'
                }}
              >
                {row.opts.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div style={{
        background: '#FFF1F2', border: '1px solid #FECACA',
        borderRadius: 16, padding: 20
      }}>
        <div style={{
          fontSize: 14, fontWeight: 600, color: '#DC2626', marginBottom: 12
        }}>Danger Zone</div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', gap: 16
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#1A1A2E' }}>
              Deactivate Account
            </div>
            <div style={{ fontSize: 12, color: '#9898B0', marginTop: 2 }}>
              Permanently remove your account and data.
            </div>
          </div>
          <button
            onClick={() => setTimeout(() => showToast('Account deactivation requires admin approval', 'info'), 0)}
            style={{
              background: 'transparent',
              border: '1.5px solid #DC2626',
              color: '#DC2626', height: 36, padding: '0 16px',
              borderRadius: 8, cursor: 'pointer',
              fontSize: 12, fontWeight: 600,
              fontFamily: "'Poppins', sans-serif", flexShrink: 0
            }}
          >Deactivate</button>
        </div>
      </div>
    </div>
  );
}

// ---------- Tab: Notifications ----------
function NotificationsTab({ settingsNotifs, setSettingsNotifs }) {
  const { Bell } = window.LucideIcons;
  const toggle = (k) => setSettingsNotifs(prev => ({ ...prev, [k]: !prev[k] }));
  const inApp = [
    { key: 'testReminders',  label: 'Test Reminders',         sub: 'Get notified when a new test is available' },
    { key: 'deadlineAlerts', label: 'Deadline Alerts',        sub: 'Reminders before batch or test deadlines' },
    { key: 'contentUpdates', label: 'Content Updates',        sub: 'When new lessons are added to your batch' },
    { key: 'weeklyReport',   label: 'Weekly Learning Report', sub: 'Summary of your learning activity each week' }
  ];
  const channels = [
    { key: 'emailNotifs', label: 'Email Notifications', sub: 'Receive notifications to your email' },
    { key: 'pushNotifs',  label: 'Push Notifications',  sub: 'Browser push notifications' }
  ];
  return (
    <div>
      <SectionHeader
        icon={<Bell size={16} color="#D97706" />}
        iconBg="#FFFBEB"
        title="Notification Settings"
        subtitle="Choose what you want to be notified about"
      />
      <div style={{
        background: 'white', border: '1px solid #EEE8E3',
        borderRadius: 16, padding: 20, marginBottom: 20
      }}>
        <div style={{
          fontSize: 14, fontWeight: 600, color: '#1A1A2E', marginBottom: 8
        }}>In-App Notifications</div>
        {inApp.map((r, i) => (
          <ToggleRow
            key={r.key}
            label={r.label} sub={r.sub}
            on={settingsNotifs[r.key]}
            onChange={() => toggle(r.key)}
            last={i === inApp.length - 1}
          />
        ))}
      </div>
      <div style={{
        background: 'white', border: '1px solid #EEE8E3',
        borderRadius: 16, padding: 20
      }}>
        <div style={{
          fontSize: 14, fontWeight: 600, color: '#1A1A2E', marginBottom: 8
        }}>Delivery Channels</div>
        {channels.map((r, i) => (
          <ToggleRow
            key={r.key}
            label={r.label} sub={r.sub}
            on={settingsNotifs[r.key]}
            onChange={() => toggle(r.key)}
            last={i === channels.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- Theme + size preview cards ----------
function ThemeOption({ themeKey, label, selected, onPick }) {
  const { CheckCircle } = window.LucideIcons;
  const [hover, setHover] = useStateST(false);
  let preview;
  if (themeKey === 'light') {
    preview = (
      <div style={{
        height: 60, borderRadius: 8, marginBottom: 10,
        overflow: 'hidden', position: 'relative',
        background: '#FDF8F4', border: '1px solid #EEE8E3'
      }}>
        <div style={{ height: 12, background: 'white', borderBottom: '1px solid #EEE8E3' }} />
        <div style={{ position: 'absolute', left: 0, top: 12, width: 16, bottom: 0, background: 'white', borderRight: '1px solid #EEE8E3' }} />
      </div>
    );
  } else if (themeKey === 'dark') {
    preview = (
      <div style={{
        height: 60, borderRadius: 8, marginBottom: 10,
        overflow: 'hidden', position: 'relative',
        background: '#1A1A2E'
      }}>
        <div style={{ height: 12, background: '#12121E' }} />
        <div style={{ position: 'absolute', left: 0, top: 12, width: 16, bottom: 0, background: '#12121E' }} />
      </div>
    );
  } else {
    preview = (
      <div style={{
        height: 60, borderRadius: 8, marginBottom: 10,
        background: 'linear-gradient(to right, #FDF8F4 50%, #1A1A2E 50%)'
      }} />
    );
  }
  return (
    <div
      onClick={onPick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: 16, borderRadius: 12, cursor: 'pointer',
        border: `2px solid ${selected ? '#BD1313' : '#EEE8E3'}`,
        background: selected ? '#FDF2F2' : (hover ? '#FFFCFA' : 'white'),
        transition: 'all 0.15s',
        textAlign: 'center', position: 'relative'
      }}
    >
      {selected && (
        <div style={{ position: 'absolute', top: 6, right: 6 }}>
          <CheckCircle size={16} color="#BD1313" />
        </div>
      )}
      {preview}
      <div style={{
        fontSize: 13,
        fontWeight: selected ? 600 : 500,
        color: selected ? '#BD1313' : '#4A4A68'
      }}>{label}</div>
    </div>
  );
}

function FontSizeOption({ sizeKey, label, sample, selected, onPick }) {
  const { CheckCircle } = window.LucideIcons;
  const [hover, setHover] = useStateST(false);
  return (
    <div
      onClick={onPick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: 16, borderRadius: 12, cursor: 'pointer',
        border: `2px solid ${selected ? '#BD1313' : '#EEE8E3'}`,
        background: selected ? '#FDF2F2' : (hover ? '#FFFCFA' : 'white'),
        transition: 'all 0.15s',
        textAlign: 'center', position: 'relative'
      }}
    >
      {selected && (
        <div style={{ position: 'absolute', top: 6, right: 6 }}>
          <CheckCircle size={16} color="#BD1313" />
        </div>
      )}
      <div style={{
        height: 60, borderRadius: 8, marginBottom: 10,
        background: '#FDF8F4', border: '1px solid #EEE8E3',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <span style={{ fontSize: sample, color: '#1A1A2E', fontWeight: 500 }}>Aa</span>
      </div>
      <div style={{
        fontSize: 13,
        fontWeight: selected ? 600 : 500,
        color: selected ? '#BD1313' : '#4A4A68'
      }}>{label}</div>
    </div>
  );
}

// ---------- Tab: Appearance ----------
function AppearanceTab({ settingsAppearance, setSettingsAppearance, showToast }) {
  const { Monitor } = window.LucideIcons;
  const setKey = (k, v) => {
    setSettingsAppearance(prev => ({ ...prev, [k]: v }));
    setTimeout(() => showToast('Setting saved!', 'success'), 0);
  };
  return (
    <div>
      <SectionHeader
        icon={<Monitor size={16} color="#2563EB" />}
        iconBg="#F0F8FF"
        title="Appearance"
        subtitle="Customize how LearningVision looks"
      />

      <div style={{
        background: 'white', border: '1px solid #EEE8E3',
        borderRadius: 16, padding: 20, marginBottom: 20
      }}>
        <div style={{
          fontSize: 14, fontWeight: 600, color: '#1A1A2E', marginBottom: 16
        }}>Theme</div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12
        }}>
          {[
            { key: 'light',  label: 'Light' },
            { key: 'dark',   label: 'Dark' },
            { key: 'system', label: 'System' }
          ].map(t => (
            <ThemeOption
              key={t.key} themeKey={t.key} label={t.label}
              selected={settingsAppearance.theme === t.key}
              onPick={() => setKey('theme', t.key)}
            />
          ))}
        </div>
      </div>

      <div style={{
        background: 'white', border: '1px solid #EEE8E3',
        borderRadius: 16, padding: 20, marginBottom: 20
      }}>
        <div style={{
          fontSize: 14, fontWeight: 600, color: '#1A1A2E', marginBottom: 16
        }}>Text Size</div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12
        }}>
          {[
            { key: 'small',  label: 'Small',  sample: 12 },
            { key: 'medium', label: 'Medium', sample: 16 },
            { key: 'large',  label: 'Large',  sample: 22 }
          ].map(f => (
            <FontSizeOption
              key={f.key} sizeKey={f.key} label={f.label} sample={f.sample}
              selected={settingsAppearance.fontSize === f.key}
              onPick={() => setKey('fontSize', f.key)}
            />
          ))}
        </div>
      </div>

      <div style={{
        background: 'white', border: '1px solid #EEE8E3',
        borderRadius: 16, padding: 20,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#1A1A2E' }}>
            Compact Mode
          </div>
          <div style={{ fontSize: 12, color: '#9898B0', marginTop: 2 }}>
            Reduce spacing for more content on screen
          </div>
        </div>
        <SettingsToggle
          on={settingsAppearance.compactMode}
          onChange={() => setKey('compactMode', !settingsAppearance.compactMode)}
        />
      </div>
    </div>
  );
}

// ---------- Tab: Privacy ----------
function PrivacyTab({ settingsPrivacy, setSettingsPrivacy, showToast }) {
  const { Shield } = window.LucideIcons;
  const toggle = (k) => setSettingsPrivacy(prev => ({ ...prev, [k]: !prev[k] }));
  const visibility = [
    { key: 'showProgress',   label: 'Share Progress',  sub: 'Allow supervisors to see your learning progress' },
    { key: 'showActivity',   label: 'Share Activity',  sub: 'Show your recent activity to batch members' },
    { key: 'allowAnalytics', label: 'Usage Analytics', sub: 'Help improve LearningVision with anonymous data' }
  ];
  return (
    <div>
      <SectionHeader
        icon={<Shield size={16} color="#16A34A" />}
        iconBg="#F0FDF4"
        title="Privacy & Security"
        subtitle="Control your data and visibility"
      />
      <div style={{
        background: 'white', border: '1px solid #EEE8E3',
        borderRadius: 16, padding: 20, marginBottom: 20
      }}>
        <div style={{
          fontSize: 14, fontWeight: 600, color: '#1A1A2E', marginBottom: 8
        }}>Visibility Settings</div>
        {visibility.map((r, i) => (
          <ToggleRow
            key={r.key}
            label={r.label} sub={r.sub}
            on={settingsPrivacy[r.key]}
            onChange={() => toggle(r.key)}
            last={i === visibility.length - 1}
          />
        ))}
      </div>
      <div style={{
        background: 'white', border: '1px solid #EEE8E3',
        borderRadius: 16, padding: 20
      }}>
        <div style={{
          fontSize: 14, fontWeight: 600, color: '#1A1A2E', marginBottom: 8
        }}>Password & Security</div>
        {[
          { title: 'Password', sub: 'Last changed 45 days ago', btn: 'Change Password', toast: 'Password change coming soon!' },
          { title: 'Two-Factor Authentication', sub: 'Add an extra layer of security', btn: 'Enable 2FA', toast: '2FA setup coming soon!' }
        ].map((row, i, arr) => (
          <div key={row.title} style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', padding: '12px 0',
            borderBottom: i === arr.length - 1 ? 'none' : '1px solid #F5F0EB'
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#1A1A2E' }}>
                {row.title}
              </div>
              <div style={{ fontSize: 12, color: '#9898B0', marginTop: 2 }}>
                {row.sub}
              </div>
            </div>
            <button
              onClick={() => setTimeout(() => showToast(row.toast, 'info'), 0)}
              style={{
                background: '#FDF8F4', border: '1px solid #EEE8E3',
                color: '#4A4A68', height: 36, padding: '0 14px',
                borderRadius: 8, cursor: 'pointer',
                fontSize: 12, fontWeight: 600,
                fontFamily: "'Poppins', sans-serif"
              }}
            >{row.btn}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Tab: Help ----------
function HelpTab({ showToast }) {
  const { HelpCircle, BookOpen, Mail, Video, FileText, Phone, ChevronRight } = window.LucideIcons;
  const links = [
    { label: 'Getting Started Guide', icon: <BookOpen size={16} color="#2563EB" />,   bg: '#EFF6FF' },
    { label: 'FAQs',                  icon: <HelpCircle size={16} color="#D97706" />, bg: '#FFFBEB' },
    { label: 'Contact Support',       icon: <Mail size={16} color="#16A34A" />,       bg: '#F0FDF4' },
    { label: 'Video Tutorials',       icon: <Video size={16} color="#7C3AED" />,      bg: '#FAF5FF' },
    { label: 'Release Notes',         icon: <FileText size={16} color="#BD1313" />,   bg: '#FDF2F2' }
  ];
  return (
    <div>
      <SectionHeader
        icon={<HelpCircle size={16} color="#7C3AED" />}
        iconBg="#FAF5FF"
        title="Help & Support"
        subtitle="Find answers and get in touch"
      />
      <div style={{
        background: 'white', border: '1px solid #EEE8E3',
        borderRadius: 16, overflow: 'hidden', marginBottom: 20
      }}>
        {links.map((l, i, arr) => (
          <HelpLinkRow key={l.label} link={l} last={i === arr.length - 1} showToast={showToast} />
        ))}
      </div>

      <div style={{
        background: 'white', border: '1px solid #EEE8E3',
        borderRadius: 16, padding: 20
      }}>
        <div style={{
          fontSize: 14, fontWeight: 600, color: '#1A1A2E', marginBottom: 16
        }}>Contact Us</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { label: 'Email Support', value: 'info@aivision21.co', bg: '#F0FDF4',
              icon: <Mail size={16} color="#16A34A" /> },
            { label: 'Phone',         value: '+91 93724 88391',     bg: '#EFF6FF',
              icon: <Phone size={16} color="#2563EB" /> }
          ].map(r => (
            <div key={r.label} style={{
              display: 'flex', gap: 12, alignItems: 'center',
              padding: '12px 16px', borderRadius: 12,
              background: '#FDF8F4'
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: r.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>{r.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A2E' }}>
                  {r.label}
                </div>
                <div style={{ fontSize: 12, color: '#9898B0', marginTop: 2 }}>
                  {r.value}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{
          textAlign: 'center', fontSize: 12, color: '#9898B0', marginTop: 16
        }}>LearningVision v1.0 · © 2025 AIVision21</div>
      </div>
    </div>
  );
}

function HelpLinkRow({ link, last, showToast }) {
  const { ChevronRight } = window.LucideIcons;
  const [hover, setHover] = useStateST(false);
  return (
    <div
      onClick={() => setTimeout(() => showToast('Opening ' + link.label + '...', 'info'), 0)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 20px',
        borderBottom: last ? 'none' : '1px solid #F5F0EB',
        cursor: 'pointer', transition: 'background 0.15s',
        background: hover ? '#FFFCFA' : 'white'
      }}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: link.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>{link.icon}</div>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#1A1A2E' }}>
          {link.label}
        </div>
      </div>
      <ChevronRight size={16} color="#9898B0" />
    </div>
  );
}

// ---------- Settings nav item ----------
function SettingsNavItem({ item, active, onPick }) {
  const [hover, setHover] = useStateST(false);
  const Icon = item.icon;
  return (
    <button
      onClick={onPick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', gap: 10, alignItems: 'center',
        padding: '10px 12px',
        borderRadius: active ? '0 10px 10px 0' : 10,
        cursor: 'pointer', transition: 'all 0.15s',
        border: 'none', width: '100%', textAlign: 'left',
        background: active ? '#FDF2F2' : (hover ? '#FDF8F4' : 'transparent'),
        borderLeft: active ? '3px solid #BD1313' : '3px solid transparent',
        fontFamily: "'Poppins', sans-serif"
      }}
    >
      <Icon size={18} color={active ? '#BD1313' : '#9898B0'} />
      <span style={{
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        color: active ? '#BD1313' : '#4A4A68'
      }}>{item.label}</span>
    </button>
  );
}

// ---------- Main settings ----------
function SettingsScreen(props) {
  const {
    settingsTab, setSettingsTab,
    settingsForm,
    settingsNotifs, setSettingsNotifs,
    settingsAppearance, setSettingsAppearance,
    settingsPrivacy, setSettingsPrivacy,
    showToast
  } = props;
  const { User, Bell, Monitor, Shield, HelpCircle } = window.LucideIcons;

  const navItems = [
    { key: 'account',       label: 'Account',        icon: User },
    { key: 'notifications', label: 'Notifications',  icon: Bell },
    { key: 'appearance',    label: 'Appearance',     icon: Monitor },
    { key: 'privacy',       label: 'Privacy',        icon: Shield },
    { key: 'help',          label: 'Help & Support', icon: HelpCircle }
  ];

  return (
    <div style={{
      flex: 1, overflow: 'hidden', display: 'flex'
    }}>
      {/* Left nav */}
      <div style={{
        width: 220, flexShrink: 0,
        background: 'white',
        borderRight: '1px solid #EEE8E3',
        padding: '16px 12px',
        display: 'flex', flexDirection: 'column', gap: 4
      }}>
        <div style={{
          fontSize: 11, fontWeight: 600, color: '#9898B0',
          textTransform: 'uppercase', letterSpacing: '0.8px',
          padding: '0 8px', marginBottom: 8
        }}>Settings</div>
        {navItems.map(item => (
          <SettingsNavItem
            key={item.key}
            item={item}
            active={settingsTab === item.key}
            onPick={() => setSettingsTab(item.key)}
          />
        ))}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ height: 1, background: '#EEE8E3', marginBottom: 12 }} />
          <div style={{
            fontSize: 11, color: '#9898B0', padding: '0 8px', lineHeight: 1.6
          }}>
            LearningVision v1.0<br />
            © 2025 AIVision21
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className="inner-scroll"
        style={{ flex: 1, overflowY: 'auto', padding: 24, minHeight: 0 }}
      >
        {settingsTab === 'account' && (
          <AccountTab settingsForm={settingsForm} showToast={showToast} />
        )}
        {settingsTab === 'notifications' && (
          <NotificationsTab
            settingsNotifs={settingsNotifs}
            setSettingsNotifs={setSettingsNotifs}
          />
        )}
        {settingsTab === 'appearance' && (
          <AppearanceTab
            settingsAppearance={settingsAppearance}
            setSettingsAppearance={setSettingsAppearance}
            showToast={showToast}
          />
        )}
        {settingsTab === 'privacy' && (
          <PrivacyTab
            settingsPrivacy={settingsPrivacy}
            setSettingsPrivacy={setSettingsPrivacy}
            showToast={showToast}
          />
        )}
        {settingsTab === 'help' && <HelpTab showToast={showToast} />}
      </div>
    </div>
  );
}

Object.assign(window, { SettingsScreen });
