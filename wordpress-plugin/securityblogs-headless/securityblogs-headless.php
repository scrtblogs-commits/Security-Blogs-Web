<?php
/**
 * Plugin Name:       SecurityBlogs Headless CMS
 * Plugin URI:        https://securityblogs.com.au
 * Description:       Configures WordPress as a headless CMS for the SecurityBlogs Next.js frontend. Registers custom post types, ACF field groups, REST API endpoints, and CORS headers.
 * Version:           1.0.0
 * Author:            SecurityBlogs
 * License:           Private
 * Text Domain:       sb-headless
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'SB_HEADLESS_VERSION', '1.0.0' );
define( 'SB_HEADLESS_DIR', plugin_dir_path( __FILE__ ) );
define( 'SB_NEXTJS_URL', 'https://securityblogs.com.au' ); // Update to Vercel URL when deployed

// ── Load modules ──────────────────────────────────────────────────────────────
require_once SB_HEADLESS_DIR . 'includes/post-types.php';
require_once SB_HEADLESS_DIR . 'includes/acf-fields.php';
require_once SB_HEADLESS_DIR . 'includes/rest-api.php';
require_once SB_HEADLESS_DIR . 'includes/cors.php';
require_once SB_HEADLESS_DIR . 'includes/revalidate.php';
require_once SB_HEADLESS_DIR . 'includes/admin-ui.php';

// ── Activation: flush rewrite rules ───────────────────────────────────────────
register_activation_hook( __FILE__, function () {
    sb_register_post_types();
    flush_rewrite_rules();
} );

register_deactivation_hook( __FILE__, 'flush_rewrite_rules' );
