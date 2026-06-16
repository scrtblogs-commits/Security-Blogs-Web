<?php
/**
 * Admin UI Cleanup
 * Removes clutter from the WP admin so the SecurityBlogs team only sees
 * the content sections they need.
 */

// ── Remove unused default menu items ─────────────────────────────────────────
add_action( 'admin_menu', 'sb_clean_admin_menu', 999 );

function sb_clean_admin_menu() {
    // Only apply to non-admins so developers retain full access
    if ( current_user_can( 'manage_options' ) ) return;

    $remove = [
        'edit-comments.php',
        'tools.php',
        'options-general.php',
    ];

    foreach ( $remove as $slug ) {
        remove_menu_page( $slug );
    }
}

// ── Dashboard: replace default widgets with quick-start guide ─────────────────
add_action( 'wp_dashboard_setup', 'sb_add_dashboard_widget' );

function sb_add_dashboard_widget() {
    wp_add_dashboard_widget(
        'sb_quick_start',
        '🚀 SecurityBlogs — Quick Start',
        'sb_render_dashboard_widget'
    );
}

function sb_render_dashboard_widget() {
    echo '<style>
        .sb-guide { font-size: 14px; line-height: 1.7; color: #3c434a; }
        .sb-guide h4 { margin: 14px 0 6px; color: #1d2327; }
        .sb-guide ul { margin: 0 0 12px 18px; padding: 0; }
        .sb-guide li { margin-bottom: 4px; }
        .sb-badge { display: inline-block; background: #0073aa; color: #fff; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px; margin-right: 4px; }
    </style>';
    echo '<div class="sb-guide">';

    $sections = [
        'Blog Posts'    => [ 'Go to <strong>Posts → Add New</strong>', 'Fill in Title, content (block editor), Featured Image', 'Use <strong>Blog Post Settings</strong> panel (right side) for author name, read time, and FAQ items', 'Set a <strong>Blog Category</strong> and <strong>Security Sector</strong> tag', 'Click <strong>Publish</strong> — the website updates automatically' ],
        'Case Studies'  => [ 'Go to <strong>Case Studies → Add New</strong>', 'Fill in the <strong>Case Study Details</strong> panel: client name, sector, 3 result stats, services used', 'Upload the client logo in the logo field', 'Add a Featured Image (used as the case study hero)' ],
        'Services'      => [ 'Go to <strong>Services → Add New</strong>', 'Set the <strong>Service Slug</strong> — this MUST match the URL (e.g. <code>security-seo</code>)', 'Fill in hero headline, subheading, capabilities and process steps', 'Pick an accent colour for that service\'s theme' ],
        'Team Members'  => [ 'Go to <strong>Team → Add Team Member</strong>', 'Upload a square photo (min 400×400px)', 'Set <strong>Display Order</strong>: 1 = shown first (use 1 for the founder)' ],
        'Testimonials'  => [ 'Go to <strong>Testimonials → Add Testimonial</strong>', 'Title field = the short quote headline', 'Use the editor for the full quote text', 'Fill in author name, company, role, photo and star rating' ],
        'Site Settings' => [ 'Go to <strong>⚙️ Site Settings</strong> in the left menu', 'Update phone, email, social media URLs', 'Edit the homepage hero tagline and subtext', 'Add or edit the stats strip numbers (e.g. +180%)' ],
    ];

    foreach ( $sections as $title => $steps ) {
        echo '<h4><span class="sb-badge">' . esc_html( $title ) . '</span></h4><ul>';
        foreach ( $steps as $step ) {
            echo '<li>' . wp_kses_post( $step ) . '</li>';
        }
        echo '</ul>';
    }

    echo '<p style="margin-top:16px;padding-top:12px;border-top:1px solid #ddd;font-size:12px;color:#787c82;">Changes publish to the live website within ~30 seconds. If you do not see your update, wait 1 minute and hard-refresh (Ctrl+Shift+R).</p>';
    echo '</div>';
}

// ── Admin footer branding ─────────────────────────────────────────────────────
add_filter( 'admin_footer_text', function() {
    return '<span>SecurityBlogs CMS — powered by <a href="https://securityblogs.com.au" target="_blank">securityblogs.com.au</a></span>';
} );

// ── Hide the WP version from non-admins ──────────────────────────────────────
add_filter( 'update_footer', function( $text ) {
    return current_user_can( 'manage_options' ) ? $text : '';
}, 999 );

// ── Rename "Posts" to "Blog Posts" in menu ───────────────────────────────────
add_action( 'admin_menu', function() {
    global $menu, $submenu;
    foreach ( $menu as $key => $item ) {
        if ( isset( $item[2] ) && $item[2] === 'edit.php' ) {
            $menu[ $key ][0] = 'Blog Posts';
        }
    }
    if ( isset( $submenu['edit.php'] ) ) {
        foreach ( $submenu['edit.php'] as $key => $item ) {
            if ( $item[2] === 'edit.php' ) {
                $submenu['edit.php'][ $key ][0] = 'All Blog Posts';
            }
        }
    }
} );
