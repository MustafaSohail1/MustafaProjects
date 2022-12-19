package com.kshitijchauhan.haroldadmin.moviedb.ui.movie_details

import android.graphics.drawable.Drawable
import android.os.Bundle
import android.transition.TransitionInflater
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.view.ViewCompat
import androidx.lifecycle.Observer
import androidx.navigation.fragment.FragmentNavigatorExtras
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import androidx.recyclerview.widget.GridLayoutManager
import com.bumptech.glide.RequestManager
import com.bumptech.glide.load.DataSource
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.bumptech.glide.load.engine.GlideException
import com.bumptech.glide.load.resource.bitmap.BitmapTransitionOptions
import com.bumptech.glide.request.RequestListener
import com.bumptech.glide.request.RequestOptions
import com.bumptech.glide.request.target.Target
import com.google.android.material.snackbar.Snackbar
import com.kshitijchauhan.haroldadmin.moviedb.R
import com.kshitijchauhan.haroldadmin.moviedb.core.Resource
import com.kshitijchauhan.haroldadmin.moviedb.core.extensions.format
import com.kshitijchauhan.haroldadmin.moviedb.core.extensions.getNumberOfColumns
import com.kshitijchauhan.haroldadmin.moviedb.core.extensions.safe
import com.kshitijchauhan.haroldadmin.moviedb.ui.BaseFragment
import com.kshitijchauhan.haroldadmin.moviedb.ui.UIState
import com.kshitijchauhan.haroldadmin.moviedb.ui.main.MainViewModel
import com.kshitijchauhan.haroldadmin.mvrxlite.base.MVRxLiteView
import kotlinx.android.synthetic.main.fragment_movie_details.*
import kotlinx.android.synthetic.main.fragment_movie_details.view.*
import org.koin.android.ext.android.inject
import org.koin.android.viewmodel.ext.android.sharedViewModel
import org.koin.android.viewmodel.ext.android.viewModel
import org.koin.core.parameter.parametersOf
import org.koin.core.qualifier.named


class MovieDetailsFragment : BaseFragment(), MVRxLiteView<UIState.DetailsScreenState> {

    private val mainViewModel: MainViewModel by sharedViewModel()
    private val safeArgs: MovieDetailsFragmentArgs by navArgs()

    private val callbacks = object : DetailsEpoxyController.MovieDetailsCallbacks {
        override fun toggleMovieFavouriteStatus() {
            if (mainViewModel.isAuthenticated) {
                movieDetailsViewModel.toggleMovieFavouriteStatus(mainViewModel.accountId)
            } else {
                mainViewModel.showSnackbar(R.string.message_need_to_login, R.string.action_login, View.OnClickListener {
                    findNavController().navigate(R.id.loggedOutFragmentDestination)
                })
            }
        }

        override fun toggleMovieWatchlistStatus() {
            if (mainViewModel.isAuthenticated) {
                movieDetailsViewModel.toggleMovieWatchlistStatus(mainViewModel.accountId)
            } else {
                mainViewModel.showSnackbar(R.string.message_need_to_login, R.string.action_login, View.OnClickListener {
                    findNavController().navigate(R.id.loggedOutFragmentDestination)
                })
            }
        }

        override fun onActorItemClicked(id: Int, transitionName: String, sharedView: View?) {
            val action = MovieDetailsFragmentDirections.viewActorDetails(
                actorIdArg = id,
                transitionNameArg = transitionName
            )
            sharedView?.let {
                val extras = FragmentNavigatorExtras(it to transitionName)
                findNavController().navigate(action, extras)
            } ?: findNavController().navigate(action)
        }

        override fun onMovieItemClicked(id: Int, transitionName: String, sharedView: View?) {
            val action = MovieDetailsFragmentDirections.viewMovieDetails(
                movieIdArg = id,
                transitionNameArg = transitionName,
                isAuthenticatedArg = mainViewModel.isAuthenticated
            )
            sharedView?.let {
                val extras = FragmentNavigatorExtras(it to transitionName)
                findNavController().navigate(action, extras)
            } ?: findNavController().navigate(action)
        }
    }

    private val glideRequestManager: RequestManager by inject(named("fragment-glide-request-manager")) {
        parametersOf(this)
    }

    private val detailsEpoxyController: DetailsEpoxyController by inject {
        parametersOf(callbacks, glideRequestManager)
    }

    override val initialState: UIState by lazy {
        UIState.DetailsScreenState(
            movieId = safeArgs.movieIdArg,
            accountStatesResource = Resource.Loading(),
            movieResource = Resource.Loading(),
            trailerResource = Resource.Loading(),
            castResource = listOf(Resource.Loading()),
            similarMoviesResource = Resource.Loading()
        )
    }

    private val movieDetailsViewModel: MovieDetailsViewModel by viewModel {
        parametersOf(safeArgs.isAuthenticatedArg, safeArgs.movieIdArg, initialState)
    }

    override fun updateToolbarTitle() {
        // TODO make this a part of render state
        // The title will be updated when the movie details are retrieved
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        val transition = TransitionInflater.from(context).inflateTransition(android.R.transition.move)
        val animatorDuration = requireContext().resources.getInteger(R.integer.sharedElementTransitionDuration).toLong()

        sharedElementEnterTransition = transition.apply {
            duration = animatorDuration
        }

        sharedElementReturnTransition = transition.apply {
            duration = animatorDuration
        }

        postponeEnterTransition()
        return inflater
            .inflate(R.layout.fragment_movie_details, container, false)
            .apply {
                ViewCompat.setTransitionName(this.ivPoster, safeArgs.transitionNameArg)
            }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        updateToolbarTitle()
        rvMovieDetails.apply {
            val columns = resources.getDimension(R.dimen.cast_member_picture_size).getNumberOfColumns(view.context)
            layoutManager = GridLayoutManager(context, columns)
            setController(detailsEpoxyController)
        }
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        with(movieDetailsViewModel) {
            getAllMovieInfo()
            message.observe(viewLifecycleOwner, Observer { message ->
                view?.let { Snackbar.make(it, message, Snackbar.LENGTH_SHORT).show() }
            })
            state.observe(viewLifecycleOwner, Observer { state ->
                renderState(state)
            })
        }
    }

    override fun renderState(state: UIState.DetailsScreenState) {

        detailsEpoxyController.setData(state)

        when (val movieResource = state.movieResource) {
            is Resource.Success -> {
                val movie = movieResource.data
                mainViewModel.updateToolbarTitle(movie.title)
                glideRequestManager
                    .load(movie.posterPath)
                    .apply {
                        RequestOptions()
                            .placeholder(R.drawable.ic_round_local_movies_24px)
                            .error(R.drawable.ic_round_local_movies_24px)
                            .fallback(R.drawable.ic_round_local_movies_24px)
                            .diskCacheStrategy(DiskCacheStrategy.ALL)
                    }
                    .listener(object : RequestListener<Drawable> {
                        override fun onLoadFailed(
                            e: GlideException?,
                            model: Any?,
                            target: Target<Drawable>?,
                            isFirstResource: Boolean
                        ): Boolean {
                            startPostponedEnterTransition()
                            return false
                        }

                        override fun onResourceReady(
                            resource: Drawable?,
                            model: Any?,
                            target: Target<Drawable>?,
                            dataSource: DataSource?,
                            isFirstResource: Boolean
                        ): Boolean {
                            startPostponedEnterTransition()
                            return false
                        }
                    })
                    .into(ivPoster)

                glideRequestManager
                    .asBitmap()
                    .transition(BitmapTransitionOptions.withCrossFade())
                    .load(movie.backdropPath)
                    .apply {
                        RequestOptions()
                            .diskCacheStrategy(DiskCacheStrategy.ALL)
                    }
                    .into(ivBackdrop)

                tvTitle.text = movie.title
                chipMovieYear.text = movie.releaseDate.format("yyyy")
                chipMovieGenre.text = movie.genres?.first() ?: "..."
                chipMovieRating.text = movie.voteAverage.format("%.2f")
            }
            else -> Unit
        }.safe
    }
}
