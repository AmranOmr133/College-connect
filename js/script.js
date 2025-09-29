// ===== التمرير السلس =====
document.addEventListener('DOMContentLoaded', function() {
    // التمرير السلس لجميع روابط الـ anchor
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== تأثير الرأس عند التمرير =====
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            header.style.transition = 'all 0.3s ease';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0)';
            header.style.boxShadow = 'none';
        }

        // إخفاء الرأس عند التمرير للأسفل، إظهاره عند التمرير للأعلى
        if (window.scrollY > lastScrollY && window.scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });

    // ===== تأثير الكتابة لقسم الترحيب =====
    const welcomeText = document.querySelector('.welcome p');
    if (welcomeText) {
        const originalText = welcomeText.textContent;
        welcomeText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                welcomeText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // بدء تأثير الكتابة عندما يكون العنصر في منطقة الرؤية
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(welcomeText);
    }

    // ===== تأثير الخلفية المتحركة =====
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // تأثير الحركة للخلفية
        document.body.style.backgroundPosition = `right ${scrolled * 0.5}px`;
    });

    // ===== التحريك عند التمرير =====
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.about-content, .values-box, .card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // تعيين الحالة الأولية للعناصر المتحركة
    document.querySelectorAll('.about-content, .values-box, .card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // التشغيل مرة واحدة عند التحميل

    // ===== تحسين البطاقات التفاعلية =====
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.1)';
        });

        // إضافة تأثير النقر
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') return; // لا تضيف تأثير إذا كان النقر على رابط
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // ===== تأثيرات الأزرار =====
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            // تأثير التموج
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ===== تأثير التحميل =====
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // ===== إبراز رابط التنقل النشط =====
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    function highlightNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ===== عداد الرسوم المتحركة للإحصائيات (يمكن إضافتها لاحقاً) =====
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // ===== زر العودة إلى الأعلى =====
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.classList.add('scroll-to-top');
    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
});

// ===== إضافة CSS لزر العودة إلى الأعلى =====
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: linear-gradient(135deg, #D2A1FFFF, #363043FF);
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3);
    }
    
    .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(138, 43, 226, 0.4);
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    nav ul li a.active {
        background: linear-gradient(135deg, #D2A1FFFF, #363043FF);
        color: white;
        border-color: #525252FF;
    }
    
    /* تحسين تأثيرات البطاقات الحالية */
    .card {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
`;

document.head.appendChild(style);

// ===== شاشة التحميل (اختياري) =====
window.addEventListener('beforeunload', function() {
    document.body.classList.add('page-transition');
});

// ===== اختصارات لوحة المفاتيح =====
document.addEventListener('keydown', function(e) {
    // Ctrl + H للذهاب إلى الصفحة الرئيسية
    if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        window.location.href = '#';
    }
    
    // مفتاح Escape للعودة إلى الأعلى
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

