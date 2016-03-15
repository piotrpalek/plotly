# [Ember VCL](https://github.com/ember-vcl/doc) Plotly


Plotly.js component

For all options available in this component check the [plotly docs](https://plot.ly/javascript/reference/)
for more info on how to set them

## Demo

[example1](/demo/example1/)


## Public API
### Public Attributes
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
|data|{Object}|`null`|passes the data attribute to plotly.js<br>  |
|title|{String}|`''`|sets the plot's title<br>  |
|margin|{Object}|`null`|sets the plot's margin<br>  |
|showLegend|{Boolean}|`true`|sets the plot's showLegend attribute<br>  |
|displayModeBar|{Boolean}|`true`|sets the plot's displayModeBar attribute<br>  |
|displayLogo|{Boolean}|`false`|sets the plot's displayLogo attribute<br>  |
|showLink|{Boolean}|`false`|sets the plot's showLink attribute<br>  |
|staticPlot|{Boolean}|`false`|sets the plot's staticPlot attribute<br>  |
|scrollZoom|{Boolean}|`true`|sets the plot's scrollZoom attribute<br>  |
### Action Attributes
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
## Included Mixins

## Private API
### Private Attributes
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
|layout|{Property}|`Property`|N/A|
|plotlyLayout|{Property}|`Property`|N/A|
|plotlyConfig|{Property}|`Property`|N/A|
|init|{Property}|`Property`|N/A|
|boundClickHandler|{Property}|`Property`|N/A|
|didInsertElement|{Property}|`Property`|N/A|
|willDestroyElement|{Property}|`Property`|N/A|
|dataObserver|{Property}|`Property`|N/A|
|recreatePlot|{Property}|`Property`|N/A|

## Running demo locally

[See instructions how to run a demo app](https://github.com/ember-vcl/build-demo)