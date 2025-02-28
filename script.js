document.addEventListener("DOMContentLoaded", function () {
    const chambres = [
        { id: 1, nom: "Chambre Deluxe", prix: "20 000 FCFA", image: "images/chambre1.png" },
        { id: 2, nom: "Chambre Standard", prix: "15 000 FCFA", image: "images/chambre2.png" },
        { id: 3, nom: "Suite VIP", prix: "30 000 FCFA", image: "images/chambre3.png" }
    ];

    const chambreList = document.getElementById("chambre-list");

    chambres.forEach(chambre => {
        const chambreHTML = `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="${chambre.image}" class="card-img-top" alt="${chambre.nom}">
                    <div class="card-body">
                        <h5 class="card-title">${chambre.nom}</h5>
                        <p class="card-text">Prix: ${chambre.prix}</p>
                        <button class="btn btn-primary" 
                                onclick="reserver(${chambre.id})" 
                                data-bs-toggle="modal" 
                                data-bs-target="#reservationModal">
                            Réserver
                        </button>
                    </div>
                </div>
            </div>
        `;
        chambreList.innerHTML += chambreHTML;
    });

    window.reserver = function (id) {
        const chambre = chambres.find(c => c.id === id);
        if (chambre) {
            document.getElementById("chambreNom").value = chambre.nom;
        }
    };

    const reservationForm = document.getElementById("reservationForm");
    if (reservationForm) {
        reservationForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const chambreNom = document.getElementById("chambreNom").value;
            const nomClient = document.getElementById("nomClient").value;
            const emailClient = document.getElementById("emailClient").value;
            const dateArrivee = document.getElementById("dateArrivee").value;
            const dateDepart = document.getElementById("dateDepart").value;

            if (!nomClient || !emailClient || !dateArrivee || !dateDepart) {
                alert("Veuillez remplir tous les champs.");
                return;
            }

            const newReservation = { chambreNom, nomClient, emailClient, dateArrivee, dateDepart };

            let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
            reservations.push(newReservation);
            localStorage.setItem("reservations", JSON.stringify(reservations));

            alert(`Merci ${nomClient}, votre réservation pour ${chambreNom} a été confirmée !`);
            reservationForm.reset();
            let modal = bootstrap.Modal.getInstance(document.getElementById('reservationModal'));
            modal.hide();

            if (window.location.pathname.includes("dashboard.html")) {
                loadReservations();
            }
        });
    }

    function loadReservations() {
        const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
        const reservationsList = document.getElementById("reservations-list");
        
        if (!reservationsList) return;
        reservationsList.innerHTML = "";

        reservations.forEach((reservation, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${reservation.chambreNom}</td>
                <td>${reservation.nomClient}</td>
                <td>${reservation.emailClient}</td>
                <td>${reservation.dateArrivee}</td>
                <td>${reservation.dateDepart}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteReservation(${index})">Supprimer</button>
                </td>
            `;
            reservationsList.appendChild(row);
        });
    }

    window.deleteReservation = function (index) {
        let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
        reservations.splice(index, 1);
        localStorage.setItem("reservations", JSON.stringify(reservations));
        loadReservations();
    };

    if (window.location.pathname.includes("dashboard.html")) {
        loadReservations();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const chambres = [
        { id: 1, nom: "Chambre Deluxe", prix: "20 000 FCFA", image: "images/chambre1.png" },
        { id: 2, nom: "Chambre Standard", prix: "15 000 FCFA", image: "images/chambre2.png" },
        { id: 3, nom: "Suite VIP", prix: "30 000 FCFA", image: "images/chambre3.png" }
    ];

    const chambreList = document.getElementById("chambre-list");

    chambres.forEach(chambre => {
        const chambreHTML = `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="${chambre.image}" class="card-img-top" alt="${chambre.nom}">
                    <div class="card-body">
                        <h5 class="card-title">${chambre.nom}</h5>
                        <p class="card-text">Prix: ${chambre.prix}</p>
                        <button class="btn btn-primary" 
                                onclick="reserver(${chambre.id})" 
                                data-bs-toggle="modal" 
                                data-bs-target="#reservationModal">
                            Réserver
                        </button>
                    </div>
                </div>
            </div>
        `;
        chambreList.innerHTML += chambreHTML;
    });

    // Fonction pour pré-remplir le formulaire avec le nom de la chambre sélectionnée
    window.reserver = function (id) {
        const chambre = chambres.find(c => c.id === id);
        if (chambre) {
            document.getElementById("chambreNom").value = chambre.nom;
        }
    };

    // Gestion de la soumission du formulaire
    document.getElementById("reservationForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Empêche l'envoi du formulaire

        // Récupération des valeurs du formulaire
        const chambreNom = document.getElementById("chambreNom").value;
        const nomClient = document.getElementById("nomClient").value;
        const emailClient = document.getElementById("emailClient").value;
        const dateArrivee = document.getElementById("dateArrivee").value;
        const dateDepart = document.getElementById("dateDepart").value;

        // Vérification si tous les champs sont remplis
        // if (nomClient && emailClient && dateArrivee && dateDepart) {
        //     alert(`Merci ${nomClient}, votre réservation pour ${chambreNom} a été confirmée !`);
        //     document.getElementById("reservationForm").reset(); // Réinitialise le formulaire
        //     bootstrap.Modal.getInstance(document.getElementById("reservationModal")).hide(); // Ferme la modale
        // } else {
        //     alert("Veuillez remplir tous les champs.");
        // }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Empêche le rechargement de la page

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === "admin" && password === "admin123") {
                alert("Connexion réussie !");
                window.location.href = "dashboard.html"; // Redirection
            } else {
                alert("Identifiants incorrects !");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === "admin" && password === "admin123") {
                sessionStorage.setItem("isAuthenticated", "true");
                alert("Connexion réussie !");
                window.location.href = "dashboard.html";
            } else {
                alert("Identifiants incorrects !");
            }
        });
    }

    // Vérifier l'authentification pour le dashboard
    if (window.location.pathname.includes("dashboard.html")) {
        if (sessionStorage.getItem("isAuthenticated") !== "true") {
            window.location.href = "login.html";
        }
    }

    // Déconnexion
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            sessionStorage.removeItem("isAuthenticated");
            window.location.href = "login.html";
        });
    }
});


// Charger les réservations depuis localStorage
function loadReservations() {
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    const reservationsList = document.getElementById("reservations-list");

    reservationsList.innerHTML = ""; // Nettoyer l'affichage

    reservations.forEach((reservation, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${reservation.nom}</td>
            <td>${reservation.email}</td>
            <td>${reservation.chambre}</td>
            <td>${reservation.date}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteReservation(${index})">Supprimer</button>
            </td>
        `;
        reservationsList.appendChild(row);
    });
}

// Supprimer une réservation
function deleteReservation(index) {
    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.splice(index, 1);
    localStorage.setItem("reservations", JSON.stringify(reservations));
    loadReservations();
}

// Charger les réservations au démarrage du dashboard
if (window.location.pathname.includes("dashboard.html")) {
    loadReservations();
}

// document.addEventListener("DOMContentLoaded", function () {
//     const reservationForm = document.getElementById("reservationForm");

//     if (reservationForm) {
//         reservationForm.addEventListener("submit", function (event) {
//             event.preventDefault();

//             const chambreNom = document.getElementById("chambreNom").value;
//             const nomClient = document.getElementById("nomClient").value;
//             const emailClient = document.getElementById("emailClient").value;
//             const dateArrivee = document.getElementById("dateArrivee").value;
//             const dateDepart = document.getElementById("dateDepart").value;

//             const newReservation = { chambreNom, nomClient, emailClient, dateArrivee, dateDepart };

//             let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
//             reservations.push(newReservation);
//             localStorage.setItem("reservations", JSON.stringify(reservations));

//             alert("Réservation confirmée !");
//             reservationForm.reset();
//             let modal = new bootstrap.Modal(document.getElementById('reservationModal'));
//             modal.hide();
//         });
//     }
// });

// Charger les réservations depuis localStorage
function loadReservations() {
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    const reservationsList = document.getElementById("reservations-list");

    reservationsList.innerHTML = ""; // Nettoyer l'affichage

    reservations.forEach((reservation, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${reservation.chambreNom}</td>
            <td>${reservation.nomClient}</td>
            <td>${reservation.emailClient}</td>
            <td>${reservation.dateArrivee}</td>
            <td>${reservation.dateDepart}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteReservation(${index})">Supprimer</button>
            </td>
        `;
        reservationsList.appendChild(row);
    });
}

// Supprimer une réservation
function deleteReservation(index) {
    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.splice(index, 1);
    localStorage.setItem("reservations", JSON.stringify(reservations));
    loadReservations();
}

// Charger les réservations uniquement sur `dashboard.html`
if (window.location.pathname.includes("dashboard.html")) {
    loadReservations();
}
