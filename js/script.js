let numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?");

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

let question1,
    question2;

// for (let i = 0; i < 2; i++) {
//     let question1 = prompt("Один из последних просмотренных фильмов?");
//     let question2 = prompt("Насколько оцените его?");

//     if (question1 != '' && question2 != '' && question1 != null && question2 != null && question1.length < 50 && question2.length < 50) {
//         personalMovieDB.movies[question1] = question2;
//         console.log('done');
//     } else {
//         i--;
//         console.log('error');
//     }
// }

do {
    question1 = prompt("Один из последних просмотренных фильмов?");
    question2 = prompt("Насколько оцените его?");
    personalMovieDB.movies[question1] = question2;
} while (question1 === ' ' || question2 === ' ' || question1 === null && question2 === null || question1.length > 50 && question2.length > 50);


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

if (personalMovieDB.count < 10) {
    alert("Просмотрено довольно мало фильмов");
} else if ( personalMovieDB.count > 10 && personalMovieDB.count < 30) {
    alert("Вы классический зритель");
} else if (personalMovieDB.count > 30) {
    alert ("Вы киноман!");
} else {
    alert("Произошла ошибка");
}

console.log(personalMovieDB);