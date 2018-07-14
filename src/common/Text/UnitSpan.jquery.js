import Tool, { merged } from 'Common/Tool';

export const UnitSpan = options => {
    const opt = merged({
        className: '',
        fontSize: 12,
        fixed: 4,
        unit: '',
        zoom: 1,
        baseZero: null,
        isfixed: false
    }, options);

    const value = Tool.milliFormat(opt.value, opt.fixed, '', opt.zoom, opt.isfixed);
    let styleStr = '';
    styleStr += `font-size: ${opt.fontSize}px;`;
    if (opt.baseZero !== null) {
        styleStr += `color: ${Tool.RiseFallColor(value, opt.baseZero)};`;
    }
    return '' +
        `<span class="${opt.className}" style="${styleStr}">` +
            `<span>${value}</span>` +
            (value === '--' ? '' : `<span style="font-size: 0.6667em;">${opt.unit}</span>`) +
        '</span>'
}

const UnitTypeSpan = options => {
    const params = {};
    if (options.type === 'return') { // 百分号+颜色
        params.fixed = 2;
        params.unit = '%';
        params.zoom = 100;
        params.baseZero = 0;
    } else if (options.type === 'sharp') { // 保留2位
        params.fixed = 2;
    } else if (options.type === 'max_retracement') { // 百分号
        params.fixed = 2;
        params.unit = '%';
        params.zoom = 100;
        params.isfixed = true;
    }
    delete options.type;
    return UnitSpan(merged(params, options));
}

export default UnitTypeSpan;
