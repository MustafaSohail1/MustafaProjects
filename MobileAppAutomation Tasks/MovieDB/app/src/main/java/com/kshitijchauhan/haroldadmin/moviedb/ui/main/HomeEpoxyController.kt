package com.kshitijchauhan.haroldadmin.moviedb.ui.main

import android.os.Handler
import com.airbnb.epoxy.TypedEpoxyController
import com.bumptech.glide.RequestManager
import com.kshitijchauhan.haroldadmin.moviedb.core.Resource
import com.kshitijchauhan.haroldadmin.moviedb.core.extensions.safe
import com.kshitijchauhan.haroldadmin.moviedb.repository.movies.Movie
import com.kshitijchauhan.haroldadmin.moviedb.ui.UIState
import com.kshitijchauhan.haroldadmin.moviedb.ui.common.*

class HomeEpoxyController(
    private val callbacks: EpoxyCallbacks,
    private val glide: RequestManager,
    epoxyHandler: Handler
): TypedEpoxyController<UIState.HomeScreenState>(epoxyHandler, epoxyHandler) {

    override fun buildModels(state: UIState.HomeScreenState) {
        with(state) {
            searchResultsResource?.let {
                buildSearchModel(it)
            } ?: run {
                buildHomeModel(popularMoviesResource, topRatedMoviesResource)
            }
        }
    }

    private fun buildSearchModel(searchResults: Resource<List<Movie>>?) {
        header {
            id("search-results")
            title("Search Results")
            spanSizeOverride { totalSpanCount, _, _ -> totalSpanCount }
        }

        searchResults?.let {
            when (searchResults) {
                is Resource.Success -> {
                    when {
                        searchResults.data.isEmpty() -> {
                            infoText {
                                id("no-results-found")
                                text("No movies found for this query")
                                spanSizeOverride { totalSpanCount, _, _ -> totalSpanCount }
                            }
                        }
                        else -> searchResults.data.forEach { searchResult ->
                            movieSearchResult {
                                with(searchResult) {
                                    id(id)
                                    movieId(id)
                                    movieTitle(title)
                                    glide(glide)
                                    posterUrl(posterPath)
                                    transitionName("poster-$id")
                                    clickListener { model, _, clickedView, _ ->
                                        callbacks.onMovieItemClicked(model.movieId!!, model.transitionName, clickedView)
                                    }
                                }
                            }
                        }
                    }
                }
                is Resource.Error -> {
                    infoText {
                        id("error-search-results")
                        text("Error getting search results")
                        spanSizeOverride { totalSpanCount, _, _ -> totalSpanCount }
                    }
                }
                is Resource.Loading -> {
                    loading {
                        id("load-search-results")
                        description("Loading Search results")
                        spanSizeOverride { totalSpanCount, _, _ -> totalSpanCount }
                    }
                }
            }.safe
        }
    }

    private fun buildHomeModel(popularMovies: Resource<List<Movie>>?, topRatedMovies: Resource<List<Movie>>?) {
        header {
            id("popular")
            title("Popular")
            spanSizeOverride { totalSpanCount, _, _ -> totalSpanCount }
        }

        when (popularMovies) {
            is Resource.Success -> {
                popularMovies.data.forEach { popularMovie ->
                    movie {
                        id(popularMovie.id)
                        movieId(popularMovie.id)
                        glide(glide)
                        posterUrl(popularMovie.posterPath)
                        transitionName("poster-${popularMovie.id}")
                        clickListener { model, _, clickedView, _ ->
                            callbacks.onMovieItemClicked(model.movieId!!, model.transitionName(), clickedView)
                        }
                    }
                }
            }
            is Resource.Error -> {
                infoText {
                    id("error-popular-movies")
                    text("Error getting Popular movies")
                    spanSizeOverride { totalSpanCount, _, _ -> totalSpanCount }
                }
            }
            is Resource.Loading -> {
                loading {
                    id("load-popular-movies")
                    description("Loading Popular movies")
                    spanSizeOverride { totalSpanCount, _, _ -> totalSpanCount }
                }
            }
            null -> Unit
        }.safe

        header {
            id("top-rated")
            title("Top Rated")
            spanSizeOverride { totalSpanCount, _, _ -> totalSpanCount }
        }

        when (topRatedMovies) {
            is Resource.Success -> {
                topRatedMovies.data.forEach { topRatedMovie ->
                    movie {
                        id(topRatedMovie.id)
                        movieId(topRatedMovie.id)
                        glide(glide)
                        posterUrl(topRatedMovie.posterPath)
                        transitionName("poster-${topRatedMovie.id}")
                        clickListener { model, _, clickedView, _ ->
                            callbacks.onMovieItemClicked(model.movieId!!, model.transitionName(), clickedView)
                        }
                    }
                }
            }
            is Resource.Error -> {
                infoText {
                    id("error-top-rated-movies")
                    text("Error getting Top Rated movies")
                    spanSizeOverride { totalSpanCount, _, _ -> totalSpanCount }
                }
            }
            is Resource.Loading -> {
                loading {
                    id("load-top-rated-movies")
                    description("Loading Top Rated movies")
                    spanSizeOverride { totalSpanCount, _, _ -> totalSpanCount }
                }
            }
            null -> Unit
        }.safe
    }
}