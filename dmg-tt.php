<?php
/**
 * Plugin Name:       DMG Technical Test
 * Description:       Gutenberg blocks + custom API endpoints
 * Version:           1.0.0
 * Author:            Erwan Regnier
 */
namespace DMGTechnicalTest;

defined('ABSPATH') || exit;

/**
 * Register all Gutenberg blocks found in the specified directory.
 */
function dmg_register_all_blocks()
{
    $blocks_dir = __DIR__ . '/src/blocks';

    // Loop through each block.json file in the blocks directory
    foreach (glob($blocks_dir . '/*/block.json') as $block_json) {
        register_block_type(dirname($block_json));
    }
}
add_action('init', __NAMESPACE__ . '\\dmg_register_all_blocks');

/**
 * Register and enqueue scripts and styles for the Gutenberg editor.
 */
function dmg_blocks_register_scripts()
{
    $plugin_dir = plugin_dir_path(__FILE__);
    $plugin_url = plugin_dir_url(__FILE__);

    // Check if the editor script file exists before registering
    if (file_exists($plugin_dir . 'build/index.js')) {
        // Register editor script
        wp_register_script(
            'dmg-blocks',
            $plugin_url . 'build/index.js',
            ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data'],
            filemtime($plugin_dir . 'build/index.js')
        );
    } else {
        error_log('The index.js file is missing.');
    }

    // Check if the editor style file exists before registering
    if (file_exists($plugin_dir . 'build/index.css')) {
        // Register editor style
        wp_register_style(
            'dmg-tt-admin-style',
            $plugin_url . 'build/index.css',
            ['wp-edit-blocks'],
            filemtime($plugin_dir . 'build/index.css')
        );
    } else {
        error_log('The admin-style.css file is missing.');
    }

    // Enqueue editor script and style
    wp_enqueue_script('dmg-blocks');
    wp_enqueue_style('dmg-tt-admin-style');
}

add_action('admin_enqueue_scripts', __NAMESPACE__ . '\\dmg_blocks_register_scripts');

/**
 * Register and enqueue styles for the frontend.
 */
function dmg_blocks_register_frontend_styles()
{
    // Path to the plugin directory
    $plugin_dir = plugin_dir_path(__FILE__);

    // URL to the plugin directory
    $plugin_url = plugin_dir_url(__FILE__);

    // Check if the frontend style file exists before registering
    if (file_exists($plugin_dir . 'build/style-index.css')) {
        // Register front-end style
        wp_register_style(
            'dmg-tt-global-style',
            $plugin_url . 'build/style-index.css',
            [],
            filemtime($plugin_dir . 'build/style-index.css')
        );
    } else {
        error_log('The global-style.css file is missing.');
    }

    // Enqueue front-end style
    wp_enqueue_style('dmg-tt-global-style');
}

add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\dmg_blocks_register_frontend_styles');

// Register CLI command if WP-CLI is active
if (defined('WP_CLI') && WP_CLI) {
    require_once __DIR__ . '/cli/register-commands.php';
}
