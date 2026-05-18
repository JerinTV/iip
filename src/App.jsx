import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Lottie from "lottie-react";
import academiaIcon from "./assets/icons/academia.svg";
import advocacyIcon from "./assets/icons/advocacy.svg";
import bookIcon from "./assets/icons/book.svg";
import briefcaseIcon from "./assets/icons/briefcase.svg";
import certificateIcon from "./assets/icons/certificate.svg";
import dataIcon from "./assets/icons/data.svg";
import developmentIcon from "./assets/icons/development.svg";
import globalSouthIcon from "./assets/icons/global-south.svg";
import governmentIcon from "./assets/icons/government.svg";
import medalIcon from "./assets/icons/medal.svg";
import mentorIcon from "./assets/icons/mentor.svg";
import researchIcon from "./assets/icons/research.svg";
import sdgIcon from "./assets/icons/sdg.svg";
import thinkingIcon from "./assets/icons/thinking.svg";
import thinkTankIcon from "./assets/icons/think-tank.svg";
import writingIcon from "./assets/icons/writing.svg";
import learnImg1 from "./1.jpg";
import learnImg2 from "./2.jpg";
import learnImg3 from "./3.jpg";
import learnImg4 from "./4.jpg";
import learnImg5 from "./5.jpg";
import learnImg6 from "./6.jpg";

// ─── INLINE LOGO SVG (replaces the imported PNG) ───────────────────────────
const NavLogoImage = () => (
  <img className="nav-logo-img" src="/logo.png" alt="IISPPR logo" />
);

// ─── STYLES ─────────────────────────────────────────────────────────────────
const ChevronDownIcon = (props) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function useLottieJson(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return;
    let alive = true;
    const controller = new AbortController();

    (async () => {
      try {
        setError(false);
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("Failed to load lottie: " + res.status);
        const json = await res.json();
        if (alive) setData(json);
      } catch (e) {
        if (!alive) return;
        if (e?.name === "AbortError") return;
        setError(true);
      }
    })();

    return () => {
      alive = false;
      controller.abort();
    };
  }, [url]);

  return { data, error };
}

function AwardAnim({ url, fallbackIcon, fallbackMp4Url, label }) {
  const { data, error } = useLottieJson(url);

  if ((!data || error) && fallbackMp4Url) {
    return (
      <video
        className="award-video"
        src={fallbackMp4Url}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={label}
      />
    );
  }

  if (!data || error) {
    return <PremiumIcon name={fallbackIcon} aria-label={label} />;
  }

  return (
    <Lottie
      animationData={data}
      loop
      autoplay
      className="award-lottie"
      aria-label={label}
    />
  );
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  @property --gb-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }

  :root {
    --gold: #C9A84C;
    --gold-light: #E8C96B;
    --gold-pale: #F5E6BE;
    --deep: #04080F;
    --deep2: #080E1A;
    --navy: #0A1628;
    --navy2: #0F1F38;
    --slate: #1A2E4A;
    --ice: #A8C4D8;
    --ice2: #D6E8F5;
    --white: #F7F3EE;
    --muted: #8A9BB0;
    --accent: #4A90D9;
    --accent2: #2563EB;

  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Syne', sans-serif;
    background: var(--deep);
    color: var(--white);
    overflow-x: hidden;
    cursor: auto;
  }
  p { color: #ffffff; }
  body.menu-open { overflow: hidden; }

  /* Force normal cursor + better pointer */
  * { cursor: auto !important; }
  a, button, [role="button"], summary, label, select, option { cursor: pointer !important; }
  input, textarea { cursor: text !important; }

  /* ── CUSTOM CURSOR ──────────────────────────────────────────────────────── */
  /* â”€â”€ GOLD BORDER SWEEP (box border animation) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  .gold-border-box { position: relative; isolation: isolate; }
  .gold-border-layer {
    position: absolute; inset: 0;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0.9;
    z-index: 0;
  }
  .gold-border-layer::before {
    content: '';
    position: absolute; inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: conic-gradient(
      from var(--gb-angle),
      rgba(201,168,76,0.10) 0deg,
      rgba(201,168,76,0.10) 210deg,
      rgba(245,230,190,0.96) 255deg,
      rgba(232,201,107,0.85) 285deg,
      rgba(201,168,76,0.18) 315deg,
      rgba(201,168,76,0.10) 360deg
    );
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    filter: drop-shadow(0 0 10px rgba(201,168,76,0.22));
    animation: goldBorderSpin 2.1s linear infinite;
  }
  @keyframes goldBorderSpin { to { --gb-angle: 360deg; } }

  /* ── NOISE ──────────────────────────────────────────────────────────────── */
  .noise {
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 1000; opacity: 0.4;
  }

  /* ── ANIMATED GRADIENT BG ───────────────────────────────────────────────── */
  @keyframes gradShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .gradient-bg-anim {
    background: linear-gradient(-45deg, #04080F, #080E1A, #0A1628, #06101F, #04080F);
    background-size: 400% 400%;
    animation: gradShift 15s ease infinite;
  }

  #main {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    background:
      radial-gradient(ellipse 80% 60% at 70% 14%, rgba(10,22,40,0.9) 0%, transparent 70%),
      radial-gradient(ellipse 50% 80% at 20% 36%, rgba(201,168,76,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 62%, rgba(74,144,217,0.05) 0%, transparent 60%),
      linear-gradient(-45deg, #04080F, #080E1A, #0A1628, #06101F, #04080F);
    background-size: auto, auto, auto, 400% 400%;
    animation: gradShift 15s ease infinite;
  }
  #main::before {
    content: '';
    position: absolute; inset: 0;
    z-index: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(201,168,76,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.035) 1px, transparent 1px);
    background-size: 80px 80px;
    mask-image: linear-gradient(to bottom, transparent 0, black 8%, black 92%, transparent 100%);
    animation: gridPulse 4s ease-in-out infinite;
  }
  #main > * {
    position: relative;
    z-index: 1;
  }

  /* ── NAVBAR ─────────────────────────────────────────────────────────────── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 500;
    padding: 24px 60px;
    display: flex; align-items: center; justify-content: space-between;
    transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
    transform: translateY(0);
  }
  .nav.hidden { transform: translateY(-110%); }
  .nav.scrolled {
    background: rgba(4,8,15,0.85);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border-bottom: 1px solid rgba(201,168,76,0.18);
    padding: 14px 60px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.4);
  }
  .nav-logo {
    display: flex; align-items: center; gap: 12px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 600;
    color: var(--gold); letter-spacing: 0.08em; text-transform: uppercase;
    text-decoration: none; cursor: none;
    min-width: 0;
  }
  .nav-logo-img {
    width: 38px; height: 38px;
    object-fit: contain;
    flex: 0 0 auto;
    filter: drop-shadow(0 0 12px rgba(201,168,76,0.22));
  }
  .nav-logo span { color: var(--white); font-weight: 300; }
  .nav-links { display: flex; gap: 40px; align-items: center; }
  .nav-link {
    font-size: 12px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--muted); text-decoration: none; transition: color 0.3s; position: relative;
    cursor: none;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
    height: 1px; background: var(--gold);
    transform: scaleX(0); transform-origin: left; transition: transform 0.4s cubic-bezier(0.23,1,0.32,1);
  }
  .nav-link:hover { color: var(--white); }
  .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }
  .nav-link.active { color: var(--white); }

  /* MAGNETIC NAV CTA */
  .nav-cta {
    padding: 10px 28px; background: transparent; border: 1px solid var(--gold);
    color: var(--gold); font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase; cursor: none;
    transition: all 0.4s cubic-bezier(0.23,1,0.32,1); position: relative; overflow: hidden;
    display: inline-block;
  }
  .nav-cta::before {
    content: ''; position: absolute; inset: 0; background: var(--gold);
    transform: translateX(-100%); transition: transform 0.4s cubic-bezier(0.23,1,0.32,1); z-index: -1;
  }
  .nav-cta:hover { color: var(--deep); }
  .nav-cta:hover::before { transform: translateX(0); }

  /* HAMBURGER */
  .nav-hamburger {
    display: none; flex-direction: column; gap: 5px;
    cursor: none; background: none; border: none; padding: 4px;
  }
  .nav-hamburger span { display: block; width: 24px; height: 2px; background: var(--gold); transition: all 0.3s ease; }

  /* Prevent logo overlap + collapse nav earlier on smaller widths */
  .nav-logo { white-space: nowrap; }
  @media (max-width: 980px) {
    .nav { padding: 16px 24px; }
    .nav.scrolled { padding: 12px 24px; }
    .nav-logo { font-size: 18px; letter-spacing: 0.06em; }
    .nav-links { display: none; }
    .nav-hamburger { display: flex; }
    .nav-cta { padding: 9px 16px; font-size: 10px; }
  }
  .mobile-menu {
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(4,8,15,0.98); backdrop-filter: blur(20px);
    z-index: 490; flex-direction: column; align-items: center; justify-content: center; gap: 32px;
    animation: menuSlideIn 0.4s cubic-bezier(0.23,1,0.32,1);
  }
  @keyframes menuSlideIn {
    from { opacity: 0; transform: scale(0.95); }
    to   { opacity: 1; transform: scale(1); }
  }
  .mobile-menu.open { display: flex; }
  .mobile-menu .nav-link { font-size: 20px; letter-spacing: 0.1em; }
  .mobile-close { position: absolute; top: 24px; right: 24px; background: none; border: none; color: var(--gold); font-size: 28px; cursor: none; }

  /* ── SKIP LINK ──────────────────────────────────────────────────────────── */
  .skip-link {
    position: fixed; left: 16px; top: 16px; z-index: 2000;
    padding: 10px 14px; border: 1px solid rgba(201,168,76,0.35);
    background: rgba(4,8,15,0.92); color: var(--white);
    font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none;
    transform: translateY(-160%); transition: transform 0.2s ease; backdrop-filter: blur(12px);
  }
  .skip-link:focus { transform: translateY(0); outline: none; }

  /* ── HERO ───────────────────────────────────────────────────────────────── */
  .hero {
    min-height: 100vh; position: relative;
    display: flex; align-items: center;
    overflow: hidden; padding: 0 60px;
  }
  .hero-inner {
    position: relative;
    z-index: 2;
    width: min(1200px, 100%);
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(240px, 440px);
    grid-template-areas: "content side";
    gap: 64px;
    align-items: center;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 60% at 70% 50%, rgba(10,22,40,0.9) 0%, transparent 70%),
      radial-gradient(ellipse 50% 80% at 20% 80%, rgba(201,168,76,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 20%, rgba(74,144,217,0.05) 0%, transparent 60%),
      linear-gradient(135deg, #04080F 0%, #080E1A 50%, #0A1628 100%);
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
    background-size: 80px 80px;
    mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%);
    animation: gridPulse 4s ease-in-out infinite;
  }
  @keyframes gridPulse {
    0%,100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  /* Floating orbs */
  .hero-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
  .orb1 {
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 70%);
    top: -200px; right: -100px;
    animation: orbFloat1 8s ease-in-out infinite;
  }
  .orb2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(74,144,217,0.09) 0%, transparent 70%);
    bottom: -100px; left: 10%;
    animation: orbFloat2 10s ease-in-out infinite;
  }
  .orb3 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
    top: 30%; left: 40%;
    animation: orbFloat3 12s ease-in-out infinite;
  }
  @keyframes orbFloat1 {
    0%,100% { transform: translate(0,0) scale(1); }
    33% { transform: translate(-30px,40px) scale(1.06); }
    66% { transform: translate(20px,-20px) scale(0.94); }
  }
  @keyframes orbFloat2 {
    0%,100% { transform: translate(0,0); }
    50% { transform: translate(40px,-30px); }
  }
  @keyframes orbFloat3 {
    0%,100% { transform: translate(0,0) scale(1); }
    50% { transform: translate(-20px,20px) scale(1.12); }
  }

  /* Floating geometric SVG shapes */
  .hero-floater {
    position: absolute; pointer-events: none; opacity: 0;
    animation: floaterReveal 1s ease forwards, floatLoop 6s ease-in-out infinite;
  }
  @keyframes floaterReveal {
    to { opacity: 1; }
  }
  @keyframes floatLoop {
    0%,100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }

  /* Hero entrance animations */
  .hero-content { grid-area: content; position: relative; max-width: 900px; margin: 0; text-align: left; }
  .hero-eyebrow {
    display: flex; align-items: center; justify-content: flex-start; gap: 16px; margin-bottom: 32px;
    opacity: 0; animation: heroFadeSlide 0.9s 0.2s cubic-bezier(0.23,1,0.32,1) forwards;
  }
  .eyebrow-line { width: 40px; height: 1px; background: var(--gold); }
  .eyebrow-text {
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold);
  }

  /* Staggered word reveal */
  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(52px, 8vw, 110px);
    font-weight: 300; line-height: 0.95; letter-spacing: -0.02em; color: var(--white);
    margin-bottom: 32px;
  }
  .hero-title em { font-style: italic; color: var(--gold); }
  .outline-text { -webkit-text-stroke: 1px rgba(201,168,76,0.5); color: transparent; }
  .word-wrap { overflow: hidden; display: block; }
  .word-inner {
    display: block;
    transform: translateY(110%);
    animation: wordSlideUp 0.8s cubic-bezier(0.23,1,0.32,1) forwards;
  }
  .word-inner:nth-child(1) { animation-delay: 0.3s; }
  .word-inner:nth-child(2) { animation-delay: 0.45s; }
  .word-inner:nth-child(3) { animation-delay: 0.6s; }
  @keyframes wordSlideUp {
    to { transform: translateY(0); }
  }

  .hero-subtitle {
    font-size: 16px; font-weight: 400; line-height: 1.7; color: var(--muted);
    max-width: 560px; margin: 0 0 48px;
    opacity: 0; animation: heroFadeSlide 0.9s 0.75s cubic-bezier(0.23,1,0.32,1) forwards;
  }
  .hero-actions {
    display: flex; align-items: center; justify-content: flex-start; gap: 24px; flex-wrap: wrap;
    opacity: 0; animation: heroFadeSlide 0.9s 0.9s cubic-bezier(0.23,1,0.32,1) forwards;
  }
  @keyframes heroFadeSlide {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Hero side */
  .hero-side {
    grid-area: side;
    position: relative;
    transform: none;
    width: 100%;
    text-align: center;
    pointer-events: none;
    display: flex; flex-direction: column; align-items: center;
    opacity: 0; animation: heroFadeSlide 1.2s 0.5s cubic-bezier(0.23,1,0.32,1) forwards;
  }
  .hero-side-logo {
    width: clamp(140px, 22vw, 380px);
    max-width: 100%;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 18px 50px rgba(201,168,76,0.25));
    animation: logoFloat 5s ease-in-out infinite;
  }
  @keyframes logoFloat {
    0%,100% { transform: translateY(0); filter: drop-shadow(0 18px 50px rgba(201,168,76,0.25)); }
    50%     { transform: translateY(-14px); filter: drop-shadow(0 32px 60px rgba(201,168,76,0.35)); }
  }
  .hero-side-org {
    width: min(420px, 92%);
    margin: 16px auto 0;
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px; font-weight: 500; line-height: 1.25; letter-spacing: 0.02em; color: var(--ice2);
    position: relative; display: block; padding-bottom: 14px; text-align: center;
  }
  .hero-side-org strong { color: var(--white); font-weight: 600; }
  .hero-side-org::after {
    content: ''; position: absolute; left: 50%; bottom: 0;
    width: min(240px, 90%); height: 1px; transform: translateX(-50%);
    background: linear-gradient(90deg, transparent, rgba(245,230,190,0.95), rgba(201,168,76,0.55), transparent);
    background-size: 220% 100%;
    animation: promptLine 2.8s ease-in-out infinite;
    opacity: 0.9;
  }
  @keyframes promptLine {
    0%   { background-position: 0% 50%; opacity: 0.55; }
    50%  { background-position: 100% 50%; opacity: 1; }
    100% { background-position: 200% 50%; opacity: 0.55; }
  }

  /* Magnetic button */
  .btn-primary {
    padding: 16px 40px; background: var(--gold); color: var(--deep);
    font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase; border: none; cursor: none;
    transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
    position: relative; overflow: hidden; display: inline-block;
  }
  .btn-primary::after {
    content: ''; position: absolute; inset: 0; background: var(--gold-light);
    transform: translateX(-100%); transition: transform 0.4s cubic-bezier(0.23,1,0.32,1);
  }
  .btn-primary:hover { box-shadow: 0 16px 48px rgba(201,168,76,0.35); }
  .btn-primary:hover::after { transform: translateX(0); }
  .btn-primary span { position: relative; z-index: 1; }
  .btn-secondary {
    display: flex; align-items: center; gap: 10px; padding: 16px 0;
    background: none; border: none; border-bottom: 1px solid rgba(201,168,76,0.3);
    color: var(--ice); font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase; cursor: none;
    transition: all 0.3s ease;
  }
  .btn-secondary:hover { color: var(--gold); border-bottom-color: var(--gold); }

  /* ── MARQUEE ─────────────────────────────────────────────────────────────── */
  .marquee-section {
    position: relative;
    padding: 28px 0;
    border-top: 1px solid rgba(201,168,76,0.16);
    border-bottom: 1px solid rgba(201,168,76,0.16);
    background: linear-gradient(90deg, rgba(201,168,76,0.02), rgba(245,230,190,0.04), rgba(201,168,76,0.02));
    overflow: hidden;
    box-shadow: inset 0 1px 0 rgba(245,230,190,0.08), inset 0 -1px 0 rgba(245,230,190,0.08);
  }
  .marquee-section::before,
  .marquee-section::after {
    content: '';
    position: absolute; left: 0; right: 0;
    height: 2px;
    background:
      linear-gradient(90deg,
        transparent 0%,
        rgba(201,168,76,0.22) 16%,
        rgba(245,230,190,0.95) 34%,
        rgba(232,201,107,1) 50%,
        rgba(245,230,190,0.95) 66%,
        rgba(201,168,76,0.22) 84%,
        transparent 100%);
    background-size: 220% 100%;
    filter: drop-shadow(0 0 10px rgba(232,201,107,0.65));
    animation: marqueeGoldRail 3.6s linear infinite;
    pointer-events: none;
  }
  .marquee-section::before { top: 0; }
  .marquee-section::after {
    bottom: 0;
    animation-direction: reverse;
  }
  .marquee-track { display: flex; gap: 48px; animation: marquee 20s linear infinite; white-space: nowrap; }
  .marquee-item {
    display: flex; align-items: center; gap: 16px;
    font-family: 'DM Mono', monospace; font-size: 11px;
    letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); flex-shrink: 0;
    transition: color 0.3s;
  }
  .marquee-item:hover { color: var(--gold); }
  .marquee-dot { width: 4px; height: 4px; background: var(--gold); border-radius: 50%; }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes marqueeGoldRail {
    from { background-position: 220% 0; }
    to   { background-position: -220% 0; }
  }

  /* ── SECTION COMMONS ─────────────────────────────────────────────────────── */
  .section-inner { max-width: 1200px; margin: 0 auto; padding: 0 60px; }
  .section-label { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 20px; text-align: center; }
  .label-line { width: 32px; height: 1px; background: var(--gold); }
  .section-label::after { content: ''; width: 32px; height: 1px; background: var(--gold); }
  .label-text {
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold);
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 5vw, 64px); font-weight: 300; line-height: 1.1;
    color: var(--white); margin-bottom: 48px; text-align: center;
  }
  .section-title em { font-style: italic; color: var(--gold); }

  /* ── BLUR-TO-CLEAR REVEAL ────────────────────────────────────────────────── */
  .reveal {
    opacity: 0; transform: translateY(40px);
    filter: blur(8px);
    transition: opacity 0.9s cubic-bezier(0.23,1,0.32,1),
                transform 0.9s cubic-bezier(0.23,1,0.32,1),
                filter 0.9s cubic-bezier(0.23,1,0.32,1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); filter: blur(0); }
  .reveal-delay-1 { transition-delay: 0.12s; }
  .reveal-delay-2 { transition-delay: 0.24s; }
  .reveal-delay-3 { transition-delay: 0.36s; }

  /* ── ABOUT ───────────────────────────────────────────────────────────────── */
  .about-section { padding: 84px 0; }
  .about-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(320px, 520px);
    grid-template-areas:
      "head head"
      "left right";
    gap: 56px 80px;
    align-items: start;
  }
  .about-head { grid-area: head; text-align: center; }
  .about-left { grid-area: left; text-align: center; }
  .about-body { font-size: 16px; line-height: 1.8; color: var(--muted); margin-bottom: 24px; }
  .about-highlight {
    font-family: 'Cormorant Garamond', serif; font-size: 22px; font-style: italic;
    color: var(--ice); line-height: 1.5;
    border-left: 0; border-top: 1px solid rgba(201,168,76,0.42); border-bottom: 1px solid rgba(201,168,76,0.22);
    padding: 22px 18px; margin: 32px auto; max-width: 620px;
  }
  .about-right { grid-area: right; position: relative; margin-top: 0; }
  .about-card {
    background: rgba(15,31,56,0.6);
    border: 1px solid rgba(201,168,76,0.15); padding: 40px;
    position: relative; overflow: hidden;
    transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
    transform-style: preserve-3d;
  }
  .about-card::before {
    content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 2px;
    background: linear-gradient(90deg, var(--gold), transparent);
  }
  /* SVG border animation */
  .about-card::after {
    content: ''; position: absolute; inset: 0;
    border: 1px solid transparent;
    background: linear-gradient(var(--navy2), var(--navy2)) padding-box,
                linear-gradient(135deg, rgba(201,168,76,0.5), transparent 50%, rgba(201,168,76,0.3)) border-box;
    transition: opacity 0.4s;
    opacity: 0;
  }
  .about-card:hover::after { opacity: 1; }
  .card-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
  .card-stat-num {
    font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 300;
    color: var(--gold); line-height: 1;
    transition: text-shadow 0.3s;
  }
  .about-card:hover .card-stat-num { text-shadow: 0 0 30px rgba(201,168,76,0.4); }
  .card-stat-label { font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-top: 6px; }
  .about-deco {
    position: absolute; top: -20px; right: -20px; width: 120px; height: 120px;
    border: 1px solid rgba(201,168,76,0.15); transform: rotate(45deg);
    animation: decoSpin 20s linear infinite;
  }
  @keyframes decoSpin { to { transform: rotate(405deg); } }

  /* ── 3D TILT CARDS ───────────────────────────────────────────────────────── */
  .tilt-card { transform-style: preserve-3d; perspective: 1000px; cursor: default; }
  .tilt-card-inner { transition: transform 0.1s ease; transform-style: preserve-3d; }
  .shimmer-hover { position: relative; overflow: hidden; }
  .shimmer-hover .tilt-card-inner::after {
    content: '';
    position: absolute;
    inset: -60% -70%;
    background: linear-gradient(115deg,
      transparent 42%,
      rgba(255,255,255,0.00) 46%,
      rgba(255,255,255,0.22) 50%,
      rgba(255,255,255,0.00) 54%,
      transparent 58%
    );
    transform: translateX(-65%);
    opacity: 0;
    pointer-events: none;
  }
  .shimmer-hover:hover .tilt-card-inner::after {
    opacity: 1;
    animation: shimmerSweep 1.15s cubic-bezier(0.23,1,0.32,1) both;
  }
  @keyframes shimmerSweep {
    from { transform: translateX(-65%); }
    to   { transform: translateX(65%); }
  }

  /* ── GLASSMORPHISM FLOATING ──────────────────────────────────────────────── */
  .glass-card {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06);
    animation: glassFloat 5s ease-in-out infinite;
  }
  @keyframes glassFloat {
    0%,100% { box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06); }
    50%     { box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(201,168,76,0.06), inset 0 1px 0 rgba(255,255,255,0.06); }
  }

  /* ── LEARN GRID ──────────────────────────────────────────────────────────── */
  .learn-section { padding: 84px 0; background: transparent; }
  .learn-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
  .learn-card {
    padding: 26px 24px;
    background: rgba(10,22,40,0.8); border: 1px solid rgba(201,168,76,0.08);
    position: relative; overflow: hidden;
    transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
    transform-style: preserve-3d;
    cursor: none;
    text-align: center;
  }
  /* Shimmer sweep */
  .learn-card::before {
    content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.06), transparent);
    transition: left 0.6s ease;
  }
  .learn-card:hover { border-color: rgba(201,168,76,0.35); transform: translateY(-6px) scale(1.01); box-shadow: 0 24px 60px rgba(0,0,0,0.4), 0 0 40px rgba(201,168,76,0.08); }
  .learn-card:hover::before { left: 100%; }
  .learn-num { font-family: 'DM Mono', monospace; font-size: 11px; color: rgba(201,168,76,0.4); letter-spacing: 0.1em; margin-bottom: 16px; }
  .learn-icon {
    width: 86px; height: 86px; margin: 0 auto 14px;
    display: grid; place-items: center; position: relative; overflow: hidden;
    border: 0; border-radius: 50%;
    background: transparent;
    box-shadow: none;
    transition: transform 0.45s cubic-bezier(0.23,1,0.32,1);
  }
  .learn-icon-mark {
    position: relative; z-index: 1; line-height: 1;
    display: grid; place-items: center; width: 86px; height: 86px;
    border-radius: 50%; overflow: hidden;
    transition: transform 0.45s cubic-bezier(0.23,1,0.32,1);
  }
  .learn-icon-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    border-radius: 50%;
    transform: translateZ(0);
  }
  .learn-icon::before,
  .learn-icon::after { display: none; }
  .learn-card:hover .learn-icon {
    transform: translateY(-5px);
  }
  .learn-card:hover .learn-icon-mark { transform: scale(1.06); }
  .learn-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 600; color: var(--white); margin-bottom: 10px; line-height: 1.3; }
  .learn-desc { font-size: 14px; line-height: 1.7; color: var(--muted); }

  /* ── OUTCOMES ────────────────────────────────────────────────────────────── */
  .outcomes-section { padding: 84px 0; background: transparent; }
  .outcomes-section .section-title { margin-bottom: 46px; }
  .outcomes-grid { display: block; }
  .outcomes-card {
    min-height: 100%;
    background:
      radial-gradient(760px 280px at 12% 0%, rgba(245,230,190,0.10), transparent 62%),
      linear-gradient(180deg, rgba(6,14,32,0.94), rgba(8,14,26,0.86));
    border: 1px solid rgba(232,201,107,0.18); padding: 34px;
    position: relative; overflow: hidden; border-radius: 18px;
    box-shadow: 0 30px 92px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.06);
    transition: transform 0.45s cubic-bezier(0.23,1,0.32,1), border-color 0.4s, box-shadow 0.4s;
    text-align: center;
  }
  .outcomes-card::before {
    content: ''; position: absolute; inset: 0;
    background:
      linear-gradient(90deg, rgba(245,230,190,0.12), transparent 24%, transparent 76%, rgba(201,168,76,0.1)),
      radial-gradient(900px 300px at 85% 60%, rgba(74,144,217,0.08), transparent 60%);
    opacity: 0.9; pointer-events: none;
  }
  .outcomes-card::after {
    content: ''; position: absolute; left: 26px; right: 26px; top: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(245,230,190,0.92), rgba(232,201,107,0.55), transparent);
    filter: drop-shadow(0 0 12px rgba(232,201,107,0.42));
  }
  .outcomes-card:hover {
    transform: translateY(-6px);
    border-color: rgba(245,230,190,0.42);
    box-shadow: 0 40px 110px rgba(0,0,0,0.46), 0 0 55px rgba(201,168,76,0.07), inset 0 1px 0 rgba(255,255,255,0.08);
  }
  .outcomes-card > *:not(.gold-border-layer) { position: relative; z-index: 1; }
  .outcomes-kicker {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--gold-light); margin-bottom: 16px;
    padding: 8px 12px; border: 1px solid rgba(232,201,107,0.22);
    background: rgba(201,168,76,0.06); border-radius: 999px;
  }
  .outcomes-kicker::before {
    content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--gold-light);
    box-shadow: 0 0 14px rgba(232,201,107,0.8);
  }
  .outcomes-title { font-family: 'Cormorant Garamond', serif; font-size: 42px; font-weight: 300; margin-bottom: 14px; line-height: 1.02; }
  .outcomes-lede {
    font-family: 'Source Serif 4', serif;
    color: rgba(214,232,245,0.82);
    line-height: 1.75; font-size: 15px;
    margin: 0 0 26px;
    max-width: 70ch;
    margin-left: auto;
    margin-right: auto;
  }
  .outcomes-rotator {
    margin-top: 18px;
    padding: 0;
    border: 0;
    background: transparent;
  }
  .outcomes-rotator-top {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-bottom: 10px;
  }
  .outcomes-rotator-label {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(232,201,107,0.92);
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(232,201,107,0.16);
    background: rgba(10,22,40,0.35);
  }
  .outcomes-rotator-dots { display: inline-flex; gap: 6px; align-items: center; }
  .outcomes-rotator-dot { width: 6px; height: 6px; border-radius: 999px; background: rgba(232,201,107,0.20); }
  .outcomes-rotator-dot.active { background: rgba(245,230,190,0.90); transform: scale(1.35); }

  .outcomes-rotator-stage { position: relative; min-height: 74px; }
  .outcomes-rotator-item {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    animation: outcomeFade 520ms cubic-bezier(0.23,1,0.32,1);
  }
  @keyframes outcomeFade {
    from { opacity: 0; transform: translateY(8px); filter: blur(4px); }
    to   { opacity: 1; transform: translateY(0); filter: blur(0); }
  }
  .outcomes-check {
    width: 34px; height: 34px;
    border-radius: 999px;
    display: grid; place-items: center;
    color: var(--deep);
    font-size: 14px;
    background: linear-gradient(135deg, rgba(245,230,190,0.96), rgba(232,201,107,0.86), rgba(201,168,76,0.88));
    box-shadow: 0 10px 22px rgba(201,168,76,0.14), inset 0 1px 0 rgba(255,255,255,0.55);
  }
  .outcomes-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 400;
    line-height: 1.1;
    color: var(--gold-pale);
    letter-spacing: -0.01em;
    position: relative;
    padding-bottom: 10px;
  }
  .outcomes-text::after {
    content: '';
    position: absolute;
    left: 50%; bottom: 0;
    transform: translateX(-50%);
    width: min(360px, 82%);
    height: 1px;
    background: linear-gradient(90deg, rgba(245,230,190,0.92), rgba(232,201,107,0.42), transparent);
    opacity: 0.85;
  }

  .snapshot-grid { margin-top: 18px; }

  /* Snapshot box */
  .snapshot-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin: 18px 0 16px;
  }
  .snapshot-stat {
    padding: 14px 14px 12px;
    border-radius: 14px;
    border: 1px solid rgba(232,201,107,0.14);
    background: rgba(255,255,255,0.02);
  }
  .snapshot-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 34px;
    line-height: 1;
    font-weight: 600;
    color: var(--gold-light);
    margin-bottom: 8px;
    text-shadow: 0 0 22px rgba(201,168,76,0.14);
  }
  .snapshot-label {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(247,243,238,0.86);
    line-height: 1.45;
  }
  .snapshot-cta-row {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2px;
  }
  .snapshot-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px 16px;
    border-radius: 999px;
    border: 1px solid rgba(245,230,190,0.38);
    background: linear-gradient(135deg, rgba(232,201,107,0.18), rgba(10,22,40,0.74));
    color: var(--gold-light);
    text-decoration: none;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    cursor: none;
  }
  .snapshot-cta:hover {
    transform: translateY(-2px);
    border-color: rgba(245,230,190,0.62);
    box-shadow: 0 14px 40px rgba(0,0,0,0.35), 0 0 34px rgba(201,168,76,0.10);
  }
  .snapshot-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 14px;
    border-radius: 999px;
    border: 1px solid rgba(232,201,107,0.18);
    background: rgba(10,22,40,0.45);
    color: rgba(214,232,245,0.88);
    text-decoration: none;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    transition: transform 0.25s ease, border-color 0.25s ease;
    cursor: none;
  }
  .snapshot-link:hover { transform: translateY(-2px); border-color: rgba(245,230,190,0.42); }

  /* ── CURRICULUM TIMELINE ─────────────────────────────────────────────────── */
  .structure-section { padding: 84px 0; position: relative; overflow: hidden; }
  .structure-section::before {
    content: ''; position: absolute; inset: 10% 0 auto; height: 520px; pointer-events: none;
    background: radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.1), transparent 62%);
    opacity: 0.75;
  }
  .structure-atlas {
    position: relative;
    max-width: 1140px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
  }
  .structure-atlas::before { display: none; }

  /* New module card style (distinct from other sections) */
  .curriculum-card {
    position: relative;
    overflow: hidden;
    border-radius: 18px;
    padding: 22px 22px 22px;
    height: 312px;
    background: rgba(6, 14, 32, 0.92);
    border: 1px solid rgba(232,201,107,0.18);
    box-shadow: 0 30px 92px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.06);
    transition: transform 0.45s cubic-bezier(0.23,1,0.32,1), border-color 0.35s ease, box-shadow 0.35s ease;
    text-align: left;
    display: flex;
    flex-direction: column;
  }
  .curriculum-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, rgba(245,230,190,0.85), rgba(232,201,107,0.55), rgba(201,168,76,0.18), transparent);
    opacity: 0.85;
  }
  .curriculum-card::after { display: none; }
  .curriculum-card:hover {
    transform: translateY(-6px);
    border-color: rgba(245,230,190,0.36);
    box-shadow: 0 40px 110px rgba(0,0,0,0.52), 0 0 55px rgba(201,168,76,0.06), inset 0 1px 0 rgba(255,255,255,0.08);
  }

  .curriculum-head {
    position: relative; z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 10px;
    margin-bottom: 14px;
  }
  .curriculum-icon {
    width: 62px; height: 62px;
    display: grid; place-items: center;
    border-radius: 999px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(232,201,107,0.22);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06), 0 18px 46px rgba(0,0,0,0.26);
  }
  .curriculum-icon .premium-icon-image { width: 34px; height: 34px; filter: drop-shadow(0 10px 22px rgba(201,168,76,0.18)); }

  .curriculum-tag {
    display: inline-flex;
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(232,201,107,0.92);
    margin-bottom: 8px;
  }
  .curriculum-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    line-height: 1.06;
    font-weight: 600;
    color: var(--gold-pale);
  }
  .curriculum-desc {
    position: relative; z-index: 1;
    font-family: 'Source Serif 4', serif;
    font-size: 15px;
    line-height: 1.7;
    color: rgba(247,243,238,0.92);
    margin-left: 0;
    max-width: 52ch;
    text-align: center;
    margin-top: auto;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
  }

  /* Curriculum carousel (focused center + blurred sides) */
  .curriculum-carousel {
    position: relative;
    margin-top: 14px;
  }
  .curriculum-stage {
    position: relative;
    height: 360px;
    max-width: 1140px;
    margin: 0 auto;
    perspective: 1200px;
    transform-style: preserve-3d;
  }
  .curriculum-slide {
    position: absolute;
    top: 0;
    left: 50%;
    width: min(420px, 86vw);
    transform-style: preserve-3d;
    will-change: transform, filter, opacity;
    transition:
      transform 460ms cubic-bezier(0.23,1,0.32,1),
      filter 460ms cubic-bezier(0.23,1,0.32,1),
      opacity 460ms cubic-bezier(0.23,1,0.32,1);
  }
  .curriculum-slide.pos-0 {
    transform: translateX(-50%) translateZ(0) scale(1);
    filter: none;
    opacity: 1;
    z-index: 5;
  }
  .curriculum-slide.pos-0 .curriculum-card {
    background: rgba(4, 10, 22, 0.98);
    border-color: rgba(245,230,190,0.30);
    box-shadow:
      0 54px 140px rgba(0,0,0,0.62),
      0 0 80px rgba(201,168,76,0.10),
      inset 0 1px 0 rgba(255,255,255,0.07);
  }
  .curriculum-slide.pos--1 {
    transform: translateX(calc(-50% - clamp(180px, 22vw, 260px))) translateZ(-120px) scale(0.92);
    filter: blur(3.2px) saturate(0.72) brightness(0.72);
    opacity: 0.52;
    z-index: 4;
  }
  .curriculum-slide.pos-1 {
    transform: translateX(calc(-50% + clamp(180px, 22vw, 260px))) translateZ(-120px) scale(0.92);
    filter: blur(3.2px) saturate(0.72) brightness(0.72);
    opacity: 0.52;
    z-index: 4;
  }
  .curriculum-slide.pos--2 {
    transform: translateX(calc(-50% - clamp(320px, 34vw, 520px))) translateZ(-260px) scale(0.84);
    filter: blur(5.2px) saturate(0.58) brightness(0.62);
    opacity: 0.28;
    z-index: 3;
  }
  .curriculum-slide.pos-2 {
    transform: translateX(calc(-50% + clamp(320px, 34vw, 520px))) translateZ(-260px) scale(0.84);
    filter: blur(5.2px) saturate(0.58) brightness(0.62);
    opacity: 0.28;
    z-index: 3;
  }
  .curriculum-slide.pos--1 .curriculum-card,
  .curriculum-slide.pos-1 .curriculum-card,
  .curriculum-slide.pos--2 .curriculum-card,
  .curriculum-slide.pos-2 .curriculum-card {
    pointer-events: none;
  }

  .curriculum-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 14px;
    margin-top: 10px;
    transform: translateY(-10px);
  }
  .curriculum-btn {
    width: 46px;
    height: 46px;
    border-radius: 999px;
    border: 1px solid rgba(232,201,107,0.26);
    background: rgba(10,22,40,0.55);
    color: var(--gold-light);
    display: grid;
    place-items: center;
    transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
    cursor: none;
  }
  .curriculum-btn:hover {
    transform: translateY(-1px);
    border-color: rgba(245,230,190,0.52);
    background: rgba(10,22,40,0.72);
  }
  .curriculum-btn:active { transform: translateY(0); }
  .curriculum-btn svg { display: block; }
  .curriculum-btn.prev svg { transform: rotate(90deg); }
  .curriculum-btn.next svg { transform: rotate(-90deg); }

  .curriculum-dots {
    display: inline-flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(232,201,107,0.14);
    background: rgba(10,22,40,0.35);
  }
  .curriculum-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: rgba(232,201,107,0.22);
    transition: transform 0.25s ease, background 0.25s ease;
  }
  .curriculum-dot.active {
    background: rgba(245,230,190,0.86);
    transform: scale(1.4);
  }

  /* ── DIFFERENTIATORS ─────────────────────────────────────────────────────── */
  .diff-section { padding: 84px 0; background: transparent; }
  .diff-feature-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
  .diff-card {
    padding: 40px; background: rgba(15,31,56,0.5); border: 1px solid rgba(201,168,76,0.1);
    display: flex; flex-direction: column; gap: 24px; align-items: center; text-align: center;
    transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
    position: relative; overflow: hidden; cursor: none;
    transform-style: preserve-3d;
  }
  /* Animated border */
  .diff-card::before {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold));
    transform: scaleX(0); transform-origin: left; transition: transform 0.5s cubic-bezier(0.23,1,0.32,1);
  }
  .diff-card::after {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(400px 300px at 50% 50%, rgba(201,168,76,0.06), transparent 60%);
    opacity: 0; transition: opacity 0.4s;
  }
  .diff-card:hover { border-color: rgba(201,168,76,0.3); transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,0.35); }
  .diff-card:hover::before { transform: scaleX(1); }
  .diff-card:hover::after { opacity: 1; }
  .diff-icon-wrap {
    width: 58px; height: 58px; flex-shrink: 0; position: relative; overflow: hidden;
    display: grid; place-items: center; border-radius: 50%;
    border: 1px solid rgba(232,201,107,0.45);
    background: linear-gradient(145deg, rgba(201,168,76,0.18), rgba(10,22,40,0.82));
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05), 0 16px 36px rgba(0,0,0,0.25);
    transition: transform 0.45s cubic-bezier(0.23,1,0.32,1), border-color 0.45s ease, box-shadow 0.45s ease;
  }
  .diff-icon-wrap::after {
    content: ''; position: absolute; inset: -50%;
    background: linear-gradient(110deg, transparent 36%, rgba(255,255,255,0.28) 50%, transparent 64%);
    transform: translateX(-72%) rotate(18deg);
    transition: transform 0.8s cubic-bezier(0.23,1,0.32,1);
  }
  .diff-icon-mark {
    position: relative; z-index: 1; display: grid; place-items: center; width: 30px; height: 30px;
    color: var(--gold-light);
  }
  .diff-card:hover .diff-icon-wrap {
    transform: translateY(-5px);
    border-color: rgba(245,230,190,0.78);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08), 0 18px 42px rgba(201,168,76,0.14);
  }
  .diff-card:hover .diff-icon-wrap::after { transform: translateX(72%) rotate(18deg); }
  .diff-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 600; color: var(--white); margin-bottom: 10px; }
  .diff-desc { font-size: 14px; line-height: 1.7; color: var(--muted); }

  .diff-rotator {
    max-width: 820px;
    margin: 0 auto;
    text-align: center;
  }
  .diff-rotator-card {
    padding: 44px 40px;
    background: rgba(6,14,32,0.92);
    border: 1px solid rgba(232,201,107,0.18);
    border-radius: 18px;
    position: relative;
    overflow: hidden;
  }
  .diff-rotator-icon {
    width: 74px;
    height: 74px;
    margin: 0 auto 18px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(232,201,107,0.22);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06), 0 22px 60px rgba(0,0,0,0.30);
  }
  .diff-rotator-icon .premium-icon-image { width: 38px; height: 38px; filter: drop-shadow(0 10px 22px rgba(201,168,76,0.18)); }
  .diff-rotator-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 34px;
    font-weight: 400;
    line-height: 1.1;
    color: var(--white);
    margin-bottom: 14px;
  }
  .diff-rotator-desc {
    font-family: 'Source Serif 4', serif;
    font-size: 15px;
    line-height: 1.8;
    color: rgba(214,232,245,0.84);
    max-width: 62ch;
    margin: 0 auto;
  }
  .diff-rotator-anim {
    animation: diffUpFade 520ms cubic-bezier(0.23,1,0.32,1);
    will-change: transform, opacity, filter;
  }
  @keyframes diffUpFade {
    from { opacity: 0; transform: translateY(14px); filter: blur(6px); }
    to   { opacity: 1; transform: translateY(0); filter: blur(0); }
  }

  /* ── AWARDS ──────────────────────────────────────────────────────────────── */
  .awards-section { padding: 84px 0; position: relative; overflow: hidden; }
  .awards-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%);
    animation: awardsBgPulse 4s ease-in-out infinite;
  }
  @keyframes awardsBgPulse {
    0%,100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  .awards-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    justify-items: center;
  }
  .award-card {
    width: min(920px, 100%);
    padding: 0;
    background: transparent;
    border: 1px solid rgba(201,168,76,0.24);
    --award-radius: 24px;
    position: relative; overflow: hidden;
    border-radius: var(--award-radius);
    transition: transform 0.5s cubic-bezier(0.23,1,0.32,1), border-color 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.5s cubic-bezier(0.23,1,0.32,1);
    cursor: none;
    box-shadow: 0 30px 90px rgba(0,0,0,0.22);
  }
  .award-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    animation: borderSweep 3s linear infinite;
    background-size: 200% 100%;
  }
  @keyframes borderSweep {
    0%   { background-position: -100% 0; }
    100% { background-position: 200% 0; }
  }
  .award-card:hover { border-color: rgba(201,168,76,0.44); transform: translateY(-8px); box-shadow: 0 44px 120px rgba(0,0,0,0.28), 0 0 60px rgba(201,168,76,0.10); }

  .award-surface {
    position: relative;
    background: #ffffff;
    overflow: hidden;
    border-radius: var(--award-radius);
    padding: 26px 34px 34px;
  }
  .award-surface::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='220' viewBox='0 0 900 220'%3E%3Cg fill='none' stroke='%23C9A84C' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round' opacity='0.60'%3E%3Cpath d='M168 110c36-40 92-58 152-44 24 6 40 18 40 34 0 22-24 34-46 22-18-10-14-30 6-30'/%3E%3Cpath d='M240 160c26-28 66-40 106-30 14 4 24 12 24 22 0 16-18 24-34 16-12-6-10-18 4-18'/%3E%3Cpath d='M108 130c18-14 40-22 64-24 28-2 54 4 76 18'/%3E%3Cpath d='M300 76c-18 4-34 12-48 24-10 10-14 18-12 28'/%3E%3Cpath d='M732 110c-36-40-92-58-152-44-24 6-40 18-40 34 0 22 24 34 46 22 18-10 14-30-6-30'/%3E%3Cpath d='M660 160c-26-28-66-40-106-30-14 4-24 12-24 22 0 16 18 24 34 16 12-6 10-18-4-18'/%3E%3Cpath d='M792 130c-18-14-40-22-64-24-28-2-54 4-76 18'/%3E%3Cpath d='M600 76c18 4 34 12 48 24 10 10 14 18 12 28'/%3E%3C/g%3E%3Cg fill='none' stroke='%23E8C96B' stroke-width='1.2' stroke-linecap='round' opacity='0.45'%3E%3Cpath d='M238 96c20-14 48-18 74-10 12 4 18 12 16 20-4 14-22 18-30 6-6-10 4-18 14-12'/%3E%3Cpath d='M662 96c-20-14-48-18-74-10-12 4-18 12-16 20 4 14 22 18 30 6 6-10-4-18-14-12'/%3E%3C/g%3E%3C/svg%3E"),
      radial-gradient(circle at 50% 38%, rgba(201,168,76,0.10), transparent 42%),
      radial-gradient(circle at 50% 38%, rgba(6,18,38,0.04), transparent 54%),
      repeating-linear-gradient(90deg, rgba(6,18,38,0.03) 0 1px, transparent 1px 8px),
      repeating-linear-gradient(0deg, rgba(6,18,38,0.02) 0 1px, transparent 1px 10px),
      radial-gradient(360px 560px at 0% 56%, rgba(201,168,76,0.16), transparent 62%),
      radial-gradient(360px 560px at 100% 56%, rgba(74,144,217,0.10), transparent 62%),
      linear-gradient(180deg, rgba(255,255,255,0.70), rgba(255,255,255,0.45));
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;
    background-position: 50% 10px, 50% 10px, 50% 10px, 0 0, 0 0, 0 0, 0 0, 0 0;
    background-size: min(860px, 98%), min(860px, 98%), auto, auto, auto, auto, auto, auto;
    opacity: 0.55;
  }
  .award-surface::after {
    content: '';
    position: absolute;
    inset: 12px;
    pointer-events: none;
    border-radius: calc(var(--award-radius) - 12px);
    border: 1px solid rgba(201,168,76,0.48);
    box-shadow:
      inset 0 0 0 1px rgba(245,230,190,0.55),
      0 0 0 1px rgba(6,18,38,0.06);
    background:
      conic-gradient(from 0deg at 18px 18px, rgba(201,168,76,0.0) 0 70%, rgba(201,168,76,0.55) 78% 82%, rgba(201,168,76,0.0) 90% 100%),
      conic-gradient(from 90deg at calc(100% - 18px) 18px, rgba(201,168,76,0.0) 0 70%, rgba(201,168,76,0.55) 78% 82%, rgba(201,168,76,0.0) 90% 100%),
      conic-gradient(from 180deg at calc(100% - 18px) calc(100% - 18px), rgba(201,168,76,0.0) 0 70%, rgba(201,168,76,0.55) 78% 82%, rgba(201,168,76,0.0) 90% 100%),
      conic-gradient(from 270deg at 18px calc(100% - 18px), rgba(201,168,76,0.0) 0 70%, rgba(201,168,76,0.55) 78% 82%, rgba(201,168,76,0.0) 90% 100%);
    background-repeat: no-repeat;
    background-size: 32px 32px;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
  }
  .award-layout {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 18px;
    align-items: center;
    text-align: center;
    width: 100%;
  }
  .award-medal {
    display: grid;
    place-items: center;
    margin: 0;
    position: relative;
    overflow: visible;
    border: 0;
    background: transparent;
    border-radius: 0;
    color: var(--gold-light);
    box-shadow: none;
    transition: transform 0.45s cubic-bezier(0.23,1,0.32,1);
    pointer-events: none;
    isolation: isolate;
  }
  .award-medal { margin-top: -6px; }
  .award-medal::before {
    content: '';
    position: absolute;
    inset: 14px;
    border-radius: 28px;
    background:
      radial-gradient(circle at 30% 25%, rgba(201,168,76,0.30), transparent 46%),
      radial-gradient(circle at 70% 65%, rgba(74,144,217,0.18), transparent 56%);
    filter: blur(10px);
    opacity: 0.9;
    z-index: -1;
  }
  .award-card:hover .award-medal { transform: translateY(-6px); }
  .award-medal::after {
    content: '';
    position: absolute;
    top: 12px;
    left: 50%;
    width: clamp(180px, 34vw, 320px);
    height: 34px;
    transform: translateX(-50%);
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(201,168,76,0.0), rgba(201,168,76,0.22), rgba(232,201,107,0.26), rgba(201,168,76,0.22), rgba(201,168,76,0.0));
    z-index: -2;
  }

  .award-content { text-align: center; width: 100%; }
  .award-kicker {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 11px; font-weight: 900; letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(6,18,38,0.66);
    margin-bottom: 10px;
  }
  .award-kicker::before {
    content: '';
    width: 34px; height: 1px;
    background: linear-gradient(90deg, rgba(201,168,76,0.95), rgba(201,168,76,0.15));
  }
  .award-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 42px;
    font-weight: 800;
    color: #061226;
    margin-bottom: 12px;
    line-height: 1.05;
    text-shadow: 0 1px 0 rgba(255,255,255,0.8);
  }
  .award-desc { font-family: 'Source Serif 4', serif; font-size: 15px; line-height: 1.85; font-weight: 650; color: rgba(6,18,38,0.92); margin-bottom: 0; max-width: none; }
  .awards-section .award-desc { color: rgba(6,18,38,0.92) !important; -webkit-text-fill-color: rgba(6,18,38,0.92); }
  .award-tags { display: none; }
  .award-tag { display: none; }

  @media (max-width: 820px) {
    .award-surface { padding: 22px 18px 28px; }
    .award-layout { text-align: center; }
    .award-desc { margin-left: auto; margin-right: auto; }
    .award-kicker { justify-content: center; }
    .award-kicker::before { width: 26px; }
    .award-content { padding: 0; }
  }

  /* ── FACULTY ─────────────────────────────────────────────────────────────── */
  .faculty-section { padding: 84px 0; }
  .faculty-card {
    padding: 80px; background: rgba(15,31,56,0.5); border: 1px solid rgba(201,168,76,0.12);
    position: relative; overflow: hidden; text-align: center;
    transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
  }
  .faculty-card:hover { border-color: rgba(201,168,76,0.25); box-shadow: 0 0 80px rgba(201,168,76,0.06); }
  .faculty-bg-text {
    position: absolute; font-family: 'Cormorant Garamond', serif; font-size: 200px; font-weight: 700;
    color: rgba(201,168,76,0.03); top: 50%; left: 50%; transform: translate(-50%, -50%);
    white-space: nowrap; pointer-events: none; letter-spacing: -0.05em;
    animation: bgTextDrift 20s ease-in-out infinite;
  }
  @keyframes bgTextDrift {
    0%,100% { transform: translate(-50%,-50%) scale(1); }
    50%     { transform: translate(-50%,-50%) scale(1.06); }
  }
  .faculty-title { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; color: var(--white); margin-bottom: 20px; }
  .faculty-desc { font-size: 16px; line-height: 1.8; color: var(--muted); max-width: 600px; margin: 0 auto 48px; }
  .faculty-icons {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 28px;
    justify-items: center;
    align-items: start;
    max-width: 760px;
    margin: 0 auto;
  }
  .faculty-icon-item { text-align: center; cursor: none; min-width: 0; }
  .faculty-icon {
    width: 62px; height: 62px; display: grid; place-items: center; margin: 0 auto 12px;
    border-radius: 50%; border: 1px solid rgba(232,201,107,0.42);
    background: linear-gradient(145deg, rgba(201,168,76,0.16), rgba(10,22,40,0.76));
    color: var(--gold-light);
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,0.06),
      0 14px 34px rgba(0,0,0,0.24);
    transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), filter 0.3s, border-color 0.3s, box-shadow 0.3s;
  }
  .faculty-icon .premium-icon-image {
    filter:
      drop-shadow(0 8px 18px rgba(0,0,0,0.22))
      drop-shadow(0 0 16px rgba(201,168,76,0.28));
    transition: filter 0.35s ease;
  }
  .faculty-icon-item:hover .faculty-icon {
    transform: translateY(-7px);
    border-color: rgba(245,230,190,0.76);
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,0.10),
      0 18px 42px rgba(201,168,76,0.22);
  }
  .faculty-icon-item:hover .faculty-icon .premium-icon-image {
    filter:
      drop-shadow(0 10px 22px rgba(0,0,0,0.20))
      drop-shadow(0 0 24px rgba(201,168,76,0.52))
      drop-shadow(0 0 40px rgba(232,201,107,0.26));
  }
  .faculty-icon-label { font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }

  .premium-icon-image {
    width: 30px; height: 30px;
    display: block; object-fit: contain;
    filter: drop-shadow(0 4px 12px rgba(215,180,74,0.36));
  }
  .award-medal { --award-anim: clamp(160px, 22vw, 240px); }
  .award-medal .premium-icon-image { width: var(--award-anim); height: var(--award-anim); }
  .award-medal .award-lottie { width: var(--award-anim); height: var(--award-anim); }
  .award-medal .award-video { width: var(--award-anim); height: var(--award-anim); display: block; object-fit: contain; }
  .award-medal .award-lottie,
  .award-medal .award-video,
  .award-medal .premium-icon-image {
    border-radius: 999px;
  }
  .award-medal::before {
    border-radius: 999px;
  }
  .award-medal .award-lottie,
  .award-medal .award-video,
  .award-medal .premium-icon-image {
    box-shadow:
      0 18px 52px rgba(0,0,0,0.18),
      0 0 0 2px rgba(201,168,76,0.55),
      0 0 0 6px rgba(245,230,190,0.22),
      0 0 34px rgba(201,168,76,0.18);
  }
  .faculty-icon .premium-icon-image { width: 30px; height: 30px; }

  @media (max-width: 480px) {
    .award-medal { --award-anim: clamp(170px, 46vw, 250px); }
  }

  /* ── FAQ ─────────────────────────────────────────────────────────────────── */
  .faq-section { padding: 84px 0; background: transparent; }
  .faq-list { max-width: 900px; margin: 0 auto; display: grid; gap: 14px; }
  .faq-item {
    border: 1px solid rgba(201,168,76,0.14);
    background: rgba(10,22,40,0.62);
    overflow: hidden; position: relative;
    transition: border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.23,1,0.32,1);
  }
  .faq-item::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
    background: linear-gradient(180deg, transparent, rgba(232,201,107,0.85), transparent);
    opacity: 0; transition: opacity 0.35s ease;
  }
  .faq-item:hover,
  .faq-item.open {
    border-color: rgba(232,201,107,0.36);
    background: rgba(15,31,56,0.74);
    box-shadow: 0 18px 48px rgba(0,0,0,0.24), 0 0 42px rgba(201,168,76,0.06);
  }
  .faq-item.open { transform: translateY(-2px); }
  .faq-item.open::before { opacity: 1; }
  .faq-question {
    width: 100%; display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 18px;
    padding: 24px 26px; background: none; border: none; color: var(--white);
    font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 500; text-align: center;
    cursor: none; transition: color 0.3s;
  }
  .faq-question:hover { color: var(--gold); }
  .faq-index {
    font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.12em;
    color: var(--gold-light);
  }
  .faq-question-text { line-height: 1.45; text-align: center; }
  .faq-icon {
    width: 34px; height: 34px; display: grid; place-items: center; border-radius: 50%;
    border: 1px solid rgba(232,201,107,0.42);
    background: rgba(201,168,76,0.08);
    color: var(--gold-light); flex-shrink: 0;
    transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.3s, background 0.3s;
  }
  .faq-icon svg { display: block; }
  .faq-item.open .faq-icon {
    transform: rotate(180deg);
    border-color: rgba(245,230,190,0.76);
    background: rgba(201,168,76,0.16);
  }
  .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.5s cubic-bezier(0.23,1,0.32,1); }
  .faq-item.open .faq-answer { max-height: 300px; }
  .faq-answer-inner {
    padding: 0 26px 26px 68px; font-size: 15px; line-height: 1.8; color: var(--muted);
    max-width: 760px; margin: 0 auto; text-align: center;
  }

  /* ── CTA ─────────────────────────────────────────────────────────────────── */
  .cta-section { padding: 108px 0; position: relative; text-align: center; overflow: hidden; }
  .cta-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 80% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%);
    animation: ctaBgPulse 5s ease-in-out infinite;
  }
  @keyframes ctaBgPulse {
    0%,100% { transform: scale(1); }
    50% { transform: scale(1.06); }
  }
  .cta-grid-bg {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%);
    animation: gridPulse 3s ease-in-out infinite;
  }
  .cta-content { position: relative; z-index: 2; max-width: 700px; margin: 0 auto; padding: 0 24px; }
  .cta-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(52px, 8vw, 100px); font-weight: 300; line-height: 1; color: var(--white); margin-bottom: 32px;
  }
  .cta-title em { color: var(--gold); font-style: italic; }
  .cta-desc { font-size: 16px; line-height: 1.8; color: var(--muted); margin-bottom: 48px; max-width: 500px; margin-left: auto; margin-right: auto; }
  .cta-price-row { display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 40px; flex-wrap: wrap; }
  .cta-price-old { font-family: 'Cormorant Garamond', serif; font-size: 28px; color: var(--muted); text-decoration: line-through; opacity: 0.6; }
  .cta-price-new { font-family: 'Cormorant Garamond', serif; font-size: 64px; font-weight: 300; color: var(--gold); line-height: 1; }
  .glow-number { text-shadow: 0 0 40px rgba(201,168,76,0.5); animation: glowPulse 2.5s ease-in-out infinite; }
  @keyframes glowPulse {
    0%,100% { text-shadow: 0 0 40px rgba(201,168,76,0.5); }
    50% { text-shadow: 0 0 80px rgba(201,168,76,0.8), 0 0 120px rgba(201,168,76,0.3); }
  }
  .cta-price-badge {
    padding: 8px 16px; background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.3);
    font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--gold); align-self: flex-start; margin-top: 8px;
    animation: badgePulse 2s ease-in-out infinite;
  }
  @keyframes badgePulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.3); }
    50% { box-shadow: 0 0 0 8px rgba(201,168,76,0); }
  }
  .cta-btn {
    padding: 20px 60px; background: var(--gold); color: var(--deep);
    font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase; border: none; cursor: none;
    transition: all 0.4s cubic-bezier(0.23,1,0.32,1); margin-bottom: 24px;
    position: relative; overflow: hidden;
  }
  .cta-btn::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--gold-light), var(--gold));
    transform: translateX(-100%); transition: transform 0.4s cubic-bezier(0.23,1,0.32,1);
  }
  .cta-btn:hover { transform: translateY(-3px); box-shadow: 0 20px 60px rgba(201,168,76,0.4); }
  .cta-btn:hover::before { transform: translateX(0); }
  .cta-btn span { position: relative; z-index: 1; }
  .cta-note { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.1em; color: var(--muted); }

  /* ── FOOTER ──────────────────────────────────────────────────────────────── */
  .footer { padding: 80px 60px 40px; border-top: 1px solid rgba(201,168,76,0.1); background: transparent; }
  .footer-inner { max-width: 1200px; margin: 0 auto 60px; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 60px; text-align: center; }
  .footer-brand { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 600; color: var(--gold); letter-spacing: 0.08em; margin-bottom: 16px; }
  .footer-tagline { font-size: 13px; line-height: 1.8; color: var(--muted); max-width: 320px; margin: 0 auto; }
  .footer-heading { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 24px; }
  .footer-link { display: block; font-size: 13px; color: var(--muted); text-decoration: none; margin-bottom: 12px; transition: all 0.3s ease; cursor: none; }
  .footer-link:hover { color: var(--white); transform: translateY(-2px); }
  .footer-bottom { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: center; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.05); flex-wrap: wrap; gap: 16px; text-align: center; }
  .footer-copy { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.1em; color: rgba(138,155,176,0.6); }
  .footer-gold-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent); min-width: 40px; animation: lineSweep 3s ease-in-out infinite; }
  @keyframes lineSweep {
    0%,100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  /* ── SKELETON LOADING ────────────────────────────────────────────────────── */
  .skeleton {
    background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%);
    background-size: 200% 100%;
    animation: skeleton 1.5s infinite;
    border-radius: 4px;
  }
  @keyframes skeleton {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* ── MODAL ───────────────────────────────────────────────────────────────── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(4,8,15,0.8);
    backdrop-filter: blur(12px); z-index: 800;
    display: flex; align-items: center; justify-content: center;
    animation: modalOverlayIn 0.3s ease;
  }
  @keyframes modalOverlayIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .modal-box {
    background: rgba(10,22,40,0.95); border: 1px solid rgba(201,168,76,0.25);
    padding: 48px; max-width: 480px; width: 90%; position: relative;
    animation: modalBoxIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: 0 40px 120px rgba(0,0,0,0.6);
  }
  @keyframes modalBoxIn {
    from { opacity: 0; transform: scale(0.85) translateY(20px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  .modal-close {
    position: absolute; top: 16px; right: 16px; background: none; border: none;
    color: var(--muted); font-size: 22px; cursor: none; transition: color 0.3s;
  }
  .modal-close:hover { color: var(--gold); }
  .modal-title { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 300; color: var(--white); margin-bottom: 16px; }
  .modal-body { font-size: 15px; line-height: 1.8; color: var(--muted); margin-bottom: 32px; }

  /* ── PARALLAX SECTIONS ───────────────────────────────────────────────────── */
  .parallax-layer { will-change: transform; }

  /* ── RESPONSIVE ──────────────────────────────────────────────────────────── */
  @media (max-width: 1024px) {
    .nav { padding: 20px 32px; }
    .nav.scrolled { padding: 14px 32px; }
    .hero {
      min-height: auto;
      padding: 120px 32px 84px;
    }
    .hero-inner { grid-template-columns: 1fr; grid-template-areas: "side" "content"; gap: 36px; }
    .section-inner { padding: 0 32px; }
    .learn-grid { grid-template-columns: repeat(2, 1fr); }
    .about-grid { gap: 48px; }
    .footer { padding: 60px 32px 32px; }
    .footer-inner { padding: 0; gap: 40px; }
  }
  @media (max-width: 768px) {
    body { cursor: auto; }
    .nav { padding: 16px 24px; }
    .nav.scrolled { padding: 12px 24px; }
    .nav-links { display: none; }
    .nav-hamburger { display: flex; }
    .hero {
      min-height: auto;
      padding: 104px 24px 76px;
    }
    .hero-inner { grid-template-columns: 1fr; grid-template-areas: "side" "content"; gap: 30px; }
    .hero-side { opacity: 1; animation: heroFadeSlide 0.9s 0.15s cubic-bezier(0.23,1,0.32,1) both; }
    .hero-side-logo {
      width: clamp(128px, 42vw, 196px);
      max-width: 100%;
      animation-duration: 6s;
    }
    .hero-side-org {
      width: min(320px, 100%);
      margin-top: 12px;
      font-size: 19px;
      line-height: 1.28;
      padding-bottom: 12px;
    }
    .hero-content { max-width: 100%; }
    .hero-eyebrow { justify-content: center; text-align: center; }
    .hero-title { text-align: center; }
    .hero-subtitle { max-width: 620px; margin-left: auto; margin-right: auto; text-align: center; }
    .hero-actions { justify-content: center; }
    .section-inner { padding: 0 24px; }
    .about-section { padding: 56px 0; }
    .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .about-card { padding: 28px; }
    .about-right { margin-top: 0; }
    .card-stat-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
    .card-stat-num { font-size: 36px; }
    .learn-section { padding: 56px 0; }
    .learn-grid { grid-template-columns: 1fr; gap: 2px; }
    .outcomes-section { padding: 56px 0; }
    .outcomes-grid { grid-template-columns: 1fr; }
    .outcomes-card { padding: 28px; }
    .snapshot-grid { grid-template-columns: 1fr 1fr; }
    .structure-section { padding: 56px 0; }
    .structure-atlas { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
    .structure-atlas::before { display: none; }
    .curriculum-card { padding: 20px 18px; }
    .curriculum-title { font-size: 24px; }
    .curriculum-desc { margin-left: 0; max-width: none; text-align: left; }
    .curriculum-stage { height: 360px; }
    .curriculum-slide { width: min(420px, 92vw); }
    .curriculum-slide.pos--2,
    .curriculum-slide.pos-2 { display: none; }
    .diff-section { padding: 56px 0; }
    .diff-feature-grid { grid-template-columns: 1fr; gap: 20px; }
    .awards-section { padding: 56px 0; }
    .awards-grid { grid-template-columns: 1fr; gap: 20px; }
    .award-surface { padding: 32px 20px; }
    .faculty-section { padding: 56px 0; }
    .faculty-card { padding: 48px 24px; }
    .faculty-bg-text { font-size: 100px; }
    .faculty-icons { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px; max-width: 520px; }
    .faq-section { padding: 56px 0; }
    .faq-list { max-width: 100%; }
    .faq-question { font-size: 15px; padding: 22px 20px; gap: 14px; }
    .faq-answer-inner { padding: 0 20px 24px; }
    .cta-section { padding: 72px 0; }
    .cta-price-new { font-size: 48px; }
    .footer { padding: 60px 24px 32px; }
    .footer-inner { grid-template-columns: 1fr; gap: 40px; }
    .footer-bottom { flex-direction: column; text-align: center; }
    .footer-gold-line { display: none; }
  }
  @media (max-width: 480px) {
    .hero { padding: 96px 18px 64px; gap: 24px; }
    .hero-inner { gap: 24px; }
    .hero-side-logo { width: clamp(118px, 48vw, 164px); }
    .hero-side-org { font-size: 15px; }
    .hero-title { font-size: 42px; }
    .hero-eyebrow { margin-bottom: 20px; }
    .hero-subtitle { font-size: 14px; }
    .hero-actions { flex-direction: column; align-items: stretch; }
    .btn-primary { width: 100%; text-align: center; }
    .btn-secondary { justify-content: center; width: 100%; }
    .section-title { font-size: 32px; margin-bottom: 40px; }
    .learn-card { padding: 28px 20px; }
    .outcomes-card { padding: 24px 20px; }
    .outcomes-rotator-stage { min-height: 66px; }
    .outcomes-check { width: 30px; height: 30px; font-size: 13px; }
    .outcomes-text { font-size: 22px; padding-bottom: 8px; }
    .structure-atlas { grid-template-columns: 1fr; gap: 18px; }
    .curriculum-card { height: 312px; padding: 26px 20px; border-radius: 20px; }
    .curriculum-card::after { font-size: 88px; right: -6px; bottom: -18px; }
    .curriculum-title { font-size: 24px; }
    .curriculum-desc { font-size: 14px; }
    .diff-card { flex-direction: column; gap: 16px; padding: 28px 20px; }
    .diff-icon-wrap { width: 52px; height: 52px; }
    .award-medal { margin-bottom: 18px; }
    .faculty-icons { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; max-width: 420px; }
    .faculty-icon { width: 54px; height: 54px; }
    .faq-item { margin-inline: -2px; }
    .faq-question {
      grid-template-columns: 1fr auto;
      padding: 20px 16px;
      gap: 12px;
    }
    .faq-index { display: none; }
    .faq-icon { width: 30px; height: 30px; }
    .faq-answer-inner { padding: 0 16px 22px; }
    .cta-price-new { font-size: 40px; }
    .cta-btn { padding: 16px 32px; width: 100%; }
    .marquee-section { display: none; }
    .snapshot-grid { grid-template-columns: 1fr; }
  }

  /* Premium text hierarchy */
  p,
  .hero-subtitle,
  .hero-side-org,
  .about-body,
  .about-highlight,
  .learn-desc,
  .outcomes-lede,
  .outcomes-text,
  .curriculum-desc,
  .diff-desc,
  .award-desc,
  .faculty-desc,
  .faq-answer-inner,
  .cta-desc,
  .footer-tagline,
  .modal-body {
    color: #ffffff !important;
    -webkit-text-fill-color: #ffffff;
    font-family: 'Source Serif 4', Georgia, serif;
    font-weight: 400;
    letter-spacing: 0;
  }
  h1, h2, h3, h4, h5, h6,
  .hero-title,
  .hero-title em,
  .outline-text,
  .section-title,
  .section-title em,
  .learn-title,
  .outcomes-title,
  .curriculum-title,
  .diff-title,
  .award-title,
  .faculty-title,
  .faq-question,
  .cta-title,
  .cta-title em,
  .modal-title,
  .footer-brand,
  .card-stat-num,
  .cta-price-new {
    color: var(--gold-light) !important;
    -webkit-text-fill-color: var(--gold-light);
    -webkit-text-stroke: 0;
  }
  .cta-price-old,
  .footer-copy {
    opacity: 1;
  }
  ::placeholder {
    color: #ffffff !important;
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after { animation: none !important; transition-duration: 0.01ms !important; }
  }
`;

// ─── DATA ────────────────────────────────────────────────────────────────────
const LEARN_ITEMS = [
  { icon: "research", title: "Policy Research Foundations", desc: "Master the art of formulating research questions grounded in evidence and real-world relevance." },
  { icon: "data", title: "Data Analysis for Policy", desc: "Learn to collect, analyze, and interpret quantitative and qualitative data for policy insights." },
  { icon: "sdg", title: "SDG Frameworks", desc: "Understand how the Sustainable Development Goals shape global and national policy agendas." },
  { icon: "writing", title: "Academic Writing", desc: "Craft clear, compelling policy papers that meet international academic and publication standards." },
  { icon: "thinking", title: "Critical Policy Thinking", desc: "Develop the analytical mindset to evaluate policies, identify gaps, and propose alternatives." },
  { icon: "advocacy", title: "Advocacy & Communication", desc: "Turn research into action: learn how to present findings to diverse audiences and stakeholders." },
];
const LEARN_ICON_IMAGES = [learnImg1, learnImg2, learnImg3, learnImg4, learnImg5, learnImg6];
const CURRICULUM = [
  { num: "01", icon: "sdg", tag: "Policy Lens", title: "Introduction to Public Policy & SDGs", desc: "Foundations of policy analysis, the SDG ecosystem, and the research landscape." },
  { num: "02", icon: "research", tag: "Research Blueprint", title: "Research Design & Methodology", desc: "Qualitative, quantitative, and mixed-methods approaches tailored for policy research." },
  { num: "03", icon: "data", tag: "Evidence Engine", title: "Data Collection & Evidence Building", desc: "Primary and secondary data strategies, ethical considerations, and source evaluation." },
  { num: "04", icon: "government", tag: "Policy Lab", title: "Policy Analysis Frameworks", desc: "Stakeholder analysis, cost-benefit frameworks, and implementation tools." },
  { num: "05", icon: "writing", tag: "Publication Craft", title: "Academic Writing & Publication", desc: "Structure, argumentation, citation standards, and journal submission processes." },
  { num: "06", icon: "certificate", tag: "Capstone Studio", title: "Capstone: Policy Brief Development", desc: "Apply everything learned to produce a publishable, review-ready policy paper." },
];
const DIFF_FEATURES = [
  { icon: "medal", title: "Gold Medal Awards", desc: "Top 2 papers receive prestigious gold medal recognition from a distinguished panel." },
  { icon: "book", title: "ISBN Book Publication", desc: "Selected papers are published as official book chapters with global ISBN registration." },
  { icon: "globalSouth", title: "Global South Focus", desc: "Curriculum and pricing designed to empower researchers from underrepresented regions." },
  { icon: "mentor", title: "Expert Mentorship", desc: "Live sessions with practitioners from academia, government, and international agencies." },
  { icon: "certificate", title: "Recognized Certificate", desc: "Earn a verifiable certificate from IISPPR upon successful course completion." },
  { icon: "briefcase", title: "Career Acceleration", desc: "Build your academic CV with publications and credentials that open global doors." },
];
const FAQS = [
  { q: "Who is this course designed for?", a: "This course is designed for students, young professionals, aspiring researchers, activists, and curious citizens — especially those from the Global South — who want to understand how public policy shapes the world and how to engage with it critically." },
  { q: "How long is the course and how is it delivered?", a: "The course includes 36 hours of structured learning, delivered online with real-world examples and practical assignments. Learn at your own pace — anytime, anywhere." },
  { q: "What will I get at the end of the course?", a: "You'll receive a Certificate of Completion, the opportunity to publish a policy paper, and a chance to compete for the Gold Medal award. Selected papers will be published in an ISBN-registered book." },
  { q: "Is the ₹2,999 price refundable?", a: "The pre-launch pricing is non-refundable. We recommend reviewing the course details thoroughly and ensuring it aligns with your goals before enrolling." },
  { q: "Can I join if I am from outside India?", a: "Absolutely. The course is globally accessible and designed to include researchers from the Global South and beyond." },
];
const MARQUEE_ITEMS = [
  "Evidence-Based Policy","SDG Research","Academic Publication","Gold Medal Awards",
  "Global South","ISBN Chapters","Expert Mentorship","Policy Innovation",
  "Evidence-Based Policy","SDG Research","Academic Publication","Gold Medal Awards",
  "Global South","ISBN Chapters","Expert Mentorship","Policy Innovation",
];
const OUTCOMES = [
  "Policy data basics: stats + visualization.",
  "Read and interpret policy indicators.",
  "Use ML/AI responsibly for public problems.",
  "Spot bias, gaps, and ethical risks.",
  "Tell the story with clear briefs.",
  "Build a portfolio-ready capstone.",
];
const PROGRAM_PILLS = [
  { num: "36+", label: "Hours of structured learning" },
  { num: "60",  label: "Days guided journey" },
  { num: "18",  label: "Expert-led sessions" },
  { num: "₹2,999", label: "Pre-launch price" },
];
const SITE_LINKS = {
  brochure: "https://iisppracademy.com/ppp-brochure/",
  payment:  "https://iisppracademy.com/payment-page/",
};

const PREMIUM_ICON_IMAGES = {
  research: researchIcon,
  data: dataIcon,
  sdg: sdgIcon,
  writing: writingIcon,
  thinking: thinkingIcon,
  advocacy: advocacyIcon,
  medal: medalIcon,
  book: bookIcon,
  globalSouth: globalSouthIcon,
  mentor: mentorIcon,
  certificate: certificateIcon,
  briefcase: briefcaseIcon,
  academia: academiaIcon,
  government: governmentIcon,
  development: developmentIcon,
  thinkTank: thinkTankIcon,
};

function PremiumIcon({ name }) {
  const iconSrc = PREMIUM_ICON_IMAGES[name] || PREMIUM_ICON_IMAGES.research;

  return (
    <img
      className="premium-icon-image"
      src={iconSrc}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
    />
  );
}

// ─── CUSTOM CURSOR ───────────────────────────────────────────────────────────
// ─── MAGNETIC BUTTON ────────────────────────────────────────────────────────
function MagneticWrap({ children, strength = 0.35 }) {
  const ref  = useRef(null);

  const handleMove = useCallback((e) => {
    const el   = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) * strength;
    const dy   = (e.clientY - cy) * strength;
    el.style.transform = `translate(${dx}px,${dy}px)`;
  }, [strength]);

  const handleLeave = useCallback(() => {
    const el = ref.current; if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.23,1,0.32,1)";
    el.style.transform  = "translate(0,0)";
    setTimeout(() => { if (el) el.style.transition = ""; }, 500);
  }, []);

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}

// ─── 3D TILT CARD ────────────────────────────────────────────────────────────
function TiltCard({ children, className = "", style = {}, ...props }) {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const el   = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * 20;
    const y    = ((e.clientY - rect.top)  / rect.height - 0.5) * -20;
    el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
    el.style.boxShadow = `${-x * 2}px ${y * 2}px 40px rgba(201,168,76,0.12)`;
  }, []);
  const handleLeave = useCallback(() => {
    const el = ref.current; if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
    el.style.boxShadow = "";
  }, []);
  return (
    <div
      ref={ref}
      className={`tilt-card gold-border-box ${className}`}
      style={{ ...style, position: "relative", transition: "transform 0.15s ease, box-shadow 0.15s ease" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      <div className="gold-border-layer" aria-hidden="true" />
      <div className="tilt-card-inner" style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

// ─── PARALLAX HOOK ───────────────────────────────────────────────────────────
function useParallax(speed = 0.2) {
  const ref    = useRef(null);
  useEffect(() => {
    const tick = () => {
      const el = ref.current; if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${center * speed}px)`;
    };
    window.addEventListener("scroll", tick, { passive: true });
    tick();
    return () => window.removeEventListener("scroll", tick);
  }, [speed]);
  return ref;
}

// ─── COUNTER ANIMATION ───────────────────────────────────────────────────────
// ─── TYPEWRITER ──────────────────────────────────────────────────────────────
// ─── LOADING SKELETON (hero pre-load) ────────────────────────────────────────
function HeroSkeleton() {
  return (
    <div style={{ padding: "0 60px", paddingTop: "35vh" }}>
      <div className="skeleton" style={{ width: 160, height: 16, marginBottom: 32 }} />
      <div className="skeleton" style={{ width: "60%", height: 80, marginBottom: 16 }} />
      <div className="skeleton" style={{ width: "40%", height: 80, marginBottom: 16 }} />
      <div className="skeleton" style={{ width: "30%", height: 80, marginBottom: 32 }} />
      <div className="skeleton" style={{ width: 300, height: 16, marginBottom: 12 }} />
      <div className="skeleton" style={{ width: 260, height: 16, marginBottom: 48 }} />
      <div style={{ display: "flex", gap: 16 }}>
        <div className="skeleton" style={{ width: 180, height: 52 }} />
        <div className="skeleton" style={{ width: 160, height: 52 }} />
      </div>
    </div>
  );
}

// ─── MODAL ───────────────────────────────────────────────────────────────────
function Modal({ open, onClose }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box gold-border-box" onClick={e => e.stopPropagation()}>
        <div className="gold-border-layer" aria-hidden="true" />
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-title">Ready to Enroll?</div>
        <div className="modal-body">
          Claim your pre-launch seat at ₹2,999 — a 63% discount off the regular price. Limited seats available. Click below to proceed to the payment page.
        </div>
        <MagneticWrap>
          <button
            className="cta-btn"
            style={{ marginBottom: 0 }}
            onClick={() => window.open(SITE_LINKS.payment, "_blank", "noopener,noreferrer")}
          >
            <span>Proceed to Payment →</span>
          </button>
        </MagneticWrap>
      </div>
    </div>
  );
}

// ─── SVG PATH ANIMATOR ───────────────────────────────────────────────────────
function DecorativeSVG() {
  return (
    <svg
      style={{ position: "absolute", top: 0, right: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.07 }}
      viewBox="0 0 800 600"
      fill="none"
    >
      <path
        d="M100,300 Q250,50 400,300 T700,300"
        stroke="#C9A84C" strokeWidth="1.5" fill="none"
        strokeDasharray="600" strokeDashoffset="600"
        style={{ animation: "pathDraw 3s 0.5s ease forwards" }}
      />
      <path
        d="M0,400 Q200,200 400,400 Q600,600 800,400"
        stroke="#C9A84C" strokeWidth="1" fill="none"
        strokeDasharray="900" strokeDashoffset="900"
        style={{ animation: "pathDraw 4s 1s ease forwards" }}
      />
      <style>{`
        @keyframes pathDraw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes caretBlink { 50% { opacity: 0; } }
      `}</style>
    </svg>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled,       setScrolled]       = useState(false);
  const [navHidden,      setNavHidden]      = useState(false);
  const [openFaq,        setOpenFaq]        = useState(null);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [activeSection,  setActiveSection]  = useState("about");
  const [modalOpen,      setModalOpen]      = useState(false);
  const [loaded,         setLoaded]         = useState(false);
  const [moduleIndex,    setModuleIndex]    = useState(0);
  const [modulePaused,   setModulePaused]   = useState(false);
  const [outcomeIndex,   setOutcomeIndex]   = useState(0);
  const [outcomePaused,  setOutcomePaused]  = useState(false);
  const [diffIndex,      setDiffIndex]      = useState(0);
  const [diffPaused,     setDiffPaused]     = useState(false);
  const lastScrollY = useRef(0);
  const parallaxRef = useParallax(0.15);

  const navItems = useMemo(() => [
    { label: "About",      id: "about"      },
    { label: "Curriculum", id: "curriculum" },
    { label: "Outcomes",   id: "outcomes"   },
    { label: "Awards",     id: "awards"     },
    { label: "Faculty",    id: "faculty"    },
    { label: "FAQ",        id: "faq"        },
  ], []);

  const scrollToId = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Skeleton -> content
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 800); return () => clearTimeout(t); }, []);

  // Scroll effects
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setNavHidden(y > lastScrollY.current && y > 200);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [loaded]);

  // Count-up stats (About card)
  useEffect(() => {
    if (!loaded) return;
    const statEls = Array.from(document.querySelectorAll(".about-card .card-stat-num"));
    if (!statEls.length) return;

    const format = new Intl.NumberFormat(undefined);
    const parsed = statEls.map((el) => {
      const original = (el.textContent || "").trim();
      const digits = original.replace(/[^\d]/g, "");
      const target = digits ? Number(digits) : null;
      const prefixMatch = original.match(/^[^\d]+/);
      const prefix = prefixMatch ? prefixMatch[0] : "";
      return { el, original, target, prefix, started: false };
    });

    const animateTo = (el, prefix, target) => {
      const start = performance.now();
      const dur = 1100;
      const from = 0;
      const ease = (t) => 1 - Math.pow(1 - t, 3);
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const v = Math.round(from + (target - from) * ease(p));
        el.textContent = prefix + format.format(v);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const item = parsed.find(p => p.el === e.target);
          if (!item || item.started) continue;
          item.started = true;
          if (typeof item.target === "number" && Number.isFinite(item.target)) {
            animateTo(item.el, item.prefix, item.target);
          } else {
            item.el.textContent = item.original;
          }
        }
      },
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" }
    );

    parsed.forEach(p => obs.observe(p.el));
    return () => obs.disconnect();
  }, [loaded]);

  // Active section
  useEffect(() => {
    const sections = navItems.map(n => document.getElementById(n.id)).filter(Boolean);
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      entries => {
        const vis = entries.filter(e => e.isIntersecting).sort((a,b) => (b.intersectionRatio||0) - (a.intersectionRatio||0));
        if (vis[0]?.target?.id) setActiveSection(vis[0].target.id);
      },
      { threshold: [0.2,0.35,0.5], rootMargin: "-20% 0px -65% 0px" }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, [navItems, loaded]);

  // Body lock on mobile menu
  useEffect(() => { document.body.classList.toggle("menu-open", mobileOpen); return () => document.body.classList.remove("menu-open"); }, [mobileOpen]);

  // Escape key
  useEffect(() => {
    const h = e => { if (e.key === "Escape") { setMobileOpen(false); setModalOpen(false); } };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const moduleCount = CURRICULUM.length;
  const modIndex = useCallback((n) => ((n % moduleCount) + moduleCount) % moduleCount, [moduleCount]);
  const goNextModule = useCallback(() => setModuleIndex(i => modIndex(i + 1)), [modIndex]);
  const goPrevModule = useCallback(() => setModuleIndex(i => modIndex(i - 1)), [modIndex]);

  // Auto-advance modules (pauses on hover/focus)
  useEffect(() => {
    if (modulePaused) return;
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    const t = window.setInterval(goNextModule, 2000);
    return () => window.clearInterval(t);
  }, [goNextModule, modulePaused]);

  const outcomeCount = OUTCOMES.length;
  const nextOutcome = useCallback(() => setOutcomeIndex(i => (i + 1) % outcomeCount), [outcomeCount]);

  useEffect(() => {
    if (outcomePaused) return;
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    const t = window.setInterval(nextOutcome, 2600);
    return () => window.clearInterval(t);
  }, [nextOutcome, outcomePaused]);

  const diffCount = DIFF_FEATURES.length;
  const nextDiff = useCallback(() => setDiffIndex(i => (i + 1) % diffCount), [diffCount]);

  useEffect(() => {
    if (diffPaused) return;
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    const t = window.setInterval(nextDiff, 1800);
    return () => window.clearInterval(t);
  }, [nextDiff, diffPaused]);

  return (
    <>
      <style>{styles}</style>
      <div className="noise" />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
      <a className="skip-link" href="#main">Skip to content</a>

      {/* MOBILE MENU */}
      <div className={"mobile-menu" + (mobileOpen ? " open" : "")} role="dialog" aria-modal="true" aria-label="Mobile menu">
        <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">✕</button>
        {navItems.map(n => (
          <a key={n.id} className={"nav-link" + (activeSection === n.id ? " active" : "")} href={"#" + n.id}
            onClick={e => { e.preventDefault(); setMobileOpen(false); scrollToId(n.id); }}>
            {n.label}
          </a>
        ))}
        <button className="nav-cta" onClick={() => { setMobileOpen(false); setModalOpen(true); }}>Enroll Now</button>
      </div>

      {/* NAVBAR */}
      <nav className={"nav" + (scrolled ? " scrolled" : "") + (navHidden ? " hidden" : "")}>
        <a className="nav-logo" href="#about" onClick={e => { e.preventDefault(); scrollToId("about"); }}>
          <NavLogoImage />
          IISPPR <span>Academy</span>
        </a>
        <div className="nav-links">
          {navItems.map(n => (
            <a key={n.id} className={"nav-link" + (activeSection === n.id ? " active" : "")} href={"#" + n.id}
              onClick={e => { e.preventDefault(); scrollToId(n.id); }}>
              {n.label}
            </a>
          ))}
          <MagneticWrap>
            <button className="nav-cta" onClick={() => setModalOpen(true)}>Enroll Now</button>
          </MagneticWrap>
        </div>
        <button className="nav-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      <main id="main">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="hero gradient-bg-anim">
          <div className="hero-bg" />
          <div className="hero-grid" />
          <div className="hero-orb orb1" />
          <div className="hero-orb orb2" />
          <div className="hero-orb orb3" />

          {/* Floating geometric decorations */}
          <div className="hero-floater" style={{ right: "8%", top: "15%", animationDelay: "0.8s", animationDuration: "7s" }}>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <rect x="10" y="10" width="40" height="40" stroke="rgba(201,168,76,0.25)" strokeWidth="1" transform="rotate(20 30 30)" />
              <rect x="18" y="18" width="24" height="24" stroke="rgba(201,168,76,0.15)" strokeWidth="1" transform="rotate(20 30 30)" />
            </svg>
          </div>
          <div className="hero-floater" style={{ right: "18%", bottom: "25%", animationDelay: "1.2s", animationDuration: "9s" }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="rgba(74,144,217,0.2)" strokeWidth="1" />
              <circle cx="20" cy="20" r="8"  stroke="rgba(74,144,217,0.15)" strokeWidth="1" />
            </svg>
          </div>
          <div className="hero-floater" style={{ left: "15%", top: "20%", animationDelay: "0.4s", animationDuration: "11s" }}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <polygon points="15,2 28,27 2,27" stroke="rgba(201,168,76,0.2)" strokeWidth="1" fill="none" />
            </svg>
          </div>

          <DecorativeSVG />

          <div className="hero-inner" aria-label="Hero content">
            <aside className="hero-side" aria-label="Organization identity">
              <img className="hero-side-logo" src="/logo.png" alt="IISPPR logo" />
              <div className="hero-side-org">
                <strong>International Institute</strong> of SDGs &amp; Public Policy Research
              </div>
            </aside>

          {!loaded ? <HeroSkeleton /> : (
            <div className="hero-content" ref={parallaxRef}>
              <div className="hero-eyebrow">
              </div>
              <h1 className="hero-title">
                <span className="word-wrap"><span className="word-inner">Research.</span></span>
                <span className="word-wrap"><span className="word-inner" style={{ animationDelay: "0.45s" }}><em>Policy.</em></span></span>
                <span className="word-wrap"><span className="word-inner" style={{ animationDelay: "0.6s" }}><span className="outline-text">Published.</span></span></span>
              </h1>
              <p className="hero-subtitle">
                Build policy research that carries authority. A premium, evidence-led program for emerging researchers from the Global South and beyond - learn the method, sharpen your voice, and publish work that matters.
              </p>
              <div className="hero-actions">
                <MagneticWrap>
                  <button className="btn-primary" onClick={() => setModalOpen(true)}>
                    <span>Enroll for ₹2,999 →</span>
                  </button>
                </MagneticWrap>
                <button className="btn-secondary" onClick={() => scrollToId("curriculum")}>
                  View Curriculum ↓
                </button>
              </div>
            </div>
          )}
          </div>
        </section>

        {/* ── MARQUEE ──────────────────────────────────────────────────────── */}
        <div className="marquee-section">
          <div className="marquee-track">
            {MARQUEE_ITEMS.map((item, i) => (
              <div key={i} className="marquee-item">
                <div className="marquee-dot" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ── ABOUT ────────────────────────────────────────────────────────── */}
        <section className="about-section" id="about">
          <div className="section-inner">
            <div className="about-grid">
              <div className="reveal about-head">
                <div className="section-label">
                  <div className="label-line" />
                  <div className="label-text">About the Program</div>
                </div>
                <h2 className="section-title">Shape the Future<br /><em>Through Evidence</em></h2>
              </div>
              <div className="reveal about-left">
                <p className="about-body">
                  IISPPR's flagship program turns policy curiosity into publishable, evidence-backed research. It is crafted for ambitious learners who want to move beyond theory and produce work with academic credibility and real-world relevance.
                </p>
                <div className="about-highlight">
                  "Strong evidence deserves a strong voice. This program helps you build both."
                </div>
              </div>
              <div className="reveal reveal-delay-2 about-right">
                <div className="about-deco" />
                <TiltCard className="about-card glass-card shimmer-hover">
                  <div className="card-stat-grid">
                    {[
                      { num: "₹2,999", raw: "₹2,999", label: "Pre-Launch Price" },
                      { num: "18",     raw: "18",      label: "Total Lectures"   },
                      { num: "2",      raw: "2",       label: "Gold Medals"      },
                      { num: "ISBN",   raw: "ISBN",    label: "Publication"      },
                    ].map(s => (
                      <div key={s.label}>
                        <div className="card-stat-num">{s.raw}</div>
                        <div className="card-stat-label">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </div>
            </div>
          </div>
        </section>

        {/* ── LEARN ────────────────────────────────────────────────────────── */}
        <section className="learn-section" id="curriculum">
          <div className="section-inner">
            <div className="reveal">
              <div className="section-label">
                <div className="label-line" />
                <div className="label-text">Learning Outcomes</div>
              </div>
              <h2 className="section-title">What You Will<br /><em>Master</em></h2>
            </div>
            <div className="learn-grid">
              {LEARN_ITEMS.map((item, i) => (
                <TiltCard key={item.title} className={"learn-card shimmer-hover reveal reveal-delay-" + ((i % 3) + 1)}>
                  <div className="learn-icon">
                    <span className="learn-icon-mark">
                      <img className="learn-icon-img" src={LEARN_ICON_IMAGES[i]} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                    </span>
                  </div>
                  <div className="learn-title">{item.title}</div>
                  <div className="learn-desc">{item.desc}</div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── OUTCOMES ─────────────────────────────────────────────────────── */}
        <section className="outcomes-section" id="outcomes">
          <div className="section-inner">
            <div className="reveal">
              <div className="section-label">
                <div className="label-line" />
                <div className="label-text">Program Value</div>
              </div>
              <h2 className="section-title">What You Gain<br /><em>At a Glance</em></h2>
            </div>
            <div className="outcomes-grid">
              <div
                className="outcomes-card reveal gold-border-box"
                onMouseEnter={() => setOutcomePaused(true)}
                onMouseLeave={() => setOutcomePaused(false)}
                onFocusCapture={() => setOutcomePaused(true)}
                onBlurCapture={() => setOutcomePaused(false)}
              >
                <div className="gold-border-layer" aria-hidden="true" />
                <div className="outcomes-kicker">What you'll learn</div>
                <div className="outcomes-title">Outcomes that translate into real work</div>
                <div className="outcomes-lede">
                  Built for policy learners who want clarity, confidence, and a portfolio-ready output — without drowning in jargon.
                </div>

                <div className="outcomes-rotator" aria-label="Learning outcomes (rotating)">
                  <div className="outcomes-rotator-top">
                    <div className="outcomes-rotator-label">Key outcome</div>
                    <div className="outcomes-rotator-dots" aria-hidden="true">
                      {OUTCOMES.map((_, i) => (
                        <span key={i} className={"outcomes-rotator-dot" + (i === outcomeIndex ? " active" : "")} />
                      ))}
                    </div>
                  </div>
                  <div className="outcomes-rotator-stage">
                  <div key={outcomeIndex} className="outcomes-rotator-item">
                      <div className="outcomes-text">{OUTCOMES[outcomeIndex]}</div>
                    </div>
                  </div>
                </div>

                <div className="snapshot-grid" aria-label="Program snapshot">
                  {PROGRAM_PILLS.map(p => (
                    <div key={p.label} className="snapshot-stat">
                      <div className="snapshot-num">{p.num}</div>
                      <div className="snapshot-label">{p.label}</div>
                    </div>
                  ))}
                </div>
                <div className="snapshot-cta-row">
                  <a className="snapshot-cta" href={SITE_LINKS.brochure} target="_blank" rel="noreferrer">Download brochure →</a>
                  <a className="snapshot-link" href={SITE_LINKS.payment} target="_blank" rel="noreferrer">Payment →</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CURRICULUM TIMELINE ───────────────────────────────────────────── */}
        <section className="structure-section">
          <div className="section-inner">
            <div className="reveal">
              <div className="section-label">
                <div className="label-line" />
                <div className="label-text">Course Structure</div>
              </div>
              <h2 className="section-title">18 Lectures Across<br /><em>6 Core Modules</em></h2>
            </div>
            <div
              className="curriculum-carousel"
              onMouseEnter={() => setModulePaused(true)}
              onMouseLeave={() => setModulePaused(false)}
              onFocusCapture={() => setModulePaused(true)}
              onBlurCapture={() => setModulePaused(false)}
            >
              <div className="curriculum-stage" aria-label="6 Core Modules carousel">
                {[-2, -1, 0, 1, 2].map((pos) => {
                  const item = CURRICULUM[modIndex(moduleIndex + pos)];
                  const cls =
                    pos === 0 ? "pos-0" :
                    pos === -1 ? "pos--1" :
                    pos === 1 ? "pos-1" :
                    pos === -2 ? "pos--2" : "pos-2";

                  return (
                    <div
                      key={item.num}
                      className={"curriculum-slide " + cls}
                      aria-hidden={pos !== 0}
                    >
                      <TiltCard className="curriculum-card shimmer-hover">
                        <div className="curriculum-head">
                          <div className="curriculum-icon"><PremiumIcon name={item.icon} /></div>
                          <div>
                            <div className="curriculum-tag">{item.tag}</div>
                            <div className="curriculum-title">{item.title}</div>
                          </div>
                        </div>
                        <div className="curriculum-desc">{item.desc}</div>
                      </TiltCard>
                    </div>
                  );
                })}
              </div>

              <div className="curriculum-controls" aria-label="Carousel controls">
                <button type="button" className="curriculum-btn prev" onClick={goPrevModule} aria-label="Previous module">
                  <ChevronDownIcon />
                </button>
                <div className="curriculum-dots" aria-hidden="true">
                  {CURRICULUM.map((_, i) => (
                    <span key={i} className={"curriculum-dot" + (i === moduleIndex ? " active" : "")} />
                  ))}
                </div>
                <button type="button" className="curriculum-btn next" onClick={goNextModule} aria-label="Next module">
                  <ChevronDownIcon />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── DIFFERENTIATORS ───────────────────────────────────────────────── */}
        <section className="diff-section">
          <div className="section-inner">
            <div className="reveal">
              <div className="section-label">
                <div className="label-line" />
                <div className="label-text">Why IISPPR</div>
              </div>
              <h2 className="section-title">What Makes Us<br /><em>Different?</em></h2>
            </div>
            <div
              className="diff-rotator"
              onMouseEnter={() => setDiffPaused(true)}
              onMouseLeave={() => setDiffPaused(false)}
              onFocusCapture={() => setDiffPaused(true)}
              onBlurCapture={() => setDiffPaused(false)}
            >
              <div className="diff-rotator-card reveal gold-border-box">
                <div className="gold-border-layer" aria-hidden="true" />
                <div key={diffIndex} className="diff-rotator-anim">
                  <div className="diff-rotator-icon">
                    <PremiumIcon name={DIFF_FEATURES[diffIndex].icon} />
                  </div>
                  <div className="diff-rotator-title">{DIFF_FEATURES[diffIndex].title}</div>
                  <div className="diff-rotator-desc">{DIFF_FEATURES[diffIndex].desc}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── AWARDS ────────────────────────────────────────────────────────── */}
        <section className="awards-section" id="awards">
          <div className="awards-bg" />
          <div className="section-inner">
            <div className="reveal">
              <div className="section-label">
                <div className="label-line" />
                <div className="label-text">Recognition & Publication</div>
              </div>
              <h2 className="section-title">Compete for<br /><em>Excellence</em></h2>
            </div>
            <div className="awards-grid">
              {[
                { icon: "medal", animUrl: "/lottie/gold-medal.json", mp4Url: "https://cdnl.iconscout.com/lottie/free/thumb/free-gold-medal-animation-gif-download-12152648.mp4", title: "Gold Medal Recognition",
                  desc: "The authors of the Top 2 Best Papers will be awarded the prestigious Gold Medal, honoring their contribution to advancing meaningful, evidence-based public policy discussions.",
                  tags: [] },
              ].map((a, i) => (
                <TiltCard key={a.title} className={"award-card shimmer-hover reveal reveal-delay-" + (i + 1)}>
                  <div className="award-surface">
                    <div className="award-layout">
                      <div className="award-medal" aria-hidden="true">
                        <AwardAnim url={a.animUrl} fallbackIcon={a.icon} fallbackMp4Url={a.mp4Url} label={a.title} />
                      </div>
                      <div className="award-content">
                        <div className="award-kicker">Top 2 Best Papers</div>
                        <div className="award-title">{a.title}</div>
                        <div className="award-desc">{a.desc}</div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── FACULTY ───────────────────────────────────────────────────────── */}
        <section className="faculty-section" id="faculty">
          <div className="section-inner">
            <div className="reveal">
              <div className="section-label">
                <div className="label-line" />
                <div className="label-text">Faculty & Mentorship</div>
              </div>
              <h2 className="section-title">Learn From the<br /><em>Best Minds</em></h2>
            </div>
            <div className="faculty-card reveal glass-card gold-border-box">
              <div className="gold-border-layer" aria-hidden="true" />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="faculty-bg-text">IISPPR</div>
                <div className="faculty-title">Decades of Real-World Experience</div>
                <div className="faculty-desc">
                  Learn from experienced faculty and practitioners in public policy, data science, and governance innovation. Engage with mentors who bring decades of field experience from academia, government, and international development agencies.
                </div>
                <div className="faculty-icons">
                  {[
                  { icon: "academia", label: "Academia"         },
                  { icon: "government", label: "Govt. Bodies"     },
                  { icon: "development", label: "Intl. Development" },
                  { icon: "thinkTank", label: "Think Tanks"      },
                ].map(fi => (
                  <div key={fi.label} className="faculty-icon-item">
                    <span className="faculty-icon"><PremiumIcon name={fi.icon} /></span>
                    <div className="faculty-icon-label">{fi.label}</div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="faq-section" id="faq">
          <div className="section-inner">
            <div className="reveal">
              <div className="section-label">
                <div className="label-line" />
                <div className="label-text">FAQ</div>
              </div>
              <h2 className="section-title">Common <em>Questions</em></h2>
            </div>
            <div className="faq-list">
              {FAQS.map((faq, i) => (
                <div key={i} className={"faq-item" + (openFaq === i ? " open" : "")}>
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="faq-question-text">{faq.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      <ChevronDownIcon />
                    </span>
                  </button>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="cta-section" id="cta">
          <div className="cta-bg" />
          <div className="cta-grid-bg" />
          <div className="cta-content reveal">
            <div className="section-label" style={{ justifyContent: "center" }}>
              <div className="label-line" />
              <div className="label-text">Join Today</div>
            </div>
            <h2 className="cta-title">
              Your Research.<br />
              Your Voice.<br />
              <em>Published.</em>
            </h2>
            <p className="cta-desc">
              For just ₹2,999, access global-level learning designed for students, young professionals, and everyday change-makers — especially from the Global South.
            </p>
            <div className="cta-price-row">
              <div className="cta-price-old">₹7,999</div>
              <div className="cta-price-new glow-number">₹2,999</div>
              <div className="cta-price-badge">Pre-Launch</div>
            </div>
            <MagneticWrap strength={0.25}>
              <button className="cta-btn" onClick={() => setModalOpen(true)}>
                <span>Claim Your Seat Now →</span>
              </button>
            </MagneticWrap>
            <div style={{ height: 16 }} />
            <div className="cta-note">⚡ Limited pre-launch slots · Non-refundable · Fully Online</div>
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────────────────────────────── */}
        <footer className="footer">
          <div className="footer-inner">
            <div>
              <div className="footer-brand">IISPPR</div>
              <div className="footer-tagline">
                International Institute of SDGs & Public Policy Research — empowering the next generation of evidence-based change-makers worldwide.
              </div>
            </div>
            <div>
              <div className="footer-heading">Program</div>
              {[
                { label: "About Course", id: "about"      },
                { label: "Curriculum",   id: "curriculum" },
                { label: "Outcomes",     id: "outcomes"   },
                { label: "Faculty",      id: "faculty"    },
                { label: "Awards",       id: "awards"     },
              ].map(l => (
                <a key={l.label} className="footer-link" href={"#" + l.id}
                  onClick={e => { e.preventDefault(); scrollToId(l.id); }}>
                  {l.label}
                </a>
              ))}
            </div>
            <div>
              <div className="footer-heading">Quick Links</div>
              {[
                { label: "Enroll Now",        onClick: () => setModalOpen(true)               },
                { label: "Download Brochure", href: SITE_LINKS.brochure                       },
                { label: "FAQ",               onClick: () => scrollToId("faq")                },
                { label: "Payment",           href: SITE_LINKS.payment                        },
                { label: "Contact",           href: "mailto:info@iisppracademy.com"           },
              ].map(l => (
                <a key={l.label} className="footer-link"
                  href={l.href ?? "#"}
                  target={l.href?.startsWith("http") ? "_blank" : undefined}
                  rel={l.href?.startsWith("http") ? "noreferrer" : undefined}
                  onClick={e => { if (l.onClick) { e.preventDefault(); l.onClick(); } }}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2025 IISPPR Academy. All Rights Reserved.</div>
            <div className="footer-gold-line" />
            <div className="footer-copy">Designed for the Global South</div>
          </div>
        </footer>
      </main>
    </>
  );
}
