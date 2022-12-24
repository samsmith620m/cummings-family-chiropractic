// SOURCE: https://www.youtube.com/watch?v=7HPsdVQhpRw

const carousel = document.querySelector(".review-carousel__reviews");
firstReview = carousel.querySelectorAll(".review")[0];
navigationButtons = document.querySelectorAll(".review-carousel__button");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideNavButtons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    navigationButtons[0].style.display = carousel.scrollLeft == 0 ? "none" : "grid";
    navigationButtons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "grid";
}

navigationButtons.forEach(button => {
    button.addEventListener("click", () => {
        let firstReviewWidth = firstReview.clientWidth;
        if(button.id == "left") {
            carousel.scrollLeft -= firstReviewWidth;
        } else {
            carousel.scrollLeft += firstReviewWidth;
        }
        setTimeout(() => showHideNavButtons(), 750);

    })
})

const autoSlide = () => {
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

    positionDiff = Math.abs (positionDiff);
    let firstReviewWidth = firstReview.clientWidth;
    let valDifference = firstReviewWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) {
        return carousel.scrollLeft += positionDiff > firstReviewWidth / 3 ? valDifference : -positionDiff;
    }
    carousel.scrollLeft -= positionDiff > firstReviewWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideNavButtons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);