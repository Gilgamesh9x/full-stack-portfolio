// toggle icon navbar

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  // when you click on the menu
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// The onclick event occurs when the user clicks on an HTML element.

// scorll sections

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  // this is a neat way to add an event listener, so basically, we can do this instead:

  sections.forEach((sec) => {
    let top = window.scrollY; // it shows you how much you scrolled
    let offset = sec.offsetTop - 200; // This shows you the distance between the top edge of the element and its ancestor
    let height = sec.offsetHeight; // the height of the element including everything like borders and padding
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      // active navbar links
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  // sticky header
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100); // if the user scrolls at least 100px, the class will be added

  // remove toggle icon and navbar when click navbar links (scroll)

  menuIcon.classList.remove("bx-x"); // if the user scrolls 100 px, it's gonna remove the x (same happens when you click on an element and it directs you to it, because it basically scrolls automatically...)
  navbar.classList.remove("active"); // if the user scrolls 100 px, it's gonna remove the nav bar
};

/* window.addEventListener("scroll", function() {
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
}); */

////////////////////////////////////////////////////////////////////////

const form = document.querySelector("form");
const submitButton = document.querySelector(".submit-button");

submitButton.addEventListener("click", async (e) => {
  if (!form.checkValidity()) {
    // If the form is not valid, keep the default behavior (so the browser tells the user to fill the field with the correct data)
    return;
  } else {
    // If the form is valid, submit it and don't refresh the page
    e.preventDefault();
    const formData = new FormData(form); // we can access this by doing formData.entries() and looping over the key value pairs
    const keysValues = {}; // we'll store the keys and values here
    formData.forEach((value, key) => {
      keysValues[key] = value;
    });
    console.log(keysValues);
    //
    try {
      const response = await fetch("http://localhost:8000/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(keysValues),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      /* const data = await response.json(); */
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }
});
