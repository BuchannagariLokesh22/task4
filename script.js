// Smooth scroll and toggle dark mode
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Contact form
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name && email && message) {
    alert(`Thanks ${name}, I’ll get back to you soon!`);
    this.reset();
  } else {
    alert("Please fill in all fields.");
  }
});

// Scroll-triggered animation using IntersectionObserver
const observers = document.querySelectorAll(".animate");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.3 });

observers.forEach(el => observer.observe(el));
