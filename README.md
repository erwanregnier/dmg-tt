# DMG Technical Test

A WordPress plugin featuring a Gutenberg block and a WP-CLI command.

## Features

- **Gutenberg Block**: Allows editors to search and insert a published post as a stylised anchor link.
- **WP-CLI Command**: `dmg-read-more search` to find posts containing the Gutenberg block within a date range.

## WP-CLI Usage

If omitted the default search will be in the last 30 days
If only one of the date arguments is provided, the plugin exits with a warning

To improve performance it is recommanded to add the global --skip-themes parameter

**Example with date range**

`wp dmg-read-more search --date-before=2025-05-31 --date-after=2025-05-01 --skip-themes`


## Comments

- To avoid multiple calls and limit the ressources usage, the search is manually triggered by pressing Enter or the Search button instead of an autocomplete mode
- The plugin has been build as a potential container of multiple blocks and WP CLI commands
- I have included the build folder so the plugin is ready to use without running the npm commands

## Test with Jest

The test is not fully functional and is here to demonstrate the way we could proceed.
In particular the block's test would require some Jest's mocks to be easily tested in.

## To do

- Implement I18n
- Refactor styling
- Complete the unit test
