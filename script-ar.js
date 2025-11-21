let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  let top = window.scrollY;
  
  // إضافة صنف نشط للرابط بناءً على القسم المرئي
  let current = '';
  sections.forEach(sec => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');
    
    if (top >= offset && top < offset + height) {
      current = id;
    }
  });
  
  navlinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
  
  // إذا كان المستخدم في أعلى الصفحة، اجعل قسم "الرئيسية" نشط
  if (top < 100) {
    navlinks.forEach(link => link.classList.remove('active'));
    let homeLink = document.querySelector('header nav a[href="#home"]');
    if (homeLink) homeLink.classList.add('active');
  }
  
  let header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);
  
  // إغلاق القائمة عند التمرير (للهواتف)
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
};

// تهيئة ScrollReveal
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

// تهيئة Typed.js مع تحسينات للغة العربية
function initializeTypedJS() {
  if (typeof Typed !== 'undefined') {
    // الانتظار حتى يتم تحميل الخطوط العربية
    if ('fonts' in document) {
      document.fonts.ready.then(function() {
        startTypedJS();
      });
    } else {
      // بديل للمتصفحات التي لا تدعم Font Loading API
      setTimeout(startTypedJS, 1000);
    }
  } else {
    // إذا لم تكن مكتبة Typed.js متوفرة، استخدم البديل
    startFallbackTyping();
  }
}

function startTypedJS() {
  const typed = new Typed('.multiple-text', {
    strings: ['مصمم ويب', 'مطور ويب', 'مصمم UI/UX', 'خبير تجارة إلكترونية'],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 1500,
    loop: true,
    smartBackspace: false, // مهم للغة العربية
    shuffle: false,
    showCursor: true,
    cursorChar: '|',
    contentType: 'html'
  });
}

// بديل Typed.js للغة العربية في حالة فشل المكتبة
function startFallbackTyping() {
  const textElement = document.querySelector('.multiple-text');
  if (!textElement) return;
  
  const texts = ['مصمم ويب', 'مطور ويب', 'مصمم UI/UX', 'خبير تجارة إلكترونية'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      // مسح النص
      textElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      // كتابة النص
      textElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      // الانتظار بعد اكتمال الكتابة
      typingSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // الانتقال للنص التالي
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  // بدء التأثير
  type();
}

// بدء التهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  initializeTypedJS();
});

// بديل إضافي في حالة فشل جميع المحاولات
window.addEventListener('load', function() {
  // التحقق من أن النص ظهر بشكل صحيح
  const typedElement = document.querySelector('.multiple-text');
  if (typedElement && typedElement.textContent === '') {
    // إذا كان العنصر لا يزال فارغاً، استخدم البديل
    startFallbackTyping();
  }
});
