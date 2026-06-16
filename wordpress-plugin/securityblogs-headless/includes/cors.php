<?php
/**
 * CORS Headers
 * Allows the Next.js frontend (Vercel) to call the WordPress REST API.
 * SB_NEXTJS_URL is defined in the main plugin file.
 */

add_action( 'init', 'sb_add_cors_headers' );

function sb_add_cors_headers() {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    $allowed = [
        SB_NEXTJS_URL,
        'http://localhost:3000',
        'http://localhost:3001',
    ];

    if ( in_array( rtrim( $origin, '/' ), $allowed, true ) ) {
        header( 'Access-Control-Allow-Origin: ' . esc_url_raw( $origin ) );
        header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
        header( 'Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce' );
        header( 'Access-Control-Allow-Credentials: true' );
    }

    if ( $_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
        status_header( 204 );
        exit;
    }
}

// Also hook into REST to ensure headers appear on API responses
add_filter( 'rest_pre_serve_request', function( $served, $result, $request, $server ) {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    $allowed = [
        SB_NEXTJS_URL,
        'http://localhost:3000',
        'http://localhost:3001',
    ];

    if ( in_array( rtrim( $origin, '/' ), $allowed, true ) ) {
        header( 'Access-Control-Allow-Origin: ' . esc_url_raw( $origin ) );
        header( 'Vary: Origin' );
    }

    return $served;
}, 10, 4 );
