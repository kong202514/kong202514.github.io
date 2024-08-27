

 

let y = ['https://www.youtube.com/embed/QqeJ665Ku98?si=1NroqqCdfeiVTwpn'
    ,'https://www.youtube.com/embed/AvwZvT7d1J0?si=-EV5EPUip4Mu847-'
    ,'https://www.youtube.com/embed/WFeir7uqxEY?si=tnC5ovH_Bchd3F32'
]

// เลือกทุก iframe
const iframes = document.querySelectorAll('iframe');


function lodesong() {
    iframes[0].src = y[0]
    iframes[1].src = y[1]
    iframes[2].src = y[2]
}
