// --- Start of Theme function --- //
const dark = document.getElementById('dark');
const light = document.getElementById('light');

// --- add Theme to the localStorage function --- //
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('darkMode');

    dark.classList.add('active');
    light.classList.remove('active');

    light.innerHTML = "<i class='bx bx-sun bx-sm bx-tada-hover'></i>";
    dark.innerHTML = "<i class='bx bxs-moon bx-sm bx-tada-hover'></i>";
  } else {
    document.body.classList.remove('darkMode');

    light.classList.add('active');
    dark.classList.remove('active');

    light.innerHTML = "<i class='bx bxs-sun bx-sm bx-tada-hover'></i> ";
    dark.innerHTML = "<i class='bx bx-moon bx-sm bx-tada-hover'></i>";
  }
});

// ---Theme Dark Handler--- //
dark.addEventListener('click', () => {
  document.body.classList.add('darkMode');
  dark.classList.add('active');
  light.classList.remove('active');
  localStorage.setItem('theme', 'dark');

  light.innerHTML = "<i class='bx bx-sun bx-sm bx-tada-hover'></i>";
  dark.innerHTML = "<i class='bx bxs-moon bx-sm bx-tada-hover'></i>";
});

// ---Theme Light Handler--- //
light.addEventListener('click', () => {
  document.body.classList.remove('darkMode');
  light.classList.add('active');
  dark.classList.remove('active');
  localStorage.setItem('theme', 'light');

  light.innerHTML = "<i class='bx bxs-sun bx-sm bx-tada-hover'></i> ";
  dark.innerHTML = "<i class='bx bx-moon bx-sm bx-tada-hover'></i>";
});

// --- End of Theme function --- //