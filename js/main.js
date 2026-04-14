/**
 * main.js — カフェスタンドフォーシーズン
 * 共通JavaScript
 */

'use strict';

/* ============================================================
   DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHamburger();
  initScrollAnimation();
  initSmoothScroll();
  initNavHighlight();
  initFaqAccordion();
  initMenuCategoryNav();
});

/* ============================================================
   1. ヘッダー スクロール変化
   ============================================================ */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const isTopPage = document.body.classList.contains('page-top');

  // TOPページのみ最初は透明
  if (isTopPage) {
    header.classList.add('is-top');
  } else {
    // 下層ページは常に背景あり
    header.classList.add('is-solid');
  }

  const SCROLL_THRESHOLD = 60;

  function updateHeader() {
    if (isTopPage) {
      if (window.scrollY > SCROLL_THRESHOLD) {
        header.classList.remove('is-top');
        header.classList.add('is-scrolled');
      } else {
        header.classList.add('is-top');
        header.classList.remove('is-scrolled');
      }
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader(); // 初期状態
}

/* ============================================================
   2. ハンバーガーメニュー
   ============================================================ */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('globalNav');
  if (!hamburger || !nav) return;

  // ハンバーガーボタン押下でメニュー開閉
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = nav.classList.toggle('is-open');
    hamburger.classList.toggle('is-active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    // メニュー開時はbodyのスクロールを止める
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // ナビ内のリンクをクリックしたら閉じる
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // メニュー外クリックで閉じる
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.classList.remove('is-open');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ============================================================
   3. スクロールアニメーション（IntersectionObserver）
   ============================================================ */
function initScrollAnimation() {
  const targets = document.querySelectorAll('.fade-in');
  if (!targets.length) return;

  // ブラウザが IntersectionObserver に対応している場合
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 要素ごとに遅延をつけて順番にアニメーション
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -60px 0px', // 少し手前で発火
        threshold: 0.1,
      }
    );

    targets.forEach((el) => observer.observe(el));
  } else {
    // 非対応の場合はすべて表示
    targets.forEach((el) => el.classList.add('is-visible'));
  }
}

/* ============================================================
   4. スムーススクロール
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      // ヘッダーの高さ分オフセット
      const header = document.querySelector('.site-header');
      const headerHeight = header ? header.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    });
  });
}

/* ============================================================
   5. 現在ページのナビハイライト
   ============================================================ */
function initNavHighlight() {
  const navLinks = document.querySelectorAll('.global-nav a');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentPath) {
      link.classList.add('is-current');
    }
  });
}

/* ============================================================
   6. FAQ アコーディオン（accessページ）
   ============================================================ */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      question.setAttribute('aria-expanded', isOpen);
    });
  });
}

/* ============================================================
   7. メニューページ カテゴリナビのアクティブ連動
   ============================================================ */
function initMenuCategoryNav() {
  const categoryLinks = document.querySelectorAll('.menu-category-nav a');
  if (!categoryLinks.length) return;

  const sections = [];
  categoryLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const section = document.querySelector(href);
      if (section) sections.push({ link, section });
    }
  });

  if (!sections.length) return;

  const header = document.querySelector('.site-header');

  function updateActiveLink() {
    const headerHeight = header ? header.offsetHeight : 72;
    const categoryNavHeight = 56; // カテゴリナビの高さ
    const offset = headerHeight + categoryNavHeight + 32;

    let currentSection = null;

    sections.forEach(({ section }) => {
      if (section.getBoundingClientRect().top <= offset) {
        currentSection = section;
      }
    });

    sections.forEach(({ link, section }) => {
      link.classList.toggle('is-active', section === currentSection);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}
