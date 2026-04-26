/**
 * Portfolio Main Javascript File
 */
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bx-menu')
    this.classList.toggle('bx-x')
  })

  /**
   * Scroll with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bx-menu')
        navbarToggle.classList.toggle('bx-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    let i = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
      const currentWord = typed_strings[i].trim();
      
      if (isDeleting) {
        typed.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typed.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }
      
      let typeSpeed = 100;
      if (isDeleting) typeSpeed /= 2;
      
      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Wait at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        i = (i + 1) % typed_strings.length;
        typeSpeed = 500; // Wait before starting new word
      }
      
      setTimeout(typeEffect, typeSpeed);
    }
    
    // blinking cursor effect
    setInterval(() => {
        const cursor = select('.cursor');
        if(cursor) {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }
    }, 500);

    setTimeout(typeEffect, 1000);
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    let animated = false;
    onscroll(document, () => {
      let position = window.scrollY + window.innerHeight;
      if (position >= skilsContent.offsetTop && !animated) {
        let progressBars = select('.progress-bar', true);
        progressBars.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
        animated = true;
      }
    });
  }

  /**
   * Pure Counter logic
   */
  const counters = select('.purecounter', true);
  if (counters) {
    let animatedCounters = false;
    onscroll(document, () => {
      let position = window.scrollY + window.innerHeight;
      // We check if the first counter is visible
      let factsSection = select('.facts');
      if (factsSection && position >= factsSection.offsetTop && !animatedCounters) {
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-purecounter-end');
          const duration = +counter.getAttribute('data-purecounter-duration') * 1000; // in ms
          const stepTime = Math.abs(Math.floor(duration / target));
          
          let current = 0;
          let timer = setInterval(() => {
            current += 1;
            counter.innerText = current;
            if (current >= target) {
              counter.innerText = target;
              clearInterval(timer);
            }
          }, stepTime);
        });
        animatedCounters = true;
      }
    });
  }
})();
