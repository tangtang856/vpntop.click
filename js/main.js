/**
 * vpntop.click - Global UI Script
 * Clean native vanilla JavaScript | Mobile Nav Toggle | Local Storage
 */

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Menu Toggle
  const toggleBtn = document.querySelector(".nav-toggle-btn");
  const mainNav = document.querySelector(".main-nav");

  if (toggleBtn && mainNav) {
    toggleBtn.addEventListener("click", function () {
      const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
      toggleBtn.setAttribute("aria-expanded", !isExpanded);
      mainNav.classList.toggle("is-open");
    });
  }

  // FAQ Accordion Toggle Support
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      if (answer && answer.classList.contains("faq-answer")) {
        const isHidden = answer.style.display === "none";
        answer.style.display = isHidden ? "block" : "none";
        const icon = this.querySelector(".faq-toggle-icon");
        if (icon) {
          icon.textContent = isHidden ? "−" : "+";
        }
      }
    });
  });
});
