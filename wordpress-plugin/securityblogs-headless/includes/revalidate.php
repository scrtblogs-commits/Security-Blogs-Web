<?php
/**
 * ISR Revalidation
 * Pings the Next.js revalidation endpoint whenever a post is published or updated.
 * Requires NEXT_REVALIDATE_SECRET to be set in wp-config.php:
 *   define( 'NEXT_REVALIDATE_SECRET', 'your-secret-here' );
 */

// Trigger on publish/update
add_action( 'save_post',    'sb_revalidate_on_save', 10, 3 );
add_action( 'trash_post',   'sb_trigger_revalidate' );
add_action( 'untrash_post', 'sb_trigger_revalidate' );

function sb_revalidate_on_save( $post_id, $post, $update ) {
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( wp_is_post_revision( $post_id ) ) return;
    if ( $post->post_status !== 'publish' ) return;

    sb_trigger_revalidate( $post_id );
}

function sb_trigger_revalidate( $post_id = null ) {
    if ( ! defined( 'NEXT_REVALIDATE_SECRET' ) ) return;

    $secret   = NEXT_REVALIDATE_SECRET;
    $base_url = rtrim( SB_NEXTJS_URL, '/' );
    $endpoint = $base_url . '/api/revalidate';

    // Build tag list based on post type
    $tags = [ 'all' ];
    if ( $post_id ) {
        $post_type = get_post_type( $post_id );
        $slug      = get_post_field( 'post_name', $post_id );

        $type_tag_map = [
            'post'          => 'blog',
            'case_study'    => 'case-studies',
            'service'       => 'services',
            'team_member'   => 'team',
            'testimonial'   => 'testimonials',
            'industry_news' => 'industry-news',
            'glossary_term' => 'glossary',
        ];

        if ( isset( $type_tag_map[ $post_type ] ) ) {
            $tags[] = $type_tag_map[ $post_type ];
            $tags[] = $type_tag_map[ $post_type ] . '-' . $slug;
        }
    }

    $body = wp_json_encode( [ 'secret' => $secret, 'tags' => $tags ] );

    wp_remote_post( $endpoint, [
        'headers'   => [ 'Content-Type' => 'application/json' ],
        'body'      => $body,
        'timeout'   => 10,
        'blocking'  => false,
    ] );
}
