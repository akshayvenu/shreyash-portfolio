Continue building EduVision.
Read system guidelines fully before writing any code.
Do NOT rebuild any existing screens.
Only ADD the Credits & Billing screen.
All existing screens must remain intact.

=============================================================
NEW SCREEN — CREDITS & BILLING
=============================================================

screen: 'credits'
animation: screenEnter 280ms ease-out both

Add navigation:
  From settings screen → "Credits & Billing" nav item
  From XP store screen → "Buy Credits" link
  From dashboard → profile card "Credits" link

Add to sidebar bottom (above settings):
  CreditCard icon lucide 20px
  onClick: () => setScreen('credits')
  tooltip: "Credits & Billing"

=============================================================
CREDITS & BILLING STATE
=============================================================

Add at top of file:

const [creditTab, setCreditTab] = useState('resume');
const [cart, setCart] = useState([]);
const [showCart, setShowCart] = useState(false);
const [orderSuccess, setOrderSuccess] = useState(false);

const [wallet, setWallet] = useState({
  resume: 5,
  tests: 4,
  interview: 4
});

const creditPlans = {
  resume: [
    {id:'r1', credits:1, price:25, perCredit:25,
     label:'1 Resume Credit', tag:'Single credit',
     popular:false},
    {id:'r2', credits:10, price:225, perCredit:23,
     label:'10 Resume Credits', tag:'₹23 per credit',
     popular:false},
    {id:'r3', credits:50, price:1000, perCredit:20,
     label:'50 Resume Credits', tag:'₹20 per credit',
     popular:true}
  ],
  tests: [
    {id:'t1', credits:1, price:49, perCredit:49,
     label:'1 Test Credit', tag:'Single credit',
     popular:false},
    {id:'t2', credits:10, price:441, perCredit:44,
     label:'10 Test Credits', tag:'₹44 per credit',
     popular:false},
    {id:'t3', credits:50, price:1960, perCredit:39,
     label:'50 Test Credits', tag:'₹39 per credit',
     popular:true}
  ],
  interview: [
    {id:'i1', credits:1, price:99, perCredit:99,
     label:'1 Interview Credit', tag:'Single credit',
     popular:false},
    {id:'i2', credits:10, price:891, perCredit:89,
     label:'10 Interview Credits', tag:'₹89 per credit',
     popular:false},
    {id:'i3', credits:50, price:3960, perCredit:79,
     label:'50 Interview Credits', tag:'₹79 per credit',
     popular:true}
  ]
};

const addToCart = (plan, type) => {
  const existing = cart.find(
    item => item.id === plan.id);
  if (existing) {
    setCart(prev => prev.map(item =>
      item.id === plan.id
        ? {...item, qty: item.qty + 1}
        : item));
  } else {
    setCart(prev => [...prev, {
      ...plan, type, qty: 1
    }]);
  }
  setTimeout(() => showToast(
    plan.label + " added to cart! 🛒"), 0);
};

const removeFromCart = (id) =>
  setCart(prev => prev.filter(i => i.id !== id));

const cartTotal = cart.reduce(
  (sum, item) => sum + (item.price * item.qty), 0);

const cartCount = cart.reduce(
  (sum, item) => sum + item.qty, 0);

const purchaseHistory = [
  {id:'ph1', date:'Mar 15, 2025', type:'Test Credits',
   credits:10, amount:441,
   status:'completed', method:'Razorpay'},
  {id:'ph2', date:'Mar 10, 2025', type:'Resume Credits',
   credits:5, amount:125,
   status:'completed', method:'Razorpay'},
  {id:'ph3', date:'Mar 5, 2025', type:'Interview Credits',
   credits:4, amount:396,
   status:'completed', method:'Razorpay'}
];

=============================================================
SCREEN STRUCTURE
=============================================================

FULL STRUCTURE:
  display: flex
  flexDirection: column
  height: '100%'
  overflow: hidden

SECTION HEADER (56px, flex-shrink 0):
  bg white, borderBottom '1px solid #E2E8F0'
  padding '0 24px'
  display flex, alignItems center
  justifyContent space-between

  LEFT (display flex, gap 12px, align center):
    Icon circle (36px, bg #FDF2F2, radius 10px):
      CreditCard icon lucide 20px #BD1313

    div:
      "Credits & Billing 💳"
      Syne 20px weight 700 #0F172A
      "Manage credits and purchase history"
      Plus Jakarta Sans 12px #94A3B8

  RIGHT (display flex, gap 10px):
    CART BUTTON (position relative):
      bg white, border '1.5px solid #E2E8F0'
      borderRadius 10px, padding '8px 14px'
      display flex, gap 8px, alignItems center
      cursor pointer, transition all 0.2s
      hover: border #BD1313, bg #FFF8F8

      ShoppingCart icon lucide 18px #475569
      "Cart" Plus Jakarta Sans 13px weight 600 #475569

      {cartCount > 0 && (
        Badge (absolute -top-1 -right-1):
          bg #BD1313, color white
          width 18px, height 18px
          borderRadius '50%'
          fontSize 10, fontWeight 800
          display flex, center
          border '2px solid white'
          "{cartCount}"
      )}

      onClick: () => setShowCart(true)

    "Purchase History" ghost button:
      Plus Jakarta Sans 13px #BD1313 weight 500
      cursor pointer
      onClick: scroll to history section
        OR setActiveBillingTab('history')

CONTENT (flex 1, overflowY auto, padding '20px 24px'):

=============================================================
PART 1 — TOP TRUST BADGES ROW
=============================================================

display flex, gap 12px, mb 20px

const trustBadges = [
  {icon:'⚡', title:'Instant Delivery',
   desc:'Credits added immediately after payment'},
  {icon:'🔒', title:'Secure Payments',
   desc:'SSL encrypted via Razorpay'},
  {icon:'♾️', title:'Never Expires',
   desc:'Your credits stay valid forever'},
  {icon:'🎯', title:'One-Time Payment',
   desc:'No subscriptions. Pay only what you need'}
];

{trustBadges.map(badge => (
  <div style={{
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '12px 14px',
    background: 'white',
    border: '1px solid #E2E8F0',
    borderRadius: 14
  }}>
    <div style={{
      width: 36, height: 36,
      borderRadius: 10,
      background: '#FDF2F2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      flexShrink: 0
    }}>{badge.icon}</div>
    <div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 12, fontWeight: 700,
        color: '#0F172A'
      }}>{badge.title}</div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 11, color: '#94A3B8',
        marginTop: 1
      }}>{badge.desc}</div>
    </div>
  </div>
))}

=============================================================
PART 2 — YOUR WALLET
=============================================================

WALLET SECTION:
  "Your Wallet 💰" Syne 16px weight 700, mb 12px

  display grid, gridTemplateColumns 'repeat(3,1fr)'
  gap 14px, mb 24px

  const walletCards = [
    {key:'resume', label:'Resume Builder',
     desc:'For professional resumes',
     icon:'https://img.icons8.com/3d-fluency/100/resume.png',
     color:'#BD1313', bg:'#FFF1F2',
     border:'#F5BFBF'},
    {key:'tests', label:'Test Assessments',
     desc:'For assessment tests',
     icon:'https://img.icons8.com/3d-fluency/100/bookmark-book.png',
     color:'#D97706', bg:'#FFFBEB',
     border:'#FCD34D'},
    {key:'interview', label:'AI Interview',
     desc:'For AI mock interviews',
     icon:'https://img.icons8.com/3d-fluency/100/microphone.png',
     color:'#16A34A', bg:'#F0FDF4',
     border:'#86EFAC'}
  ];

  {walletCards.map(card => (
    <div style={{
      background: 'white',
      border: `1.5px solid ${card.border}`,
      borderRadius: 20,
      padding: 20,
      position: 'relative',
      overflow: 'hidden'
    }}>
      Top color strip (3px, card.color):
        position absolute, top 0, left 0, right 0
        borderRadius '20px 20px 0 0'

      TOP ROW (display flex, justify space-between,
               align flex-start, mb 12px):
        Icon circle (44px, bg card.bg, radius 12px):
          <img src={card.icon} width={24} height={24}
               style={{background:'transparent'}}/>

        "Available" chip:
          bg card.bg, color card.color
          Plus Jakarta Sans 10px weight 700
          borderRadius 9999px, padding '3px 8px'

      CREDIT COUNT:
        "{wallet[card.key]}"
        Syne 40px weight 800
        color card.color
        lineHeight 1

      "credits" Plus Jakarta Sans 12px #94A3B8, mt 2px
      "Available to use" Plus Jakarta Sans 11px #94A3B8

      MODULE NAME (mt 8px):
        card.label Syne 14px weight 700 #0F172A

      card.desc Plus Jakarta Sans 11px #94A3B8

      "Buy More →" link (mt 10px):
        Plus Jakarta Sans 12px weight 600
        color card.color, cursor pointer
        display flex, gap 4px, alignItems center
        onClick: () => {
          setCreditTab(card.key);
          document.getElementById('buy-credits')
            ?.scrollIntoView({behavior:'smooth'});
        }
    </div>
  ))}

  TOTAL CREDITS CHIP (below wallet cards):
    display flex, alignItems center, gap 10px
    bg linear-gradient(135deg, #FDF2F2, white)
    border '1px solid #F5BFBF'
    borderRadius 12px, padding '10px 16px'
    marginBottom 24px

    <img src="https://img.icons8.com/3d-fluency/100/lightning-bolt.png"
         width={20} height={20}
         style={{background:'transparent'}}/>

    "Total Credits:" Plus Jakarta Sans 13px #475569
    "{wallet.resume + wallet.tests + wallet.interview} total credits"
    Syne 16px weight 800 #BD1313

=============================================================
PART 3 — BUY CREDITS
=============================================================

id="buy-credits" (for scroll target)

HEADER ROW (display flex, justify space-between,
             align center, mb 4px):
  LEFT:
    "Buy Credits 🛒" Syne 18px weight 700 #0F172A
    "One-time payment. No subscriptions. Credits never expire."
    Plus Jakarta Sans 12px #94A3B8, mt 2px

  RIGHT: Filter dropdown:
    display flex, gap 8px, align center
    "Sort by:" Plus Jakarta Sans 12px #94A3B8

    Select (h36, padding '0 12px', border '1.5px solid #E2E8F0',
            borderRadius 8px, font-body 13px #0F172A):
      Options: "Most Popular" "Price: Low to High"
               "Price: High to Low" "Best Value"

SUB-NAVIGATION TABS (display flex, gap 0, mb 20px,
                      borderBottom '1px solid #E2E8F0',
                      marginTop 16px):

  const tabLabels = {
    resume: 'Resume Builder',
    tests: 'Test Assessments',
    interview: 'AI Interview'
  };

  {Object.entries(tabLabels).map(([key, label]) => (
    <div
      onClick={() => setCreditTab(key)}
      style={{
        height: 44,
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        fontSize: 14, fontWeight: 500,
        color: creditTab===key ? '#BD1313' : '#94A3B8',
        borderBottom: creditTab===key
          ? '2px solid #BD1313' : '2px solid transparent',
        transition: 'all 0.2s'
      }}>
      {key==='resume' && (
        <img src="https://img.icons8.com/3d-fluency/100/resume.png"
             width={16} height={16}
             style={{background:'transparent'}}/>
      )}
      {key==='tests' && (
        <img src="https://img.icons8.com/3d-fluency/100/bookmark-book.png"
             width={16} height={16}
             style={{background:'transparent'}}/>
      )}
      {key==='interview' && (
        <img src="https://img.icons8.com/3d-fluency/100/microphone.png"
             width={16} height={16}
             style={{background:'transparent'}}/>
      )}
      {label}
      {creditTab===key && (
        <span style={{
          background:'#FDF2F2', color:'#BD1313',
          fontFamily:'var(--font-body)',
          fontSize:10, fontWeight:700,
          borderRadius:9999, padding:'1px 6px'
        }}>
          {wallet[key]} left
        </span>
      )}
    </div>
  ))}

PLANS GRID (display grid,
             gridTemplateColumns 'repeat(3,1fr)',
             gap 16px, mb 24px):

  const currentPlans = creditPlans[creditTab];
  const currentWallet = walletCards.find(
    w => w.key === creditTab);

  {currentPlans.map((plan, i) => (
    <div style={{
      background: plan.popular
        ? `linear-gradient(145deg, ${currentWallet.color}08, white)`
        : 'white',
      border: plan.popular
        ? `2px solid ${currentWallet.color}`
        : '1px solid #E2E8F0',
      borderRadius: 20,
      padding: 24,
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s'
    }}
    onMouseEnter: translateY(-4px)
      + shadow 0 12px 32px + card color at 0.15
    >
      {plan.popular && (
        BEST VALUE BADGE:
          position absolute, top 0, right 0
          bg currentWallet.color, color white
          Syne 11px weight 700
          borderRadius '0 20px 0 14px'
          padding '6px 14px'
          "⭐ Best Value"
      )}

      MODULE LABEL (mb 16px):
        display flex, gap 8px, alignItems center

        <img src={currentWallet.icon} width={20} height={20}
             style={{background:'transparent'}}/>

        Plus Jakarta Sans 12px weight 600
        color currentWallet.color
        tabLabels[creditTab]

      PRICE DISPLAY (mb 4px):
        "₹{plan.price}"
        Syne 40px weight 800 #0F172A
        lineHeight 1

      CREDITS LABEL (mb 4px):
        plan.label
        Plus Jakarta Sans 15px weight 600 #0F172A

      PER CREDIT (mb 16px):
        plan.tag
        Plus Jakarta Sans 13px #94A3B8

      DIVIDER: h1px, bg #F1F5F9, mb 16px

      FEATURES LIST (mb 20px):
        display flex, flexDirection column, gap 8px

        Feature rows:
          Each: display flex, gap 8px, alignItems center

          CheckCircle icon 14px:
            plan.popular: currentWallet.color
            else: #16A34A

          Plus Jakarta Sans 13px #475569

        Features per plan type:

        IF credits === 1:
          "Single use credit"
          "Instant delivery"
          "Never expires"
          "Full feature access"

        IF credits === 10:
          "{plan.credits} credits bundle"
          "Save vs single credit"
          "Instant delivery"
          "Never expires"
          "Priority processing"

        IF credits === 50:
          "{plan.credits} credits bundle"
          "Maximum savings"
          "Instant delivery"
          "Never expires"
          "Priority processing"
          "Bulk purchase discount"

      ADD TO CART BUTTON (full width, h48):
        IF plan.popular:
          bg currentWallet.color
          color white, border none
          Syne 15px weight 700
          boxShadow `0 8px 24px ${currentWallet.color}40`
        ELSE:
          bg transparent
          border `1.5px solid ${currentWallet.color}`
          color currentWallet.color
          Plus Jakarta Sans 14px weight 600

        borderRadius 12px, cursor pointer
        transition all 0.2s

        display flex, gap 8px, alignItems center
        justifyContent center

        ShoppingCart icon lucide 18px
        "Add to Cart"

        onClick: () => addToCart(plan, creditTab)

        hover: translateY(-1px) + shadow increase

      EXISTING CREDITS NOTE (below button, mt 8px):
        Plus Jakarta Sans 11px #94A3B8, textAlign center
        "You have {wallet[creditTab]} credits left"
    </div>
  ))}

NEED HELP ROW (mb 24px):
  display flex, justifyContent center, alignItems center
  gap 8px
  Plus Jakarta Sans 13px #64748B
  "Need help?"
  "Contact Support →" link #BD1313 weight 600, cursor pointer
  onClick: () => setScreen('help')

=============================================================
PART 4 — PURCHASE HISTORY
=============================================================

HISTORY HEADER (display flex, justify space-between,
                  align center, mb 12px):
  "Purchase History 📋" Syne 16px weight 700
  "Download All" ghost link #BD1313 13px weight 500
    onClick: () => setTimeout(() =>
      showToast("Downloading history... 📥"), 0)

{purchaseHistory.length === 0 ? (
  Empty state:
    textAlign center, padding '40px 20px'
    <img src="https://img.icons8.com/3d-fluency/100/receipt.png"
         width={64} height={64}
         style={{display:'block', margin:'0 auto 12px',
                 background:'transparent'}}/>
    "No purchases yet" Syne 18px #94A3B8
    "Your purchase history will appear here"
    Plus Jakarta Sans 14px #94A3B8, mt 4px
) : (
  display flex, flexDirection column, gap 8px

  {purchaseHistory.map(purchase => (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: 14,
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }}>
      LEFT: type icon circle (40px, radius 12px):
        resume: bg #FFF1F2
          <img resume icon 22px/>
        tests: bg #FFFBEB
          <img bookmark icon 22px/>
        interview: bg #F0FDF4
          <img mic icon 22px/>

      CENTER (flex 1):
        Row (display flex, gap 8px, alignItems center):
          purchase.type
          Plus Jakarta Sans 14px weight 600 #0F172A

          "{purchase.credits} credits"
          bg #FDF2F2, color #BD1313, border #F5BFBF
          Plus Jakarta Sans 11px weight 700
          borderRadius 9999px, padding '2px 8px'

        purchase.date + " · " + purchase.method
        Plus Jakarta Sans 11px #94A3B8, mt 2px

      RIGHT (display flex, gap 10px, alignItems center):
        Amount:
          "₹{purchase.amount}"
          Syne 16px weight 700 #0F172A

        Status chip:
          completed:
            bg #DCFCE7, color #16A34A, border #86EFAC
            "✓ Completed"
          pending:
            bg #FEF3C7, color #D97706
            "Pending"
          Plus Jakarta Sans 11px weight 700
          borderRadius 9999px, padding '3px 10px'

        Download icon (lucide) 16px #94A3B8
          cursor pointer
          onClick: () => setTimeout(() =>
            showToast("Receipt downloaded! 📄"), 0)
    </div>
  ))}
)}

=============================================================
CART SLIDE-IN PANEL
=============================================================

{showCart && (
  <>
    BACKDROP:
      position fixed, inset 0
      bg rgba(15,23,42,0.4)
      backdropFilter blur(2px)
      zIndex 300
      onClick: () => setShowCart(false)

    CART PANEL:
      position fixed, top 0, right 0
      width 400px, height '100vh'
      bg white
      boxShadow '-8px 0 32px rgba(0,0,0,0.12)'
      zIndex 301
      display flex, flexDirection column
      overflow hidden

      CART HEADER (56px):
        bg white, borderBottom '1px solid #E2E8F0'
        padding '0 20px'
        display flex, alignItems center
        justifyContent space-between

        LEFT (display flex, gap 10px, align center):
          ShoppingCart icon 20px #0F172A
          "Your Cart" Syne 18px weight 700
          {cartCount > 0 && (
            "{cartCount} items" chip:
              bg #FDF2F2, color #BD1313
              Plus Jakarta Sans 12px weight 700
              borderRadius 9999px, padding '2px 10px'
          )}

        X button: onClick: () => setShowCart(false)

      CART BODY (flex 1, overflowY auto, padding '16px 20px'):

        {cart.length === 0 ? (
          Empty state (textAlign center, padding '60px 20px'):
            <img src="https://img.icons8.com/3d-fluency/100/shopping-cart.png"
                 width={80} height={80}
                 style={{display:'block',
                         margin:'0 auto 16px',
                         background:'transparent'}}/>
            "Your cart is empty"
            Syne 18px weight 700 #0F172A, mt 8px
            "Add credits to get started"
            Plus Jakarta Sans 14px #94A3B8, mt 4px

            "Browse Credits →" primary button:
              h44, bg #BD1313, color white
              Syne 14px weight 700, radius 12px
              marginTop 20px
              onClick: () => setShowCart(false)
        ) : (
          CART ITEMS:
            {cart.map(item => (
              <div style={{
                bg: 'white', border: '1px solid #E2E8F0',
                borderRadius: 14, padding: '14px 16px',
                marginBottom: 10
              }}>
                ROW (display flex, gap 12px, align center):
                  Module icon (36px circle, bg soft color):
                    img based on type

                  CENTER (flex 1):
                    item.label
                    Plus Jakarta Sans 13px weight 600 #0F172A
                    "₹{item.price} per pack"
                    Plus Jakarta Sans 11px #94A3B8, mt 1px

                  QTY ADJUSTER (display flex, gap 8px, align center):
                    "-" button (24px circle, bg #F1F5F9):
                      onClick: () => {
                        if (item.qty <= 1)
                          removeFromCart(item.id);
                        else
                          setCart(prev => prev.map(i =>
                            i.id===item.id
                              ? {...i, qty: i.qty-1}
                              : i));
                      }
                    "{item.qty}" Syne 14px weight 700

                    "+" button (24px circle, bg #F1F5F9):
                      onClick: () => setCart(prev =>
                        prev.map(i => i.id===item.id
                          ? {...i, qty: i.qty+1} : i))

                  PRICE:
                    "₹{item.price * item.qty}"
                    Syne 15px weight 700 #BD1313

                  Trash icon 16px #DC2626 cursor pointer:
                    onClick: () => removeFromCart(item.id)
              </div>
            ))}
        )}

      CART FOOTER (auto height):
        bg white, borderTop '1px solid #E2E8F0'
        padding '16px 20px'

        {cart.length > 0 && (
          <>
            ORDER SUMMARY:
              display flex, flexDirection column, gap 8px
              mb 16px

              Each row (display flex, justify space-between):
                Subtotal:
                  "Subtotal" font-body 13px #475569
                  "₹{cartTotal}" font-body 13px weight 600 #0F172A

                Tax:
                  "GST (18%)" font-body 13px #475569
                  "₹{Math.round(cartTotal * 0.18)}"
                  font-body 13px weight 600 #0F172A

                Divider h1px #E2E8F0, my 4px

                TOTAL:
                  "Total" Syne 16px weight 700 #0F172A
                  "₹{Math.round(cartTotal * 1.18)}"
                  Syne 18px weight 800 #BD1313

            RAZORPAY BUTTON (full width h52, mb 10px):
              bg linear-gradient(135deg, #BD1313, #7A0D0D)
              color white, border none
              Syne 16px weight 700, borderRadius 12px
              cursor pointer
              boxShadow '0 8px 24px rgba(189,19,19,0.35)'

              display flex, gap 10px, alignItems center
              justifyContent center

              "🔒 Pay ₹{Math.round(cartTotal * 1.18)}"
              "via Razorpay"
              font-body 11px rgba(255,255,255,0.75), ml 2px

              onClick: () => {
                setShowCart(false);
                setOrderSuccess(true);
                setCart([]);
                Object.keys(wallet).forEach(key => {
                  const typeItems = cart.filter(
                    i => i.type === key);
                  if (typeItems.length > 0) {
                    const totalCredits = typeItems
                      .reduce((sum, i) =>
                        sum + (i.credits * i.qty), 0);
                    setWallet(prev => ({
                      ...prev,
                      [key]: prev[key] + totalCredits
                    }));
                  }
                });
                setTimeout(() => showToast(
                  "Payment successful! Credits added 🎉"), 0);
                setTimeout(() => showXPToast(
                  "+20 XP 🎉"), 200);
              }

            SECURE NOTE:
              display flex, gap 6px, alignItems center
              justifyContent center
              Plus Jakarta Sans 11px #94A3B8

              Lock icon lucide 12px #94A3B8
              "SSL encrypted · Powered by Razorpay"
          </>
        )}
  </>
)}

=============================================================
ORDER SUCCESS MODAL
=============================================================

{orderSuccess && (
  <>
    BACKDROP:
      position fixed, inset 0
      bg rgba(15,23,42,0.6)
      backdropFilter blur(4px)
      zIndex 400

    MODAL (position fixed, top '50%', left '50%',
            transform 'translate(-50%,-50%)',
            bg white, borderRadius 24px,
            padding 32px 28px,
            maxWidth 420px, width '90%',
            boxShadow '0 20px 60px rgba(0,0,0,0.2)',
            zIndex 401, textAlign center):

      <img src="https://img.icons8.com/3d-fluency/100/ok.png"
           width={80} height={80}
           style={{
             display:'block', margin:'0 auto 16px',
             background:'transparent',
             filter:'drop-shadow(0 4px 16px rgba(22,163,74,0.3))'
           }}/>

      "Payment Successful! 🎉"
      Syne 26px weight 800 #0F172A, mb 8px

      "Your credits have been added to your wallet
       and are ready to use immediately."
      Plus Jakarta Sans 14px #64748B, lineHeight 1.6, mb 20px

      WALLET PREVIEW CHIPS (flex-wrap, gap 8px, justify center, mb 24px):
        wallet keys showing updated counts:
        {walletCards.map(card => (
          <div style={{
            bg: card.bg, border: `1px solid ${card.border}`,
            borderRadius: 9999, padding: '6px 14px',
            display: 'flex', gap: 6, alignItems: 'center'
          }}>
            <img src={card.icon} width={14} height={14}
                 style={{background:'transparent'}}/>
            Plus Jakarta Sans 12px weight 700 card.color
            "{wallet[card.key]} {card.label.split(' ')[0]}"
          </div>
        ))}

      "Awesome! Let's get started →" primary (full width h48, mb 10px):
        bg #BD1313, color white, Syne 15px weight 700
        border none, borderRadius 12px, cursor pointer
        onClick: () => {
          setOrderSuccess(false);
          setScreen('dashboard');
        }

      "Stay on Billing" ghost (full width h40):
        color #94A3B8, Plus Jakarta Sans 13px
        onClick: () => setOrderSuccess(false)
  </>
)}

=============================================================
SETTINGS NAV UPDATE
=============================================================

In Settings left nav, add after "Modules":
  {id:'credits', label:'Credits & Billing',
   desc:'Manage credits & payments'}

  onClick: () => setScreen('credits')

=============================================================
ALL BUTTONS FUNCTIONAL
=============================================================

Credits screen:
  ✅ Cart button shows cart count badge
  ✅ "Buy More →" in wallet → scrolls to plans
  ✅ Tab switches show correct plans
  ✅ "Add to Cart" → adds to cart state
  ✅ Cart panel opens on cart button click
  ✅ Cart qty +/- works correctly
  ✅ Remove from cart works
  ✅ Pay button → success modal → wallet updates
  ✅ Success modal → dashboard or stay
  ✅ Download receipt → toast
  ✅ Download All history → toast
  ✅ "Need help?" → setScreen('help')
  ✅ Backdrop closes cart panel
  ✅ Sort dropdown (UI only, no function needed)
  ✅ Category filter tabs switch plans
  ✅ "Browse Credits →" in empty cart → close panel

=============================================================
CRITICAL REMINDERS
=============================================================

✅ ALL showToast wrapped in setTimeout(..., 0)
✅ Brand color #BD1313 throughout
✅ Fonts: Syne + Plus Jakarta Sans only
✅ All image tags: style={{background:'transparent'}}
✅ No floating animations on illustrations
✅ Cart panel slides in from right (same as notifications)
✅ Wallet updates after successful purchase
✅ Razorpay mentioned as payment method
✅ GST 18% calculated in cart total
✅ Credits in ₹ (Indian Rupees)
✅ No full page scroll broken
✅ Device frame maintained

=============================================================
BUILD ORDER
=============================================================

1. Add all state variables at top of file
2. Add creditPlans and purchaseHistory data
3. Add addToCart and wallet helper functions
4. Build Credits & Billing screen
   - Trust badges row
   - Wallet section (3 cards)
   - Buy Credits with tabs and plan cards
   - Purchase history
5. Build Cart slide-in panel
6. Build Order Success modal
7. Update Settings nav
8. Add sidebar CreditCard icon
9. Wire all buttons and navigation
10. Test cart flow end to end

DO NOT rebuild any existing screens.
DO NOT change any working code.
ONLY add Credits & Billing screen and cart.
=============================================================