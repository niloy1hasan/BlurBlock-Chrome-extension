(function () {
  if (document.getElementById("blurblock-mask")) return;

  const blurMask = document.createElement("div");
  blurMask.id = "blurblock-mask";

  Object.assign(blurMask.style, {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    position: "fixed",
    top: "100px",
    left: "100px",
    backdropFilter: "blur(10px)",
    background: "rgba(0, 0, 0, 0.3)",
    zIndex: "999999",
    cursor: "move",
    userSelect: "none",
  });

  document.body.appendChild(blurMask);

  let isDragging = false;
  let offsetX, offsetY;

  blurMask.addEventListener("mousedown", function (e) {
    if (e.button === 2) return;
    isDragging = true;
    offsetX = e.clientX - blurMask.offsetLeft;
    offsetY = e.clientY - blurMask.offsetTop;
    e.preventDefault();
  });

  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      let newX = e.clientX - offsetX;
      let newY = e.clientY - offsetY;

      newX = Math.min(
        Math.max(newX, 0),
        window.innerWidth - blurMask.offsetWidth
      );

      newY = Math.min(
        Math.max(newY, 0),
        window.innerHeight - blurMask.offsetHeight
      );

      blurMask.style.left = newX + "px";
      blurMask.style.top = newY + "px";
    }
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
  });

   blurMask.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    showContextMenu(e.pageX, e.pageY);
  });

  // Create custom context menu element
  const contextMenu = document.createElement("div");
  contextMenu.id = "blurblock-context-menu";
  Object.assign(contextMenu.style, {
    position: "absolute",
    display: "none",
    background: "#fff",
    color: "#333",
    padding: "6px 10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    borderRadius: "6px",
    fontSize: "14px",
    zIndex: "1000000",
    cursor: "pointer",
    userSelect: "none"
  });

  // Create "Remove Mask" menu item
  const removeOption = document.createElement("div");
  removeOption.textContent = "Remove Mask";
  removeOption.addEventListener("click", () => {
    blurMask.remove();
    contextMenu.remove();
  });

  contextMenu.appendChild(removeOption);
  document.body.appendChild(contextMenu);

  // Function to show the menu at cursor position
  function showContextMenu(x, y) {
    contextMenu.style.left = x + "px";
    contextMenu.style.top = y + "px";
    contextMenu.style.display = "block";
  }

  // Hide menu when clicking elsewhere
  document.addEventListener("click", function (e) {
    if (e.target !== contextMenu && e.target !== blurMask) {
      contextMenu.style.display = "none";
    }
  });

})();
