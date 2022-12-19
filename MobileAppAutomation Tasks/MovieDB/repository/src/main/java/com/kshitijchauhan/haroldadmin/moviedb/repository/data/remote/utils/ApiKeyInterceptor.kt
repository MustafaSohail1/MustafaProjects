package com.kshitijchauhan.haroldadmin.moviedb.repository.data.remote.utils

import okhttp3.Interceptor
import okhttp3.Response

internal class ApiKeyInterceptor(private val apiKey: String) : Interceptor {

    override fun intercept(chain: Interceptor.Chain): Response {
        val newUrl = chain.request().url().newBuilder()
            .addQueryParameter("api_key", apiKey)
            .build()

        chain.request()
            .newBuilder()
            .url(newUrl)
            .build()
            .also { newRequest ->
                return chain.proceed(newRequest)
            }
    }
}