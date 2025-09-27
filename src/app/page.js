'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function NetflixPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const moveSlide = (step) => {
    setCurrentIndex(prev => {
      let newIndex = prev + step;
      const totalSlides = 9;
      const visibleSlides = 5;
      
      if (newIndex < 0) newIndex = 0;
      if (newIndex > totalSlides - visibleSlides) {
        newIndex = totalSlides - visibleSlides;
      }
      return newIndex;
    });
  };

  // Scroll Progress Indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced Scroll Animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Add scroll animation classes and observe elements
    const addScrollAnimations = () => {
      // Animate section headings
      const headings = document.querySelectorAll('.txt h3, .faq-section h2');
      headings.forEach((heading, index) => {
        heading.classList.add('animate-on-scroll');
        heading.style.animationDelay = `${index * 0.2}s`;
        observer.observe(heading);
      });

      // Animate cards with staggered delays
      const cards = document.querySelectorAll('.card');
      cards.forEach((card, index) => {
        card.classList.add('animate-scale');
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
      });

      // Animate slides
      const slides = document.querySelectorAll('.slide');
      slides.forEach((slide, index) => {
        slide.classList.add('animate-fade-left');
        slide.style.animationDelay = `${index * 0.05}s`;
        observer.observe(slide);
      });

      // Animate FAQ items
      const faqItems = document.querySelectorAll('.faq-item');
      faqItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
      });

      // Animate footer sections
      const footerSections = document.querySelectorAll('.nf-subscription, .nf-contact, .nf-links-grid, .nf-footer-bottom');
      footerSections.forEach((section, index) => {
        section.classList.add('animate-fade-right');
        section.style.animationDelay = `${index * 0.2}s`;
        observer.observe(section);
      });
    };

    // Navigation scroll effect
    const handleNavScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        if (window.scrollY > 100) {
          nav.classList.add('nav-scrolled');
        } else {
          nav.classList.remove('nav-scrolled');
        }
      }
    };

    // Parallax effect for background
    const handleParallax = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    // Smooth reveal animations for elements as they come into view
    const handleRevealAnimations = () => {
      const reveals = document.querySelectorAll('.animate-on-scroll:not(.animate)');
      
      reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animate');
        }
      });
    };

    // Throttled scroll handler for performance
    let scrollTimeout;
    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      scrollTimeout = setTimeout(() => {
        handleNavScroll();
        handleParallax();
        handleRevealAnimations();
      }, 10);
    };

    // Initialize animations after component mounts
    const initAnimations = () => {
      addScrollAnimations();
      
      // Add parallax class to main background
      const mainElement = document.querySelector('.main');
      if (mainElement) {
        mainElement.classList.add('parallax-element');
        mainElement.dataset.speed = '0.3';
      }

      // Create and add scroll progress indicator
      const progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress';
      progressBar.style.width = `${scrollProgress}%`;
      document.body.appendChild(progressBar);
    };

    // Wait for DOM to be ready
    setTimeout(initAnimations, 100);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [scrollProgress]);

  // FAQ Accordion with enhanced animations
  useEffect(() => {
    const items = document.querySelectorAll(".faq-item");

    items.forEach(item => {
      const btn = item.querySelector(".faq-question");
      if (btn) {
        btn.addEventListener("click", () => {
          const isActive = item.classList.contains("active");

          // Close all with animation
          items.forEach(i => {
            i.classList.remove("active");
            const icon = i.querySelector(".faq-icon");
            if (icon) {
              icon.style.transform = "rotate(0deg)";
            }
          });

          // Open clicked item with animation
          if (!isActive) {
            item.classList.add("active");
            const icon = item.querySelector(".faq-icon");
            if (icon) {
              icon.style.transform = "rotate(45deg) scale(1.1)";
            }
          }
        });
      }
    });

    // Cleanup
    return () => {
      items.forEach(item => {
        const btn = item.querySelector(".faq-question");
        if (btn) {
          btn.removeEventListener("click", () => {});
        }
      });
    };
  }, []);

  // Enhanced slider with smooth transitions
  useEffect(() => {
    const slidesContainer = document.querySelector(".slides");
    if (slidesContainer) {
      const slideWidth = 220;
      slidesContainer.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
      
      // Add smooth transition class
      slidesContainer.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    }
  }, [currentIndex]);

  // Update scroll progress
  useEffect(() => {
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
      progressBar.style.width = `${scrollProgress}%`;
    }
  }, [scrollProgress]);

  const [menuOpen, setMenuOpen] = useState(false);
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.querySelector('.nav-actions');
      const hamburger = document.querySelector('.hamburger');
      
      if (nav && hamburger && !nav.contains(event.target) && !hamburger.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    // Close menu when pressing Escape key
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <>
      <Head>
        <title>Netflix India – Watch TV Shows Online, Watch Movies Online</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main">
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <div className="nav-logo">
            <Image
              src="/img/logo.png"
              alt="Netflix Logo"
              width={120}
              height={40}
              priority
            />
          </div>
          
          <div className={`nav-actions ${menuOpen ? 'active' : ''}`}>
            <div className="nav-menu-items">
              <select className="language-selector" aria-label="Select language">
                <option value="en">🌐 English</option>
                <option value="hi">🌐 हिन्दी</option>
                <option value="bn">🌐 বাংলা</option>
                <option value="te">🌐 తెలుగు</option>
                <option value="mr">🌐 मराठी</option>
                <option value="ta">🌐 தமிழ்</option>
                <option value="gu">🌐 ગુજરાતી</option>
                <option value="kn">🌐 ಕನ್ನಡ</option>
                <option value="ml">🌐 മലയാളം</option>
                <option value="pa">🌐 ਪੰਜਾਬੀ</option>
              </select>
              <button className="btn btn-red-sm">Sign In</button>
            </div>
          </div>
          
          <button 
            className={`hamburger ${menuOpen ? 'active' : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
        
        {/* Mobile Menu Overlay */}
        <div 
          className={`mobile-menu-overlay ${menuOpen ? 'active' : ''}`} 
          onClick={() => setMenuOpen(false)}
          role="button"
          tabIndex="0"
          aria-label="Close menu"
          onKeyDown={(e) => e.key === 'Enter' && setMenuOpen(false)}
        />
        <div className="box"></div>
        <div className="hero">
          <span className="hero-title">
            Unlimited movies,<br />TV shows and more
          </span>
          <span className="hero-subtitle">Starts at ₹149. Cancel at any time.</span>
          <p className="nf-sub-heading">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          <div className="nf-email-form">
            <input 
              type="email" 
              className="nf-email-input" 
              placeholder="Email address" 
            />
            <button className="nf-get-started">Get Started →</button>
          </div>
        </div>
      </div>

      <div className="separator"></div>

      <div className="first">
        <div className="txt">
          <h3>Trending Now</h3>
        </div>

        <div className="slider-container">
          <button className="prev" onClick={() => moveSlide(-1)}>
            &#10094;
          </button>

          <div className="slide-wrapper">
            <div className="slides">
              <div className="slide">
                <span className="rank">1</span>
                <img src="/img/img1.jpg" alt="Trending 1" />
              </div>
              <div className="slide">
                <span className="rank">2</span>
                <img src="/img/img2.jpg" alt="Trending 2" />
              </div>
              <div className="slide">
                <span className="rank">3</span>
                <img src="/img/img3.jpg" alt="Trending 3" />
              </div>
              <div className="slide">
                <span className="rank">4</span>
                <img src="/img/img4.jpg" alt="Trending 4" />
              </div>
              <div className="slide">
                <span className="rank">5</span>
                <img src="/img/img5.jpg" alt="Trending 5" />
              </div>
              <div className="slide">
                <span className="rank">6</span>
                <img src="/img/img6.jpg" alt="Trending 6" />
              </div>
              <div className="slide">
                <span className="rank">7</span>
                <img src="/img/img7.jpg" alt="Trending 7" />
              </div>
              <div className="slide">
                <span className="rank">8</span>
                <img src="/img/img8.jpg" alt="Trending 8" />
              </div>
              <div className="slide">
                <span className="rank">9</span>
                <img src="/img/img9.jpg" alt="Trending 9" />
              </div>
            </div>
          </div>

          <button className="next" onClick={() => moveSlide(1)}>
            &#10095;
          </button>
        </div>
      </div>

      <div className="card-container">
        <div className="txt">
          <h3>More Reasons to Join</h3>
        </div>
        <div className="card-list">
          <div className="card">
            <span>Enjoy on your TV</span>
            <span>
              Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.
            </span>
          </div>
          <div className="card">
            <span>Download your shows to watch offline</span>
            <span>Save your favourites easily and always have something to watch.</span>
          </div>
          <div className="card">
            <span>Watch everywhere</span>
            <span>
              Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.
            </span>
          </div>
          <div className="card">
            <span>Create profiles for kids</span>
            <span>
              Send kids on adventures with their favourite characters in a space made just for them — free with your membership.
            </span>
          </div>
        </div>
      </div>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <button className="faq-question">
            <span>What is Netflix?</span>
            <span className="faq-icon">+</span>
          </button>
          <div className="faq-answer">
            <p>
              Netflix is a streaming service that offers a wide variety of award‑winning TV shows, movies, anime, documentaries, and more on thousands of internet connected devices. <br /><br />
              You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There&apos;s always something new to discover, and new TV shows and movies are added every week.
            </p>
          </div>
        </div>

        <div className="faq-item">
          <button className="faq-question">
            <span>How much does Netflix cost?</span>
            <span className="faq-icon">+</span>
          </button>
          <div className="faq-answer">
            <p>
              Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from Basic to Premium.
            </p>
          </div>
        </div>

        <div className="faq-item">
          <button className="faq-question">
            <span>Where can I watch?</span>
            <span className="faq-icon">+</span>
          </button>
          <div className="faq-answer">
            <p>
              Watch anywhere, anytime, on an unlimited number of devices. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet‑connected device that offers the Netflix app.
            </p>
          </div>
        </div>
      </section>

      <footer className="netflix-footer">
        <div className="nf-subscription">
          <p className="nf-sub-heading">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          <div className="nf-email-form">
            <input 
              type="email" 
              className="nf-email-input" 
              placeholder="Email address" 
            />
            <button className="nf-get-started">Get Started →</button>
          </div>
        </div>

        <div className="nf-contact">
          <p>
            Questions? Call
            <a href="tel:000-800-919-1743" className="nf-link">000-800-919-1743</a>
          </p>
        </div>

        <div className="nf-links-grid">
          <div className="nf-link-group">
            <a href="#" className="nf-link">FAQ</a>
            <a href="#" className="nf-link">Investor Relations</a>
            <a href="#" className="nf-link">Privacy</a>
            <a href="#" className="nf-link">Speed Test</a>
          </div>
          <div className="nf-link-group">
            <a href="#" className="nf-link">Help Centre</a>
            <a href="#" className="nf-link">Jobs</a>
            <a href="#" className="nf-link">Cookie Preferences</a>
            <a href="#" className="nf-link">Legal Notices</a>
          </div>
          <div className="nf-link-group">
            <a href="#" className="nf-link">Account</a>
            <a href="#" className="nf-link">Ways to Watch</a>
            <a href="#" className="nf-link">Corporate Information</a>
            <a href="#" className="nf-link">Only on Netflix</a>
          </div>
          <div className="nf-link-group">
            <a href="#" className="nf-link">Media Centre</a>
            <a href="#" className="nf-link">Terms of Use</a>
            <a href="#" className="nf-link">Contact Us</a>
          </div>
        </div>

        <div className="nf-footer-bottom">
          <div className="nf-language-selector">
          <select className="language-selector" aria-label="Select language">
                <option value="en">🌐 English</option>
                <option value="hi">🌐 हिन्दी</option>
                <option value="bn">🌐 বাংলা</option>
                <option value="te">🌐 తెలుగు</option>
                <option value="mr">🌐 मराठी</option>
                <option value="ta">🌐 தமிழ்</option>
                <option value="gu">🌐 ગુજરાતી</option>
                <option value="kn">🌐 ಕನ್ನಡ</option>
                <option value="ml">🌐 മലയാളം</option>
                <option value="pa">🌐 ਪੰਜਾਬੀ</option>
              </select>
          </div>
          <p className="nf-region">Netflix India</p>
          <p className="nf-legal">
            This page is protected by Google reCAPTCHA to ensure you&apos;re not a bot.
            <a href="#" className="nf-link">Learn more.</a>
          </p>
        </div>
      </footer>
    </>
  );
}