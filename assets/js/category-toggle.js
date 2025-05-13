document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".accordion-toggle").forEach(btn => {
      const content = btn.nextElementSibling;
      content.style.display = "block";
      btn.classList.add("open");
      btn.addEventListener("click", () => {
        btn.classList.toggle("open");
        content.style.display = (content.style.display === "block") ? "none" : "block";
      });
    });
  
    document.querySelectorAll(".sub-toggle").forEach(btn => {
      const sub = btn.nextElementSibling;
      sub.style.display = "none";
      btn.addEventListener("click", () => {
        btn.classList.toggle("open");
        sub.style.display = (sub.style.display === "block") ? "none" : "block";
      });
    });
  });
  