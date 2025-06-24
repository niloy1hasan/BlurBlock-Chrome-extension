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
})();
