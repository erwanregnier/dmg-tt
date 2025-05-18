<?php
namespace DMGTechnicalTest\CLI;

use WP_CLI;
use WP_Query;

class DMG_Read_More_Command
{
    /**
     * Search for posts containing the 'dmg-read-more' block within a date range.
     *
     * ## Usage
     *
     * wp dmg-read-more search --date-before=2025-05-01 --date-after=2025-04-18
     */
    public function search($args, $assoc_args)
    {
        $date_before = $assoc_args['date-before'] ?? null;
        $date_after = $assoc_args['date-after'] ?? null;

        if ((!empty($date_before) && empty($date_after)) || (empty($date_before) && !empty($date_after))) {
            WP_CLI::warning('Both date-before and date-after arguments should be provided together.');
            WP_CLI::halt(1);
        }

        // Set default date range to the last 30 days if no dates are provided
        if (empty($date_before) && empty($date_after)) {
            $date_before = current_time('Y-m-d');
            $date_after = date('Y-m-d', strtotime('-30 days'));

            WP_CLI::line("Using the default range (last 30 days)");
        }

        $query_args = [
            'post_type' => 'page',
            'post_status' => 'publish',
            'date_query' => [
                [
                    'before' => $date_before,
                    'after' => $date_after,
                    'inclusive' => true,
                ],
            ],
            's' => '<!-- wp:dmg-tt/dmg-post-link',
            // Performance improvement
            'fields' => 'ids',
            'no_found_rows' => true,
            'update_post_meta_cache' => false,
            'update_post_term_cache' => false,
        ];

        $query = new WP_Query($query_args);

        if ($query->have_posts()) {
            foreach ($query->posts as $post_id) {
                WP_CLI::line($post_id);
            }
        } else {
            WP_CLI::warning('No posts found matching the criteria.');
        }

        wp_reset_postdata();
    }
}

WP_CLI::add_command('dmg-read-more', 'DMGTechnicalTest\\CLI\\DMG_Read_More_Command');
