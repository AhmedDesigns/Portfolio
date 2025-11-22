//==================== toggle icon navbar ====================//
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}

//==================== scroll sections active link ====================//
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    let top = window.scrollY;
    
    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                let activeLink = document.querySelector('header nav a[href*=' + id + ']');
                if (activeLink) activeLink.classList.add('active');
            });
        }
    });
    
    //==================== sticky navbar ====================//
    let header = document.querySelector('header');
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 100);
    }
    
    //==================== remove toggle icon and navbar when click navbar link (scroll) ====================//
    if (menuIcon && navbar) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
};

//==================== scroll reveal ====================//
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal({
        distance: '80px',
        duration: 2000,
        delay: 200
    });

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .services-container, .portfolio-container, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
    ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
}

//==================== typed js - الحل النهائي ====================//
function initTypedJS() {
    // الانتظار حتى يتم تحميل المكتبة والعنصر
    if (typeof Typed === 'undefined') {
        setTimeout(initTypedJS, 100);
        return;
    }
    
    const typedElement = document.querySelector('.multiple-text');
    if (!typedElement) {
        setTimeout(initTypedJS, 100);
        return;
    }
    
    // تدمير أي نسخة سابقة
    if (window.typedInstance) {
        window.typedInstance.destroy();
        window.typedInstance = null;
    }
    
    // تنظيف العنصر تماماً
    typedElement.innerHTML = '';
    
    // اكتشاف اللغة بدقة
    const isArabicPage = 
        document.documentElement.getAttribute('lang') === 'ar' ||
        document.documentElement.getAttribute('dir') === 'rtl' ||
        window.location.pathname.includes('index-ar') ||
        window.location.pathname.includes('arabic') ||
        document.querySelector('meta[name="description"][content*="عربي"]') !== null;
    
    console.log('تم اكتشاف اللغة:', isArabicPage ? 'عربية' : 'إنجليزية');
    
    // النصوص بناءً على اللغة
    const arabicStrings = ['مصمم ويب', 'مطور ويب', 'مصمم UI/UX', 'خبير تجارة إلكترونية'];
    const englishStrings = ['Web Designer', 'Web Developer', 'UI/UX Designer', 'E-commerce Expert'];
    
    const stringsToUse = isArabicPage ? arabicStrings : englishStrings;
    
    // تهيئة Typed.js
    window.typedInstance = new Typed('.multiple-text', {
        strings: stringsToUse,
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        onBegin: function() {
            console.log('بدأ Typed.js بالنصوص:', stringsToUse);
        },
        onStringTyped: function() {
            // التأكد من أن النص يظهر بشكل صحيح
            typedElement.style.fontFamily = "'Cairo', sans-serif";
            typedElement.style.direction = "rtl";
            typedElement.style.textAlign = "right";
        }
    });
}

// تشغيل Typed بعد تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initTypedJS, 500);
});

// حل إضافي للصفحات التي يتم تحميلها متأخراً
window.addEventListener('load', function() {
    setTimeout(initTypedJS, 300);
});

// حل طارئ إذا فشل كل شيء
setTimeout(function() {
    if (typeof Typed !== 'undefined' && document.querySelector('.multiple-text')) {
        const currentText = document.querySelector('.multiple-text').textContent;
        const isArabic = document.documentElement.lang === 'ar' || 
                        document.documentElement.dir === 'rtl';
        
        // إذا كانت الصفحة عربية ولكن النص إنجليزي، أعد التشغيل
        if (isArabic && (currentText.includes('Web') || currentText.includes('Designer'))) {
            console.log('اكتشاف خطأ: النص إنجليزي في الصفحة العربية، إعادة التشغيل...');
            if (window.typedInstance) {
                window.typedInstance.destroy();
            }
            
            window.typedInstance = new Typed('.multiple-text', {
                strings: ['مصمم ويب', 'مطور ويب', 'مصمم UI/UX', 'خبير تجارة إلكترونية'],
                typeSpeed: 100,
                backSpeed: 100,
                backDelay: 1000,
                loop: true
            });
        }
    }
}, 2000);
