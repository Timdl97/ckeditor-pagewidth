( function() {
    var defaults = {
        minZoom: 10,
        maxZoom: 400,
        initialZoom: 100
    };

    function getPluginSpaceId(spaceId) {
        return spaceId + '_label';
    }

    function resizeDocument(editor, zoomValue) {
        var body = editor.editable().$;
        var value = parseInt(zoomValue);
        
        if (navigator.userAgent.includes('Firefox')) {
            body.style.MozTransformOrigin = 'top left';
            body.style.MozTransform = 'scale(' + value / 100 + ')';
        } else {
            body.style.zoom = zoomValue / 100;
        }
    }

    function setDocumentFullWidth(editor) {
        var value = calculateFullWidthScale(editor);
        resizeDocument(editor, value);
        updateLabel(editor, value);
        updateSliderValue(editor, value);
    }

    function setDocumentZoomIn(editor) {
        var currentValue = parseInt(getSliderInput(editor).$.value || '0');
        if (currentValue % 10 !== 0) currentValue = Math.ceil(currentValue / 10) * 10;
        else currentValue += 10;

        if (currentValue > getMaxZoomValue(editor))
        currentValue = getMaxZoomValue(editor);

        resizeDocument(editor, currentValue);
        updateLabel(editor, currentValue);
        updateSliderValue(editor, currentValue);
    }

    function setDocumentZoomOut(editor) {
        var currentValue = parseInt(getSliderInput(editor).$.value || '0');
        if (currentValue % 10 !== 0) currentValue = Math.floor(currentValue / 10) * 10;
        else currentValue -= 10;

        if (currentValue < getMinZoomValue(editor))
        currentValue = getMinZoomValue(editor);

        resizeDocument(editor, currentValue);
        updateLabel(editor, currentValue);
        updateSliderValue(editor, currentValue);
    }

    function calculateFullWidthScale(editor) {
        var body = editor.editable() && editor.editable().$;
        var container = editor.container && editor.container.$;
        if (!body) return 100;

        var scale = (container.scrollWidth - 25) / body.scrollWidth * 100;
        return Math.floor(scale);
    }

    function updateLabel(editor, zoomValue) {
        var labelElement = editor.ui.space('pagewidth').findOne('label.cke_pagewidth_value');
        labelElement.$.innerHTML = zoomValue + '%';
    }

    function updateSliderValue(editor, zoomValue) {
        var inputElement = getSliderInput(editor);
        inputElement.$.value = zoomValue;
    }

    function getSliderInput(editor) {
        return editor.ui.space('pagewidth').findOne('input');
    }

    function getInitialZoomValue(editor) {
        return editor.config.pagewidth_initialZoom || defaults.initialZoom;
    }

    function getMinZoomValue(editor) {
        return editor.config.pagewidth_minZoom || defaults.minZoom;
    }
    function getMaxZoomValue(editor) {
        return editor.config.pagewidth_maxZoom || defaults.maxZoom;
    }
    
    CKEDITOR.plugins.add('pagewidth', {
        lang: ['en', 'nl'],

        init: function (editor) {
            
            editor.on('uiSpace', function (event) {
                if (event.data.space == 'bottom')
                    initPageWidth(editor, event.data);
            });

            editor.on('instanceReady', function () {
                var initialZoomValue = getInitialZoomValue(editor);
                if (initialZoomValue === 'fullwidth') {
                    setDocumentFullWidth(editor);
                } else {
                    initialZoomValue = Math.round(initialZoomValue);
                    resizeDocument(editor, initialZoomValue);
                    updateLabel(editor, initialZoomValue);
                    updateSliderValue(editor, initialZoomValue);
                }
            });            		
        },
        onLoad: function() {
			CKEDITOR.document.appendStyleSheet( this.path + 'styles/pagewidth.css' );
		},
    });
 
    function initPageWidth(editor, bottomSpaceData) {
        var spaceId = editor.ui.spaceId('pagewidth');

        var onChange = CKEDITOR.tools.addFunction(function (value, saveSnapshot) {

            resizeDocument(editor, value);
            updateLabel(editor, value);

            if (saveSnapshot) {
                editor.fire('saveSnapshot');
            }
        }, this);

        var setFullWidth = CKEDITOR.tools.addFunction(function(saveSnapshot) {
            setDocumentFullWidth(editor);
            if (saveSnapshot) {
                editor.fire('saveSnapshot');
            }
        }, this);

        var zoomIn = CKEDITOR.tools.addFunction(function (saveSnapshot) {
          setDocumentZoomIn(editor);
          if (saveSnapshot) {
            editor.fire('saveSnapshot');
          }
        }, this);

        var zoomOut = CKEDITOR.tools.addFunction(function (saveSnapshot) {
          setDocumentZoomOut(editor);
          if (saveSnapshot) {
            editor.fire('saveSnapshot');
          }
        }, this);

        var lang = editor.lang.pagewidth;
        var value = getInitialZoomValue(editor);
        var minZoom = getMinZoomValue(editor);
        var maxZoom = getMaxZoomValue(editor);

        bottomSpaceData.html += '<span id="' + getPluginSpaceId(spaceId) + '" class="cke_voice_label">page width</span>' +
			'<span id="' + spaceId + '" class="cke_pagewidth" role="group" aria-labelledby="' + getPluginSpaceId(spaceId) + '">' + 
            '<a class="cke_pagewidth_button" onclick="CKEDITOR.tools.callFunction(' + zoomOut + ', true );"  title="' + lang.labels.zoomOut + '">&#45;</a>' +
            '<input type="range" oninput="CKEDITOR.tools.callFunction(' + onChange + ', this.value, true );" onchange="CKEDITOR.tools.callFunction(' + onChange + ', this.value, true );" step="1" min="' + minZoom + '" max="' + maxZoom + '"/>' +
            '<a class="cke_pagewidth_button" onclick="CKEDITOR.tools.callFunction(' + zoomIn + ', true );"  title="' + lang.labels.zoomIn + '">&#43;</a>' +
            '<a class="cke_pagewidth_button" onclick="CKEDITOR.tools.callFunction(' + setFullWidth + ', true );"  title="' + lang.labels.fullWidth + '">&#9974;</a>' + 
            '<label class="cke_pagewidth_value">' + value +' %</label>' + 
            '</span>'
    }

} )();
