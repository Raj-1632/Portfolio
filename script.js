/**
 * Portfolio Interactive Scripts
 * Author: Patel Raj
 */

document.addEventListener('DOMContentLoaded', () => {
  // Brand SVGs for icons not bundled in standard Lucide (GitHub, LinkedIn)
  const BRAND_SVGS = {
    github: `<svg class="lucide lucide-github" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`,
    linkedin: `<svg class="lucide lucide-linkedin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>`
  };

  function renderBrandIcons(container = document) {
    container.querySelectorAll('[data-lucide="github"]').forEach(el => {
      el.outerHTML = BRAND_SVGS.github;
    });
    container.querySelectorAll('[data-lucide="linkedin"]').forEach(el => {
      el.outerHTML = BRAND_SVGS.linkedin;
    });
  }

  function initIcons(container = document) {
    if (window.lucide) {
      window.lucide.createIcons();
    }
    renderBrandIcons(container);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Initialize all icons (Lucide + Brand SVGs)
  initIcons();

  // 1. Dynamic Year in Footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Theme Toggle (Dark / Light Mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('raj_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('raj_theme', newTheme);
  });

  // 3. Mobile Navigation Menu
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggleBtn.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  }

  // 4. Hero Section Typing Effect
  const typedTextEl = document.getElementById('typed-text');
  const roles = [
    'Full-Stack Developer',
    'MCA Graduate Student',
    'Python & Flask Enthusiast',
    'PHP & MySQL Specialist',
    'Backend & API Architect',
    'Competitive Problem Solver'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingDelay = 100;
  const deletingDelay = 50;
  const pauseDelay = 1800;

  function typeRole() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingDelay : typingDelay;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = pauseDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(typeRole, delay);
  }

  if (typedTextEl) {
    setTimeout(typeRole, 600);
  }

  // 5. Scroll Spy for Active Navigation Link & Back-to-Top Button
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Toggle Back to top
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Scroll spy
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });

  // 6. Skills Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 7. Project Details Deep Dive Modal
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalContentArea = document.getElementById('modal-content-area');
  const modalTriggers = document.querySelectorAll('.project-modal-trigger');

  const projectDetailsData = {
    bookmystay: {
      title: 'BookMyStay',
      badge: '🏆 2nd Rank Winner @ Flash-2024 Technical Competition',
      subtitle: 'Comprehensive Hotel, Resort & Villa Booking Ecosystem',
      overview:
        'BookMyStay is an end-to-end full-stack web reservation application built with PHP and MySQL. Engineered to simulate production-grade hospitality reservation engines, it connects guests with properties while supplying property administrators with booking control panels and analytics.',
      architecture: [
        '<strong>Backend Engine:</strong> Clean Object-Oriented PHP managing request lifecycle, session preservation, and relational database transactions.',
        '<strong>Payment Gateway:</strong> Fully integrated Razorpay checkout supporting secure test and production tokenized payments with instant webhook confirmation.',
        '<strong>Geolocation & Discovery:</strong> OpenCage Geocoding API integration enabling exact latitude/longitude coordinates and nearby amenity lookups.',
        '<strong>Interactive Visual Previews:</strong> Implemented 360-degree interactive room and villa virtual previews to boost user reservation confidence.',
        '<strong>Dynamic Workflows:</strong> Built-in booking rescheduling, automated tax/fare calculation, automated PDF invoice generation, and local cab transit integration.',
        '<strong>Admin Management Portal:</strong> Dedicated dashboard with role-based access control (RBAC), room inventory management, occupancy tracking, and guest support chatbot.'
      ],
      technologies: ['PHP', 'MySQL', 'Razorpay API', 'OpenCage API', 'JavaScript', 'HTML5', 'CSS3', 'FPDF (Invoices)'],
      github: 'https://github.com/Raj-1632'
    },
    expensetracker: {
      title: 'Expense Tracker',
      badge: '📊 Personal Financial Health & Spending Analytics',
      subtitle: 'Responsive Cashflow & Budget Management Web Application',
      overview:
        'Expense Tracker is a secure web application developed with Python, Flask, and SQLite. It provides individuals with an intuitive, real-time platform to monitor everyday expenses, track revenue streams, establish monthly budget goals, and identify spending patterns through visual breakdowns.',
      architecture: [
        '<strong>Application Server:</strong> Modular Python Flask architecture utilizing blueprint design for clean separation of concerns.',
        '<strong>Authentication & Security:</strong> Cryptographic password hashing (Werkzeug security), user registration, session cookies, and login protection against unauthorized access.',
        '<strong>Template & Presentation:</strong> Jinja2 template inheritance with responsive, mobile-first responsive interfaces and real-time form feedback.',
        '<strong>Data Persistence:</strong> SQLite relational schema optimized with indexed queries for fast aggregation of daily, weekly, and monthly totals.',
        '<strong>Visualization Dashboards:</strong> Dynamic visual charts summarizing categorical distributions (Food, Utilities, Travel, Leisure, Education) and budget limit alerts.'
      ],
      technologies: ['Python', 'Flask', 'SQLite', 'Jinja2 Templates', 'JavaScript', 'HTML5', 'CSS3'],
      github: 'https://github.com/Raj-1632'
    }
  };

  function openProjectModal(projectId) {
    const project = projectDetailsData[projectId];
    if (!project) return;

    modalContentArea.innerHTML = `
      <span class="modal-header-badge">${project.badge}</span>
      <h2 class="modal-project-title">${project.title}</h2>
      <p class="modal-project-subtitle">${project.subtitle}</p>

      <div class="modal-body-section">
        <h4 class="modal-section-title">Project Overview</h4>
        <p style="color: var(--text-secondary); line-height: 1.65; font-size: 0.95rem;">${project.overview}</p>

        <h4 class="modal-section-title">Key Architectural Features & Innovations</h4>
        <ul class="modal-feature-list">
          ${project.architecture
            .map(
              item => `
            <li>
              <i data-lucide="check-circle-2"></i>
              <span>${item}</span>
            </li>
          `
            )
            .join('')}
        </ul>

        <h4 class="modal-section-title">Technology Stack</h4>
        <div class="modal-tags">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>

        <div class="modal-actions">
          <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            ${BRAND_SVGS.github}
            <span>View Source on GitHub</span>
          </a>
          <button class="btn btn-secondary btn-sm" id="modal-inner-close">
            <span>Close Details</span>
          </button>
        </div>
      </div>
    `;

    // Re-initialize icons inside modal
    initIcons(modalContentArea);

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Hook inner close
    const innerClose = document.getElementById('modal-inner-close');
    if (innerClose) {
      innerClose.addEventListener('click', closeProjectModal);
    }
  }

  function closeProjectModal() {
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const projectId = trigger.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', e => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && projectModal.classList.contains('open')) {
        closeProjectModal();
      }
    });
  }

  // 8. Contact Form Handling with AJAX & Resilient Direct Options
  const contactForm = document.getElementById('contact-form');
  const formSubmitBtn = document.getElementById('form-submit-btn');
  const formStatus = document.getElementById('form-status');
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'success') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const iconName = type === 'success' ? 'check-circle-2' : 'alert-circle';
    toast.innerHTML = `
      <i data-lucide="${iconName}"></i>
      <div>${message}</div>
    `;

    toastContainer.appendChild(toast);
    initIcons(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  function setFormLoading(isLoading) {
    if (!formSubmitBtn) return;
    formSubmitBtn.disabled = isLoading;
    if (isLoading) {
      formSubmitBtn.innerHTML = `
        <span class="btn-spinner"></span>
        <span>Sending Message...</span>
      `;
    } else {
      formSubmitBtn.innerHTML = `
        <i data-lucide="send"></i>
        <span>Send Message</span>
      `;
      initIcons(formSubmitBtn);
    }
  }

  function showFormStatus(html, type = 'success') {
    if (!formStatus) return;
    formStatus.style.display = 'block';
    formStatus.innerHTML = `
      <div class="form-status-card status-${type}">
        ${html}
      </div>
    `;
    initIcons(formStatus);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'error');
        return;
      }

      setFormLoading(true);
      if (formStatus) formStatus.style.display = 'none';

      const emailSubject = subject || `Portfolio Contact from ${name}`;

      try {
        // Send directly via FormSubmit AJAX (delivers real email to raj643995@gmail.com without opening blank browser windows)
        const response = await fetch('https://formsubmit.co/ajax/raj643995@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            _subject: emailSubject,
            message: message,
            _template: 'table',
            _captcha: 'false'
          })
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          showToast(`Thanks ${name}! Your message has been sent to Raj.`, 'success');
          showFormStatus(`
            <strong><i data-lucide="check-circle-2"></i> Message Sent Successfully!</strong>
            <p>Thank you, <strong>${escapeHtml(name)}</strong>. Your message was delivered directly to Raj (<a href="mailto:raj643995@gmail.com" style="color: inherit; text-decoration: underline;">raj643995@gmail.com</a>). He will get back to you at <strong>${escapeHtml(email)}</strong> shortly.</p>
          `, 'success');
          contactForm.reset();
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      } catch (err) {
        console.warn('FormSubmit AJAX did not complete; displaying direct fallback options:', err);

        // Pre-composed direct fallback URLs (using webmail & WhatsApp so users never get stranded)
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=raj643995@gmail.com&su=${encodeURIComponent(
          emailSubject
        )}&body=${encodeURIComponent(`Hi Raj,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

        const whatsappUrl = `https://wa.me/918238388031?text=${encodeURIComponent(
          `Hi Raj, I saw your portfolio!\n\nName: ${name}\nEmail: ${email}\nSubject: ${emailSubject}\n\nMessage:\n${message}`
        )}`;

        const mailtoUrl = `mailto:raj643995@gmail.com?subject=${encodeURIComponent(
          emailSubject
        )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

        showToast('Online form submission unavailable. Choose an option below to deliver directly.', 'error');
        showFormStatus(`
          <strong><i data-lucide="alert-circle"></i> Direct Send Options</strong>
          <p>The form could not be submitted automatically (often caused by offline network status). Your message is saved below—choose how you'd like to deliver it:</p>
          <div class="form-fallback-actions">
            <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              <i data-lucide="mail"></i>
              <span>Send via Gmail Web</span>
            </a>
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
              <i data-lucide="message-square"></i>
              <span>Send via WhatsApp</span>
            </a>
            <a href="${mailtoUrl}" class="btn btn-ghost btn-sm">
              <i data-lucide="send"></i>
              <span>Default Email App</span>
            </a>
          </div>
        `, 'error');
      } finally {
        setFormLoading(false);
      }
    });
  }
});
