// Lucide-style icons as React components
const Icon = ({ d, size = 16, color = 'currentColor', strokeWidth = 2, style, paths }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
       strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {paths ? paths.map((p, i) => <path key={i} {...p} />) : <path d={d} />}
  </svg>
);

const LayoutDashboard = (p) => (
  <Icon {...p} paths={[
    { d: 'M3 3h7v9H3z' }, { d: 'M14 3h7v5h-7z' },
    { d: 'M14 12h7v9h-7z' }, { d: 'M3 16h7v5H3z' }
  ]} />
);
const Activity = (p) => <Icon {...p} d="M22 12h-4l-3 9L9 3l-3 9H2" />;
const ClipboardList = (p) => (
  <Icon {...p} paths={[
    { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' },
    { d: 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z' },
    { d: 'M12 11h4' }, { d: 'M12 16h4' }, { d: 'M8 11h.01' }, { d: 'M8 16h.01' }
  ]} />
);
const CalendarOff = (p) => (
  <Icon {...p} paths={[
    { d: 'M4.18 4.18A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.83-1.18' },
    { d: 'M21 15.5V6a2 2 0 0 0-2-2H9.5' },
    { d: 'M16 2v4' }, { d: 'M3 10h7' }, { d: 'M21 10h-5.5' },
    { d: 'M2 2l20 20' }
  ]} />
);
const AlertTriangle = (p) => (
  <Icon {...p} paths={[
    { d: 'M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' },
    { d: 'M12 9v4' }, { d: 'M12 17h.01' }
  ]} />
);
const Network = (p) => (
  <Icon {...p} paths={[
    { d: 'M9 2h6v6H9z' }, { d: 'M3 16h6v6H3z' }, { d: 'M15 16h6v6h-6z' },
    { d: 'M6 16v-3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3' }, { d: 'M12 12V8' }
  ]} />
);
const MapPin = (p) => (
  <Icon {...p} paths={[
    { d: 'M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0z' },
    { d: 'M12 10a2 2 0 1 0 0 .01' }
  ]} />
);
const Briefcase = (p) => (
  <Icon {...p} paths={[
    { d: 'M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z' },
    { d: 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' }
  ]} />
);
const TrendingUp = (p) => (
  <Icon {...p} paths={[
    { d: 'M22 7L13.5 15.5l-5-5L2 17' }, { d: 'M16 7h6v6' }
  ]} />
);
const Download = (p) => (
  <Icon {...p} paths={[
    { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' },
    { d: 'M7 10l5 5 5-5' }, { d: 'M12 15V3' }
  ]} />
);
const Lock = (p) => (
  <Icon {...p} paths={[
    { d: 'M5 11h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z' },
    { d: 'M7 11V7a5 5 0 0 1 10 0v4' }
  ]} />
);
const Settings = (p) => (
  <Icon {...p} paths={[
    { d: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' },
    { d: 'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' }
  ]} />
);
const Bell = (p) => (
  <Icon {...p} paths={[
    { d: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9' },
    { d: 'M10.3 21a1.94 1.94 0 0 0 3.4 0' }
  ]} />
);
const ChevronRight = (p) => <Icon {...p} d="M9 18l6-6-6-6" />;
const X = (p) => (
  <Icon {...p} paths={[{ d: 'M18 6L6 18' }, { d: 'M6 6l12 12' }]} />
);
const Calendar = (p) => (
  <Icon {...p} paths={[
    { d: 'M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z' },
    { d: 'M16 2v4' }, { d: 'M8 2v4' }, { d: 'M3 10h18' }
  ]} />
);
const ChevronDown = (p) => <Icon {...p} d="M6 9l6 6 6-6" />;
const ChevronLeft = (p) => <Icon {...p} d="M15 18l-6-6 6-6" />;
const MessageSquare = (p) => <Icon {...p} d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />;
const ExternalLink = (p) => (
  <Icon {...p} paths={[
    { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' },
    { d: 'M15 3h6v6' }, { d: 'M10 14L21 3' }
  ]} />
);
const Users = (p) => (
  <Icon {...p} paths={[
    { d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' },
    { d: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
    { d: 'M23 21v-2a4 4 0 0 0-3-3.87' },
    { d: 'M16 3.13a4 4 0 0 1 0 7.75' }
  ]} />
);
const ArrowRight = (p) => (
  <Icon {...p} paths={[{ d: 'M5 12h14' }, { d: 'M12 5l7 7-7 7' }]} />
);

Object.assign(window, {
  Icon, LayoutDashboard, Activity, ClipboardList, CalendarOff, AlertTriangle,
  Network, MapPin, Briefcase, TrendingUp, Download, Lock, Settings, Bell,
  ChevronRight, X, Calendar, ChevronDown, ChevronLeft,
  MessageSquare, ExternalLink, Users, ArrowRight
});
