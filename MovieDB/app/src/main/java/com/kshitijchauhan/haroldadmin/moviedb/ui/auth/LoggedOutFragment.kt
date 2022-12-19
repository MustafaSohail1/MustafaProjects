package com.kshitijchauhan.haroldadmin.moviedb.ui.auth

import android.os.Bundle
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.interpolator.view.animation.FastOutSlowInInterpolator
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import androidx.transition.Fade
import androidx.transition.Slide
import androidx.transition.TransitionManager
import androidx.transition.TransitionSet
import com.google.android.material.snackbar.Snackbar
import com.kshitijchauhan.haroldadmin.moviedb.R
import com.kshitijchauhan.haroldadmin.moviedb.core.Resource
import com.kshitijchauhan.haroldadmin.moviedb.core.extensions.gone
import com.kshitijchauhan.haroldadmin.moviedb.core.extensions.safe
import com.kshitijchauhan.haroldadmin.moviedb.core.extensions.visible
import com.kshitijchauhan.haroldadmin.moviedb.repository.data.remote.service.auth.CreateSessionRequest
import com.kshitijchauhan.haroldadmin.moviedb.ui.BaseFragment
import com.kshitijchauhan.haroldadmin.moviedb.ui.UIState
import com.kshitijchauhan.haroldadmin.moviedb.ui.main.MainViewModel
import kotlinx.android.synthetic.main.fragment_logged_out.*
import org.koin.android.viewmodel.ext.android.sharedViewModel
import org.koin.android.viewmodel.ext.android.viewModel

class LoggedOutFragment : BaseFragment() {

    private val mainViewModel: MainViewModel by sharedViewModel()
    private val authenticationViewModel: AuthenticationViewModel by viewModel()

    override val initialState: UIState = UIState.AccountScreenState.UnauthenticatedScreenState

    override fun updateToolbarTitle() {
        mainViewModel.updateToolbarTitle(getString(R.string.title_account_screen))
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        if (mainViewModel.isAuthenticated) {
            // We know mainViewModel already exists, so we can access its properties
            val action = LoggedOutFragmentDirections.viewAccountDetails()
            findNavController().navigate(action)
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_logged_out, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        updateToolbarTitle()

        authWebView.apply {
            webViewClient = object : WebViewClient() {
                override fun onPageFinished(view: WebView?, url: String?) {
                    super.onPageFinished(view, url)
                    if (url?.contains("allow") == true) {
                        handleAuthorizationSuccessful(
                            authenticationViewModel.requestToken.value!!
                        )
                    }
                }
            }
            settings.javaScriptEnabled = true
        }

        btLogin.setOnClickListener {
            authenticationViewModel.getRequestToken()

            val transition = TransitionSet()
            transition.apply {
                ordering = TransitionSet.ORDERING_SEQUENTIAL
                addTransition(
                    Slide(Gravity.TOP)
                        .addTarget(ivKey)
                        .addTarget(tvNeedToLogin)
                        .addTarget(btLogin)
                        .setDuration(300)
                )
                addTransition(
                    Slide(Gravity.BOTTOM)
                        .addTarget(authWebView)
                        .setDuration(300)
                )
                interpolator = FastOutSlowInInterpolator()
            }

            TransitionManager.beginDelayedTransition(container, transition)
            infoGroup.gone()
            webGroup.visible()

            authenticationViewModel.requestToken.observe(viewLifecycleOwner, Observer { tokenResource ->
                when (tokenResource) {
                    is Resource.Success -> {
                        authorizeToken(tokenResource.data)
                    }
                    is Resource.Error -> {
                        mainViewModel.showSnackbar(R.string.error_login)
                    }
                    is Resource.Loading -> {
                        // TODO handle this
                    }
                }.safe
            })
        }
    }

    private fun authorizeToken(token: String) {
        authWebView.loadUrl("https://www.themoviedb.org/authenticate/$token")
    }

    private fun handleAuthorizationSuccessful(token: Resource<String>) {
        when (token) {
            is Resource.Success -> {
                authenticationViewModel.createSession(CreateSessionRequest(token.data))

                val transition = TransitionSet()
                transition.apply {
                    ordering = TransitionSet.ORDERING_SEQUENTIAL
                    addTransition(
                        Fade()
                            .addTarget(authWebView)
                            .setDuration(200)
                    )
                    addTransition(
                        Fade()
                            .addTarget(pbLoading)
                            .addTarget(tvPleaseWait)
                            .setDuration(200)
                    )
                }

                TransitionManager.beginDelayedTransition(container, transition)
                webGroup.gone()
                loadingGroup.visible()
            }
            else -> {
                // TODO Handle this
            }
        }.safe

        authenticationViewModel.accountDetails.observe(viewLifecycleOwner, Observer { accountDetailsResource ->
            when (accountDetailsResource) {
                is Resource.Success -> {
                    mainViewModel.apply {
                        showSnackbar(R.string.message_login_success)
                        findNavController().popBackStack()
                    }
                    Unit
                }
                is Resource.Error -> {
                    view?.let { Snackbar.make(it, accountDetailsResource.errorMessage, Snackbar.LENGTH_SHORT).show() }
                }
                is Resource.Loading -> {
                    // TODO Handle this
                    Unit
                }
            }.safe
        })
    }

    // TODO Destroy the webview to prevent memory leaks and crashes in onPageFinished
}
