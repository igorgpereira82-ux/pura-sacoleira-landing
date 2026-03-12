import { useState, useEffect, useRef } from "react";

const WHATSAPP_LINK = "https://wa.me/557399123452";
const APP_LINK = "https://app.purasacoleira.com.br";

/* ─── Animated counter hook ─── */
function useCounter(end, duration = 2000, startOn = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startOn) return;
    let start = 0;
    const step = end / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(id); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [startOn, end, duration]);
  return count;
}

/* ─── Intersection Observer hook ─── */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── Section wrapper with fade-in ─── */
function Section({ children, className = "", id, dark = false }) {
  const [ref, inView] = useInView(0.1);
  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        background: dark ? "#1a0a12" : undefined,
        color: dark ? "#fff" : undefined,
      }}
    >
      {children}
    </section>
  );
}

/* ─── Styles ─── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap');

:root {
  --wine: #8b1a4a;
  --wine-dark: #6b0f38;
  --pink-light: #fce4ef;
  --pink-soft: #fff0f5;
  --dark-bg: #1a0a12;
  --text: #1e293b;
  --text-secondary: #64748b;
  --border-pink: #e8d0da;
  --accent: #e8aac8;
  --bg: #f8fafc;
  --white: #ffffff;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; overflow-x: hidden; max-width: 100vw; }

body {
  font-family: 'DM Sans', sans-serif;
  color: var(--text);
  background: var(--bg);
  overflow-x: hidden;
  max-width: 100vw;
  -webkit-font-smoothing: antialiased;
}

/* ─── NAV ─── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 5%; 
  background: rgba(255,255,255,.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-pink);
  transition: box-shadow .3s;
}
.nav.scrolled { box-shadow: 0 2px 20px rgba(139,26,74,.12); }
.nav-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.25rem; color: var(--wine); display: flex; align-items: center; gap: 8px; text-decoration: none; }
.nav-links { display: flex; gap: 28px; align-items: center; }
.nav-links a { font-size: .9rem; color: var(--text-secondary); text-decoration: none; font-weight: 500; transition: color .2s; }
.nav-links a:hover { color: var(--wine); }
.nav-cta {
  background: linear-gradient(135deg, var(--wine), var(--wine-dark));
  color: #fff !important; padding: 10px 22px; border-radius: 50px;
  font-weight: 600 !important; font-size: .85rem !important;
  transition: transform .2s, box-shadow .2s;
}
.nav-cta:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(139,26,74,.35); }
.hamburger { display: none; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--wine); }

/* ─── HERO ─── */
.hero {
  min-height: 100vh; display: flex; align-items: center;
  padding: 120px 5% 80px;
  background: linear-gradient(160deg, #fff 0%, var(--pink-soft) 40%, var(--pink-light) 100%);
  position: relative; overflow: hidden;
}
.hero::before {
  content: ''; position: absolute; top: -30%; right: -15%;
  width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, rgba(139,26,74,.08) 0%, transparent 70%);
  pointer-events: none;
}
.hero::after {
  content: ''; position: absolute; bottom: -20%; left: -10%;
  width: 400px; height: 400px; border-radius: 50%;
  background: radial-gradient(circle, rgba(232,170,200,.2) 0%, transparent 70%);
  pointer-events: none;
}
.hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; max-width: 1200px; margin: 0 auto; width: 100%; position: relative; z-index: 1; }
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--white); border: 1px solid var(--border-pink);
  padding: 8px 18px; border-radius: 50px; font-size: .82rem;
  color: var(--wine); font-weight: 600; margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(139,26,74,.08);
}
.hero-title {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(2rem, 8vw, 3.6rem); line-height: 1.1;
  color: var(--text); margin-bottom: 12px;
  word-break: break-word;
}
.hero-title span { color: var(--wine); display: block; }
.hero-subtitle {
  font-size: 1.15rem; color: var(--text-secondary);
  line-height: 1.6; margin-bottom: 32px; max-width: 480px;
}
.hero-buttons { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 36px; }
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  background: linear-gradient(135deg, var(--wine), var(--wine-dark));
  color: #fff; padding: 16px 32px; border-radius: 50px;
  font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 1rem;
  text-decoration: none; border: none; cursor: pointer;
  transition: transform .25s, box-shadow .25s;
  box-shadow: 0 4px 20px rgba(139,26,74,.3);
}
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(139,26,74,.4); }
.btn-secondary {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--white); color: var(--wine);
  padding: 16px 28px; border-radius: 50px;
  font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: .95rem;
  text-decoration: none; border: 2px solid var(--border-pink);
  transition: background .2s, border-color .2s;
}
.btn-secondary:hover { background: var(--pink-soft); border-color: var(--wine); }
.hero-social-proof { display: flex; align-items: center; gap: 12px; }
.hero-avatars { display: flex; }
.hero-avatars span {
  width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: .9rem; margin-left: -8px; border: 2px solid #fff;
  background: linear-gradient(135deg, var(--wine), var(--accent));
}
.hero-avatars span:first-child { margin-left: 0; }
.hero-social-text { font-size: .85rem; color: var(--text-secondary); line-height: 1.4; }
.hero-social-text strong { color: var(--text); }

/* phone mockup */
.hero-phone {
  display: flex; justify-content: center; position: relative;
}
.phone-frame {
  width: 280px; height: 560px; border-radius: 36px;
  background: var(--dark-bg);
  padding: 12px; position: relative;
  box-shadow: 0 20px 60px rgba(139,26,74,.25), 0 0 0 2px rgba(139,26,74,.1);
  animation: phoneFloat 4s ease-in-out infinite;
}
@keyframes phoneFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
.phone-screen {
  width: 100%; height: 100%; border-radius: 26px; overflow: hidden;
  background: linear-gradient(180deg, var(--pink-soft) 0%, #fff 100%);
  display: flex; flex-direction: column;
}
.phone-header {
  background: linear-gradient(135deg, var(--wine), var(--wine-dark));
  padding: 24px 16px 16px; color: #fff;
}
.phone-header-top { font-size: .65rem; opacity: .7; margin-bottom: 8px; }
.phone-header h3 { font-family: 'Syne', sans-serif; font-size: 1rem; margin-bottom: 4px; }
.phone-header p { font-size: .7rem; opacity: .8; }
.phone-body { padding: 12px; flex: 1; display: flex; flex-direction: column; gap: 8px; }
.phone-card {
  background: #fff; border-radius: 12px; padding: 12px;
  border: 1px solid var(--border-pink);
  display: flex; align-items: center; gap: 10px;
}
.phone-card-icon { font-size: 1.4rem; }
.phone-card-info { flex: 1; }
.phone-card-info h4 { font-size: .75rem; font-weight: 600; color: var(--text); }
.phone-card-info p { font-size: .65rem; color: var(--text-secondary); }
.phone-card-value {
  font-family: 'Space Grotesk', sans-serif; font-weight: 700;
  font-size: .8rem; color: var(--wine);
}
.phone-glow {
  position: absolute; width: 200px; height: 200px; border-radius: 50%;
  background: radial-gradient(circle, rgba(139,26,74,.15) 0%, transparent 70%);
  top: 50%; left: 50%; transform: translate(-50%, -50%);
  pointer-events: none; z-index: -1;
}

/* ─── PAIN POINTS ─── */
.pain-section { padding: 100px 5%; background: var(--white); }
.section-center { max-width: 1200px; margin: 0 auto; }
.section-label {
  font-family: 'DM Sans', sans-serif; font-size: .8rem; font-weight: 700;
  color: var(--wine); text-transform: uppercase; letter-spacing: 2px;
  text-align: center; margin-bottom: 12px;
}
.section-title {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(1.8rem, 3.5vw, 2.6rem); text-align: center;
  color: var(--text); margin-bottom: 16px; line-height: 1.15;
}
.section-subtitle {
  font-size: 1.05rem; color: var(--text-secondary);
  text-align: center; max-width: 560px; margin: 0 auto 52px; line-height: 1.6;
}
.pain-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }
.pain-card {
  background: var(--pink-soft); border: 1px solid var(--border-pink);
  border-radius: 16px; padding: 32px 24px; text-align: center;
  transition: transform .3s, box-shadow .3s;
  position: relative; overflow: hidden;
}
.pain-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--wine), var(--accent));
  opacity: 0; transition: opacity .3s;
}
.pain-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(139,26,74,.12); }
.pain-card:hover::before { opacity: 1; }
.pain-icon { font-size: 2.4rem; margin-bottom: 16px; display: block; }
.pain-card h3 { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.1rem; margin-bottom: 10px; color: var(--text); }
.pain-card p { font-size: .92rem; color: var(--text-secondary); line-height: 1.6; }

/* ─── HOW IT WORKS ─── */
.how-section { padding: 100px 5%; background: var(--bg); }
.steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; position: relative; }
.steps-grid::before {
  content: ''; position: absolute; top: 60px; left: 16%; right: 16%;
  height: 2px; background: linear-gradient(90deg, var(--border-pink), var(--wine), var(--border-pink));
  z-index: 0;
}
.step-card { text-align: center; position: relative; z-index: 1; }
.step-number {
  width: 64px; height: 64px; border-radius: 50%;
  background: linear-gradient(135deg, var(--wine), var(--wine-dark));
  color: #fff; font-family: 'Space Grotesk', sans-serif; font-weight: 700;
  font-size: 1.4rem; display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 4px 20px rgba(139,26,74,.3);
}
.step-card h3 { font-family: 'Syne', sans-serif; font-size: 1.15rem; font-weight: 700; margin-bottom: 8px; }
.step-card p { font-size: .9rem; color: var(--text-secondary); line-height: 1.5; max-width: 280px; margin: 0 auto; }

/* ─── FEATURES ─── */
.features-section { padding: 100px 5%; background: var(--white); }
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
.feature-card {
  display: flex; gap: 16px; padding: 24px; border-radius: 16px;
  border: 1px solid transparent;
  transition: background .3s, border-color .3s, transform .3s;
}
.feature-card:hover { background: var(--pink-soft); border-color: var(--border-pink); transform: translateY(-3px); }
.feature-icon {
  width: 52px; height: 52px; border-radius: 14px;
  background: var(--pink-light); display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem; flex-shrink: 0;
}
.feature-card h3 { font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 1rem; margin-bottom: 6px; color: var(--text); }
.feature-card p { font-size: .88rem; color: var(--text-secondary); line-height: 1.5; }

/* ─── WHATSAPP SHOWCASE ─── */
.whatsapp-section {
  padding: 100px 5%;
  background: linear-gradient(160deg, var(--dark-bg) 0%, #2d1020 100%);
  color: #fff;
}
.whatsapp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; max-width: 1100px; margin: 0 auto; }
.whatsapp-content h2 {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(1.6rem, 6.5vw, 2.4rem); margin-bottom: 16px; line-height: 1.2;
  word-break: normal; overflow-wrap: normal;
}
.whatsapp-content h2 span { color: var(--accent); }
.whatsapp-content p { color: rgba(255,255,255,.7); font-size: 1.05rem; line-height: 1.6; margin-bottom: 28px; }
.whatsapp-features { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }
.whatsapp-feature {
  display: flex; align-items: center; gap: 12px;
  font-size: .95rem; color: rgba(255,255,255,.85);
}
.whatsapp-feature span {
  width: 32px; height: 32px; border-radius: 50%;
  background: rgba(139,26,74,.4); display: flex; align-items: center; justify-content: center;
  font-size: .9rem;
}
.whatsapp-mockup { display: flex; justify-content: center; }
.chat-bubble-container {
  background: rgba(255,255,255,.06); border-radius: 20px; padding: 24px;
  border: 1px solid rgba(255,255,255,.1); max-width: 340px; width: 100%;
}
.chat-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,.1); }
.chat-avatar {
  width: 40px; height: 40px; border-radius: 50%;
  background: linear-gradient(135deg, var(--wine), var(--accent));
  display: flex; align-items: center; justify-content: center; font-size: 1rem;
}
.chat-name { font-weight: 600; font-size: .9rem; }
.chat-status { font-size: .75rem; color: rgba(255,255,255,.5); }
.chat-bubble {
  background: rgba(139,26,74,.3); border-radius: 16px 16px 16px 4px;
  padding: 14px 18px; font-size: .85rem; line-height: 1.55;
  color: rgba(255,255,255,.9); margin-bottom: 12px;
  border: 1px solid rgba(139,26,74,.2);
}
.chat-time { font-size: .7rem; color: rgba(255,255,255,.4); text-align: right; }

/* ─── STATS ─── */
.stats-section { padding: 60px 5%; background: var(--pink-light); }
.stats-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
  max-width: 1000px; margin: 0 auto; text-align: center;
}
.stat-item h3 {
  font-family: 'Space Grotesk', sans-serif; font-weight: 700;
  font-size: clamp(1.8rem, 3vw, 2.6rem); color: var(--wine);
}
.stat-item p { font-size: .85rem; color: var(--text-secondary); margin-top: 4px; }

/* ─── TESTIMONIALS ─── */
.testimonials-section { padding: 100px 5%; background: var(--bg); }
.testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.testimonial-card {
  background: var(--white); border-radius: 16px; padding: 28px;
  border: 1px solid var(--border-pink);
  transition: transform .3s, box-shadow .3s;
}
.testimonial-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(139,26,74,.1); }
.testimonial-stars { color: #f59e0b; font-size: 1rem; margin-bottom: 14px; letter-spacing: 2px; }
.testimonial-text { font-size: .95rem; color: var(--text-secondary); line-height: 1.6; font-style: italic; margin-bottom: 18px; }
.testimonial-author { display: flex; align-items: center; gap: 12px; }
.testimonial-avatar {
  width: 44px; height: 44px; border-radius: 50%;
  background: linear-gradient(135deg, var(--pink-light), var(--accent));
  display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
}
.testimonial-name { font-weight: 600; font-size: .9rem; }
.testimonial-role { font-size: .8rem; color: var(--text-secondary); }

/* ─── PRICING ─── */
.pricing-section { padding: 100px 5%; background: var(--white); }
.pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 28px; max-width: 800px; margin: 0 auto; }
.pricing-card {
  border-radius: 20px; padding: 36px 28px; text-align: center;
  border: 2px solid var(--border-pink); background: var(--white);
  transition: transform .3s, box-shadow .3s; position: relative;
}
.pricing-card.featured {
  border-color: var(--wine);
  background: linear-gradient(180deg, var(--pink-soft) 0%, #fff 100%);
  box-shadow: 0 8px 40px rgba(139,26,74,.15);
  transform: scale(1.03);
}
.pricing-badge {
  position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
  background: linear-gradient(135deg, var(--wine), var(--wine-dark));
  color: #fff; padding: 6px 20px; border-radius: 50px;
  font-size: .75rem; font-weight: 700; white-space: nowrap;
}
.pricing-card h3 { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.3rem; margin-bottom: 8px; margin-top: 8px; }
.pricing-price {
  font-family: 'Space Grotesk', sans-serif; font-weight: 700;
  font-size: 2.6rem; color: var(--wine); margin: 16px 0 4px;
}
.pricing-price small { font-size: .9rem; font-weight: 500; color: var(--text-secondary); }
.pricing-period { font-size: .85rem; color: var(--text-secondary); margin-bottom: 24px; }
.pricing-features { text-align: left; margin-bottom: 28px; display: flex; flex-direction: column; gap: 10px; }
.pricing-feature { display: flex; align-items: center; gap: 10px; font-size: .9rem; color: var(--text); }
.pricing-feature.disabled { color: var(--text-secondary); opacity: .5; }
.pricing-feature span { font-size: .85rem; }

/* ─── FAQ ─── */
.faq-section { padding: 100px 5%; background: var(--bg); }
.faq-list { max-width: 700px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px; }
.faq-item {
  background: var(--white); border: 1px solid var(--border-pink);
  border-radius: 14px; overflow: hidden; transition: box-shadow .3s;
}
.faq-item:hover { box-shadow: 0 4px 20px rgba(139,26,74,.08); }
.faq-question {
  width: 100%; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center;
  background: none; border: none; cursor: pointer;
  font-family: 'DM Sans', sans-serif; font-size: .95rem; font-weight: 600;
  color: var(--text); text-align: left;
}
.faq-arrow { font-size: 1.2rem; color: var(--wine); transition: transform .3s; }
.faq-arrow.open { transform: rotate(180deg); }
.faq-answer { padding: 0 24px 20px; font-size: .9rem; color: var(--text-secondary); line-height: 1.6; }

/* ─── CTA FINAL ─── */
.cta-section {
  padding: 100px 5%; text-align: center;
  background: linear-gradient(160deg, var(--dark-bg) 0%, #2d1020 100%);
  color: #fff; position: relative; overflow: hidden;
}
.cta-section::before {
  content: ''; position: absolute; width: 500px; height: 500px; border-radius: 50%;
  background: radial-gradient(circle, rgba(139,26,74,.2), transparent 70%);
  top: -200px; right: -100px;
}
.cta-section h2 {
  font-family: 'Playfair Display', serif; font-weight: 700;
  font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 16px; position: relative;
}
.cta-section p { color: rgba(255,255,255,.7); font-size: 1.1rem; margin-bottom: 36px; max-width: 500px; margin-left: auto; margin-right: auto; position: relative; }
.cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; position: relative; }
.btn-white {
  display: inline-flex; align-items: center; gap: 8px;
  background: #fff; color: var(--wine);
  padding: 16px 36px; border-radius: 50px;
  font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 1rem;
  text-decoration: none; border: none; cursor: pointer;
  transition: transform .25s, box-shadow .25s;
  box-shadow: 0 4px 20px rgba(0,0,0,.15);
}
.btn-white:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(0,0,0,.25); }
.btn-outline-white {
  display: inline-flex; align-items: center; gap: 8px;
  background: transparent; color: #fff;
  padding: 16px 28px; border-radius: 50px;
  font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: .95rem;
  text-decoration: none; border: 2px solid rgba(255,255,255,.3);
  transition: border-color .2s, background .2s;
}
.btn-outline-white:hover { border-color: #fff; background: rgba(255,255,255,.1); }

/* ─── FOOTER ─── */
.trust-bar {
  padding: 24px 5%; background: var(--wine);
}
.trust-items {
  display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;
  max-width: 1200px; margin: 0 auto;
}
.trust-item {
  font-size: .85rem; color: rgba(255,255,255,.9); font-weight: 500;
  white-space: nowrap;
}
.footer { padding: 56px 5% 28px; background: var(--dark-bg); color: rgba(255,255,255,.6); }
.footer-grid {
  display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 40px;
  max-width: 1200px; margin: 0 auto 36px;
}
.footer-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.1rem; color: #fff; margin-bottom: 12px; }
.footer-desc { font-size: .88rem; line-height: 1.6; margin-bottom: 8px; }
.footer-domain { font-size: .82rem; color: var(--accent); font-weight: 600; }
.footer-heading { font-size: .82rem; font-weight: 700; color: rgba(255,255,255,.9); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 16px; }
.footer-nav-links { display: flex; flex-direction: column; gap: 10px; }
.footer-nav-links a { color: rgba(255,255,255,.5); text-decoration: none; font-size: .88rem; transition: color .2s; }
.footer-nav-links a:hover { color: #fff; }
.footer-copy { text-align: center; padding-top: 24px; border-top: 1px solid rgba(255,255,255,.1); font-size: .8rem; max-width: 1200px; margin-left: auto; margin-right: auto; }

/* ─── WHATSAPP FAB ─── */
.whatsapp-fab {
  position: fixed; bottom: 24px; right: 24px; z-index: 99;
  width: 60px; height: 60px; border-radius: 50%;
  background: #25d366; color: #fff; font-size: 1.8rem;
  display: flex; align-items: center; justify-content: center;
  text-decoration: none; border: none; cursor: pointer;
  box-shadow: 0 4px 20px rgba(37,211,102,.4);
  transition: transform .25s, box-shadow .25s;
  animation: fabPulse 2s ease-in-out infinite;
}
.whatsapp-fab:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(37,211,102,.5); }
@keyframes fabPulse {
  0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,.4); }
  50% { box-shadow: 0 4px 30px rgba(37,211,102,.6), 0 0 0 8px rgba(37,211,102,.1); }
}

/* ─── MOBILE ─── */
@media (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; text-align: center; }
  .hero-subtitle { margin-left: auto; margin-right: auto; }
  .hero-buttons { justify-content: center; }
  .hero-social-proof { justify-content: center; }
  .hero-phone { order: -1; margin-bottom: 20px; }
  .phone-frame { width: 220px; height: 440px; }
  .steps-grid { grid-template-columns: 1fr; }
  .steps-grid::before { display: none; }
  .whatsapp-grid { grid-template-columns: 1fr; text-align: center; }
  .whatsapp-features { align-items: center; }
  .whatsapp-mockup { order: -1; margin-bottom: 20px; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .nav-links { display: none; }
  .hamburger { display: block; }
  .pricing-card.featured { transform: scale(1); }
}
@media (max-width: 600px) {
  .hero { padding: 100px 5% 60px; }
  .pain-grid, .features-grid, .testimonials-grid, .pricing-grid { grid-template-columns: 1fr; }
  .footer-content { flex-direction: column; text-align: center; }
  .footer-grid { grid-template-columns: 1fr; text-align: center; }
  .trust-items { gap: 16px; }
}
`;

/* ─── DATA ─── */
const pains = [
  { icon: "📓", title: "Caderno perdido?", desc: "Nunca mais perca suas anotações. Tudo salvo na nuvem, seguro no seu celular." },
  { icon: "💸", title: "Dinheiro perdido?", desc: "Controle cada venda, cada parcela, cada fiado. Não deixe nenhum centavo escapar." },
  { icon: "😰", title: "Vergonha de cobrar?", desc: "Lembretes automáticos pelo WhatsApp. Profissional, educado, sem constrangimento." },
  { icon: "🤯", title: "Tudo bagunçado?", desc: "Chega de anotação confusa. Tenha tudo organizado num app bonito e fácil de usar." },
];

const steps = [
  { num: "1", title: "Cadastre", desc: "Crie sua conta grátis e cadastre seus produtos e clientes em minutos." },
  { num: "2", title: "Venda", desc: "Registre cada venda, escolha a forma de pagamento e parcele se precisar." },
  { num: "3", title: "Receba", desc: "Acompanhe seus fiados, envie cobranças pelo WhatsApp e nunca perca dinheiro." },
];

const features = [
  { icon: "🛍️", title: "Vendas Completas", desc: "PIX, Dinheiro, Cartão ou Fiado. Parcelamento automático com datas." },
  { icon: "📒", title: "Caderninho Digital", desc: "Extrato por cliente, parcelas a vencer, pagamento parcial ou total." },
  { icon: "📱", title: "Cobranças WhatsApp", desc: "Lembretes automáticos, em massa, com mensagem profissional." },
  { icon: "📦", title: "Controle de Estoque", desc: "Cadastre produtos com foto. Estoque atualiza sozinho a cada venda." },
  { icon: "📊", title: "Relatórios", desc: "Total vendido, ticket médio, ranking de clientes, meta mensal." },
  { icon: "🧾", title: "Recibo Digital", desc: "Recibo automático com detalhes completos. Envie por WhatsApp." },
  { icon: "☁️", title: "Dados na Nuvem", desc: "Seus dados seguros e acessíveis de qualquer lugar. Funciona offline!" },
  { icon: "👩‍💼", title: "Gestão de Clientes", desc: "Cadastro completo, saldo devedor, histórico de compras e pagamentos." },
];

const testimonials = [
  { name: "Maria Silva", role: "Revendedora há 8 anos", text: "Eu perdia tudo no caderninho. Agora tenho controle de cada cliente, cada parcela. Já recuperei dinheiro que achei que tinha perdido!", stars: 5, avatar: "👩🏽" },
  { name: "Ana Santos", role: "Sacoleira autônoma", text: "A cobrança pelo WhatsApp é um sonho. Minhas clientes pagam em dia agora, sem eu precisar ficar ligando uma por uma.", stars: 5, avatar: "👩🏻" },
  { name: "Joana Oliveira", role: "Revendedora de moda", text: "O app é tão fácil de usar que em 5 minutos eu já tava cadastrando minhas clientes. Recomendo pra toda sacoleira!", stars: 5, avatar: "👩🏾" },
];

const faqs = [
  { q: "Preciso pagar pra usar?", a: "Não! Você tem 14 dias grátis com acesso total. Depois, pode continuar no plano gratuito (limitado) ou assinar o Premium por apenas R$ 29,90/mês." },
  { q: "Funciona sem internet?", a: "Sim! Suas vendas são salvas no celular e sincronizam com a nuvem quando a internet voltar. Você nunca perde seus dados." },
  { q: "Preciso baixar na loja?", a: "Não precisa! O Pura Sacoleira funciona direto pelo navegador do celular, como um app. É só acessar o link e salvar na tela inicial." },
  { q: "Meus dados ficam seguros?", a: "Com certeza! Seus dados ficam salvos na nuvem com criptografia. Só você tem acesso à sua conta." },
  { q: "Como funciona a cobrança pelo WhatsApp?", a: "O app gera uma mensagem profissional e educada com os detalhes da dívida. Você só precisa tocar no botão e enviar. Sem constrangimento!" },
  { q: "Posso cancelar quando quiser?", a: "Sim, sem burocracia. Você cancela quando quiser e continua usando o plano gratuito." },
];

const pricingFree = [
  { text: "Até 3 clientes", ok: true },
  { text: "Até 10 vendas/mês", ok: true },
  { text: "Controle de estoque", ok: true },
  { text: "Relatórios completos", ok: false },
  { text: "Lembretes WhatsApp", ok: false },
  { text: "Parcelamento", ok: false },
];

const pricingPremium = [
  { text: "Clientes ilimitados", ok: true },
  { text: "Vendas ilimitadas", ok: true },
  { text: "Controle de estoque", ok: true },
  { text: "Relatórios completos", ok: true },
  { text: "Lembretes WhatsApp", ok: true },
  { text: "Parcelamento de vendas", ok: true },
];

/* ─── COMPONENT ─── */
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [statsRef, statsInView] = useInView(0.3);

  const c1 = useCounter(500, 2000, statsInView);
  const c2 = useCounter(15000, 2500, statsInView);
  const c3 = useCounter(98, 2000, statsInView);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#" className="nav-logo">🛍️ Pura Sacoleira</a>
        <div className="nav-links">
          <a href="#funcionalidades">Funcionalidades</a>
          <a href="#planos">Planos</a>
          <a href="#faq">FAQ</a>
          <a href={APP_LINK} className="nav-cta" target="_blank" rel="noopener">Teste Grátis</a>
        </div>
        <button className="hamburger" onClick={() => window.open(APP_LINK, '_blank')}>☰</button>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-grid">
          <div>
            <div className="hero-badge">✨ 14 dias grátis — sem cartão</div>
            <h1 className="hero-title">
              Tchau Caderninho.
              <span>Seu fiado agora é digital.</span>
            </h1>
            <p className="hero-subtitle">
              O app feito pra sacoleira que quer parar de perder dinheiro.
              Controle vendas, fiado e cobranças na palma da mão.
            </p>
            <div className="hero-buttons">
              <a href={APP_LINK} className="btn-primary" target="_blank" rel="noopener">
                Começar Grátis →
              </a>
              <a href="#funcionalidades" className="btn-secondary">
                Ver funcionalidades
              </a>
            </div>
            <div className="hero-social-proof">
              <div className="hero-avatars">
                <span>👩🏽</span><span>👩🏻</span><span>👩🏾</span><span>👩🏿</span>
              </div>
              <div className="hero-social-text">
                <strong>+500 sacoleiras</strong> já organizam<br />suas vendas com o app
              </div>
            </div>
          </div>
          <div className="hero-phone">
            <div className="phone-glow" />
            <div className="phone-frame">
              <div className="phone-screen">
                <div className="phone-header">
                  <div className="phone-header-top">Pura Sacoleira</div>
                  <h3>Olá, Empreendedora! 👋</h3>
                  <p>Suas vendas de hoje</p>
                </div>
                <div className="phone-body">
                  <div className="phone-card">
                    <div className="phone-card-icon">💰</div>
                    <div className="phone-card-info"><h4>Vendas Hoje</h4><p>12 vendas realizadas</p></div>
                    <div className="phone-card-value">R$ 847</div>
                  </div>
                  <div className="phone-card">
                    <div className="phone-card-icon">📒</div>
                    <div className="phone-card-info"><h4>Fiado Pendente</h4><p>8 clientes devendo</p></div>
                    <div className="phone-card-value">R$ 1.250</div>
                  </div>
                  <div className="phone-card">
                    <div className="phone-card-icon">📦</div>
                    <div className="phone-card-info"><h4>Estoque</h4><p>3 produtos com alerta</p></div>
                    <div className="phone-card-value">⚠️</div>
                  </div>
                  <div className="phone-card">
                    <div className="phone-card-icon">📊</div>
                    <div className="phone-card-info"><h4>Meta do Mês</h4><p>R$ 3.200 de R$ 5.000</p></div>
                    <div className="phone-card-value">64%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PAIN POINTS */}
      <Section className="pain-section">
        <div className="section-center">
          <div className="section-label">Você se identifica?</div>
          <h2 className="section-title">Problemas que toda sacoleira conhece</h2>
          <p className="section-subtitle">
            Se você já passou por alguma dessas situações, o Pura Sacoleira foi feito pra você.
          </p>
          <div className="pain-grid">
            {pains.map((p, i) => (
              <div className="pain-card" key={i}>
                <span className="pain-icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section className="how-section">
        <div className="section-center">
          <div className="section-label">Simples assim</div>
          <h2 className="section-title">Como funciona?</h2>
          <p className="section-subtitle">
            Em 3 passos você já está no controle das suas vendas.
          </p>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div className="step-card" key={i}>
                <div className="step-number">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FEATURES */}
      <Section className="features-section" id="funcionalidades">
        <div className="section-center">
          <div className="section-label">Tudo que você precisa</div>
          <h2 className="section-title">Funcionalidades feitas pra sacoleira</h2>
          <p className="section-subtitle">
            Cada detalhe pensado pra facilitar sua rotina de vendas.
          </p>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* WHATSAPP SHOWCASE */}
      <Section className="whatsapp-section">
        <div className="whatsapp-grid">
          <div className="whatsapp-content">
            <div className="section-label" style={{ textAlign: "left", color: "var(--accent)" }}>Cobrança inteligente</div>
            <h2>Cobre suas clientes <span>sem constrangimento</span></h2>
            <p>
              O app gera mensagens profissionais e educadas prontas pra enviar pelo WhatsApp.
              Suas clientes recebem o lembrete, pagam em dia, e ninguém fica chateada.
            </p>
            <div className="whatsapp-features">
              <div className="whatsapp-feature"><span>✅</span> Lembretes automáticos de cobrança</div>
              <div className="whatsapp-feature"><span>✅</span> Cobranças em massa para vários clientes</div>
              <div className="whatsapp-feature"><span>✅</span> Comprovante de pagamento por WhatsApp</div>
              <div className="whatsapp-feature"><span>✅</span> Recibo digital completo com detalhes</div>
            </div>
            <a href={APP_LINK} className="btn-primary" target="_blank" rel="noopener">
              Quero cobrar sem vergonha →
            </a>
          </div>
          <div className="whatsapp-mockup">
            <div className="chat-bubble-container">
              <div className="chat-header">
                <div className="chat-avatar">🛍️</div>
                <div>
                  <div className="chat-name">Pura Sacoleira</div>
                  <div className="chat-status">Lembrete automático</div>
                </div>
              </div>
              <div className="chat-bubble">
                Oi, Dona Cláudia! 😊 Tudo bem?
                <br /><br />
                Passando pra lembrar que a parcela 2/3 no valor de R$ 85,00 vence dia 15/03.
                <br /><br />
                Qualquer dúvida, é só me chamar! 💕
              </div>
              <div className="chat-time">10:32 ✓✓</div>
            </div>
          </div>
        </div>
      </Section>

      {/* STATS */}
      <div className="stats-section" ref={statsRef}>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>+{c1}</h3>
            <p>Sacoleiras ativas</p>
          </div>
          <div className="stat-item">
            <h3>+{c2.toLocaleString("pt-BR")}</h3>
            <p>Vendas registradas</p>
          </div>
          <div className="stat-item">
            <h3>{c3}%</h3>
            <p>Aprovação</p>
          </div>
          <div className="stat-item">
            <h3>R$ 29,90</h3>
            <p>Por mês no Premium</p>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <Section className="testimonials-section">
        <div className="section-center">
          <div className="section-label">Depoimentos</div>
          <h2 className="section-title">O que dizem nossas sacoleiras</h2>
          <p className="section-subtitle">
            Quem usa, aprova. Veja o que elas estão falando.
          </p>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-stars">{"⭐".repeat(t.stars)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.avatar}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PRICING */}
      <Section className="pricing-section" id="planos">
        <div className="section-center">
          <div className="section-label">Planos</div>
          <h2 className="section-title">Escolha o melhor pra você</h2>
          <p className="section-subtitle">
            Comece grátis. Evolua quando estiver pronta.
          </p>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Gratuito</h3>
              <div className="pricing-price">R$ 0<small>/mês</small></div>
              <div className="pricing-period">Pra sempre grátis</div>
              <div className="pricing-features">
                {pricingFree.map((f, i) => (
                  <div className={`pricing-feature ${!f.ok ? "disabled" : ""}`} key={i}>
                    <span>{f.ok ? "✅" : "❌"}</span> {f.text}
                  </div>
                ))}
              </div>
              <a href={APP_LINK} className="btn-secondary" target="_blank" rel="noopener" style={{ width: "100%", justifyContent: "center" }}>
                Começar Grátis
              </a>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-badge">⭐ Mais escolhido</div>
              <h3>Premium</h3>
              <div className="pricing-price">R$ 29,90<small>/mês</small></div>
              <div className="pricing-period">14 dias grátis • Sem cartão</div>
              <div className="pricing-features">
                {pricingPremium.map((f, i) => (
                  <div className="pricing-feature" key={i}>
                    <span>✅</span> {f.text}
                  </div>
                ))}
              </div>
              <a href={APP_LINK} className="btn-primary" target="_blank" rel="noopener" style={{ width: "100%", justifyContent: "center" }}>
                Teste Grátis por 14 dias →
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="faq-section" id="faq">
        <div className="section-center">
          <div className="section-label">Dúvidas?</div>
          <h2 className="section-title">Perguntas Frequentes</h2>
          <p className="section-subtitle">
            Tudo que você precisa saber antes de começar.
          </p>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div className="faq-item" key={i}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                  <span className={`faq-arrow ${openFaq === i ? "open" : ""}`}>▼</span>
                </button>
                {openFaq === i && <div className="faq-answer">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA FINAL */}
      <div className="cta-section">
        <h2>De sacoleira a empresária.<br />Comece agora.</h2>
        <p>14 dias grátis. Sem cartão. Sem compromisso. Só organização.</p>
        <div className="cta-buttons">
          <a href={APP_LINK} className="btn-white" target="_blank" rel="noopener">
            🛍️ Começar Grátis Agora
          </a>
          <a href={WHATSAPP_LINK} className="btn-outline-white" target="_blank" rel="noopener">
            💬 Falar no WhatsApp
          </a>
        </div>
      </div>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="trust-items">
          <div className="trust-item">🔒 Dados criptografados</div>
          <div className="trust-item">📋 Em conformidade com a LGPD</div>
          <div className="trust-item">☁️ Backup automático na nuvem</div>
          <div className="trust-item">📱 Funciona offline</div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">🛍️ Pura Sacoleira</div>
            <p className="footer-desc">O app que transforma sacoleira em empresária. Controle vendas, fiado e cobranças de forma profissional.</p>
            <p className="footer-domain">purasacoleira.com.br</p>
          </div>
          <div>
            <div className="footer-heading">Navegação</div>
            <div className="footer-nav-links">
              <a href="#funcionalidades">Funcionalidades</a>
              <a href="#planos">Planos</a>
              <a href="#faq">Dúvidas Frequentes</a>
              <a href={APP_LINK} target="_blank" rel="noopener">Acessar o App</a>
            </div>
          </div>
          <div>
            <div className="footer-heading">Contato</div>
            <div className="footer-nav-links">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener">💬 WhatsApp: (73) 9912-3452</a>
              <a href="mailto:contato@purasacoleira.com.br">📧 contato@purasacoleira.com.br</a>
            </div>
            <div style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
              <a href="https://www.instagram.com/purasacoleira/" target="_blank" rel="noopener" aria-label="Instagram" style={{ color: "rgba(255,255,255,.6)", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#fff"} onMouseOut={(e) => e.currentTarget.style.color = "rgba(255,255,255,.6)"}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61585022354978" target="_blank" rel="noopener" aria-label="Facebook" style={{ color: "rgba(255,255,255,.6)", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#fff"} onMouseOut={(e) => e.currentTarget.style.color = "rgba(255,255,255,.6)"}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-copy">
          © 2025 Pura Sacoleira — Todos os direitos reservados. | <a href="#" style={{color:"rgba(255,255,255,.5)"}}>Política de Privacidade</a> | <a href="#" style={{color:"rgba(255,255,255,.5)"}}>Termos de Uso</a>
        </div>
      </footer>

      {/* WHATSAPP FAB */}
      <a href={WHATSAPP_LINK} className="whatsapp-fab" target="_blank" rel="noopener" title="Fale conosco no WhatsApp">
        💬
      </a>
    </>
  );
}
