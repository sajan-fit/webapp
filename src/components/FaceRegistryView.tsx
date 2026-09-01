import React, { useState } from 'react';
import { 
  UserCheck, 
  Plus, 
  Search, 
  Filter, 
  ShieldCheck, 
  Sparkles, 
  Camera as CameraIcon, 
  Upload, 
  CheckCircle2, 
  X,
  Mail,
  Phone,
  Building,
  Key
} from 'lucide-react';
import { RegisteredPerson } from '../types';
import { IMAGES } from '../mockData';

interface FaceRegistryViewProps {
  people: RegisteredPerson[];
  onAddPerson: (person: RegisteredPerson) => void;
}

export const FaceRegistryView: React.FC<FaceRegistryViewProps> = ({
  people,
  onAddPerson
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<'Student' | 'Staff' | 'Security' | 'Visitor'>('Student');
  const [roomNumber, setRoomNumber] = useState<string>('');
  const [department, setDepartment] = useState<string>('Hostel Block A');
  const [accessLevel, setAccessLevel] = useState<'Level 1 (General)' | 'Level 2 (Hostel Only)' | 'Level 3 (Restricted Zones)' | 'Level 4 (Admin/Full)'>('Level 2 (Hostel Only)');
  const [email, setEmail] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string>(IMAGES.sajanFace);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredPeople = people.filter((p) => {
    const matchesRole = roleFilter === 'All' || p.role === roleFilter;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleCreatePerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !roomNumber) return;

    const newPerson: RegisteredPerson = {
      id: `PER-${1000 + people.length + 1}`,
      name,
      role,
      roomNumber,
      accessLevel,
      image: uploadedImage,
      registrationDate: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
      status: 'Active',
      department,
      confidenceScore: 98.9,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@campus.edu`,
      phone: '+1 (555) 012-9844'
    };

    onAddPerson(newPerson);
    setShowAddModal(false);
    setName('');
    setRoomNumber('');
    showToast(`Biometric embedding created for ${name}. Access granted.`);
  };

  return (
    <div id="face-registry-view" className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto font-mono">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#00d2ff]/20 text-[#26fedc] border border-[#00d2ff] backdrop-blur-xl shadow-2xl flex items-center gap-2 text-xs animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-[#26fedc]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header and Controls */}
      <div className="p-4 rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#26fedc]" />
            <div>
              <h2 className="text-sm font-bold text-[#dae2fd]">BIOMETRIC FACIAL IDENTITY REGISTRY</h2>
              <p className="text-xs text-[#859399]">ResNet-512 Facial Embeddings • Real-Time Cosine Verification</p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00d2ff]/20 to-[#26fedc]/20 hover:from-[#00d2ff]/30 hover:to-[#26fedc]/30 border border-[#00d2ff]/50 text-xs font-bold text-[#26fedc] flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,210,255,0.2)] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Enroll New Resident / Staff</span>
          </button>
        </div>

        {/* Search & Role Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#3c494e]/30 text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#859399]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search resident by name, room #..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#0b1326] border border-[#3c494e]/40 text-[#dae2fd] placeholder-[#859399] focus:outline-none focus:border-[#00d2ff]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {['All', 'Student', 'Staff', 'Security', 'Visitor'].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1 rounded-xl text-xs transition-all ${
                  roleFilter === r
                    ? 'bg-[#00d2ff]/20 text-[#26fedc] border border-[#00d2ff]/50'
                    : 'bg-[#171f33] text-[#859399] hover:text-[#dae2fd] border border-[#3c494e]/40'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* People Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPeople.map((person) => (
          <div
            key={person.id}
            id={`person-card-${person.id}`}
            className="group rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 hover:border-[#00d2ff]/50 shadow-xl overflow-hidden flex flex-col justify-between transition-all"
          >
            <div className="p-4 space-y-4">
              {/* Photo reticle */}
              <div className="relative aspect-square rounded-xl overflow-hidden border border-[#00d2ff]/30 bg-[#0b1326]">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                
                {/* Facial scanning corners */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#26fedc]" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#26fedc]" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#26fedc]" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#26fedc]" />

                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 py-1 rounded bg-[#0b1326]/90 backdrop-blur-md border border-[#3c494e]/50 text-[10px]">
                  <span className="text-[#26fedc]">MATCH: {person.confidenceScore}%</span>
                  <span className="text-[#a5e7ff]">{person.status}</span>
                </div>
              </div>

              {/* Identity Info */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#dae2fd]">{person.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    person.role === 'Student'
                      ? 'bg-[#00d2ff]/20 text-[#26fedc] border border-[#00d2ff]/40'
                      : person.role === 'Staff'
                      ? 'bg-amber-950/30 text-amber-300 border border-amber-500/30'
                      : person.role === 'Security'
                      ? 'bg-[#93000a]/30 text-[#ffb4ab] border border-[#ffb4ab]/30'
                      : 'bg-[#171f33] text-[#bbc9cf] border border-[#3c494e]'
                  }`}>
                    {person.role}
                  </span>
                </div>
                <p className="text-[#bbc9cf] text-xs">{person.roomNumber}</p>
                <p className="text-[11px] text-[#859399]">{person.department}</p>
              </div>

              {/* Access Clearance Tag */}
              <div className="p-2 rounded-xl bg-[#171f33] border border-[#3c494e]/30 text-[11px] space-y-1">
                <div className="flex items-center gap-1.5 text-[#a5e7ff]">
                  <Key className="w-3 h-3 text-[#26fedc]" />
                  <span className="truncate">{person.accessLevel}</span>
                </div>
                <div className="text-[10px] text-[#859399]">Enrolled: {person.registrationDate}</div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-3 bg-[#171f33]/60 border-t border-[#3c494e]/30 flex items-center justify-between text-xs">
              <span className="text-[10px] text-[#859399]">{person.id}</span>
              <button 
                onClick={() => showToast(`Biometric vectors verified for ${person.name}. 512 dimensions synced.`)}
                className="text-[11px] text-[#26fedc] hover:underline"
              >
                Verify Vector →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Enroll Person Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#131b2e] border border-[#00d2ff]/40 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-4 bg-[#171f33] border-b border-[#3c494e]/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#26fedc]" />
                <h3 className="text-xs font-bold text-[#dae2fd]">ENROLL BIOMETRIC PROFILE</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded bg-[#0b1326] text-[#859399] hover:text-[#dae2fd]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePerson} className="p-5 space-y-4 text-xs">
              {/* Photo Selector */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-[#171f33] border border-[#3c494e]/40">
                <img src={uploadedImage} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-[#00d2ff]" />
                <div className="space-y-1">
                  <span className="text-[11px] text-[#859399]">SELECT REFERENCE EMBEDDING PHOTO</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setUploadedImage(IMAGES.sajanCrop)}
                      className="px-2 py-1 rounded-lg bg-[#0b1326] text-[10px] text-[#26fedc] border border-[#26fedc]/30"
                    >
                      Sample Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadedImage(IMAGES.mayaFace)}
                      className="px-2 py-1 rounded-lg bg-[#0b1326] text-[10px] text-[#00d2ff] border border-[#00d2ff]/30"
                    >
                      Sample Staff
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#859399]">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0b1326] border border-[#3c494e]/50 text-[#dae2fd] focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#859399]">Campus Role</label>
                  <select
                    value={role}
                    onChange={(e: any) => setRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0b1326] border border-[#3c494e]/50 text-[#dae2fd] focus:outline-none focus:border-[#00d2ff]"
                  >
                    <option value="Student">Student</option>
                    <option value="Staff">Staff</option>
                    <option value="Security">Security</option>
                    <option value="Visitor">Visitor</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#859399]">Room # or Office</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Room 402 (Block B)"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0b1326] border border-[#3c494e]/50 text-[#dae2fd] focus:outline-none focus:border-[#00d2ff]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#859399]">Access Clearance Level</label>
                <select
                  value={accessLevel}
                  onChange={(e: any) => setAccessLevel(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0b1326] border border-[#3c494e]/50 text-[#dae2fd] focus:outline-none focus:border-[#00d2ff]"
                >
                  <option value="Level 1 (General)">Level 1 (General Public)</option>
                  <option value="Level 2 (Hostel Only)">Level 2 (Hostel Resident)</option>
                  <option value="Level 3 (Restricted Zones)">Level 3 (Faculty & Staff)</option>
                  <option value="Level 4 (Admin/Full)">Level 4 (Admin & Security)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#859399]">Email Address</label>
                <input
                  type="email"
                  placeholder="alex.m@campus.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0b1326] border border-[#3c494e]/50 text-[#dae2fd] focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="pt-3 border-t border-[#3c494e]/30 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#0b1326] text-[#859399] hover:text-[#dae2fd] border border-[#3c494e]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#26fedc] text-[#003543] font-bold shadow-[0_0_12px_rgba(0,210,255,0.3)] transition-all"
                >
                  Register Face
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
