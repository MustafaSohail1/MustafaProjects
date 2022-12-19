package com.kshitijchauhan.haroldadmin.moviedb.repository.collections

import com.haroldadmin.cnradapter.NetworkResponse
import com.kshitijchauhan.haroldadmin.moviedb.core.Resource
import com.kshitijchauhan.haroldadmin.moviedb.repository.data.remote.service.account.AccountService
import com.kshitijchauhan.haroldadmin.moviedb.repository.data.remote.service.discover.DiscoveryService
import com.kshitijchauhan.haroldadmin.moviedb.repository.toMovie
import io.reactivex.Single
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.rx2.asSingle

internal class RemoteCollectionsSource(
    private val discoveryService: DiscoveryService,
    private val accountService: AccountService
) {

    fun getCollection(accountId: Int, type: CollectionType, region: String): Single<Resource<Collection>> {
        return when (type) {
            CollectionType.Favourite -> getFavouritesCollection(accountId)
            CollectionType.Watchlist -> getWatchlistedCollection(accountId)
            CollectionType.Popular -> getPopularCollection()
            CollectionType.TopRated -> getTopRatedCollection()
            CollectionType.InTheatres -> getInTheatresCollection(region)
        }
    }

    private fun getFavouritesCollection(accountId: Int): Single<Resource<Collection>> {
        return accountService.getFavouriteMovies(accountId).asSingle(Dispatchers.Default)
            .flatMap { response ->
                Single.just(when (response) {
                    is NetworkResponse.Success -> {
                        Resource.Success(
                            Collection(
                                CollectionType.Favourite.name,
                                response.body.results.map { it.id }
                            ).apply {
                                this.movies = response.body.results.map { it.toMovie() }
                            }
                        )
                    }
                    is NetworkResponse.ServerError -> {
                        Resource.Error<Collection>(response.body?.statusMessage ?: "Server Error")
                    }
                    is NetworkResponse.NetworkError -> {
                        Resource.Error(response.error.localizedMessage ?: "Network Error")
                    }
                })
            }
    }

    private fun getWatchlistedCollection(accountId: Int): Single<Resource<Collection>> {
        return accountService.getMoviesWatchList(accountId).asSingle(Dispatchers.Default)
            .flatMap { response ->
                Single.just(
                    when (response) {
                        is NetworkResponse.Success -> {
                            Resource.Success(
                                Collection(
                                    CollectionType.Watchlist.name,
                                    response.body.results.map { it.id }
                                ).apply {
                                    this.movies = response.body.results.map { it.toMovie() }
                                }
                            )
                        }
                        is NetworkResponse.ServerError -> {
                            Resource.Error<Collection>(response.body?.statusMessage ?: "Server Error")
                        }
                        is NetworkResponse.NetworkError -> {
                            Resource.Error(response.error.localizedMessage ?: "Network Error")
                        }
                    }
                )
            }
    }

    private fun getPopularCollection(): Single<Resource<Collection>> {
        return discoveryService.getPopularMovies().asSingle(Dispatchers.Default)
            .flatMap { response ->
                Single.just(when (response) {
                    is NetworkResponse.Success -> {
                        Resource.Success(
                            Collection(
                                CollectionType.Popular.name,
                                response.body.results.map { it.id }
                            ).apply {
                                this.movies = response.body.results.map { it.toMovie() }
                            }
                        )
                    }
                    is NetworkResponse.ServerError -> {
                        Resource.Error<Collection>(response.body?.statusMessage ?: "Server Error")
                    }
                    is NetworkResponse.NetworkError -> {
                        Resource.Error(response.error.localizedMessage ?: "Network Error")
                    }
                }
                )
            }
    }

    private fun getTopRatedCollection(): Single<Resource<Collection>> {
        return discoveryService.getTopRatedMovies().asSingle(Dispatchers.Default)
            .flatMap { response ->
                Single.just(when (response) {
                    is NetworkResponse.Success -> {
                        Resource.Success(
                            Collection(
                                CollectionType.TopRated.name,
                                response.body.results.map { it.id } )
                                .apply {
                                    movies = response.body.results.map { it.toMovie()}
                                }
                        )
                    }
                    is NetworkResponse.ServerError -> {
                        Resource.Error<Collection>(response.body?.statusMessage ?: "Server Error")
                    }
                    is NetworkResponse.NetworkError -> {
                        Resource.Error(response.error.localizedMessage ?: "Server Error")
                    }
                }
                )
            }
    }

    private fun getInTheatresCollection(givenRegion: String): Single<Resource<Collection>> {
        return discoveryService.getMoviesInTheatre(region = givenRegion).asSingle(Dispatchers.Default)
            .flatMap { topRatedResponse ->
                Single.just(when (topRatedResponse) {
                    is NetworkResponse.Success -> {
                        Resource.Success(
                            Collection(
                                CollectionType.InTheatres.name,
                                topRatedResponse.body.results.map { it.id })
                                .apply {
                                    movies = topRatedResponse.body.results.map { it.toMovie() }
                                }
                        )
                    }
                    is NetworkResponse.ServerError -> {
                        Resource.Error<Collection>(topRatedResponse.body?.statusMessage ?: "Server Error")
                    }
                    is NetworkResponse.NetworkError -> {
                        Resource.Error(topRatedResponse.error.localizedMessage ?: "Network Error")
                    }
                }
                )
            }
    }
}