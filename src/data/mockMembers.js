export const MEMBERSHIP_TYPES = ['Basic', 'Pro', 'Enterprise']

export const MEMBERSHIP_PRICES = {
  Basic: 10,
  Pro: 25,
  Enterprise: 100,
}

export const STATUSES = ['Active', 'Inactive']

const today = new Date().toISOString().split('T')[0]
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

export const initialMembers = [
  { id: '1',  name: 'Arjun Sharma',      email: 'arjun.sharma@techcorp.in',    membershipType: 'Enterprise', status: 'Active',   joinedAt: today },
  { id: '2',  name: 'Priya Nair',        email: 'priya.nair@designstudio.com', membershipType: 'Pro',        status: 'Active',   joinedAt: today },
  { id: '3',  name: 'Rohan Mehta',       email: 'rohan.mehta@startup.io',      membershipType: 'Basic',      status: 'Active',   joinedAt: today },
  { id: '4',  name: 'Sneha Kapoor',      email: 'sneha.kapoor@finflow.com',    membershipType: 'Pro',        status: 'Inactive', joinedAt: yesterday },
  { id: '5',  name: 'Vikram Iyer',       email: 'vikram.iyer@cloudbase.net',   membershipType: 'Enterprise', status: 'Active',   joinedAt: yesterday },
  { id: '6',  name: 'Anjali Desai',      email: 'anjali.desai@bloom.co',       membershipType: 'Basic',      status: 'Active',   joinedAt: '2025-03-10' },
  { id: '7',  name: 'Karan Bhatia',      email: 'karan.bhatia@hyperloop.ai',   membershipType: 'Pro',        status: 'Active',   joinedAt: '2025-02-18' },
  { id: '8',  name: 'Meera Pillai',      email: 'meera.pillai@novahealth.org', membershipType: 'Enterprise', status: 'Active',   joinedAt: '2025-01-05' },
  { id: '9',  name: 'Sameer Joshi',      email: 'sameer.joshi@devhub.io',      membershipType: 'Basic',      status: 'Inactive', joinedAt: '2024-12-20' },
  { id: '10', name: 'Lakshmi Rao',       email: 'lakshmi.rao@greenleaf.com',   membershipType: 'Pro',        status: 'Active',   joinedAt: '2024-11-14' },
  { id: '11', name: 'Nikhil Gupta',      email: 'nikhil.gupta@paystream.in',   membershipType: 'Enterprise', status: 'Active',   joinedAt: '2024-10-30' },
  { id: '12', name: 'Divya Krishnan',    email: 'divya.krishnan@edgex.io',     membershipType: 'Basic',      status: 'Active',   joinedAt: '2024-09-22' },
  { id: '13', name: 'Rahul Sinha',       email: 'rahul.sinha@vortex.ai',       membershipType: 'Pro',        status: 'Inactive', joinedAt: '2024-08-11' },
  { id: '14', name: 'Pooja Varma',       email: 'pooja.varma@retailx.com',     membershipType: 'Basic',      status: 'Active',   joinedAt: '2024-07-04' },
  { id: '15', name: 'Aditya Banerjee',   email: 'aditya.banerjee@logicore.in', membershipType: 'Enterprise', status: 'Active',   joinedAt: '2024-06-18' },
  { id: '16', name: 'Sonia Mathur',      email: 'sonia.mathur@sparkle.co',     membershipType: 'Pro',        status: 'Active',   joinedAt: '2024-05-09' },
  { id: '17', name: 'Deepak Chauhan',    email: 'deepak.chauhan@nextgen.dev',  membershipType: 'Basic',      status: 'Inactive', joinedAt: '2024-04-25' },
  { id: '18', name: 'Isha Trivedi',      email: 'isha.trivedi@moonlabs.ai',    membershipType: 'Pro',        status: 'Active',   joinedAt: '2024-03-13' },
  { id: '19', name: 'Gaurav Malhotra',   email: 'gaurav.malhotra@zenith.io',   membershipType: 'Enterprise', status: 'Active',   joinedAt: '2024-02-07' },
  { id: '20', name: 'Nisha Agarwal',     email: 'nisha.agarwal@pixelcraft.com',membershipType: 'Basic',      status: 'Active',   joinedAt: '2024-01-19' },
]
