document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      this.querySelector("i").classList.toggle("fa-times");
      this.querySelector("i").classList.toggle("fa-bars");
    });
  }

  // Testimonial slider
  const testimonials = document.querySelectorAll(".testimonial");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");
  let currentTestimonial = 0;

  if (testimonials.length > 0) {
    function showTestimonial(index) {
      testimonials.forEach((testimonial) => {
        testimonial.classList.remove("active");
      });

      testimonials[index].classList.add("active");
      currentTestimonial = index;
    }

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", function () {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) {
          newIndex = testimonials.length - 1;
        }
        showTestimonial(newIndex);
      });

      nextBtn.addEventListener("click", function () {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) {
          newIndex = 0;
        }
        showTestimonial(newIndex);
      });
    }

    // Auto slide
    setInterval(() => {
      let newIndex = currentTestimonial + 1;
      if (newIndex >= testimonials.length) {
        newIndex = 0;
      }
      showTestimonial(newIndex);
    }, 5000);
  }

  // FAQ accordion
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      this.classList.toggle("active");
      const answer = this.nextElementSibling;

      if (this.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = "0";
      }
    });
  });

  // Form submission
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = this.querySelector("#name").value;
      const email = this.querySelector("#email").value;
      const subject = this.querySelector("#subject").value;
      const message = this.querySelector("#message").value;

      // Here you would typically send the form data to a server
      console.log("Form submitted:", { name, email, subject, message });

      // Show success message
      alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.");

      // Reset form
      this.reset();
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          hamburger.querySelector("i").classList.remove("fa-times");
          hamburger.querySelector("i").classList.add("fa-bars");
        }
      }
    });
  });

  // Active link highlighting on scroll
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });
});
