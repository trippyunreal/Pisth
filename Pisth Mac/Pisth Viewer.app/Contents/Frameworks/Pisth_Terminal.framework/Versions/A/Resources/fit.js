
// Fit terminal

function proposeGeometry(term) {
    if (!term.element.parentElement) {
        return null;
    }
    var parentElementStyle = window.getComputedStyle(term.element.parentElement);
    var parentElementHeight = parseInt(parentElementStyle.getPropertyValue('height'));
    var parentElementWidth = Math.max(0, parseInt(parentElementStyle.getPropertyValue('width')));
    var elementStyle = window.getComputedStyle(term.element);
    var elementPadding = {
    top: parseInt(elementStyle.getPropertyValue('padding-top')),
    bottom: parseInt(elementStyle.getPropertyValue('padding-bottom')),
    right: parseInt(elementStyle.getPropertyValue('padding-right')),
    left: parseInt(elementStyle.getPropertyValue('padding-left'))
    };
    var elementPaddingVer = elementPadding.top + elementPadding.bottom;
    var elementPaddingHor = elementPadding.right + elementPadding.left;
    var availableHeight = parentElementHeight - elementPaddingVer;
    var availableWidth = parentElementWidth - elementPaddingHor - term.viewport.scrollBarWidth;
    var geometry = {
    cols: Math.floor(availableWidth / term.renderer.dimensions.actualCellWidth),
    rows: Math.floor(availableHeight / term.renderer.dimensions.actualCellHeight)
    };
    return geometry;
}

function fit(term) {
    var geometry = proposeGeometry(term);
    if (geometry) {
        if (term.rows !== geometry.rows || term.cols !== geometry.cols) {
            term.renderer.clear();
            
            term.resize(geometry.cols, geometry.rows);
        }
    }
}

function apply(terminalConstructor) {
    terminalConstructor.prototype.proposeGeometry = function () {
        return proposeGeometry(this);
    };
    terminalConstructor.prototype.fit = function () {
        return fit(this);
    };
}

