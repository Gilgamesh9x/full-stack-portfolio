const parentElement = document.querySelector(".main-content");
async function test() {
  try {
    const response = await axios.get("https://localhost:8000/forms");
    const data = response.data;
    console.log(data);
    ////////////////////
    data.forEach((form) => {
      const html = `
    <div class="data-container">
        <div class="data-row">
          <div class="data-label">Number:</div>
          <div class="data-value" id="number">${form.formNumber}</div>
        </div>
        <div class="data-row">
          <div class="data-label">Email:</div>
          <div class="data-value" id="email">${form.email}</div>
        </div>
        <div class="data-row">
          <div class="data-label">Email Subject:</div>
          <div class="data-value" id="emailSubject">${form.emailSubject}</div>
        </div>
        <div class="data-row">
          <div class="data-label">Full Name:</div>
          <div class="data-value" id="fullName">${form.fullName}</div>
        </div>
        <div class="data-row">
          <div class="data-label">Phone Number:</div>
          <div class="data-value" id="phoneNumber">${form.phoneNumber}</div>
        </div>
      </div>
    </div>
        `;
      parentElement.insertAdjacentHTML("beforeend", html);
    });
    /////////////////////
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
test();
