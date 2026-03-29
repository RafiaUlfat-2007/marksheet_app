const form = document.getElementById('marksForm');
const resultTitle = document.getElementById('resultTitle');
const totalMarksEl = document.getElementById('totalMarks');
const percentageEl = document.getElementById('percentage');
const gradeEl = document.getElementById('grade');
const remarksEl = document.getElementById('remarks');

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function calculateGrade(percentage) {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  return 'F';
}

function calculateRemarks(percentage) {
  if (percentage >= 90) return 'Excellent work!';
  if (percentage >= 80) return 'Great job — keep it up!';
  if (percentage >= 70) return 'Good effort — a little more focus can help.';
  if (percentage >= 60) return 'Fair performance — try to improve.';
  if (percentage >= 50) return 'Needs improvement — keep practicing.';
  return 'Please try again and review the subjects.';
}

function updateResults(total, percentage, grade, remarks) {
  totalMarksEl.textContent = `${total} / 500`;
  percentageEl.textContent = `${percentage.toFixed(2)}%`;
  gradeEl.textContent = grade;
  remarksEl.textContent = remarks;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const marks = {
    math: Number(form.math.value),
    computer: Number(form.computer.value),
    english: Number(form.english.value),
    physics: Number(form.physics.value),
    urdu: Number(form.urdu.value),
  };

  const invalid = Object.entries(marks).find(
    ([, value]) => value === "" || Number.isNaN(value) || value < 0 || value > 100
  ); 

    // const invalid = Object.entries(marks).find(
    // ([, value]) => Number.isNaN(value) || value < 0 || value > 100
  // );

  if (invalid) {
    resultTitle.textContent = 'Invalid marks detected';
    updateResults(0, 0, '—', 'Please enter values between 0 and 100.');
    return;
  }

  const total = marks.math + marks.computer + marks.english + marks.physics + marks.urdu;
  const percentage = (total / 500) * 100;
  const grade = calculateGrade(percentage);
  const baseRemarks = calculateRemarks(percentage);
  const status = percentage >= 50 ? "Pass ✅" : "Fail ❌";
  const remarks = baseRemarks + " (" + status + ")";

  // Update result title and card
  resultTitle.textContent = 'Your Result 🎉';
  updateResults(total, percentage, grade, remarks);

  // Progress bar update
  document.getElementById("progressBar").style.width = percentage + "%";

  // Grade color
  if (grade === "A+" || grade === "A") {
    gradeEl.style.color = "#1E90FF"; // DodgerBlue
  } else if (grade === "B" || grade === "C") {
    gradeEl.style.color = "#FFA500"; // Orange
  } else {
    gradeEl.style.color = "#FF4500"; // OrangeRed
  }

  // Clear the form
  form.reset();
});