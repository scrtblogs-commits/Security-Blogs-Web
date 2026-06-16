<?php
/**
 * ACF Field Groups
 * Registers all editable fields for each content type.
 * Requires ACF Free or ACF Pro to be installed.
 * If ACF is not active, fields fall back to standard WP custom fields.
 */

add_action( 'acf/init', 'sb_register_acf_fields' );

function sb_register_acf_fields() {
    if ( ! function_exists( 'acf_add_local_field_group' ) ) return;

    // ── BLOG POST META ────────────────────────────────────────────────────────
    acf_add_local_field_group( [
        'key'      => 'group_blog_meta',
        'title'    => 'Blog Post Settings',
        'location' => [ [ [ 'param' => 'post_type', 'operator' => '==', 'value' => 'post' ] ] ],
        'fields'   => [
            [
                'key'          => 'field_blog_author_name',
                'label'        => 'Author Name',
                'name'         => 'author_name',
                'type'         => 'text',
                'instructions' => 'Displayed on the blog post. Leave blank to use WordPress user name.',
            ],
            [
                'key'          => 'field_blog_author_title',
                'label'        => 'Author Title',
                'name'         => 'author_title',
                'type'         => 'text',
                'placeholder'  => 'e.g. Security SEO Specialist',
            ],
            [
                'key'          => 'field_blog_read_time',
                'label'        => 'Read Time (minutes)',
                'name'         => 'read_time',
                'type'         => 'number',
                'min'          => 1,
            ],
            [
                'key'          => 'field_blog_featured',
                'label'        => 'Featured Post',
                'name'         => 'featured_post',
                'type'         => 'true_false',
                'instructions' => 'Show this post in featured slots on the homepage and blog index.',
                'ui'           => 1,
            ],
            [
                'key'          => 'field_blog_schema_faq',
                'label'        => 'FAQ Items (for FAQPage Schema)',
                'name'         => 'faq_items',
                'type'         => 'repeater',
                'instructions' => 'Add Q&A pairs. These are automatically output as FAQPage JSON-LD schema.',
                'sub_fields'   => [
                    [ 'key' => 'field_faq_q', 'label' => 'Question', 'name' => 'question', 'type' => 'text' ],
                    [ 'key' => 'field_faq_a', 'label' => 'Answer',   'name' => 'answer',   'type' => 'textarea' ],
                ],
            ],
        ],
    ] );

    // ── CASE STUDY META ───────────────────────────────────────────────────────
    acf_add_local_field_group( [
        'key'      => 'group_case_study',
        'title'    => 'Case Study Details',
        'location' => [ [ [ 'param' => 'post_type', 'operator' => '==', 'value' => 'case_study' ] ] ],
        'fields'   => [
            [
                'key'   => 'field_cs_client',
                'label' => 'Client Name',
                'name'  => 'client_name',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_cs_sector',
                'label' => 'Security Sector',
                'name'  => 'security_sector',
                'type'  => 'select',
                'choices' => [
                    'cctv'           => 'CCTV / Surveillance',
                    'access-control' => 'Access Control',
                    'alarms'         => 'Alarms & Monitoring',
                    'guarding'       => 'Security Guarding',
                    'saas'           => 'Security SaaS',
                    'other'          => 'Other',
                ],
            ],
            [
                'key'   => 'field_cs_result_1_num',
                'label' => 'Result 1 — Number',
                'name'  => 'result_1_num',
                'type'  => 'text',
                'placeholder' => '+180%',
            ],
            [
                'key'   => 'field_cs_result_1_label',
                'label' => 'Result 1 — Label',
                'name'  => 'result_1_label',
                'type'  => 'text',
                'placeholder' => 'Organic traffic growth',
            ],
            [
                'key'   => 'field_cs_result_2_num',
                'label' => 'Result 2 — Number',
                'name'  => 'result_2_num',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_cs_result_2_label',
                'label' => 'Result 2 — Label',
                'name'  => 'result_2_label',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_cs_result_3_num',
                'label' => 'Result 3 — Number',
                'name'  => 'result_3_num',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_cs_result_3_label',
                'label' => 'Result 3 — Label',
                'name'  => 'result_3_label',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_cs_logo',
                'label' => 'Client Logo',
                'name'  => 'client_logo',
                'type'  => 'image',
                'return_format' => 'url',
            ],
            [
                'key'   => 'field_cs_services_used',
                'label' => 'Services Used',
                'name'  => 'services_used',
                'type'  => 'checkbox',
                'choices' => [
                    'security-seo' => 'Security SEO',
                    'aio'          => 'AIO',
                    'aeo'          => 'AEO',
                    'geo'          => 'GEO',
                    'google-ads'   => 'Google Ads',
                    'bing-ads'     => 'Bing Ads',
                    'web-design'   => 'Web Design',
                ],
            ],
            [
                'key'   => 'field_cs_duration',
                'label' => 'Campaign Duration',
                'name'  => 'campaign_duration',
                'type'  => 'text',
                'placeholder' => 'e.g. 6 months',
            ],
        ],
    ] );

    // ── SERVICE PAGE META ─────────────────────────────────────────────────────
    acf_add_local_field_group( [
        'key'      => 'group_service',
        'title'    => 'Service Page Settings',
        'location' => [ [ [ 'param' => 'post_type', 'operator' => '==', 'value' => 'service' ] ] ],
        'fields'   => [
            [
                'key'   => 'field_svc_slug',
                'label' => 'Service Slug (must match Next.js route)',
                'name'  => 'service_slug',
                'type'  => 'text',
                'instructions' => 'e.g. security-seo, aio, geo — must match /services/[slug]/ in Next.js',
            ],
            [
                'key'   => 'field_svc_icon',
                'label' => 'Service Icon (emoji)',
                'name'  => 'service_icon',
                'type'  => 'text',
                'placeholder' => '🔍',
            ],
            [
                'key'   => 'field_svc_accent',
                'label' => 'Accent Colour (hex)',
                'name'  => 'accent_color',
                'type'  => 'color_picker',
            ],
            [
                'key'   => 'field_svc_hero_headline',
                'label' => 'Hero Headline',
                'name'  => 'hero_headline',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_svc_hero_sub',
                'label' => 'Hero Subheading',
                'name'  => 'hero_sub',
                'type'  => 'textarea',
                'rows'  => 2,
            ],
            [
                'key'   => 'field_svc_capabilities',
                'label' => 'Capabilities / Features',
                'name'  => 'capabilities',
                'type'  => 'repeater',
                'instructions' => 'Each item appears as a capability card on the service page.',
                'sub_fields' => [
                    [ 'key' => 'field_cap_icon',  'label' => 'Icon (emoji)', 'name' => 'icon',  'type' => 'text' ],
                    [ 'key' => 'field_cap_title', 'label' => 'Title',        'name' => 'title', 'type' => 'text' ],
                    [ 'key' => 'field_cap_desc',  'label' => 'Description',  'name' => 'desc',  'type' => 'textarea', 'rows' => 2 ],
                ],
            ],
            [
                'key'   => 'field_svc_process',
                'label' => 'Process Steps',
                'name'  => 'process_steps',
                'type'  => 'repeater',
                'sub_fields' => [
                    [ 'key' => 'field_step_title', 'label' => 'Step Title', 'name' => 'title', 'type' => 'text' ],
                    [ 'key' => 'field_step_desc',  'label' => 'Description', 'name' => 'desc', 'type' => 'textarea', 'rows' => 2 ],
                ],
            ],
        ],
    ] );

    // ── TEAM MEMBER META ──────────────────────────────────────────────────────
    acf_add_local_field_group( [
        'key'      => 'group_team',
        'title'    => 'Team Member Details',
        'location' => [ [ [ 'param' => 'post_type', 'operator' => '==', 'value' => 'team_member' ] ] ],
        'fields'   => [
            [
                'key'   => 'field_team_role',
                'label' => 'Role / Title',
                'name'  => 'role',
                'type'  => 'text',
                'placeholder' => 'e.g. Founder & Lead SEO Strategist',
            ],
            [
                'key'   => 'field_team_photo',
                'label' => 'Photo',
                'name'  => 'photo',
                'type'  => 'image',
                'return_format' => 'url',
                'instructions' => 'Upload a square photo, minimum 400×400px.',
            ],
            [
                'key'   => 'field_team_linkedin',
                'label' => 'LinkedIn URL',
                'name'  => 'linkedin_url',
                'type'  => 'url',
            ],
            [
                'key'   => 'field_team_order',
                'label' => 'Display Order',
                'name'  => 'display_order',
                'type'  => 'number',
                'default_value' => 10,
                'instructions' => 'Lower number = shown first. Use 1 for the founder.',
            ],
        ],
    ] );

    // ── TESTIMONIAL META ──────────────────────────────────────────────────────
    acf_add_local_field_group( [
        'key'      => 'group_testimonial',
        'title'    => 'Testimonial Details',
        'location' => [ [ [ 'param' => 'post_type', 'operator' => '==', 'value' => 'testimonial' ] ] ],
        'fields'   => [
            [
                'key'   => 'field_testi_author',
                'label' => 'Author Name',
                'name'  => 'author_name',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_testi_company',
                'label' => 'Company',
                'name'  => 'company',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_testi_role',
                'label' => 'Author Role',
                'name'  => 'author_role',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_testi_photo',
                'label' => 'Author Photo',
                'name'  => 'author_photo',
                'type'  => 'image',
                'return_format' => 'url',
            ],
            [
                'key'   => 'field_testi_rating',
                'label' => 'Star Rating',
                'name'  => 'star_rating',
                'type'  => 'select',
                'choices' => [ '5' => '5 Stars', '4' => '4 Stars', '3' => '3 Stars' ],
                'default_value' => '5',
            ],
            [
                'key'   => 'field_testi_service',
                'label' => 'Related Service',
                'name'  => 'related_service',
                'type'  => 'select',
                'allow_null' => 1,
                'choices' => [
                    'security-seo' => 'Security SEO',
                    'aio'          => 'AIO',
                    'aeo'          => 'AEO',
                    'geo'          => 'GEO',
                    'google-ads'   => 'Google Ads',
                    'bing-ads'     => 'Bing Ads',
                    'web-design'   => 'Web Design',
                ],
            ],
        ],
    ] );

    // ── SITE OPTIONS (global settings) ────────────────────────────────────────
    if ( function_exists( 'acf_add_options_page' ) ) {
        acf_add_options_page( [
            'page_title' => 'Site Settings',
            'menu_title' => '⚙️ Site Settings',
            'menu_slug'  => 'sb-site-settings',
            'capability' => 'manage_options',
            'icon_url'   => 'dashicons-admin-settings',
        ] );

        acf_add_local_field_group( [
            'key'      => 'group_site_options',
            'title'    => 'Global Site Settings',
            'location' => [ [ [ 'param' => 'options_page', 'operator' => '==', 'value' => 'sb-site-settings' ] ] ],
            'fields'   => [
                [
                    'key'   => 'field_opt_phone',
                    'label' => 'Phone Number',
                    'name'  => 'phone',
                    'type'  => 'text',
                    'default_value' => '+61 411 212 418',
                ],
                [
                    'key'   => 'field_opt_email',
                    'label' => 'Email Address',
                    'name'  => 'email',
                    'type'  => 'email',
                    'default_value' => 'info@securityblogs.com.au',
                ],
                [
                    'key'   => 'field_opt_tagline',
                    'label' => 'Hero Tagline (line 1)',
                    'name'  => 'hero_tagline',
                    'type'  => 'text',
                ],
                [
                    'key'   => 'field_opt_hero_sub',
                    'label' => 'Hero Subtext',
                    'name'  => 'hero_subtext',
                    'type'  => 'textarea',
                    'rows'  => 2,
                ],
                [
                    'key'   => 'field_opt_linkedin',
                    'label' => 'LinkedIn URL',
                    'name'  => 'linkedin_url',
                    'type'  => 'url',
                ],
                [
                    'key'   => 'field_opt_instagram',
                    'label' => 'Instagram URL',
                    'name'  => 'instagram_url',
                    'type'  => 'url',
                ],
                [
                    'key'   => 'field_opt_facebook',
                    'label' => 'Facebook URL',
                    'name'  => 'facebook_url',
                    'type'  => 'url',
                ],
                [
                    'key'   => 'field_opt_youtube',
                    'label' => 'YouTube URL',
                    'name'  => 'youtube_url',
                    'type'  => 'url',
                ],
                [
                    'key'   => 'field_opt_stats',
                    'label' => 'Homepage Stats',
                    'name'  => 'homepage_stats',
                    'type'  => 'repeater',
                    'instructions' => 'Stats shown in the "Numbers our clients brag about" strip.',
                    'sub_fields' => [
                        [ 'key' => 'field_stat_num',   'label' => 'Number',      'name' => 'num',   'type' => 'text', 'placeholder' => '+180%' ],
                        [ 'key' => 'field_stat_label', 'label' => 'Label',       'name' => 'label', 'type' => 'text', 'placeholder' => 'Organic traffic growth' ],
                    ],
                ],
            ],
        ] );
    }
}
