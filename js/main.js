/**
 * vpntop.click - Global UI Script
 * Clean native vanilla JavaScript | Mobile Nav Toggle | Table Filtering | Clipboard Copy
 */

// Global function to copy coupon code
window.copyCouponText = function (code) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(function () {
      // Find the clicked element and temporarily show copied feedback
      const allBtns = document.querySelectorAll(".coupon-tag-btn");
      allBtns.forEach(function (btn) {
        if (btn.querySelector(".coupon-text")?.textContent === code) {
          const tip = btn.querySelector(".copy-tip");
          if (tip) {
            const original = tip.textContent;
            tip.textContent = "已复制!";
            tip.style.background = "#059669";
            tip.style.color = "#ffffff";
            setTimeout(function () {
              tip.textContent = original;
              tip.style.background = "";
              tip.style.color = "";
            }, 1800);
          }
        }
      });
    }).catch(function () {
      prompt("请手动复制优惠码：", code);
    });
  } else {
    prompt("请手动复制优惠码：", code);
  }
};

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
        const isHidden = answer.style.display === "none" || !answer.style.display;
        answer.style.display = isHidden ? "block" : "none";
        const icon = this.querySelector(".faq-icon") || this.querySelector(".faq-toggle-icon");
        if (icon) {
          icon.textContent = isHidden ? "−" : "+";
        }
      }
    });
  });

  // Ranking Table Interactive Category Filtering
  const filterPills = document.querySelectorAll("#table-filter-pills .filter-pill");
  const tableRows = document.querySelectorAll("#airports-ranking-table tbody tr");

  if (filterPills.length > 0 && tableRows.length > 0) {
    filterPills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        // Update active class
        filterPills.forEach(function (p) { p.classList.remove("active"); });
        this.classList.add("active");

        const targetFilter = this.getAttribute("data-filter");

        tableRows.forEach(function (row) {
          const tags = row.getAttribute("data-tags") || "";
          if (targetFilter === "all" || tags.includes(targetFilter)) {
            row.style.display = "";
          } else {
            row.style.display = "none";
          }
        });
      });
    });
  }
});
