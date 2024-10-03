const firebaseConfig = {
    apiKey: "AIzaSyC68SVEiSWue9O2HwXEDCyGHBt-5NDRObM",
    authDomain: "dadosformulario-d1265.firebaseapp.com",
    databaseURL: "https://dadosformulario-d1265-default-rtdb.firebaseio.com",
    projectId: "dadosformulario-d1265",
    storageBucket: "dadosformulario-d1265.appspot.com",
    messagingSenderId: "185491493020",
    appId: "1:185491493020:web:6bf8a0443c1488de355d59"
  };

  initializeApp(firebaseConfig);

 var contactFormD8 = firebase.database().ref('contactForm');

 document.getElementById("contactForm").addEventListener("enviar", submitForm);

 function submitForm(e){
    e.preventDefault();

    var name = getElementVal('name');

 }

 const getElementVal = (id) => {
    return document.getElementById(id).value;
 };