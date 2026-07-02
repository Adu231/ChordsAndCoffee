import { useState } from 'react';
import {
  LayoutDashboard, BookOpen, Video, Users, DollarSign, X, Music, Send
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import DashboardLayout from '@/components/layout/DashboardLayout';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: BookOpen, label: 'Create Courses', id: 'courses' },
  { icon: Video, label: 'Host Workshops', id: 'workshops' },
  { icon: Users, label: 'Mentor Students', id: 'mentorship' },
  { icon: DollarSign, label: 'Revenue Split', id: 'revenue' },
];

export default function MusicTeacherDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();

  // ----------------------------------------------------
  // MUSIC TEACHER STATES
  // ----------------------------------------------------
  const [teacherEarnings, setTeacherEarnings] = useState(1500);
  const [teacherCourses, setTeacherCourses] = useState([
    { id: 1, title: 'Acoustic Guitar 101', level: 'Beginner', students: 12, price: '$49' },
    { id: 2, title: 'Piano Improvisation Basics', level: 'Intermediate', students: 8, price: '$79' },
  ]);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseLevel, setNewCourseLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [newCoursePrice, setNewCoursePrice] = useState('49');
  const [newCourseDesc, setNewCourseDesc] = useState('');
  const [newCourseHours, setNewCourseHours] = useState('10');
  const [newCourseLectures, setNewCourseLectures] = useState('12');
  const [newCourseSyllabus, setNewCourseSyllabus] = useState('');

  const [teacherWorkshops, setTeacherWorkshops] = useState([
    { id: 1, title: 'Jazz Chords Mastery', date: 'Jul 12', seatsLeft: 5, price: '$15' },
    { id: 2, title: 'Folk Songwriting Tips', date: 'Jul 28', seatsLeft: 12, price: '$20' },
  ]);
  const [activeHostingWorkshop, setActiveHostingWorkshop] = useState<any | null>(null);
  const [workshopChats, setWorkshopChats] = useState([
    { user: 'Alice', msg: 'So excited for fingerpicking secrets!' },
    { user: 'Bob', msg: 'Will we cover open tuning formats today?' }
  ]);
  const [workshopChatInput, setWorkshopChatInput] = useState('');
  const [newWorkshopTitle, setNewWorkshopTitle] = useState('');
  const [newWorkshopDate, setNewWorkshopDate] = useState('');

  const [mentorshipStudents, setMentorshipStudents] = useState([
    { id: 1, name: 'Charlie Miller', notes: 'Folk/Blues Fingerpicking. Focus on rhythm patterns.', lastMeeting: 'Jun 25, 2026' },
    { id: 2, name: 'Ava Martinez', notes: 'Classical acoustic fundamental scales, chord shapes.', lastMeeting: 'Jun 28, 2026' },
  ]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentInstrument, setNewStudentInstrument] = useState('Guitar');
  const [newStudentLevel, setNewStudentLevel] = useState('Beginner');
  const [newStudentNotes, setNewStudentNotes] = useState('');
  const [schedulingStudent, setSchedulingStudent] = useState<any | null>(null);
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');

  // Withdrawal States
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedWithdrawalAccount, setSelectedWithdrawalAccount] = useState('Chase Bank (•••• 4321)');
  const [withdrawalAccounts] = useState([
    'Chase Bank (•••• 4321)',
    'Paypal (sarah@jenkins.com)'
  ]);

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout
      roleLabel="Music Teacher"
      navItems={navItems}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {activeTab === 'dashboard' && (
        <div className="text-left animate-in fade-in duration-200">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Active Students', value: mentorshipStudents.length, change: '', icon: Users, color: 'text-blue-500' },
              { label: 'Courses Created', value: teacherCourses.length, change: '', icon: BookOpen, color: 'text-amber-500' },
              { label: 'Workshops Set', value: teacherWorkshops.length, change: '', icon: Video, color: 'text-violet-500' },
              { label: 'Account Balance', value: `$${teacherEarnings.toLocaleString()}`, change: '', icon: DollarSign, color: 'text-emerald-500' },
            ].map(stat => (
              <div key={stat.label} className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-warm transition-all">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={cn('w-5 h-5', stat.color)} />
                </div>
                <h4 className="text-2xl font-bold text-foreground">{stat.value}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Active Courses */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-4">Your Active Courses</h3>
              <div className="space-y-3">
                {teacherCourses.map(course => (
                  <div key={course.id} className="flex justify-between items-center p-3 border border-border rounded-xl bg-muted/15 text-xs">
                    <div>
                      <p className="font-semibold text-foreground">{course.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Level: {course.level} • Price: {course.price}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-coffee/10 text-coffee rounded-full font-semibold">{course.students} Enrolled</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mentor Notes */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-4">Recent Mentorship Feed</h3>
              <div className="space-y-3">
                {mentorshipStudents.map(student => (
                  <div key={student.id} className="p-3 border border-border rounded-xl bg-muted/10 text-xs">
                    <p className="font-semibold text-foreground"> {student.name}</p>
                    <p className="text-muted-foreground mt-1">{student.notes}</p>
                    <p className="text-[9px] text-muted-foreground mt-2">Last lesson: {student.lastMeeting}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'courses' && (
        <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto text-left animate-in fade-in duration-200">
          <h3 className="font-semibold text-foreground mb-4">Create a New Course</h3>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Course Title</label>
              <input
                type="text"
                value={newCourseTitle}
                onChange={e => setNewCourseTitle(e.target.value)}
                placeholder="e.g. Guitar Chord Masterclass"
                className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Level</label>
                <select
                  value={newCourseLevel}
                  onChange={e => setNewCourseLevel(e.target.value as any)}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Price ($ USD)</label>
                <input
                  type="number"
                  value={newCoursePrice}
                  onChange={e => setNewCoursePrice(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Estimated Hours</label>
                <input
                  type="number"
                  value={newCourseHours}
                  onChange={e => setNewCourseHours(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Number of Lectures</label>
                <input
                  type="number"
                  value={newCourseLectures}
                  onChange={e => setNewCourseLectures(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Course Description</label>
              <textarea
                rows={2}
                value={newCourseDesc}
                onChange={e => setNewCourseDesc(e.target.value)}
                placeholder="What will students learn in this course..."
                className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Syllabus Overview</label>
              <input
                type="text"
                value={newCourseSyllabus}
                onChange={e => setNewCourseSyllabus(e.target.value)}
                placeholder="e.g. Intro, Major Scales, Fingerpicking Patterns, Soloing"
                className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
              />
            </div>
            <button
              onClick={() => {
                if (!newCourseTitle.trim()) {
                  toast.error('Please enter a course title.');
                  return;
                }
                setTeacherCourses([...teacherCourses, { id: Date.now(), title: newCourseTitle, level: newCourseLevel, students: 0, price: `$${newCoursePrice}` }]);
                setNewCourseTitle('');
                setNewCourseDesc('');
                setNewCourseHours('10');
                setNewCourseLectures('12');
                setNewCourseSyllabus('');
                toast.success('Course created and listed successfully! 🎓');
              }}
              className="w-full py-2 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90"
            >
              Create Course
            </button>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Your Course Catalog ({teacherCourses.length})</h4>
            <div className="space-y-2">
              {teacherCourses.map(course => (
                <div key={course.id} className="flex justify-between items-center p-3 border border-border rounded-xl bg-muted/15 text-xs">
                  <div>
                    <p className="font-semibold text-foreground"> {course.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Level: {course.level} • Price: {course.price} • Students: {course.students}</p>
                  </div>
                  <span className="px-2 py-1 bg-coffee/10 text-coffee rounded text-[10px] font-bold">Listed</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'workshops' && (
        <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto text-left animate-in fade-in duration-200">
          <h3 className="font-semibold text-foreground mb-4">Schedule a Live Workshop</h3>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Workshop Title</label>
              <input
                type="text"
                value={newWorkshopTitle}
                onChange={e => setNewWorkshopTitle(e.target.value)}
                placeholder="e.g. Songwriting Secrets"
                className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Date</label>
              <input
                type="date"
                value={newWorkshopDate}
                onChange={e => setNewWorkshopDate(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
              />
            </div>
            <button
              onClick={() => {
                if (!newWorkshopTitle.trim()) return;
                setTeacherWorkshops([...teacherWorkshops, { id: Date.now(), title: newWorkshopTitle, date: newWorkshopDate, seatsLeft: 20, price: '$15' }]);
                setNewWorkshopTitle('');
                toast.success('Workshop scheduled! Students can now register. 🎟️');
              }}
              className="w-full py-2 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90"
            >
              Launch Workshop
            </button>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Your Workshops</h4>
            <div className="space-y-2">
              {teacherWorkshops.map(ws => (
                <div key={ws.id} className="flex justify-between items-center p-3 border border-border rounded-xl bg-muted/15 text-xs">
                  <div>
                    <p className="font-semibold text-foreground">{ws.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Date: {ws.date} • Tickets: {ws.price}</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveHostingWorkshop(ws);
                      toast.info(`Starting video connection for ${ws.title}...`);
                    }}
                    className="px-3 py-1.5 bg-coffee text-white rounded-lg font-semibold hover:opacity-90 text-[10px]"
                  >
                    Host Session
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'mentorship' && (
        <div className="space-y-6 max-w-xl mx-auto text-left animate-in fade-in duration-200">
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Add New Mentorship Student</h3>
            <div className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-foreground mb-1">Student Full Name</label>
                  <input
                    type="text"
                    value={newStudentName}
                    onChange={e => setNewStudentName(e.target.value)}
                    placeholder="e.g. Charlie Parker"
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-foreground mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newStudentEmail}
                    onChange={e => setNewStudentEmail(e.target.value)}
                    placeholder="e.g. charlie@gmail.com"
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-foreground mb-1">Instrument</label>
                  <select
                    value={newStudentInstrument}
                    onChange={e => setNewStudentInstrument(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  >
                    <option value="Guitar">Guitar</option>
                    <option value="Piano">Piano</option>
                    <option value="Vocal">Vocal</option>
                    <option value="Drums">Drums</option>
                    <option value="Violin">Violin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-foreground mb-1">Skill Level</label>
                  <select
                    value={newStudentLevel}
                    onChange={e => setNewStudentLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-foreground mb-1">Lesson Goals / Focus Area</label>
                <textarea
                  rows={2}
                  value={newStudentNotes}
                  onChange={e => setNewStudentNotes(e.target.value)}
                  placeholder="Describe what the student wants to focus on..."
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none resize-none"
                />
              </div>
              <button
                onClick={() => {
                  if (!newStudentName.trim() || !newStudentEmail.trim()) {
                    toast.error('Please fill in name and email address.');
                    return;
                  }
                  setMentorshipStudents([
                    ...mentorshipStudents,
                    {
                      id: Date.now(),
                      name: newStudentName,
                      notes: `${newStudentInstrument} (${newStudentLevel}) - Goal: ${newStudentNotes || 'Fundamentals'}`,
                      lastMeeting: 'Never'
                    }
                  ]);
                  setNewStudentName('');
                  setNewStudentEmail('');
                  setNewStudentNotes('');
                  toast.success('Mentorship student enrolled successfully!');
                }}
                className="w-full py-2 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90"
              >
                Enroll Mentorship Student
              </button>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4 font-display">Active Mentorship Roster</h3>
            <div className="space-y-3">
              {mentorshipStudents.map(student => (
                <div key={student.id} className="p-3 border border-border rounded-xl bg-muted/15 text-xs flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-foreground">🎓 {student.name}</p>
                    <p className="text-muted-foreground mt-0.5">Focus: {student.notes}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">Last Class: {student.lastMeeting}</p>
                  </div>
                  <button
                    onClick={() => setSchedulingStudent(student)}
                    className="px-3 py-1.5 bg-coffee text-white font-semibold rounded-lg text-[10px]"
                  >
                    Schedule 1-on-1
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'revenue' && (
        <div className="bg-card rounded-2xl border border-border p-5 max-w-lg mx-auto text-left animate-in fade-in duration-200">
          <h3 className="font-semibold text-foreground mb-4">Teacher Earnings Split</h3>
          <div className="border border-border p-4 rounded-xl bg-muted/20 text-center mb-6">
            <DollarSign className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <h4 className="font-bold text-2xl text-foreground">${teacherEarnings.toLocaleString()}</h4>
            <p className="text-xs text-muted-foreground">Accrued Account Balance</p>
          </div>
          <div className="border-t border-border pt-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Withdrawal Payout Method</h4>
            <button
              onClick={() => {
                if (teacherEarnings <= 0) {
                  toast.error('You do not have any earnings to withdraw.');
                  return;
                }
                setWithdrawAmount(teacherEarnings.toString());
                setShowWithdrawalModal(true);
              }}
              className="w-full py-2 bg-emerald-600 text-white rounded-xl font-semibold text-xs hover:bg-emerald-700"
            >
              Withdraw Payout to Bank
            </button>
          </div>
        </div>
      )}

      {/* Workshop Session Host Streaming Modal */}
      {activeHostingWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-2xl w-full grid md:grid-cols-3 gap-6 relative animate-in fade-in zoom-in-95 duration-200 text-left">
            {/* Video stream simulator */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-display font-semibold text-foreground text-sm"> Broadcasting: {activeHostingWorkshop.title}</h4>
                <span className="px-2 py-0.5 bg-red-600 text-white text-[9px] font-bold rounded-full animate-pulse flex items-center gap-1"> LIVE</span>
              </div>
              <div className="aspect-video bg-black rounded-xl border border-border flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                <Music className="w-12 h-12 text-coffee/40 animate-bounce mb-3" />
                <div className="flex gap-1 h-8 items-end">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-1 bg-coffee rounded-t animate-bounce" style={{ height: `${20 + Math.random() * 60}%`, animationDelay: `${i * 0.1}s`, animationDuration: '0.6s' }} />
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground mt-4 z-10">Webcam feeds active • Audio broadcast high-fidelity stems</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setActiveHostingWorkshop(null);
                    toast.success('Live broadcast finished successfully! Feed archived.');
                  }}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl flex-1 transition-colors"
                >
                  End Live Session
                </button>
              </div>
            </div>

            {/* Live chat panel */}
            <div className="border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
              <div>
                <h5 className="font-bold text-[10px] uppercase text-muted-foreground mb-3">Live Session Chat</h5>
                <div className="space-y-3 h-48 overflow-y-auto pr-1">
                  {workshopChats.map((chat, idx) => (
                    <div key={idx} className="text-[11px] leading-relaxed">
                      <strong className="text-coffee">@{chat.user}: </strong>
                      <span className="text-muted-foreground">{chat.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-border mt-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!workshopChatInput.trim()) return;
                    setWorkshopChats([...workshopChats, { user: user.name || 'You', msg: workshopChatInput.trim() }]);
                    setWorkshopChatInput('');
                  }}
                  className="flex gap-1.5"
                >
                  <input
                    type="text"
                    placeholder="Say something..."
                    value={workshopChatInput}
                    onChange={(e) => setWorkshopChatInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-border rounded-lg bg-background text-[10px] text-foreground focus:outline-none focus:border-coffee/50"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1.5 bg-coffee text-white text-[10px] font-bold rounded-lg hover:opacity-90"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mentorship Lesson Scheduler Modal */}
      {schedulingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display font-semibold text-foreground text-sm"> Schedule Class: {schedulingStudent.name}</h4>
              <button onClick={() => setSchedulingStudent(null)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Select Date</label>
                <input
                  type="date"
                  value={meetingDate}
                  onChange={e => setMeetingDate(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Select Time</label>
                <input
                  type="time"
                  value={meetingTime}
                  onChange={e => setMeetingTime(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>
              <div className="bg-muted/30 p-2.5 rounded-xl border border-border text-[10px] text-muted-foreground leading-relaxed">
                📎 A calendar event invitation and Zoom/Google Meet link will be generated and dispatched automatically to student inbox.
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    toast.success(`1-on-1 session scheduled with ${schedulingStudent.name} for ${meetingDate} at ${meetingTime}! 📅`);
                    setMentorshipStudents(mentorshipStudents.map(s => s.id === schedulingStudent.id ? { ...s, lastMeeting: meetingDate } : s));
                    setSchedulingStudent(null);
                  }}
                  className="px-4 py-2 bg-coffee text-white font-semibold rounded-xl text-xs flex-1"
                >
                  Book Lesson
                </button>
                <button
                  onClick={() => setSchedulingStudent(null)}
                  className="px-4 py-2 border border-border rounded-xl text-xs text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display font-semibold text-foreground text-sm font-bold"> Confirm Payout Withdrawal</h4>
              <button onClick={() => setShowWithdrawalModal(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4 text-xs">
              <div className="bg-emerald-50/50 border border-emerald-200/50 rounded-xl p-3 text-center">
                <span className="text-[10px] text-emerald-800 uppercase font-bold tracking-wider">Available Balance</span>
                <p className="text-2xl font-bold text-emerald-600 mt-0.5">${teacherEarnings}</p>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Select Transfer Account</label>
                <select
                  value={selectedWithdrawalAccount}
                  onChange={e => setSelectedWithdrawalAccount(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                >
                  {withdrawalAccounts.map(acc => (
                    <option key={acc} value={acc}>{acc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Withdrawal Amount ($ USD)</label>
                <input
                  type="number"
                  max={teacherEarnings}
                  value={withdrawAmount}
                  onChange={e => setWithdrawAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    const amt = parseFloat(withdrawAmount);
                    if (isNaN(amt) || amt <= 0 || amt > teacherEarnings) {
                      toast.error('Please enter a valid withdrawal amount.');
                      return;
                    }
                    toast.success(`Withdrawal request of $${amt.toLocaleString()} successfully queued to ${selectedWithdrawalAccount}! `);
                    setTeacherEarnings(prev => prev - amt);
                    setShowWithdrawalModal(false);
                  }}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs flex-1 transition-colors"
                >
                  Confirm & Withdraw
                </button>
                <button
                  onClick={() => setShowWithdrawalModal(false)}
                  className="px-4 py-2.5 border border-border rounded-xl text-xs text-muted-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
