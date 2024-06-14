import React, {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Tile} from "ol/layer";
import {Vector, XYZ} from "ol/source";
import {Icon, Stroke, Style} from "ol/style";
import CrossIcon from "../../../../img-bg/crossIcon.png";
import VectorLayer from "ol/layer/Vector";
import {Feature, Map as OlMap, Overlay, View} from "ol";
import {fromLonLat, get as getProjection} from "ol/proj";
import {Point} from "ol/geom";
import Button from "@mui/material/Button";
import {AppBar} from "@progress/kendo-react-layout";

function CrossWalkBigMap() {
    const [mapObject04, setMapObject04] = useState(null);
    const navigate = useNavigate();

    //임시 지도 데이터

    const crossMapArr = [
        {
            id: 1,
            name: "예산여자 중학교",
            xpos: 126.8375,
            ypos: 36.6981
        },
        {
            id: 2,
            name: "벛꽃로 155번길 입구",
            xpos: 126.836617,
            ypos: 36.694395
        },
        {
            id: 3,
            name: "터미널 사거리",
            xpos: 126.836187,
            ypos: 36.69256
        },
        {
            id: 4,
            name: "대산아파트 앞",
            xpos: 126.84265,
            ypos: 36.688077
        },
        {
            id: 5,
            name: "아뜨리움 아파트 앞",
            xpos: 126.836027,
            ypos: 36.687402
        },
        {
            id: 6,
            name: "석탑사거리 1",
            xpos: 126.836111,
            ypos: 36.686492
        },
        {
            id: 7,
            name: "무한교차로",
            xpos: 126.826518,
            ypos: 36.683088
        },
        {
            id: 8,
            name: "치유의 숲",
            xpos: 126.838948,
            ypos: 36.703784
        },
        {
            id: 9,
            name: "예산고등학교",
            xpos: 126.836653,
            ypos: 36.679627
        },
        {
            id: 10,
            name: "예화여자고등학교 앞",
            xpos: 126.838239,
            ypos: 36.679023
        },
        {
            id: 11,
            name: "쌍송배기",
            xpos: 126.851973,
            ypos: 36.680372
        },

    ]


    const aerialMap = new Tile({
        //배경지도 레이어
        title: "항공사진",
        visible: true,
        source: new XYZ({
            url: "/map_folder/aerial/{z}/{y}/{x}.jpeg",
        }),
    });


    const popupElement = document.createElement("div"); // 마커 클릭했을때, 클라우드 팝업 생성하기위해 div 생성
    popupElement.style.display = "none";
    popupElement.id = "popup";
    document.body.appendChild(popupElement);


    const poiLayer = useMemo(() => { // poi drawing 하기 위한 레이어 생성  usememo 로 생성해야, 자꾸 생성하지 않음..
        const markerStyle = new Style({
            image: new Icon({
                opacity: 1,
                scale: 0.8,
                src: CrossIcon,
                anchor: [0.5, 1]
            }),
            zIndex: 10
        })

        let vectorLayer = new VectorLayer({
            source: new Vector({wrapX: false}),
            style: markerStyle,
        });
        return vectorLayer;
    }, []);


    useEffect(() => {
        // 지도 중복 생성 막음
        const map = new OlMap({
            // controls: defaultControls({ zoom: false, rotate: false }).extend([]),
            target: "mape",
            view: new View({
                projection: getProjection("EPSG:3857"),
                zoom: 15,
                center: fromLonLat([126.8467102, 36.6928093]),
            }),
        });
        map.addLayer(aerialMap);
        map.addLayer(poiLayer);
        setMapObject04({map});

        //지도 onCLick 이벤트 하는곳
        map.on("singleclick", (evt) => {
            // 마우스가 올려진 좌표값
            // console.log( fromLonLat(evt.coordinate))
            //마우스 클릭시 커서가 pointer로 변경 이벤트
            map.getViewport().style.cursor = map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';

            //마커위치 확인
            const feature = map.forEachFeatureAtPixel(
                evt.pixel,
                function (feature) {
                    return feature;
                }
            );


            // true == 마커위치 false == 마커위치 x
            // console.log(map.hasFeatureAtPixel(evt.pixel))
            if (feature) {
                let element = document.createElement("div");
                element.classList.add("ol-popup");


                //클릭시 줌인해줌
                map.getView().setCenter((feature.getGeometry().getExtent()));
                map.getView().setZoom(17);


                let close = `<div id="popup-closer" class="ol-popup-closer">닫기</div><div>`;
                let content = '<div class="ol-popups-css" >' + feature.values_.name;


                content += "</div></div>";
                element.innerHTML = close;
                element.innerHTML += content;
                element.style.display = "block";


                let overlay = new Overlay({
                    element: element,
                    autoPan: true,
                    className: "multiPopup",
                    autoPanMargin: 100,
                    autoPanAnimation: {
                        duration: 400,
                    },
                })

                overlay.setPosition(evt.coordinate);

                let ovlay = map.getOverlays().getArray();
                if (ovlay.length > 0) {
                    map.removeOverlay(ovlay[0]);
                }
                map.addOverlay(overlay);


                let oElem = overlay.getElement();
                oElem.addEventListener("click", function (e) {
                    var target = e.target;
                    if (target.className === "ol-popup-closer") {
                        map.removeOverlay(overlay);
                    }
                });
            }
        });
        return () => null
    }, []);


    // const GetCrossWalkDetail = async () => {
    //     await fetch(`/nodeApi/smartCross`).then(res => res.json()).then((res) => {
    //         res.result.forEach((element) => {
    //             let x = Number(element.lng);
    //             let y = Number(element.lat);
    //             if (x > 0) {
    //                 let pos = fromLonLat([Number(element.lng), Number(element.lat)]);
    //
    //                 const pointFeature = new Feature({
    //                     geometry: new Point(pos),
    //                 });
    //
    //
    //                 let cross = null;
    //                 if (element.aibox_status !== null &&
    //                     element.camera_status !== null &&
    //                     element.led_status !== null &&
    //                     element.pc_status !== null &&
    //                     element.trafficLight_status !== null) {
    //                     cross = new Icon({
    //                         opacity: 1,
    //                         scale: 0.8,
    //                         src: CrossIcon,
    //                         anchor: [0.5, 1],
    //
    //                     });
    //                     pointFeature.setStyle(
    //                         new Style({
    //                             image: cross,
    //                             zIndex: 10,
    //                             text: new Text({
    //                                 text: element.node_name,
    //                                 scale: 1.2,
    //                                 textAlign: "center",
    //                                 offsetY: 10,
    //                                 fill: new Fill({
    //                                     color: "#ffffff",
    //                                 }),
    //                                 stroke: new Stroke({
    //                                     color: "#000000",
    //                                     width: 1,
    //                                 }),
    //                             }),
    //                         })
    //                     );
    //
    //                 } else {
    //                     cross = new Icon({
    //                         opacity: 1,
    //                         scale: 0.8,
    //                         src: CrossConnect,
    //                         anchor: [0.5, 1],
    //
    //                     });
    //                     pointFeature.setStyle(
    //                         new Style({
    //                             image: cross,
    //                             zIndex: 10,
    //                             text: new Text({
    //                                 text: element.node_name,
    //                                 scale: 1.2,
    //                                 textAlign: "center",
    //                                 offsetY: 10,
    //                                 fill: new Fill({
    //                                     color: "#ffffff",
    //                                 }),
    //                                 stroke: new Stroke({
    //                                     color: "#000000",
    //                                     width: 1,
    //                                 }),
    //                             }),
    //                         })
    //                     );
    //                 }
    //
    //                 pointFeature.set("node_seq", element.node_seq); //관리번호
    //                 pointFeature.set("node_name", element.node_name);
    //                 pointFeature.set("node_address", element.node_address);
    //                 pointFeature.set("system_name", element.system_name);
    //
    //                 //상태값
    //                 pointFeature.set("aibox_status", element.aibox_status);
    //                 pointFeature.set("camera_status", element.camera_status);
    //                 pointFeature.set("led_status", element.led_status);
    //                 pointFeature.set("pc_status", element.pc_status);
    //                 pointFeature.set("trafficLight_status", element.trafficLight_status);
    //
    //                 poiLayer.getSource().addFeature(pointFeature);
    //             }
    //         });
    //         mapObject04?.map.getView().fit(poiLayer.getSource().getExtent());
    //         mapObject04?.map
    //             .getView()
    //             .setZoom(mapObject04.map.getView().getZoom() - 0.5);
    //     })
    // }
    useEffect(() => {
        GetCrossWalkDetail();
    }, []);

    const GetCrossWalkDetail = async () => {
        crossMapArr.forEach((element) => {
            let x = Number(element.xpos);
            let y = Number(element.ypos);
            if (x > 0) {
                let pos = fromLonLat([Number(element.xpos), Number(element.ypos)]);

                const pointFeature = new Feature({
                    geometry: new Point(pos),
                });
                pointFeature.set("id", element.id); //관리번호
                pointFeature.set("name", element.name);
                pointFeature.set("xpos", element.xpos);
                pointFeature.set("ypos", element.ypos);
                poiLayer.getSource().addFeature(pointFeature);
            }
        });
        mapObject04?.map.getView().fit(poiLayer.getSource().getExtent());
        mapObject04?.map
            .getView()
            .setZoom(mapObject04.map.getView().getZoom() - 0.5);
    };


    return (
        <div>
            <AppBar themeColor={"light"}>
                <Button variant="contained" fullWidth onClick={() => {
                    navigate('/crosswalk')
                }}>
                    목록으로
                </Button>

                <div id="mape" value={mapObject04}
                     style={{height: "94vh", width: "100%", marginLeft: "0%", marginTop: "0vh"}}></div>
            </AppBar>
        </div>

    )
}

export default CrossWalkBigMap;