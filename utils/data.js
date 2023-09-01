import { keyframes } from "@emotion/react";

export const fadeIn = keyframes`{
    from {
        opacity:0;
    }
  
    to {
        opacity:1;
    }
}`

export const fadeInRightShorter = keyframes`
from {
  opacity: 0;
  transform: translate(-50px,0);
  transform-origin: 0 0;
}

to {
  opacity: 1;
  transform: none
}`;

export const fadeInRight = keyframes`
0% {
    -webkit-transform: translate3d(100%,0,0);
    opacity: 0;
    transform: translate3d(100%,0,0)
}

to {
    -webkit-transform: translateZ(0);
    opacity: 1;
    transform: translateZ(0)
}`;

export const fadeInLeftShorter = keyframes`{
    from {
        opacity: 0;
        transform: translate(50px,0);
        transform-origin: 0 0;
    }
    to {
        opacity: 1;
        transform: none
    }
}`

export const fadeInLeft = keyframes`
0% {
    -webkit-transform: translate3d(-100%,0,0);
    opacity: 0;
    transform: translate3d(-100%,0,0)
}

to {
    -webkit-transform: translateZ(0);
    opacity: 1;
    transform: translateZ(0)
}`;

export const fadeInUpShorter = keyframes`
from {
    opacity: 0;
    transform: translate(0,50px);
    transform-origin: 0 0;
}
to {
    opacity:1;
    transform:none
}`

export const fadeInUp = keyframes`
0% {
    -webkit-transform: translate3d( 0, 100%, 0 );
    opacity: 0;
    transform: translate3d( 0, 100 %, 0 )
}

to {
    -webkit-transform: translateZ( 0 );
    opacity: 1;
    transform: translateZ( 0 )
}`

export const fadeInDownShorter = keyframes`
from {
    opacity: 0;
    transform: translate(0,-50px);
    transform-origin: 0 0;
}

to {
    opacity: 1;
    transform: none
}`

export const blurIn = keyframes`{
    from {
        opacity: 0;
        filter: blur(20px);
        transform: scale(1.2);
    }
    to {
        opacity: 1;
        filter: blur(0);
        transform: none 
    }
}`

export const grayOut = keyframes`{
    from {
        opacity: 1;
        filter: grayscale(0);
    }
    15% {
        filter: grayscale(100%);
    }
    to {
        opacity: .0;
        filter: grayscale(100%);
    }
}`

export const dotPulse = keyframes`{
    from {
        opacity:1;
        transform:scale(.2)
    }
  
    to {
        opacity:0;
        transform:scale(1)
    }
}`

export const maskUp = keyframes`{
    from {
        transform: translate(0,100%)
    }
  
    to {
        transform: translate(0,0)
    }
}`

export const maskRight = keyframes`{
    from {
        transform: translate(-100%,0)
    }
    to {
        transform: translate(0,0)
    }
}`

export const maskDown = keyframes`{
    from {
        transform: translate(0,-100%)
    }
    to {
        transform: translate(0,0)
    }
}`

export const maskLeft = keyframes`{
    from {
        transform: translate(100%,0)
    }
    to {
        transform: translate(0,0)
    }
}`

export const slideInUp = keyframes`{
    0% {
        transform: translate3d(0, 100%, 0);
        visibility: visible
    }

    to {
        transform: translateZ(0)
    }
}`

export const slideInDown = keyframes`{
    0% {
        transform: translate3d(0, -100%, 0);
        visibility: visible
    }

    to {
        transform: translateZ(0)
    }
}`

export const slideInLeft = keyframes`{
    0% {
        transform: translate3d(-100%, 0, 0);
        visibility: visible
    }
  
    to {
        transform: translateZ(0)
    }
}`

export const slideInRight = keyframes`{
    0% {
        transform: translate3d(100%, 0, 0);
        visibility: visible
    }
  
    to {
        transform: translateZ(0)
    }
}`

export const flipInX = keyframes`{
    0% {
        animation-timing-function: ease-in;
        opacity: 0;
        transform: perspective(400px) rotateX(90deg)
    }
  
    to {
        transform: perspective(400px)
    }
}`

export const flipInY = keyframes`{
  0% {
      animation-timing-function: ease-in;
      opacity: 0;
      transform: perspective(400px) rotateY(90deg);
  }

  to {
      transform: perspective(400px);
  }
}`

export const flipOutY = keyframes`{
    0% {
        animation-timing-function: ease-out;
        transform: perspective(400px)
    }

    to {
        opacity: 0;
        transform: perspective(400px) rotateY(90deg)
    }
}`

export const brightIn = keyframes` {
    0% {
        animation-timing-function: ease-in;
        filter: brightness(0%)
    }
  
    to {
        filter: brightness(100%)
    }
}`

export const zoomInShorter = keyframes`{
    0%{
        -webkit-transform:scale3d(.8,.8,.8);
        opacity:0;
        transform:scale3d(.8,.8,.8)
    }
    50%{
        opacity:1
    }
}`

export const bounceInUp = keyframes`{
    from, 60%, 75%, 90%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    from {
        opacity: 0;
        transform: translate3d(0, 3000px, 0);
    }

    60% {
        opacity: 1;
        transform: translate3d(0, -20px, 0);
    }

    75% {
        transform: translate3d(0, 10px, 0);
    }

    90% {
        transform: translate3d(0, -5px, 0);
    }

    to {
        transform: translate3d(0, 0, 0);
    }
}`

export const slideZoomIn = keyframes`{
    0%{
        transform:scale3d(1,1,1);
        opacity: 1;
    }
    100% {
        transform:scale3d(1.1,1.1,1);
        opacity: 1;
    }
}`

export const shopData = {
    "sizes": [
        {
            size: 'Extra Small',
            slug: 'XS'
        },
        {
            size: 'Small',
            slug: 'S'
        },
        {
            size: 'Medium',
            slug: 'M'
        },
        {
            size: 'Large',
            slug: 'L'
        },
        {
            size: 'Extra Large',
            slug: 'XL'
        }
    ],

    "colors": [
        {
            color: '#cc9966',
            color_name: 'Brown'
        },
        {
            color: '#3399cc',
            color_name: 'Blue'
        },
        {
            color: '#9966cc',
            color_name: 'Purple'
        },
        {
            color: '#333333',
            color_name: 'Black'
        },
        {
            color: '#669933',
            color_name: 'Green'
        },
        {
            color: '#cc3333',
            color_name: 'Red'
        },
        {
            color: '#999999',
            color_name: 'Grey'
        }
    ],

    "brands": [
        {
            brand: "Next",
            slug: "next"
        },
        {
            brand: "River Island",
            slug: "river-island"
        },
        {
            brand: "Geox",
            slug: "geox"
        },
        {
            brand: "New Balance",
            slug: "nex-balance"
        },
        {
            brand: "UGG",
            slug: "ugg"
        },
        {
            brand: "F&F",
            slug: "f-and-f"
        },
        {
            brand: "Nike",
            slug: "nike"
        }
    ],

    "categories": [
        {
            name: "Furniture",
            slug: "furniture",
            count: 8
        },
        {
            name: "Coffee & Tables",
            slug: "coffee-and-tables",
            count: 1
        },
        {
            name: "Lighting",
            slug: "lighting",
            count: 3
        },
        {
            name: "Decoration",
            slug: "decoration",
            count: 5
        },
        {
            name: "Electronics",
            slug: "electronics",
            count: 1
        },
        {
            name: "Beds",
            slug: "beds",
            count: 2
        },
        {
            name: "Armchairs & Chaises",
            slug: "armchairs-and-chaises",
            count: 3
        },
        {
            name: "Sofas & Sleeper Sofas",
            slug: "sofas-and-sleeper-sofas",
            count: 1
        }
    ],

    "prices": [
        {
            min: '0',
            max: '25',
            name: 'Under $25'
        },
        {
            min: '25',
            max: '50',
            name: '$25 to $50'
        },
        {
            min: '50',
            max: '100',
            name: '$50 to $100'
        },
        {
            min: '100',
            max: '200',
            name: '$100 to $200'
        },
        {
            min: '200',
            max: '9999',
            name: '$200 & Above'
        },
    ]
}

export const homeData = {
    brands: [
        {
            "name": "brand",
            "image": "images/brands/1.png",
            "width": 100,
            "height": 23
        },
        {
            "name": "brand",
            "image": "images/brands/2.png",
            "width": 101,
            "height": 34
        },
        {
            "name": "brand",
            "image": "images/brands/3.png",
            "width": 100,
            "height": 30
        },
        {
            "name": "brand",
            "image": "images/brands/4.png",
            "width": 101,
            "height": 39
        },
        {
            "name": "brand",
            "image": "images/brands/5.png",
            "width": 100,
            "height": 48
        },
        {
            "name": "brand",
            "image": "images/brands/6.png",
            "width": 100,
            "height": 23
        },
        {
            "name": "brand",
            "image": "images/brands/7.png",
            "width": 63,
            "height": 32
        },
        {
            "name": "brand",
            "image": "images/brands/8.png",
            "width": 80,
            "height": 72
        },
        {
            "name": "brand",
            "image": "images/brands/9.png",
            "width": 100,
            "height": 25
        }
    ]
}

export const mainSlider1 = {
    nav: false,
    dots: true,
    items: 3,
    margin: 20,
    loop: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        992: {
            items: 3,
            dots: true
        }
    }
}

export const mainSlider2 = {
    nav: false,
    dots: false,
    margin: 20,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        992: {
            items: 3
        },
        1200: {
            items: 4
        }
    }
}

export const mainSlider3 = {
    nav: false,
    dots: false,
    margin: 20,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        480: {
            items: 2
        },
        992: {
            items: 3
        },
        1200: {
            nav: true,
            items: 4
        }
    }
}

export const mainSlider4 = {
    nav: false,
    dots: false,
    margin: 20,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        480: {
            items: 2
        },
        768: {
            items: 3
        },
        992: {
            items: 4
        },
        1200: {
            items: 5
        }
    }
}

export const mainSlider5 = {
    nav: false,
    dots: true,
    margin: 20,
    loop: true,
    responsive: {
        1200: {
            nav: true
        }
    }
}

export const mainSlider6 = {
    nav: false,
    dots: true,
    margin: 20,
    loop: true,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1200: {
            items: 2,
            nav: true
        }
    }
}

export const mainSlider7 = {
    nav: false,
    dots: true,
    items: 3,
    margin: 20,
    loop: true,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        992: {
            items: 3
        },
        1200: {
            items: 3,
            nav: true
        }
    }
}

export const mainSlider8 = {
    nav: false,
    dots: false,
    margin: 20,
    loop: false,
    items: 2,
    responsive: {
        768: {
            items: 3
        },
        992: {
            items: 4
        },
        1200: {
            items: 4,
            dots: false
        },
        1400: {
            nav: true,
            items: 4
        }
    }
}

export const mainSlider9 = {
    nav: true,
    dots: false,
    items: 3,
    margin: 20,
    loop: false,
    responsive: {
        0: {
            items: 1
        },
        576: {
            items: 2
        },
        992: {
            items: 3
        }
    }
}

export const mainSlider10 = {
    loop: false,
    dots: false,
    responsive: {
        772: {
            nav: true
        }
    }
}

export const mainSlider11 = {
    nav: false,
    dots: true,
    margin: 30,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        420: {
            items: 3
        },
        600: {
            items: 4
        },
        900: {
            items: 5
        },
        1024: {
            items: 6,
            nav: true,
            dots: false
        }
    }
}


export const mainSlider12 = {
    nav: true,
    dots: false,
    margin: 20,
    loop: false,
    autoplay: false,
    responsive: {
        0: {
            items: 2
        },
        480: {
            items: 2
        },
        768: {
            items: 3
        },
        992: {
            items: 3
        },
        1200: {
            items: 4
        }
    }
}

export const featureSlider1 = {
    nav: false,
    dots: false,
    margin: 30,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        420: {
            items: 3
        },
        600: {
            items: 4
        },
        900: {
            items: 5
        },
        1024: {
            items: 6
        }
    }
}

export const featureSlider2 = {
    nav: false,
    dots: false,
    margin: 0,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        420: {
            items: 3
        },
        600: {
            items: 4
        },
        900: {
            items: 5
        },
        1024: {
            items: 6
        },
        1360: {
            items: 7
        }
    }
}

export const featureSlider3 = {
    nav: false,
    dots: false,
    margin: 0,
    items: 6,
    loop: false,
    responsive: {
        0: {
            items: 1
        },
        360: {
            items: 2
        },
        600: {
            items: 3
        },
        992: {
            items: 4
        },
        1200: {
            items: 5
        },
        1500: {
            items: 6
        }
    }
}

export const featureSlider4 = {
    nav: false,
    dots: false,
    margin: 20,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        480: {
            items: 2
        },
        768: {
            items: 3
        },
        992: {
            items: 4
        },
        1200: {
            items: 5
        }
    }
}

export const introSlider = {
    nav: false,
    autoplay:true,
    responsive: {
        992: {
            nav: false
        }
    }

}

export const brandSlider = {
    nav: false,
    dots: true,
    margin: 30,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        420: {
            items: 3
        },
        600: {
            items: 4
        },
        900: {
            items: 5
        },
        1024: {
            items: 6
        },
        1400: {
            items: 6,
            nav: true,
            dots: false
        }
    }

}

export const productSlider = {
    nav: false,
    dots: true,
    margin: 20,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        480: {
            items: 2
        },
        768: {
            items: 3
        },
        992: {
            items: 4
        },
        1280: {
            items: 5
        },
        1400: {
            items: 5,
            nav: true
        }
    }
}

export const blogSlider = {
    nav: false,
    dots: true,
    items: 3,
    margin: 20,
    loop: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        992: {
            items: 3
        },
        1280: {
            items: 4,
            nav: true,
            dots: false
        }
    }

}