// ===== MINIMALIST JAVASCRIPT =====
document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== SIMPLE SCROLL EFFECTS =====
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Simple navbar scroll effect
        if (scrollTop > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // Update active navigation link
        updateActiveNavLink();
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    // ===== COPY BIBTEX FUNCTIONALITY =====
    window.copyBibtex = function() {
        const bibtexText = document.querySelector('.bibtex-container pre code').textContent;
        const copyBtn = document.querySelector('.copy-btn');
        
        navigator.clipboard.writeText(bibtexText).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.style.backgroundColor = '#10b981';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.style.backgroundColor = '#10b981';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '';
            }, 2000);
        });
    };
    
    // ===== SIMPLE PERFORMANCE CHART =====
    function createPerformanceChart() {
        const canvas = document.getElementById('performanceChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = 500;
        canvas.height = 300;
        
        // Sample data for 3D printing metrics
        const methods = ['Traditional', 'Adaptive', 'Multi-Axis', 'Our Method'];
        const printTime = [100, 80, 60, 40]; // Relative print time
        const surfaceQuality = [70, 80, 85, 95]; // Surface quality score
        
        // Chart dimensions
        const padding = 50;
        const chartWidth = canvas.width - 2 * padding;
        const chartHeight = canvas.height - 2 * padding;
        
        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw axes
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Draw grid lines
        ctx.strokeStyle = '#f3f4f6';
        ctx.lineWidth = 1;
        for (let i = 1; i <= 4; i++) {
            const x = padding + (chartWidth / 4) * i;
            const y = padding + (chartHeight / 4) * i;
            
            // Vertical grid lines
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, canvas.height - padding);
            ctx.stroke();
            
            // Horizontal grid lines
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(canvas.width - padding, y);
            ctx.stroke();
        }
        
        // Draw data points
        ctx.fillStyle = '#2563eb';
        methods.forEach((method, index) => {
            const x = padding + ((100 - printTime[index]) / 60) * chartWidth;
            const y = canvas.height - padding - (surfaceQuality[index] / 100) * chartHeight;
            
            // Draw point
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, 2 * Math.PI);
            ctx.fill();
            
            // Add method label
            ctx.fillStyle = '#1f2937';
            ctx.font = '12px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(method, x, y - 15);
            ctx.fillStyle = '#2563eb';
        });
        
        // Add axis labels
        ctx.fillStyle = '#6b7280';
        ctx.font = '14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Print Efficiency', canvas.width / 2, canvas.height - 15);
        
        // Vertical label
        ctx.save();
        ctx.translate(15, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Surface Quality', 0, 0);
        ctx.restore();
    }
    
    // Create chart when page loads
    setTimeout(createPerformanceChart, 500);
    
    // ===== MINIMAL INTERSECTION OBSERVER =====
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -20px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Only observe sections for minimal fade-in effect
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
        section.style.opacity = '0.95';
        section.style.transition = 'opacity 0.3s ease';
        observer.observe(section);
    });
    
    // ===== MINIMAL BUTTON HOVER EFFECTS =====
    const buttons = document.querySelectorAll('.btn, .download-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.opacity = '0.9';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
    
    // ===== ACCESSIBILITY IMPROVEMENTS =====
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #2563eb;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== DOWNLOAD TRACKING =====
function trackDownload(type) {
    // Get current download count from localStorage
    const currentCount = parseInt(localStorage.getItem('paperDownloads') || '0');
    const newCount = currentCount + 1;
    
    // Update localStorage
    localStorage.setItem('paperDownloads', newCount.toString());
    
    // Update display
    updateDownloadCount();
    
    // Optional: Send analytics (uncomment if you want to use Google Analytics)
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'download', {
    //         'event_category': 'engagement',
    //         'event_label': type
    //     });
    // }
}

function updateDownloadCount() {
    const count = localStorage.getItem('paperDownloads') || '0';
    const countElement = document.getElementById('download-count');
    
    if (countElement) {
        countElement.textContent = count;
    }
}

// Initialize download count on page load
function initializeDownloadCount() {
    updateDownloadCount();
}

// Add event listeners for download buttons
function setupDownloadListeners() {
    const heroPaperBtn = document.getElementById('hero-paper-btn');
    const downloadPaperBtn = document.getElementById('download-paper-btn');
    
    if (heroPaperBtn) {
        heroPaperBtn.addEventListener('click', function() {
            trackDownload('paper');
        });
    }
    
    if (downloadPaperBtn) {
        downloadPaperBtn.addEventListener('click', function() {
            trackDownload('paper');
        });
    }
}

// ===== MINIMAL LOADING STATE =====
window.addEventListener('load', () => {
    // Simple loading completion
    document.body.classList.add('loaded');
    
    // Initialize download count
    initializeDownloadCount();
    
    // Setup download listeners
    setupDownloadListeners();
});