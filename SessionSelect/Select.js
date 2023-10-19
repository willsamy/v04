document.addEventListener('DOMContentLoaded', function() {
  const cardWraps = document.querySelectorAll('.card-wrap');

  cardWraps.forEach(cardWrap => {
    let width = 0,
        height = 0,
        mouseX = 0,
        mouseY = 0;
    let mouseLeaveDelay = null;

    function handleMouseMove(e) {
      mouseX = e.pageX - cardWrap.offsetLeft - width / 2;
      mouseY = e.pageY - cardWrap.offsetTop - height / 2;

      const mousePX = mouseX / width;
      const mousePY = mouseY / height;

      const rX = mousePX * 30;
      const rY = mousePY * -30;
      cardWrap.querySelector('.card').style.transition = "transform 0.5s ease";
      cardWrap.querySelector('.card').style.transform = `rotateY(${rX}deg) rotateX(${rY}deg)`;

      const tX = mousePX * -40;
      const tY = mousePY * -40;
      cardWrap.querySelector('.card-bg').style.transition = "transform 0.5s ease";
      cardWrap.querySelector('.card-bg').style.transform = `translateX(${tX}px) translateY(${tY}px)`;
    }

    function handleMouseEnter() {
      clearTimeout(mouseLeaveDelay);
    }

    function handleMouseLeave() {
      cardWrap.querySelector('.card').style.transition = "transform 0.5s ease";
      cardWrap.querySelector('.card').style.transform = "rotateY(0deg) rotateX(0deg)";
      cardWrap.querySelector('.card-bg').style.transition = "transform 0.5s ease";
      cardWrap.querySelector('.card-bg').style.transform = "translateX(0px) translateY(0px)";

      mouseLeaveDelay = setTimeout(function() {
        cardWrap.querySelector('.card').style.transition = "";
        cardWrap.querySelector('.card-bg').style.transition = "";
      }, 500);
    }

    cardWrap.addEventListener('mousemove', handleMouseMove);
    cardWrap.addEventListener('mouseenter', handleMouseEnter);
    cardWrap.addEventListener('mouseleave', handleMouseLeave);

    width = cardWrap.querySelector('.card').offsetWidth;
    height = cardWrap.querySelector('.card').offsetHeight;
  });
});