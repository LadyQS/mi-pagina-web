const firebaseConfig = {
  apiKey: "AIzaSyBSAloTab_yu2qbal8yVDtvQFVNlJYBvBk",
  authDomain: "registroweb-ecb29.firebaseapp.com",
  projectId: "registroweb-ecb29",
  storageBucket: "registroweb-ecb29.appspot.com",
  messagingSenderId: "402964589407",
  appId: "1:402964589407:web:fa3bd763c1ee10923964ea",
  measurementId: "G-5N5L26E77E"
  };

  // Initialize Firebase//
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  //llamamos al dom o al html//
  const btnRegistrar = document.getElementById("btnRegistrar");
  const btnIniciarSesion = document.getElementById("btnIniciarSesion");
  const Formulario = document.getElementById("Formulario");
  const contenidoDeLaWeb = document.getElementById("contenidoDeLaWeb");
  const btnCS = document.getElementById("btnCS");
  const btnGoogle = document.getElementById("btnGoogle");
  const btnFacebook = document.getElementById("btnFacebook");

  //a los botones se les pone const no cambia de valor//
  //funcion registrar//
  btnRegistrar.addEventListener("click", () => {
    //le damos funciones y remplamos con =>//
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    console.log("Hola");
    console.log(email);
    console.log(password);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        //iniciamos el sesion//
        // Signed in
        var user = userCredential.user;
        console.log("Inicio de sesion correcto");
        cargarJSON();
        Formulario.classList.replace("mostrar", "ocultar"); //se va ocultar//
        contenidoDeLaWeb.classList.replace("ocultar", "mostrar"); //se va mostrar//
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        console.log(errorMessage);
        // ..
      });
  });

  //funcion de iniciar sesion//
  btnIniciarSesion.addEventListener("click", () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Inicio de Sesion");
        cargarJSON();
        Formulario.classList.replace("mostrar", "ocultar");
        contenidoDeLaWeb.classList.replace("ocultar", "mostrar");
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error al inicio secion");
        alter(errorMessage);
      });
  });

  //Cerrar sesion//
  btnCS.addEventListener("click", () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("se cerro");
      })
      .catch((error) => {
        // An error happened.
        console.log("error");
      });
  });

  //funcion estado activo o inactivo//
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      cargarJSON();
      var uid = user.uid;
      Formulario.classList.replace("ocultar", "mostrar");
      contenidoDeLaWeb.classList.replace("mostrar", "ocultar");

      // ...
    } else {
      // User is signed out
      // ...
      Formulario.classList.replace("ocultar", "mostrar");
      contenidoDeLaWeb.classList.replace("mostrar", "ocultar");
    }
  });

  //funcion de google
  btnGoogle.addEventListener("click", () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log("Login con Google correcto");
        cargarJSON();
        var user = result.user;
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMensaje);
        var email = error.email;
        var credential = error.credential;
        console.log("error al ingresar");
        // ...
      });
  });

  //funcion jalar datos json
  function cargarJSON() {
    fetch("contenido.json")
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        let html = "";
        data.forEach((productos) => {
          html += `
       <div class="producto">
      
      <img src="${productos.img}" width="170px" class="imgProducto">
      <br>
      <p>  ${productos.marca} </p>
      <br>
      <strong> S/.${productos.precio} </strong>
      <br>
      <a href="${productos.webpage}"> ver detalles</a>
      </div>
  `;
        });
        document.getElementById("resultado").innerHTML = html;
      });
  }