package com.kshitijchauhan.haroldadmin.moviedb.core

object Constants {

    const val KEY_SESSION_ID = "session-id"

    val Genres = mapOf(
        19 to "Action",
        12 to "Adventure",
        16 to "Animation",
        35 to "Comedy",
        80 to "Crime",
        99 to "Documentary",
        18 to "Drama",
        10751 to "Family",
        14 to "Fantasy",
        36 to "History",
        27 to "Horror",
        10402 to "Music",
        9648 to "Mystery",
        10749 to "Romance",
        878 to "Science Fiction",
        10770 to "TV GeneralMovieResponse",
        53 to "Thriller",
        10752 to "War",
        37 to "Western"
    )

    val availableBackdropSizes = mapOf<Int, String>(
        300 to "w300",
        780 to "w780",
        1280 to "w1280",
        0 to "original"
    )

    val availablePosterSizes = listOf(
        92 to "w92",
        154 to "w154",
        185 to "w185",
        342 to "w342",
        500 to "w500",
        780 to "w780",
        0 to "original"
    )

    const val KEY_MOVIE_ID = "movie-id"

    const val KEY_TRANSITION_NAME = "transition-name"

    const val KEY_IS_AUTHENTICATED: String = "isAuthenticated"

    const val KEY_ACCOUNT_ID: String = "accountId"

    const val KEY_ACTOR_ID: String = "actorId"

    const val KEY_COUNTRY_CODE: String = "country"

    const val KEY_COUNTRY_NAME: String = "countryName"

    const val KEY_CRASHLYTICS: String = "crashlytics"

    const val KEY_ANALYTICS: String = "analytics"

    const val PRIVACY_POLICY_URL = "https://github.com/haroldadmin/MovieDB/blob/master/docs/privacy-policy.md"

    const val TERMS_AND_CONDITIONS_URL = "https://github.com/haroldadmin/MovieDB/blob/master/docs/terms-and-conditions.md"
}