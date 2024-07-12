// Create a div to host the React app
const appDiv = document.createElement("div");
appDiv.id = "extension-app";
document.body.appendChild(appDiv);

// Function to inject a script
function injectScript(file, node) {
  const th = document.getElementsByTagName(node)[0];
  const s = document.createElement("script");
  s.setAttribute("type", "text/javascript");
  s.setAttribute("src", file);
  th.appendChild(s);
}

// Function to inject a CSS file
function injectCSS(file) {
  const link = document.createElement("link");
  link.href = file;
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
}

// Inject the CSS and JS files
injectCSS(chrome.runtime.getURL("frontend/dist/style.css"));
// injectScript(chrome.runtime.getURL("frontend/dist/main.js"), "body");

// const tracking = (user_id, extension_id) => {
//   console.log(user_id, extension_id);
//   // User Tracking
//   setInterval(async () => {
//     if (!document.hidden) {
//       const res = await fetch(
//         `https://interventions.jryng.com/tracking/usage`,
//         {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             user_id: user_id,
//             extension_id: extension_id,
//           }),
//         }
//       )
//         .then(async (res) => {
//           if (!res.ok) throw await res.json();
//           return await res.json();
//         })
//         .catch((err) => {
//           console.log("tracking", err);

//           if (err.detail === "User ID not found") {
//             chrome.storage.local.clear().then(() => {
//               console.log("Value is set");
//             });
//             window.location.reload();
//           }

//           return null;
//         });
//       console.log("tracking", res);
//     }
//   }, 5000);
// };

// function showModal(
//   text = "From now on, you will be unable to save your credentials. You will have to log in each time you open up Tik Tok. ",
//   title = "activated"
// ) {
//   // Create the modal container
//   const modal = document.createElement("div");

//   // Function to hide the modal
//   function hideModal() {
//     console.log("hideModal");
//     modal.remove();
//   }

//   modal.style.display = "flex";
//   modal.style.position = "fixed";
//   modal.style.top = "0";
//   modal.style.left = "0";
//   modal.style.width = "100%";
//   modal.style.height = "100%";
//   modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
//   modal.style.justifyContent = "center";
//   modal.style.alignItems = "center";
//   modal.style.zIndex = "999999999";

//   // Create the modal content
//   const modalContent = document.createElement("div");
//   modalContent.style.backgroundColor = "#fff";
//   modalContent.style.padding = "20px";
//   modalContent.style.borderRadius = "5px";
//   modalContent.style.textAlign = "center";
//   modalContent.innerHTML += `<p> <span style="font-weight:bold;">Your extension has been ${title} </span><br/>${text}</p>`;

//   // Create the close button
//   const closeButtonElement = document.createElement("div");
//   closeButtonElement.style.cssText =
//     "width:100%; cursor: pointer; margin-top: 0.5rem; font-weight: 600; padding-top: 0.5rem; padding-bottom: 0.5rem;border-radius: 0.5rem; background-color: rgb(220 252 231 / 1); color: rgb(22 101 52 / 1);";
//   closeButtonElement.innerHTML += "Okay";
//   closeButtonElement.style.cursor = "pointer";

//   modalContent.appendChild(closeButtonElement);

//   modal.appendChild(modalContent);

//   // Append the modal to the document body

//   document.body.insertBefore(modal, document.body.firstChild);

//   // Add click event to close the modal
//   closeButtonElement.onclick = () => {
//     hideModal();
//   };
// }

// chrome.storage.local.get().then((result) => {
//   console.log("Stored: " + JSON.stringify(result));
//   console.log(Math.round(Date.now() / 1000));

//   if (!result.installation_timestamp) {
//     // Save the timestamp when the user first installs the extension
//     chrome.storage.local
//       .set({ installation_timestamp: Math.round(Date.now() / 1000) })
//       .then(() => {
//         console.log("Value is set");
//       });
//   }

//   if (!result.user_id) {
//     // If user_id cannot be found in the extension
//     // Open the pre-exp survey
//     chrome.runtime.sendMessage({ action: "survey" }, function (response) {
//       console.log("Response: ", response);
//     });

//     // Block app access
//     // Click on the button to reload the page with the user_id
//     const reloadButton = document.createElement("div");
//     reloadButton.style.cssText =
//       "width:100vw; height: 100vh;background:rgb(250, 250, 250); color: black; display: flex;justify-content: center; align-items: center;text-align: center; border-right: solid 0.5px gray;";
//     reloadButton.innerHTML += "Click me after the survey to access the app!";
//     reloadButton.onclick = () => {
//       window.location.reload();
//     };

//     document.body.innerHTML = "";
//     document.body.insertBefore(reloadButton, document.body.firstChild);
//   } else {
//     //////////////////
//     // MAIN
//     //////////////////

//     // if user_id % 2 == 0, Activate the intervention now and disable after a week
//     // if user_id % 2 == 1, Activate the intervention after a week (60sec * 60 * 24 * 7)
//     if (
//       (result.user_id % 2 == 0 &&
//         Math.round(Date.now() / 1000) <
//           result.installation_timestamp + 60 * 60 * 24 * 4) ||
//       (result.user_id % 2 == 1 &&
//         Math.round(Date.now() / 1000) >
//           result.installation_timestamp + 60 * 60 * 24 * 4)
//     ) {
//       // Activate only if not already activated
//       chrome.storage.local.get("activated", (result) => {
//         if (result.activated === undefined) {
//           chrome.storage.local.set({ activated: true }, () => {
//             showModal(
//               "From this moment on, with each touch, your screen will slowly turn grayscale. This visual cue is designed to raise awareness of your screen time and promote a healthier relationship with the app. As you engage with Tik Tok, you will be gently reminded to take breaks and be mindful of your usage, allowing you to stay in control of your time spent on the platform."
//             );
//             console.log("Intervention activated for the first time");
//           });
//         } else {
//           console.log("The intervention is currently active");
//         }
//       });

//       tracking(result.user_id, "gradual-grayscale");

//       //////////////////
//       // Intervention
//       //////////////////

//       // Creates a transparent overlay element with fixed position and full viewport size
//       const overlayElement = document.createElement("div");
//       overlayElement.style.cssText =
//         "position:fixed;width:100vw;height:100vh;z-index:999999;background:transparent;pointer-events: none;backdrop-filter:grayscale(0)";
//       document.body.insertBefore(overlayElement, document.body.firstChild);

//       // Updates the grayscale value by the specified delta.
//       // @param delta - The amount by which the grayscale value should be updated.
//       // @return True if the grayscale value is successfully updated, False otherwise.
//       const updateGrayscale = (delta = 0.01) => {
//         console.log("updateGrayscale");
//         console.log(overlayElement.style.backdropFilter);
//         let grayscale = parseFloat(
//           overlayElement.style.backdropFilter.slice(10, -1)
//         );

//         if (grayscale >= 1) {
//           // If the grayscale value reaches 100%
//           // alert("You've reached your limit!");
//           return false;
//         } else {
//           console.log(grayscale);
//           grayscale += delta;
//           overlayElement.style.backdropFilter = `grayscale(${grayscale})`;
//           return true;
//         }
//       };

//       // Touch-based Transition
//       // This function facilitates the transition effect through touch interaction by updating
//       // the grayscale value of the displayed content on each touch event.
//       document.body.addEventListener("touchstart", (e) => {
//         updateGrayscale(0.05);
//       });

//       // Time-based Transition
//       // This function enables a time-based transition effect by periodically updating the grayscale value
//       // of the displayed content at a fixed default interval value of 100 milliseconds.
//       // Uncomment the following and comment out the code above to try it out:
//       // const interval = setInterval(() => {
//       //   if (!updateGrayscale()) {
//       //     clearInterval(interval);
//       //   }
//       // }, 100);
//     } else {
//       // Activate only if intervention has been activated before
//       chrome.storage.local.get("activated", (result) => {
//         if (result.activated === true) {
//           chrome.storage.local.set({ activated: false }, () => {
//             showModal(
//               "The intervention has been disabled, feel free to use the app as you normally would for another week.",
//               "disabled"
//             );
//             console.log("Intervention disabled for the first time");
//           });
//         } else {
//           console.log("The intervention is currently disabled");
//         }
//       });
//       tracking(result.user_id, "inactive");
//     }
//   }
// });
