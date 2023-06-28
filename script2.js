const supabaseUrl = "https://keerrggipsskzhzfzicg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlZXJyZ2dpcHNza3poemZ6aWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NDI2MDAsImV4cCI6MjAwMzQxODYwMH0.MRp3meFNt2rdgxDRXr4_W3-Vdm0qbxxm9dSeRNYr9yQ"; // Replace with your Supabase API key
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const populateTable = (data) => {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  data.forEach((row) => {
    const { name, email, bloodGroup, phone } = row;

    const tableRow = document.createElement("tr");
    const nameCell = document.createElement("td");
    const emailCell = document.createElement("td");
    const bloodGroupCell = document.createElement("td");
    const phoneCell = document.createElement("td");

    nameCell.textContent = name;
    emailCell.textContent = email;
    bloodGroupCell.textContent = bloodGroup;
    phoneCell.textContent = phone;

    tableRow.appendChild(nameCell);
    tableRow.appendChild(emailCell);
    tableRow.appendChild(bloodGroupCell);
    tableRow.appendChild(phoneCell);

    tableBody.appendChild(tableRow);
  });
};

const fetchDonorData = async () => {
  const { data, error } = await supabase.from("bbank").select("*");

  if (error) {
    console.error("Error fetching donor data:", error);
  } else {
    console.log("Donor data fetched successfully:", data);
    populateTable(data);
  }
};

fetchDonorData();
