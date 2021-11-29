"use strict";

let numberOfFilms,
    question1,
    question2;

function start() {
    numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?");

    while (numberOfFilms == '' && numberOfFilms == null && numberOfFilms.length > 50 && isNaN(numberOfFilms)) {
        numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?");
    }
}

start();

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

// for (let i = 0; i < 2; i++) {
//      question1 = prompt("Один из последних просмотренных фильмов?");
//      question2 = prompt("Насколько оцените его?");

//     if (question1 != '' && question2 != '' && question1 != null && question2 != null && question1.length < 50 && question2.length < 50) {
//         personalMovieDB.movies[question1] = question2;
//         console.log('done');
//     } else {
//         i--;
//         console.log('error');
//     }
// }

function rememberMyFilms() {
do {
    question1 = prompt("Один из последних просмотренных фильмов?");
    question2 = prompt("Насколько оцените его?");
    personalMovieDB.movies[question1] = question2;
} while (question1 == '' && question2 == '' && question1 == null && question2 == null && question1.length > 50 && question2.length > 50);
}

rememberMyFilms();

// for (let i = 0; i < 4; i++) {
//     switch(i) {
//         case 0: 
//             numberOfFilms = prompt("Сколько фильмов вы уже посмотрели?");
//             break;
//         case 1:
//             question1 = prompt("Один из последних просмотренных фильмов?");
//             break;
//         case 2:
//             question2 = prompt("Насколько оцените его?");
//             break;
//     }
// }

function detectedPersonalLevel() {
    if (personalMovieDB.count < 10) {
        alert("Просмотрено довольно мало фильмов");
    } else if ( personalMovieDB.count > 10 && personalMovieDB.count < 30) {
        alert("Вы классический зритель");
    } else if (personalMovieDB.count > 30) {
        alert ("Вы киноман!");
    } else {
        alert("Произошла ошибка");
    }
}

detectedPersonalLevel();

function writeYourGenres() {
    for(let i = 1; i <= 3; i++) {
        personalMovieDB.genres[i-1] = prompt(`Ваш любимый жанр под номером ${i}?`);
    }
}

writeYourGenres();

function showMyBD() {
if (personalMovieDB.privat == false) {
    console.log(personalMovieDB);
}
}

showMyBD();