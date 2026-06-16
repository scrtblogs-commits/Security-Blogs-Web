<?php
/**
 * REST API Extensions
 * Adds ACF meta fields to all CPT REST responses so Next.js gets
 * everything it needs in a single request per content type.
 */

add_action( 'rest_api_init', 'sb_register_rest_fields' );

function sb_register_rest_fields() {

    // ── Helper: safely get ACF field (or fall back to post meta) ──────────────
    $acf = function( $field, $post_id ) {
        if ( function_exists( 'get_field' ) ) {
            return get_field( $field, $post_id );
        }
        return get_post_meta( $post_id, $field, true );
    };

    // ── BLOG POSTS ─────────────────────────────────────────────────────────────
    foreach ( [ 'author_name', 'author_title', 'read_time', 'featured_post', 'faq_items' ] as $field ) {
        register_rest_field( 'post', $field, [
            'get_callback' => function( $post ) use ( $acf, $field ) {
                return $acf( $field, $post['id'] );
            },
            'schema' => null,
        ] );
    }

    // ── CASE STUDIES ───────────────────────────────────────────────────────────
    $cs_fields = [
        'client_name', 'security_sector',
        'result_1_num', 'result_1_label',
        'result_2_num', 'result_2_label',
        'result_3_num', 'result_3_label',
        'client_logo', 'services_used', 'campaign_duration',
    ];
    foreach ( $cs_fields as $field ) {
        register_rest_field( 'case_study', $field, [
            'get_callback' => function( $post ) use ( $acf, $field ) {
                return $acf( $field, $post['id'] );
            },
            'schema' => null,
        ] );
    }

    // ── SERVICES ───────────────────────────────────────────────────────────────
    $svc_fields = [
        'service_slug', 'service_icon', 'accent_color',
        'hero_headline', 'hero_sub', 'capabilities', 'process_steps',
    ];
    foreach ( $svc_fields as $field ) {
        register_rest_field( 'service', $field, [
            'get_callback' => function( $post ) use ( $acf, $field ) {
                return $acf( $field, $post['id'] );
            },
            'schema' => null,
        ] );
    }

    // ── TEAM MEMBERS ───────────────────────────────────────────────────────────
    foreach ( [ 'role', 'photo', 'linkedin_url', 'display_order' ] as $field ) {
        register_rest_field( 'team_member', $field, [
            'get_callback' => function( $post ) use ( $acf, $field ) {
                return $acf( $field, $post['id'] );
            },
            'schema' => null,
        ] );
    }

    // ── TESTIMONIALS ───────────────────────────────────────────────────────────
    foreach ( [ 'author_name', 'company', 'author_role', 'author_photo', 'star_rating', 'related_service' ] as $field ) {
        register_rest_field( 'testimonial', $field, [
            'get_callback' => function( $post ) use ( $acf, $field ) {
                return $acf( $field, $post['id'] );
            },
            'schema' => null,
        ] );
    }

    // ── FEATURED IMAGE URL (all public CPTs) ──────────────────────────────────
    $cpts = [ 'post', 'case_study', 'service', 'team_member', 'industry_news', 'glossary_term' ];
    foreach ( $cpts as $cpt ) {
        register_rest_field( $cpt, 'featured_image_url', [
            'get_callback' => function( $post ) {
                $id = get_post_thumbnail_id( $post['id'] );
                if ( ! $id ) return null;
                $src = wp_get_attachment_image_src( $id, 'large' );
                return $src ? $src[0] : null;
            },
            'schema' => null,
        ] );
    }
}

// ── Custom endpoint: /wp-json/sb/v1/site-settings ────────────────────────────
add_action( 'rest_api_init', function () {
    register_rest_route( 'sb/v1', '/site-settings', [
        'methods'             => 'GET',
        'callback'            => 'sb_get_site_settings',
        'permission_callback' => '__return_true',
    ] );
} );

function sb_get_site_settings() {
    if ( function_exists( 'get_field' ) ) {
        $fields = [
            'phone', 'email', 'hero_tagline', 'hero_subtext',
            'linkedin_url', 'instagram_url', 'facebook_url', 'youtube_url',
            'homepage_stats',
        ];
        $data = [];
        foreach ( $fields as $f ) {
            $data[ $f ] = get_field( $f, 'option' );
        }
        return rest_ensure_response( $data );
    }
    return rest_ensure_response( [] );
}

// ── Custom endpoint: /wp-json/sb/v1/featured-posts ───────────────────────────
add_action( 'rest_api_init', function () {
    register_rest_route( 'sb/v1', '/featured-posts', [
        'methods'             => 'GET',
        'callback'            => 'sb_get_featured_posts',
        'permission_callback' => '__return_true',
    ] );
} );

function sb_get_featured_posts() {
    $posts = get_posts( [
        'post_type'      => 'post',
        'posts_per_page' => 6,
        'meta_query'     => [ [ 'key' => 'featured_post', 'value' => '1' ] ],
        'post_status'    => 'publish',
    ] );

    $data = array_map( function( $post ) {
        $thumb_id  = get_post_thumbnail_id( $post->ID );
        $thumb_src = $thumb_id ? wp_get_attachment_image_src( $thumb_id, 'large' ) : null;

        return [
            'id'               => $post->ID,
            'slug'             => $post->post_name,
            'title'            => get_the_title( $post->ID ),
            'excerpt'          => get_the_excerpt( $post->ID ),
            'date'             => $post->post_date,
            'featured_image'   => $thumb_src ? $thumb_src[0] : null,
            'author_name'      => function_exists( 'get_field' ) ? get_field( 'author_name', $post->ID ) : null,
            'author_title'     => function_exists( 'get_field' ) ? get_field( 'author_title', $post->ID ) : null,
            'read_time'        => function_exists( 'get_field' ) ? get_field( 'read_time', $post->ID ) : null,
            'link'             => get_permalink( $post->ID ),
        ];
    }, $posts );

    return rest_ensure_response( $data );
}
