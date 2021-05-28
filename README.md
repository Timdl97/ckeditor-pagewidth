# Page width plugin for CKEditor 4

## Installation

### Manual installation
1. Download and extract the plugin `.zip` archive
2. Copy the plugin files to the `plugins` folder of your CKEditor 4 installation. The plugin must be placed in a sub-folder with name `pagewidth` (exact match).
3. Enable the plugin. Use the extraPlugins setting to add the plugin to your configuration:
```config.extraPlugins = 'pagewidth' ```

For more information, check the [CKEditor documentation](https://ckeditor.com/docs/ckeditor4/latest/guide/dev_plugins.html)


## Configuration
The following configuration options are available for this plugin:
|config |Default value | Description|
--- | --- | ---
|pagewidth_minZoom |`10` | The minimal zoomvalue (in percentage) available for the user. Only numbers allowed.
|pagewidth_maxZoom |`400`| The maximal zoomvalue (in percentage) available for the user. Only numbers allowed.
|pagewidth_initialZoom | `100`| The initial zoomvalue (in percentage) when the CKEditor instance initiates. Use `fullwidth` to zoom until pagewidth matches ckeditor container.