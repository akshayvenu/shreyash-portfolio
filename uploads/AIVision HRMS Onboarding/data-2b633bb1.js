// Mock data
const HR_ADMIN = { name: 'Ravi Kumar', role: 'HR Manager', initials: 'RK', color: '#BD1313' };
const SUPER_HR = { name: 'Priya Sharma', role: 'Super HR Manager', initials: 'PS', color: '#7C3AED' };

const PEOPLE = [
  { id: 'AIV-2025-0142', name: 'Arjun Mehta', role: 'Senior Software Engineer', dept: 'Engineering', type: 'candidate', initials: 'AM', color: '#BD1313',
    offer: 'sent', kyc: { aadhar: 'verified', pan: 'pending', bank: 'not_started', dl: 'not_required' },
    approval: 'not_started', onboarded: 'not_started', updatedDate: '28 Apr 2025', updatedTime: '11:20 AM' },
  { id: 'AIV-2025-0138', name: 'Priyanka Nair', role: 'Product Manager', dept: 'Product', type: 'employee', initials: 'PN', color: '#7C3AED',
    offer: 'accepted', kyc: { aadhar: 'verified', pan: 'verified', bank: 'verified', dl: 'verified' },
    approval: 'approved', onboarded: 'completed', updatedDate: '27 Apr 2025', updatedTime: '3:45 PM' },
  { id: 'AIV-2025-0135', name: 'Rohit Gupta', role: 'Data Analyst', dept: 'Analytics', type: 'candidate', initials: 'RG', color: '#0369A1',
    offer: 'negotiated', kyc: { aadhar: 'verified', pan: 'not_started', bank: 'not_started', dl: 'not_started' },
    approval: 'not_started', onboarded: 'not_started', updatedDate: '26 Apr 2025', updatedTime: '9:10 AM' },
  { id: 'AIV-2025-0129', name: 'Sneha Kulkarni', role: 'UX Designer', dept: 'Design', type: 'employee', initials: 'SK', color: '#D97706',
    offer: 'accepted', kyc: { aadhar: 'verified', pan: 'verified', bank: 'pending', dl: 'not_started' },
    approval: 'pending', onboarded: 'not_started', updatedDate: '25 Apr 2025', updatedTime: '2:00 PM' },
  { id: 'AIV-2025-0127', name: 'Vikram Sinha', role: 'DevOps Engineer', dept: 'Infrastructure', type: 'candidate', initials: 'VS', color: '#059669',
    offer: 'rejected', kyc: { aadhar: 'not_started', pan: 'not_started', bank: 'not_started', dl: 'not_started' },
    approval: 'not_started', onboarded: 'not_started', updatedDate: '24 Apr 2025', updatedTime: '11:55 AM' },
  { id: 'AIV-2025-0121', name: 'Kavya Iyer', role: 'Frontend Engineer', dept: 'Engineering', type: 'employee', initials: 'KI', color: '#DC2626',
    offer: 'accepted', kyc: { aadhar: 'verified', pan: 'verified', bank: 'verified', dl: 'not_required' },
    approval: 'approved', onboarded: 'pending', updatedDate: '23 Apr 2025', updatedTime: '4:30 PM' },
  { id: 'AIV-2025-0118', name: 'Rahul Desai', role: 'Business Analyst', dept: 'Strategy', type: 'candidate', initials: 'RD', color: '#9333EA',
    offer: 'generated', kyc: { aadhar: 'not_started', pan: 'not_started', bank: 'not_started', dl: 'not_started' },
    approval: 'not_started', onboarded: 'not_started', updatedDate: '22 Apr 2025', updatedTime: '10:00 AM' },
  { id: 'AIV-2025-0113', name: 'Meera Pillai', role: 'HR Executive', dept: 'HR', type: 'employee', initials: 'MP', color: '#0891B2',
    offer: 'accepted', kyc: { aadhar: 'verified', pan: 'verified', bank: 'verified', dl: 'verified' },
    approval: 'approved', onboarded: 'completed', updatedDate: '20 Apr 2025', updatedTime: '1:15 PM' },
];

const ARJUN_DETAIL = {
  email: 'arjun.mehta@gmail.com',
  phone: '+91 98765 43210',
  joining: 'May 1, 2025',
  location: 'Mumbai, Maharashtra',
  reporting: 'Priya Sharma (VP Engineering)',
  ctc: '₹18,00,000 per annum',
  grade: 'L4 — Senior Engineer',
  work: 'Mumbai HQ (Hybrid 3 days/week)',
  probation: '6 months',
};

const KYC_DOC_DATA = {
  aadhar: {
    name: 'Aadhaar', desc: 'Government ID',
    icon: 'https://img.icons8.com/3d-fluency/200/id-verified.png',
    fields: [
      ['Full Name', 'Arjun Mehta'],
      ['Date of Birth', '01 Jan 1995'],
      ['Gender', 'Male'],
      ['Aadhaar No', 'XXXX XXXX 4321'],
      ['Address', '12, Park Street, Mumbai - 400001'],
      ['Issue Date', '15 Mar 2018'],
    ],
  },
  pan: {
    name: 'PAN', desc: 'Tax Document',
    icon: 'https://img.icons8.com/3d-fluency/200/contract.png',
    fields: [
      ['Full Name', 'ARJUN MEHTA'],
      ["Father's Name", 'SURESH MEHTA'],
      ['Date of Birth', '01/01/1995'],
      ['PAN Number', 'ABCPM1234Z'],
      ['Status', 'Individual'],
    ],
  },
  bank: {
    name: 'Bank Details', desc: 'Account Verification',
    icon: 'https://img.icons8.com/3d-fluency/200/bank-building.png',
    fields: [
      ['Account Holder', 'Arjun Mehta'],
      ['Account Number', 'XXXX XXXX 9876'],
      ['IFSC Code', 'AIVB0001234'],
      ['Bank Name', 'AIVision Bank'],
      ['Branch', 'Mumbai - BKC'],
      ['Account Type', 'Savings'],
    ],
  },
  dl: {
    name: 'Driving Licence', desc: 'Identity Proof',
    icon: 'https://img.icons8.com/3d-fluency/200/security-shield-green.png',
    fields: [],
  },
};

const STAGE_META = {
  offer_letter: { label: 'Offer Letter', desc: 'Accept, reject, or negotiate', icon: 'https://img.icons8.com/3d-fluency/200/contract.png' },
  kyc: { label: 'KYC', desc: 'Document verification status', icon: 'https://img.icons8.com/3d-fluency/200/id-verified.png' },
  approval: { label: 'Approval', desc: 'HR approval decision', icon: 'https://img.icons8.com/3d-fluency/200/security-shield-green.png' },
  onboarded: { label: 'Onboarded', desc: 'Final joining status', icon: 'https://img.icons8.com/3d-fluency/200/ok.png' },
};

const STATUS_OPTIONS = {
  offer_letter: ['generated', 'sent', 'negotiated', 'accepted', 'rejected', 'not_required'],
  kyc: ['pending', 'verified', 'rejected', 'not_required'],
  approval: ['pending', 'approved', 'rejected'],
  onboarded: ['pending', 'completed', 'rejected'],
};

const STATUS_HISTORY = [
  { stage: 'kyc.aadhar', from: 'pending', to: 'verified', actor: 'system', when: '28 Apr 2025 · 11:00 AM' },
  { stage: 'offer_letter', from: 'not_started', to: 'sent', actor: 'Ravi Kumar', when: '28 Apr 2025 · 10:00 AM' },
];

const SUPER_HR_HISTORY = [
  { stage: 'kyc.aadhar', from: 'pending', to: 'verified', actor: 'system', when: '28 Apr 2025 · 11:00 AM', action: 'UPDATE' },
  { stage: 'kyc.pan', from: 'not_started', to: 'pending', actor: 'system', when: '27 Apr 2025 · 02:00 PM', action: 'UPDATE' },
  { stage: 'offer_letter.status', from: 'not_started', to: 'sent', actor: 'Ravi Kumar', when: '28 Apr 2025 · 10:00 AM', action: 'UPDATE' },
  { stage: 'candidate_onboarding', note: 'record created', actor: 'system', when: '18 Apr 2025 · 10:00 AM', action: 'CREATE' },
];

const ONBOARDED_HISTORY = [
  { stage: 'onboarded.status', from: 'pending', to: 'completed', actor: 'Priya Sharma', when: '28 Apr · 11:45 AM' },
  { stage: 'approval.status', from: 'not_started', to: 'approved', actor: 'Priya Sharma', when: '28 Apr · 11:45 AM' },
  { stage: 'kyc.aadhar.status', from: 'pending', to: 'verified', actor: 'system', when: '28 Apr · 11:00 AM' },
  { stage: 'offer_letter.status', from: 'not_started', to: 'sent', actor: 'Ravi Kumar', when: '28 Apr · 10:00 AM' },
  { stage: 'candidate_onboarding', note: 'record created', actor: 'system', when: '18 Apr · 10:00 AM', isCreate: true },
];

const AUDIT_TRAIL = [
  { date: '28 Apr', time: '11:45 AM', action: 'UPDATE', stage: 'onboarded', changes: [{ field: 'onboarded.status', old: 'pending', new: 'completed' }], actor: 'Priya Sharma' },
  { date: '28 Apr', time: '11:45 AM', action: 'UPDATE', stage: 'approval', changes: [{ field: 'approval.status', old: 'not_started', new: 'approved' }], actor: 'Priya Sharma' },
  { date: '28 Apr', time: '11:00 AM', action: 'UPDATE', stage: 'kyc', changes: [{ field: 'kyc.aadhar.status', old: 'pending', new: 'verified' }], actor: 'system' },
  { date: '28 Apr', time: '10:30 AM', action: 'UPDATE', stage: 'kyc', changes: [{ field: 'kyc.pan.status', old: 'pending', new: 'verified' }], actor: 'Ravi Kumar' },
  { date: '28 Apr', time: '10:00 AM', action: 'UPDATE', stage: 'offer_letter', changes: [{ field: 'stages.offer_letter.status', old: 'not_started', new: 'sent' }], actor: 'Ravi Kumar' },
  { date: '27 Apr', time: '03:20 PM', action: 'UPDATE', stage: 'other', changes: [{ field: 'designation', old: 'Engineer', new: 'Senior Engineer' }], actor: 'Priya Sharma' },
  { date: '27 Apr', time: '02:00 PM', action: 'UPDATE', stage: 'kyc', changes: [{ field: 'stages.kyc.pan.status', old: 'not_started', new: 'pending' }], actor: 'system' },
  { date: '25 Apr', time: '09:00 AM', action: 'UPDATE', stage: 'offer_letter', changes: [{ field: 'stages.offer_letter.status', old: 'generated', new: 'sent' }], actor: 'Ravi Kumar' },
  { date: '24 Apr', time: '04:45 PM', action: 'UPDATE', stage: 'other', changes: [
    { field: 'ctc', old: '₹16,00,000', new: '₹18,00,000' },
    { field: 'grade', old: 'L3 — Engineer', new: 'L4 — Senior Engineer' },
  ], actor: 'Priya Sharma' },
  { date: '23 Apr', time: '10:00 AM', action: 'UPDATE', stage: 'other', changes: [{ field: 'joining_date', old: 'Apr 15, 2025', new: 'May 1, 2025' }], actor: 'Ravi Kumar' },
  { date: '21 Apr', time: '12:00 PM', action: 'UPDATE', stage: 'other', changes: [{ field: 'reporting_to', old: 'Anil Mehta', new: 'Priya Sharma' }], actor: 'Priya Sharma' },
  { date: '18 Apr', time: '10:00 AM', action: 'CREATE', stage: 'other', changes: [], note: 'Onboarding record created for candidate', actor: 'system' },
];

const ACTORS = {
  system: { initials: 'SY', bg: '#F1F5F9', color: '#64748B', via: 'via System' },
  'Ravi Kumar': { initials: 'RK', bg: '#BD1313', color: 'white', via: 'via HR Portal' },
  'Priya Sharma': { initials: 'PS', bg: '#7C3AED', color: 'white', via: 'via HR Portal' },
};

window.AIV = { HR_ADMIN, SUPER_HR, PEOPLE, ARJUN_DETAIL, KYC_DOC_DATA, STAGE_META, STATUS_OPTIONS, STATUS_HISTORY, SUPER_HR_HISTORY, ONBOARDED_HISTORY, AUDIT_TRAIL, ACTORS,
  // legacy compat
  HR_USER: HR_ADMIN, KYC_DOC_META: KYC_DOC_DATA };
