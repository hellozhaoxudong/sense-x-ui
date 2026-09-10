import '../styles/MapCss.scss';
import markerIconMonitor from '../../../../assets/base/map-monitor.svg';





/**
 * 添加监控标记点
 */
export function addMonitorMarker(mapIns, lnglat, markId, markerTitle, status, contents, clickFun){
    // 创建一个新标记点
    var marker = new AMap.Marker({
        position: lnglat,
        icon: markerIconMonitor,
        anchor:'bottom-center',
        offset: new AMap.Pixel(0, 0)
    });

    marker.setLabel({
        direction:'right',
        opacity: 0.1,
        offset: new AMap.Pixel(2, 0),  //设置文本标注偏移量
        content: `
            <div class="marker-label">
                <div class="marker-header">
                    <div class="marker-title">${markerTitle}</div>
                    <div class="marker-status-success">${status}</div>
                </div>
                <div class="marker-content">
                    ${contents.map(item=>{ return `<div>${item}</div>`}).join('')}
                </div>
            </div>
        `,
    });

    // 添加到地图
    marker.setMap(mapIns);

    marker.on('click', ()=>{
        clickFun && clickFun(markId);
    });

}