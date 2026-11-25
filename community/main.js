/**
 * Kurayoshi Kita - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {

    // =========================================
    // Swiper 初期化
    // =========================================
    if (document.querySelector('.hero-swiper')) {
        const swiper = new Swiper('.hero-swiper', {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            speed: 1200,
            effect: 'fade',
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    // =========================================
    // IntersectionObserver (フェードアップ)
    // =========================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-inview');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // =========================================
    // ハンバーガーメニュー
    // =========================================
    const hamburger = document.getElementById('js-hamburger');
    const nav = document.getElementById('js-nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // =========================================
    // スクロール連動バナー表示
    // =========================================
    window.addEventListener('scroll', function () {
        const banner = document.querySelector('.fixed-right-banner');
        if (banner && window.innerWidth <= 768) {
            if (window.scrollY > window.innerHeight) {
                banner.classList.add('is-visible');
            } else {
                banner.classList.remove('is-visible');
            }
        }
    });

    // =========================================
    // タブ切り替え（学校紹介ページ等）
    // =========================================
    const tabLinks = document.querySelectorAll('.js-tab-menu a');
    const tabContents = document.querySelectorAll('.tab-content');
    const menuItems = document.querySelectorAll('.js-tab-menu li');

    if (tabLinks.length > 0) {
        tabLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                var targetId = this.getAttribute('data-target');
                if (!targetId) return; // data-target がないリンクは通常遷移

                e.preventDefault();

                var targetContent = document.getElementById(targetId);

                if (!targetContent) return;

                tabContents.forEach(function (content) {
                    content.classList.remove('is-active');
                });
                targetContent.classList.add('is-active');

                menuItems.forEach(function (item) {
                    item.classList.remove('current-menu-item');
                });
                this.parentElement.classList.add('current-menu-item');

                // コンテンツ先頭にスクロール
                var contentArea = document.querySelector('.entry-content');
                if (contentArea) {
                    var headerOffset = 100;
                    var top = contentArea.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            });
        });

        // URLハッシュでタブを開く（初回読み込み＋ハッシュ変更時）
        function activateTabFromHash() {
            if (window.location.hash) {
                var hashTarget = window.location.hash.replace('#', '');
                var hashLink = document.querySelector('.js-tab-menu a[data-target="' + hashTarget + '"]');
                if (hashLink) {
                    hashLink.click();
                    // コンテンツ先頭にスクロール
                    var contentArea = document.querySelector('.entry-content');
                    if (contentArea) {
                        setTimeout(function () {
                            var headerOffset = 100;
                            var top = contentArea.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                            window.scrollTo({ top: top, behavior: 'smooth' });
                        }, 100);
                    }
                }
            }
        }
        activateTabFromHash();
        window.addEventListener('hashchange', activateTabFromHash);
    }

});

// =========================================
// モーダル (グローバル関数)
// =========================================
function openModal() {
    document.getElementById('line-modal').classList.add('is-open');
}

function closeModal() {
    document.getElementById('line-modal').classList.remove('is-open');
}

// =========================================
// スマホ用サブメニュー (グローバル関数)
// =========================================
function toggleSubmenu(element, ev) {
    // リンク（<a>）クリック時はメニュー開閉せずリンク遷移を優先
    ev = ev || window.event;
    if (ev && ev.target) {
        var clicked = ev.target.closest('a');
        if (clicked) return;
    }
    if (window.innerWidth <= 1024) {
        element.classList.toggle('open');
    }
}

// =========================================
// 情報公開ページ アコーディオン
// =========================================
document.querySelectorAll('.disclosure-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
        var expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
        var body = this.nextElementSibling;
        body.classList.toggle('is-open');
    });
});
