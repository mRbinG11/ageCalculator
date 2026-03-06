const dayInput = document.getElementById("dayIn");
const monthInput = document.getElementById("monthIn");
const yearInput = document.getElementById("yearIn");
const dayError = document.getElementById("day-error");
const monthError = document.getElementById("month-error");
const yearError = document.getElementById("year-error");
const calculateBtn = document.getElementById("calculateBtn");
const result = document.getElementById("result");

// Real-time validation functions
function validateDay() {
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value) || 0;
  const year = parseInt(yearInput.value) || 0;

  if (!dayInput.value) {
    showError(dayError, "This field is required");
    return false;
  }

  if (day < 1 || day > 31) {
    showError(dayError, "Must be a valid day");
    return false;
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day > daysInMonth) {
    showError(dayError, "Must be a valid date");
    return false;
  }

  showError(dayError, "");
  return true;
}

function validateMonth() {
  const month = parseInt(monthInput.value);
  if (!monthInput.value) {
    showError(monthError, "This field is required");
    return false;
  }
  if (month < 1 || month > 12) {
    showError(monthError, "Must be a valid month");
    return false;
  }
  showError(monthError, "");
  return true;
}

function validateYear() {
  const year = parseInt(yearInput.value);
  const birthDate = new Date(
    yearInput.value,
    monthInput.value - 1,
    dayInput.value,
  );
  const today = new Date();
  if (!yearInput.value) {
    showError(yearError, "This field is required");
    return false;
  }
  if (year < 1900 || birthDate > today) {
    showError(yearError, "Must be in past");
    return false;
  }
  showError(yearError, "");
  return true;
}

function showError(element, message) {
  element.textContent = message;
  element.style.color = message ? "#ef426f" : "";
}

// Add event listeners for real-time validation
dayInput.addEventListener("input", validateDay);
monthInput.addEventListener("input", () => {
  validateMonth();
  validateDay(); // Re-validate day if month changes
});
yearInput.addEventListener("input", () => {
  validateYear();
  validateDay(); // Re-validate day if year changes
});

function isValidDate() {
  return validateDay() && validateMonth() && validateYear();
}

function calculateAge() {
  if (!isValidDate()) {
    showError(monthError, "All fields are required");
    return;
  }

  const birthDate = new Date(
    yearInput.value,
    monthInput.value - 1,
    dayInput.value,
  );
  const today = new Date();

  // Calculate age components
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  if (days < 0) {
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  document.getElementById("yearOut").textContent = years;
  document.getElementById("monthOut").textContent = months;
  document.getElementById("dayOut").textContent = days;

  result.style.display = "block";
}

calculateBtn.addEventListener("click", calculateAge);

// Optional: Calculate on Enter key
document.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && isValidDate()) {
    calculateAge();
  }
});
