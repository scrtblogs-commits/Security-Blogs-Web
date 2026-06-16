<?php
/**
 * Custom Post Types
 * Registers all content types needed by the SecurityBlogs Next.js frontend.
 */

add_action( 'init', 'sb_register_post_types' );

function sb_register_post_types() {

    // ── 1. BLOG POSTS (uses built-in 'post') ─────────────────────────────────
    // Already exists in WordPress — just enable REST API exposure
    add_post_type_support( 'post', 'custom-fields' );

    // ── 2. CASE STUDIES ───────────────────────────────────────────────────────
    register_post_type( 'case_study', [
        'labels' => [
            'name'               => 'Case Studies',
            'singular_name'      => 'Case Study',
            'add_new_item'       => 'Add New Case Study',
            'edit_item'          => 'Edit Case Study',
            'view_item'          => 'View Case Study',
            'search_items'       => 'Search Case Studies',
        ],
        'public'       => true,
        'show_in_rest' => true,
        'rest_base'    => 'case-studies',
        'supports'     => [ 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt' ],
        'menu_icon'    => 'dashicons-analytics',
        'has_archive'  => true,
        'rewrite'      => [ 'slug' => 'case-studies' ],
    ] );

    // ── 3. SERVICES ───────────────────────────────────────────────────────────
    register_post_type( 'service', [
        'labels' => [
            'name'          => 'Services',
            'singular_name' => 'Service',
            'add_new_item'  => 'Add New Service',
            'edit_item'     => 'Edit Service',
        ],
        'public'       => true,
        'show_in_rest' => true,
        'rest_base'    => 'services',
        'supports'     => [ 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt' ],
        'menu_icon'    => 'dashicons-hammer',
        'has_archive'  => false,
        'rewrite'      => [ 'slug' => 'services' ],
    ] );

    // ── 4. TEAM MEMBERS ───────────────────────────────────────────────────────
    register_post_type( 'team_member', [
        'labels' => [
            'name'          => 'Team',
            'singular_name' => 'Team Member',
            'add_new_item'  => 'Add Team Member',
            'edit_item'     => 'Edit Team Member',
        ],
        'public'       => true,
        'show_in_rest' => true,
        'rest_base'    => 'team',
        'supports'     => [ 'title', 'editor', 'thumbnail', 'custom-fields' ],
        'menu_icon'    => 'dashicons-groups',
        'has_archive'  => false,
    ] );

    // ── 5. TESTIMONIALS ───────────────────────────────────────────────────────
    register_post_type( 'testimonial', [
        'labels' => [
            'name'          => 'Testimonials',
            'singular_name' => 'Testimonial',
            'add_new_item'  => 'Add Testimonial',
        ],
        'public'       => false,
        'show_ui'      => true,
        'show_in_rest' => true,
        'rest_base'    => 'testimonials',
        'supports'     => [ 'title', 'editor', 'custom-fields' ],
        'menu_icon'    => 'dashicons-format-quote',
    ] );

    // ── 6. INDUSTRY NEWS ──────────────────────────────────────────────────────
    register_post_type( 'industry_news', [
        'labels' => [
            'name'          => 'Industry News',
            'singular_name' => 'News Item',
            'add_new_item'  => 'Add News Item',
        ],
        'public'       => true,
        'show_in_rest' => true,
        'rest_base'    => 'industry-news',
        'supports'     => [ 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt' ],
        'menu_icon'    => 'dashicons-megaphone',
        'has_archive'  => true,
        'rewrite'      => [ 'slug' => 'industry-news' ],
    ] );

    // ── 7. GLOSSARY TERMS ────────────────────────────────────────────────────
    register_post_type( 'glossary_term', [
        'labels' => [
            'name'          => 'Glossary',
            'singular_name' => 'Glossary Term',
            'add_new_item'  => 'Add Term',
        ],
        'public'       => true,
        'show_in_rest' => true,
        'rest_base'    => 'glossary',
        'supports'     => [ 'title', 'editor', 'custom-fields' ],
        'menu_icon'    => 'dashicons-book-alt',
        'has_archive'  => false,
    ] );

    // ── TAXONOMIES ────────────────────────────────────────────────────────────

    // Blog categories (extends default)
    register_taxonomy( 'blog_category', 'post', [
        'label'        => 'Blog Categories',
        'public'       => true,
        'show_in_rest' => true,
        'rest_base'    => 'blog-categories',
        'hierarchical' => true,
    ] );

    // Security sector tag (shared across CPTs)
    register_taxonomy( 'security_sector', [ 'post', 'case_study', 'service' ], [
        'label'        => 'Security Sector',
        'public'       => true,
        'show_in_rest' => true,
        'rest_base'    => 'security-sectors',
        'hierarchical' => false,
    ] );
}
