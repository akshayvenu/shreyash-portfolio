// DASHBOARD CONTENT TO REPLACE PLACEHOLDER
// This will go into the Content area section of App.tsx

{/* Dashboard Content - replace placeholder lines 1945-1967 */}
{screen === 'dashboard' ? (
  <div className="flex-1 flex flex-col overflow-hidden p-5 gap-[14px] screen-enter">
    {/* Section 1: Hero Row */}
    <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-[14px] h-[140px] flex-shrink-0">
      {/* Welcome Hero Card */}
      <div className="relative overflow-hidden rounded-[20px] p-5 cursor-default" 
           style={{ background: 'linear-gradient(145deg, #7A0D0D 0%, #BD1313 55%, #D94040 100%)' }}>
        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
             style={{
               backgroundImage: 'url(https://i.ibb.co/GQM6xx2F/dot-grid-light.png)',
               backgroundRepeat: 'repeat',
               backgroundSize: '40px 40px'
             }} />
        {/* Circle decorations */}
        <div className="absolute top-[-30px] right-[-30px] w-[180px] h-[180px] rounded-full"
             style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="absolute bottom-[-20px] left-[-20px] w-[120px] h-[120px] rounded-full"
             style={{ background: 'rgba(255,255,255,0.04)' }} />
        
        <div className="relative z-10 flex items-center justify-between h-full">
          <div className="flex flex-col justify-center">
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 800,
              color: 'white',
              marginBottom: '4px'
            }}>
              Good morning, {mockUser.name.split(' ')[0]} 👋
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.75)', marginBottom: '12px' }}>
              Tuesday, 18 March · <span style={{ color: 'rgba(255,255,255,0.7)' }}>{mockUser.daysToPlacement} days to placement season 🎯</span>
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-[5px] rounded-full text-white text-[11px] font-semibold"
                    style={{ 
                      background: 'rgba(255,255,255,0.15)', 
                      border: '1px solid rgba(255,255,255,0.25)',
                      fontFamily: 'var(--font-body)'
                    }}>
                🔥 {mockUser.streak} Day Streak
              </span>
              <span className="px-3 py-[5px] rounded-full text-white text-[11px] font-semibold"
                    style={{ 
                      background: 'rgba(255,255,255,0.15)', 
                      border: '1px solid rgba(255,255,255,0.25)',
                      fontFamily: 'var(--font-body)'
                    }}>
                📅 Mar 18, 2025
              </span>
            </div>
          </div>
          
          {/* Illustration */}
          <div className="relative">
            <img src="https://i.ibb.co/0jsxwDhQ/dashboard-abstract.png" 
                 height="130"
                 alt=""
                 style={{ 
                   filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.25))',
                   animation: 'float 3s ease-in-out infinite',
                   objectFit: 'contain'
                 }} />
            <img src="https://img.icons8.com/3d-fluency/100/star.png" 
                 width="24" 
                 alt=""
                 style={{
                   position: 'absolute',
                   top: '10px',
                   right: '140px',
                   animation: 'float 2.5s ease-in-out infinite',
                   animationDelay: '0.5s',
                   filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))'
                 }} />
            <img src="https://img.icons8.com/3d-fluency/100/lightning-bolt.png" 
                 width="20" 
                 alt=""
                 style={{
                   position: 'absolute',
                   bottom: '20px',
                   right: '150px',
                   animation: 'float 3.5s ease-in-out infinite',
                   animationDelay: '1s'
                 }} />
          </div>
        </div>
      </div>

      {/* XP Card */}
      <div className="relative overflow-hidden rounded-[20px] p-[18px]"
           style={{ 
             background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)',
             border: '1px solid #FCD34D'
           }}>
        <div className="absolute inset-0 pointer-events-none opacity-40 rounded-[inherit]"
             style={{
               backgroundImage: 'url(https://i.ibb.co/XZDscnRB/card-noise.png)',
               backgroundRepeat: 'repeat',
               backgroundSize: '200px 200px'
             }} />
        <img src="https://img.icons8.com/3d-fluency/100/medal.png" 
             width="56"
             alt=""
             style={{
               position: 'absolute',
               top: '-8px',
               right: '12px',
               filter: 'drop-shadow(0 4px 12px rgba(217,119,6,0.3))',
               animation: 'float 3s ease-in-out infinite'
             }} />
        <div className="relative z-10">
          <div style={{ 
            fontFamily: 'var(--font-body)', 
            fontSize: '10px', 
            fontWeight: 600, 
            color: '#D97706',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            marginBottom: '4px'
          }}>
            ⚡ XP POINTS
          </div>
          <div style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '28px', 
            fontWeight: 800, 
            color: '#D97706'
          }}>
            {mockUser.xp.toLocaleString()}
          </div>
          <span className="inline-block px-[10px] py-[3px] rounded-full text-white text-[11px] font-bold mt-1"
                style={{ background: '#D97706', fontFamily: 'var(--font-body)' }}>
            {mockUser.levelEmoji} {mockUser.level} · Lv.{mockUser.levelNumber}
          </span>
          <div style={{ marginTop: '10px' }}>
            <div style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: '10px', 
              color: '#B45309',
              marginBottom: '4px'
            }}>
              {mockUser.nextLevelXP - mockUser.xp} XP to {mockUser.nextLevel}
            </div>
            <div style={{ height: '4px', background: 'rgba(217,119,6,0.2)', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ 
                width: `${(mockUser.xp / mockUser.nextLevelXP) * 100}%`, 
                height: '100%',
                background: '#D97706',
                borderRadius: '9999px',
                transition: 'width 0.8s ease-out'
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="relative overflow-hidden rounded-[20px] p-[18px]"
           style={{ 
             background: 'white',
             border: '1px solid #E2E8F0',
             boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
           }}>
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center border-[3px] border-white"
               style={{ 
                 background: 'linear-gradient(135deg, #BD1313, #7A0D0D)',
                 boxShadow: '0 4px 12px rgba(189,19,19,0.3)'
               }}>
            <span style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '18px', 
              fontWeight: 800, 
              color: 'white'
            }}>
              {mockUser.avatar}
            </span>
          </div>
          <div className="flex-1">
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
              {mockUser.name}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
              {mockUser.college} · {mockUser.year}
            </div>
            <span className="inline-block px-[10px] py-[3px] rounded-full text-[11px] font-semibold mt-1"
                  style={{ 
                    background: '#FDF2F2', 
                    color: '#BD1313', 
                    border: '1px solid #F5BFBF',
                    fontFamily: 'var(--font-body)'
                  }}>
              🎯 SWE Track
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-0 mt-[14px] pt-3 border-t border-[#F1F5F9]">
          <div className="text-center border-r border-[#F1F5F9]">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>12</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase' }}>TESTS</div>
          </div>
          <div className="text-center border-r border-[#F1F5F9]">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>3</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase' }}>SESSIONS</div>
          </div>
          <div className="text-center">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>8</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase' }}>SKILLS</div>
          </div>
        </div>
      </div>
    </div>

    {/* More sections will be added - this is just Section 1 */}
  </div>
) : (
  <div className="flex-1 overflow-hidden flex items-center justify-center screen-enter">
    <div className="text-center">
      <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
           style={{ background: 'linear-gradient(135deg, #FDF2F2, #F5BFBF)' }}>
        <LayoutDashboard size={36} color="#BD1313" />
      </div>
      <h2 style={{ 
        fontFamily: 'var(--font-display)', 
        fontSize: '24px', 
        fontWeight: 700,
        color: '#0F172A',
        marginBottom: '8px'
      }}>
        Module Coming Soon
      </h2>
      <p className="text-[#64748B] text-sm max-w-md mx-auto" 
         style={{ fontFamily: 'var(--font-body)' }}>
        This module will be built in the next steps. All screens are properly connected and ready!
      </p>
    </div>
  </div>
)}
