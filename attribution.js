/*!
 * attribution.js v0.1
 * https://github.com/h9lxyz/attribution.js
 *
 * Copyright Hendrik Will and other contributors
 * Released under the MIT license
 * https://github.com/h9lxyz/attribution.js/blob/main/LICENSE
 *
 */

(function() {
    const styles = `
    .attribution-overlay-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 2500000;
    }
    .attribution-overlay {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 2500001;
        width: 600px;
        max-width: 90vw;
        font-size: 14px;
    }
    .attribution-overlay__header,
    .attribution-overlay__footer {
        font-size: 20px;
        font-weight: bold;
        padding: 20px;
        position: relative;
        text-align: center;
        color: #333;
    }
    .attribution-overlay__header {
        border-bottom: 1px solid #eee;
    }
    .attribution-overlay__footer {
        border-top: 1px solid #eee;
    }
    .attribution-overlay__close {
        position: absolute;
        right: 10px;
        top: 15px;
        transform: translateY(-50%);
        border: none;
        background: none;
        font-size: 20px;
        cursor: pointer;
        line-height: 1;
        color: #000;
    }
    .attribution-overlay__content {
        padding: 20px;
        line-height: 1.5;
    }
    .attribution-overlay__text p {
        margin: 0 0 15px 0;
        color: #666;
    }
    .attribution-overlay__attribution-wrapper {
        display: flex;
        gap: 10px;
        align-items: center;
        background: #f5f5f5;
        padding: 15px;
        border-radius: 6px;
        border: 3px solid #bbb;
    }
    .attribution-overlay__attribution {
        flex: 1;
        font-size: 13px;
        color: #333;
    }
    .attribution-overlay__button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
    }
    .attribution-overlay__button--copy {
        background: #147af3;
        color: white;
        white-space: nowrap;
        width: 100px;
    }
    .attribution-overlay a {
        color: #147af3;
        text-decoration: none;
    }
    .attribution-overlay a:hover {
        text-decoration: underline;
    }
    @media (max-width: 480px) {
        .attribution-overlay__attribution-wrapper {
            flex-direction: column;
        }
        .attribution-overlay__button--copy {
            width: 100%;
        }
    }
    .attribution-overlay__social {
        display: flex;
        gap: 15px;
        justify-content: center;
        margin: 15px 0;
    }
    .attribution-overlay__social-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        text-decoration: none;
        font-size: 14px;
        transition: opacity 0.2s;
    }
    .attribution-overlay .attribution-overlay__social-button {
        color: white;
        text-decoration: none;
    }
    .attribution-overlay__social-button:hover {
        opacity: 0.9;
        text-decoration: none;
    }
    .attribution-overlay__social-button--x {
        background: #000000;
    }
    .attribution-overlay__social-button--fb {
        background: #1877f2;
    }
    .attribution-overlay__social-button--pin {
        background: #e60023;
    }
    .attribution-overlay__social-button--email {
        background: #666666;
    }
`;

    const additionalStyles = `
        .attribution-overlay__social {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin: 15px 0;
        }
        .attribution-overlay__footer {
            border-top: 1px solid #eee;
            padding: 20px;
            text-align: center;
        }
        .attribution-overlay__social-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 4px;
            color: white;
            font-weight: bold;
            text-decoration: none;
            font-size: 14px;
            transition: opacity 0.2s;
        }
        .attribution-overlay .attribution-overlay__social-button {
            color: white;
            text-decoration: none;
        }
        .attribution-overlay__social-button:hover {
            opacity: 0.9;
            text-decoration: none;
        }
        .attribution-overlay__social-button--x {
            background: #000000;
        }
        .attribution-overlay__social-button--fb {
            background: #1877f2;
        }
        .attribution-overlay__social-button--pin {
            background: #e60023;
        }
        .attribution-overlay__social-button--email {
            background: #666666;
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles + additionalStyles;
    document.head.appendChild(styleSheet);

    class AttributionOverlay {
        constructor(options = {}) {
            this.options = {
                buttonClass: 'attribution-button',
                imageClass: 'attribution-image',
                year: new Date().getFullYear(),
                license: 'CC BY-ND 4.0',
                licenseUrl: 'https://creativecommons.org/licenses/by-nd/4.0/',
                licenseObligations: 'This license requires that you give credit to the me. It allows you to copy and distribute the material in any medium or format in unadapted form only, even for commercial purposes.',
                ...options
            };
            this.activeOverlay = null;
            this.init();
        }

        init() {
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains(this.options.buttonClass)) {
                    setTimeout(() => {
                        this.showOverlay();
                    }, 0);
                }
            });

            document.addEventListener('contextmenu', (e) => {
                if (e.target.classList.contains(this.options.imageClass)) {
                    setTimeout(() => {
                        this.showOverlay();
                    }, 1000);
                }
            });
        }

        createOverlay(photoUrl, photographerName, photographerUrl) {
            const backdrop = document.createElement('div');
            backdrop.className = 'attribution-overlay-backdrop';
            
            const overlay = document.createElement('div');
            overlay.className = 'attribution-overlay';
            
            const attribution = `<a href="${photoUrl}">Photo</a> © ${this.options.year} by <a href="${photographerUrl}">${photographerName}</a>.`;
            
            const shareText = `Check out this amazing photo by ${photographerName}`;
            const shareUrls = {
                twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(photoUrl)}`,
                facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(photoUrl)}`,
                pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(photoUrl)}&description=${encodeURIComponent(shareText)}`,
                email: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${shareText}\n\n${photoUrl}`)}`
            };
            
            overlay.innerHTML = `
                <div class="attribution-overlay__header">
                    Thank you for downloading my photo 👏
                    <button class="attribution-overlay__close">✕</button>
                </div>
                <div class="attribution-overlay__content">
                    <div class="attribution-overlay__text">
                        <p>I'm glad you like my work! This photo is freely available under the 
                        <b>Creative Commons license <a href="${this.options.licenseUrl}">${this.options.license}</a></b>.
                        ${this.options.licenseObligations}
                        </p>
                        <p>Use this attribution text:</p>
                    </div>
                    <div class="attribution-overlay__attribution-wrapper">
                        <div class="attribution-overlay__attribution">
                            ${attribution}
                        </div>
                        <button class="attribution-overlay__button attribution-overlay__button--copy">Copy</button>
                    </div>
                </div>
                <div class="attribution-overlay__footer">
                    <h3>Share this photo 📣</h3>
                    <div class="attribution-overlay__social">
                        <a href="${shareUrls.twitter}" target="_blank" rel="noopener" class="attribution-overlay__social-button attribution-overlay__social-button--x" title="Share on X">X</a>
                        <a href="${shareUrls.facebook}" target="_blank" rel="noopener" class="attribution-overlay__social-button attribution-overlay__social-button--fb" title="Share on Facebook">FB</a>
                        <a href="${shareUrls.pinterest}" target="_blank" rel="noopener" class="attribution-overlay__social-button attribution-overlay__social-button--pin" title="Share on Pinterest">P</a>
                        <a href="${shareUrls.email}" class="attribution-overlay__social-button attribution-overlay__social-button--email" title="Share by email">@</a>
                    </div>
                </div>
            `;

            const copyButton = overlay.querySelector('.attribution-overlay__button--copy');
            copyButton.addEventListener('click', () => {
                const htmlAttribution = `<a href="${photoUrl}">Photo</a> © ${this.options.year} by <a href="${photographerUrl}">${photographerName}</a> is licensed under <a href="${this.options.licenseUrl}">${this.options.license}</a>`;
                navigator.clipboard.writeText(htmlAttribution);
                
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Copied ✓';
                
                this.createEmojiExplosion(copyButton, '🙏');
                
                setTimeout(() => {
                    copyButton.textContent = originalText;
                }, 2000);
            });

            const closeOverlay = () => {
                backdrop.remove();
                this.activeOverlay = null;
            };

            overlay.querySelector('.attribution-overlay__close').addEventListener('click', closeOverlay);
            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) {
                    closeOverlay();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.activeOverlay) {
                    closeOverlay();
                }
            });

            backdrop.appendChild(overlay);
            return backdrop;
        }

        createEmojiExplosion(button, emoji) {
            const particleCount = 15;
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.zIndex = '2500002';
            container.style.pointerEvents = 'none';
            document.body.appendChild(container);

            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.textContent = emoji;
                particle.style.position = 'fixed';
                particle.style.left = centerX + 'px';
                particle.style.top = centerY + 'px';
                particle.style.fontSize = '50px';
                particle.style.userSelect = 'none';
                particle.style.transform = 'translate(-50%, -50%)';
                container.appendChild(particle);

                const angle = (Math.random() * Math.PI * 2);
                const velocity = 5 + Math.random() * 5;
                const distance = 100 + Math.random() * 200;

                const startTime = Date.now();
                const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = elapsed / 2000;

                    if (progress < 1) {
                        const x = centerX + Math.cos(angle) * distance * velocity * progress;
                        const y = centerY + Math.sin(angle) * distance * velocity * progress - (100 * progress * progress);
                        const scale = 1 - progress * 0.5;
                        const opacity = 1 - progress;

                        particle.style.transform = `translate(-50%, -50%) scale(${scale})`;
                        particle.style.left = x + 'px';
                        particle.style.top = y + 'px';
                        particle.style.opacity = opacity;

                        requestAnimationFrame(animate);
                    } else {
                        container.removeChild(particle);
                        if (container.children.length === 0) {
                            document.body.removeChild(container);
                        }
                    }
                };

                requestAnimationFrame(animate);
            }
        }

        showOverlay() {
            if (this.activeOverlay) {
                return;
            }

            const dataElement = document.getElementById('attribution-data');
            const photographerName = dataElement.getAttribute('data-photographer');
            const photographerUrl = dataElement.getAttribute('data-photographer-url');

            const photoUrl = window.location.href;

            this.activeOverlay = this.createOverlay(photoUrl, photographerName, photographerUrl);
            document.body.appendChild(this.activeOverlay);
        }
    }

    window.AttributionOverlay = AttributionOverlay;
})(); 