document.addEventListener('DOMContentLoaded', async function () {
  const form = document.getElementById('sendMoneyForm');
  const sendBtn = document.getElementById('sendBtn');
  const amountInput = document.getElementById('amount');
  const chargeDisplay = document.getElementById('chargeDisplay');

  let tranCharge = 0;

  // ✅ Update transaction charge live
  amountInput.addEventListener('input', function () {
    const amount = parseFloat(amountInput.value.trim());
    if (isNaN(amount) || amount <= 0) {
      tranCharge = 0;
      chargeDisplay.textContent = `Transaction charge: ₦0.00`;
      sendBtn.disabled = true;
      return;
    }

    // 2% charge with ₦2,500 cap
    tranCharge = Math.min(amount * 0.02, 2500);
    chargeDisplay.textContent = `Transaction charge: ₦${tranCharge.toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;

    const method = document.getElementById('method').value.trim();
    sendBtn.disabled = !(amount && method);
  });

  // ✅ Enable button only when both amount and method selected
  form.addEventListener('input', function () {
    const amount = amountInput.value.trim();
    const method = document.getElementById('method').value.trim();
    sendBtn.disabled = !(amount && method);
  });

  // ✅ Handle submission
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const amount = parseFloat(amountInput.value.trim());
    const method = document.getElementById('method').value.trim();
    const note = document.getElementById('note').value.trim();

    const payload = {
      ServiceID: "sendFunds",
      BankType: "paystack",
      BankCountryType: "nuban",
      Amount: parseInt(amount),
      TranCharge: tranCharge,
      // AccountNumber: "1025140863",
      AccountNumber: "8136804598",
      // AccountName: "SAVE REFUGE FOUNDATION",
      AccountName: "CHINONSO STANLEY OBIDUBA",
      Description: note || "Save Refuge Orphanage Foundation Withdrawal",
      // BankCode: "033153513",
      BankCode: "999992",
      // Bank: "United Bank For Africa",
      Bank: "OPay Digital Services Limited (OPay)",
      Currency: "NGN",
    };

    // console.log("[DEBUG] Send Money Payload:", payload);

    sendBtn.disabled = true;
    sendBtn.innerText = "Processing...";

    try {
      const res = await fetch("https://api.payuee.com/payuee/init-transaction-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();
      console.log("[API RESPONSE]", responseData);

      if (!res.ok) {
        alert(responseData.error || "An error occurred. Please try again.");
        return;
      }

      showSuccessPopup();

    } catch (error) {
      console.error("❌ API Error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      sendBtn.innerText = "Send Money";
      sendBtn.disabled = false;
    }
  });
});

// ✅ Popup controls
function showSuccessPopup() {
  document.getElementById('successPopup').style.display = 'flex';
}
function closeSuccessPopup() {
  document.getElementById('successPopup').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
  const noteInput = document.getElementById("note");
  const noteCounter = document.getElementById("noteCounter");
  const maxChars = 100;

  noteInput.addEventListener("input", function () {
    const length = noteInput.value.length;
    noteCounter.textContent = `${length} / ${maxChars}`;

    // Optional visual feedback
    if (length >= maxChars) {
      noteCounter.style.color = "red";
    } else {
      noteCounter.style.color = "#6c757d"; // Bootstrap muted text color
    }
  });
});