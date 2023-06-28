const supabaseUrl = "https://keerrggipsskzhzfzicg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlZXJyZ2dpcHNza3poemZ6aWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NDI2MDAsImV4cCI6MjAwMzQxODYwMH0.MRp3meFNt2rdgxDRXr4_W3-Vdm0qbxxm9dSeRNYr9yQ";
const handleFormSubmit = async (fromEvent) => {
  //   debugger;
  fromEvent.preventDefault();

  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  const form = document.getElementById("donors");
  const formData = new FormData(form);
  // Extract form data
  const donorData = {
    name: formData.get("name"),
    email: formData.get("email"),
    bloodGroup: formData.get("bloodGroup"),
    phone: formData.get("phone"),
  };

  console.log({ donorData });

  // Insert donor data into Supabase table``
  const { data, error } = await supabase.from("bbank").insert([donorData]);

  if (error) {
    console.error("Error inserting donor data:", error);
  } else {
    console.log("Donor data inserted successfully:", data);
  }
  alert("Donor data inserted successfully ");
};

const form1 = document.getElementById("donors");

form1.addEventListener("submit", handleFormSubmit);
