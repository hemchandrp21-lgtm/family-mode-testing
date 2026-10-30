/**
 * OriginOS Family Mode - Tactile Interactions & Audio Haptics Engine
 * Provides authentic spring physics, audio micro-haptics, tap ripples,
 * and fluid gesture handling across all prototype screens.
 */

(function () {
  'use strict';

  // 1. Audio Synthesizer (Micro-Haptics)
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioCtx = new AudioCtx();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function isSoundEnabled() {
    return localStorage.getItem('familyModeSoundEnabled') !== 'false';
  }

  const Haptics = {
    tap: () => {
      if (!isSoundEnabled()) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.02);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    },
    toggleOn: () => {
      if (!isSoundEnabled()) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    },
    toggleOff: () => {
      if (!isSoundEnabled()) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    },
    success: () => {
      if (!isSoundEnabled()) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.09, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.35);
      });
    },
    tick: () => {
      if (!isSoundEnabled()) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(2200, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.008);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.008);
    }
  };

  window.OriginHaptics = Haptics;

  // 2. Dynamic Tap Ripple
  function createRipple(e) {
    const target = e.currentTarget;
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'origin-ripple';

    const size = Math.max(rect.width, rect.height);
    const x = (e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : rect.left + rect.width / 2)) - rect.left - size / 2;
    const y = (e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : rect.top + rect.height / 2)) - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    target.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  // 3. Floating OriginOS Toast Banner
  window.showOriginToast = function (text, iconType = 'info') {
    let toast = document.querySelector('.origin-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'origin-toast';
      document.body.appendChild(toast);
    }

    const icons = {
      check: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"/></svg>`,
      bell: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>`,
      info: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>`
    };

    toast.innerHTML = `${icons[iconType] || icons.info}<span>${text}</span>`;
    toast.classList.add('show');
    Haptics.tap();

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  };

  // 4. Attach Interactive Microinteractions to DOM
  function initMicrointeractions() {
    // Add page transition class to main body or container
    const mainContainer = document.querySelector('main') || document.body;
    if (mainContainer && !mainContainer.classList.contains('page-fade-in')) {
      mainContainer.classList.add('page-fade-in');
    }

    // Attach ripples and sound to buttons, pills, toggles, chips
    const interactiveSelectors = [
      'button',
      '.action-btn',
      '.toggle-circle',
      '.day-chip',
      '.setting-row',
      '.minimal-radio',
      'a[href]',
      'input[type="checkbox"]'
    ];

    document.querySelectorAll(interactiveSelectors.join(',')).forEach((el) => {
      if (el._originInteractiveAttached) return;
      el._originInteractiveAttached = true;

      el.addEventListener('pointerdown', (e) => {
        // Haptic feedback
        if (el.matches('input[type="checkbox"], input[type="radio"], .minimal-radio')) {
          Haptics.toggleOn();
        } else if (el.matches('.toggle-circle, .day-chip')) {
          Haptics.tap();
        } else {
          Haptics.tap();
        }

        // Tap ripple for appropriate elements
        if (!el.matches('input, select')) {
          createRipple(e);
        }
      });
    });

    // 4.5. Smart Animate Navigation Interceptor
    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:')) return;
      if (!href.includes('/screens/')) return;

      link.addEventListener('click', (e) => {
        // Detect if link is back/previous
        let isBackward = false;
        const aria = (link.getAttribute('aria-label') || '').toLowerCase();
        const text = link.innerText.toLowerCase();
        if (aria.includes('back') || aria.includes('settings') || text.includes('back') ||
            link.querySelector('svg path[d*="15 19l-7-7"]') || 
            link.querySelector('svg path[d*="10 19l-7-7"]')) {
          isBackward = true;
        }

        const direction = isBackward ? 'backward' : 'forward';

        if (window.self !== window.top) {
          // Inside Simulator: Tell parent to execute animated screen switch
          e.preventDefault();
          window.parent.postMessage({
            action: 'smart-animate-navigate',
            url: href,
            direction: direction
          }, '*');
        } else {
          // Direct Page View: Smooth animated transition
          e.preventDefault();
          const main = document.querySelector('main') || document.body;
          if (main) {
            main.classList.remove('page-exit-left', 'page-exit-right');
            main.classList.add(isBackward ? 'page-exit-right' : 'page-exit-left');
          }
          setTimeout(() => {
            window.location.href = href;
          }, 210);
        }
      });
    });

  // Global smooth navigation helper for JS redirects
  window.smoothNavigate = function (url, direction = 'down') {
    let dir = direction;
    if (typeof direction === 'boolean') {
      dir = direction ? 'backward' : 'forward';
    }
    if (window.OriginHaptics) window.OriginHaptics.tap();

    if (window.self !== window.top) {
      window.parent.postMessage({
        action: 'smart-animate-navigate',
        url: url,
        direction: dir
      }, '*');
    } else {
      const main = document.querySelector('main') || document.body;
      if (main) {
        main.classList.remove('page-exit-left', 'page-exit-right', 'page-exit-down', 'page-exit-up');
        if (dir === 'down' || dir === 'from-top') {
          main.classList.add('page-exit-down');
        } else if (dir === 'up') {
          main.classList.add('page-exit-up');
        } else if (dir === 'backward') {
          main.classList.add('page-exit-right');
        } else {
          main.classList.add('page-exit-left');
        }
      }
      setTimeout(() => {
        window.location.href = url;
      }, 210);
    }
  };

    // 5. Enhanced Gesture Drag for Sliding Control Center Top Handle
    const topBar = document.getElementById('top-status-bar');
    const drawer = document.getElementById('control-center-drawer');
    if (topBar && drawer && !topBar._dragAttached) {
      topBar._dragAttached = true;
      let startY = 0;
      let currentY = 0;
      let isDragging = false;

      topBar.addEventListener('pointerdown', (e) => {
        startY = e.clientY;
        isDragging = true;
        topBar.setPointerCapture(e.pointerId);
        drawer.style.transition = 'none';
      });

      topBar.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        currentY = Math.max(0, e.clientY - startY);
        // Translate drawer smoothly down with dampening
        const maxTranslate = drawer.offsetHeight || 844;
        const boundedY = Math.min(currentY, maxTranslate);
        drawer.style.transform = `translateY(calc(-100% + ${boundedY}px))`;
      });

      const handlePointerEnd = (e) => {
        if (!isDragging) return;
        isDragging = false;
        drawer.style.transition = 'transform 0.32s cubic-bezier(0.16, 1, 0.3, 1)';
        const threshold = 70; // 70px drag down threshold

        if (currentY > threshold) {
          // Open Control Center
          drawer.classList.remove('-translate-y-full');
          drawer.classList.add('translate-y-0');
          drawer.style.transform = '';
          Haptics.toggleOn();
        } else {
          // Snap back closed
          drawer.classList.remove('translate-y-0');
          drawer.classList.add('-translate-y-full');
          drawer.style.transform = '';
          Haptics.toggleOff();
        }
        currentY = 0;
      };

      topBar.addEventListener('pointerup', handlePointerEnd);
      topBar.addEventListener('pointercancel', handlePointerEnd);
    }

    // 6. Interactive Slider Controls (Quick Settings Brightness & Media)
    const sliders = document.querySelectorAll('.slider-track');
    sliders.forEach((track) => {
      if (track._sliderAttached) return;
      track._sliderAttached = true;

      const fill = track.querySelector('.slider-fill');
      if (!fill) return;

      let isSliding = false;
      let lastTickPercent = parseInt(fill.style.height || '50', 10);

      const updateSliderFromPointer = (e) => {
        const rect = track.getBoundingClientRect();
        const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : rect.bottom);
        const offsetY = rect.bottom - clientY;
        let pct = Math.round((offsetY / rect.height) * 100);
        pct = Math.max(4, Math.min(100, pct)); // clamp 4% - 100%

        fill.style.height = `${pct}%`;

        // Micro-tick audio feedback every 10% change
        if (Math.abs(pct - lastTickPercent) >= 8) {
          Haptics.tick();
          lastTickPercent = pct;
        }
      };

      track.addEventListener('pointerdown', (e) => {
        isSliding = true;
        track.setPointerCapture(e.pointerId);
        fill.style.transition = 'none';
        updateSliderFromPointer(e);
        Haptics.tap();
      });

      track.addEventListener('pointermove', (e) => {
        if (!isSliding) return;
        updateSliderFromPointer(e);
      });

      const stopSlide = () => {
        if (!isSliding) return;
        isSliding = false;
        fill.style.transition = 'height 0.12s ease-out';
      };

      track.addEventListener('pointerup', stopSlide);
      track.addEventListener('pointercancel', stopSlide);
    });

    // 7. Day Chips Microinteraction
    const dayChips = document.querySelectorAll('.day-chip');
    dayChips.forEach((chip) => {
      if (chip._chipAttached) return;
      chip._chipAttached = true;

      chip.addEventListener('click', () => {
        if (chip.classList.contains('active')) {
          chip.classList.remove('active');
          chip.classList.add('inactive');
          Haptics.toggleOff();
        } else {
          chip.classList.remove('inactive');
          chip.classList.add('active');
          Haptics.toggleOn();
        }
      });
    });

    // 8. Custom Radio Selection Microinteraction
    const radioRows = document.querySelectorAll('label[for^="radio-"], .radio-option, tr, .setting-row');
    radioRows.forEach((row) => {
      if (row._radioRowAttached) return;
      row._radioRowAttached = true;

      row.addEventListener('click', (e) => {
        const radio = row.querySelector('input[type="radio"]');
        if (radio && !radio.checked) {
          radio.checked = true;
          radio.dispatchEvent(new Event('change', { bubbles: true }));
          Haptics.toggleOn();
        }
      });
    });
  }

  // Initialize on DOM ready and observe for dynamic elements
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMicrointeractions);
  } else {
    initMicrointeractions();
  }

  // Handle messages across iframes
  window.addEventListener('message', (e) => {
    if (e.data === 'play-success-sound') {
      Haptics.success();
    }
  });

})();
