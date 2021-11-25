let numberOfFilms = prompt("Сколько фильмов вы уже посмотрели?");

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

let question1 = prompt("Один из последних просмотренных фильмов?");
let question2 = prompt("Насколько оцените его?");

personalMovieDB.movies[question1] = question2;