import Template from "./template";
import paper from "paper";
import ComponentPort from "../core/componentPort";
import { LogicalLayerType  } from "../core/init";

export default class BlackBox extends Template {
    constructor() {
        super();
    }

    __setupDefinitions(): void  {
        this.__unique = {
            position: "Point"
        };

        this.__heritable = {
            componentSpacing: "Float",
            width: "Float",
            length: "Float",
            height: "Float",
        };

        this.__defaults = {
            componentSpacing: 1000,
            width: 5000,
            length: 5000,
            height: 250,
        };

        this.__units = {
            componentSpacing: "μm",
            width: "μm",
            length: "μm",
            height: "μm",
            rotation: "°"
        };

        this.__minimum = {
            componentSpacing: 0,
            width: 5,
            length: 5,
            height: 1,
        };

        this.__maximum = {
            componentSpacing: 10000,
            width: 50000,
            length: 50000,
            height: 50000,
        };

        this.__featureParams = {
            componentSpacing: "componentSpacing",
            position: "position",
            width: "width",
            length: "length",
            height: "height",
        };

        this.__targetParams = {
            componentSpacing: "componentSpacing",
            position: "position",
            width: "width",
            length: "length",
            height: "height",
        };

        this.__placementTool = "componentPositionTool";

        this.__toolParams = {
            position: "position"
        };

        this.__renderKeys = ["FLOW"];

        this.__mint = "BLACK BOX";

        this.__zOffsetKeys = {
            FLOW: "height"
        };

        this.__substrateOffset = {
            FLOW: "0"
        };
    }

    getPorts(params: { [k: string]: any }) {
        const l = params.length;
        const w = params.width;

        const ports = [];

        ports.push(new ComponentPort(-w, -l, "1", LogicalLayerType.FLOW));

        return ports;
    }

    render2D(params: { [k: string]: any }, key: string) {
        const position = params.position;
        const px = position[0];
        const py = position[1];
        const l = params.length;
        const w = params.width;
        const color = params.color;
        
        const rendered = new paper.CompoundPath("");

        const rec = new paper.Path.Rectangle({
            point: new paper.Point(px, py),
            size: [w, l]
        });

        rendered.addChild(rec);

        rendered.fillColor = color;

        return rendered;
    }

    render2DTarget(key: string | null, params: { [k: string]: any }) {
        if (key === null) {
            key = this.__renderKeys[0];
        }
        const render = this.render2D(params, key);
        render.fillColor!.alpha = 0.5;
        return render;
    }
}