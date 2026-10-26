// Sample Dataset from Project 2 (Cleaned Data)
const labData = [
  { id: 'L7000', day: 1, course: 'Programming', lab: 'Lab 3', students: 30, computers: 28, downtime: 59, rating: 2.8 },
  { id: 'L7001', day: 2, course: 'Web Development', lab: 'Lab 2', students: 32, computers: 23, downtime: 43, rating: 3.0 },
  { id: 'L7002', day: 3, course: 'Programming', lab: 'Lab 2', students: 16, computers: 16, downtime: 17, rating: 3.4 },
  { id: 'L7003', day: 4, course: 'Networking', lab: 'Lab 3', students: 19, computers: 18, downtime: 10, rating: 4.7 },
  { id: 'L7004', day: 5, course: 'Web Development', lab: 'Lab 1', students: 39, computers: 28, downtime: 52, rating: 2.8 },
  { id: 'L7005', day: 6, course: 'DBMS', lab: 'Lab 1', students: 34, computers: 30, downtime: 54, rating: 2.8 },
  { id: 'L7006', day: 7, course: 'Networking', lab: 'Lab 2', students: 36, computers: 36, downtime: 20, rating: 3.4 },
  { id: 'L7007', day: 8, course: 'Web Development', lab: 'Lab 1', students: 35, computers: 35, downtime: 45, rating: 3.1 },
  { id: 'L7008', day: 9, course: 'DBMS', lab: 'Lab 1', students: 31, computers: 31, downtime: 8, rating: 5.0 },
  { id: 'L7009', day: 10, course: 'Programming', lab: 'Lab 1', students: 27, computers: 27, downtime: 52, rating: 2.8 },
  { id: 'L7010', day: 11, course: 'DBMS', lab: 'Lab 2', students: 24, computers: 22, downtime: 26, rating: 3.5 },
  { id: 'L7011', day: 12, course: 'DBMS', lab: 'Lab 3', students: 16, computers: 16, downtime: 7, rating: 3.3 },
  { id: 'L7012', day: 13, course: 'Web Development', lab: 'Lab 2', students: 33, computers: 28, downtime: 27, rating: 4.3 },
  { id: 'L7013', day: 14, course: 'Programming', lab: 'Lab 1', students: 35, computers: 35, downtime: 10, rating: 5.0 },
  { id: 'L7014', day: 15, course: 'Programming', lab: 'Lab 1', students: 23, computers: 20, downtime: 24, rating: 3.9 },
  { id: 'L7015', day: 16, course: 'DBMS', lab: 'Lab 1', students: 39, computers: 39, downtime: 6, rating: 4.5 },
  { id: 'L7016', day: 17, course: 'Programming', lab: 'Lab 3', students: 27, computers: 24, downtime: 7, rating: 3.5 },
  { id: 'L7017', day: 18, course: 'Networking', lab: 'Lab 1', students: 39, computers: 16, downtime: 58, rating: 2.3 },
  { id: 'L7018', day: 19, course: 'DBMS', lab: 'Lab 2', students: 38, computers: 25, downtime: 58, rating: 1.9 },
  { id: 'L7019', day: 20, course: 'Web Development', lab: 'Lab 1', students: 26, computers: 25, downtime: 52, rating: 1.9 },
  { id: 'L7020', day: 21, course: 'Networking', lab: 'Lab 3', students: 27, computers: 27, downtime: 50, rating: 1.7 },
  { id: 'L7021', day: 22, course: 'DBMS', lab: 'Lab 2', students: 36, computers: 28, downtime: 2, rating: 5.0 }
];

// Populate Table
function renderTable(data) {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '';

  data.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.id}</strong></td>
      <td>Day ${item.day}</td>
      <td>${item.course}</td>
      <td>${item.lab}</td>
      <td>${item.students}</td>
      <td>${item.computers}</td>
      <td style="color: ${item.downtime > 30 ? '#ef4444' : '#10b981'}">${item.downtime} mins</td>
      <td>⭐ ${item.rating.toFixed(1)}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Filter Function
function filterData() {
  const course = document.getElementById('courseFilter').value;
  const lab = document.getElementById('labFilter').value;

  const filtered = labData.filter(item => {
    const courseMatch = course === 'ALL' || item.course === course;
    const labMatch = lab === 'ALL' || item.lab === lab;
    return courseMatch && labMatch;
  });

  renderTable(filtered);
}

// Render Charts on Load
window.onload = function() {
  renderTable(labData);

  // Chart 1: Course Breakdown
  const ctx1 = document.getElementById('courseChart').getContext('2d');
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: ['DBMS', 'Networking', 'Programming', 'Web Development'],
      datasets: [
        {
          label: 'Avg Students Present',
          data: [31.5, 28.1, 24.6, 27.0],
          backgroundColor: '#2563eb'
        },
        {
          label: 'Avg Computers Used',
          data: [25.9, 23.1, 23.7, 23.7],
          backgroundColor: '#38bdf8'
        }
      ]
    },
    options: { responsive: true }
  });

  // Chart 2: Lab Room Distribution
  const ctx2 = document.getElementById('labChart').getContext('2d');
  new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: ['Lab 1 (20 Sessions)', 'Lab 2 (15 Sessions)', 'Lab 3 (15 Sessions)'],
      datasets: [{
        data: [20, 15, 15],
        backgroundColor: ['#4f46e5', '#06b6d4', '#10b981']
      }]
    },
    options: { responsive: true }
  });

  // Chart 3: Downtime vs Rating Correlation
  const ctx3 = document.getElementById('correlationChart').getContext('2d');
  new Chart(ctx3, {
    type: 'line',
    data: {
      labels: ['0-15 mins Downtime', '16-30 mins Downtime', '31-45 mins Downtime', '46-60 mins Downtime'],
      datasets: [{
        label: 'Average Instructor Rating',
        data: [4.15, 3.73, 3.17, 2.45],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { min: 1, max: 5 }
      }
    }
  });
};
