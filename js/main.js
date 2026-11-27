/**
 * vpntop.click - Global UI Script
 * Clean native vanilla JavaScript | Mobile Nav Toggle | Table Filtering | Clipboard Copy
 */

// Global function to copy coupon code
window.copyCouponText = function (code) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(function () {
      // Find all pills or buttons matching this code and show copied feedback
      const allPills = document.querySelectorAll(".brand-coupon-pill, .coupon-tag-btn");
      allPills.forEach(function (pill) {
        if (pill.textContent.includes(code)) {
          const hint = pill.querySelector(".copy-hint, .copy-tip");
          if (hint) {
            const original = hint.textContent;
            hint.textContent = "已复制!";
            hint.style.backgroundColor = "#059669";
            hint.style.color = "#ffffff";
            setTimeout(function () {
              hint.textContent = original;
              hint.style.backgroundColor = "";
              hint.style.color = "";
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

  // Smooth Floating Back to Top Button
  const backToTopBtn = document.createElement("button");
  backToTopBtn.className = "back-to-top-btn";
  backToTopBtn.setAttribute("aria-label", "返回顶部");
  backToTopBtn.innerHTML = "↑";
  document.body.appendChild(backToTopBtn);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 380) {
      backToTopBtn.classList.add("is-visible");
    } else {
      backToTopBtn.classList.remove("is-visible");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
