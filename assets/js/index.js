document.querySelector('#submitBooking').addEventListener('click', async function (e) {
  e.preventDefault();

    const formData = {
        surn_name: document.getElementById("surname").value.trim(),
        other_name: document.getElementById("otherNames").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        course: document.getElementById("skillHub").value,
        
        // Default values (you will override these after payment):
        amount_paid: 15000,
    };

  document.getElementById("submitBooking").textContent = "Processing...";

  const button = document.getElementById('submitBooking');

  // Disable by adding a class and preventing interaction
  button.classList.add('disabled');          // You can style this in CSS
  button.disabled = true;                   // Disable the button

  const user_data = collectPassengerData(tripid);

  if (!user_data) {
    alert("Please fill out at least one passenger.");
    return;
  }

  try {
    const response = await fetch("https://api.abittoferry.com/book-trips", {
      method: 'POST',
      credentials: 'include', // This ensures cookies (sessions/JWT) are sent
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user_data)
    });

    if (!response.ok) {
        button.classList.remove('disabled');          // You can style this in CSS
        button.disabled = false;                   // Disable the button
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    document.getElementById("submitBooking").textContent = "Please wait...";
    localStorage.setItem("OrderID", String(data.booking.ID));
    localStorage.setItem("Passengers", String(data.booking.passengers));
    localStorage.setItem("TripID", String(data.trip_id));
    window.location.href = data.success.data.authorization_url;

  } catch (error) {
        button.classList.remove('disabled');          // You can style this in CSS
        button.disabled = false;                   // Disable the button
    return null;
  }
});