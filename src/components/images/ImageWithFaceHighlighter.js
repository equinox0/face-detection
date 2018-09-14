import React from "react";
import { compose, lifecycle, withHandlers, withState } from "recompose";
import styled from "styled-components";

const ImageWithFaceHighlighter = ({ alt, imageRef, onClick, setCanvasRef, setImageRef, src }) => (
    <Wrapper>
        <img alt={alt} className="ui image" ref={setImageRef} src={src} />
        <canvas
            height={imageRef ? imageRef.height : undefined}
            onClick={onClick}
            ref={setCanvasRef}
            width={imageRef ? imageRef.width : undefined}
        />
    </Wrapper>
);

const Wrapper = styled.div`
    height: 100%;
    position: relative;
    width: 100%;

    & > * {
        height: 100%;
        left: 0px;
        position: absolute;
        top: 0px;
        width: 100%;
    }
`;

const enhance = compose(
    withState("canvasRef", "setCanvasRef", undefined),
    withState("coordinates", "setCoordinates", undefined),
    withState("imageRef", "setImageRef", undefined),
    withState("size", "setSize", undefined),
    withHandlers({
        onClick: ({ coordinates, setCoordinates, setSize, size }) => event => {
            const { offsetX, offsetY } = event.nativeEvent;
            if (coordinates === undefined || size !== undefined) {
                setCoordinates({ x: offsetX, y: offsetY });
                setSize();
            } else if (coordinates !== undefined) {
                setSize({ w: offsetX - coordinates.x, h: offsetY - coordinates.y });
            }
        }
    }),
    lifecycle({
        componentDidUpdate() {
            if (this.props.coordinates !== undefined && this.props.size !== undefined) {
                const context = this.props.canvasRef.getContext("2d");
                context.clearRect(0, 0, this.props.canvasRef.width, this.props.canvasRef.height);
                const rect = { ...this.props.coordinates, ...this.props.size };
                drawRectOnContext(context, rect);
                console.log(this.props.alt, rect);
            }
        }
    })
);

const drawRectOnContext = (context, { x, y, w, h }) => {
    context.strokeStyle = "#FFFF00";
    context.lineWidth = 2;
    context.translate(0, 0);
    context.strokeRect(x, y, w, h);
};

export default enhance(ImageWithFaceHighlighter);
