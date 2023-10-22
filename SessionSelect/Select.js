document.addEventListener('DOMContentLoaded', function() {
  const cardWraps = document.querySelectorAll('.card-wrap');

  cardWraps.forEach((cardWrap, index) => {
    let width = 0,
        height = 0,
        mouseX = 0,
        mouseY = 0;
    let mouseLeaveDelay = null;

    // Adicione esta linha para ler o atributo data-video
    const videoSrc = cardWrap.getAttribute('data-video');

    // Adicione esta linha para ler o atributo data-image
    const bgImage = cardWrap.getAttribute('data-image');
    if (bgImage) {
      cardWrap.querySelector('.card-bg').style.backgroundImage = `url(${bgImage})`;
    }

    function handleMouseMove(e) {
      mouseX = e.pageX - cardWrap.offsetLeft - width / 5;
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

    if (videoSrc && index === 0) {
      const video = document.createElement('video');
      video.src = videoSrc;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;

      // Adicione a classe .data-video ao elemento de vídeo
      video.classList.add('data-video');

      cardWrap.querySelector('.card-bg').appendChild(video);
    }
  });
});